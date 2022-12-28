var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import TreeModel from "tree-model";

import { isUpdate, endUpdate } from './parse_to_json';
import useGetJsonData from "./parse_to_json";
import { Global_State } from "../main";

var findById = function findById(node, id) {
        return node.first(function (n) {
                return n.model.id === id;
        });
};

export default function useBack() {

        var jsonData = Global_State.jsonValue;

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
                        for (var _iterator = Global_State.FetchedNodesData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _ref = _step.value;

                                var _ref2 = _slicedToArray(_ref, 2);

                                var key = _ref2[0];
                                var value = _ref2[1];
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
                        for (var _iterator2 = theMap.get(Global_State.selectedSectionId)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var data = _step2.value;

                                if (data.id === id) {
                                        data.isOpen = isOpen;
                                        // console.log(data.isOpen)
                                }
                        }
                        // console.log(theMap)
                        // console.log(jsonData)
                        // console.log(Global_State.value)
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

                Global_State.setFnd(theMap);
                // Global_State.setSectionId(Global_State.selectedSectionId)
        };

        var _useState = useState(root),
            _useState2 = _slicedToArray(_useState, 2),
            selectedNode = _useState2[0],
            _setCurrentSelectedFolder = _useState2[1];

        var prev = useRef(null);

        useEffect(function () {

                console.log('root', root);
                Global_State.clearSelected();
                _setCurrentSelectedFolder(find(selectedNode.model.id));
                console.log('nodeBackend_selectedNode', selectedNode);
                console.log('2', isUpdate);
        }, [root]);

        // console.log('nodeBackend', jsonData)
        // console.log('root', root)
        // console.log('selectedNode', selectedNode)

        return {
                data: jsonData.data,
                root: root,
                onToggle: updateOpenState,
                selectedNode: selectedNode,
                prev: prev,
                setCurrentSelectedFolder: function setCurrentSelectedFolder(id) {
                        var node = find(id);
                        if (node.model.global_type === "folder") {
                                if (JSON.stringify(selectedNode.model) !== JSON.stringify(node.model)) prev.current = selectedNode.model;

                                Global_State.selectedNodeIdsInSections.current.set(Global_State.selectedSectionId, id);

                                // console.log(Global_State.selectedNodeIdsInSections)
                                _setCurrentSelectedFolder(node);
                                // Global_State.clearSelected()
                        }
                }
        };
}