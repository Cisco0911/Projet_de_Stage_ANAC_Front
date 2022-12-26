import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { useEffect, useReducer, useRef, useState } from 'react';

import isEqual from "lodash.isequal";

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';

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

        var isExistingIn = function isExistingIn(list_of_data, node_name, destination_id) {
                var children = Global_State.getChildrenById([].concat(_toConsumableArray(list_of_data)), destination_id);

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                        for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var child = _step2.value;
                                if (child.name === node_name) return Object.assign({}, child);
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

        var getNewName = function getNewName(list_of_data, original_name, destination_id) {
                var new_name = original_name;
                var num = 1;

                while (isExistingIn([].concat(_toConsumableArray(list_of_data)), new_name, destination_id)) {
                        var num_copy = num === 1 ? "Copie" : "Copie (" + num + ")";
                        new_name = original_name + " - " + num_copy;
                        // console.log(new_name)

                        num++;
                }

                return new_name;
        };

        function data_reducer(state, action) {

                var suppress_from = function suppress_from(list_, qualified_id) {
                        var rest = list_.filter(function (node) {
                                return node.id !== qualified_id;
                        });

                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                                for (var _iterator3 = list_[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var node = _step3.value;

                                        if (node.copying_node_id === qualified_id) {
                                                rest = suppress_from(rest, node.id);
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

                        var children = Global_State.getChildrenById([].concat(_toConsumableArray(state)), qualified_id);

                        // console.log('childreeeeeeeeeeeeen', children)

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                                for (var _iterator4 = children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var child = _step4.value;

                                        // console.log(id, node.parentId)
                                        rest = suppress_from(rest, child.id);
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

                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;

                                        try {
                                                for (var _iterator5 = state[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                        var localNode = _step5.value;

                                                        var added = false;
                                                        var _iteratorNormalCompletion6 = true;
                                                        var _didIteratorError6 = false;
                                                        var _iteratorError6 = undefined;

                                                        try {
                                                                for (var _iterator6 = new_data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                                                        var node = _step6.value;

                                                                        if (node.id === localNode.id) {
                                                                                if (initManager.haveBeenModified(node)) {
                                                                                        updated_state.push(node);
                                                                                } else updated_state.push(localNode);

                                                                                added = true;
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

                                                        if (added) continue;
                                                        if (localNode.id.split('-').length === 2) updated_state.push(localNode);
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

                                        initData.current = JSON.parse(JSON.stringify(new_data));

                                        return JSON.parse(JSON.stringify(updated_state));
                                }
                        case 'add_folder':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

                                        var _data = action.job.data;

                                        var new_folder = Global_State.createNodeData("ds" + action.job.node_id, "folder", getService(_data.services), false, _data.name, "ds", false, _data.front_parent_type === 'root' ? '0' : _data.front_parent_type + _data.parent_id, "", true, undefined, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data.section_id), undefined, undefined);
                                        new_folder.path = Global_State.getNewPath(Object.assign({}, new_folder), [].concat(_toConsumableArray(state)), true);
                                        new_folder['onEdit'] = true;

                                        state.push(new_folder);

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_folder':
                                {

                                        var newState = suppress_from(state, "ds" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(newState));
                                }
                        case 'move_folder':
                                {
                                        var now_state = [].concat(_toConsumableArray(state));

                                        var _data2 = action.job;

                                        var to_delete = [];

                                        var to_update = [];

                                        // console.log('============', now_state, `${ Global_State.parseModelToFrontType(data.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(data.destination_type)}${data.destination_id}` }`)
                                        var destination = now_state.find(function (node) {
                                                return node.id === "" + (Global_State.parseModelToFrontType(_data2.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(_data2.destination_type) + _data2.destination_id);
                                        });

                                        var new_state = now_state.map(function (node) {
                                                if (node.id === "ds" + _data2.id) {
                                                        var parent_type = destination.type;

                                                        var new_node = JSON.parse(JSON.stringify(node));

                                                        if (parent_type === 'root') {
                                                                var section = Global_State.getCurrentSection();

                                                                new_node.parentId = '0';
                                                                new_node.section_id = section.id;
                                                                new_node.services = section.services;
                                                        } else {
                                                                new_node.parentId = parent_type + _data2.destination_id;
                                                                new_node.section_id = destination.section_id;
                                                                new_node.services = destination.services;
                                                        }

                                                        new_node.name = new_node.onCopy || new_node.name;

                                                        if (isExistingIn([].concat(_toConsumableArray(now_state)), new_node.name, destination.id)) {
                                                                console.log('on_________exist', _data2);

                                                                switch (parseInt(_data2.on_exist)) {
                                                                        case 1:
                                                                                {
                                                                                        return node;
                                                                                }
                                                                        case 2:
                                                                                {

                                                                                        new_node.name = getNewName([].concat(_toConsumableArray(now_state)), new_node.name, destination.id);

                                                                                        break;
                                                                                }
                                                                        case 3:
                                                                                {
                                                                                        var attach_children = function attach_children(node_to_move, existant_node, all_nodes) {
                                                                                                var children_to_move = Global_State.getChildrenById([].concat(_toConsumableArray(all_nodes)), node_to_move.id);
                                                                                                var existant_children = [].concat(_toConsumableArray(Global_State.getChildrenById([].concat(_toConsumableArray(all_nodes)), existant_node.id)));

                                                                                                var _loop = function _loop(child_to_move) {
                                                                                                        var existant_child = existant_children.find(function (node) {
                                                                                                                return node.name === child_to_move.name;
                                                                                                        });

                                                                                                        if (existant_child) {
                                                                                                                if (existant_child.type === 'ds') {
                                                                                                                        attach_children(child_to_move, existant_child, all_nodes);
                                                                                                                        to_delete.push(child_to_move.id);

                                                                                                                        return "continue";
                                                                                                                } else if (existant_child.type === 'f') {
                                                                                                                        to_delete.push(existant_child.id);
                                                                                                                }
                                                                                                        }

                                                                                                        child_to_move.parentId = existant_node.id;
                                                                                                        child_to_move.section_id = existant_node.section_id;
                                                                                                        child_to_move.services = existant_node.services;
                                                                                                        child_to_move.path = Global_State.getNewPath(Object.assign({}, child_to_move), all_nodes, true);

                                                                                                        to_update.push(child_to_move);
                                                                                                };

                                                                                                var _iteratorNormalCompletion7 = true;
                                                                                                var _didIteratorError7 = false;
                                                                                                var _iteratorError7 = undefined;

                                                                                                try {
                                                                                                        for (var _iterator7 = children_to_move[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                                                                                                var child_to_move = _step7.value;

                                                                                                                var _ret = _loop(child_to_move);

                                                                                                                if (_ret === "continue") continue;
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
                                                                                        };

                                                                                        var children = Global_State.getChildrenById([].concat(_toConsumableArray(now_state)), destination.id);

                                                                                        var existant_node = children.find(function (child) {
                                                                                                return child.name === node.name;
                                                                                        });

                                                                                        attach_children(node, existant_node, [].concat(_toConsumableArray(now_state)));

                                                                                        to_delete.push(node.id);

                                                                                        return node;
                                                                                }
                                                                        default:
                                                                                return node;
                                                                }
                                                        }

                                                        new_node.path = Global_State.getNewPath(new_node, now_state, true);

                                                        return new_node;
                                                }
                                                return node;
                                        });

                                        to_delete.forEach(function (qualified_id) {
                                                var current_state = JSON.parse(JSON.stringify(new_state));

                                                new_state = suppress_from(current_state, qualified_id);
                                        });

                                        new_state = [].concat(_toConsumableArray(new_state)).map(function (node) {
                                                return to_update.find(function (element) {
                                                        return element.id === node.id;
                                                }) || node;
                                        });

                                        to_update.splice(0, to_update.length);
                                        to_delete.splice(0, to_delete.length);

                                        return new_state;
                                }
                        case 'add_files':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_files');

                                        var _data3 = action.job.data;
                                        var files = action.job.data.files;

                                        console.log('dataaaaaaaaaaaaaaaaaaas', files, action.job);

                                        var _iteratorNormalCompletion8 = true;
                                        var _didIteratorError8 = false;
                                        var _iteratorError8 = undefined;

                                        try {
                                                for (var _iterator8 = files[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                                        var file = _step8.value;


                                                        var part_name = file.name.split('.');

                                                        var ext = part_name[part_name.length - 1];

                                                        var new_file = Global_State.createNodeData("f" + id.current, "file", getService(_data3.services), false, file.name, "f", false, _data3.front_parent_type === 'root' ? '0' : _data3.front_parent_type + _data3.parent_id, "", false, ext, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data3.section_id), file.size, undefined);
                                                        new_file.path = Global_State.getNewPath(Object.assign({}, new_file), [].concat(_toConsumableArray(state)), true);
                                                        new_file['onEdit'] = true;

                                                        state.push(new_file);

                                                        id.current = id.current - 1;
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

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_file':
                                {

                                        var _newState = suppress_from(state, "f" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(_newState));
                                }
                        case 'move_file':
                                {
                                        var _now_state = [].concat(_toConsumableArray(state));

                                        var _data4 = action.job;

                                        var _to_delete = [];

                                        var _destination = _now_state.find(function (node) {
                                                return node.id === "" + (Global_State.parseModelToFrontType(_data4.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(_data4.destination_type) + _data4.destination_id);
                                        });

                                        var _new_state = _now_state.map(function (node) {
                                                if (node.id === "f" + _data4.id) {
                                                        var parent_type = _destination.type;

                                                        var new_node = JSON.parse(JSON.stringify(node));

                                                        if (parent_type === 'root') {
                                                                var section = Global_State.getCurrentSection();

                                                                new_node.parentId = '0';
                                                                new_node.section_id = section.id;
                                                                new_node.services = section.services;
                                                        } else {
                                                                new_node.parentId = parent_type + _data4.destination_id;
                                                                new_node.section_id = _destination.section_id;
                                                                new_node.services = _destination.services;
                                                        }

                                                        new_node.name = new_node.onCopy || new_node.name;

                                                        if (isExistingIn([].concat(_toConsumableArray(_now_state)), node.name, _destination.id)) {
                                                                console.log('on_________exist', _data4);

                                                                switch (parseInt(_data4.on_exist)) {
                                                                        case 1:
                                                                                {
                                                                                        return node;
                                                                                }
                                                                        case 2:
                                                                                {

                                                                                        new_node.name = getNewName([].concat(_toConsumableArray(_now_state)), new_node.name, _destination.id);

                                                                                        break;
                                                                                }
                                                                        case 3:
                                                                                {
                                                                                        var children = Global_State.getChildrenById([].concat(_toConsumableArray(_now_state)), _destination.id);

                                                                                        var _iteratorNormalCompletion9 = true;
                                                                                        var _didIteratorError9 = false;
                                                                                        var _iteratorError9 = undefined;

                                                                                        try {
                                                                                                for (var _iterator9 = children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                                                                                        var child = _step9.value;
                                                                                                        if (child.name === node.name) _to_delete.push(child.id);
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

                                                                                        break;
                                                                                }
                                                                        default:
                                                                                return node;
                                                                }
                                                        }

                                                        new_node.path = Global_State.getNewPath(new_node, _now_state, true);

                                                        return new_node;
                                                }
                                                return node;
                                        });

                                        _to_delete.map(function (qualified_id) {
                                                var current_state = JSON.parse(JSON.stringify(_new_state));

                                                _new_state = suppress_from(current_state, qualified_id);
                                        });

                                        return _new_state;
                                }
                        case 'add_audit':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_audit');

                                        var _iteratorNormalCompletion10 = true;
                                        var _didIteratorError10 = false;
                                        var _iteratorError10 = undefined;

                                        try {
                                                for (var _iterator10 = action.jobs[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                                        var job = _step10.value;

                                                        var _data5 = job.data;

                                                        var type = _data5.sub_type !== undefined ? _data5.sub_type : 'audit';

                                                        var new_node = Global_State.createNodeData("" + type + job.node_id, "folder", getService(_data5.services), false, _data5.name, type, false, type === 'audit' ? '0' : "audit" + job.data.audit_id, "", true, undefined, type === 'audit' ? Global_State.authUser : undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data5.section_id), undefined, undefined);
                                                        new_node.path = Global_State.getNewPath(Object.assign({}, new_node), [].concat(_toConsumableArray(state)), true);
                                                        new_node['onEdit'] = true;

                                                        state.push(new_node);
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

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_audit':
                                {

                                        var _newState2 = suppress_from(state, "audit" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(_newState2));
                                }
                        case 'add_fncs':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

                                        var _data6 = action.job.data;

                                        var _ref = [parseInt(_data6.debut), parseInt(_data6.fin)],
                                            debut = _ref[0],
                                            fin = _ref[1];


                                        var audit = state.find(function (node) {
                                                return node.id === state.find(function (node) {
                                                        return node.id === "nonC" + _data6.nonC_id;
                                                }).parentId;
                                        });

                                        for (var i = debut; i < fin + 1; i++) {
                                                var new_fnc = Global_State.createNodeData("fnc" + id.current, "folder", getService(_data6.services), false, "FNC-" + audit.name + "-" + i, "fnc", false, "nonC" + _data6.nonC_id, "", true, undefined, undefined, false, null, 'pas encore créé', _data6.level, parseInt(audit.section_id), undefined, undefined);
                                                new_fnc.path = Global_State.getNewPath(Object.assign({}, new_fnc), [].concat(_toConsumableArray(state)), true);
                                                new_fnc['onEdit'] = true;
                                                new_fnc['access_key'] = { job_id: action.job.id, num: i };

                                                state.push(new_fnc);

                                                id.current = id.current - 1;
                                        }

                                        return JSON.parse(JSON.stringify(state));
                                }
                        case 'del_fnc':
                                {

                                        var _newState3 = suppress_from(state, "fnc" + action.id);

                                        // console.log('new_staaaaaaaaaaaaate', newState)

                                        return JSON.parse(JSON.stringify(_newState3));
                                }
                        case 'update_fnc':
                                {

                                        console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

                                        var _data7 = action.job.data;

                                        // for (let node of state)
                                        // {
                                        //        if (node.id === `fnc${data.id}`)
                                        //        {
                                        //
                                        //        }
                                        // }

                                        return JSON.parse(JSON.stringify(state.map(function (node) {
                                                if (node.id === "fnc" + _data7.id) {
                                                        node[_data7.update_object] = _data7.new_value;
                                                        node['onEdit'] = true;
                                                }

                                                return node;
                                        })));
                                }
                        case 'copy':
                                {
                                        // console.log('copy new_nodes', new_nodes)
                                        //
                                        // const new_state = [...state]
                                        //
                                        // new_state.push(...new_nodes)

                                        return JSON.parse(JSON.stringify(action.job));
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

                var getJobByKey = function getJobByKey(key) {
                        try {
                                var _iteratorNormalCompletion11 = true;
                                var _didIteratorError11 = false;
                                var _iteratorError11 = undefined;

                                try {
                                        for (var _iterator11 = state[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                                var job = _step11.value;

                                                console.log('searching joooooooooob key.job_id', job.id, key.job_id);
                                                if (job.id === key.job_id) return job;
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

                                return {};
                        } catch (e) {
                                var _iteratorNormalCompletion12 = true;
                                var _didIteratorError12 = false;
                                var _iteratorError12 = undefined;

                                try {
                                        for (var _iterator12 = state[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                                var _job = _step12.value;

                                                console.log('searching joooooooooob key', _job.id, key);
                                                if (_job.id === key) return _job;
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

                                return {};
                        }
                };

                var getDependencies = function getDependencies(parent_id, parent_type) {
                        if (parseInt(parent_id) < 0) {
                                if (parent_type === 'App\\Models\\NonConformite') {
                                        var fnc = Global_State.getNodeDataById("fnc" + parent_id);

                                        return [fnc.access_key];
                                } else {
                                        return [state.find(function (job) {
                                                return job.node_id === parseInt(parent_id);
                                        }).id];
                                        // for (const job of state)
                                        // {
                                        //         if(  ) return [job.id]
                                        // }
                                }
                        }
                        return [];
                };

                var getJobsByNodeId = function getJobsByNodeId(node_id, node_model) {
                        var jobs = new Map();

                        if (node_id && node_model) {
                                var _iteratorNormalCompletion13 = true;
                                var _didIteratorError13 = false;
                                var _iteratorError13 = undefined;

                                try {
                                        for (var _iterator13 = state[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                                var job = _step13.value;

                                                if (job.node_id === parseInt(node_id) && job.node_model === node_model) {
                                                        if (job.operation === 'copy') {
                                                                var copy_jobs = jobs.get(job.operation);
                                                                if (copy_jobs) {
                                                                        copy_jobs.push(job);

                                                                        jobs.set(job.operation, copy_jobs);
                                                                } else jobs.set(job.operation, [job]);
                                                        } else jobs.set(job.operation, job);
                                                }
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
                        }

                        return jobs;
                };

                var supress_from_jobs = function supress_from_jobs(job_list, id, model) {
                        var children = Global_State.getChildrenById([].concat(_toConsumableArray(localDataState)), Global_State.parseModelToFrontType(model) + id);

                        var new_job_list = [].concat(_toConsumableArray(job_list));

                        var jobs_to_del = getJobsByNodeId(id, model);
                        console.log('jobs_to_del', jobs_to_del);
                        if (jobs_to_del.size) {

                                jobs_to_del.forEach(function (job_to_del, key) {

                                        new_job_list = [].concat(_toConsumableArray(new_job_list)).filter(function (job) {
                                                // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)

                                                return job.id !== job_to_del.id;
                                        });

                                        if ((key === 'add_copy' || key === 'fuse_copy') && job_to_del.root_node) {
                                                new_job_list = [].concat(_toConsumableArray(new_job_list)).filter(function (job) {
                                                        return job.id !== job_to_del.copy_job_id;
                                                });
                                        }

                                        if (key === 'copy') {
                                                var _iteratorNormalCompletion14 = true;
                                                var _didIteratorError14 = false;
                                                var _iteratorError14 = undefined;

                                                try {
                                                        for (var _iterator14 = job_to_del[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                                                var copy_job = _step14.value;

                                                                var _arr = [].concat(_toConsumableArray(new_job_list));

                                                                for (var _i = 0; _i < _arr.length; _i++) {
                                                                        var job = _arr[_i];
                                                                        if (job.copy_job_id === copy_job.id) {
                                                                                new_job_list = supress_from_jobs([].concat(_toConsumableArray(new_job_list)), job.node_id, job.node_model);
                                                                        }
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
                                        }
                                });
                        }

                        console.log('children' + id, children);
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;

                        try {
                                for (var _iterator15 = children[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                        var child = _step15.value;

                                        var identity = Global_State.identifyNode(child);

                                        new_job_list = supress_from_jobs([].concat(_toConsumableArray(new_job_list)), identity[0], identity[1]);
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

                        return [].concat(_toConsumableArray(new_job_list));
                };

                function getRelativePath(path, basePath) {
                        // Récupération de l'index du début du sous-chemin dans le chemin complet
                        var startIndex = path.indexOf(basePath);
                        if (startIndex === -1) {
                                // Si le sous-chemin n'a pas été trouvé, retour de la chaîne vide
                                return '';
                        }

                        // Récupération de l'index de fin du sous-chemin
                        var endIndex = startIndex + basePath.length;

                        // Récupération du sous-chemin relatif en utilisant la méthode substring
                        return path.substring(endIndex);
                }

                var create_copy = function create_copy(from_id, to_id, all_nodes, on_exist, copy_job_id) {
                        var root_node = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

                        console.log('from_id, to_id, all_nodes, on_exist', from_id, to_id, on_exist);

                        var root_children = false;

                        var new_all_nodes = [].concat(_toConsumableArray(all_nodes));
                        var new_add_jobs = [];

                        var node_to_copy = new_all_nodes.find(function (node) {
                                return node.id === from_id;
                        });
                        var node_model = node_to_copy.type === 'ds' ? 'App\\Models\\DossierSimple' : 'App\\Models\\Fichier';
                        var children_to_copy = Global_State.getChildrenById([].concat(_toConsumableArray(new_all_nodes)), node_to_copy.id);
                        var destination = new_all_nodes.find(function (node) {
                                return node.id === to_id;
                        });

                        var new_node = destination ? isExistingIn([].concat(_toConsumableArray(new_all_nodes)), node_to_copy.name, destination.id) : false;
                        // if (!destination)
                        // {
                        //         for(let node of new_all_nodes)
                        //         {
                        //                 // console.log(node.id)
                        //                 if (node.id === to_id) {
                        //                         destination = node
                        //                         break
                        //                 }
                        //         }
                        // }

                        // console.log('create_copy1')

                        if (new_node) {
                                switch (parseInt(on_exist)) {
                                        case 1:
                                                {
                                                        return [new_all_nodes, new_add_jobs];
                                                }
                                        case 2:
                                                {
                                                        //create add in copy job

                                                        var parent_id = Global_State.identifyNode(destination)[0];

                                                        var _data8 = {
                                                                relative_path: '',
                                                                front_parent_type: destination.type,
                                                                parent_id: parent_id
                                                        };

                                                        var add_copy_job = {
                                                                id: job_id.current,
                                                                operation: 'add_copy',
                                                                node_id: id.current,
                                                                node_model: node_model,
                                                                copy_job_id: copy_job_id,
                                                                root_node: root_node,
                                                                data: _data8,
                                                                etat: 'waiting'

                                                                //create node

                                                                // console.log('create_copy4')
                                                        };new_node.name = getNewName([].concat(_toConsumableArray(localDataState)), new_node.name, destination.id);

                                                        // console.log('create_copy5')

                                                        new_node.id = "" + new_node.type + id.current;

                                                        id.current = id.current - 1;

                                                        new_node.created_at = 'pas encore cree';

                                                        if (node_to_copy.type === 'f') {
                                                                new_node.taille = node_to_copy.taille;
                                                                new_node.url = node_to_copy.url;
                                                        }

                                                        new_node.path = Global_State.getNewPath(new_node, new_all_nodes);
                                                        new_node['onEdit'] = true;
                                                        new_node['onCopy'] = new_node.name;
                                                        if (root_node && from_id.split('-').length > 1) new_node.copying_node_id = from_id;

                                                        // console.log('create_copy6')

                                                        // console.log('relative path', destination.path, new_node.path)
                                                        add_copy_job.data.relative_path = new_node.path.replace(/:/g, '');

                                                        job_id.current++;

                                                        new_add_jobs.push(add_copy_job);

                                                        new_all_nodes.push(new_node);

                                                        break;
                                                }
                                        case 3:
                                                {
                                                        // create add in copy job

                                                        var _data9 = {
                                                                relative_path: ''
                                                        };

                                                        var fuse_to_existant_job = {
                                                                id: job_id.current,
                                                                operation: 'fuse_copy',
                                                                node_id: new_node.id,
                                                                node_model: node_model,
                                                                copy_job_id: copy_job_id,
                                                                root_node: root_node,
                                                                data: _data9,
                                                                etat: 'waiting'
                                                        };

                                                        job_id.current++;

                                                        new_add_jobs.push(fuse_to_existant_job);

                                                        // create node
                                                        new_all_nodes = new_all_nodes.map(function (node) {
                                                                if (node.id === new_node.id) {
                                                                        if (node_to_copy.type === 'f') {
                                                                                node.taille = node_to_copy.taille;
                                                                                node.url = node_to_copy.url;
                                                                        }

                                                                        // if (root_node && (from_id.split('-').length > 1)) root_children = true
                                                                }
                                                                return node;
                                                        });

                                                        break;
                                                }
                                }
                        } else {
                                //create add in copy job

                                console.log('destination', destination);

                                var _parent_id = Global_State.identifyNode(destination)[0];

                                var _data10 = {
                                        relative_path: '',
                                        front_parent_type: destination.type,
                                        parent_id: _parent_id
                                };

                                var _add_copy_job = {
                                        id: job_id.current,
                                        operation: 'add_copy',
                                        node_id: id.current,
                                        node_model: node_model,
                                        copy_job_id: copy_job_id,
                                        root_node: root_node,
                                        data: _data10,
                                        etat: 'waiting'

                                        //create node

                                };new_node = JSON.parse(JSON.stringify(node_to_copy));

                                new_node.id = "" + new_node.type + id.current;

                                id.current = id.current - 1;

                                new_node.parentId = destination.id;
                                new_node.section_id = destination.section_id;
                                new_node.services = destination.services;

                                if (node_to_copy.type === 'f') {
                                        new_node.taille = node_to_copy.taille;
                                        new_node.url = node_to_copy.url;
                                }

                                new_node.created_at = 'pas encore cree';
                                new_node.path = Global_State.getNewPath(new_node, new_all_nodes);
                                new_node['onEdit'] = true;
                                new_node['onCopy'] = new_node.name;
                                if (root_node && from_id.split('-').length > 1) new_node.copying_node_id = from_id;

                                _add_copy_job.data.relative_path = new_node.path.replace(/:/g, '');

                                job_id.current++;

                                new_add_jobs.push(_add_copy_job);

                                new_all_nodes.push(new_node);
                        }

                        // console.log('create_copy2')

                        var _iteratorNormalCompletion16 = true;
                        var _didIteratorError16 = false;
                        var _iteratorError16 = undefined;

                        try {
                                for (var _iterator16 = children_to_copy[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                        var child = _step16.value;

                                        var res = root_children ? create_copy(child.id, new_node.id, new_all_nodes, on_exist, copy_job_id, true) : create_copy(child.id, new_node.id, new_all_nodes, on_exist, copy_job_id);

                                        new_all_nodes = [].concat(_toConsumableArray(res[0]));

                                        new_add_jobs.push.apply(new_add_jobs, _toConsumableArray(res[1]));
                                }

                                // console.log('create_copy3')
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

                        return [new_all_nodes, new_add_jobs];
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

                                        var node = form_to_json(request);
                                        var job = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\DossierSimple',
                                                data: node,
                                                etat: 'waiting',
                                                dependencies: getDependencies(node.parent_id, node.parent_type)

                                        };

                                        new_state.push(job);

                                        job_id.current = job_id.current + 1;

                                        id.current = id.current - 1;

                                        setDatasState({ type: 'add_folder', job: job });

                                        return new_state;
                                }
                        case 'del_folder':
                                {

                                        var _id = action.id;

                                        var _new_state2 = supress_from_jobs([].concat(_toConsumableArray(state)), _id, 'App\\Models\\DossierSimple');

                                        if (!(parseInt(_id) < 0)) {
                                                var _job2 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id,
                                                        node_model: 'App\\Models\\DossierSimple',
                                                        etat: 'waiting'

                                                };

                                                _new_state2.push(_job2);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_folder', id: _id });

                                        return _new_state2;
                                }
                        case 'move_folder':
                                {
                                        var _new_state3 = Global_State.copyObject(state);

                                        var _request = action.request;

                                        var json_request = form_to_json(_request);

                                        var to_move = localDataState.find(function (node) {
                                                return node.id === "ds" + json_request.id;
                                        });

                                        console.log('mooooooove', json_request);

                                        if (parseInt(json_request.id) > 0 || to_move.onCopy) {
                                                var existant_job = getJobsByNodeId(json_request.id, 'App\\Models\\DossierSimple').get('move');
                                                if (existant_job) {
                                                        _new_state3 = _new_state3.map(function (job) {
                                                                if (job.operation === 'move') {
                                                                        if (job.node_model === 'App\\Models\\DossierSimple' && job.node_id === parseInt(json_request.id)) {
                                                                                return Object.assign({}, job, {
                                                                                        data: json_request,
                                                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                                                });
                                                                        }
                                                                        return job;
                                                                } else return job;
                                                        });
                                                } else {
                                                        var _job3 = {
                                                                id: job_id.current,
                                                                operation: 'move',
                                                                node_id: parseInt(json_request.id),
                                                                node_model: 'App\\Models\\DossierSimple',
                                                                data: json_request,
                                                                etat: 'waiting',
                                                                from_dependency: getDependencies(json_request.id, 'App\\Models\\DossierSimple'),
                                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                        };

                                                        _new_state3.push(_job3);

                                                        job_id.current = job_id.current + 1;
                                                }
                                        } else {
                                                var folder = to_move;
                                                var destination = localDataState.find(function (node) {
                                                        return node.id === "" + (Global_State.parseModelToFrontType(json_request.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(json_request.destination_type) + json_request.destination_id);
                                                });

                                                if (isExistingIn([].concat(_toConsumableArray(localDataState)), folder.name, destination.id)) {
                                                        // toast.error(`Selon les données locales, il existe deja un dossier de ce nom a la destination:\n${folder.name}`)

                                                        return state;
                                                }
                                                _new_state3 = _new_state3.map(function (job) {
                                                        if (job.operation === 'add') {
                                                                if (job.node_model === 'App\\Models\\DossierSimple' && job.node_id === parseInt(json_request.id)) {
                                                                        console.log('destination', destination);

                                                                        var parent_services = destination.type === 'root' ? Global_State.getCurrentSection().services : destination.services;
                                                                        var parent_section_id = destination.type === 'root' ? Global_State.getCurrentSection().id : destination.section_id;

                                                                        var services = parent_services.map(function (service) {
                                                                                return { value: service.id, label: service.name };
                                                                        });
                                                                        var new_data = Object.assign({}, job.data, {
                                                                                front_parent_type: destination.type,
                                                                                parent_id: json_request.destination_id,
                                                                                parent_type: json_request.destination_type,
                                                                                section_id: parent_section_id,
                                                                                services: services

                                                                        });

                                                                        return Object.assign({}, job, {
                                                                                data: new_data,
                                                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                                        });
                                                                }
                                                                return job;
                                                        } else return job;
                                                });
                                        }

                                        setDatasState({ type: 'move_folder', job: json_request });

                                        return _new_state3;
                                }
                        case 'copy_folder':
                                {
                                        var _new_state4 = [].concat(_toConsumableArray(state));

                                        var _request2 = action.request;

                                        var _json_request = form_to_json(_request2);

                                        console.log('new_state_copy', _new_state4, state);

                                        var _destination2 = localDataState.find(function (node) {
                                                return node.id === "" + (Global_State.parseModelToFrontType(_json_request.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(_json_request.destination_type) + _json_request.destination_id);
                                        });
                                        if (_destination2.type === 'root') _destination2.section_id = Global_State.getCurrentSection().id;
                                        console.log('destination', _destination2, Global_State.parseModelToFrontType(_json_request.destination_type));

                                        var old_folder = localDataState.find(function (node) {
                                                return node.id === "ds" + _json_request.id;
                                        });

                                        console.log('cooooooopy', _json_request);

                                        // id.current = id.current - 1
                                        var _job4 = void 0;

                                        if (parseInt(_json_request.id) > 0) {
                                                _job4 = {
                                                        id: job_id.current,
                                                        operation: 'copy',
                                                        // node_id: parseInt(json_request.id),
                                                        node_model: 'App\\Models\\DossierSimple',
                                                        data: _json_request,
                                                        etat: 'waiting',
                                                        dependencies: getDependencies(_json_request.destination_id, _json_request.destination_type)
                                                };

                                                _new_state4.push(_job4);

                                                job_id.current = job_id.current + 1;
                                        } else {

                                                _job4 = {
                                                        id: job_id.current,
                                                        operation: 'copy',
                                                        node_id: parseInt(_json_request.id),
                                                        node_model: 'App\\Models\\DossierSimple',
                                                        data: _json_request,
                                                        etat: 'waiting',
                                                        from_dependency: getDependencies(_json_request.id, 'App\\Models\\DossierSimple'),
                                                        dependencies: getDependencies(_json_request.destination_id, _json_request.destination_type)
                                                };

                                                _new_state4.push(_job4);

                                                job_id.current = job_id.current + 1;
                                        }

                                        var copy_object = create_copy(old_folder.id, _destination2.id, localDataState, _json_request.on_exist, _job4.id, true);

                                        _new_state4.push.apply(_new_state4, _toConsumableArray(copy_object[1]));

                                        setDatasState({ type: 'copy', job: copy_object[0] });
                                        // setDatasState({type: 'add_folder', job})

                                        // setDatasState({type: 'move_folder', job: json_request})

                                        return _new_state4;
                                }
                        case 'add_files':
                                {
                                        var _new_state5 = [].concat(_toConsumableArray(state));

                                        var _request3 = action.request;

                                        var _node = form_to_json(_request3);
                                        // console.log('nooooooooooooooooooooooooooooode file', {node})
                                        var _job5 = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\Fichier',
                                                data: _node,
                                                etat: 'waiting',
                                                dependencies: getDependencies(_node.parent_id, _node.parent_type)

                                        };

                                        console.log('nooooooooooooooooooooooooooooode file', { node: _node });

                                        _new_state5.push(_job5);

                                        job_id.current = job_id.current + 1;

                                        setDatasState({ type: 'add_files', job: _job5 });

                                        return _new_state5;
                                }
                        case 'del_file':
                                {

                                        var _id2 = action.id;

                                        var _new_state6 = supress_from_jobs([].concat(_toConsumableArray(state)), _id2, 'App\\Models\\Fichier');

                                        if (!(parseInt(_id2) < 0)) {
                                                var _job6 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id2,
                                                        node_model: 'App\\Models\\Fichier',
                                                        etat: 'waiting'

                                                };

                                                _new_state6.push(_job6);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_file', id: _id2 });

                                        return _new_state6;
                                }
                        case 'move_file':
                                {
                                        var _new_state7 = [].concat(_toConsumableArray(state));

                                        var _request4 = action.request;

                                        var _json_request2 = form_to_json(_request4);

                                        var file_to_move = localDataState.find(function (node) {
                                                return node.id === "f" + _json_request2.id;
                                        });

                                        console.log('mooooooove', _json_request2);

                                        if (parseInt(_json_request2.id) > 0 || file_to_move.onCopy) {
                                                var _existant_job = getJobsByNodeId(_json_request2.id, 'App\\Models\\Fichier').get('move');
                                                if (_existant_job) {
                                                        _new_state7 = [].concat(_toConsumableArray(_new_state7)).map(function (job) {
                                                                if (job.id === _existant_job.id) {
                                                                        return Object.assign({}, job, { data: _json_request2, dependencies: getDependencies(_json_request2.destination_id, _json_request2.destination_type) });
                                                                } else return job;
                                                        });
                                                } else {
                                                        var _job7 = {
                                                                id: job_id.current,
                                                                operation: 'move',
                                                                node_id: parseInt(_json_request2.id),
                                                                node_model: 'App\\Models\\Fichier',
                                                                data: _json_request2,
                                                                etat: 'waiting',
                                                                from_dependency: getDependencies(_json_request2.id, 'App\\Models\\Fichier'),
                                                                dependencies: getDependencies(_json_request2.destination_id, _json_request2.destination_type)
                                                        };

                                                        _new_state7.push(_job7);

                                                        job_id.current = job_id.current + 1;
                                                }
                                        } else {
                                                var _destination3 = localDataState.find(function (node) {
                                                        return node.id === "" + (Global_State.parseModelToFrontType(_json_request2.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(_json_request2.destination_type) + _json_request2.destination_id);
                                                });

                                                if (isExistingIn([].concat(_toConsumableArray(localDataState)), file_to_move.name, _destination3.id)) {
                                                        // toast.error(`Selon les données locales, il existe deja un dossier de ce nom a la destination:\n${folder.name}`)

                                                        return state;
                                                }

                                                _new_state7 = _new_state7.map(function (job) {
                                                        if (job.operation === 'add') {
                                                                if (job.node_model === 'App\\Models\\Fichier' && job.node_id === parseInt(_json_request2.id)) {
                                                                        console.log('destination', _destination3);

                                                                        var parent_services = _destination3.type === 'root' ? Global_State.getCurrentSection().services : _destination3.services;
                                                                        var parent_section_id = _destination3.type === 'root' ? Global_State.getCurrentSection().id : _destination3.section_id;

                                                                        var services = parent_services.map(function (service) {
                                                                                return { value: service.id, label: service.name };
                                                                        });
                                                                        var new_data = Object.assign({}, job.data, {
                                                                                front_parent_type: _destination3.type,
                                                                                parent_id: _json_request2.destination_id,
                                                                                parent_type: _json_request2.destination_type,
                                                                                section_id: parent_section_id,
                                                                                services: services

                                                                        });

                                                                        return Object.assign({}, job, {
                                                                                data: new_data,
                                                                                dependencies: getDependencies(_json_request2.destination_id, _json_request2.destination_type)
                                                                        });
                                                                }
                                                                return job;
                                                        } else return job;
                                                });
                                        }

                                        setDatasState({ type: 'move_file', job: _json_request2 });

                                        return _new_state7;
                                }
                        case 'copy_file':
                                {
                                        var _new_state8 = [].concat(_toConsumableArray(state));

                                        var _request5 = action.request;

                                        var _json_request3 = form_to_json(_request5);

                                        var _destination4 = localDataState.find(function (node) {
                                                return node.id === "" + (Global_State.parseModelToFrontType(_json_request3.destination_type) === 'root' ? '0' : "" + Global_State.parseModelToFrontType(_json_request3.destination_type) + _json_request3.destination_id);
                                        });
                                        if (_destination4.type === 'root') _destination4.section_id = Global_State.getCurrentSection().id;
                                        console.log('destination', _destination4, Global_State.parseModelToFrontType(_json_request3.destination_type));

                                        var old_file = localDataState.find(function (node) {
                                                return node.id === "f" + _json_request3.id;
                                        });

                                        console.log('cooooooopy', _json_request3);

                                        // id.current = id.current - 1
                                        var _job8 = void 0;

                                        if (parseInt(_json_request3.id) > 0) {
                                                _job8 = {
                                                        id: job_id.current,
                                                        operation: 'copy',
                                                        // node_id: parseInt(json_request.id),
                                                        node_model: 'App\\Models\\Fichier',
                                                        data: _json_request3,
                                                        etat: 'waiting',
                                                        dependencies: getDependencies(_json_request3.destination_id, _json_request3.destination_type)
                                                };

                                                _new_state8.push(_job8);

                                                job_id.current = job_id.current + 1;
                                        } else {

                                                _job8 = {
                                                        id: job_id.current,
                                                        operation: 'copy',
                                                        node_id: parseInt(_json_request3.id),
                                                        node_model: 'App\\Models\\Fichier',
                                                        data: _json_request3,
                                                        etat: 'waiting',
                                                        from_dependency: getDependencies(_json_request3.id, 'App\\Models\\Fichier'),
                                                        dependencies: getDependencies(_json_request3.destination_id, _json_request3.destination_type)
                                                };

                                                _new_state8.push(_job8);

                                                job_id.current = job_id.current + 1;
                                        }

                                        var _copy_object = create_copy(old_file.id, _destination4.id, localDataState, _json_request3.on_exist, _job8.id, true);

                                        _new_state8.push.apply(_new_state8, _toConsumableArray(_copy_object[1]));

                                        setDatasState({ type: 'copy', job: _copy_object[0] });
                                        // setDatasState({type: 'add_folder', job})

                                        // setDatasState({type: 'move_folder', job: json_request})

                                        return _new_state8;
                                }
                        case 'add_audit':
                                {
                                        var _new_state9 = [].concat(_toConsumableArray(state));

                                        var _request6 = action.request;

                                        var _node2 = form_to_json(_request6);

                                        var _job9 = {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\Audit',
                                                data: _node2,
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
                                                        audit_id: _job9.node_id,
                                                        sub_type: 'checkList',
                                                        services: _job9.data.services,
                                                        section_id: _job9.data.section_id
                                                },
                                                dependencies: [_job9.id],
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
                                                        audit_id: _job9.node_id,
                                                        sub_type: 'dp',
                                                        services: _job9.data.services,
                                                        section_id: _job9.data.section_id
                                                },
                                                dependencies: [_job9.id],
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
                                                        audit_id: _job9.node_id,
                                                        sub_type: 'nonC',
                                                        services: _job9.data.services,
                                                        section_id: _job9.data.section_id
                                                },
                                                dependencies: [_job9.id],
                                                etat: 'waiting'
                                        };
                                        job_id.current = job_id.current + 1;
                                        id.current = id.current - 1;

                                        _new_state9.push(_job9, checkList_job, dp_job, NC_job);

                                        setDatasState({ type: 'add_audit', jobs: [_job9, checkList_job, dp_job, NC_job] });

                                        return _new_state9;
                                }
                        case 'del_audit':
                                {

                                        var _id3 = action.id;

                                        var _new_state10 = supress_from_jobs([].concat(_toConsumableArray(state)), _id3, 'App\\Models\\Audit');

                                        if (!(parseInt(_id3) < 0)) {
                                                var _job10 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id3,
                                                        node_model: 'App\\Models\\Audit',
                                                        etat: 'waiting'

                                                };

                                                _new_state10.push(_job10);

                                                job_id.current = job_id.current + 1;
                                        }

                                        setDatasState({ type: 'del_audit', id: _id3 });

                                        return _new_state10;
                                }
                        case 'add_fncs':
                                {
                                        var _new_state11 = [].concat(_toConsumableArray(state));

                                        var _request7 = action.request;

                                        var _node3 = form_to_json(_request7);
                                        var _job11 = {
                                                id: job_id.current,
                                                operation: 'add',
                                                // node_id: id.current,
                                                node_model: 'App\\Models\\NonConformite',
                                                data: _node3,
                                                etat: 'waiting',
                                                dependencies: getDependencies(_node3.nonC_id, 'App\\Models\\Nc'),
                                                exceptions: []

                                        };

                                        _new_state11.push(_job11);

                                        job_id.current = job_id.current + 1;

                                        setDatasState({ type: 'add_fncs', job: _job11 });

                                        return _new_state11;
                                }
                        case 'del_fnc':
                                {

                                        var _id4 = action.id;

                                        var _new_state12 = supress_from_jobs([].concat(_toConsumableArray(state)), _id4, 'App\\Models\\NonConformite');

                                        if (!(parseInt(_id4) < 0)) {
                                                var _job12 = {
                                                        id: job_id.current,
                                                        operation: 'del',
                                                        node_id: _id4,
                                                        node_model: 'App\\Models\\NonConformite',
                                                        etat: 'waiting'
                                                };

                                                _new_state12.push(_job12);

                                                job_id.current = job_id.current + 1;
                                        } else {
                                                var fnc = _new_state12.find(function (node) {
                                                        return node.id === "fnc" + _id4;
                                                });

                                                _new_state12 = _new_state12.map(function (job) {
                                                        if (parseInt(job.id) === parseInt(fnc.access_key.job_id)) {
                                                                job.exceptions.push(fnc.access_key.num);
                                                        }
                                                        return job;
                                                }).filter(function (job) {
                                                        return !(parseInt(job.id) === parseInt(fnc.access_key.job_id) && job.exceptions.length === parseInt(job.data.fin) - parseInt(job.data.debut) + 1);
                                                });
                                        }

                                        setDatasState({ type: 'del_fnc', id: _id4 });

                                        return _new_state12;
                                }
                        case 'update_fnc':
                                {
                                        var _new_state13 = [].concat(_toConsumableArray(state));

                                        var _request8 = action.request;

                                        var _node4 = form_to_json(_request8);

                                        var _iteratorNormalCompletion17 = true;
                                        var _didIteratorError17 = false;
                                        var _iteratorError17 = undefined;

                                        try {
                                                for (var _iterator17 = _new_state13[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                                                        var _job14 = _step17.value;

                                                        if (_job14.operation === 'update' && _job14.data.id === _node4.id && _job14.data.update_object === _node4.update_object) {
                                                                _job14.data = _node4;

                                                                setDatasState({ type: 'update_fnc', job: _job14 });

                                                                return _new_state13;
                                                        }
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

                                        var _job13 = {
                                                id: job_id.current,
                                                operation: 'update',
                                                node_id: parseInt(_node4.id),
                                                node_model: 'App\\Models\\NonConformite',
                                                data: _node4,
                                                etat: 'waiting',
                                                dependencies: getDependencies(_node4.id, 'App\\Models\\NonConformite')

                                        };

                                        _new_state13.push(_job13);

                                        job_id.current = job_id.current + 1;

                                        setDatasState({ type: 'update_fnc', job: _job13 });

                                        return _new_state13;
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
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(request) {
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
                                                                console.log('editor handling ressssssssssssssssssssssssssssssssssss', res);
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

                return function save(_x2) {
                        return _ref2.apply(this, arguments);
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

                                                                        var sortedJobs = [];
                                                                        var visitedJobs = new Set();

                                                                        function topologicalSort(jobs, jobId) {

                                                                                visitedJobs.add(jobId);

                                                                                var job = jobs.find(function (j) {
                                                                                        return j.id === jobId;
                                                                                });
                                                                                if (!job) return;

                                                                                if ((!job.dependencies || job.dependencies.length === 0) && !job.copy_job_id) {
                                                                                        sortedJobs.push(job);
                                                                                        return;
                                                                                }

                                                                                var _iteratorNormalCompletion18 = true;
                                                                                var _didIteratorError18 = false;
                                                                                var _iteratorError18 = undefined;

                                                                                try {
                                                                                        for (var _iterator18 = (job.dependencies || (job.copy_job_id ? [job.copy_job_id] : []))[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                                                                                var dependency = _step18.value;

                                                                                                var dependencyId = typeof dependency === 'number' ? dependency : dependency.job_id;
                                                                                                if (!visitedJobs.has(dependencyId)) {
                                                                                                        topologicalSort(jobs, dependencyId);
                                                                                                }
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

                                                                                sortedJobs.push(job);
                                                                        }

                                                                        var _iteratorNormalCompletion19 = true;
                                                                        var _didIteratorError19 = false;
                                                                        var _iteratorError19 = undefined;

                                                                        try {
                                                                                for (var _iterator19 = jobs[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                                                                        var job = _step19.value;

                                                                                        if (!visitedJobs.has(job.id)) {
                                                                                                topologicalSort(jobs, job.id);
                                                                                        }
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

                                                                        sortedJobs.map(function (job) {
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
                                                                                id: 'Saving',
                                                                                duration: Infinity
                                                                        }).then(function (res) {
                                                                                setTimeout(function () {
                                                                                        toast.dismiss('Saving');
                                                                                }, 800);
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
                        },
                        move: function move(request) {
                                dispatch_job({ type: 'move_folder', request: request });
                        },
                        copy: function copy(request) {
                                dispatch_job({ type: 'copy_folder', request: request });
                        }
                },
                files: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_files', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_file', id: id });
                        },
                        move: function move(request) {
                                dispatch_job({ type: 'move_file', request: request });
                        },
                        copy: function copy(request) {
                                dispatch_job({ type: 'copy_file', request: request });
                        }
                },
                audit: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_audit', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_audit', id: id });
                        }
                },
                fnc: {
                        add: function add(request) {
                                dispatch_job({ type: 'add_fncs', request: request });
                        },
                        delete: function _delete(id) {
                                dispatch_job({ type: 'del_fnc', id: id });
                        },
                        update: function update(request) {
                                dispatch_job({ type: 'update_fnc', request: request });
                        }
                }

        };
}