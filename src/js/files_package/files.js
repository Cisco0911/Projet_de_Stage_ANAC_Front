var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable import/first */

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Tree } from "react-arborist";
import useBack from "./nodeBackend";
import FileTable from "./content";
import FileDetails from "./files_details";
import "./file_style.css";
import { Global_State } from "../main";

import { useSpring, animated } from 'react-spring';

import { FcOpenedFolder, FcFolder } from "react-icons/fc";

import TreeView from '@mui/lab/TreeView';
// import TreeViewContext from '@mui/lab/TreeView/TreeViewContext';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';

export default function useGetFiles(Global_research) {

        useEffect(function () {
                var handleKeyDown = function handleKeyDown(e) {
                        if (e.ctrlKey && e.key === 'f') {
                                console.log('find node');
                                Global_State.setOverlay_props(function (t) {
                                        return Object.assign({}, t, {
                                                style: Object.assign({}, t.style, {
                                                        display: 'flex',
                                                        alignItems: 'start',
                                                        justifyContent: 'center'
                                                }),
                                                children: React.createElement(
                                                        "div",
                                                        { style: { width: "max-content", marginTop: 15 }, onClick: function onClick(e) {
                                                                        e.stopPropagation();
                                                                } },
                                                        Global_research
                                                )

                                        });
                                });

                                setImmediate(function () {
                                        var gr_input = document.getElementById('global_research_input');
                                        gr_input.focus();
                                        gr_input.select();
                                });
                        } else if (e.ctrlKey && e.key.length === 1) {
                                // console.log(e)
                                var component = document.getElementById("ctrl_" + e.key);
                                if (component) component.click();
                        }
                };

                // console.log('Global_research', Global_research)

                document.addEventListener('keydown', handleKeyDown);

                return function () {
                        document.removeEventListener('keydown', handleKeyDown);
                };
        }, []);

        Global_State['backend'] = useBack();

        var dataTable = useMemo(function () {
                return React.createElement(FileTable, null);
        }, [Global_State.backend.selectedNode.model]);

        return {
                fileTree: Global_State.hasSection ? React.createElement(FileTree, { data: Global_State.backend.data }) : React.createElement("div", null),
                fileTable: Global_State.hasSection ? dataTable : React.createElement("div", null),
                fileDetails: Global_State.hasSection ? React.createElement(FileDetails, null) : React.createElement("div", null)
        };
}

function FileTree(_ref) {
        var data = _ref.data;


        // console.log('data111111', data)
        //
        // data = [...data].filter( node_data => ( node_data.global_type === 'folder' ) )

        var tree = useRef();

        var _useState = useState(['0']),
            _useState2 = _slicedToArray(_useState, 2),
            expanded = _useState2[0],
            setExpanded = _useState2[1];

        // return (
        //         <div style={{ height: "100%", width: "100%" }} >
        //           <div>
        //             <button onClick={ () => {tree.current.scrollToId(7); tree.current.selectById(7)} }>
        //               add
        //             </button>
        //           </div>
        //           <div id = 'tree' >
        //             <Tree
        //               ref={tree}
        //               indent={20}
        //               onToggle={backend.onToggle}
        //               data={backend.data}
        //               rowHeight = {40}
        //               width = {500}
        //             >
        //               {Node}
        //             </Tree>
        //           </div>
        //         </div>
        // )

        function TransitionComponent(props) {
                var style = useSpring({
                        from: {
                                opacity: 0,
                                transform: 'translate3d(20px,0,0)'
                        },
                        to: {
                                opacity: props.in ? 1 : 0,
                                transform: "translate3d(" + (props.in ? 0 : 20) + "px,0,0)"
                        }
                });

                return React.createElement(
                        animated.div,
                        { style: style },
                        React.createElement(Collapse, props)
                );
        }

        var StyledTreeItem = styled(function (props) {
                return React.createElement(TreeItem, Object.assign({}, props, { TransitionComponent: TransitionComponent }));
        })(function (_ref2) {
                var _ref3;

                var theme = _ref2.theme;
                return _ref3 = {}, _defineProperty(_ref3, "& ." + treeItemClasses.iconContainer, {
                        '& .close': {
                                opacity: 0.3
                        }
                }), _defineProperty(_ref3, "& ." + treeItemClasses.group, {
                        marginLeft: 15,
                        paddingLeft: 5,
                        borderLeft: "1px dashed " + alpha(theme.palette.text.primary, 0.4)
                }), _ref3;
        });

        var Label = function Label(_ref4) {
                var node = _ref4.node;

                var _useState3 = useState(expanded.indexOf(node.id) !== -1),
                    _useState4 = _slicedToArray(_useState3, 2),
                    isOpen = _useState4[0],
                    setIsOpen = _useState4[1];

                var handleDbClick = function handleDbClick(e) {
                        // console.log('db_eeeeeeeeeeeeeevent', e, e.nativeEvent.is_opening)

                        if (e) e.stopPropagation();

                        var force_open = e ? e.nativeEvent.is_opening : undefined;
                        // console.log('db_eeeeeeeeeeeeeevent force_state', force_state)
                        // if (force_open !== false) tree_row.click();

                        var open = function open() {
                                expanded.push(node.id);
                                setIsOpen(true);
                        },
                            close = function close() {
                                expanded.splice(expanded.indexOf(node.id.toString()), 1);
                                setIsOpen(false);
                        };

                        if (force_open === undefined) {
                                if (expanded.find(function (id) {
                                        return id === node.id.toString();
                                })) close();else open();
                        } else if (force_open && !isOpen) open();else if (!force_open && isOpen) close();

                        console.log(expanded);

                        setExpanded([].concat(_toConsumableArray(expanded)));
                };

                var handleClick = function handleClick(e) {
                        if (e) e.stopPropagation();
                        Global_State.backend.setCurrentSelectedFolder(node.id);
                };

                useEffect(function () {
                        Global_State.EventsManager.on("toggle" + node.id, function (e) {
                                console.log("toggle" + node.id);handleDbClick(e);
                        });
                        return function () {
                                Global_State.EventsManager.off("toggle" + node.id);
                        };
                }, []);

                return React.createElement(
                        "div",
                        { id: "treeRow-" + node.id, onClick: handleClick, onDoubleClick: handleDbClick },
                        React.createElement(
                                "span",
                                { className: "mr-1" },
                                isOpen ? React.createElement(FcOpenedFolder, { size: 28 }) : React.createElement(FcFolder, { size: 28 })
                        ),
                        node.name
                );
        };

        var RenderTree = useCallback(function RenderTree(_ref5) {
                var node = _ref5.node;

                // console.log(tree.current.expanded)

                return React.createElement(
                        StyledTreeItem,
                        { key: node.id, nodeId: node.id.toString(), label: useMemo(function () {
                                        return React.createElement(Label, { node: node });
                                }, []),
                                expandIcon: React.createElement(ChevronRightIcon, { onClick: function onClick(e) {
                                                Global_State.EventsManager.emit("toggle" + node.id, e);
                                        } }),
                                collapseIcon: React.createElement(ExpandMoreIcon, { onClick: function onClick(e) {
                                                Global_State.EventsManager.emit("toggle" + node.id, e);
                                        } })
                        },
                        Array.isArray(node.children) ? node.children.filter(function (node) {
                                return node.global_type === 'folder';
                        }).map(function (node) {
                                return React.createElement(RenderTree, { key: node.id, node: node });
                        }) : null
                );
        }, []);

        // const handleFocus = (event) =>
        // {
        //         event.preventDefault()
        //         event.stopPropagation()
        //         console.log( 'foooooooooooooooooooooooooooooooocuuuuuuuuuuuuuuuuuuuuuus', event )
        //         // Global_State.backend.setCurrentSelectedFolder(nodeId)
        //
        //         // setExpanded( [nodeId] )
        // }

        console.log('data22222', data);

        useEffect(function () {
                console.log('expand_change', expanded);
        }, [expanded]);

        return React.createElement(
                TreeView,
                {
                        id: "muiTree",
                        "aria-label": "file system navigator",
                        defaultCollapseIcon: React.createElement(ExpandMoreIcon, null),
                        defaultExpanded: ['0'],
                        defaultExpandIcon: React.createElement(ChevronRightIcon, null),
                        sx: { height: 'max-content', flexGrow: 1, width: 'max-content', overflowY: 'auto' },
                        expanded: expanded,
                        multiSelect: true,
                        ref: tree
                },
                React.createElement(RenderTree, { node: data })
        );
}