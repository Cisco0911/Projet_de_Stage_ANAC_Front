/* eslint-disable import/first */

import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';

import {Global_State} from "../main";
import {http} from "../data";

import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import toast from "react-hot-toast";

import {IoMdNotifications} from "react-icons/io";
import {MdNotificationsActive} from "react-icons/md";

import Button from 'react-bootstrap/Button';
import Divider from "@mui/material/Divider";
import {Chip} from "@mui/material";


let readNotifs = []

function isRead(notif_id)
{
        for (const readNotif_id of readNotifs)
        {
                if (readNotif_id === notif_id) return true
        }
        return false
}

const isThereUpdate = () =>
{
    // #f29901

    let countNew = 0

    countNew = countNew + Global_State.authUser.operation_notifications.length + Global_State.authUser.unread_notifications.length


    return countNew 

}

function useOperationNotif()
{
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
                                <CardContent className={`d-flex p-2`} >
                                        <div style={{ width: "max-content", fontSize: 12 }} onClick={() => {  setTest(t => !t)}} >
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

        return operationNotifComponents
}

function useOnScreen(target, root) {

        const [isIntersecting, setIntersecting] = useState(false)

        const observer = new IntersectionObserver(
                ([entry]) => setIntersecting(entry.isIntersecting),
                {
                        root: root,
                        threshold: 1.0
                }
        )

        useEffect(() => {
                observer.observe(target.current)
                // Remove the observer as soon as the component is unmounted
                return () => { observer.disconnect() }
        }, [])

        return isIntersecting
}

function useUnreadReviewNotif()
{
        const StyledBadge = styled(Badge)(({ theme }) => ({
                '& .MuiBadge-badge': {
                        right: 10,
                        top: 13,
                        border: `2px solid ${theme.palette.background.paper}`,
                        padding: '0 4px',
                        fontSize: 10,
                },
        }));

        const unreadReviewNotif = useMemo( () => JSON.parse(JSON.stringify(Global_State.authUser.unread_notifications)),  [Global_State.authUser])

        // let unreadReviewNotifComponents = []

        // const UnreadReviewNotifComponent = ({notif}) =>
        // {
        //         // useEffect(
        //         //         () =>
        //         //         {
        //         //                 return (
        //         //                         () =>
        //         //                         {
        //         //                                 console.log("unmount " + notif.data.msg)
        //         //                         }
        //         //                 )
        //         //         }, []
        //         // )
        //
        //         // const ref = useRef()
        //         // const isVisible = useOnScreen(ref, document.querySelector('#root'))
        //         //
        //         // useEffect(
        //         //         () =>
        //         //         {
        //         //                 console.log(isVisible, notif.data.msg)
        //         //                 if ( !isRead(notif.id) && isVisible)
        //         //                 {
        //         //                         readNotifs.push(notif.id)
        //         //                 }
        //         //
        //         //         }, [isVisible]
        //         // )
        //
        //         return(
        //         <ListItem
        //         onMouseEnter=
        //         {
        //                 () =>
        //                 {
        //                         if ( !isRead(notif.id) )
        //                         {
        //                                 readNotifs.push(notif.id)
        //                         }
        //                 }
        //         }
        //         >
        //                 <StyledBadge color="warning" badgeContent={"new"} >
        //                         <Card sx = {{ minWidth: 150, maxWidth: 390 }} variant="outlined" >
        //                                 <CardContent className={`d-flex p-2`} >
        //                                         <div style={{ width: "max-content", fontSize: 12 }} onClick={e => {}} >
        //                                                 <span style={{ fontWeight: "bold" }} >{`${notif.data.object}:`}</span>
        //                                                 <br/>
        //                                                 {notif.data.msg}
        //                                         </div>
        //                                 </CardContent>
        //                         </Card>
        //                 </StyledBadge>
        //         </ListItem>
        //         )
        // }

        return (
                unreadReviewNotif.map(
                        rv_notif =>
                        (
                        <ListItem key={rv_notif.id}
                                  onMouseEnter=
                                  {
                                          () =>
                                          {
                                                  if ( !isRead(rv_notif.id) )
                                                  {
                                                          readNotifs.push(rv_notif.id)
                                                  }
                                          }
                                  }
                        >
                                <StyledBadge color="warning" badgeContent={"new"} >
                                        <Card sx = {{ minWidth: 150, maxWidth: 390 }} variant="outlined" >
                                                <CardContent className={`d-flex p-2`} >
                                                        <div style={{ width: "max-content", fontSize: 12 }} onClick={e => {}} >
                                                                <span style={{ fontWeight: "bold" }} >{`${rv_notif.data.object}:`}</span>
                                                                <br/>
                                                                {rv_notif.data.msg}
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </StyledBadge>
                        </ListItem>
                        )
                )
        )

        // return unreadReviewNotifComponents
}

function useReadReviewNotif()
{
        const StyledBadge = styled(Badge)(({ theme }) => ({
                '& .MuiBadge-badge': {
                        right: 10,
                        top: 13,
                        border: `2px solid ${theme.palette.background.paper}`,
                        padding: '0 4px',
                        fontSize: 10,
                },
        }));

        const readReviewNotifs = useMemo( () => JSON.parse(JSON.stringify(Global_State.authUser.read_notifications)),  [Global_State.authUser])

        // let readReviewNotifComponents = []

        const ReadReviewNotifComponent = ({notif}) =>
        {
                // useEffect(
                //         () =>
                //         {
                //                 return (
                //                         () =>
                //                         {
                //                                 console.log("unmount " + notif.data.msg)
                //                         }
                //                 )
                //         }, []
                // )

                // const ref = useRef()
                // const isVisible = useOnScreen(ref, document.querySelector('#root'))
                //
                // useEffect(
                //         () =>
                //         {
                //                 console.log(isVisible, notif.data.msg)
                //                 if ( !isRead(notif.id) && isVisible)
                //                 {
                //                         readNotifs.push(notif.id)
                //                 }
                //
                //         }, [isVisible]
                // )

                return(
                <ListItem
                onMouseEnter=
                {
                        () =>
                        {
                                if ( !isRead(notif.id) )
                                {
                                        readNotifs.push(notif.id)
                                }
                        }
                }
                >
                        <StyledBadge color="warning" badgeContent={"new"} >
                                <Card sx = {{ minWidth: 150, maxWidth: 390 }} variant="outlined" >
                                        <CardContent className={`d-flex p-2`} >
                                                <div style={{ width: "max-content", fontSize: 12 }} onClick={e => {}} >
                                                        <span style={{ fontWeight: "bold" }} >{`${notif.data.object}:`}</span>
                                                        <br/>
                                                        {notif.data.msg}
                                                </div>
                                        </CardContent>
                                </Card>
                        </StyledBadge>
                </ListItem>
                )
        }

        return readReviewNotifs.map(
                rv_notif => {
                        return (
                                <ListItem key={rv_notif.id} >
                                        <Card sx={{minWidth: 150, maxWidth: 390}} variant="outlined">
                                                <CardContent className={`d-flex p-2`}>
                                                        <div style={{width: "max-content", fontSize: 12}} onClick={e => {
                                                        }}>
                                                                        <span
                                                                        style={{fontWeight: "bold"}}>{`${rv_notif.data.object}:`}</span>
                                                                <br/>
                                                                {rv_notif.data.msg}
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </ListItem>
                        )
                }
        )
}

export default function Notifications()
{

        const ref = useRef()
        const isVisible = useOnScreen(ref, document.querySelector('#root'))

        useEffect(
                () =>
                {
                        console.log(isVisible, "notifPanel")
                        if ( (readNotifs.length !== 0) && !isVisible)
                        {

                                const notif_ids = new FormData
                                readNotifs.map(notif_id => {
                                        // console.log(notif_id)
                                        notif_ids.append('notif_ids[]', notif_id)
                                });

                                http.post(`markAsRead`, notif_ids)
                                .then( res => { console.log(res) } )
                                .catch(err => { console.log(err) })
                        }

                }, [isVisible]
        )

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


        const operationNotifs = useOperationNotif()
        const unreadReviewNotifs = useUnreadReviewNotif()
        const readReviewNotifs = useReadReviewNotif()



        const renderingComponent = count ? (
        <List ref={ref} id={'notifRenderingComponent'} >
                {operationNotifs}
                {unreadReviewNotifs}
                <Divider textAlign="left"> LU </Divider>
                {readReviewNotifs}
        </List>
        ):
        (<div ref={ref} className='d-flex justify-content-center align-items-center' >
                Vide 😢
        </div>)


        return <Global_State.CustomDropDown id = {'notifPanel'} icon = {notifButton} content = {renderingComponent} />

}