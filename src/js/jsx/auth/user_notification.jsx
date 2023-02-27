/* eslint-disable import/first */

import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';

import {http} from "./login";

import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from "@mui/material/Divider";
import PublishedWithChangesTwoToneIcon from '@mui/icons-material/PublishedWithChangesTwoTone';

import toast from "react-hot-toast";

import {IoMdNotifications} from "react-icons/io";
import {MdNotificationsActive, MdOutlineDoNotDisturbOnTotalSilence} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import {TiThumbsOk, TiThumbsDown} from "react-icons/ti";

import {useSpring, animated} from "react-spring";
import {Collapse} from "react-bootstrap";
import {Box, Popper} from "@mui/material";


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

    countNew = countNew + window.Global_State.authUser.asking_permission_notifications.length + window.Global_State.authUser.unread_review_notifications.length


    return countNew

}

function AskingPermitComponent({ap_notif, dispatch})
{
        // console.log(ap_notif)
        const approved = ap_notif.approved
        let [iconOK, iconNO] =
        [
                <TiThumbsOk size={24} color={'red'} />,
                <TiThumbsDown size={24} color={'green'} />
        ]
        // let icon
        // switch (ap_notif.state)
        // {
        //         case 'loading':
        //                 icon = <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
        //                 break;
        //
        //         case 'dealt':
        //                 icon = <CheckCircleOutlineIcon className='mr-1' color='success'  />
        //                 break;
        //
        //         default:
        //                 icon = null
        //                 break;
        // }

        if (approved !== null)
        {
                if (approved)
                {
                        switch (ap_notif.state)
                        {
                                case 'loading':
                                        iconOK = <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                        break;

                                case 'dealt':
                                        iconOK = <PublishedWithChangesTwoToneIcon color='success'  />
                                        break;

                                default:
                                        iconOK = null
                                        break;
                        }
                }
                else
                {
                        switch (ap_notif.state)
                        {
                                case 'loading':
                                        iconNO = <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                        break;

                                case 'dealt':
                                        iconNO = <PublishedWithChangesTwoToneIcon color='success'  />
                                        break;

                                default:
                                        iconNO = null
                                        break;
                        }
                }
        }

        // 4/;:

        let type_objet
        switch (ap_notif.data.model)
        {
                case 'App\\Models\\Audit':
                        type_objet = "l'audit"
                        break
                case 'App\\Models\\checkList':
                        type_objet = 'la checkList'
                        break
                case 'App\\Models\\DossierPreuve':
                        type_objet = 'le dossier de preuve'
                        break
                case 'App\\Models\\Nc':
                        type_objet = 'le dossier de non-conformité'
                        break
                case 'App\\Models\\NonConformite':
                        type_objet = 'la FNC'
                        break
                case 'App\\Models\\DossierSimple':
                        type_objet = 'le dossier'
                        break
                case 'App\\Models\\Fichier':
                        type_objet = 'le fichier'
                        break
                default:
                        return undefined

        }

        const node = window.Global_State.getNodeDataById( `${window.Global_State.parseModelToFrontType(ap_notif.data.model)}${ap_notif.data.node_id}` )

        return (
                <ListItem key={ap_notif.id} onClick={ e => { e.preventDefault(); e.stopPropagation() } } >
                        <Card sx = {{ minWidth: 150, maxWidth: 390 }} variant="outlined" >
                        <CardContent className={`d-flex`} style={{ padding: 4, paddingBottom: 0 }} >
                                <div style={{ width: "max-content", fontSize: 12 }}  > {/*onClick={() => {  setTest(t => !t)}}*/}
                                        <b>Demande d'autorisation,</b> par M. {ap_notif.data.full_name} pour <b style={{ color: "#d22121" }} >{ap_notif.data.operation === 'deletion' ? 'supprimer' : 'modifier'}</b> {type_objet} : <b style={{ whiteSpace: "nowrap" }} >{ap_notif.data.node_name}</b>
                                </div>
                        </CardContent>
                        <CardActions className={`justify-content-end`} style={{ padding: 0 }} >

                                <Stack direction={'row'} spacing = {1} >

                                        <IconButton title={'ACCORDER'} disabled={approved !== null} variant="danger"
                                                onClick={
                                                        (event) =>
                                                        {
                                                                event.preventDefault()
                                                                event.stopPropagation()

                                                                // console.log('Approvedddddddddddd', ap_notif.data.operation, ap_notif.state, approved)
                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'loading', approved: true})

                                                                const queryBody = new FormData()
                                                                queryBody.append('demand_id', ap_notif.id)
                                                                queryBody.append('approved', '1')

                                                                http.post('authorization_response', queryBody)
                                                                .then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res)
                                                                                if (res.data.statue === 'success')
                                                                                {
                                                                                        dispatch({ type: 'update_state', id: ap_notif.id, newState: 'dealt', approved: true})

                                                                                        setTimeout( () => { window.Global_State.EventsManager.emit('updateAuthUserInfo') }, 1000 )
                                                                                }
                                                                                else
                                                                                {
                                                                                        dispatch({ type: 'update_state', id: ap_notif.id, newState: 'attente', approved: null})
                                                                                }
                                                                        }
                                                                )
                                                                .catch( err => console.log(err) )
                                                        }
                                                }
                                        >
                                                {/*{ clicked.current ? (approved.current ? icon : <ThumbUpAltTwoToneIcon color={'error'} />) : <ThumbUpAltTwoToneIcon color={'error'} /> }*/}
                                                {iconOK}
                                        </IconButton>
                                        <IconButton title={'CONSULTER'} variant="light" onClick={() => { window.Global_State.EventsManager.emit('show_on_screen', {id: node.id, section_id: node.section_id} ); }}>
                                                <FaEye size={24} color={'blue'} />
                                        </IconButton>
                                        <IconButton title={'REFUSER'} disabled={approved !== null} variant="light"
                                                onClick={
                                                        (event) =>
                                                        {
                                                                event.preventDefault()
                                                                event.stopPropagation()

                                                                // console.log("Rejectedddddddddddddd")
                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'loading', approved: false})

                                                                const queryBody = new FormData()
                                                                queryBody.append('demand_id', ap_notif.id)
                                                                queryBody.append('approved', '0')

                                                                http.post('authorization_response', queryBody)
                                                                .then(
                                                                res =>
                                                                {
                                                                        // console.log(res)
                                                                        if (res.data.statue === 'success')
                                                                        {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'dealt', approved: false})

                                                                                setTimeout( () => { window.Global_State.EventsManager.emit('updateAuthUserInfo') }, 1000 )
                                                                        }
                                                                        else
                                                                        {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'attente', approved: null})
                                                                        }
                                                                }
                                                                )
                                                                .catch( err => console.log(err) )
                                                        }
                                                }
                                        >
                                                {/*{ clicked.current ? (approved.current ? <DoDisturbOnTwoToneIcon color={'success'} /> : icon) : <DoDisturbOnTwoToneIcon color={'success'} /> }*/}
                                                {iconNO}
                                        </IconButton>

                                </Stack>

                        </CardActions>
                </Card>
                </ListItem>
        )
}

function useAskingPermitNotif(asking_permission_notifications)
{

        const reducer = (state, action) =>
        {
                switch (action.type) {
                        case "update_state":
                                return state.map(
                                        (notif) =>
                                        {
                                                if (notif.id === action.id)
                                                {
                                                        // console.log('newStaaaaaaaaaaaate', notif.state)
                                                        return { ...notif, state: action.newState, approved: action.approved };
                                                }
                                                else
                                                {
                                                        return notif;
                                                }
                                        }
                                );
                        case 'delete':
                                return [...state.filter(notif => ( notif.id !== action.id ) )]
                        case 'add':
                                return action.newState
                        default:
                                return state;
                }
        };

        // initData is always up to date
        const initData = useMemo( () => asking_permission_notifications.map(notif => ({...notif, state: 'attente', approved: null}) ) ,  [asking_permission_notifications] )

        const [notifsState, dispatch] = useReducer(reducer,  initData);

        useEffect(
        () =>
        {
                dispatch({type: 'add', newState: initData})
        }, [initData]
        )

        const askingPermitNotifComponents = useMemo(
                () =>
                (
                        notifsState.map(
                        ap_notif =>( <AskingPermitComponent key={ap_notif.id} ap_notif={ap_notif} dispatch={dispatch} /> )
                        )
                ), [notifsState]
        )

        return askingPermitNotifComponents
}

function useOnScreen(root) {

        const [isIntersecting, setIntersecting] = useState(false)

        const observer = new IntersectionObserver(
                ([entry]) => setIntersecting(entry.isIntersecting),
                {
                        root: root,
                        threshold: 1.0
                }
        )

        // useEffect(() => {
        //         observer.observe(target.current)
        //         // Remove the observer as soon as the component is unmounted
        //         return () => { observer.disconnect() }
        // }, [])



        return (
                [
                        isIntersecting,
                        (target) => { observer.observe(target) },
                        () => { /*console.log('disconect')*/ }
                ]
        )
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

        const unreadReviewNotif = useMemo( () => JSON.parse(JSON.stringify(window.Global_State.authUser.unread_review_notifications)),  [window.Global_State.authUser])

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

        const readReviewNotifs = useMemo( () => JSON.parse(JSON.stringify(window.Global_State.authUser.read_notifications)),  [window.Global_State.authUser])

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

function useOpen(init_val)
{
        return(
                useState(init_val)
        )
}

function RingingBell({icon})
{
        const [reverse, set] = useState(false)
        const [to_delay, setD] = useState(0)

        // Define the animation
        const ringingAnimation = useSpring({
                from: { transform: 'scale(1)'},
                to: { transform: 'scale(1.3)' },
                config: { duration: 200},
                // pause: to_delay === 3,
                reset: true,
                loop: true,
                reverse,
                onRest: () => { set(!reverse) }
        });

        // Use the useEffect hook to run the animation repeatedly
        // useEffect(() => {
        //   const interval = setInterval(() => {
        //     ringingAnimation.start();
        //   }, 1000);
        //   return () => clearInterval(interval);
        // }, []);

        return (
        <animated.div style={
                {
                        width: 'fit-content',
                        height: 'fit-content',
                        ...ringingAnimation
                }
        }>
                {icon}
        </animated.div>
        );
}

export default function Notifications()
{
        const id = 'notifPanel'

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
                <RingingBell icon={
                        <IconButton aria-label="notification" style={{ width: 36, height: 36, }} >
                                <StyledBadge badgeContent={count} color="primary">
                                        <MdNotificationsActive color='#cd0606' size={30} />
                                </StyledBadge>
                        </IconButton>
                } />

                :
                <IconButton aria-label="notification" style={{ width: 36, height: 36, }} >
                        <StyledBadge badgeContent={count} color="primary">
                                <IoMdNotifications color='#10088b' size={30} />
                        </StyledBadge>
                </IconButton>
        )

        const [askingPermitNotif, update] = useState( JSON.parse(JSON.stringify(window.Global_State.authUser.asking_permission_notifications)) )

        useEffect(
                () =>
                {
                        // console.log('check_update_asking_permit_notifs')
                        if ( !( JSON.stringify(askingPermitNotif) === JSON.stringify(window.Global_State.authUser.asking_permission_notifications) ) )
                        {
                                // console.log('update_asking_permit_notifs')
                                update( JSON.parse(JSON.stringify(window.Global_State.authUser.asking_permission_notifications)) )
                        }
                }, [window.Global_State.authUser.asking_permission_notifications]
        )


        useEffect(
                () =>
                {
                        // console.log('rerendring_notiffffffffffffffffffffffffffs')
                }
        )


        const askingPermitNotifs = useAskingPermitNotif(askingPermitNotif)
        const unreadReviewNotifs = useUnreadReviewNotif()
        const readReviewNotifs = useReadReviewNotif()



        let renderingComponent

        if (count)
        {
                renderingComponent = <List id={'notifRenderingComponent'} >
                        {askingPermitNotifs}
                        {unreadReviewNotifs}
                        <Divider textAlign="left"> LU </Divider>
                        {readReviewNotifs}
                </List>
        }
        else if (readReviewNotifs.length)
        {
                renderingComponent = <List id={'notifRenderingComponent'} >
                        <Divider textAlign="left"> LU </Divider>
                        {readReviewNotifs}
                </List>
        }
        else
        {
                renderingComponent = <div id={'notifRenderingComponent'} className='d-flex justify-content-center align-items-center' >
                        Vide 😢
                </div>
        }

        // const [isVisible, observe, disconect] = useOnScreen(document.querySelector('#root'))

        const [isOpen, setOpenState] = useState(false)

        useEffect(
                () =>
                {
                        // window.Global_State.EventsManager.on('observe_notif_panel', () => { const ref = document.getElementById('notifRenderingComponent');  console.log(ref); observe(ref) })
                        // window.Global_State.EventsManager.on('unobserve_notif_panel', disconect)
                        window.Global_State.EventsManager.on('setOpenState', setOpenState)

                        return(
                                () =>
                                {
                                        // window.Global_State.EventsManager.off('observe_notif_panel')
                                        // window.Global_State.EventsManager.off('unobserve_notif_panel')
                                        window.Global_State.EventsManager.off('setOpenState')
                                }
                        )

                }, []
        )

        // const [anchorEl, setAnchorEl] = useState(null);
        //
        // const isOpen = Boolean(anchorEl)

        useEffect(
        () =>
        {
                // console.log(isOpen, "notifPanel")
                if ( (readNotifs.length !== 0) && !isOpen)
                {

                        const notif_ids = new FormData
                        readNotifs.map(notif_id => {
                                // console.log(notif_id)
                                notif_ids.append('notif_ids[]', notif_id)
                        });

                        readNotifs = []

                        http.post(`markAsRead`, notif_ids)
                        // .then( res => { console.log(res) } )
                        // .catch(err => { console.log(err) })
                }

        }, [isOpen]
        )

        // const handleEnter = (event) => {
        //         setAnchorEl(event.currentTarget);
        // };
        //
        // const handleLeave = () => {
        //         setAnchorEl(null);
        // };
        //
        // const open = Boolean(anchorEl);
        // const drop_id = open ? id : undefined;
        //
        // useEffect(() => {
        //         /**
        //          * Alert if clicked on outside of element
        //          */
        //         function handleClickOutside(event) {
        //                 // console.log('outside')
        //                 const dropdown = document.getElementById(id)
        //                 if (dropdown && !dropdown.contains(event.target)) {
        //                         // console.log('outside')
        //                         handleLeave()
        //                 }
        //         }
        //         // Bind the event listener
        //         document.addEventListener("click", handleClickOutside);
        //         return () => {
        //                 // Unbind the event listener on clean up
        //                 console.log('byeeeeeeeeeeeeeeeeeeeee')
        //                 document.removeEventListener("click", handleClickOutside);
        //
        //         };
        //
        // }, [])

        // return (
        // <div id={id} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
        //         <div>{notifButton}</div>
        //         <Collapse
        //         in={isOpen}
        //         >
        //                 <Popper id={`${drop_id}_pop`}
        //                         style={{
        //                                 zIndex: 999,
        //                                 borderRadius: '0.25rem',
        //                                 fontSize: '14px',
        //                                 border: 'none',
        //                                 boxShadow: '0px 5px 10px -1px rgba(0, 0, 0, 0.15)',
        //                                 overflow: 'hidden',
        //                                 padding: '0.5rem',
        //                                 maxHeight: ( (window.innerHeight/100)*80 ),
        //                                 backgroundColor: "white",
        //                         }}
        //                         open={isOpen}
        //                         anchorEl={anchorEl}
        //                 >
        //                         <Box>
        //                                 {renderingComponent}
        //                         </Box>
        //                 </Popper>
        //         </Collapse>
        // </div>
        // );


        return (
                useMemo(
                        () => ( <window.Global_State.CustomDropDown id = {'notifPanel'} icon = {notifButton} content = { <Box style={{ overflowY: "scroll" }} > {renderingComponent} </Box> } /> ),
                        [renderingComponent]
                )
                // <window.Global_State.CustomDropDown id = {'notifPanel'} icon = {notifButton} content = {renderingComponent} />
        )

}