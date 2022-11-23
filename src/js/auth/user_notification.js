import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useMemo, useReducer } from 'react';

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

        countNew = countNew + Global_State.authUser.operation_notifications.length + Global_State.authUser.unread_notifications.length;

        return countNew;
};

function useOperationNotif() {
        var _this = this;

        var operationNotif = useMemo(function () {
                return JSON.parse(JSON.stringify(Global_State.authUser.operation_notifications));
        }, [Global_State.authUser]);
        // [
        //     {
        //         'id': 1,
        //         'node_type': 'Dossier',
        //         'operable': { 'name': 'Le dossier de test' },
        //         'from': { 'id': 1 }
        //     }
        // ]

        var reducer = function reducer(state, action) {
                switch (action.type) {
                        case "setState":
                                return state.map(function (notif) {
                                        if (notif.id === action.id) {
                                                return Object.assign({}, notif, { state: action.newState, toggled: action.toggled });
                                        } else {
                                                return notif;
                                        }
                                });
                        case 'delete':
                                return state.filter(function (notif) {
                                        return notif.id !== action.id;
                                });
                        case 'add':
                                return action.newState;
                        default:
                                return state;
                }
        };

        // initData is always up to date
        var initData = useMemo(function () {
                return operationNotif.map(function (notif) {
                        return Object.assign({}, notif, { state: 'attente', toggled: undefined });
                });
        }, [operationNotif]);

        var _useReducer = useReducer(reducer, initData),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            notifsState = _useReducer2[0],
            dispatch = _useReducer2[1];

        useEffect(function () {
                dispatch({ type: 'add', newState: initData });
        }, [initData]);

        useEffect(function () {
                Global_State.EventsManager.on('updateNotif', function (id) {
                        console.log('updateNotif');
                        dispatch({ type: 'setState', id: id, newState: 'dealt', toggled: true });
                        setTimeout(function () {
                                dispatch({ type: 'delete', id: id });
                        }, 1000);
                });
                return function () {
                        Global_State.EventsManager.off('updateNotif');
                };
        }, []);

        var operationNotifComponents = [];

        var _useState = useState(true),
            _useState2 = _slicedToArray(_useState, 2),
            test = _useState2[0],
            setTest = _useState2[1];

        notifsState.map(function (op_notif) {
                // console.log(op_notif)
                var icon = void 0;
                switch (op_notif.state) {
                        case 'loading':
                                icon = React.createElement("span", { className: "spinner-border spinner-border-sm mr-1", role: "status", "aria-hidden": "true" });
                                break;

                        case 'dealt':
                                icon = React.createElement(CheckCircleOutlineIcon, { className: "mr-1", color: "success" });
                                break;

                        default:
                                icon = null;
                                break;
                }

                operationNotifComponents.push(React.createElement(
                        ListItem,
                        { key: op_notif.id },
                        React.createElement(
                                Card,
                                { sx: { minWidth: 150, maxWidth: 390 }, variant: "outlined" },
                                React.createElement(
                                        CardContent,
                                        { className: "d-flex p-2" },
                                        React.createElement(
                                                "div",
                                                { style: { width: "max-content", fontSize: 12 }, onClick: function onClick() {
                                                                setTest(function (t) {
                                                                        return !t;
                                                                });
                                                        } },
                                                "Confirmer la suppression de ",
                                                test + '',
                                                "  : ",
                                                op_notif.node_type,
                                                React.createElement(
                                                        "b",
                                                        null,
                                                        React.createElement("br", null),
                                                        op_notif.operable.name
                                                )
                                        )
                                ),
                                React.createElement(
                                        CardActions,
                                        null,
                                        React.createElement(
                                                Stack,
                                                { direction: 'row', spacing: 2 },
                                                React.createElement(
                                                        Button,
                                                        { className: "m-10", variant: "danger", onClick: function onClick() {
                                                                        dispatch({ type: 'setState', id: op_notif.id, newState: 'loading', toggled: true });
                                                                        console.log(op_notif.state);

                                                                        var remove = function () {
                                                                                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                                                                                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                                while (1) {
                                                                                                        switch (_context.prev = _context.next) {
                                                                                                                case 0:
                                                                                                                        _context.t0 = op_notif.front_type;
                                                                                                                        _context.next = _context.t0 === 'audit' ? 3 : _context.t0 === 'checkList' ? 6 : _context.t0 === 'dp' ? 7 : _context.t0 === 'nonC' ? 8 : _context.t0 === 'fnc' ? 9 : _context.t0 === 'ds' ? 12 : _context.t0 === 'f' ? 15 : 18;
                                                                                                                        break;

                                                                                                                case 3:
                                                                                                                        _context.next = 5;
                                                                                                                        return http.delete("del_audit?id=" + op_notif.operable.id + "&initiator=" + op_notif.from.id).then(function (res) {
                                                                                                                                console.log(res);

                                                                                                                                var msg = new FormData();
                                                                                                                                msg.append('object', 'confirmed');
                                                                                                                                msg.append('value', "Suppression confirm\xE9 par " + Global_State.authUser.name.substring(0, 1) + ". " + Global_State.authUser.second_name);
                                                                                                                                msg.append('from', JSON.stringify(Global_State.authUser));
                                                                                                                                msg.append('to', op_notif.from.id);
                                                                                                                                msg.append('attachment', JSON.stringify({ 'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }));

                                                                                                                                http.post('notify_response', msg).then(function (res) {
                                                                                                                                        console.log('notify', res);
                                                                                                                                });

                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation', {
                                                                                                                                        icon: 'ℹ️'
                                                                                                                                });
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);toast.error("error on this one, Audit: " + op_notif.operable.name);
                                                                                                                        });

                                                                                                                case 5:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 6:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 7:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 8:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 9:
                                                                                                                        _context.next = 11;
                                                                                                                        return http.delete("del_fnc?id=" + op_notif.operable.id + "&initiator=" + op_notif.from.id).then(function (res) {
                                                                                                                                console.log(res);

                                                                                                                                var msg = new FormData();
                                                                                                                                msg.append('object', 'confirmed');
                                                                                                                                msg.append('value', "Suppression confirm\xE9 par " + Global_State.authUser.name.substring(0, 1) + ". " + Global_State.authUser.second_name);
                                                                                                                                msg.append('from', JSON.stringify(Global_State.authUser));
                                                                                                                                msg.append('to', op_notif.from.id);
                                                                                                                                msg.append('attachment', JSON.stringify({ 'operable': { 'name': op_notif.operable.name } }));

                                                                                                                                http.post('notify_response', msg).then(function (res) {
                                                                                                                                        console.log('notify', res);
                                                                                                                                });

                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation', {
                                                                                                                                        icon: 'ℹ️'
                                                                                                                                });
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);toast.error("error on this one, FNC: " + op_notif.operable.name);
                                                                                                                        });

                                                                                                                case 11:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 12:
                                                                                                                        _context.next = 14;
                                                                                                                        return http.delete("del_folder?id=" + op_notif.operable.id + "&initiator=" + op_notif.from.id).then(function (res) {
                                                                                                                                console.log(res);

                                                                                                                                var msg = new FormData();
                                                                                                                                msg.append('object', 'confirmed');
                                                                                                                                msg.append('value', "Suppression confirm\xE9 par " + Global_State.authUser.name.substring(0, 1) + ". " + Global_State.authUser.second_name);
                                                                                                                                msg.append('from', JSON.stringify(Global_State.authUser));
                                                                                                                                msg.append('to', op_notif.from.id);
                                                                                                                                msg.append('attachment', JSON.stringify({ 'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }));

                                                                                                                                http.post('notify_response', msg).then(function (res) {
                                                                                                                                        console.log('notify', res);
                                                                                                                                });

                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation', {
                                                                                                                                        icon: 'ℹ️'
                                                                                                                                });
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);toast.error("error on this one, Dossier: " + op_notif.operable.name);
                                                                                                                        });

                                                                                                                case 14:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 15:
                                                                                                                        _context.next = 17;
                                                                                                                        return http.delete("del_file?id=" + op_notif.operable.id + "&initiator=" + op_notif.from.id).then(function (res) {
                                                                                                                                console.log(res);

                                                                                                                                var msg = new FormData();
                                                                                                                                msg.append('object', 'confirmed');
                                                                                                                                msg.append('value', "Suppression confirm\xE9 par " + Global_State.authUser.name.substring(0, 1) + ". " + Global_State.authUser.second_name);
                                                                                                                                msg.append('from', JSON.stringify(Global_State.authUser));
                                                                                                                                msg.append('to', op_notif.from.id);
                                                                                                                                msg.append('attachment', JSON.stringify({ 'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }));

                                                                                                                                http.post('notify_response', msg).then(function (res) {
                                                                                                                                        console.log('notify', res);
                                                                                                                                });

                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation', {
                                                                                                                                        icon: 'ℹ️'
                                                                                                                                });
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);toast.error("error on this one, Fichier: " + op_notif.operable.name);
                                                                                                                        });

                                                                                                                case 17:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 18:
                                                                                                                        return _context.abrupt("break", 19);

                                                                                                                case 19:
                                                                                                                case "end":
                                                                                                                        return _context.stop();
                                                                                                        }
                                                                                                }
                                                                                        }, _callee, _this);
                                                                                }));

                                                                                return function remove() {
                                                                                        return _ref.apply(this, arguments);
                                                                                };
                                                                        }();

                                                                        remove();

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
                                                                } },
                                                        op_notif.toggled ? icon : null,
                                                        "Supprimer"
                                                ),
                                                React.createElement(
                                                        Button,
                                                        { className: "m-10", variant: "light", onClick: function onClick() {
                                                                        Global_State.EventsManager.emit('setSelectedNode', { id: "" + op_notif.front_type + op_notif.operable.id, section_id: op_notif.operable.section_id });
                                                                } },
                                                        "Consulter"
                                                ),
                                                React.createElement(
                                                        Button,
                                                        { className: "m-10", variant: "light", onClick: function onClick() {
                                                                        dispatch({ type: 'setState', id: op_notif.id, newState: 'loading' });

                                                                        var msg = new FormData();
                                                                        msg.append('object', 'rejected');
                                                                        msg.append('value', "Suppression rejet\xE9 par " + Global_State.authUser.name.substring(0, 1) + ". " + Global_State.authUser.second_name);
                                                                        msg.append('from', JSON.stringify(Global_State.authUser));
                                                                        msg.append('to', op_notif.from.id);
                                                                        msg.append('attachment', JSON.stringify({ 'operable': { 'id': op_notif.operable.id, 'name': op_notif.operable.name } }));

                                                                        var notify = function () {
                                                                                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                                                                                        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                                                while (1) {
                                                                                                        switch (_context2.prev = _context2.next) {
                                                                                                                case 0:
                                                                                                                        _context2.next = 2;
                                                                                                                        return http.post('notify_response', msg).then(function (res) {
                                                                                                                                Global_State.EventsManager.emit('updateAuthUserInfo');
                                                                                                                                dispatch({ type: 'setState', id: op_notif.id, newState: 'dealt', toggled: false });
                                                                                                                                setTimeout(function () {
                                                                                                                                        dispatch({ type: 'delete', id: op_notif.id });
                                                                                                                                }, 1000);
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);throw err;
                                                                                                                        });

                                                                                                                case 2:
                                                                                                                case "end":
                                                                                                                        return _context2.stop();
                                                                                                        }
                                                                                                }
                                                                                        }, _callee2, _this);
                                                                                }));

                                                                                return function notify() {
                                                                                        return _ref2.apply(this, arguments);
                                                                                };
                                                                        }();
                                                                        notify();

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
                                                                } },
                                                        op_notif.toggled ? null : icon,
                                                        "Refuser"
                                                )
                                        )
                                )
                        )
                ));
        });

        return operationNotifComponents;
}

function useOnScreen(target, root) {
        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            isIntersecting = _useState4[0],
            setIntersecting = _useState4[1];

        var observer = new IntersectionObserver(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 1),
                    entry = _ref4[0];

                return setIntersecting(entry.isIntersecting);
        }, {
                root: root,
                threshold: 1.0
        });

        useEffect(function () {
                observer.observe(target.current);
                // Remove the observer as soon as the component is unmounted
                return function () {
                        observer.disconnect();
                };
        }, []);

        return isIntersecting;
}

function useReviewNotif() {
        var StyledBadge = styled(Badge)(function (_ref5) {
                var theme = _ref5.theme;
                return {
                        '& .MuiBadge-badge': {
                                right: 10,
                                top: 13,
                                border: "2px solid " + theme.palette.background.paper,
                                padding: '0 4px',
                                fontSize: 10
                        }
                };
        });

        var unreadReviewNotif = useMemo(function () {
                return JSON.parse(JSON.stringify(Global_State.authUser.unread_notifications));
        }, [Global_State.authUser]);

        var unreadReviewNotifComponents = [];

        var UnreadReviewNotifComponent = function UnreadReviewNotifComponent(_ref6) {
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

                var ref = useRef();
                var isVisible = useOnScreen(ref, document.querySelector('#root'));

                useEffect(function () {
                        console.log(isVisible, notif.data.msg);
                        if (!isRead(notif.id) && isVisible) {
                                readNotifs.push(notif.id);
                        }
                }, [isVisible]);

                return React.createElement(
                        ListItem,
                        { ref: ref },
                        React.createElement(
                                StyledBadge,
                                { color: "warning", badgeContent: "new" },
                                React.createElement(
                                        Card,
                                        { sx: { minWidth: 150, maxWidth: 390 }, variant: "outlined" },
                                        React.createElement(
                                                CardContent,
                                                { className: "d-flex p-2" },
                                                React.createElement(
                                                        "div",
                                                        { style: { width: "max-content", fontSize: 12 }, onClick: function onClick(e) {} },
                                                        React.createElement(
                                                                "span",
                                                                { style: { fontWeight: "bold" } },
                                                                notif.data.object + ":"
                                                        ),
                                                        React.createElement("br", null),
                                                        notif.data.msg
                                                )
                                        )
                                )
                        )
                );
        };

        unreadReviewNotif.map(function (rv_notif) {
                // console.log(rv_notif)

                unreadReviewNotifComponents.push(React.createElement(UnreadReviewNotifComponent, { key: rv_notif.id, notif: rv_notif }));
        });

        return unreadReviewNotifComponents;
}

export default function Notifications() {

        var ref = useRef();
        var isVisible = useOnScreen(ref, document.querySelector('#root'));

        useEffect(function () {
                console.log(isVisible, "notifPanel");
                if (readNotifs.length !== 0 && !isVisible) {

                        var notif_ids = new FormData();
                        readNotifs.map(function (notif_id) {
                                // console.log(notif_id)
                                notif_ids.append('notif_ids[]', notif_id);
                        });

                        http.post("markAsRead", notif_ids).then(function (res) {
                                console.log(res);
                        }).catch(function (err) {
                                console.log(err);
                        });
                }
        }, [isVisible]);

        var StyledBadge = styled(Badge)(function (_ref7) {
                var theme = _ref7.theme;
                return {
                        '& .MuiBadge-badge': {
                                right: 7,
                                top: 10,
                                border: "2px solid " + theme.palette.background.paper,
                                padding: '0 4px'
                        }
                };
        });

        var count = isThereUpdate();

        var notifButton = count ? React.createElement(
                IconButton,
                { "aria-label": "notification", style: { width: 36, height: 36 } },
                React.createElement(
                        StyledBadge,
                        { badgeContent: count, color: "primary" },
                        React.createElement(MdNotificationsActive, { color: "#cd0606", size: 30 })
                )
        ) : React.createElement(
                IconButton,
                { "aria-label": "notification", style: { width: 36, height: 36 } },
                React.createElement(
                        StyledBadge,
                        { badgeContent: count, color: "primary" },
                        React.createElement(IoMdNotifications, { color: "#10088b", size: 30 })
                )
        );

        var operationNotifs = useOperationNotif();
        var unreadReviewNotifs = useReviewNotif();

        var renderingComponent = count ? React.createElement(
                List,
                { ref: ref, id: 'notifRenderingComponent' },
                operationNotifs,
                unreadReviewNotifs
        ) : React.createElement(
                "div",
                { ref: ref, className: "d-flex justify-content-center align-items-center" },
                "Vide \uD83D\uDE22"
        );

        return React.createElement(Global_State.CustomDropDown, { id: 'notifPanel', icon: notifButton, content: renderingComponent });
}