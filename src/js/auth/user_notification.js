var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { http } from "./login";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
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

import { IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive, MdOutlineDoNotDisturbOnTotalSilence } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { TiThumbsOk, TiThumbsDown } from "react-icons/ti";

import { useSpring, animated } from "react-spring";
import { Collapse } from "react-bootstrap";
import { Box, Popper } from "@mui/material";

var readNotifs = [];

function isRead(notif_id) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
                for (var _iterator = readNotifs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var readNotif_id = _step.value;

                        if (readNotif_id === notif_id) return true;
                }
        } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
        } finally {
                try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                        }
                } finally {
                        if (_didIteratorError) {
                                throw _iteratorError;
                        }
                }
        }

        return false;
}

var isThereUpdate = function isThereUpdate() {
        // #f29901

        var countNew = 0;

        countNew = countNew + window.Global_State.authUser.asking_permission_notifications.length + window.Global_State.authUser.unread_review_notifications.length;

        return countNew;
};

function AskingPermitComponent(_ref) {
        var ap_notif = _ref.ap_notif,
            dispatch = _ref.dispatch;

        // console.log(ap_notif)
        var approved = ap_notif.approved;
        var iconOK = React.createElement(TiThumbsOk, { size: 24, color: 'red' }),
            iconNO = React.createElement(TiThumbsDown, { size: 24, color: 'green' });
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

        if (approved !== null) {
                if (approved) {
                        switch (ap_notif.state) {
                                case 'loading':
                                        iconOK = React.createElement('span', { className: 'spinner-border spinner-border-sm mr-1', role: 'status', 'aria-hidden': 'true' });
                                        break;

                                case 'dealt':
                                        iconOK = React.createElement(PublishedWithChangesTwoToneIcon, { color: 'success' });
                                        break;

                                default:
                                        iconOK = null;
                                        break;
                        }
                } else {
                        switch (ap_notif.state) {
                                case 'loading':
                                        iconNO = React.createElement('span', { className: 'spinner-border spinner-border-sm mr-1', role: 'status', 'aria-hidden': 'true' });
                                        break;

                                case 'dealt':
                                        iconNO = React.createElement(PublishedWithChangesTwoToneIcon, { color: 'success' });
                                        break;

                                default:
                                        iconNO = null;
                                        break;
                        }
                }
        }

        // 4/;:

        var type_objet = void 0;
        switch (ap_notif.data.model) {
                case 'App\\Models\\Audit':
                        type_objet = "l'audit";
                        break;
                case 'App\\Models\\checkList':
                        type_objet = 'la checkList';
                        break;
                case 'App\\Models\\DossierPreuve':
                        type_objet = 'le dossier de preuve';
                        break;
                case 'App\\Models\\Nc':
                        type_objet = 'le dossier de non-conformité';
                        break;
                case 'App\\Models\\NonConformite':
                        type_objet = 'la FNC';
                        break;
                case 'App\\Models\\DossierSimple':
                        type_objet = 'le dossier';
                        break;
                case 'App\\Models\\Fichier':
                        type_objet = 'le fichier';
                        break;
                default:
                        return undefined;

        }

        var node = window.Global_State.getNodeDataById('' + window.Global_State.parseModelToFrontType(ap_notif.data.model) + ap_notif.data.node_id);

        return React.createElement(
                ListItem,
                { key: ap_notif.id, onClick: function onClick(e) {
                                e.preventDefault();e.stopPropagation();
                        } },
                React.createElement(
                        Card,
                        { sx: { minWidth: 150, maxWidth: 390 }, variant: 'outlined' },
                        React.createElement(
                                CardContent,
                                { className: 'd-flex', style: { padding: 4, paddingBottom: 0 } },
                                React.createElement(
                                        'div',
                                        { style: { width: "max-content", fontSize: 12 } },
                                        ' ',
                                        React.createElement(
                                                'b',
                                                null,
                                                'Demande d\'autorisation,'
                                        ),
                                        ' par M. ',
                                        ap_notif.data.full_name,
                                        ' pour ',
                                        React.createElement(
                                                'b',
                                                { style: { color: "#d22121" } },
                                                ap_notif.data.operation === 'deletion' ? 'supprimer' : 'modifier'
                                        ),
                                        ' ',
                                        type_objet,
                                        ' : ',
                                        React.createElement(
                                                'b',
                                                { style: { whiteSpace: "nowrap" } },
                                                ap_notif.data.node_name
                                        )
                                )
                        ),
                        React.createElement(
                                CardActions,
                                { className: 'justify-content-end', style: { padding: 0 } },
                                React.createElement(
                                        Stack,
                                        { direction: 'row', spacing: 1 },
                                        React.createElement(
                                                IconButton,
                                                { title: 'ACCORDER', disabled: approved !== null, variant: 'danger',
                                                        onClick: function onClick(event) {
                                                                event.preventDefault();
                                                                event.stopPropagation();

                                                                console.log('Approvedddddddddddd', ap_notif.data.operation, ap_notif.state, approved);
                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'loading', approved: true });

                                                                var queryBody = new FormData();
                                                                queryBody.append('demand_id', ap_notif.id);
                                                                queryBody.append('approved', '1');

                                                                http.post('authorization_response', queryBody).then(function (res) {
                                                                        console.log(res);
                                                                        if (res.data.statue === 'success') {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'dealt', approved: true });

                                                                                setTimeout(function () {
                                                                                        window.Global_State.EventsManager.emit('updateAuthUserInfo');
                                                                                }, 1000);
                                                                        } else {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'attente', approved: null });
                                                                        }
                                                                }).catch(function (err) {
                                                                        return console.log(err);
                                                                });
                                                        }
                                                },
                                                iconOK
                                        ),
                                        React.createElement(
                                                IconButton,
                                                { title: 'CONSULTER', variant: 'light', onClick: function onClick() {
                                                                window.Global_State.EventsManager.emit('show_on_screen', { id: node.id, section_id: node.section_id });
                                                        } },
                                                React.createElement(FaEye, { size: 24, color: 'blue' })
                                        ),
                                        React.createElement(
                                                IconButton,
                                                { title: 'REFUSER', disabled: approved !== null, variant: 'light',
                                                        onClick: function onClick(event) {
                                                                event.preventDefault();
                                                                event.stopPropagation();

                                                                console.log("Rejectedddddddddddddd");
                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'loading', approved: false });

                                                                var queryBody = new FormData();
                                                                queryBody.append('demand_id', ap_notif.id);
                                                                queryBody.append('approved', '0');

                                                                http.post('authorization_response', queryBody).then(function (res) {
                                                                        console.log(res);
                                                                        if (res.data.statue === 'success') {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'dealt', approved: false });

                                                                                setTimeout(function () {
                                                                                        window.Global_State.EventsManager.emit('updateAuthUserInfo');
                                                                                }, 1000);
                                                                        } else {
                                                                                dispatch({ type: 'update_state', id: ap_notif.id, newState: 'attente', approved: null });
                                                                        }
                                                                }).catch(function (err) {
                                                                        return console.log(err);
                                                                });
                                                        }
                                                },
                                                iconNO
                                        )
                                )
                        )
                )
        );
}

function useAskingPermitNotif(asking_permission_notifications) {

        var reducer = function reducer(state, action) {
                switch (action.type) {
                        case "update_state":
                                return state.map(function (notif) {
                                        if (notif.id === action.id) {
                                                console.log('newStaaaaaaaaaaaate', notif.state);
                                                return Object.assign({}, notif, { state: action.newState, approved: action.approved });
                                        } else {
                                                return notif;
                                        }
                                });
                        case 'delete':
                                return [].concat(_toConsumableArray(state.filter(function (notif) {
                                        return notif.id !== action.id;
                                })));
                        case 'add':
                                return action.newState;
                        default:
                                return state;
                }
        };

        // initData is always up to date
        var initData = useMemo(function () {
                return asking_permission_notifications.map(function (notif) {
                        return Object.assign({}, notif, { state: 'attente', approved: null });
                });
        }, [asking_permission_notifications]);

        var _useReducer = useReducer(reducer, initData),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            notifsState = _useReducer2[0],
            dispatch = _useReducer2[1];

        useEffect(function () {
                dispatch({ type: 'add', newState: initData });
        }, [initData]);

        var askingPermitNotifComponents = useMemo(function () {
                return notifsState.map(function (ap_notif) {
                        return React.createElement(AskingPermitComponent, { key: ap_notif.id, ap_notif: ap_notif, dispatch: dispatch });
                });
        }, [notifsState]);

        return askingPermitNotifComponents;
}

function useOnScreen(root) {
        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            isIntersecting = _useState2[0],
            setIntersecting = _useState2[1];

        var observer = new IntersectionObserver(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 1),
                    entry = _ref3[0];

                return setIntersecting(entry.isIntersecting);
        }, {
                root: root,
                threshold: 1.0
        });

        // useEffect(() => {
        //         observer.observe(target.current)
        //         // Remove the observer as soon as the component is unmounted
        //         return () => { observer.disconnect() }
        // }, [])


        return [isIntersecting, function (target) {
                observer.observe(target);
        }, function () {
                console.log('disconect');
        }];
}

function useUnreadReviewNotif() {
        var StyledBadge = styled(Badge)(function (_ref4) {
                var theme = _ref4.theme;
                return {
                        '& .MuiBadge-badge': {
                                right: 10,
                                top: 13,
                                border: '2px solid ' + theme.palette.background.paper,
                                padding: '0 4px',
                                fontSize: 10
                        }
                };
        });

        var unreadReviewNotif = useMemo(function () {
                return JSON.parse(JSON.stringify(window.Global_State.authUser.unread_review_notifications));
        }, [window.Global_State.authUser]);

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

        return unreadReviewNotif.map(function (rv_notif) {
                return React.createElement(
                        ListItem,
                        { key: rv_notif.id,
                                onMouseEnter: function onMouseEnter() {
                                        if (!isRead(rv_notif.id)) {
                                                readNotifs.push(rv_notif.id);
                                        }
                                }
                        },
                        React.createElement(
                                StyledBadge,
                                { color: 'warning', badgeContent: "new" },
                                React.createElement(
                                        Card,
                                        { sx: { minWidth: 150, maxWidth: 390 }, variant: 'outlined' },
                                        React.createElement(
                                                CardContent,
                                                { className: 'd-flex p-2' },
                                                React.createElement(
                                                        'div',
                                                        { style: { width: "max-content", fontSize: 12 }, onClick: function onClick(e) {} },
                                                        React.createElement(
                                                                'span',
                                                                { style: { fontWeight: "bold" } },
                                                                rv_notif.data.object + ':'
                                                        ),
                                                        React.createElement('br', null),
                                                        rv_notif.data.msg
                                                )
                                        )
                                )
                        )
                );
        });

        // return unreadReviewNotifComponents
}

function useReadReviewNotif() {
        var StyledBadge = styled(Badge)(function (_ref5) {
                var theme = _ref5.theme;
                return {
                        '& .MuiBadge-badge': {
                                right: 10,
                                top: 13,
                                border: '2px solid ' + theme.palette.background.paper,
                                padding: '0 4px',
                                fontSize: 10
                        }
                };
        });

        var readReviewNotifs = useMemo(function () {
                return JSON.parse(JSON.stringify(window.Global_State.authUser.read_notifications));
        }, [window.Global_State.authUser]);

        // let readReviewNotifComponents = []

        var ReadReviewNotifComponent = function ReadReviewNotifComponent(_ref6) {
                var notif = _ref6.notif;

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

                return React.createElement(
                        ListItem,
                        {
                                onMouseEnter: function onMouseEnter() {
                                        if (!isRead(notif.id)) {
                                                readNotifs.push(notif.id);
                                        }
                                }
                        },
                        React.createElement(
                                StyledBadge,
                                { color: 'warning', badgeContent: "new" },
                                React.createElement(
                                        Card,
                                        { sx: { minWidth: 150, maxWidth: 390 }, variant: 'outlined' },
                                        React.createElement(
                                                CardContent,
                                                { className: 'd-flex p-2' },
                                                React.createElement(
                                                        'div',
                                                        { style: { width: "max-content", fontSize: 12 }, onClick: function onClick(e) {} },
                                                        React.createElement(
                                                                'span',
                                                                { style: { fontWeight: "bold" } },
                                                                notif.data.object + ':'
                                                        ),
                                                        React.createElement('br', null),
                                                        notif.data.msg
                                                )
                                        )
                                )
                        )
                );
        };

        return readReviewNotifs.map(function (rv_notif) {
                return React.createElement(
                        ListItem,
                        { key: rv_notif.id },
                        React.createElement(
                                Card,
                                { sx: { minWidth: 150, maxWidth: 390 }, variant: 'outlined' },
                                React.createElement(
                                        CardContent,
                                        { className: 'd-flex p-2' },
                                        React.createElement(
                                                'div',
                                                { style: { width: "max-content", fontSize: 12 }, onClick: function onClick(e) {} },
                                                React.createElement(
                                                        'span',
                                                        {
                                                                style: { fontWeight: "bold" } },
                                                        rv_notif.data.object + ':'
                                                ),
                                                React.createElement('br', null),
                                                rv_notif.data.msg
                                        )
                                )
                        )
                );
        });
}

function useOpen(init_val) {
        return useState(init_val);
}

function RingingBell(_ref7) {
        var icon = _ref7.icon;

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            reverse = _useState4[0],
            set = _useState4[1];

        var _useState5 = useState(0),
            _useState6 = _slicedToArray(_useState5, 2),
            to_delay = _useState6[0],
            setD = _useState6[1];

        // Define the animation


        var ringingAnimation = useSpring({
                from: { transform: 'scale(1)' },
                to: { transform: 'scale(1.3)' },
                config: { duration: 200 },
                // pause: to_delay === 3,
                reset: true,
                loop: true,
                reverse: reverse,
                onRest: function onRest() {
                        set(!reverse);
                }
        });

        // Use the useEffect hook to run the animation repeatedly
        // useEffect(() => {
        //   const interval = setInterval(() => {
        //     ringingAnimation.start();
        //   }, 1000);
        //   return () => clearInterval(interval);
        // }, []);

        return React.createElement(
                animated.div,
                { style: Object.assign({
                                width: 'fit-content',
                                height: 'fit-content'
                        }, ringingAnimation) },
                icon
        );
}

export default function Notifications() {
        var id = 'notifPanel';

        var StyledBadge = styled(Badge)(function (_ref8) {
                var theme = _ref8.theme;
                return {
                        '& .MuiBadge-badge': {
                                right: 7,
                                top: 10,
                                border: '2px solid ' + theme.palette.background.paper,
                                padding: '0 4px'
                        }
                };
        });

        var count = isThereUpdate();

        var notifButton = count ? React.createElement(RingingBell, { icon: React.createElement(
                        IconButton,
                        { 'aria-label': 'notification', style: { width: 36, height: 36 } },
                        React.createElement(
                                StyledBadge,
                                { badgeContent: count, color: 'primary' },
                                React.createElement(MdNotificationsActive, { color: '#cd0606', size: 30 })
                        )
                ) }) : React.createElement(
                IconButton,
                { 'aria-label': 'notification', style: { width: 36, height: 36 } },
                React.createElement(
                        StyledBadge,
                        { badgeContent: count, color: 'primary' },
                        React.createElement(IoMdNotifications, { color: '#10088b', size: 30 })
                )
        );

        var _useState7 = useState(JSON.parse(JSON.stringify(window.Global_State.authUser.asking_permission_notifications))),
            _useState8 = _slicedToArray(_useState7, 2),
            askingPermitNotif = _useState8[0],
            update = _useState8[1];

        useEffect(function () {
                console.log('check_update_asking_permit_notifs');
                if (!(JSON.stringify(askingPermitNotif) === JSON.stringify(window.Global_State.authUser.asking_permission_notifications))) {
                        console.log('update_asking_permit_notifs');
                        update(JSON.parse(JSON.stringify(window.Global_State.authUser.asking_permission_notifications)));
                }
        }, [window.Global_State.authUser.asking_permission_notifications]);

        useEffect(function () {
                console.log('rerendring_notiffffffffffffffffffffffffffs');
        });

        var askingPermitNotifs = useAskingPermitNotif(askingPermitNotif);
        var unreadReviewNotifs = useUnreadReviewNotif();
        var readReviewNotifs = useReadReviewNotif();

        var renderingComponent = void 0;

        if (count) {
                renderingComponent = React.createElement(
                        List,
                        { id: 'notifRenderingComponent' },
                        askingPermitNotifs,
                        unreadReviewNotifs,
                        React.createElement(
                                Divider,
                                { textAlign: 'left' },
                                ' LU '
                        ),
                        readReviewNotifs
                );
        } else if (readReviewNotifs.length) {
                renderingComponent = React.createElement(
                        List,
                        { id: 'notifRenderingComponent' },
                        React.createElement(
                                Divider,
                                { textAlign: 'left' },
                                ' LU '
                        ),
                        readReviewNotifs
                );
        } else {
                renderingComponent = React.createElement(
                        'div',
                        { id: 'notifRenderingComponent', className: 'd-flex justify-content-center align-items-center' },
                        'Vide \uD83D\uDE22'
                );
        }

        // const [isVisible, observe, disconect] = useOnScreen(document.querySelector('#root'))

        var _useState9 = useState(false),
            _useState10 = _slicedToArray(_useState9, 2),
            isOpen = _useState10[0],
            setOpenState = _useState10[1];

        useEffect(function () {
                // window.Global_State.EventsManager.on('observe_notif_panel', () => { const ref = document.getElementById('notifRenderingComponent');  console.log(ref); observe(ref) })
                // window.Global_State.EventsManager.on('unobserve_notif_panel', disconect)
                window.Global_State.EventsManager.on('setOpenState', setOpenState);

                return function () {
                        // window.Global_State.EventsManager.off('observe_notif_panel')
                        // window.Global_State.EventsManager.off('unobserve_notif_panel')
                        window.Global_State.EventsManager.off('setOpenState');
                };
        }, []);

        // const [anchorEl, setAnchorEl] = useState(null);
        //
        // const isOpen = Boolean(anchorEl)

        useEffect(function () {
                console.log(isOpen, "notifPanel");
                if (readNotifs.length !== 0 && !isOpen) {

                        var notif_ids = new FormData();
                        readNotifs.map(function (notif_id) {
                                // console.log(notif_id)
                                notif_ids.append('notif_ids[]', notif_id);
                        });

                        readNotifs = [];

                        http.post('markAsRead', notif_ids).then(function (res) {
                                console.log(res);
                        }).catch(function (err) {
                                console.log(err);
                        });
                }
        }, [isOpen]);

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


        return useMemo(function () {
                return React.createElement(window.Global_State.CustomDropDown, { id: 'notifPanel', icon: notifButton, content: renderingComponent });
        }, [renderingComponent])
        // <window.Global_State.CustomDropDown id = {'notifPanel'} icon = {notifButton} content = {renderingComponent} />
        ;
}