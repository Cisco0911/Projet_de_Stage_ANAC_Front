/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useMemo, useReducer} from 'react';

import { Global_State } from "../main";
import { http } from "../data";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';

import toast from "react-hot-toast";

import { IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";

import Button from 'react-bootstrap/Button';










const isThereUpdate = () =>
{
    // #f29901

    let countNew = 0

    countNew = countNew + Global_State.authUser.operation_notifications.length


    return countNew 

}


export default function Notifications()
{

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 7,
          top: 10,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
    }));

    const count = isThereUpdate()

    const notifButton = (
        count ?
        <IconButton aria-label="notification" style={{ width: 36, height: 36, }} >
            <StyledBadge badgeContent={count} color="primary">
                <MdNotificationsActive color='#cd0606' size={30} />
            </StyledBadge>
        </IconButton>
        :
        <IconButton aria-label="notification" style={{ width: 36, height: 36, }} >
            <StyledBadge badgeContent={count} color="primary">
                <IoMdNotifications color='#10088b' size={30} />
            </StyledBadge>
        </IconButton>
    )

    const operationNotif = useMemo( () => JSON.parse(JSON.stringify(Global_State.authUser.operation_notifications)),  [Global_State.authUser])
    // [
    //     {
    //         'id': 1,
    //         'node_type': 'Dossier',
    //         'operable': { 'name': 'Le dossier de test' },
    //         'from': { 'id': 1 }
    //     }
    // ]

    const reducer = (state, action) => {
        switch (action.type) {
            case "setState":
                return state.map((notif) => {
                if (notif.id === action.id) {
                    return { ...notif, state: action.newState, toggled: action.toggled };
                } 
                else {
                    return notif;
                }
                });
            case 'delete':
                return state.filter(notif => ( notif.id !== action.id ) )
            case 'add':
                return action.newState
          default:
            return state;
        }
    };

    // initData is always up to date
    const initData = useMemo( () => operationNotif.map(notif => ({...notif, state: 'attente', toggled: undefined}) ) ,  [operationNotif] )

    const [notifsState, dispatch] = useReducer(reducer,  initData);

    useEffect(
        () =>
        {
            dispatch({type: 'add', newState: initData})
        }, [initData]
    )
    
    

    useEffect(
        () =>
        {
            Global_State.EventsManager.on('updateNotif', id => 
            { 
                console.log('updateNotif'); 
                dispatch({ type: 'setState', id: id, newState: 'dealt', toggled: true})
                setTimeout(() => {
                    dispatch({ type: 'delete', id: id}) 
                }, 1000);
            })
            return () => 
            {
                Global_State.EventsManager.off('updateNotif');
            }
        },
        []
    )

    
    let operationNotifComponents = []

    const [test, setTest] = useState(true)

    notifsState.map(
        op_notif =>
        {
            // console.log(op_notif)
            let icon
            switch (op_notif.state) {
                case 'loading':
                    icon = <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                    break;

                case 'dealt':
                    icon = <CheckCircleOutlineIcon className='mr-1' color='success'  />
                    break;
            
                default:
                    icon = null
                    break;
            }

            operationNotifComponents.push(
                <ListItem key={op_notif.id} >
                    <Card sx = {{ minWidth: 150, maxWidth: 390 }} variant="outlined" >
                        <CardContent  >
                            <div onClick={() => {  setTest(t => !t)}} >
                                Confirmer la suppression de {test + ''}  : {op_notif.node_type}<b><br/>{op_notif.operable.name}</b>
                            </div>
                        </CardContent>
                        <CardActions>

                            <Stack direction={'row'} spacing = {2} >

                                <Button className='m-10'  variant="danger" onClick={() => 
                                    {
                                        dispatch({ type: 'setState', id: op_notif.id, newState: 'loading', toggled: true})
                                        console.log(op_notif.state)
                                        
                                        const remove = async () => 
                                        {
                                            switch (op_notif.front_type) {
                                            case 'audit':
                            
                                                await http.delete(`del_audit?id=${op_notif.operable.id}&initiator=${op_notif.from.id}`)
                                                .then( res => { 
                                                    console.log(res); 

                                                    const msg = new FormData;
                                                    msg.append('object', 'confirmed')
                                                    msg.append('value', `Suppression confirmé par ${Global_State.authUser.name.substring(0, 1)}. ${Global_State.authUser.second_name}`)
                                                    msg.append('from', JSON.stringify(Global_State.authUser))
                                                    msg.append('to', op_notif.from.id)
                                                    msg.append('attachment', JSON.stringify({'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }))
            
                                                    http.post('notify_response', msg)
                                                    .then(res => {console.log('notify',res)})

                                                    
                                                    if(res.data === 'attente') toast('En attente de confirmation',
                                                    {
                                                        icon: 'ℹ️'
                                                    }) 
                            
                                                } )
                                                .catch(err => { console.log(err); toast.error("error on this one, Audit: " + op_notif.operable.name) })
                            
                                                break;
                                            case 'checkList':
                                                break;
                                            case 'dp':
                                                break;
                                            case 'nonC':
                                                break;
                                            case 'fnc':
                            
                                                await http.delete(`del_fnc?id=${op_notif.operable.id}&initiator=${op_notif.from.id}`)
                                                .then( res => { 
                                                    console.log(res); 

                                                    const msg = new FormData;
                                                    msg.append('object', 'confirmed')
                                                    msg.append('value', `Suppression confirmé par ${Global_State.authUser.name.substring(0, 1)}. ${Global_State.authUser.second_name}`)
                                                    msg.append('from', JSON.stringify(Global_State.authUser))
                                                    msg.append('to', op_notif.from.id)
                                                    msg.append('attachment', JSON.stringify({'operable': { 'name': op_notif.operable.name } }))
            
                                                    http.post('notify_response', msg)
                                                    .then(res => {console.log('notify',res)})

                                                    if(res.data === 'attente') toast('En attente de confirmation',
                                                    {
                                                        icon: 'ℹ️'
                                                    }) 
                            
                                                } )
                                                .catch(err => { console.log(err); toast.error("error on this one, FNC: " + op_notif.operable.name) })
                            
                                                break;
                                            case 'ds':
                            
                                                await http.delete(`del_folder?id=${op_notif.operable.id}&initiator=${op_notif.from.id}`)
                                                .then( res => { 
                                                    console.log(res); 

                                                    const msg = new FormData;
                                                    msg.append('object', 'confirmed')
                                                    msg.append('value', `Suppression confirmé par ${Global_State.authUser.name.substring(0, 1)}. ${Global_State.authUser.second_name}`)
                                                    msg.append('from', JSON.stringify(Global_State.authUser))
                                                    msg.append('to', op_notif.from.id)
                                                    msg.append('attachment', JSON.stringify({'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }))
            
                                                    http.post('notify_response', msg)
                                                    .then(res => {console.log('notify',res)})

                                                    
                                                    if(res.data === 'attente') toast('En attente de confirmation',
                                                    {
                                                        icon: 'ℹ️'
                                                    }) 
                            
                                                } )
                                                .catch(err => { console.log(err); toast.error("error on this one, Dossier: " + op_notif.operable.name) })
                            
                                                break;
                                            case 'f':
                                                // console.log(nodeIdentity[0])
                            
                                                await http.delete(`del_file?id=${op_notif.operable.id}&initiator=${op_notif.from.id}`)
                                                .then( res => { 
                                                    console.log(res); 

                                                    const msg = new FormData;
                                                    msg.append('object', 'confirmed')
                                                    msg.append('value', `Suppression confirmé par ${Global_State.authUser.name.substring(0, 1)}. ${Global_State.authUser.second_name}`)
                                                    msg.append('from', JSON.stringify(Global_State.authUser))
                                                    msg.append('to', op_notif.from.id)
                                                    msg.append('attachment', JSON.stringify({'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }))
            
                                                    http.post('notify_response', msg)
                                                    .then(res => {console.log('notify',res)})

                                                    
                                                    if(res.data === 'attente') toast('En attente de confirmation',
                                                    {
                                                        icon: 'ℹ️'
                                                    }) 
                            
                                                } )
                                                .catch(err => { console.log(err); toast.error("error on this one, Fichier: " + op_notif.operable.name) })
                            
                                                break;
                                        
                                            default:
                                                break;
                                        }
                                        }

                                        remove()
                            
                                        // console.log(selectedRow[0].id.substring(2))
                                        // toast.promise(
                                        //     remove(),
                                        //     {
                                        //         loading: 'Suppressing... ' + op_notif.operable.name,
                                        //         success: 'Suppression effective',
                                        //         error: 'err'
                                        //     },
                                        //     {
                                        //         id: 'NodeRemovalResponse',
                                        //         position: "top-right",
                                        //     }
                            
                                        // )

                                    }
                                    }>
                                        {op_notif.toggled ? icon : null}Supprimer 
                                </Button>
                                <Button className='m-10'  variant="light" onClick={() => { Global_State.EventsManager.emit('setSelectedNode', {id: `${op_notif.front_type}${op_notif.operable.id}`, section_id: op_notif.operable.section_id} ); }}>
                                    Consulter
                                </Button>
                                <Button className='m-10'  variant="light" onClick={() => 
                                    {
                                        dispatch({ type: 'setState', id: op_notif.id, newState: 'loading'})

                                        const msg = new FormData;
                                        msg.append('object', 'rejected')
                                        msg.append('value', `Suppression rejeté par ${Global_State.authUser.name.substring(0, 1)}. ${Global_State.authUser.second_name}`)
                                        msg.append('from', JSON.stringify(Global_State.authUser))
                                        msg.append('to', op_notif.from.id)
                                        msg.append('attachment', JSON.stringify({'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }))

                                        const notify = async () => { await http.post('notify_response', msg)
                                        .then( res => { 
                                            Global_State.EventsManager.emit('updateAuthUserInfo'); 
                                            dispatch({ type: 'setState', id: op_notif.id, newState: 'dealt', toggled: false})
                                            setTimeout(() => {
                                                dispatch({ type: 'delete', id: op_notif.id}) 
                                            }, 1000);
                                        } )
                                        .catch(err => { console.log(err); throw err }) }
                                        notify()

                                        // toast.promise(
                                            
                                        //      notify(),
                                        //     {
                                        //         loading: 'Notifying... ' + op_notif.operable.name,
                                        //         success: 'Fin operation',
                                        //         error: 'err'
                                        //     },
                                        //     {
                                        //         id: 'NodeRemovalResponse',
                                        //         position: "top-right",
                                        //     }
                            
                                        // )

                                    }
                                    }>
                                    {op_notif.toggled ? null : icon}Refuser 
                                </Button>

                            </Stack>

                        </CardActions>
                    </Card>
                </ListItem>
            )
        }
    )

    const renderingComponent = count ? (
        <List>
            {operationNotifComponents}
        </List>
    ):
    (<div className='d-flex justify-content-center align-items-center' >
        Vide 😢
    </div>)


    return <Global_State.CustomDropDown id = {'notifPanel'} icon = {notifButton} content = {renderingComponent} />

}