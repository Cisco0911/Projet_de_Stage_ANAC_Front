var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";

import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Global_State } from "../main";
import { createPortal } from "react-dom";
import Stack from "@mui/material/Stack";

export default function Global_research(_ref) {
        var display = _ref.display;

        var _useState = useState(''),
            _useState2 = _slicedToArray(_useState, 2),
            value = _useState2[0],
            setValue = _useState2[1];

        var _useState3 = useState('All'),
            _useState4 = _slicedToArray(_useState3, 2),
            filterTag = _useState4[0],
            setFilterTag = _useState4[1];
        // const [result_display, setDiaplay] = useState('d-none')

        var handleChange = function handleChange(e) {
                e.stopPropagation();
                setValue(e.target.value);
                // if (e.target.value.length > 0) setDiaplay('d-flex')
                // else setDiaplay('d-none')
        };

        var handleFilterTagClick = function handleFilterTagClick(e) {
                e.stopPropagation();

                switch (filterTag) {
                        case 'All':
                                setFilterTag('Folder');
                                break;
                        case 'Folder':
                                setFilterTag('File');
                                break;
                        case 'File':
                                setFilterTag('Audit');
                                break;
                        case 'Audit':
                                setFilterTag('FNC');
                                break;
                        default:
                                setFilterTag('All');
                                break;

                }
        };

        return React.createElement(
                "div",
                { onClick: function onClick(e) {
                                e.preventDefault();e.stopPropagation();
                        } },
                React.createElement(
                        Form,
                        { id: 'global_research', className: display + " container-fluid", style: { width: window.innerWidth > 576 ? 500 : 'unset' } },
                        React.createElement(
                                Form.Label,
                                { htmlFor: "inlineFormInputGroup", visuallyHidden: true },
                                "Global_research"
                        ),
                        React.createElement(
                                InputGroup,
                                { className: "me-2" },
                                React.createElement(
                                        InputGroup.Text,
                                        null,
                                        " ",
                                        React.createElement(
                                                "div",
                                                { onClick: handleFilterTagClick, style: { cursor: 'pointer' } },
                                                " ",
                                                filterTag,
                                                " "
                                        ),
                                        " "
                                ),
                                React.createElement(Form.Control, {
                                        id: 'global_research_input',
                                        style: { backgroundColor: 'whitesmoke' },
                                        type: "search",
                                        placeholder: "Search",
                                        "aria-label": "Search",
                                        value: value,
                                        onChange: handleChange,
                                        autoFocus: true
                                })
                        )
                ),
                React.createElement(
                        "div",
                        { className: "d-flex justify-content-center",
                                style: {
                                        width: "100%"
                                }
                        },
                        React.createElement(
                                Card,
                                { id: 'global_research_result', className: (value === '' ? 'd-none' : 'd-flex flex-column') + " mt-1 p-1",
                                        sx: {
                                                maxHeight: 3 * window.innerHeight / 4,
                                                maxWidth: 9 * window.innerWidth / 10,
                                                backgroundColor: '#0062ff7a',
                                                border: 'solid blue 1px',
                                                overflowY: 'scroll',
                                                zIndex: 1900,
                                                position: "fixed"
                                        }
                                },
                                window.Global_State.dataToUse.filter(function (node) {
                                        if (value === '' || node.isRoot) return false;else if (node.type === 'checkList' || node.type === 'dp' || node.type === 'nc') return false;else if (filterTag === 'All') return node.name.indexOf(value) !== -1;else if (filterTag === 'Audit') return node.type === 'audit' && node.name.indexOf(value) !== -1;else if (filterTag === 'FNC') return node.type === 'fnc' && node.name.indexOf(value) !== -1;else if (filterTag === 'Folder') return node.type === 'ds' && node.name.indexOf(value) !== -1;else if (filterTag === 'File') return node.type === 'f' && node.name.indexOf(value) !== -1;
                                }).map(function (node) {
                                        var Research_name_component = function Research_name_component(_ref2) {
                                                var name = _ref2.name,
                                                    researched_word = _ref2.researched_word;

                                                var idx = name.indexOf(researched_word);

                                                var _ref3 = [name.substring(0, idx), name.substring(idx, idx + researched_word.length), name.substring(idx + researched_word.length, name.length)],
                                                    prev = _ref3[0],
                                                    current = _ref3[1],
                                                    next = _ref3[2];


                                                return React.createElement(
                                                        "span",
                                                        { className: 'd-block align-items-center', title: name,
                                                                style: {
                                                                        width: "-webkit-fit-content",
                                                                        overflow: 'hidden',
                                                                        textOverflow: "ellipsis",
                                                                        maxWidth: window.innerWidth > 576 ? '45%' : '100%',
                                                                        flex: "0 0 auto"
                                                                }
                                                        },
                                                        prev,
                                                        React.createElement(
                                                                "span",
                                                                { style: { backgroundColor: 'blue', color: 'white', borderRadius: 2, padding: 2 } },
                                                                current
                                                        ),
                                                        next
                                                );
                                        };

                                        var handleClick = function handleClick(e) {
                                                e.stopPropagation();

                                                if (window.innerWidth > 576) window.Global_State.absolutePopover.close();else setValue('');
                                                window.Global_State.EventsManager.emit("show_on_screen", node);
                                        };

                                        return React.createElement(
                                                Card,
                                                {
                                                        key: node.id,
                                                        className: 'm-1 d-flex align-items-center',
                                                        sx: {
                                                                minHeight: 35,
                                                                margin: 5,
                                                                padding: 2,
                                                                overflowX: 'scroll',
                                                                cursor: 'pointer'
                                                        },
                                                        onClick: handleClick
                                                },
                                                React.createElement(
                                                        Stack,
                                                        { direction: "row", spacing: 1, className: "d-none d-sm-flex flex-sm-row align-items-center", style: { width: '100%', whiteSpace: "nowrap" } },
                                                        React.createElement(Research_name_component, { name: node.name, researched_word: value }),
                                                        React.createElement(
                                                                "span",
                                                                { title: "" + node.path,
                                                                        style: {
                                                                                height: "fit-content",
                                                                                color: "#00000075",
                                                                                fontSize: 13,
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                flex: 1
                                                                        }
                                                                },
                                                                " ",
                                                                "" + node.path,
                                                                " "
                                                        )
                                                ),
                                                React.createElement(
                                                        "div",
                                                        { title: node.path, className: 'd-block d-sm-none', style: { width: '100%' } },
                                                        React.createElement(Research_name_component, { name: node.name, researched_word: value })
                                                )
                                        );
                                })
                        )
                )
        );
}