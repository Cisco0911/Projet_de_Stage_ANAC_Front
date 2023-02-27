import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import TreeModel from "tree-model";

import { isUpdate, endUpdate } from './parse_to_json';

var findById = function findById(node, id) {
        return node.first(function (n) {
                return n.model.id === id;
        });
};

var i = 888;

export default function useBack() {
        var _this = this;

        var jsonData = window.Global_State.jsonValue;

        var _useState = useState(''),
            _useState2 = _slicedToArray(_useState, 2),
            current_location = _useState2[0],
            update_location = _useState2[1];

        window.current_location = current_location;
        var current_section = useRef();

        var _ref = [useState([]), useState([])],
            _ref$ = _slicedToArray(_ref[0], 2),
            prev = _ref$[0],
            setPrev = _ref$[1],
            _ref$2 = _slicedToArray(_ref[1], 2),
            next = _ref$2[0],
            setNext = _ref$2[1];

        var navigation_history = useRef({
                prev: [],
                next: []
        });

        // const initData = jsonData.data

        // const [data, setData] = useState(initData)

        // useEffect(() => {
        //     if (isUpdate) {
        //         endUpdate()
        //         setData(jsonData.data)
        //     }
        // }, [jsonData])

        // console.log(jsonData)
        // console.log(data)

        var root = useMemo(function () {
                return new TreeModel().parse(jsonData.data);
        }, [jsonData.data]);

        var find = useCallback(function (id) {
                return findById(root, id);
        }, [root]);

        var updateOpenState = function updateOpenState(id, isOpen) {
                // console.log(id, isOpen)
                var theMap = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                        for (var _iterator = window.Global_State.structuredData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _ref2 = _step.value;

                                var _ref3 = _slicedToArray(_ref2, 2);

                                var key = _ref3[0];
                                var value = _ref3[1];
                                theMap.set(key, JSON.parse(JSON.stringify(value)));
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

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                        for (var _iterator2 = theMap.get(window.Global_State.selectedSectionId)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var data = _step2.value;

                                if (data.id === id) {
                                        data.isOpen = isOpen;
                                        // console.log(data.isOpen)
                                }
                        }
                        // console.log(theMap)
                        // console.log(jsonData)
                        // console.log(window.Global_State.value)
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

                window.Global_State.setFnd(theMap);
                // window.Global_State.setSectionId(window.Global_State.selectedSectionId)
        };

        var _useState3 = useState(root),
            _useState4 = _slicedToArray(_useState3, 2),
            selectedNode = _useState4[0],
            setSelectedFolder = _useState4[1];

        var setCurrentSelectedFolder = function setCurrentSelectedFolder(id) {
                var update_history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


                // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid", id)

                var node = find(id);
                // console.log("nooooooooooooooooode_modeeeeeeeel", node, root)

                if (!node) {
                        node = find("0");
                        navigation_history.current.prev = [];
                        navigation_history.current.next = [];
                }

                var new_node_section_id = void 0;

                if (node.model.isRoot) {
                        new_node_section_id = window.Global_State.selectedSectionId;
                } else new_node_section_id = node.model.section_id;

                if (node.model.global_type === "folder") {

                        if (selectedNode.model.id !== node.model.id && update_history && current_section.current === new_node_section_id) {
                                navigation_history.current.prev.push(selectedNode.model.id);
                                navigation_history.current.next = [];
                        }

                        window.Global_State.selectedNodeIdsInSections.current.set(window.Global_State.selectedSectionId, id);

                        // console.log(window.Global_State.selectedNodeIdsInSections)
                        setSelectedFolder(node);
                        // window.Global_State.clearSelected()
                }
        };

        var handlePrev = function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                        var new_prev, new_next, prev_id;
                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                        new_prev = [].concat(_toConsumableArray(navigation_history.current.prev));
                                                        new_next = [].concat(_toConsumableArray(navigation_history.current.next));
                                                        prev_id = new_prev.pop();

                                                        new_next.push(selectedNode.model.id);

                                                        navigation_history.current.prev = new_prev;

                                                        navigation_history.current.next = new_next;

                                                        setCurrentSelectedFolder(prev_id, false);

                                                case 7:
                                                case 'end':
                                                        return _context.stop();
                                        }
                                }
                        }, _callee, _this);
                }));

                return function handlePrev() {
                        return _ref4.apply(this, arguments);
                };
        }();

        var handleNext = function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                        var new_prev, new_next, next_id;
                        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                        switch (_context2.prev = _context2.next) {
                                                case 0:
                                                        // console.log("neeeeeeeeeeeeeeeeeeeeeeext", next)
                                                        new_prev = [].concat(_toConsumableArray(navigation_history.current.prev));
                                                        new_next = [].concat(_toConsumableArray(navigation_history.current.next));

                                                        // console.log("new_neeeeeeeeeeeeeeeeeeeeeeext", new_next)

                                                        next_id = new_next.pop();

                                                        new_prev.push(selectedNode.model.id);

                                                        navigation_history.current.prev = new_prev;

                                                        navigation_history.current.next = new_next;

                                                        setCurrentSelectedFolder(next_id, false);

                                                case 7:
                                                case 'end':
                                                        return _context2.stop();
                                        }
                                }
                        }, _callee2, _this);
                }));

                return function handleNext() {
                        return _ref5.apply(this, arguments);
                };
        }();

        useEffect(function () {
                navigation_history.current.prev = [];
                navigation_history.current.next = [];
        }, [window.Global_State.selectedSectionId]);

        useEffect(function () {
                window.Global_State.EventsManager.on("prev", handlePrev);
                window.Global_State.EventsManager.on("next", handleNext);

                return function () {
                        window.Global_State.EventsManager.off("prev");
                        window.Global_State.EventsManager.off("next");
                };
        });

        useEffect(function () {

                // console.log('root', root)
                window.Global_State.clearSelected();
                // setSelectedFolder(find(selectedNode.model.id))
                var section_id = window.Global_State.selectedSectionId;
                if (section_id) setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section_id));
                // console.log('nodeBackend_selectedNode', selectedNode)
                // console.log('2',isUpdate)
        }, [root]);

        useEffect(function () {
                if (selectedNode.model.isRoot) {
                        var location = void 0;
                        try {
                                location = window.Global_State.getCurrentSection().name + ':';
                        } catch (e) {
                                location = '';
                        }

                        update_location(location);

                        current_section.current = window.Global_State.selectedSectionId;
                } else {
                        update_location(selectedNode.model.path);
                        current_section.current = selectedNode.model.section_id;
                }

                setPrev(navigation_history.current.prev);
                setNext(navigation_history.current.next);
        }, [selectedNode]);

        // console.log('nodeBackend', jsonData)
        // console.log('root', root)
        // console.log('selectedNode', selectedNode.model)

        return {
                data: jsonData.data,
                root: root,
                onToggle: updateOpenState,
                selectedNode: selectedNode,
                prev: prev, next: next,
                setCurrentSelectedFolder: setCurrentSelectedFolder
        };
}