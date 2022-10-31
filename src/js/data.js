import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useMemo, useState, useEffect, useRef, useCallback, useReducer } from "react";

import parseToJson from "./files_package/parse_to_json";
import useEditor from './editor';
import { Global_State } from "./main";

import axios from "axios";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import EventEmitter from 'eventemitter3';

import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import toast from "react-hot-toast";

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

        console.log('checking');

        var _useState = useState(TheDatas.authUser),
            _useState2 = _slicedToArray(_useState, 2),
            authUser = _useState2[0],
            updateAuthUserInfo = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            isEditorMode = _useState4[0],
            setIsEditorMode = _useState4[1];

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
                                data.node.forEach(function (element) {
                                        console.log(element);
                                        ids.append('ids[]', element);
                                });
                                console.log(ids.get('ids[]'));

                                http.post('getDatasByIds', ids).then(function (res) {
                                        console.log(res);

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
                                _ids.append('ids[]', data.node);
                                http.post('getDatasByIds', _ids).then(function (res) {
                                        console.log(res);

                                        dispatch({ type: 'update', data: Object.assign({}, data, { 'node': res.data }) });
                                }).catch(function (err) {
                                        console.log(err);
                                });
                        }
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

        var dataFormater = function dataFormater() {

                // Data_Base.data.audits[0].name = "dddd"

                // makeNodeData(0, "Racine", "root", true, -1, "", true)

                var allDataAsNodeData = [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1)];

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

                // audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19)
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                        for (var _iterator3 = audits[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var audit = _step3.value;

                                allDataAsNodeData.push(makeNodeData(audit.id, "folder", audit.services, false, audit.name, "audit", false, '0', "", true, undefined, audit.user, undefined, audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19), undefined, audit.section_id, undefined, undefined));
                        }

                        // checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                        for (var _iterator4 = checkLists[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var checkList = _step4.value;

                                allDataAsNodeData.push(makeNodeData(checkList.id, "folder", checkList.services, false, checkList.name, "checkList", false, "audit" + checkList.audit_id, "", true, undefined, undefined, undefined, checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19), undefined, checkList.section_id, undefined, undefined));
                        }

                        // dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                        for (var _iterator5 = dps[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var dp = _step5.value;

                                allDataAsNodeData.push(makeNodeData(dp.id, "folder", dp.services, false, dp.name, "dp", false, "audit" + dp.audit_id, "", true, undefined, undefined, undefined, dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19), undefined, dp.section_id, undefined, undefined));
                        }

                        // nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                        for (var _iterator6 = nonCs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var nonC = _step6.value;

                                allDataAsNodeData.push(makeNodeData(nonC.id, "folder", nonC.services, false, nonC.name, "nonC", false, "audit" + nonC.audit_id, "", true, undefined, undefined, undefined, nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19), undefined, nonC.section_id, undefined, undefined));
                        }

                        // fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                        for (var _iterator7 = fncs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var fnc = _step7.value;

                                allDataAsNodeData.push(makeNodeData(fnc.id, "folder", fnc.services, false, fnc.name, "fnc", false, "nonC" + fnc.nc_id, "", true, undefined, undefined, fnc.isClosed, fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19), fnc.level, fnc.section_id, undefined, undefined));
                        }

                        // f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                        for (var _iterator8 = fs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var f = _step8.value;

                                allDataAsNodeData.push(makeNodeData(f.id, "file", f.services, false, f.name, "f", false, f.parent_type === '' ? '0' : f.parent_type + f.parent_id, "", false, f.extension, undefined, undefined, f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19), undefined, f.section_id, f.size, f.url));
                        }

                        // d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19)
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

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                        for (var _iterator9 = ds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var d = _step9.value;

                                allDataAsNodeData.push(makeNodeData(d.id, "folder", d.services, false, d.name, "ds", false, d.parent_type === '' ? '0' : d.parent_type + d.parent_id, "", true, undefined, undefined, undefined, d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19), undefined, d.section_id, undefined, undefined));
                        }

                        // console.log("DataFormater", allDataAsNodeData)
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

                var structuredData = new Map();

                var _loop = function _loop(section) {
                        structuredData.set(section.id, allDataAsNodeData.filter(function (nodeData) {
                                /*console.log(nodeData.section_id, section.id)*/;return nodeData.section_id === section.id || nodeData.section_id === -1;
                        }).map(function (nodeData) {
                                return nodeData;
                        }));
                };

                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                        for (var _iterator10 = Data_Base.data.sections[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var section = _step10.value;

                                _loop(section);
                        }

                        // console.log(structuredData.get(1))

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

                return allDataAsNodeData;
        };

        function reducer(state, action) {
                switch (action.type) {
                        case 'add':
                                {
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
                                                        var type = data.node_type === 'audit' ? node.sub_type !== undefined ? node.sub_type : data.node_type : data.node_type;
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

                                                        state.push(makeNodeData(type + node.id, data.node_type === 'f' ? 'file' : 'folder', node.services, false, node.name, type, false, parentId, undefined, data.node_type !== 'f', data.node_type === 'f' ? node.extension : undefined, node.user, data.node_type === 'fnc' ? node.isClosed : undefined, node.created_at, //
                                                        data.node_type === 'fnc' ? node.level : undefined, section_id, data.node_type === 'f' ? node.size : undefined, data.node_type === 'f' ? node.url : undefined));
                                                });
                                        } else {
                                                state.push(makeNodeData(data.node_type + data.node.id, data.node_type === 'f' ? 'file' : 'folder', data.node.services, false, data.node.name, data.node_type, false, data.node_type === 'f' || data.node_type === 'ds' ? data.node.parent_type === '' ? '0' : data.node.parent_type + data.node.parent_id : undefined, undefined, data.node_type !== 'f', data.node_type === 'f' ? data.node.extension : undefined, data.node_type === 'audit' ? data.node.user.name : undefined, data.node_type === 'fnc' ? data.node.isClosed : undefined, data.node.created_at, //
                                                data.node_type === 'fnc' ? data.node.level : undefined, section_id, data.node_type === 'f' ? data.node.size : undefined, data.node_type === 'f' ? data.node.url : undefined));
                                        }

                                        // temp.set(section_id, existing_data)

                                        // console.log(temp)

                                        // setFnd(temp)

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'delete':
                                {
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
                                                return node.id !== _data.node_type + _data.node.id;
                                        }).map(function (node) {
                                                return node;
                                        });

                                        // EventsManager.emit('updateData')

                                        console.log('newState', newState);

                                        return JSON.parse(JSON.stringify(newState));
                                }
                        case 'update':
                                {
                                        var _data2 = action.data;
                                        console.log('broadcast.........', _data2);

                                        var node = _data2.node[0];

                                        // temp.set(section_id, existing_data)

                                        // console.log(temp)

                                        // setFnd(temp)


                                        var type = _data2.node_type === 'audit' ? node.sub_type !== undefined ? node.sub_type : _data2.node_type : _data2.node_type;
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

                                        var updatedNode = makeNodeData(_data2.node_type + node.id, _data2.node_type === 'f' ? 'file' : 'folder', node.services, false, node.name, _data2.node_type, false, parentId, undefined, _data2.node_type !== 'f', _data2.node_type === 'f' ? node.extension : undefined, _data2.node_type === 'audit' ? node.user.name : undefined, _data2.node_type === 'fnc' ? node.isClosed : undefined, node.created_at, //
                                        _data2.node_type === 'fnc' ? node.level : undefined, parseInt(node.section_id), _data2.node_type === 'f' ? node.size : undefined, _data2.node_type === 'f' ? node.url : undefined);

                                        console.log('updatedNode', updatedNode);

                                        var _newState = state.map(function (node) {
                                                return node.id === updatedNode.id ? updatedNode : node;
                                        });

                                        // EventsManager.emit('updateData')

                                        console.log('newState', _newState);

                                        return JSON.parse(JSON.stringify(_newState));
                                }

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
        //     console.log('emiiiiiiiiiiiiiiiiiiiiiiiiit')
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

                var _loop2 = function _loop2(section) {
                        map.set(section.id, dataToUse.filter(function (nodeData) {
                                /*console.log(nodeData.section_id, section.id)*/;return nodeData.section_id === section.id || nodeData.section_id === -1;
                        }).map(function (nodeData) {
                                return nodeData;
                        }));
                };

                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                        for (var _iterator11 = Data_Base.data.sections[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var section = _step11.value;

                                _loop2(section);
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

        function makeNodeData(id, global_type, services, isOpen, name, type, isRoot, parentId, path, hasChildren, ext, ra, isClosed, created_at, level, section_id, taille, url) {

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
                        ext: ext,
                        url: url
                };
        }

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

                var _iteratorNormalCompletion12 = true;
                var _didIteratorError12 = false;
                var _iteratorError12 = undefined;

                try {
                        for (var _iterator12 = img[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                var imgExt = _step12.value;

                                if (imgExt === ext) return "img";
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

                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {
                        for (var _iterator13 = vid[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                var vidExt = _step13.value;

                                if (vidExt === ext) return "vid";
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

                return ext;
        }

        function getNodeData(id) {
                var _iteratorNormalCompletion14 = true;
                var _didIteratorError14 = false;
                var _iteratorError14 = undefined;

                try {
                        for (var _iterator14 = displayingSection[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                var node = _step14.value;

                                // console.log(node.id)
                                if (id === node.id) {
                                        return node;
                                }
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
                var _iteratorNormalCompletion15 = true;
                var _didIteratorError15 = false;
                var _iteratorError15 = undefined;

                try {
                        for (var _iterator15 = displayingSection[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var nodeData = _step15.value;

                                if (nodeData.parentId === nodeId) {
                                        children.push(nodeData);
                                }
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
                var _useState9 = useState(null),
                    _useState10 = _slicedToArray(_useState9, 2),
                    content = _useState10[0],
                    setContent = _useState10[1];

                var _useState11 = useState(false),
                    _useState12 = _slicedToArray(_useState11, 2),
                    show = _useState12[0],
                    setShow = _useState12[1];

                var _useState13 = useState(""),
                    _useState14 = _slicedToArray(_useState13, 2),
                    modal_title = _useState14[0],
                    setTitle = _useState14[1];

                var modal = React.createElement(
                        Modal,
                        {
                                show: show,
                                onHide: function onHide() {
                                        setShow(false);
                                },
                                size: "lg",
                                centered: true,
                                scrollable: true
                        },
                        React.createElement(
                                Modal.Header,
                                { closeButton: true },
                                React.createElement(
                                        Modal.Title,
                                        null,
                                        modal_title
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

                var _useState15 = useState(React.createElement("div", null)),
                    _useState16 = _slicedToArray(_useState15, 2),
                    container = _useState16[0],
                    setModalOpening = _useState16[1];

                return {
                        modal: modal,
                        open_modal: function open_modal(title) {
                                setTitle(title);setShow(true);
                        },
                        close_modal: function close_modal() {
                                setShow(false);
                        },
                        setContent: setContent
                };
        }

        var modalManager = useModalManager();

        function useShowSpinner() {
                var _useState17 = useState(false),
                    _useState18 = _slicedToArray(_useState17, 2),
                    show = _useState18[0],
                    setShow = _useState18[1];

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

                var _useState19 = useState(false),
                    _useState20 = _slicedToArray(_useState19, 2),
                    show = _useState20[0],
                    setShow = _useState20[1];
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

        var sections = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                // console.log(sct)
                sections.set(sct.id, Object.assign({}, sct, { selectedNodeIdInSection: 0 }));
        });
        // console.log(sections)


        var initSelectedNodes = new Map();
        Data_Base.data.sections.map(function (section) {
                var sct = JSON.parse(JSON.stringify(section));
                initSelectedNodes.set(sct.id, '0');
        });

        var _useState21 = useState(initSelectedNodes),
            _useState22 = _slicedToArray(_useState21, 2),
            selectedNodeIdsInSections = _useState22[0],
            updateSNIdIS = _useState22[1];

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


        return Object.assign({}, Global_State, {
                // EventsManager,
                // isEditorMode,
                authUser: Data_Base.authUser,
                // dataBaseData: FetchedNodesData,
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
                getNodeDataById: getNodeData,
                getChildrenById: getChildren,
                getType: getType,
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
                CustomDropDown: CustomDropDown
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