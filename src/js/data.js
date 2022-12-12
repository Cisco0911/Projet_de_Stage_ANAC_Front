import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import parseToJson from "./files_package/parse_to_json";
import useEditor from './editor';
import { Global_State } from "./main";

import axios from "axios";
import Echo from 'laravel-echo';
import EventEmitter from 'eventemitter3';

import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

window.Pusher = require('pusher-js');

export var http = axios.create({
        baseURL: 'http://localhost:80',
        headers: {},
        withCredentials: true
});

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

var echo = new Echo(options);

var echosHandler = void 0;

// echo.channel(`nodeUpdate`).listen( 'NodeUpdateEvent', (data) => {
//   if (data.operation === 'add') 
//   {
//     console.log('emitting echo')
//     console.log(data)
//     const ids = new FormData
//     data.node.forEach(element => {
//       console.log(element)
//       ids.append('ids[]', element)
//     });
//     console.log(ids.get('ids[]'))

//     http.post('getDatasByIds', ids)
//     .then( res =>
//       {
//         console.log(res)

//         echosHandler('NodeUpdateEvent', {...data, 'node': res.data})
//       }
//     )
//     .catch( err =>
//       {
//         console.log(err)
//       }
//     )
//   }
//   else if(data.operation === 'delete')
//   {
//     console.log('emitting echo')
//     echosHandler('NodeUpdateEvent', data)
//   }
// });


var isLogged = false;

export var getFromDataBase = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var Datas;
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
                                                };
                                                _context.next = 3;
                                                return http.get("user").then(function (response) {
                                                        Datas.authUser = response.data;
                                                });

                                        case 3:
                                                _context.next = 5;
                                                return http.get("get_ss").then(function (response) {
                                                        Datas.status.sections = response.status;Datas.data.sections = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.sections = error;
                                                });

                                        case 5:
                                                _context.next = 7;
                                                return http.get("get_audits").then(function (response) {
                                                        Datas.status.audits = response.status;Datas.data.audits = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.audits = error;
                                                });

                                        case 7:
                                                _context.next = 9;
                                                return http.get("get_checkLists").then(function (response) {
                                                        Datas.status.checkLists = response.status;Datas.data.checkLists = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.checkLists = error;
                                                });

                                        case 9:
                                                _context.next = 11;
                                                return http.get("get_Dps").then(function (response) {
                                                        Datas.status.dps = response.status;Datas.data.dps = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.dps = error;
                                                });

                                        case 11:
                                                _context.next = 13;
                                                return http.get("get_NonCs").then(function (response) {
                                                        Datas.status.nonCs = response.status;Datas.data.nonCs = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.nonCs = error;
                                                });

                                        case 13:
                                                _context.next = 15;
                                                return http.get("get_fncs").then(function (response) {
                                                        Datas.status.fncs = response.status;Datas.data.fncs = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.fncs = error;
                                                });

                                        case 15:
                                                _context.next = 17;
                                                return http.get("get_ds").then(function (response) {
                                                        Datas.status.ds = response.status;Datas.data.ds = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.ds = error;
                                                });

                                        case 17:
                                                _context.next = 19;
                                                return http.get("get_fs").then(function (response) {
                                                        Datas.status.fs = response.status;Datas.data.fs = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.fs = error;
                                                });

                                        case 19:
                                                _context.next = 21;
                                                return http.get("get_services").then(function (response) {
                                                        Datas.status.services = response.status;Datas.data.services = response.data;
                                                }).catch(function (error) {
                                                        return Datas.errors.services = error;
                                                });

                                        case 21:

                                                console.log(Datas);

                                                // echo.private(`validating.${Datas.authUser.id}`).listen('RemovalEvent', (data) => {
                                                //   toast((t) => (
                                                //     <div>
                                                //       <div  >
                                                //         Confirmer la suppression de  : {data.node_type} <b>{data.node.name}</b>
                                                //       </div>
                                                //       <div
                                                //           style = {
                                                //               {
                                                //                 display: 'flex',
                                                //                 justifyContent: 'center',
                                                //                 position: 'relative',
                                                //                 alignItems: 'center',
                                                //               }
                                                //           }
                                                //           >
                                                //           <Button style={{ width: 85, height: 35, alignItems: 'center', justifyContent: 'center', }}  variant="primary" onClick={() => toast.dismiss(t.id)}>
                                                //               Dismiss
                                                //           </Button>
                                                //       </div>
                                                //     </div>
                                                //   ),
                                                //   {
                                                //     position: "top-right",
                                                //     style: {
                                                //       border: '1px solid #713200',
                                                //       padding: '16px',
                                                //       color: '#713200',
                                                //     },
                                                //     duration: 9999999999999999,
                                                //   }
                                                //   );
                                                // });

                                                return _context.abrupt("return", Datas);

                                        case 23:
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

export default function useGetData(TheDatas) {

        console.log('checking', TheDatas);

        var _useState = useState(TheDatas.authUser),
            _useState2 = _slicedToArray(_useState, 2),
            authUser = _useState2[0],
            updateAuthUserInfo = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            isEditorMode = _useState4[0],
            setIsEditorMode = _useState4[1];

        var to_refresh = useRef(true);

        echosHandler = function echosHandler(tag) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                switch (tag) {
                        case 'updateAuthUserInfo':
                                {
                                        console.log('updateAuthUserInfo');
                                        http.get('user').then(function (res) {
                                                console.log(res);
                                                updateAuthUserInfo(res.data);
                                        }).catch(function (err) {
                                                console.log(err);
                                        });
                                }
                                break;

                        default:
                                break;
                }
        };

        useEffect(function () {

                echo.channel("nodeUpdate").listen('NodeUpdateEvent', function (data) {
                        // EventsManager.emit('updateData')
                        if (data.operation === 'add') {
                                console.log('emitting echo');
                                console.log(data);
                                var ids = new FormData();
                                data.node.map(function (element) {
                                        console.log(element);
                                        ids.append('ids[]', element);
                                });
                                console.log(ids.get('ids[]'));

                                http.post('getDatasByIds', ids).then(function (res) {
                                        console.log('getDatasByIds', res);

                                        dispatch({ type: 'add', data: Object.assign({}, data, { 'node': res.data }) });
                                }).catch(function (err) {
                                        console.log(err);
                                });
                        } else if (data.operation === 'delete') {
                                console.log('emitting echo');
                                dispatch({ type: 'delete', data: data });
                        } else if (data.operation === 'update') {
                                console.log('echo update ');

                                var _ids = new FormData();
                                console.log('data.node', data.node);
                                data.node.map(function (element) {
                                        console.log(element);
                                        _ids.append('ids[]', element);
                                });
                                http.post('getDatasByIds', _ids).then(function (res) {
                                        console.log(res);

                                        dispatch({ type: 'update', data: Object.assign({}, data, { 'node': res.data }) });
                                }).catch(function (err) {
                                        console.log(err);
                                });
                        } else if (data.operation === 'move') {
                                console.log('emitting move echo', data);
                                var _ids2 = new FormData();
                                data.node.map(function (element) {
                                        console.log(element);
                                        _ids2.append('ids[]', element);
                                });
                                console.log(_ids2.get('ids[]'));

                                http.post('getDatasByIds', _ids2).then(function (res) {
                                        console.log(res);

                                        dispatch({ type: 'move', data: Object.assign({}, data, { 'node': res.data }) });
                                }).catch(function (err) {
                                        console.log(err);
                                });
                        }
                });

                echo.private("user." + authUser.id).listen('AuthUserUpdate', function () {
                        console.log('AuthUserUpdate');
                        echosHandler('updateAuthUserInfo');
                });

                echo.private("user." + authUser.id).notification(function (data) {
                        if (data.type === 'NodeRemovalNotification') {
                                console.log(data);
                                toast(function (t) {
                                        return React.createElement(
                                                "div",
                                                { style: { width: 'auto' } },
                                                React.createElement(
                                                        "div",
                                                        { style: { textAlign: 'center', margin: 10 } },
                                                        "Confirmer la suppression de  : ",
                                                        data.node_type,
                                                        " ",
                                                        React.createElement(
                                                                "b",
                                                                null,
                                                                data.node.operable.name
                                                        )
                                                ),
                                                React.createElement(
                                                        "div",
                                                        {
                                                                style: {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        position: 'relative',
                                                                        alignItems: 'center'
                                                                }
                                                        },
                                                        React.createElement(
                                                                Button,
                                                                { style: { width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }, variant: "danger", onClick: function onClick() {
                                                                                var msg = new FormData();
                                                                                msg.append('object', 'confirmed');
                                                                                msg.append('value', "Suppression confirm\xE9 par " + authUser.name.substring(0, 1) + ". " + authUser.second_name);
                                                                                msg.append('from', JSON.stringify(authUser));
                                                                                msg.append('to', data.user.id);
                                                                                msg.append('attachment', JSON.stringify(data.node));

                                                                                http.post('notify_response', msg);

                                                                                toast.dismiss(t.id);
                                                                        } },
                                                                "Supprimer"
                                                        ),
                                                        React.createElement(
                                                                Button,
                                                                { style: { width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }, variant: "light", onClick: function onClick() {
                                                                                EventsManager.emit('setSelectedNode', { id: "" + data.node.front_type + data.node.operable.id, section_id: data.node.operable.section_id });toast.dismiss(t.id);
                                                                        } },
                                                                "Consulter"
                                                        ),
                                                        React.createElement(
                                                                Button,
                                                                { style: { width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }, variant: "light", onClick: function onClick() {
                                                                                var msg = new FormData();
                                                                                msg.append('object', 'rejected');
                                                                                msg.append('value', "Suppression rejet\xE9 par " + authUser.name.substring(0, 1) + ". " + authUser.second_name);
                                                                                msg.append('from', JSON.stringify(authUser));
                                                                                msg.append('to', data.user.id);
                                                                                msg.append('attachment', JSON.stringify(data.node));

                                                                                http.post('notify_response', msg);

                                                                                toast.dismiss(t.id);
                                                                        } },
                                                                "Refuser"
                                                        )
                                                )
                                        );
                                }, {
                                        id: 'NodeRemovalNotification',
                                        position: "top-right",
                                        style: {
                                                // width: '1700px',
                                                border: '1px solid #713200',
                                                padding: '16px',
                                                color: '#713200'
                                        },
                                        duration: 5000
                                });

                                echosHandler('updateAuthUserInfo');
                        } else if (data.type === "NodeRemovalResponse") {
                                if (data.msg.object === 'rejected') {
                                        toast.error(data.msg.value + ": " + data.msg.attachment.operable.name, {
                                                id: 'NodeRemovalResponse'
                                                // duration: Infinity,
                                        });
                                } else {
                                        var operation = data.msg.attachment;
                                        console.log(operation);
                                        toast.success(data.msg.value + ": " + data.msg.attachment.operable.name, {
                                                id: 'NodeRemovalResponse'
                                                // duration: Infinity,
                                        });
                                        // http.delete(`del_folder?id=${data.msg.attachment.id};approved=${true}`)
                                        // toast.success(data.msg.value,
                                        //   {
                                        //     position: "top-right",
                                        //   }
                                        // )
                                }
                        } else if (data.type === 'FncReviewNotification') {
                                console.log(data);

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
                                        icon: '🙌',
                                        duration: Infinity
                                });
                        }
                });

                EventsManager.on('updateAuthUserInfo', function () {
                        echosHandler('updateAuthUserInfo');
                });

                // EventsManager.on('nodeUpdate', data => { dispatch({ type: 'update', data }) })

                // EventsManager.on('updateData', () => { console.log('emit working') })

                return function () {
                        EventsManager.off('updateAuthUserInfo');
                        // EventsManager.off('nodeUpdate')
                };
        }, []);

        // sections: [],
        //           audits: [],
        //           checkLists: [],
        //           dps: [],
        //           nonCs: [],
        //           fncs: [],
        //           fs: [],
        //           ds: [],

        // console.log(TheDatas)

        var haveRightToSee = function haveRightToSee(elementServices, authServices) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                        for (var _iterator = authServices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var authService = _step.value;
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                        for (var _iterator2 = elementServices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                var elementService = _step2.value;
                                                if (elementService.id === authService.id) return true;
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

        function makeNodeData(id, global_type, services, isOpen, name, type, isRoot, parentId, path, hasChildren, ext, ra, isClosed, review_date, created_at, level, section_id, taille, url) {

                return {
                        id: id,
                        global_type: global_type,
                        services: services,
                        isOpen: isOpen,
                        section_id: section_id,
                        name: name,
                        type: type,
                        taille: taille,
                        level: level,
                        created_at: created_at,
                        ra: ra,
                        hasChildren: hasChildren,
                        isRoot: isRoot,
                        parentId: parentId,
                        path: path,
                        isClosed: isClosed,
                        review_date: review_date,
                        ext: ext,
                        url: url
                };
        }

        var sections = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                // console.log(sct)
                sections.set(sct.id, Object.assign({}, sct, { selectedNodeIdInSection: 0 }));
        });

        var getNewPath = function getNewPath(new_node, all_nodes) {
                var to_update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                if (new_node.type === 'root') {
                        return sections.get(new_node.section_id).name + ":";
                }

                if (!to_update) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                                for (var _iterator3 = all_nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var node = _step3.value;

                                        if (node.id === new_node.id) return node.path;
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

                                        var _iteratorNormalCompletion4 = true;
                                        var _didIteratorError4 = false;
                                        var _iteratorError4 = undefined;

                                        try {
                                                for (var _iterator4 = all_nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                                        var _node = _step4.value;

                                                        if (_node.id === new_node.parentId) audit = JSON.parse(JSON.stringify(_node));
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

                                        return getNewPath(audit, all_nodes) + "\\" + new_node.name;
                                }
                        case 'ds':
                                {
                                        var parent = void 0;

                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;

                                        try {
                                                for (var _iterator5 = all_nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                        var _node2 = _step5.value;

                                                        if (_node2.id === new_node.parentId) {
                                                                if (_node2.type === 'root') parent = { type: 'root', section_id: new_node.section_id };else parent = JSON.parse(JSON.stringify(_node2));

                                                                break;
                                                        }
                                                }
                                                // console.log('paaaaaaaaaaaaaath', new_node)
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

                                        return getNewPath(parent, all_nodes) + "\\" + new_node.name;
                                }
                        case 'f':
                                {
                                        var _parent = void 0;

                                        var _iteratorNormalCompletion6 = true;
                                        var _didIteratorError6 = false;
                                        var _iteratorError6 = undefined;

                                        try {
                                                for (var _iterator6 = all_nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                                        var _node3 = _step6.value;

                                                        if (_node3.id === new_node.parentId) {
                                                                if (_node3.type === 'root') _parent = { type: 'root', section_id: new_node.section_id };else _parent = JSON.parse(JSON.stringify(_node3));

                                                                break;
                                                        }
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

                                        return getNewPath(_parent, all_nodes) + "\\" + new_node.name;
                                }
                        default:
                                {
                                        return new_node.name + ":";
                                }
                }
        };

        var dataFormater = function dataFormater() {

                // Data_Base.data.audits[0].name = "dddd"

                // makeNodeData(0, "Racine", "root", true, -1, "", true)

                var allDataAsNodeData = [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, undefined, -1)];

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
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                                for (var _iterator7 = allDataAsNodeData[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                        var node = _step7.value;

                                        if (node.id === id + node_type) return node.path;
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

                        switch (node_type) {
                                case 'audit':
                                        {
                                                var audit = void 0;

                                                var _iteratorNormalCompletion8 = true;
                                                var _didIteratorError8 = false;
                                                var _iteratorError8 = undefined;

                                                try {
                                                        for (var _iterator8 = Data_Base.data.audits[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                                                var auditElement = _step8.value;

                                                                // console.log('paath audit ', id, '  ', auditElement.id)
                                                                if (auditElement.id === id) audit = JSON.parse(JSON.stringify(auditElement));
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

                                                return getPath(audit.section_id, '') + "\\" + audit.name;
                                        }
                                case 'checkList':
                                        {
                                                var checkList = void 0;

                                                var _iteratorNormalCompletion9 = true;
                                                var _didIteratorError9 = false;
                                                var _iteratorError9 = undefined;

                                                try {
                                                        for (var _iterator9 = Data_Base.data.checkLists[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                                                var checkListElement = _step9.value;

                                                                if (checkListElement.id === id) checkList = JSON.parse(JSON.stringify(checkListElement));
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

                                                return getPath(checkList.audit_id, 'audit') + "\\" + checkList.name;
                                        }
                                case 'dp':
                                        {
                                                var dp = void 0;

                                                var _iteratorNormalCompletion10 = true;
                                                var _didIteratorError10 = false;
                                                var _iteratorError10 = undefined;

                                                try {
                                                        for (var _iterator10 = Data_Base.data.dps[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                                                var dpElement = _step10.value;

                                                                if (dpElement.id === id) dp = JSON.parse(JSON.stringify(dpElement));
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

                                                return getPath(dp.audit_id, 'audit') + "\\" + dp.name;
                                        }
                                case 'nonC':
                                        {
                                                var nc = void 0;

                                                var _iteratorNormalCompletion11 = true;
                                                var _didIteratorError11 = false;
                                                var _iteratorError11 = undefined;

                                                try {
                                                        for (var _iterator11 = Data_Base.data.nonCs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                                                var ncElement = _step11.value;

                                                                if (ncElement.id === id) nc = JSON.parse(JSON.stringify(ncElement));
                                                        }
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

                                                return getPath(nc.audit_id, 'audit') + "\\" + nc.name;
                                        }
                                case 'fnc':
                                        {
                                                var fnc = void 0;

                                                var _iteratorNormalCompletion12 = true;
                                                var _didIteratorError12 = false;
                                                var _iteratorError12 = undefined;

                                                try {
                                                        for (var _iterator12 = Data_Base.data.fncs[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                                                var fncElement = _step12.value;

                                                                if (fncElement.id === id) fnc = JSON.parse(JSON.stringify(fncElement));
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

                                                return getPath(fnc.nc_id, 'nonC') + "\\" + fnc.name;
                                        }
                                case 'ds':
                                        {
                                                var folder = void 0;

                                                var _iteratorNormalCompletion13 = true;
                                                var _didIteratorError13 = false;
                                                var _iteratorError13 = undefined;

                                                try {
                                                        for (var _iterator13 = Data_Base.data.ds[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                                                var _ds = _step13.value;

                                                                if (_ds.id === id) folder = JSON.parse(JSON.stringify(_ds));
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

                                                return getPath(folder.parent_id, folder.parent_type) + "\\" + folder.name;
                                        }
                                case 'f':
                                        {
                                                var file = void 0;

                                                var _iteratorNormalCompletion14 = true;
                                                var _didIteratorError14 = false;
                                                var _iteratorError14 = undefined;

                                                try {
                                                        for (var _iterator14 = Data_Base.data.fs[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                                                var f = _step14.value;

                                                                if (f.id === id) file = JSON.parse(JSON.stringify(f));
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

                                                return getPath(file.parent_id, file.parent_type) + "\\" + file.name;
                                        }
                                default:
                                        {
                                                var _iteratorNormalCompletion15 = true;
                                                var _didIteratorError15 = false;
                                                var _iteratorError15 = undefined;

                                                try {
                                                        for (var _iterator15 = Data_Base.data.sections[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                                                var section = _step15.value;

                                                                if (section.id === id) return section.name + ":";
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
                                        }
                        }
                };

                // audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19)
                var _iteratorNormalCompletion16 = true;
                var _didIteratorError16 = false;
                var _iteratorError16 = undefined;

                try {
                        for (var _iterator16 = audits[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                var audit = _step16.value;

                                allDataAsNodeData.push(makeNodeData(audit.id, "folder", audit.services, false, audit.name, "audit", false, '0', getPath(parseInt(audit.id.substring(5), 10), 'audit'), true, undefined, audit.user, undefined, undefined, audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19), undefined, audit.section_id, undefined, undefined));
                        }

                        // checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion17 = true;
                var _didIteratorError17 = false;
                var _iteratorError17 = undefined;

                try {
                        for (var _iterator17 = checkLists[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                                var checkList = _step17.value;

                                allDataAsNodeData.push(makeNodeData(checkList.id, "folder", checkList.services, false, checkList.name, "checkList", false, "audit" + checkList.audit_id, getPath(parseInt(checkList.id.substring(9), 10), 'checkList'), true, undefined, undefined, undefined, undefined, checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19), undefined, checkList.section_id, undefined, undefined));
                        }

                        // dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion18 = true;
                var _didIteratorError18 = false;
                var _iteratorError18 = undefined;

                try {
                        for (var _iterator18 = dps[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                var dp = _step18.value;

                                allDataAsNodeData.push(makeNodeData(dp.id, "folder", dp.services, false, dp.name, "dp", false, "audit" + dp.audit_id, getPath(parseInt(dp.id.substring(2), 10), 'dp'), true, undefined, undefined, undefined, undefined, dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19), undefined, dp.section_id, undefined, undefined));
                        }

                        // nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion19 = true;
                var _didIteratorError19 = false;
                var _iteratorError19 = undefined;

                try {
                        for (var _iterator19 = nonCs[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                var nonC = _step19.value;

                                allDataAsNodeData.push(makeNodeData(nonC.id, "folder", nonC.services, false, nonC.name, "nonC", false, "audit" + nonC.audit_id, getPath(parseInt(nonC.id.substring(4), 10), 'nonC'), true, undefined, undefined, undefined, undefined, nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19), undefined, nonC.section_id, undefined, undefined));
                        }

                        // fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion20 = true;
                var _didIteratorError20 = false;
                var _iteratorError20 = undefined;

                try {
                        for (var _iterator20 = fncs[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                                var fnc = _step20.value;

                                allDataAsNodeData.push(makeNodeData(fnc.id, "folder", fnc.services, false, fnc.name, "fnc", false, "nonC" + fnc.nc_id, getPath(parseInt(fnc.id.substring(3), 10), 'fnc'), true, undefined, undefined, fnc.isClosed, fnc.review_date, fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19), fnc.level, fnc.section_id, undefined, undefined));
                        }

                        // f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion21 = true;
                var _didIteratorError21 = false;
                var _iteratorError21 = undefined;

                try {
                        for (var _iterator21 = fs[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                var f = _step21.value;

                                allDataAsNodeData.push(makeNodeData(f.id, "file", f.services, false, f.name, "f", false, f.parent_type === '' ? '0' : f.parent_type + f.parent_id, getPath(parseInt(f.id.substring(1), 10), 'f'), false, f.extension, undefined, undefined, undefined, f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19), undefined, f.section_id, f.size, f.url));
                        }

                        // d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;

                try {
                        for (var _iterator22 = ds[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                                var d = _step22.value;

                                allDataAsNodeData.push(makeNodeData(d.id, "folder", d.services, false, d.name, "ds", false, d.parent_type === '' ? '0' : d.parent_type + d.parent_id, getPath(parseInt(d.id.substring(2), 10), 'ds'), true, undefined, undefined, undefined, undefined, d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19), undefined, d.section_id, undefined, undefined));
                        }

                        // console.log("DataFormater", allDataAsNodeData)
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

                var structuredData = new Map();

                var _loop = function _loop(section) {
                        structuredData.set(section.id, allDataAsNodeData.filter(function (nodeData) {
                                /*console.log(nodeData.section_id, section.id)*/;return nodeData.section_id === section.id || nodeData.section_id === -1;
                        }).map(function (nodeData) {
                                return nodeData;
                        }));
                };

                var _iteratorNormalCompletion23 = true;
                var _didIteratorError23 = false;
                var _iteratorError23 = undefined;

                try {
                        for (var _iterator23 = Data_Base.data.sections[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                                var section = _step23.value;

                                _loop(section);
                        }

                        // console.log(structuredData.get(1))

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

                        return makeNodeData(type + node.id, type === 'f' ? 'file' : 'folder', node.services, false, node.name, type, false, parentId, undefined, type !== 'f', type === 'f' ? node.extension : undefined, node.user, type === 'fnc' ? node.isClosed : undefined, type === 'fnc' ? node.review_date : undefined, node.created_at, //
                        type === 'fnc' ? node.level : undefined, parseInt(node.section_id), type === 'f' ? node.size : undefined, type === 'f' ? node.url : undefined);
                }

                switch (action.type) {
                        case 'refresh':
                                return [].concat(_toConsumableArray(state));
                        case 'add':
                                {
                                        to_refresh.current = true;

                                        var data = action.data;
                                        console.log('broadcast.........', data);

                                        // const temp = new Map()

                                        // FetchedNodesData.forEach((value, key) =>
                                        //   {
                                        //     temp.set(key, JSON.parse( JSON.stringify(value) ))
                                        //   }
                                        // )

                                        var section_id = data.node.constructor === Array ? parseInt(data.node[0].section_id) : parseInt(data.node.section_id);

                                        // const existing_data = temp.get(section_id)
                                        if (data.node.constructor === Array) {
                                                // console.log("heeeerre", existing_data)
                                                data.node.forEach(function (node) {
                                                        // const type = data.node_type === 'audit' ? node.sub_type !== undefined ? node.sub_type : data.node_type : data.node_type
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

                                                        state.push(makeNodeData(type + node.id, type === 'f' ? 'file' : 'folder', node.services, false, node.name, type, false, parentId, undefined, type !== 'f', type === 'f' ? node.extension : undefined, node.user, type === 'fnc' ? node.isClosed : undefined, type === 'fnc' ? node.review_date : undefined, node.created_at, //
                                                        type === 'fnc' ? node.level : undefined, section_id, type === 'f' ? node.size : undefined, type === 'f' ? node.url : undefined));
                                                });
                                        }
                                        // else
                                        // {
                                        //         state.push
                                        //         (
                                        //                 makeNodeData
                                        //                 (
                                        //                         data.node_type + data.node.id,
                                        //                         data.node_type === 'f' ? 'file' : 'folder',
                                        //                         data.node.services,
                                        //                         false,
                                        //                         data.node.name,
                                        //                         data.node_type,
                                        //                         false,
                                        //                         data.node_type === 'f' || data.node_type === 'ds' ? data.node.parent_type === '' ? '0' : data.node.parent_type + data.node.parent_id : undefined,
                                        //                         undefined,
                                        //                         data.node_type !== 'f',
                                        //                         data.node_type === 'f' ? data.node.extension : undefined,
                                        //                         data.node_type === 'audit' ? data.node.user.name : undefined,
                                        //                         data.node_type === 'fnc' ? data.node.isClosed : undefined,
                                        //                         data.node_type === 'fnc' ? data.node.review_date : undefined,
                                        //                         data.node.created_at,//
                                        //                         data.node_type === 'fnc' ? data.node.level : undefined,
                                        //                         section_id,
                                        //                         data.node_type === 'f' ? data.node.size : undefined,
                                        //                         data.node_type === 'f' ? data.node.url : undefined,
                                        //                 )
                                        //         )
                                        // }

                                        // temp.set(section_id, existing_data)

                                        // console.log(temp)

                                        // setFnd(temp)

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'delete':
                                {
                                        to_refresh.current = true;

                                        var _data = action.data;
                                        console.log('broadcast.........', _data);

                                        // const temp = new Map()

                                        // console.log( 'fnd.........', FetchedNodesData);

                                        // FetchedNodesData.forEach((value, key) =>
                                        //   {
                                        //     temp.set(key, JSON.parse( JSON.stringify(value) ))
                                        //   }
                                        // )

                                        // const section_id = parseInt(data.node.section_id)

                                        // const existing_data = temp.get(section_id)


                                        // console.log( 'exist.........', existing_data);

                                        // try
                                        // {

                                        //   console.log('enter notif update')

                                        //   authUser.operation_notifications.forEach(notif =>
                                        //     {
                                        //       console.log(notif.operable_id, data.node.id, notif.operable_id === data.node.id)
                                        //       if (notif.operable_id === data.node.id)
                                        //       {
                                        //         console.log('notif update')
                                        //         echosHandler('updateAuthUserInfo')
                                        //         EventsManager.emit('updateNotif', notif.id)
                                        //       }
                                        //     }
                                        //     );

                                        //   // existing_data.forEach(node =>
                                        //   //   {
                                        //   //     if(node.id === data.node_type + data.node.id)
                                        //   //     {
                                        //   //       existing_data.splice(existing_data.indexOf(node),1)
                                        //   //       throw 'endForEach'
                                        //   //     }
                                        //   //   }
                                        //   // );
                                        // }
                                        // catch (error)
                                        // {
                                        //   console.log(error, existing_data);
                                        // }

                                        console.log('enter notif update');

                                        authUser.operation_notifications.forEach(function (notif) {
                                                console.log(notif.operable_id, _data.node.id, notif.operable_id === _data.node.id);
                                                if (notif.operable_id === _data.node.id) {
                                                        console.log('notif update');
                                                        echosHandler('updateAuthUserInfo');
                                                        EventsManager.emit('updateNotif', notif.id);
                                                }
                                        });

                                        // temp.set(section_id, existing_data)

                                        // console.log(temp)

                                        // setFnd(temp)

                                        var newState = state.filter(function (node) {
                                                return node.id !== _data.node.type + _data.node.id;
                                        }).map(function (node) {
                                                return node;
                                        });

                                        // EventsManager.emit('updateData')

                                        console.log('newState', newState);

                                        return JSON.parse(JSON.stringify(newState));
                                }
                        case 'update':
                                {
                                        to_refresh.current = true;

                                        var _data2 = action.data;
                                        console.log('broadcast.........', _data2);

                                        // temp.set(section_id, existing_data)

                                        // console.log(temp)

                                        // setFnd(temp)

                                        var update_path = function update_path(node, current_state) {
                                                var up_to_date_node = JSON.parse(JSON.stringify(node));

                                                up_to_date_node.path = getNewPath(up_to_date_node, current_state, true);

                                                console.log('current_state', current_state);

                                                var new_state = JSON.parse(JSON.stringify(current_state)).map(function (current_node) {
                                                        if (current_node.id === up_to_date_node.id) return up_to_date_node;
                                                        return current_node;
                                                });

                                                console.log('new_state', new_state);

                                                var final_state = JSON.parse(JSON.stringify(new_state));

                                                new_state.forEach(function (new_node) {
                                                        if (new_node.parentId === up_to_date_node.id) {
                                                                final_state = update_path(new_node, final_state);
                                                        }
                                                });

                                                return final_state;
                                        };

                                        var _newState = JSON.parse(JSON.stringify(state));
                                        var finalState = JSON.parse(JSON.stringify(_newState));

                                        var _loop2 = function _loop2(node) {
                                                var updatedNode = create_new_node(node);

                                                console.log('updatedNode', updatedNode);

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

                                                finalState = update_path(updatedNode, JSON.parse(JSON.stringify(_newState)));
                                        };

                                        var _iteratorNormalCompletion24 = true;
                                        var _didIteratorError24 = false;
                                        var _iteratorError24 = undefined;

                                        try {
                                                for (var _iterator24 = _data2.node[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                                                        var node = _step24.value;

                                                        _loop2(node);
                                                }

                                                // EventsManager.emit('updateData')
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

                                        console.log('finalState', finalState);

                                        return JSON.parse(JSON.stringify(finalState));
                                }
                        // case 'move':
                        // {
                        //         const data = action.data
                        //
                        //         dispatch({type: 'update', data})
                        //
                        //         const moved_node = data.node[0];
                        //
                        //         const newState = state.map(
                        //                 node =>
                        //                 {
                        //                         if (node.id === data.node_type + moved_node.id)
                        //                         {
                        //                                 node.path = getNewPath(node, state)
                        //
                        //                                 return node
                        //                         }
                        //                         else if ( (node.parentId === data.node_type + moved_node.id) )
                        //                         {
                        //                                 node.path = getNewPath(node, state)
                        //                         }
                        //                 }
                        //         )
                        //
                        //         console.log('newState', newState)
                        //
                        //         return JSON.parse(JSON.stringify(newState))
                        // }

                        default:
                                break;
                }
        }

        var _useReducer = useReducer(reducer, dataFormater()),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            FetchedNodesData = _useReducer2[0],
            dispatch = _useReducer2[1];

        // useEffect(
        //   () =>
        //   {
        //     console.log('emiiiiiiiiiiiiiiiiiiiiiiiiit' false
        //     EventsManager.emit('updateData')
        //   }, [FetchedNodesData]
        // )

        Global_State['isEditorMode'] = isEditorMode;
        Global_State['dataBaseData'] = FetchedNodesData;
        Global_State['EventsManager'] = EventsManager;

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

        // const [ dataToUse, setDataToUse ] = useState( FetchedNodesData )

        // const t = useRef([makeNodeData('0', "folder", "all", true, "lol", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "mike", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "lal", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, -1)])
        // const f = useRef([makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "delta", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 3), makeNodeData('1', "folder", "all", true, "code", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 3), makeNodeData('5', "folder", "all", true, "fifa", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 5) ])

        // useEffect(
        //   () =>
        //   {
        //     console.log('kkkkkkkkkkkkkkkkkkkkkkkkk')
        //     if(isEditorMode) setDataToUse(JSON.parse(JSON.stringify(editor.data)))
        //     else setDataToUse(JSON.parse(JSON.stringify(FetchedNodesData)))
        //   }, [isEditorMode, FetchedNodesData, editor.data]
        // )


        var structuredData = useMemo(function () {
                var map = new Map();

                var _loop3 = function _loop3(section) {
                        map.set(section.id, dataToUse.filter(function (nodeData) {
                                /*console.log(nodeData.section_id, section.id);*/return nodeData.section_id === section.id || nodeData.section_id === -1;
                        }).map(function (nodeData) {
                                return nodeData;
                        }));
                };

                var _iteratorNormalCompletion25 = true;
                var _didIteratorError25 = false;
                var _iteratorError25 = undefined;

                try {
                        for (var _iterator25 = Data_Base.data.sections[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                                var section = _step25.value;

                                _loop3(section);
                        }
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

                return map;
        }, [dataToUse]);
        console.log('structuredData', structuredData);

        var _useState5 = useState(Data_Base.data.sections.length === 0 ? 0 : Data_Base.data.sections[0].id),
            _useState6 = _slicedToArray(_useState5, 2),
            selectedSectionId = _useState6[0],
            setSectionId = _useState6[1];

        // console.log('selectedSectionId',selectedSectionId)

        var displayingSection = useMemo(function () {
                return Data_Base.data.sections.length === 0 ? [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1)] : structuredData.get(selectedSectionId);
        }, [selectedSectionId, structuredData]);

        var dataParsedToJson = useMemo(function () {
                return parseToJson(displayingSection);
        }, [displayingSection]);

        // console.log(displayingSection)


        var _useState7 = useState(false),
            _useState8 = _slicedToArray(_useState7, 2),
            toggleCleared = _useState8[0],
            setToggleCleared = _useState8[1];

        var clearSelected = function clearSelected(setSelectedRows) {
                setToggleCleared(!toggleCleared);EventsManager.emit('clearSelected');
        };

        function getTypeExt(ext) {
                var img = ["jpeg", "jpg", "png", "gif"];
                var vid = ["mp4", "avi", "MOV", "mpeg"];

                var _iteratorNormalCompletion26 = true;
                var _didIteratorError26 = false;
                var _iteratorError26 = undefined;

                try {
                        for (var _iterator26 = img[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                                var imgExt = _step26.value;

                                if (imgExt === ext) return "img";
                        }
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
                        for (var _iterator27 = vid[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                                var vidExt = _step27.value;

                                if (vidExt === ext) return "vid";
                        }
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

                return ext;
        }

        function getNodeData(id) {
                var _iteratorNormalCompletion28 = true;
                var _didIteratorError28 = false;
                var _iteratorError28 = undefined;

                try {
                        for (var _iterator28 = displayingSection[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                                var node = _step28.value;

                                // console.log(node.id)
                                if (id === node.id) {
                                        return node;
                                }
                        }
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

        function getChildren(nodeId) {
                var children = [];
                var _iteratorNormalCompletion29 = true;
                var _didIteratorError29 = false;
                var _iteratorError29 = undefined;

                try {
                        for (var _iterator29 = displayingSection[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                                var nodeData = _step29.value;

                                if (nodeData.parentId === nodeId) {
                                        children.push(nodeData);
                                }
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

        var getCurrentSection = function getCurrentSection() {
                // console.log(sections.get(selectedSectionId))
                return sections.get(selectedSectionId);
        };

        function useModalManager() {
                var _useState9 = useState(React.createElement("div", null)),
                    _useState10 = _slicedToArray(_useState9, 2),
                    content = _useState10[0],
                    setContent = _useState10[1];

                var _useState11 = useState(false),
                    _useState12 = _slicedToArray(_useState11, 2),
                    show = _useState12[0],
                    setShow = _useState12[1];

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

                var _useState13 = useState(React.createElement("div", null)),
                    _useState14 = _slicedToArray(_useState13, 2),
                    container = _useState14[0],
                    setModalOpening = _useState14[1];

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
                var _useState15 = useState(false),
                    _useState16 = _slicedToArray(_useState15, 2),
                    show = _useState16[0],
                    setShow = _useState16[1];

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

        var CustomDropDown = useCallback(function CustomDropDown(_ref2) {
                var id = _ref2.id,
                    icon = _ref2.icon,
                    content = _ref2.content;

                var _useState17 = useState(false),
                    _useState18 = _slicedToArray(_useState17, 2),
                    show = _useState18[0],
                    setShow = _useState18[1];
                // const setShow = (val) => {
                //   set(val)
                //   isLogged = val
                //   console.log(isLogged)
                // }


                var dropdown = useRef();

                EventsManager.once(id, function () {
                        console.log(id);setShow(true);
                });

                useEffect(function () {
                        /**
                         * Alert if clicked on outside of element
                         */
                        function handleClickOutside(event) {
                                if (dropdown.current && !dropdown.current.contains(event.target)) {
                                        // console.log('outside')
                                        setShow(false);
                                }
                        }
                        // Bind the event listener
                        document.addEventListener("click", handleClickOutside);
                        return function () {
                                // Unbind the event listener on clean up
                                document.removeEventListener("click", handleClickOutside);
                                EventsManager.off(id);
                        };
                }, []);

                return React.createElement(
                        "div",
                        { className: useMemo(function () {
                                        return "dropdown " + (show ? 'show' : '');
                                }, [show]), ref: dropdown },
                        React.createElement(
                                "div",
                                { onMouseEnter: function onMouseEnter() {
                                                setShow(true);
                                        }, id: id, "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": show },
                                icon
                        ),
                        React.createElement(
                                "div",
                                { className: useMemo(function () {
                                                return "dropdown-menu " + (show ? 'show' : '');
                                        }, [show]), onMouseLeave: function onMouseLeave() {
                                                setShow(false);
                                        }, "aria-labelledby": "userPanel",
                                        style: {
                                                position: 'absolute',
                                                willChange: 'transform',
                                                top: 0,
                                                left: 0,
                                                transform: 'translate3d(-160px, 5px, 0px)',
                                                maxHeight: window.innerHeight / 100 * 80,
                                                overflow: 'auto',
                                                paddingTop: 0
                                        } },
                                React.createElement("div", { className: "p-1", style: { backgroundColor: 'white', zIndex: 999, position: 'sticky', top: 0 } }),
                                content
                        )
                );
        }, []);
        // console.log(sections)


        var initSelectedNodes = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                initSelectedNodes.set(sct.id, '0');
        });

        var _useState19 = useState(initSelectedNodes),
            _useState20 = _slicedToArray(_useState19, 2),
            selectedNodeIdsInSections = _useState20[0],
            updateSNIdIS = _useState20[1];

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

        // function useOutsideAlerter(ref) {
        //   useEffect(() => {
        //     /**
        //      * Alert if clicked on outside of element
        //      */
        //     function handleClickOutside(event) {
        //       if (ref.current && !ref.current.contains(event.target)) {
        //         alert("You clicked outside of me!");
        //       }
        //     }
        //     // Bind the event listener
        //     document.addEventListener("mousedown", handleClickOutside);
        //     return () => {
        //       // Unbind the event listener on clean up
        //       document.removeEventListener("mousedown", handleClickOutside);
        //     };
        //   }, [ref]);
        // }

        var _useState21 = useState({
                style: {
                        display: 'none',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        zIndex: '1040',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'auto',
                        backgroundColor: '#00000000'
                        // pointerEvents: 'none',
                        // opacity: 0.5,
                } }),
            _useState22 = _slicedToArray(_useState21, 2),
            Overlay_props = _useState22[0],
            setOverlay_props = _useState22[1];

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

        return Object.assign({}, Global_State, {
                // EventsManager,
                // isEditorMode,
                authUser: Data_Base.authUser,
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
                getChildrenById: getChildren,
                getType: getType,
                getNewPath: getNewPath,
                modalManager: modalManager,
                spinnerManager: spinnerManager,
                selectedSectionId: selectedSectionId,
                setSectionId: setSectionId,
                sections: sections,
                FetchedNodesData: structuredData,
                // setFnd,
                selectedNodeIdsInSections: selectedNodeIdsInSections,
                updateSNIdIS: updateSNIdIS,
                getCurrentSection: getCurrentSection,
                sizeFormater: sizeFormater,
                identifyNode: identifyNode,
                toggleCleared: toggleCleared,
                clearSelected: clearSelected,
                CustomDropDown: CustomDropDown,
                Overlay_component: Overlay_component,
                setOverlay_props: setOverlay_props
        });
}

// makeNodeData(1, "node1", "folder", true, -1, "", true),
//     makeNodeData(2, "node2", "folder", true, 1, "", true),
//     makeNodeData(3, "node3", "file", false, 7, "", false, "pdf"),//
//     makeNodeData(4, "node4", "folder", false, 1, "", false),
//     makeNodeData(5, "node5", "file", false, 1, "", false, "jpg"),//
//     makeNodeData(6, "node6", "file", false, 2, "", false, "mp4"),//
//     makeNodeData(7, "node7", "folder", false, 9, "", true),
//     makeNodeData(8, "nodxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe8", "file", false, 9, "", false, "pptx"),//
//     makeNodeData(9, "node9", "folder", false, 2, "", true),
//     makeNodeData(10, "node10", "file", false, 2, "", false, "xlsx"),//
//     makeNodeData(11, "node11", "folder", false, 1, "", true),
//     makeNodeData(12, "node2", "folder", false, 1, "", true),
//     makeNodeData(13, "node2", "folder", false, 1, "", true),
//     makeNodeData(14, "node2", "folder", false, 1, "", true),
//     makeNodeData(15, "node2", "folder", false, 1, "", true),
//     makeNodeData(16, "node2", "folder", false, 1, "", true),
//     makeNodeData(17, "node2", "folder", false, 1, "", true),
//     makeNodeData(18, "node2", "folder", false, 1, "", true),
//     makeNodeData(19, "node2", "folder", false, 1, "", true),
//     makeNodeData(20, "node2", "folder", false, 1, "", true),
//     makeNodeData(21, "node2", "folder", false, 1, "", true),
//     makeNodeData(22, "node2", "folder", true, 1, "", true),