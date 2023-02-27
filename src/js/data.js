import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import parseToJson from "./files_package/parse_to_json";
import useEditor from './editor';
import { http } from "./auth/login";

import Echo from 'laravel-echo';
import EventEmitter from 'eventemitter3';

import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";
import { Box, Fade, Grow, Popover, Popper } from "@mui/material";
import { Queue } from "@mui/icons-material";
import { useSpring, animated } from "react-spring";
import { Collapse } from "react-bootstrap";

window.Pusher = require('pusher-js');

var EventsManager = new EventEmitter();

var options = {
        broadcaster: 'pusher',
        key: 'cd05855e46706d768333',
        cluster: 'eu',
        forceTLS: true,
        authorizer: function authorizer(channel, options) {
                return {
                        authorize: function authorize(socketId, callback) {
                                http.post('/broadcasting/auth', {
                                        socket_id: socketId,
                                        channel_name: channel.name
                                }).then(function (response) {
                                        callback(false, response.data);
                                }).catch(function (error) {
                                        callback(true, error);
                                });
                        }
                };
        }
};

export var getFromDataBase = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var Datas, data;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                                switch (_context.prev = _context.next) {
                                        case 0:
                                                Datas = {
                                                        authUser: {},
                                                        data: {
                                                                sections: [],
                                                                audits: [],
                                                                checkLists: [],
                                                                dps: [],
                                                                nonCs: [],
                                                                fncs: [],
                                                                fs: [],
                                                                ds: [],
                                                                services: []
                                                        },
                                                        errors: {
                                                                sections: {},
                                                                audits: {},
                                                                checkLists: {},
                                                                dps: {},
                                                                nonCs: {},
                                                                fncs: {},
                                                                fs: {},
                                                                ds: {},
                                                                services: {}
                                                        },
                                                        status: {
                                                                sections: -1,
                                                                audits: -1,
                                                                checkLists: -1,
                                                                dps: -1,
                                                                nonCs: -1,
                                                                fncs: -1,
                                                                fs: -1,
                                                                ds: -1,
                                                                services: -1
                                                        }

                                                        // await http
                                                        //         .get("user")
                                                        //         .then(response => {Datas.authUser = response.data})
                                                        //
                                                        // await http
                                                        //         .get("get_ss")
                                                        //         .then(response => { Datas.status.sections = response.status; Datas.data.sections = response.data; })
                                                        //         .catch(error => Datas.errors.sections = error);
                                                        //
                                                        // await http
                                                        //         .get("get_audits")
                                                        //         .then(response => { Datas.status.audits = response.status; Datas.data.audits = response.data; })
                                                        //         .catch(error => Datas.errors.audits = error);
                                                        //
                                                        // await http
                                                        //         .get("get_checkLists")
                                                        //         .then(response => { Datas.status.checkLists = response.status; Datas.data.checkLists = response.data; })
                                                        //         .catch(error => Datas.errors.checkLists = error);
                                                        //
                                                        // await http
                                                        //         .get("get_Dps")
                                                        //         .then(response => { Datas.status.dps = response.status; Datas.data.dps = response.data; })
                                                        //         .catch(error => Datas.errors.dps = error);
                                                        //
                                                        // await http
                                                        //         .get("get_NonCs")
                                                        //         .then(response => { Datas.status.nonCs = response.status; Datas.data.nonCs = response.data; })
                                                        //         .catch(error => Datas.errors.nonCs = error);
                                                        //
                                                        // await http
                                                        //         .get("get_fncs")
                                                        //         .then(response => { Datas.status.fncs = response.status; Datas.data.fncs = response.data; })
                                                        //         .catch(error => Datas.errors.fncs = error);
                                                        //
                                                        // await http
                                                        //         .get("get_ds")
                                                        //         .then(response => { Datas.status.ds = response.status; Datas.data.ds = response.data; })
                                                        //         .catch(error => Datas.errors.ds = error);
                                                        //
                                                        // await http
                                                        //         .get("get_fs")
                                                        //         .then(response => { Datas.status.fs = response.status; Datas.data.fs = response.data; })
                                                        //         .catch(error => Datas.errors.fs = error);
                                                        //
                                                        // await http
                                                        //         .get("get_services")
                                                        //         .then(response => { Datas.status.services = response.status; Datas.data.services = response.data; })
                                                        //         .catch(error => Datas.errors.services = error);


                                                };
                                                data = void 0;
                                                _context.next = 4;
                                                return http.post("get_data", {}).then(function (res) {
                                                        return data = res.data;
                                                }).catch(function (error) {
                                                        return console.log(error);
                                                });

                                        case 4:
                                                return _context.abrupt("return", data);

                                        case 5:
                                        case "end":
                                                return _context.stop();
                                }
                        }
                }, _callee, _this);
        }));

        return function getFromDataBase() {
                return _ref.apply(this, arguments);
        };
}();

function useAbsolutePopover() {
        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            isOpen = _useState2[0],
            setIsOpen = _useState2[1];

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            anchorEl = _useState4[0],
            setAnchorEl = _useState4[1];

        var _useState5 = useState(null),
            _useState6 = _slicedToArray(_useState5, 2),
            content = _useState6[0],
            setContent = _useState6[1];

        function open(child) {
                var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                // console.log("origiiiiiiiiiiiinnnnnnnnn", origin)
                if (origin) setAnchorEl(origin);
                setContent(child);
                setIsOpen(true);
        }

        function close() {
                setIsOpen(false);
                setTimeout(function () {
                        return setAnchorEl(null);
                }, 500);
        }

        var paperStyle = anchorEl ? {
                backgroundColor: '#ffffff00',
                boxShadow: 'none',
                overflow: 'visible'
        } : {
                display: "contents"
        };

        var popover = React.createElement(
                Popover,
                {
                        open: isOpen,
                        anchorReference: anchorEl ? "anchorEl" : "none",
                        anchorEl: anchorEl,
                        onClose: close,
                        PaperProps: {
                                style: paperStyle
                        },
                        anchorOrigin: {
                                vertical: anchorEl ? 'bottom' : 'top',
                                horizontal: 'center'
                        },
                        transformOrigin: {
                                vertical: anchorEl ? "top" : 'center',
                                horizontal: 'center'
                        }
                        // TransitionComponent={Fade}
                },
                React.createElement(
                        "div",
                        { className: "" + (anchorEl ? '' : "d-flex justify-content-center align-items-start"),
                                style: {
                                        marginTop: !anchorEl ? 15 : 0,
                                        width: anchorEl ? "fit-content" : "100%",
                                        height: anchorEl ? "fit-content" : "100%",
                                        animation: "fadeMe 0.5s"
                                },
                                onClick: close
                        },
                        content
                )
        );

        return { open: open, close: close, popover: popover };
}

export default function useGetData(TheDatas) {
        var _this2 = this;

        // console.log('checking', TheDatas)


        var _useState7 = useState(TheDatas.authUser),
            _useState8 = _slicedToArray(_useState7, 2),
            authUser = _useState8[0],
            updateAuthUser = _useState8[1];

        var _useState9 = useState(false),
            _useState10 = _slicedToArray(_useState9, 2),
            isEditorMode = _useState10[0],
            setIsEditorMode = _useState10[1];

        var to_refresh = useRef(true);
        var handling_node_events = useRef(false);
        var node_events_queue = useRef([]);

        var echosHandler = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(tag) {
                        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                        var _loop;

                        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                        switch (_context3.prev = _context3.next) {
                                                case 0:
                                                        _context3.t0 = tag;
                                                        _context3.next = _context3.t0 === 'updateAuthUserInfo' ? 3 : _context3.t0 === 'handle_node_events' ? 6 : 12;
                                                        break;

                                                case 3:
                                                        _context3.next = 5;
                                                        return http.get('user').then(function (res) {
                                                                // console.log(res)
                                                                updateAuthUser(res.data);
                                                        }).catch(function (err) {
                                                                console.log(err);
                                                        });

                                                case 5:
                                                        return _context3.abrupt("break", 13);

                                                case 6:
                                                        handling_node_events.current = true;

                                                        _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                                                                var data, ids, _ids;

                                                                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                        while (1) {
                                                                                switch (_context2.prev = _context2.next) {
                                                                                        case 0:
                                                                                                data = node_events_queue.current.shift();
                                                                                                // console.log('start', data, node_events_queue.current)
                                                                                                // return

                                                                                                if (!(data.operation === 'add')) {
                                                                                                        _context2.next = 8;
                                                                                                        break;
                                                                                                }

                                                                                                // console.log('emitting echo')
                                                                                                // console.log(data)
                                                                                                ids = new FormData();

                                                                                                data.node.map(function (element) {
                                                                                                        // console.log(element)
                                                                                                        ids.append('ids[]', element);
                                                                                                });
                                                                                                // console.log(ids.get('ids[]'))

                                                                                                _context2.next = 6;
                                                                                                return http.post('getDatasByIds', ids).then(function (res) {
                                                                                                        // console.log('getDatasByIds_add', res)

                                                                                                        setImmediate(function () {
                                                                                                                dispatch({ type: 'add', data: Object.assign({}, data, { 'node': res.data }) });
                                                                                                        });
                                                                                                }).catch(function (err) {
                                                                                                        console.log(err);
                                                                                                });

                                                                                        case 6:
                                                                                                _context2.next = 17;
                                                                                                break;

                                                                                        case 8:
                                                                                                if (!(data.operation === 'delete')) {
                                                                                                        _context2.next = 12;
                                                                                                        break;
                                                                                                }

                                                                                                // console.log('emitting echo')
                                                                                                setImmediate(function () {
                                                                                                        dispatch({ type: 'delete', data: data });
                                                                                                });
                                                                                                _context2.next = 17;
                                                                                                break;

                                                                                        case 12:
                                                                                                if (!(data.operation === 'update')) {
                                                                                                        _context2.next = 17;
                                                                                                        break;
                                                                                                }

                                                                                                // console.log('echo update ')

                                                                                                _ids = new FormData();
                                                                                                // console.log('data.node', data.node)

                                                                                                data.node.map(function (element) {
                                                                                                        // console.log(element)
                                                                                                        _ids.append('ids[]', element);
                                                                                                });
                                                                                                _context2.next = 17;
                                                                                                return http.post('getDatasByIds', _ids).then(function (res) {
                                                                                                        // console.log('getDatasByIds_update', res)

                                                                                                        setImmediate(function () {
                                                                                                                dispatch({ type: 'update', data: Object.assign({}, data, { 'node': res.data }) });
                                                                                                        });
                                                                                                }).catch(function (err) {
                                                                                                        console.log(err);
                                                                                                });

                                                                                        case 17:
                                                                                        case "end":
                                                                                                return _context2.stop();
                                                                                }
                                                                        }
                                                                }, _callee2, _this2);
                                                        });

                                                case 8:
                                                        return _context3.delegateYield(_loop(), "t1", 9);

                                                case 9:
                                                        if (node_events_queue.current.length) {
                                                                _context3.next = 8;
                                                                break;
                                                        }

                                                case 10:

                                                        handling_node_events.current = false;

                                                        return _context3.abrupt("break", 13);

                                                case 12:
                                                        return _context3.abrupt("break", 13);

                                                case 13:
                                                case "end":
                                                        return _context3.stop();
                                        }
                                }
                        }, _callee3, _this2);
                }));

                return function echosHandler(_x3) {
                        return _ref2.apply(this, arguments);
                };
        }();

        var _useState11 = useState(["0"]),
            _useState12 = _slicedToArray(_useState11, 2),
            expanded = _useState12[0],
            setExpanded = _useState12[1];

        useEffect(function () {
                var echo = new Echo(options);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                        for (var _iterator = authUser.services[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var service = _step.value;

                                echo.private("nodeUpdate." + service.id).listen('NodeUpdateEvent', function (data) {
                                        node_events_queue.current.push(data);
                                        // console.log('NodeUpdateEvent', node_events_queue.current, data)
                                        if (!handling_node_events.current) echosHandler('handle_node_events');
                                });
                        }

                        // echo.private(`nodeUpdate.1`).listen( 'NodeUpdateEvent', (data) =>
                        // {
                        //         node_events_queue.current.push(data)
                        //         console.log('NodeUpdateEvent', node_events_queue.current, data)
                        //         if (!handling_node_events.current) echosHandler('handle_node_events')
                        // }
                        // );
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

                echo.private("user." + authUser.id).listen('AuthUserUpdate', function () {
                        // console.log('AuthUserUpdate')
                        echosHandler('updateAuthUserInfo');
                });

                echo.private("user." + authUser.id).notification(function (data) {
                        if (data.type === 'AskPermission') {
                                // console.log(data)

                                echosHandler('updateAuthUserInfo');

                                // toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                toast("Info: L'inspecteur " + data.name + " a fait une demande de permission de votre part \xE1 l'instant !", {
                                        id: data.from_id,
                                        icon: "📢",
                                        style: { fontWeight: 'bold' },
                                        duration: 5000
                                });
                        } else if (data.type === "Information") {
                                // console.log('Informationnnnnnnnnnnnnn!!!!!', data)

                                var attachment = JSON.parse(data.attachment);
                                var attachment_items = [];

                                for (var key in attachment) {
                                        attachment_items.push(React.createElement(
                                                React.Fragment,
                                                { key: key },
                                                React.createElement(
                                                        "b",
                                                        null,
                                                        key,
                                                        ":"
                                                ),
                                                " ",
                                                attachment[key],
                                                " ",
                                                React.createElement("br", null)
                                        ));
                                }

                                toast(React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                                "b",
                                                {
                                                        style: {
                                                                width: '100%',
                                                                display: 'inline-block',
                                                                textAlign: 'center',
                                                                textDecoration: 'underline'
                                                        }
                                                },
                                                "\uFFE3\u3078\uFFE3--- ",
                                                React.createElement(
                                                        "span",
                                                        { style: { transform: "rotateY(180deg)", display: "inline-block" } },
                                                        "\uD83D\uDCE2"
                                                ),
                                                " INFORMATION ",
                                                React.createElement(
                                                        "span",
                                                        { style: { display: "inline-block" } },
                                                        "\uD83D\uDCE2"
                                                ),
                                                " ---\uFFE3\u3078\uFFE3"
                                        ),
                                        " ",
                                        React.createElement("br", null),
                                        " ",
                                        React.createElement("br", null),
                                        React.createElement(
                                                "b",
                                                null,
                                                "Destinateur:"
                                        ),
                                        " ",
                                        data.user_from,
                                        " \uD83D\uDC48(\uFF9F\u30EE\uFF9F\uD83D\uDC48) ",
                                        React.createElement("br", null),
                                        React.createElement(
                                                "b",
                                                null,
                                                "Objet:"
                                        ),
                                        " ",
                                        data.object,
                                        " ",
                                        React.createElement("br", null),
                                        React.createElement(
                                                "b",
                                                null,
                                                "Message:"
                                        ),
                                        "\xA0",
                                        React.createElement(
                                                "span",
                                                {
                                                        style: {
                                                                color: 'blue'
                                                        }
                                                },
                                                data.msg
                                        ),
                                        React.createElement("br", null),
                                        React.createElement(
                                                "div",
                                                { className: "info_attachment" },
                                                attachment_items
                                        ),
                                        React.createElement(
                                                Button,
                                                { className: "d-block mt-2", style: { width: '100%' }, variant: "light", onClick: function onClick() {
                                                                toast.dismiss(data.id);
                                                        } },
                                                "Dismiss"
                                        )
                                ), {
                                        id: data.id,
                                        // icon: 'p',
                                        // type: 'success',
                                        duration: Infinity
                                });
                        } else if (data.type === 'FncReviewNotification') {
                                // console.log(data)

                                // const ids = new FormData
                                //
                                // ids.append('ids[]', `${data.fncId}-fnc`)
                                //
                                // http.post('getDatasByIds', ids)
                                // .then( res =>
                                // {
                                //         console.log(res)
                                //
                                //         const fnc = res.data[0]
                                //
                                //         toast(`Revision de la Fnc ${fnc.name}`,
                                //         {
                                //                 id: 'FncReviewNotification',
                                //                 icon: '🙌',
                                //                 duration: Infinity,
                                //         }
                                //         )
                                // }
                                // )
                                // .catch( err =>
                                // {
                                //         console.log(err)
                                // }
                                // )

                                toast("" + data.msg, {
                                        id: 'FncReviewNotification',
                                        icon: '🙌'
                                });

                                echosHandler('updateAuthUserInfo');
                        }
                });

                EventsManager.on('updateAuthUserInfo', function () {
                        echosHandler('updateAuthUserInfo');
                });

                // EventsManager.on('updateOK', (data) => { setO(data) })

                // EventsManager.on('update_open_state', data => { dispatch({ type: 'update_open_state', data }) })
                EventsManager.on('setExpanded', function (new_expanded) {
                        setExpanded([].concat(_toConsumableArray(new_expanded)));
                });

                // EventsManager.on('updateData', () => { console.log('emit working') })

                return function () {
                        echo.disconnect();
                        EventsManager.off('updateAuthUserInfo');
                        // EventsManager.off('updateOK')
                        EventsManager.off('setExpanded');
                };
        }, []);

        var haveRightToSee = function haveRightToSee(elementServices, authServices) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                        for (var _iterator2 = authServices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var authService = _step2.value;
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                        for (var _iterator3 = elementServices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                                var elementService = _step3.value;
                                                if (elementService.id === authService.id) return true;
                                        }
                                } catch (err) {
                                        _didIteratorError3 = true;
                                        _iteratorError3 = err;
                                } finally {
                                        try {
                                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                        _iterator3.return();
                                                }
                                        } finally {
                                                if (_didIteratorError3) {
                                                        throw _iteratorError3;
                                                }
                                        }
                                }
                        }
                } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                }
                        } finally {
                                if (_didIteratorError2) {
                                        throw _iteratorError2;
                                }
                        }
                }

                return false;
        };

        var Data_Base = { authUser: authUser, data: TheDatas.data };

        Data_Base.data.sections = Data_Base.data.sections.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.audits = Data_Base.data.audits.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.checkLists = Data_Base.data.checkLists.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.dps = Data_Base.data.dps.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.nonCs = Data_Base.data.nonCs.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.fncs = Data_Base.data.fncs.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.ds = Data_Base.data.ds.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });
        Data_Base.data.fs = Data_Base.data.fs.filter(function (element) {
                return haveRightToSee(element.services, Data_Base.authUser.services);
        }).map(function (visibleElement) {
                return visibleElement;
        });

        function makeNodeData(id, global_type, services, isOpen, name, type, isRoot, parentId, path, hasChildren, ext, ra, opening_date, isClosed, review_date, created_at, level, section_id, taille, url, is_validated, validator_id) {
                var validator = arguments.length > 22 && arguments[22] !== undefined ? arguments[22] : null;

                // console.log(created_at, name, parentId)

                return {
                        id: id,
                        global_type: global_type,
                        services: services,
                        isOpen: isOpen,
                        section_id: section_id,
                        name: name,
                        type: type,
                        is_validated: is_validated,
                        validator_id: validator_id,
                        taille: taille,
                        level: level,
                        created_at: created_at && created_at.substring(0, 19),
                        ra: ra,
                        hasChildren: hasChildren,
                        isRoot: isRoot,
                        parentId: parentId,
                        path: path,
                        isClosed: isClosed,
                        opening_date: opening_date,
                        review_date: review_date,
                        ext: ext,
                        url: url,
                        validator: validator
                };
        }

        var sections = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                // console.log(sct)
                sections.set(sct.id, Object.assign({}, sct, { selectedNodeIdInSection: 0 }));
        });

        function copyObject(obj) {
                if (!obj) return obj;

                var constructors = {
                        is_json: function is_json(json) {
                                return json.constructor === Object;
                        },
                        is_array: function is_array(array) {
                                return array.constructor === Array;
                        },
                        is_map: function is_map(map) {
                                return map.constructor === Map;
                        },
                        is_file: function is_file(file) {
                                return file.constructor === File;
                        }

                };

                if (constructors.is_map(obj)) {
                        var map = new Map();

                        obj.forEach(function (value, key) {
                                map.set(key, copyObject(value));
                        });

                        return map;
                } else if (constructors.is_array(obj)) {
                        var array = [];

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                                for (var _iterator4 = obj[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var arrayElement = _step4.value;

                                        array.push(copyObject(arrayElement));
                                }
                        } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                _iterator4.return();
                                        }
                                } finally {
                                        if (_didIteratorError4) {
                                                throw _iteratorError4;
                                        }
                                }
                        }

                        return array;
                } else if (constructors.is_json(obj)) {
                        var json = {};

                        for (var key in obj) {
                                json["" + key] = copyObject(obj["" + key]);
                        }

                        return json;
                } else return obj;
        }

        function compareObjects(obj1, obj2) {
                // Si l'un des objets n'existe pas, retourner false
                if (!obj1 || !obj2) return false;

                // Si les objets sont de types différents, retourner false
                if (obj1.constructor !== obj2.constructor) return false;

                // Si les objets sont des Maps
                if (obj1.constructor === Map) {
                        // Si les Maps ont un nombre différent d'entrées, retourner false
                        if (obj1.size !== obj2.size) return false;
                        // Pour chaque entrée de la Map, comparer la clé et la valeur avec celles de l'autre Map
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                                for (var _iterator5 = obj1[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                        var _ref3 = _step5.value;

                                        var _ref4 = _slicedToArray(_ref3, 2);

                                        var key = _ref4[0];
                                        var value = _ref4[1];

                                        if (!obj2.has(key) || !compareObjects(value, obj2.get(key))) return false;
                                }
                        } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                _iterator5.return();
                                        }
                                } finally {
                                        if (_didIteratorError5) {
                                                throw _iteratorError5;
                                        }
                                }
                        }

                        return true;
                }

                // Si les objets sont des tableaux
                if (obj1.constructor === Array) {
                        // Si les tableaux ont une taille différente, retourner false
                        if (obj1.length !== obj2.length) return false;
                        // Pour chaque élément du tableau, comparer avec celui de l'autre tableau
                        for (var i = 0; i < obj1.length; i++) {
                                if (!compareObjects(obj1[i], obj2[i])) return false;
                        }
                        return true;
                }

                // Si les objets sont des objets JSON
                if (obj1.constructor === Object) {
                        // Si les objets JSON ont un nombre différent de propriétés, retourner false
                        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
                        // Pour chaque propriété de l'objet, comparer avec celle de l'autre objet
                        for (var _key in obj1) {
                                if (!(_key in obj2) || !compareObjects(obj1[_key], obj2[_key])) return false;
                        }
                        return true;
                }

                // Si les objets sont de types différents, retourner false
                return obj1 === obj2;
        }

        var getNewPath = function getNewPath(new_node, all_nodes) {
                var to_update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                if (!new_node) return 'undefined';

                if (new_node.type === 'root') {
                        // console.log('sectionnnnnnnnnnnnnnnnnnnnnnnnnn', sections.get(1), new_node)
                        return sections.get(new_node.section_id).name + ":";
                }

                if (!to_update) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                                for (var _iterator6 = all_nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                        var node = _step6.value;

                                        if (node.id === new_node.id) return node.path;
                                }
                        } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                                _iterator6.return();
                                        }
                                } finally {
                                        if (_didIteratorError6) {
                                                throw _iteratorError6;
                                        }
                                }
                        }
                }

                switch (new_node.type) {
                        case 'audit':
                                {
                                        // let audit
                                        //
                                        // for (const auditElement of  Data_Base.data.audits)
                                        // {
                                        //         // console.log('paath audit ', id, '  ', auditElement.id)
                                        //         if(auditElement.id === id) audit = JSON.parse(JSON.stringify(auditElement))
                                        // }

                                        return getNewPath(sections.get(new_node.section_id), all_nodes, true) + "\\" + new_node.name;
                                }
                        case 'checkList':
                                {
                                        var audit = void 0;

                                        var _iteratorNormalCompletion7 = true;
                                        var _didIteratorError7 = false;
                                        var _iteratorError7 = undefined;

                                        try {
                                                for (var _iterator7 = all_nodes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                                        var _node = _step7.value;

                                                        if (_node.id === new_node.parentId) audit = JSON.parse(JSON.stringify(_node));
                                                }
                                        } catch (err) {
                                                _didIteratorError7 = true;
                                                _iteratorError7 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                                                _iterator7.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError7) {
                                                                throw _iteratorError7;
                                                        }
                                                }
                                        }

                                        return getNewPath(audit, all_nodes) + "\\" + new_node.name;
                                }
                        case 'dp':
                                {
                                        var _audit = void 0;

                                        var _iteratorNormalCompletion8 = true;
                                        var _didIteratorError8 = false;
                                        var _iteratorError8 = undefined;

                                        try {
                                                for (var _iterator8 = all_nodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                                        var _node2 = _step8.value;

                                                        if (_node2.id === new_node.parentId) _audit = JSON.parse(JSON.stringify(_node2));
                                                }
                                        } catch (err) {
                                                _didIteratorError8 = true;
                                                _iteratorError8 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                                                _iterator8.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError8) {
                                                                throw _iteratorError8;
                                                        }
                                                }
                                        }

                                        return getNewPath(_audit, all_nodes) + "\\" + new_node.name;
                                }
                        case 'nonC':
                                {
                                        var _audit2 = void 0;

                                        var _iteratorNormalCompletion9 = true;
                                        var _didIteratorError9 = false;
                                        var _iteratorError9 = undefined;

                                        try {
                                                for (var _iterator9 = all_nodes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                                        var _node3 = _step9.value;

                                                        if (_node3.id === new_node.parentId) _audit2 = JSON.parse(JSON.stringify(_node3));
                                                }
                                        } catch (err) {
                                                _didIteratorError9 = true;
                                                _iteratorError9 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                                                _iterator9.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError9) {
                                                                throw _iteratorError9;
                                                        }
                                                }
                                        }

                                        return getNewPath(_audit2, all_nodes) + "\\" + new_node.name;
                                }
                        case 'fnc':
                                {
                                        var nc = void 0;

                                        var _iteratorNormalCompletion10 = true;
                                        var _didIteratorError10 = false;
                                        var _iteratorError10 = undefined;

                                        try {
                                                for (var _iterator10 = all_nodes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                                        var _node4 = _step10.value;

                                                        if (_node4.id === new_node.parentId) nc = JSON.parse(JSON.stringify(_node4));
                                                }
                                        } catch (err) {
                                                _didIteratorError10 = true;
                                                _iteratorError10 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                                                _iterator10.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError10) {
                                                                throw _iteratorError10;
                                                        }
                                                }
                                        }

                                        return getNewPath(nc, all_nodes) + "\\" + new_node.name;
                                }
                        case 'ds':
                                {
                                        var parent = void 0;

                                        var _iteratorNormalCompletion11 = true;
                                        var _didIteratorError11 = false;
                                        var _iteratorError11 = undefined;

                                        try {
                                                for (var _iterator11 = all_nodes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                                        var _node5 = _step11.value;

                                                        if (_node5.id === new_node.parentId) {
                                                                if (_node5.type === 'root') parent = { type: 'root', section_id: new_node.section_id };else parent = JSON.parse(JSON.stringify(_node5));

                                                                break;
                                                        }
                                                }
                                                // if (new_node.name === "Levius") console.log("Levius***************", all_nodes, parent, new_node)
                                                // console.log('paaaaaaaaaaaaaath', new_node)
                                        } catch (err) {
                                                _didIteratorError11 = true;
                                                _iteratorError11 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                                                _iterator11.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError11) {
                                                                throw _iteratorError11;
                                                        }
                                                }
                                        }

                                        return getNewPath(parent, all_nodes) + "\\" + new_node.name;
                                }
                        case 'f':
                                {
                                        var _parent = void 0;

                                        var _iteratorNormalCompletion12 = true;
                                        var _didIteratorError12 = false;
                                        var _iteratorError12 = undefined;

                                        try {
                                                for (var _iterator12 = all_nodes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                                        var _node6 = _step12.value;

                                                        if (_node6.id === new_node.parentId) {
                                                                if (_node6.type === 'root') _parent = { type: 'root', section_id: new_node.section_id };else _parent = JSON.parse(JSON.stringify(_node6));

                                                                break;
                                                        }
                                                }
                                        } catch (err) {
                                                _didIteratorError12 = true;
                                                _iteratorError12 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                                                _iterator12.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError12) {
                                                                throw _iteratorError12;
                                                        }
                                                }
                                        }

                                        return getNewPath(_parent, all_nodes) + "\\" + new_node.name;
                                }
                        default:
                                {
                                        return new_node.name + ":";
                                }
                }
        };

        var update_path = function update_path(node, current_state) {
                var up_to_date_node = JSON.parse(JSON.stringify(node));

                up_to_date_node.path = getNewPath(up_to_date_node, current_state, true);

                // console.log('current_state', current_state)

                var new_state = JSON.parse(JSON.stringify(current_state)).map(function (current_node) {
                        if (current_node.id === up_to_date_node.id) return up_to_date_node;
                        return current_node;
                });

                // console.log('new_state', new_state)

                var final_state = JSON.parse(JSON.stringify(new_state));

                new_state.forEach(function (new_node) {
                        if (new_node.parentId === up_to_date_node.id) {
                                final_state = update_path(new_node, final_state);
                        }
                });

                return final_state;
        };

        var dataFormater = function dataFormater() {

                // Data_Base.data.audits[0].name = "dddd"

                // makeNodeData(0, "Racine", "root", true, -1, "", true)

                var allDataAsNodeData = [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1)];

                var audits = Data_Base.data.audits.map(function (audit) {
                        return Object.assign({}, audit, {
                                id: "audit" + audit.id
                        });
                });
                var checkLists = Data_Base.data.checkLists.map(function (checkList) {
                        return Object.assign({}, checkList, {
                                id: "checkList" + checkList.id
                        });
                });
                var dps = Data_Base.data.dps.map(function (dp) {
                        return Object.assign({}, dp, {
                                id: "dp" + dp.id
                        });
                });
                var nonCs = Data_Base.data.nonCs.map(function (nonC) {
                        return Object.assign({}, nonC, {
                                id: "nonC" + nonC.id
                        });
                });
                var fncs = Data_Base.data.fncs.map(function (fnc) {
                        return Object.assign({}, fnc, {
                                id: "fnc" + fnc.id
                        });
                });
                var fs = Data_Base.data.fs.map(function (f) {
                        return Object.assign({}, f, {
                                id: "f" + f.id
                        });
                });
                var ds = Data_Base.data.ds.map(function (ds) {
                        return Object.assign({}, ds, {
                                id: "ds" + ds.id
                        });
                });

                var getPath = function getPath(id, node_type) {
                        var _iteratorNormalCompletion13 = true;
                        var _didIteratorError13 = false;
                        var _iteratorError13 = undefined;

                        try {
                                for (var _iterator13 = allDataAsNodeData[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                        var node = _step13.value;

                                        if (node.id === id + node_type) return node.path;
                                }
                        } catch (err) {
                                _didIteratorError13 = true;
                                _iteratorError13 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                                _iterator13.return();
                                        }
                                } finally {
                                        if (_didIteratorError13) {
                                                throw _iteratorError13;
                                        }
                                }
                        }

                        switch (node_type) {
                                case 'audit':
                                        {
                                                var audit = void 0;

                                                var _iteratorNormalCompletion14 = true;
                                                var _didIteratorError14 = false;
                                                var _iteratorError14 = undefined;

                                                try {
                                                        for (var _iterator14 = Data_Base.data.audits[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                                                var auditElement = _step14.value;

                                                                // console.log('paath audit ', id, '  ', auditElement.id)
                                                                if (auditElement.id === id) audit = JSON.parse(JSON.stringify(auditElement));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError14 = true;
                                                        _iteratorError14 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                                                        _iterator14.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError14) {
                                                                        throw _iteratorError14;
                                                                }
                                                        }
                                                }

                                                return getPath(audit.section_id, '') + "\\" + audit.name;
                                        }
                                case 'checkList':
                                        {
                                                var checkList = void 0;

                                                var _iteratorNormalCompletion15 = true;
                                                var _didIteratorError15 = false;
                                                var _iteratorError15 = undefined;

                                                try {
                                                        for (var _iterator15 = Data_Base.data.checkLists[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                                                var checkListElement = _step15.value;

                                                                if (checkListElement.id === id) checkList = JSON.parse(JSON.stringify(checkListElement));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError15 = true;
                                                        _iteratorError15 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                                                        _iterator15.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError15) {
                                                                        throw _iteratorError15;
                                                                }
                                                        }
                                                }

                                                return getPath(checkList.audit_id, 'audit') + "\\" + checkList.name;
                                        }
                                case 'dp':
                                        {
                                                var dp = void 0;

                                                var _iteratorNormalCompletion16 = true;
                                                var _didIteratorError16 = false;
                                                var _iteratorError16 = undefined;

                                                try {
                                                        for (var _iterator16 = Data_Base.data.dps[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                                                var dpElement = _step16.value;

                                                                if (dpElement.id === id) dp = JSON.parse(JSON.stringify(dpElement));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError16 = true;
                                                        _iteratorError16 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                                                        _iterator16.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError16) {
                                                                        throw _iteratorError16;
                                                                }
                                                        }
                                                }

                                                return getPath(dp.audit_id, 'audit') + "\\" + dp.name;
                                        }
                                case 'nonC':
                                        {
                                                var nc = void 0;

                                                var _iteratorNormalCompletion17 = true;
                                                var _didIteratorError17 = false;
                                                var _iteratorError17 = undefined;

                                                try {
                                                        for (var _iterator17 = Data_Base.data.nonCs[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                                                                var ncElement = _step17.value;

                                                                if (ncElement.id === id) nc = JSON.parse(JSON.stringify(ncElement));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError17 = true;
                                                        _iteratorError17 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                                                        _iterator17.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError17) {
                                                                        throw _iteratorError17;
                                                                }
                                                        }
                                                }

                                                return getPath(nc.audit_id, 'audit') + "\\" + nc.name;
                                        }
                                case 'fnc':
                                        {
                                                var fnc = void 0;

                                                var _iteratorNormalCompletion18 = true;
                                                var _didIteratorError18 = false;
                                                var _iteratorError18 = undefined;

                                                try {
                                                        for (var _iterator18 = Data_Base.data.fncs[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                                                var fncElement = _step18.value;

                                                                if (fncElement.id === id) fnc = JSON.parse(JSON.stringify(fncElement));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError18 = true;
                                                        _iteratorError18 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                                                        _iterator18.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError18) {
                                                                        throw _iteratorError18;
                                                                }
                                                        }
                                                }

                                                return getPath(fnc.nc_id, 'nonC') + "\\" + fnc.name;
                                        }
                                case 'ds':
                                        {
                                                var folder = void 0;

                                                var _iteratorNormalCompletion19 = true;
                                                var _didIteratorError19 = false;
                                                var _iteratorError19 = undefined;

                                                try {
                                                        for (var _iterator19 = Data_Base.data.ds[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                                                var _ds = _step19.value;

                                                                if (_ds.id === id) folder = JSON.parse(JSON.stringify(_ds));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError19 = true;
                                                        _iteratorError19 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                                                        _iterator19.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError19) {
                                                                        throw _iteratorError19;
                                                                }
                                                        }
                                                }

                                                return getPath(folder.parent_id, folder.parent_type) + "\\" + folder.name;
                                        }
                                case 'f':
                                        {
                                                var file = void 0;

                                                var _iteratorNormalCompletion20 = true;
                                                var _didIteratorError20 = false;
                                                var _iteratorError20 = undefined;

                                                try {
                                                        for (var _iterator20 = Data_Base.data.fs[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                                                                var f = _step20.value;

                                                                if (f.id === id) file = JSON.parse(JSON.stringify(f));
                                                        }
                                                } catch (err) {
                                                        _didIteratorError20 = true;
                                                        _iteratorError20 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion20 && _iterator20.return) {
                                                                        _iterator20.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError20) {
                                                                        throw _iteratorError20;
                                                                }
                                                        }
                                                }

                                                return getPath(file.parent_id, file.parent_type) + "\\" + file.name;
                                        }
                                default:
                                        {
                                                var _iteratorNormalCompletion21 = true;
                                                var _didIteratorError21 = false;
                                                var _iteratorError21 = undefined;

                                                try {
                                                        for (var _iterator21 = Data_Base.data.sections[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                                                var section = _step21.value;

                                                                if (section.id === id) return section.name + ":";
                                                        }
                                                } catch (err) {
                                                        _didIteratorError21 = true;
                                                        _iteratorError21 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                                                        _iterator21.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError21) {
                                                                        throw _iteratorError21;
                                                                }
                                                        }
                                                }
                                        }
                        }
                };

                // audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19)
                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;

                try {
                        for (var _iterator22 = audits[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                                var audit = _step22.value;

                                allDataAsNodeData.push(makeNodeData(audit.id, "folder", audit.services, false, audit.name, "audit", false, '0', getPath(parseInt(audit.id.substring(5), 10), 'audit'), true, undefined, audit.user, undefined, undefined, undefined, audit.created_at, undefined, audit.section_id, undefined, undefined, audit.is_validated, audit.validator_id, audit.validator));
                        }

                        // checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError22 = true;
                        _iteratorError22 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion22 && _iterator22.return) {
                                        _iterator22.return();
                                }
                        } finally {
                                if (_didIteratorError22) {
                                        throw _iteratorError22;
                                }
                        }
                }

                var _iteratorNormalCompletion23 = true;
                var _didIteratorError23 = false;
                var _iteratorError23 = undefined;

                try {
                        for (var _iterator23 = checkLists[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                                var checkList = _step23.value;

                                allDataAsNodeData.push(makeNodeData(checkList.id, "folder", checkList.services, false, checkList.name, "checkList", false, "audit" + checkList.audit_id, getPath(parseInt(checkList.id.substring(9), 10), 'checkList'), true, undefined, undefined, undefined, undefined, undefined, checkList.created_at, undefined, checkList.section_id, undefined, undefined, checkList.is_validated, checkList.validator_id, checkList.validator));
                        }

                        // dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError23 = true;
                        _iteratorError23 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion23 && _iterator23.return) {
                                        _iterator23.return();
                                }
                        } finally {
                                if (_didIteratorError23) {
                                        throw _iteratorError23;
                                }
                        }
                }

                var _iteratorNormalCompletion24 = true;
                var _didIteratorError24 = false;
                var _iteratorError24 = undefined;

                try {
                        for (var _iterator24 = dps[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                                var dp = _step24.value;

                                allDataAsNodeData.push(makeNodeData(dp.id, "folder", dp.services, false, dp.name, "dp", false, "audit" + dp.audit_id, getPath(parseInt(dp.id.substring(2), 10), 'dp'), true, undefined, undefined, undefined, undefined, undefined, dp.created_at, undefined, dp.section_id, undefined, undefined, dp.is_validated, dp.validator_id, dp.validator));
                        }

                        // nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError24 = true;
                        _iteratorError24 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                                        _iterator24.return();
                                }
                        } finally {
                                if (_didIteratorError24) {
                                        throw _iteratorError24;
                                }
                        }
                }

                var _iteratorNormalCompletion25 = true;
                var _didIteratorError25 = false;
                var _iteratorError25 = undefined;

                try {
                        for (var _iterator25 = nonCs[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                                var nonC = _step25.value;

                                allDataAsNodeData.push(makeNodeData(nonC.id, "folder", nonC.services, false, nonC.name, "nonC", false, "audit" + nonC.audit_id, getPath(parseInt(nonC.id.substring(4), 10), 'nonC'), true, undefined, undefined, undefined, undefined, undefined, nonC.created_at, undefined, nonC.section_id, undefined, undefined, nonC.is_validated, nonC.validator_id, nonC.validator));
                        }

                        // fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError25 = true;
                        _iteratorError25 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion25 && _iterator25.return) {
                                        _iterator25.return();
                                }
                        } finally {
                                if (_didIteratorError25) {
                                        throw _iteratorError25;
                                }
                        }
                }

                var _iteratorNormalCompletion26 = true;
                var _didIteratorError26 = false;
                var _iteratorError26 = undefined;

                try {
                        for (var _iterator26 = fncs[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                                var fnc = _step26.value;

                                allDataAsNodeData.push(makeNodeData(fnc.id, "folder", fnc.services, false, fnc.name, "fnc", false, "nonC" + fnc.nc_id, getPath(parseInt(fnc.id.substring(3), 10), 'fnc'), true, undefined, undefined, fnc.opening_date, fnc.isClosed, fnc.review_date, fnc.created_at, fnc.level, fnc.section_id, undefined, undefined, fnc.is_validated, fnc.validator_id, fnc.validator));
                        }

                        // f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError26 = true;
                        _iteratorError26 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion26 && _iterator26.return) {
                                        _iterator26.return();
                                }
                        } finally {
                                if (_didIteratorError26) {
                                        throw _iteratorError26;
                                }
                        }
                }

                var _iteratorNormalCompletion27 = true;
                var _didIteratorError27 = false;
                var _iteratorError27 = undefined;

                try {
                        for (var _iterator27 = fs[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                                var f = _step27.value;

                                allDataAsNodeData.push(makeNodeData(f.id, "file", f.services, false, f.name, "f", false, f.parent_type === '' ? '0' : f.parent_type + f.parent_id, getPath(parseInt(f.id.substring(1), 10), 'f'), false, f.extension, undefined, undefined, undefined, undefined, f.created_at, undefined, f.section_id, f.size, f.url, f.is_validated, f.validator_id, f.validator));
                        }

                        // d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19)
                } catch (err) {
                        _didIteratorError27 = true;
                        _iteratorError27 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion27 && _iterator27.return) {
                                        _iterator27.return();
                                }
                        } finally {
                                if (_didIteratorError27) {
                                        throw _iteratorError27;
                                }
                        }
                }

                var _iteratorNormalCompletion28 = true;
                var _didIteratorError28 = false;
                var _iteratorError28 = undefined;

                try {
                        for (var _iterator28 = ds[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                                var d = _step28.value;

                                allDataAsNodeData.push(makeNodeData(d.id, "folder", d.services, false, d.name, "ds", false, d.parent_type === '' ? '0' : d.parent_type + d.parent_id, getPath(parseInt(d.id.substring(2), 10), 'ds'), true, undefined, undefined, undefined, undefined, undefined, d.created_at, undefined, d.section_id, undefined, undefined, d.is_validated, d.validator_id, d.validator));
                        }

                        // console.log("DataFormater", allDataAsNodeData)

                } catch (err) {
                        _didIteratorError28 = true;
                        _iteratorError28 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion28 && _iterator28.return) {
                                        _iterator28.return();
                                }
                        } finally {
                                if (_didIteratorError28) {
                                        throw _iteratorError28;
                                }
                        }
                }

                return allDataAsNodeData;
        };

        function reducer(state, action) {
                function create_new_node(node) {

                        var type = node.front_type;

                        var parentId = void 0;
                        switch (type) {
                                case 'audit':
                                        parentId = '0';
                                        break;
                                case 'checkList':
                                        parentId = 'audit' + node.audit_id;
                                        break;
                                case 'dp':
                                        parentId = 'audit' + node.audit_id;
                                        break;
                                case 'nonC':
                                        parentId = 'audit' + node.audit_id;
                                        break;
                                case 'fnc':
                                        parentId = 'nonC' + node.nc_id;
                                        break;
                                case 'ds':
                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id;
                                        break;
                                case 'f':
                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id;
                                        break;

                                default:
                                        break;
                        }

                        return makeNodeData(type + node.id, type === 'f' ? 'file' : 'folder', node.services, false, node.name, type, false, parentId, undefined, type !== 'f', type === 'f' ? node.extension : undefined, type === 'audit' ? node.user : undefined, type === 'fnc' ? node.opening_date : undefined, type === 'fnc' ? node.isClosed : undefined, type === 'fnc' ? node.review_date : undefined, node.created_at, //
                        type === 'fnc' ? node.level : undefined, parseInt(node.section_id), type === 'f' ? node.size : undefined, type === 'f' ? node.url : undefined, node.is_validated, node.validator_id, node.validator);
                }

                function supress_from_list(qualified_id, list_of_data) {
                        var new_list = [].concat(_toConsumableArray(list_of_data)).filter(function (node) {
                                return node.id !== qualified_id;
                        });

                        var _arr = [].concat(_toConsumableArray(getChildrenFrom([].concat(_toConsumableArray(new_list)), qualified_id)));

                        for (var _i = 0; _i < _arr.length; _i++) {
                                var child = _arr[_i];
                                new_list = supress_from_list(child.id, [].concat(_toConsumableArray(new_list)));
                        }

                        return new_list;
                }

                switch (action.type) {
                        case 'refresh':
                                return [].concat(_toConsumableArray(state));
                        case 'add':
                                {
                                        to_refresh.current = true;

                                        var data = action.data;
                                        // console.log( 'broadcast.........', data);

                                        // const section_id = data.node.constructor === Array ? parseInt(data.node[0].section_id) : parseInt(data.node.section_id)

                                        if (data.node.constructor === Array) {
                                                var _loop2 = function _loop2(node) {
                                                        var new_node = create_new_node(node);

                                                        if (state.find(function (node) {
                                                                return node.id === new_node.id;
                                                        })) return "continue";

                                                        new_node.path = getNewPath(Object.assign({}, new_node), [].concat(_toConsumableArray(state)), true);

                                                        state.push(new_node);
                                                };

                                                // console.log("heeeerre", existing_data)
                                                var _iteratorNormalCompletion29 = true;
                                                var _didIteratorError29 = false;
                                                var _iteratorError29 = undefined;

                                                try {
                                                        for (var _iterator29 = data.node[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                                                                var node = _step29.value;

                                                                var _ret2 = _loop2(node);

                                                                if (_ret2 === "continue") continue;
                                                        }
                                                } catch (err) {
                                                        _didIteratorError29 = true;
                                                        _iteratorError29 = err;
                                                } finally {
                                                        try {
                                                                if (!_iteratorNormalCompletion29 && _iterator29.return) {
                                                                        _iterator29.return();
                                                                }
                                                        } finally {
                                                                if (_didIteratorError29) {
                                                                        throw _iteratorError29;
                                                                }
                                                        }
                                                }
                                        }

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'delete':
                                {
                                        to_refresh.current = true;

                                        var _data = action.data;
                                        // console.log( 'broadcast.........', data);

                                        // console.log('enter notif update')

                                        authUser.asking_permission_notifications.forEach(function (notif) {
                                                // console.log(notif.operable_id, data.node.id, notif.operable_id === data.node.id)
                                                if (notif.operable_id === _data.node.id) {
                                                        // console.log('notif update')
                                                        echosHandler('updateAuthUserInfo');
                                                        EventsManager.emit('updateNotif', notif.id);
                                                }
                                        });

                                        var newState = supress_from_list(_data.node.type + _data.node.id, [].concat(_toConsumableArray(state)));

                                        // EventsManager.emit('updateData')

                                        // console.log('newState', newState)

                                        return JSON.parse(JSON.stringify(newState));
                                }
                        case 'update':
                                {
                                        to_refresh.current = true;

                                        var _data2 = action.data;
                                        // console.log( 'broadcast.........', data);

                                        var _newState = JSON.parse(JSON.stringify(state));

                                        var _loop3 = function _loop3(_node7) {
                                                var updatedNode = create_new_node(_node7);

                                                // console.log('updatedNode', updatedNode)

                                                var current_state = JSON.parse(JSON.stringify(_newState));
                                                _newState = current_state.map(function (node) {
                                                        if (node.id === updatedNode.id) {
                                                                // updatedNode.path = getNewPath(updatedNode, state, true)

                                                                return updatedNode;
                                                        }
                                                        // else if ( (node.parentId === updatedNode.id) )
                                                        // {
                                                        //         node.path = getNewPath(node, state, true)
                                                        //
                                                        //         return node
                                                        // }
                                                        return node;
                                                });

                                                _newState = update_path(updatedNode, JSON.parse(JSON.stringify(_newState)));
                                        };

                                        var _iteratorNormalCompletion30 = true;
                                        var _didIteratorError30 = false;
                                        var _iteratorError30 = undefined;

                                        try {
                                                for (var _iterator30 = _data2.node[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                                                        var _node7 = _step30.value;

                                                        _loop3(_node7);
                                                }

                                                // EventsManager.emit('updateData')

                                                // console.log('finalState', newState)
                                        } catch (err) {
                                                _didIteratorError30 = true;
                                                _iteratorError30 = err;
                                        } finally {
                                                try {
                                                        if (!_iteratorNormalCompletion30 && _iterator30.return) {
                                                                _iterator30.return();
                                                        }
                                                } finally {
                                                        if (_didIteratorError30) {
                                                                throw _iteratorError30;
                                                        }
                                                }
                                        }

                                        return JSON.parse(JSON.stringify(_newState));
                                }
                        // case "update_open_state":
                        // {
                        //         state = copyObject(state).map(
                        //          node =>
                        //          {
                        //                  if (node.id === action.data.id) return {...node, isOpen: action.data.new_state}
                        //                  return node
                        //          }
                        //         )
                        //
                        //         return state
                        // }

                        default:
                                break;
                }
        }

        // console.log('Render useGetData')

        var _useReducer = useReducer(reducer, dataFormater()),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            FetchedNodesData = _useReducer2[0],
            dispatch = _useReducer2[1];

        window.Global_State['isEditorMode'] = isEditorMode;
        window.Global_State['dataBaseData'] = FetchedNodesData;
        window.Global_State['EventsManager'] = EventsManager;

        var editor = useEditor(FetchedNodesData);

        useEffect(function () {
                if (!isEditorMode) editor.close();else editor.open();
        }, [isEditorMode]);

        useEffect(function () {
                editor.update_initData(FetchedNodesData);
                if (to_refresh.current) setImmediate(function () {
                        dispatch({ type: 'refresh' });
                });
                to_refresh.current = false;
        }, [FetchedNodesData]);

        var dataToUse = useMemo(function () {
                return isEditorMode ? editor.data : JSON.parse(JSON.stringify(FetchedNodesData));
        }, [FetchedNodesData, isEditorMode, editor.data]);

        var structuredData = useMemo(function () {
                var map = new Map();

                var _loop4 = function _loop4(section) {
                        map.set(section.id, dataToUse.filter(function (nodeData) {
                                /*console.log(nodeData.section_id, section.id);*/return nodeData.section_id === section.id || nodeData.section_id === -1;
                        }).map(function (nodeData) {
                                return nodeData;
                        }));
                };

                var _iteratorNormalCompletion31 = true;
                var _didIteratorError31 = false;
                var _iteratorError31 = undefined;

                try {
                        for (var _iterator31 = Data_Base.data.sections[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                                var section = _step31.value;

                                _loop4(section);
                        }
                } catch (err) {
                        _didIteratorError31 = true;
                        _iteratorError31 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion31 && _iterator31.return) {
                                        _iterator31.return();
                                }
                        } finally {
                                if (_didIteratorError31) {
                                        throw _iteratorError31;
                                }
                        }
                }

                return map;
        }, [dataToUse]);
        // console.log('structuredData',structuredData)


        var _useState13 = useState(Data_Base.data.sections.length === 0 ? 0 : Data_Base.data.sections[0].id),
            _useState14 = _slicedToArray(_useState13, 2),
            selectedSectionId = _useState14[0],
            setSectionId = _useState14[1];

        // console.log('selectedSectionId',selectedSectionId)

        var displayingSection = useMemo(function () {
                return Data_Base.data.sections.length === 0 ? [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1)] : structuredData.get(selectedSectionId);
        }, [selectedSectionId, structuredData]);

        var dataParsedToJson = useMemo(function () {
                return parseToJson(displayingSection);
        }, [displayingSection]);

        // console.log(displayingSection)


        var _useState15 = useState(false),
            _useState16 = _slicedToArray(_useState15, 2),
            toggleCleared = _useState16[0],
            setToggleCleared = _useState16[1];

        var clearSelected = function clearSelected(setSelectedRows) {
                setToggleCleared(!toggleCleared);EventsManager.emit('clearSelected');
        };

        function getTypeExt(ext) {
                var img = ["jpeg", "jpg", "png", "gif"];
                var vid = ["mp4", "avi", "MOV", "mpeg"];

                var _iteratorNormalCompletion32 = true;
                var _didIteratorError32 = false;
                var _iteratorError32 = undefined;

                try {
                        for (var _iterator32 = img[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                                var imgExt = _step32.value;

                                if (imgExt === ext) return "img";
                        }
                } catch (err) {
                        _didIteratorError32 = true;
                        _iteratorError32 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion32 && _iterator32.return) {
                                        _iterator32.return();
                                }
                        } finally {
                                if (_didIteratorError32) {
                                        throw _iteratorError32;
                                }
                        }
                }

                var _iteratorNormalCompletion33 = true;
                var _didIteratorError33 = false;
                var _iteratorError33 = undefined;

                try {
                        for (var _iterator33 = vid[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
                                var vidExt = _step33.value;

                                if (vidExt === ext) return "vid";
                        }
                } catch (err) {
                        _didIteratorError33 = true;
                        _iteratorError33 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion33 && _iterator33.return) {
                                        _iterator33.return();
                                }
                        } finally {
                                if (_didIteratorError33) {
                                        throw _iteratorError33;
                                }
                        }
                }

                return ext;
        }

        function getNodeData(id) {
                var _iteratorNormalCompletion34 = true;
                var _didIteratorError34 = false;
                var _iteratorError34 = undefined;

                try {
                        for (var _iterator34 = displayingSection[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                                var node = _step34.value;

                                // console.log(node.id)
                                if (id === node.id) {
                                        return node;
                                }
                        }
                } catch (err) {
                        _didIteratorError34 = true;
                        _iteratorError34 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion34 && _iterator34.return) {
                                        _iterator34.return();
                                }
                        } finally {
                                if (_didIteratorError34) {
                                        throw _iteratorError34;
                                }
                        }
                }

                return null;
        }

        function getNodePath(nodeId) {
                var node = getNodeData(nodeId);
                if (node) {
                        if (!node.isRoot && node.path) {
                                return node.path;
                        } else if (!node.isRoot) {
                                node.path = getNodePath(node.parentId).push(node.name);
                                return node.path;
                        } else return [node.name];
                }
        }

        function getChildrenFrom(list_of_data, nodeId) {
                var children = [];
                var _iteratorNormalCompletion35 = true;
                var _didIteratorError35 = false;
                var _iteratorError35 = undefined;

                try {
                        for (var _iterator35 = list_of_data[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
                                var nodeData = _step35.value;

                                if (nodeData.parentId === nodeId) {
                                        children.push(nodeData);
                                }
                        }
                } catch (err) {
                        _didIteratorError35 = true;
                        _iteratorError35 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion35 && _iterator35.return) {
                                        _iterator35.return();
                                }
                        } finally {
                                if (_didIteratorError35) {
                                        throw _iteratorError35;
                                }
                        }
                }

                return children;
        }

        function getType(extension) {
                var ext = getTypeExt(extension);
                switch (ext) {
                        case "img":
                                return "Image";
                        case "vid":
                                return "Video";
                        case "docx":
                                return "Fichier Word";
                        case "pdf":
                                return "Fichier Pdf";
                        case "xlsx":
                                return "Fichier Excel";
                        case "pptx":
                                return "Fichier PowerPoint";
                        case undefined:
                                return "Dossier";
                        default:
                                return "Type de fichier inconnu";
                }
        }

        var getNodeSection = function getNodeSection(id) {
                var node = dataToUse.find(function (node) {
                        return node.id === id;
                });

                if (node) return node.section_id;
                return undefined;
        };

        var getCurrentSection = function getCurrentSection() {
                // console.log(sections.get(selectedSectionId))
                return sections.get(selectedSectionId);
        };

        function useModalManager() {
                var _useState17 = useState(React.createElement("div", null)),
                    _useState18 = _slicedToArray(_useState17, 2),
                    content = _useState18[0],
                    setContent = _useState18[1];

                var _useState19 = useState(false),
                    _useState20 = _slicedToArray(_useState19, 2),
                    show = _useState20[0],
                    setShow = _useState20[1];

                var modal_title = useRef("");
                var can_close = useRef(true);

                var modal = React.createElement(
                        Modal,
                        {
                                show: show,
                                onHide: function onHide() {
                                        if (can_close.current) setShow(false);
                                },
                                size: "lg",
                                centered: true,
                                scrollable: true
                        },
                        React.createElement(
                                Modal.Header,
                                { closeButton: can_close.current },
                                React.createElement(
                                        Modal.Title,
                                        null,
                                        modal_title.current
                                )
                        ),
                        React.createElement(
                                Modal.Body,
                                { style: {
                                                width: 'auto',
                                                height: 'auto'
                                        } },
                                content
                        )
                );

                var _useState21 = useState(React.createElement("div", null)),
                    _useState22 = _slicedToArray(_useState21, 2),
                    container = _useState22[0],
                    setModalOpening = _useState22[1];

                return {
                        modal: modal,
                        open_modal: function open_modal(title) {
                                var may_close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                                can_close.current = may_close;modal_title.current = title;setShow(true);
                        },
                        close_modal: function close_modal() {
                                setShow(false);
                        },
                        setContent: setContent
                };
        }

        var modalManager = useModalManager();

        function useShowSpinner() {
                var _useState23 = useState(false),
                    _useState24 = _slicedToArray(_useState23, 2),
                    show = _useState24[0],
                    setShow = _useState24[1];

                var spinner = React.createElement(
                        "div",
                        {
                                style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center'
                                }
                        },
                        " ",
                        React.createElement(Spinner, { animation: "grow", variant: "primary", size: "xl" }),
                        " "
                );

                return {
                        spinner: spinner,
                        show_spinner: function show_spinner() {
                                setShow(true);
                        },
                        hide_spinner: function hide_spinner() {
                                setShow(false);
                        }
                };
        }

        var spinnerManager = useShowSpinner();

        var CustomDropDown = useCallback(function CustomDropDown(_ref5) {
                var id = _ref5.id,
                    icon = _ref5.icon,
                    content = _ref5.content,
                    _ref5$f = _ref5.f,
                    f = _ref5$f === undefined ? undefined : _ref5$f;

                var _useState25 = useState(null),
                    _useState26 = _slicedToArray(_useState25, 2),
                    anchorEl = _useState26[0],
                    setAnchorEl = _useState26[1];

                var handleEnter = function handleEnter(event) {
                        setAnchorEl(event.currentTarget);
                };

                var handleLeave = function handleLeave() {
                        setAnchorEl(null);
                };

                var open = Boolean(anchorEl);
                var drop_id = open ? id : undefined;

                useEffect(function () {
                        if (id === 'notifPanel') {
                                EventsManager.emit('setOpenState', open);
                        }
                }, [anchorEl]);

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

                useEffect(function () {
                        // console.log('byeeeeeeeeeeeeeeeeeeeee', open)
                });

                // const popperAnimation = useSpring({
                //         from: { transform: 'translate3d(0, -20px, 0)'},
                //         to: { transform: 'translate3d(0, 0, 0)' },
                //         config: { duration: 200},
                //         // pause: to_delay === 3,
                //         reset: true,
                //         loop: true,
                // });

                return React.createElement(
                        "div",
                        { id: id, tabIndex: 0, onClick: function onClick(e) {
                                        e.preventDefault();e.stopPropagation();
                                } },
                        React.createElement(
                                "div",
                                { onClick: handleEnter },
                                icon
                        ),
                        React.createElement(
                                Popover,
                                { id: drop_id + "_pop",
                                        PaperProps: {
                                                className: "d-flex",
                                                style: {
                                                        borderRadius: '0.25rem',
                                                        fontSize: '14px',
                                                        border: 'none',
                                                        overflow: 'hidden',
                                                        padding: '0.5rem',
                                                        maxHeight: "80%",
                                                        maxWidth: "95%",
                                                        backgroundColor: "white"
                                                },
                                                onMouseLeave: handleLeave
                                        },
                                        anchorOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'center'
                                        },
                                        transformOrigin: {
                                                vertical: 'top',
                                                horizontal: 'center'
                                        },
                                        onClose: handleLeave,
                                        open: open,
                                        anchorEl: anchorEl
                                },
                                React.createElement(
                                        Box,
                                        { className: "d-flex" },
                                        content
                                )
                        )
                );
        }, []);
        // console.log(sections)


        var initSelectedNodes = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                initSelectedNodes.set(sct.id, '0');
        });

        var selectedNodeIdsInSections = useRef(initSelectedNodes);

        var sizeFormater = function sizeFormater(size) {
                var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Bytes";

                var s = parseFloat(size);
                var new_unit = void 0;
                switch (unit) {
                        case "Bytes":
                                new_unit = "Ko";
                                break;
                        case "Ko":
                                new_unit = "Mo";
                                break;
                        case "Mo":
                                new_unit = "Go";
                                break;
                        case "Go":
                                new_unit = "To";
                                break;

                        default:
                                new_unit = "To";
                                break;
                }
                if (s > 716.8) return sizeFormater(s / 1024, fix, new_unit);
                return fix ? s.toFixed(3) + ' ' + unit : s + ' ' + unit;
        };

        var identifyNode = function identifyNode(node) {

                // getting type and id according to backend
                var id = void 0;
                var type = void 0;

                // console.log(node)

                switch (node.type) {
                        case 'root':
                                type = 'App\\Models\\Section';
                                id = getCurrentSection().id;
                                return [id, type];
                        case 'audit':
                                type = "App\\Models\\Audit";
                                id = parseInt(node.id.substring(5), 10);
                                return [id, type];
                        case 'checkList':
                                type = "App\\Models\\checkList";
                                id = parseInt(node.id.substring(9), 10);
                                return [id, type];
                        case 'dp':
                                type = 'App\\Models\\DossierPreuve';
                                id = parseInt(node.id.substring(2), 10);
                                return [id, type];
                        case 'nonC':
                                type = 'App\\Models\\Nc';
                                id = parseInt(node.id.substring(4), 10);
                                return [id, type];
                        case 'fnc':
                                type = 'App\\Models\\NonConformite';
                                id = parseInt(node.id.substring(3), 10);
                                return [id, type];
                        case 'ds':
                                type = 'App\\Models\\DossierSimple';
                                id = parseInt(node.id.substring(2), 10);
                                return [id, type];
                        case 'f':
                                type = 'App\\Models\\Fichier';
                                id = parseInt(node.id.substring(1), 10);
                                return node.global_type === 'file' ? [id, type] : undefined;

                        default:
                                break;
                }
        };

        var parseModelToFrontType = function parseModelToFrontType(model) {
                switch (model) {
                        case 'App\\Models\\Section':
                                return 'root';
                        case 'App\\Models\\Audit':
                                return 'audit';
                        case 'App\\Models\\checkList':
                                return 'checkList';
                        case 'App\\Models\\DossierPreuve':
                                return 'dp';
                        case 'App\\Models\\Nc':
                                return 'nonC';
                        case 'App\\Models\\NonConformite':
                                return 'fnc';
                        case 'App\\Models\\DossierSimple':
                                return 'ds';
                        case 'App\\Models\\Fichier':
                                return 'f';
                        default:
                                return null;

                }
        };

        var _useState27 = useState({
                style: {
                        display: 'none',
                        position: 'fixed',
                        zIndex: '1040',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        animation: "fadeMe 0.5s",
                        backgroundColor: '#00000000'
                        // pointerEvents: 'none',
                        // opacity: 0.5,
                } }),
            _useState28 = _slicedToArray(_useState27, 2),
            Overlay_props = _useState28[0],
            setOverlay_props = _useState28[1];

        var Overlay_component = React.createElement("div", Object.assign({}, Overlay_props, { onClick: function onClick(e) {
                        e.stopPropagation();
                        setOverlay_props(function (t) {
                                return Object.assign({}, t, {
                                        style: Object.assign({}, t.style, {
                                                display: 'none'
                                        })
                                });
                        });
                } }));

        var absolutePopover = useAbsolutePopover();

        return Object.assign({}, window.Global_State, {
                // EventsManager,
                // isEditorMode,
                authUser: Data_Base.authUser, updateAuthUserInfo: function updateAuthUserInfo(value) {
                        /*console.log("updateAuthUser", value);*/updateAuthUser(value);
                },
                // dataBaseData: FetchedNodesData,
                dataToUse: dataToUse,
                hasSection: Data_Base.data.sections.length !== 0,
                value: displayingSection,
                jsonValue: dataParsedToJson,
                editor: editor,
                changeMode: function changeMode() {
                        setIsEditorMode(function (t) {
                                return !t;
                        });
                },
                createNodeData: makeNodeData,
                parseModelToFrontType: parseModelToFrontType,
                getNodeDataById: getNodeData,
                getChildrenById: getChildrenFrom,
                getType: getType,
                getNodeSection: getNodeSection,
                getNewPath: getNewPath,
                update_path: update_path,
                copyObject: copyObject,
                compareObjects: compareObjects,
                modalManager: modalManager,
                spinnerManager: spinnerManager,
                selectedSectionId: selectedSectionId,
                setSectionId: setSectionId,
                sections: sections,
                structuredData: structuredData,
                // setFnd,
                selectedNodeIdsInSections: selectedNodeIdsInSections,
                getCurrentSection: getCurrentSection,
                sizeFormater: sizeFormater,
                identifyNode: identifyNode,
                toggleCleared: toggleCleared,
                clearSelected: clearSelected,
                CustomDropDown: CustomDropDown,
                Overlay_component: Overlay_component,
                setOverlay_props: setOverlay_props,
                absolutePopover: absolutePopover,
                expanded: expanded
        });
}