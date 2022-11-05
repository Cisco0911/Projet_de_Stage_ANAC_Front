import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer } from 'react';

import isEqual from "lodash.isequal";

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';
import { useMemo } from 'react';

export default function useEditor(data) {
        var _this = this;

        // const active = useMemo( () => (isEditorMode), [active] )

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            active = _useState2[0],
            setActive = _useState2[1];

        var initData = useRef(JSON.parse(JSON.stringify(data)));

        var initManager = {
                data: initData,
                isNew: function isNew(id) {
                        var isNew = true;

                        // console.log('enter foooooooooooooooor', initData.current)
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                                for (var _iterator = initData.current[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var initNode = _step.value;

                                        // console.log('idddddddddddddddddddddddddddddddddd', id, initNode.id)
                                        if (id === initNode.id) {
                                                isNew = false;
                                                break;
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

                        return isNew;
                },
                haveBeenModified: function haveBeenModified(node) {
                        var isModified = false;

                        initData.current.forEach(function (initNode) {
                                if (node.id === initNode.id) {
                                        if (!isEqual(node, initNode)) {
                                                isModified = true;return 1;
                                        }
                                }
                        });

                        return isModified;
                }
        };

        var id = useRef(-2);
        var job_id = useRef(1);

        var formData = useRef();

        var getService = function getService(services) {
                // console.log('fffffffffffffffff',Global_State.authUser.services);
                return Global_State.authUser.services.filter(function (service) {
                        var belongsTo = false;
                        services.forEach(function (element) {
                                if (element.value === service.id) belongsTo = true;
                        });
                        return belongsTo;
                });
        };

        var form_to_json = function form_to_json(formData) {
                // object[key] = key === 'services' ? JSON.parse(value) : value

                var object = {};
                formData.forEach(function (value, key) {
                        switch (key) {
                                case 'services':
                                        object[key] = JSON.parse(value);
                                        break;
                                case 'fichiers[]':
                                        if (Array.isArray(object.files)) object.files.push(value);else object.files = [value];
                                        break;
                                default:
                                        object[key] = value;
                                        break;
                        }
                });

                return object;
        };

        // const haveBeenModified = node =>
        // {
        //   let isModified = false

        //   initData.current.forEach(
        //     initNode =>
        //     {
        //       if( node.id === initNode.id )
        //       {
        //         if( !isEqual(node, initNode) ) { isModified = true; return 1 }
        //       }
        //     }
        //   );

        //   return isModified
        // }


        function data_reducer(state, action) {
                switch (action.type) {
                        case 'reset':
                                {
                                        console.log('initData.current', initData.current);

                                        id.current = -2;
                                        job_id.current = 1;

                                        return JSON.parse(JSON.stringify(initData.current));
                                }
                        case 'update_initData':
                                {
                                        var updated_state = [];
                                        var modified_nodes = [];

                                        var new_data = JSON.parse(JSON.stringify(action.new_data));

                                        new_data.forEach(function (node) {
                                                if (initManager.isNew(node.id)) updated_state.push(node);
                                        });

                                        var _iteratorNormalCompletion2 = true;
                                        var _didIteratorError2 = false;
                                        var _iteratorError2 = undefined;

                                        try {
                                                for (var _iterator2 = state[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                        var localNode = _step2.value;

                                                        var added = false;
                                                        var _iteratorNormalCompletion3 = true;
                                                        var _didIteratorError3 = false;
                                                        var _iteratorError3 = undefined;

                                                        try {
                                                                for (var _iterator3 = new_data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                                                        var node = _step3.value;

                                                                        if (node.id === localNode.id) {
                                                                                if (initManager.haveBeenModified(node)) {
                                                                                        updated_state.push(node);
                                                                                } else updated_state.push(localNode);

                                                                                added = true;
                                                                                break;
                                                                        }
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

                                                        if (added) continue;
                                                        if (localNode.id.split('-').length === 2) updated_state.push(localNode);
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

                                        initData.current = JSON.parse(JSON.stringify(new_data));

                                        return JSON.parse(JSON.stringify(updated_state));
                                }
                        case 'add_folder':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

                                        var _data = action.job.data;

                                        var new_folder = Global_State.createNodeData("ds" + id.current, "folder", getService(_data.services), false, _data.name, "ds", false, _data.front_parent_type === 'root' ? '0' : _data.front_parent_type + _data.parent_id, "", true, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data.section_id), undefined, undefined);
                                        new_folder['onEdit'] = true;

                                        state.push(new_folder);

                                        id.current = id.current - 1;

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_folder':
                                {

                                        var suppress_from = function suppress_from(list_, id) {
                                                var rest = list_.filter(function (node) {
                                                        return node.id !== id;
                                                });

                                                var _iteratorNormalCompletion4 = true;
                                                var _didIteratorError4 = false;
                                                var _iteratorError4 = undefined;

                                                try {
                                                        for (var _iterator4 = list_[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                                                var _node = _step4.value;

                                                                // console.log(id, node.parentId)
                                                                if (id === _node.parentId) rest = suppress_from(rest, _node.id);
                                                        }

                                                        // console.log('resttttttttttttttttt', rest)
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

                                                return rest;
                                        };

                                        var newState = suppress_from(state, "ds" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(newState));
                                }
                        case 'add_files':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_files');

                                        var _data2 = action.job.data;
                                        var files = action.job.data.files;

                                        console.log('dataaaaaaaaaaaaaaaaaaas', files, action.job);

                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;

                                        try {
                                                for (var _iterator5 = files[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                        var file = _step5.value;


                                                        var part_name = file.name.split('.');

                                                        var ext = part_name[part_name.length - 1];

                                                        var new_file = Global_State.createNodeData("f" + id.current, "file", getService(_data2.services), false, file.name, "f", false, _data2.front_parent_type === 'root' ? '0' : _data2.front_parent_type + _data2.parent_id, "", false, ext, undefined, undefined, 'pas encore créé', undefined, parseInt(_data2.section_id), file.size, undefined);
                                                        new_file['onEdit'] = true;

                                                        state.push(new_file);

                                                        id.current = id.current - 1;
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

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_file':
                                {

                                        var _suppress_from = function _suppress_from(list_, id) {
                                                var rest = list_.filter(function (node) {
                                                        return node.id !== id;
                                                });

                                                var _iteratorNormalCompletion6 = true;
                                                var _didIteratorError6 = false;
                                                var _iteratorError6 = undefined;

                                                try {
                                                        for (var _iterator6 = list_[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                                                var _node2 = _step6.value;

                                                                // console.log(id, node.parentId)
                                                                if (id === _node2.parentId) rest = _suppress_from(rest, _node2.id);
                                                        }

                                                        // console.log('resttttttttttttttttt', rest)
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

                                                return rest;
                                        };

                                        var _newState = _suppress_from(state, "f" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(_newState));
                                }
                        case 'add_audit':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_audit');

                                        var _iteratorNormalCompletion7 = true;
                                        var _didIteratorError7 = false;
                                        var _iteratorError7 = undefined;

                                        try {
                                                for (var _iterator7 = action.jobs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                                        var job = _step7.value;

                                                        var _data3 = job.data;

                                                        var type = _data3.sub_type !== undefined ? _data3.sub_type : 'audit';

                                                        var new_node = Global_State.createNodeData("" + type + job.node_id, "folder", getService(_data3.services), false, _data3.name, type, false, type === 'audit' ? '0' : "audit" + job.data.audit_id, "", true, undefined, type === 'audit' ? Global_State.authUser : undefined, undefined, 'pas encore créé', undefined, parseInt(_data3.section_id), undefined, undefined);
                                                        new_node['onEdit'] = true;

                                                        state.push(new_node);
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

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_audit':
                                {

                                        var suppress_from_data = function suppress_from_data(list_, id) {
                                                var rest = list_.filter(function (node) {
                                                        return node.id !== id;
                                                });

                                                var _iteratorNormalCompletion8 = true;
                                                var _didIteratorError8 = false;
                                                var _iteratorError8 = undefined;

                                                try {
                                                        for (var _iterator8 = list_[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                                                var _node3 = _step8.value;

                                                                // console.log(id, node.parentId)
                                                                if (id === _node3.parentId) rest = suppress_from_data(rest, _node3.id);
                                                        }

                                                        // console.log('resttttttttttttttttt', rest)
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

                                                return rest;
                                        };

                                        var _newState2 = suppress_from_data(state, "audit" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(_newState2));
                                }
                        case 'update':
                                {

                                        return JSON.parse(JSON.stringify(state));
                                }

                        default:
                                break;
                }
        }

        var _useReducer = useReducer(data_reducer, initData.current),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            localDataState = _useReducer2[0],
            setDatasState = _useReducer2[1]; //.map( node => ({...node, name: 'lol'}) )

        function jobs_reducer(state, action) {

                var getJob = function getJob(id) {
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                                for (var _iterator9 = state[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                        var job = _step9.value;

                                        console.log('searching joooooooooob', job.id, id);
                                        if (job.id === id) return job;
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

                        return {};
                };

                switch (action.type) {
                        case 'reset':
                                {
                                        setDatasState({ type: 'reset' });
                                        return state.length === 0 ? state : [];
                                }
                        case 'add_folder':
                                {
                                        var new_state = [].concat(_toConsumableArray(state));

                                        var request = action.request;

                                        var getDependencies = function getDependencies(parent_id) {
                                                if (parseInt(parent_id) < 0) {
                                                        var _iteratorNormalCompletion10 = true;
                                                        var _didIteratorError10 = false;
                                                        var _iteratorError10 = undefined;

                                                        try {
                                                                for (var _iterator10 = state[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                                                        var _job = _step10.value;

                                                                        if (_job.node_id === parseInt(parent_id)) return [_job.id];
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
                                                }
                                                return [];
                                        };

                                        var node = form_to_json(request);
                                        var job = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\DossierSimple',
                                                data: node,
                                                etat: 'waiting',
                                                dependencies: getDependencies(node.parent_id)

                                        };

                                        new_state.push(job);

                                        job_id.current = job_id.current + 1;

                                        setDatasState({ type: 'add_folder', job: job });

                                        return new_state;
                                }
                        case 'del_folder':
                                {
                                        var _new_state = [].concat(_toConsumableArray(state));

                                        var _id = action.id;

                                        _new_state = _new_state.filter(function (job) {
                                                // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                if (job.node_id === _id) return false;

                                                if (Array.isArray(job.dependencies)) {
                                                        // console.log(job, job.dependencies[0], getJob(job.dependencies[0]), id)
                                                        return getJob(job.dependencies[0]).node_id !== _id;
                                                }

                                                return true;
                                        });

                                        if (!(parseInt(_id) < 0)) {
                                                var _job2 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id,
                                                        node_model: 'App\\Models\\DossierSimple',
                                                        etat: 'waiting'

                                                };

                                                _new_state.push(_job2);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_folder', id: _id });

                                        return _new_state;
                                }
                        case 'add_files':
                                {
                                        var _new_state2 = [].concat(_toConsumableArray(state));

                                        var _request = action.request;

                                        var _getDependencies = function _getDependencies(parent_id) {
                                                if (parseInt(parent_id) < 0) {
                                                        var _iteratorNormalCompletion11 = true;
                                                        var _didIteratorError11 = false;
                                                        var _iteratorError11 = undefined;

                                                        try {
                                                                for (var _iterator11 = state[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                                                        var _job4 = _step11.value;

                                                                        if (_job4.node_id === parseInt(parent_id)) return [_job4.id];
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
                                                }
                                                return [];
                                        };

                                        var _node4 = form_to_json(_request);
                                        // console.log('nooooooooooooooooooooooooooooode file', {node})
                                        var _job3 = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\Fichier',
                                                data: _node4,
                                                etat: 'waiting',
                                                dependencies: _getDependencies(_node4.parent_id)

                                        };

                                        console.log('nooooooooooooooooooooooooooooode file', { node: _node4 });

                                        _new_state2.push(_job3);

                                        job_id.current = job_id.current + 1;

                                        setDatasState({ type: 'add_files', job: _job3 });

                                        return _new_state2;
                                }
                        case 'del_file':
                                {
                                        var _new_state3 = [].concat(_toConsumableArray(state));

                                        var _id2 = action.id;

                                        _new_state3 = _new_state3.filter(function (job) {
                                                // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                return job.node_id !== _id2;
                                        });

                                        if (!(parseInt(_id2) < 0)) {
                                                var _job5 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id2,
                                                        node_model: 'App\\Models\\Fichier',
                                                        etat: 'waiting'

                                                };

                                                _new_state3.push(_job5);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_file', id: _id2 });

                                        return _new_state3;
                                }
                        case 'add_audit':
                                {
                                        var _new_state4 = [].concat(_toConsumableArray(state));

                                        var _request2 = action.request;

                                        var _node5 = form_to_json(_request2);

                                        var _job6 = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\Audit',
                                                data: _node5,
                                                etat: 'waiting'

                                        };
                                        job_id.current = job_id.current + 1;
                                        id.current = id.current - 1;

                                        var checkList_job = {
                                                id: job_id.current,
                                                node_id: id.current,
                                                node_model: 'App\\Models\\checkList',
                                                data: {
                                                        name: 'checkList',
                                                        audit_id: _job6.node_id,
                                                        sub_type: 'checkList',
                                                        services: _job6.data.services,
                                                        section_id: _job6.data.section_id
                                                },
                                                dependencies: [_job6.id],
                                                etat: 'waiting'
                                        };
                                        job_id.current = job_id.current + 1;
                                        id.current = id.current - 1;

                                        var dp_job = {
                                                id: job_id.current,
                                                node_id: id.current,
                                                node_model: 'App\\Models\\DossierPreuve',
                                                data: {
                                                        name: 'Dossier Preuve',
                                                        audit_id: _job6.node_id,
                                                        sub_type: 'dp',
                                                        services: _job6.data.services,
                                                        section_id: _job6.data.section_id
                                                },
                                                dependencies: [_job6.id],
                                                etat: 'waiting'
                                        };
                                        job_id.current = job_id.current + 1;
                                        id.current = id.current - 1;

                                        var NC_job = {
                                                id: job_id.current,
                                                node_id: id.current,
                                                node_model: 'App\\Models\\Nc',
                                                data: {
                                                        name: 'NC',
                                                        audit_id: _job6.node_id,
                                                        sub_type: 'nonC',
                                                        services: _job6.data.services,
                                                        section_id: _job6.data.section_id
                                                },
                                                dependencies: [_job6.id],
                                                etat: 'waiting'
                                        };
                                        job_id.current = job_id.current + 1;
                                        id.current = id.current - 1;

                                        _new_state4.push(_job6, checkList_job, dp_job, NC_job);

                                        setDatasState({ type: 'add_audit', jobs: [_job6, checkList_job, dp_job, NC_job] });

                                        return _new_state4;
                                }
                        case 'del_audit':
                                {

                                        var _id3 = action.id;

                                        var supress_from_jobs = function supress_from_jobs(job_list, id) {
                                                var new_job_list = job_list.filter(function (job) {
                                                        // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                        return job.node_id !== id;
                                                });

                                                var _iteratorNormalCompletion12 = true;
                                                var _didIteratorError12 = false;
                                                var _iteratorError12 = undefined;

                                                try {
                                                        for (var _iterator12 = new_job_list[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                                                var _job7 = _step12.value;

                                                                console.log(_job7, _job7.dependencies[0], id);
                                                                if (Array.isArray(_job7.dependencies) && getJob(_job7.dependencies[0]).node_id === id) {
                                                                        // console.log(job, job.dependencies[0], getJob(job.dependencies[0]), id)
                                                                        new_job_list = supress_from_jobs(new_job_list, _job7.node_id);
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

                                                return new_job_list;
                                        };

                                        var _new_state5 = supress_from_jobs([].concat(_toConsumableArray(state)), _id3);

                                        if (!(parseInt(_id3) < 0)) {
                                                var _job8 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id3,
                                                        node_model: 'App\\Models\\Audit',
                                                        etat: 'waiting'

                                                };

                                                _new_state5.push(_job8);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_audit', id: _id3 });

                                        return _new_state5;
                                }
                        case 'update':
                                {

                                        return JSON.parse(JSON.stringify(state));
                                }

                        default:
                                break;
                }
        }

        var _useReducer3 = useReducer(jobs_reducer, []),
            _useReducer4 = _slicedToArray(_useReducer3, 2),
            jobs = _useReducer4[0],
            dispatch_job = _useReducer4[1];

        // useEffect(
        //   () =>
        //   {
        //     // Global_State.EventsManager.on('update_initData', data => { setDatasState({ type: 'update_initData', new_nodes: data }) } )

        //     console.log('update_initData')

        //     setDatasState({ type: 'update_initData' })

        //     return () =>
        //     {
        //       // Global_State.EventsManager.off('update_initData')
        //     }
        //   }, [ iniData.current ]
        // )

        var update_initData = function update_initData(new_data) {
                console.log('update_initData');

                setDatasState({ type: 'update_initData', new_data: new_data });
        };

        var save = function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(request) {
                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                        _context.next = 2;
                                                        return http.post('handle_edit', request, {
                                                                headers: {
                                                                        'Content-Type': 'multipart/form-data'
                                                                }
                                                        }).then(function (res) {
                                                                console.log(res);
                                                                // toast.dismiss('Saving')
                                                        }).catch(function (err) {
                                                                console.log(err);
                                                        });

                                                case 2:
                                                case "end":
                                                        return _context.stop();
                                        }
                                }
                        }, _callee, _this);
                }));

                return function save(_x) {
                        return _ref.apply(this, arguments);
                };
        }();

        useEffect(function () {
                if (jobs.length > 0) {

                        toast(function (t) {
                                return React.createElement(
                                        "div",
                                        { style: { width: 'max-content' } },
                                        React.createElement(
                                                Stack,
                                                { spacing: 2, direction: 'row',
                                                        sx: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center'
                                                        }
                                                },
                                                React.createElement(
                                                        Button,
                                                        { variant: "light", onClick: function onClick() {
                                                                        var queryData = new FormData();

                                                                        jobs.map(function (job) {
                                                                                queryData.append("jobs[]", JSON.stringify(job));
                                                                                if (job.node_model === 'App\\Models\\Fichier' && job.operation === 'add') {
                                                                                        job.data.files.map(function (file) {
                                                                                                queryData.append("job" + job.id + "_files[]", file);
                                                                                        });
                                                                                }
                                                                        });

                                                                        // console.log('jooooooooobs', queryData.get('jobs[]'))

                                                                        Global_State.changeMode();

                                                                        toast.promise(save(queryData), {
                                                                                loading: 'Saving...',
                                                                                success: 'Processus achevé',
                                                                                error: 'err'
                                                                        }, {
                                                                                // id: 'Saving',
                                                                                // duration: Infinity
                                                                        });
                                                                } },
                                                        "SAVE"
                                                ),
                                                React.createElement(
                                                        Button,
                                                        { variant: "danger", onClick: function onClick() {} },
                                                        "DISCARD"
                                                )
                                        )
                                );
                        }, {
                                id: 'save',
                                position: "bottom-right",
                                duration: Infinity,
                                style: {
                                        // width: '1700px',
                                        border: '1px solid #0062ff',
                                        padding: '16px',
                                        color: '#0062ff'
                                }
                        });
                } else {
                        toast.dismiss('save');
                }
                // else if ( !active )
                // {
                //     toast.dismiss('save')
                //     dispatch_job({ type: 'reset' })
                // }
        }, [jobs]);

        var close = function close() {
                setActive(false);
                toast.dismiss('save');
                dispatch_job({ type: 'reset' });
        };

        console.log('localDataState', localDataState, initData.current, jobs);

        return {
                data: localDataState,
                update_initData: update_initData,
                open: function open() {
                        setActive(true);
                },
                close: close,
                folder: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_folder', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_folder', id: id });
                        }
                },
                files: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_files', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_file', id: id });
                        }
                },
                audit: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_audit', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_audit', id: id });
                        }
                }

        };
}