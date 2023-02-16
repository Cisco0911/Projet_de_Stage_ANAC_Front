var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { Name_component, Description_component } from "./service_section";
import { Services_component } from "./user_section";

import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TableHead, TablePagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { http } from "../auth/login";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

var columns = [{
        id: 'name',
        label: 'Nom',
        format: function format(value) {
                return React.createElement(Name_component, { value: value, is_service: false });
        },
        minWidth: 50
}, {
        id: 'services',
        label: 'Services',
        align: 'right',
        format: function format(value) {
                return React.createElement(Services_component, { value: value, is_user: false });
        }
}, {
        id: 'description',
        label: 'Description',
        format: function format(value) {
                return React.createElement(Description_component, { value: value, is_service: false });
        },
        minWidth: 250
}];

function Sections(_ref) {
        var rows = _ref.rows;

        var _useState = useState(0),
            _useState2 = _slicedToArray(_useState, 2),
            page = _useState2[0],
            setPage = _useState2[1];

        var _useState3 = useState(10),
            _useState4 = _slicedToArray(_useState3, 2),
            rowsPerPage = _useState4[0],
            setRowsPerPage = _useState4[1];

        var handleChangePage = function handleChangePage(event, newPage) {
                setPage(newPage);
        };

        var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
                setRowsPerPage(+event.target.value);
                setPage(0);
        };

        return React.createElement(
                Paper,
                { sx: { width: '100%', height: "100%", overflow: 'hidden' }, elevation: 0, variant: "outlined" },
                React.createElement(
                        TableContainer,
                        { sx: { maxHeight: "100%" } },
                        React.createElement(
                                Table,
                                { stickyHeader: true, "aria-label": "sticky table" },
                                React.createElement(
                                        TableHead,
                                        null,
                                        React.createElement(
                                                TableRow,
                                                null,
                                                columns.map(function (column) {
                                                        return React.createElement(
                                                                TableCell,
                                                                {
                                                                        key: column.id,
                                                                        align: column.align,
                                                                        style: { minWidth: column.minWidth }
                                                                },
                                                                column.label
                                                        );
                                                })
                                        )
                                ),
                                React.createElement(
                                        TableBody,
                                        null,
                                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (row) {
                                                return React.createElement(
                                                        TableRow,
                                                        { hover: true, role: "checkbox", tabIndex: -1, key: row.id },
                                                        columns.map(function (column) {
                                                                var value = void 0;

                                                                value = { id: row.id };
                                                                value[column.id] = row[column.id];

                                                                return React.createElement(
                                                                        TableCell,
                                                                        { key: column.id, align: column.align },
                                                                        column.format ? column.format(value) : row[column.id]
                                                                );
                                                        })
                                                );
                                        })
                                )
                        )
                ),
                React.createElement(TablePagination, {
                        rowsPerPageOptions: [10, 25, 100],
                        component: "div",
                        count: rows.length,
                        rowsPerPage: rowsPerPage,
                        page: page,
                        onPageChange: handleChangePage,
                        onRowsPerPageChange: handleChangeRowsPerPage
                })
        );
}

export default function Section_admin_section(_ref2) {
        var sections = _ref2.sections;

        var _useState5 = useState(false),
            _useState6 = _slicedToArray(_useState5, 2),
            open_dialog = _useState6[0],
            setOpen_dialog = _useState6[1];

        var _useState7 = useState(''),
            _useState8 = _slicedToArray(_useState7, 2),
            name = _useState8[0],
            setName = _useState8[1];

        var _useState9 = useState(undefined),
            _useState10 = _slicedToArray(_useState9, 2),
            error = _useState10[0],
            setError = _useState10[1];

        var _useState11 = useState(false),
            _useState12 = _slicedToArray(_useState11, 2),
            loading = _useState12[0],
            setLoading = _useState12[1];

        var handleChange = function handleChange(e) {
                var typed_value = e.target.value;
                // console.log(typed_value)

                setName(typed_value.toUpperCase());
                if (typed_value !== '') setError(undefined);else setError("Veuillez saisir le nom");
        };

        var handleClose = function handleClose() {
                setOpen_dialog(false);
        };

        var handleSubmit = function handleSubmit() {
                if (name === '') setError("Veuillez saisir le nom");else {
                        console.log("Creating section", name);
                        setLoading(true);

                        var queryData = new FormData();
                        queryData.append("name", name);

                        http.post("create_section", queryData).then(function (res) {
                                console.log(res);

                                if (res.data.statue === 'success') {
                                        window.reload();
                                        window.show_response("Section créée !", "success");

                                        setOpen_dialog(false);
                                } else window.show_response(res.data.data.msg, res.data.statue);

                                setLoading(false);
                        }).catch(function (err) {
                                console.log(err);

                                window.show_response(err.message + " " + err.response.data.message, "error");
                                setLoading(false);
                        });

                        setError(undefined);
                }
        };

        return React.createElement(
                "div",
                { className: "full_size_element",
                        style: {
                                position: "relative"
                        }
                },
                React.createElement(
                        "div",
                        { className: "full_size_element p-3" },
                        React.createElement(Sections, { rows: sections })
                ),
                React.createElement(
                        Box,
                        {
                                sx: {
                                        position: "absolute",
                                        right: "5%",
                                        bottom: "9%"
                                }
                        },
                        React.createElement(
                                Fab,
                                { size: "small", color: "secondary", "aria-label": "add", onClick: function onClick(e) {
                                                return setOpen_dialog(true);
                                        } },
                                React.createElement(AddIcon, null)
                        )
                ),
                React.createElement(
                        Dialog,
                        { open: open_dialog, onClose: handleClose },
                        React.createElement(
                                DialogTitle,
                                null,
                                "Add section"
                        ),
                        React.createElement(
                                DialogContent,
                                { sx: { minWidth: 350 } },
                                React.createElement(
                                        DialogContentText,
                                        null,
                                        "Enter le nom de la section"
                                ),
                                React.createElement(TextField, {
                                        autoFocus: true,
                                        margin: "dense",
                                        id: "name_service",
                                        label: "Nom de la section",
                                        type: "text",
                                        fullWidth: true,
                                        variant: "standard",
                                        error: Boolean(error),
                                        helperText: error,
                                        value: name,
                                        onChange: handleChange
                                })
                        ),
                        React.createElement(
                                DialogActions,
                                null,
                                React.createElement(
                                        Button,
                                        { onClick: handleClose },
                                        "Cancel"
                                ),
                                React.createElement(
                                        LoadingButton,
                                        { loading: loading, onClick: handleSubmit },
                                        "Add"
                                )
                        )
                )
        );
}