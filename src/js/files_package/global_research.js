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
                setFilterTag('Audit');
        };

        return React.createElement(
                "div",
                { onClick: function onClick(e) {
                                e.stopPropagation();
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
                                                { onClick: handleFilterTagClick },
                                                " ",
                                                filterTag,
                                                " "
                                        ),
                                        " "
                                ),
                                React.createElement(Form.Control, {
                                        type: "search",
                                        placeholder: "Search",
                                        "aria-label": "Search",
                                        value: value,
                                        onChange: handleChange
                                })
                        )
                ),
                React.createElement(
                        Card,
                        { id: 'global_research_result', className: (value === '' ? 'd-none' : 'd-flex') + " mt-1 p-1", sx: { maxHeight: 3 * window.innerHeight / 4, maxWidth: 9 * window.innerWidth / 10 } },
                        React.createElement(
                                TableContainer,
                                { component: Paper },
                                React.createElement(
                                        Table,
                                        { "aria-label": "simple table" },
                                        React.createElement(
                                                TableBody,
                                                null,
                                                Global_State.dataToUse.filter(function (node) {
                                                        if (value === '') return false;else if (filterTag === 'All') return node.name.indexOf(value) !== -1;else if (filterTag === 'Audit') return node.type === 'audit' && node.name.indexOf(value) !== -1;else if (filterTag === 'FNC') return node.type === 'fnc' && node.name.indexOf(value) !== -1;else if (filterTag === 'Folder') return node.type === 'ds' && node.name.indexOf(value) !== -1;else if (filterTag === 'File') return node.type === 'f' && node.name.indexOf(value) !== -1;
                                                }).map(function (node) {
                                                        return React.createElement(
                                                                TableRow,
                                                                {
                                                                        key: node.id,
                                                                        className: 'm-1',
                                                                        sx: { margin: 5 }
                                                                },
                                                                React.createElement(
                                                                        TableCell,
                                                                        { className: 'd-none d-sm-block', component: "th", scope: "row", sx: { minWidth: 'max-content' } },
                                                                        node.name + "   " + node.path
                                                                ),
                                                                React.createElement(
                                                                        TableCell,
                                                                        { className: 'd-block d-sm-none', component: "th", scope: "row", sx: { minWidth: 'max-content' } },
                                                                        node.name
                                                                )
                                                        );
                                                })
                                        )
                                )
                        )
                )
        );
}