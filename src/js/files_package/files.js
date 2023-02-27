import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Tree } from "react-arborist";
import useBack from "./nodeBackend";
import FileTable from "./content";
import useFileDetails from "./files_details";
import "./file_style.css";

import { useSpring, animated } from 'react-spring';

import { FcOpenedFolder, FcFolder, FcTodoList, FcMultipleCameras } from "react-icons/fc";
import { GiArchiveResearch, GiTreeRoots } from "react-icons/gi";

import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import PolicyTwoToneIcon from '@mui/icons-material/PolicyTwoTone';
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone';
import RuleFolderTwoToneIcon from '@mui/icons-material/RuleFolderTwoTone';

export default function useGetFiles(Global_research) {
        var _this = this;

        useEffect(function () {
                var handleKeyDown = function handleKeyDown(e) {
                        if (e.ctrlKey && e.key === 'f') {
                                // console.log('find node')
                                // window.Global_State.setOverlay_props( t => (
                                //         {
                                //                 ...t,
                                //                 style:
                                //                 {
                                //                         ...t.style,
                                //                         display: 'flex',
                                //                         alignItems: 'start',
                                //                         justifyContent: 'center'
                                //                 },
                                //                 children: (
                                //                 <div style={{ width: "max-content", marginTop: 15 }} onClick={ e => { e.stopPropagation() } } >
                                //                         {Global_research}
                                //                 </div>
                                //                 ),
                                //
                                //         }
                                // ) )

                                window.Global_State.absolutePopover.open(Global_research);

                                setImmediate(function () {
                                        var gr_input = document.getElementById('global_research_input');
                                        gr_input.focus();
                                        gr_input.select();
                                });
                        } else if (e.ctrlKey && e.key.length === 1) {
                                // console.log(e)

                                window.Global_State.EventsManager.emit("shortcut", "ctrl_" + e.key);

                                // const component = document.getElementById(`ctrl_${e.key}`)
                                // if (component)
                                // {
                                //         console.log(component)
                                //         component.click()
                                // }
                        }
                };

                // console.log('Global_research', Global_research)

                document.addEventListener('keydown', handleKeyDown);
                window.Global_State.EventsManager.on('show_on_screen', function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
                                var parent_id;
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                                switch (_context.prev = _context.next) {
                                                        case 0:
                                                                _context.next = 2;
                                                                return window.Global_State.setSectionId(data.section_id);

                                                        case 2:
                                                                parent_id = window.Global_State.getNodeDataById(data.id).parentId;
                                                                _context.next = 5;
                                                                return window.Global_State.backend.setCurrentSelectedFolder(parent_id);

                                                        case 5:

                                                                setTimeout(function () {
                                                                        // console.log("scroooooooooooooooooooooooooooool")
                                                                        // const row = document.getElementById(`row-${data.id}`)
                                                                        // row.click()
                                                                        // const parent = document.querySelector(".content_xl_size_content")
                                                                        //
                                                                        // parent.scrollTop = row.offsetTop

                                                                        window.Global_State.EventsManager.emit("select_row", data.id);
                                                                }, 500);

                                                        case 6:
                                                        case "end":
                                                                return _context.stop();
                                                }
                                        }
                                }, _callee, _this);
                        }));

                        return function (_x) {
                                return _ref.apply(this, arguments);
                        };
                }());

                return function () {
                        document.removeEventListener('keydown', handleKeyDown);
                        window.Global_State.EventsManager.off('show_on_screen');
                };
        }, []);

        window.Global_State['backend'] = useBack();

        window.Global_State.get_auditFamily_icon = function (type) {
                switch (type) {
                        case "root":
                                return React.createElement(GiTreeRoots, { size: 30, color: "brown" });
                        case "audit":
                                return React.createElement(PolicyTwoToneIcon, { color: "secondary", style: { fontSize: 30, pointerEvents: "none" } });
                        case "checkList":
                                return React.createElement(FcTodoList, { size: 30, style: { pointerEvents: "none" } });
                        case "dp":
                                return React.createElement(GiArchiveResearch, { size: 30, color: "#35c1f1", style: { pointerEvents: "none" } });
                        case "nonC":
                                return React.createElement(RuleFolderTwoToneIcon, { color: "error", style: { fontSize: 30, pointerEvents: "none" } });
                        case "fnc":
                                return React.createElement(GppBadTwoToneIcon, { color: "error", style: { fontSize: 30, pointerEvents: "none" } });
                        default:
                                return null;
                }
        };

        var dataTable = useMemo(function () {
                return React.createElement(FileTable, null);
        }, [window.Global_State.backend.selectedNode.model]);

        var dataDetail = useFileDetails();
        window.Global_State.showDetails = dataDetail.showDetails;

        return {
                fileTree: window.Global_State.hasSection ? React.createElement(FileTree, { data: window.Global_State.backend.data }) : React.createElement("div", null),
                fileTable: window.Global_State.hasSection ? dataTable : React.createElement("div", null),
                fileDetails: window.Global_State.hasSection ? dataDetail.detailsComponent : React.createElement("div", null)
        };
}

function FileTree(_ref2) {
        var data = _ref2.data;


        var tree = useRef();

        var expanded = window.Global_State.expanded;

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
        })(function (_ref3) {
                var _ref4;

                var theme = _ref3.theme;
                return _ref4 = {}, _defineProperty(_ref4, "& ." + treeItemClasses.iconContainer, {
                        '& .close': {
                                opacity: 0.3
                        }
                }), _defineProperty(_ref4, "& ." + treeItemClasses.group, {
                        marginLeft: 15,
                        paddingLeft: 5,
                        borderLeft: "1px dashed " + alpha(theme.palette.text.primary, 0.4)
                }), _ref4;
        });

        var Label = function Label(_ref5) {
                var node = _ref5.node;

                var _useState = useState(expanded.indexOf(node.id) !== -1),
                    _useState2 = _slicedToArray(_useState, 2),
                    isOpen = _useState2[0],
                    setIsOpen = _useState2[1];

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

                        // console.log(expanded);

                        window.Global_State.EventsManager.emit("setExpanded", expanded);
                };

                var handleClick = function handleClick(e) {
                        if (e) e.stopPropagation();
                        window.Global_State.backend.setCurrentSelectedFolder(node.id);
                };

                useEffect(function () {
                        window.Global_State.EventsManager.on("toggle" + node.id, function (e) {
                                /*console.log(`toggle${node.id}`);*/handleDbClick(e);
                        });
                        return function () {
                                window.Global_State.EventsManager.off("toggle" + node.id);
                        };
                }, []);

                return React.createElement(
                        "div",
                        { id: "treeRow-" + node.id, onClick: handleClick, onDoubleClick: handleDbClick },
                        React.createElement(
                                "span",
                                { className: "mr-1" },
                                window.Global_State.get_auditFamily_icon(node.type) || (isOpen ? React.createElement(FcOpenedFolder, { size: 30 }) : React.createElement(FcFolder, { size: 30 }))
                        ),
                        node.name
                );
        };

        var RenderTree = useCallback(function RenderTree(_ref6) {
                var node = _ref6.node;

                // console.log(tree.current.expanded)

                return React.createElement(
                        StyledTreeItem,
                        { key: node.id, nodeId: node.id.toString(), label: React.createElement(Label, { node: node }),
                                expandIcon: React.createElement(ChevronRightIcon, { onClick: function onClick(e) {
                                                window.Global_State.EventsManager.emit("toggle" + node.id, e);
                                        } }),
                                collapseIcon: React.createElement(ExpandMoreIcon, { onClick: function onClick(e) {
                                                window.Global_State.EventsManager.emit("toggle" + node.id, e);
                                        } })
                        },
                        Array.isArray(node.children) ? node.children.filter(function (node) {
                                return node.global_type === 'folder';
                        }).map(function (node) {
                                return React.createElement(RenderTree, { key: node.id, node: node });
                        }) : null
                );
        }, [data]);

        // const handleFocus = (event) =>
        // {
        //         event.preventDefault()
        //         event.stopPropagation()
        //         console.log( 'foooooooooooooooooooooooooooooooocuuuuuuuuuuuuuuuuuuuuuus', event )
        //         // window.Global_State.backend.setCurrentSelectedFolder(nodeId)
        //
        //         // setExpanded( [nodeId] )
        // }

        // console.log('data22222', data)

        useEffect(function () {
                // console.log('expand_change', expanded)
        }, [expanded]);

        return React.createElement(
                "div",
                { className: "file_tree_container" },
                React.createElement(
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
                )
        );
}