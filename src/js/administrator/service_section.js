var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { FcDepartment, FcDeleteRow } from "react-icons/fc";
import { ImNotification } from "react-icons/im";
import { IoBusinessOutline } from "react-icons/io5";

import Paper from "@mui/material/Paper";
import { BottomNavigation, BottomNavigationAction, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TableHead, TablePagination, TextField } from "@mui/material";
import Badge from "@mui/material/Badge";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

function Name_component(_ref) {
        var value = _ref.value;


        var handleDelete = function handleDelete(e) {
                console.log("suppress services", value.id);
        };

        return React.createElement(Chip, {
                label: value.name,
                variant: "outlined",
                onDelete: handleDelete,
                deleteIcon: React.createElement(
                        IconButton,
                        { color: "error" },
                        React.createElement(FcDeleteRow, { size: 20 })
                )
        });
}

function Description_component(_ref2) {
        var value = _ref2.value;

        var _useState = useState(''),
            _useState2 = _slicedToArray(_useState, 2),
            description = _useState2[0],
            setDescription = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            open_dialog = _useState4[0],
            setOpen_dialog = _useState4[1];

        var handleChange = function handleChange(e) {
                var typed_value = e.target.value;
                // console.log(typed_value)

                setDescription(typed_value);
        };

        var handleClose = function handleClose() {
                setOpen_dialog(false);
        };

        var handleSubmit = function handleSubmit() {

                console.log("Updating description", description);
                setOpen_dialog(false);
        };

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        "div",
                        { title: value.description, onClick: function onClick(e) {
                                        return setOpen_dialog(true);
                                },
                                style: {
                                        display: "flex",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        cursor: "pointer"
                                }
                        },
                        value.description + "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
                ),
                React.createElement(
                        Dialog,
                        { open: open_dialog, onClose: handleClose },
                        React.createElement(
                                DialogTitle,
                                null,
                                "Update description"
                        ),
                        React.createElement(
                                DialogContent,
                                { sx: { minWidth: 350 } },
                                React.createElement(
                                        DialogContentText,
                                        null,
                                        "D\xE9crivez le service"
                                ),
                                React.createElement(TextField, {
                                        autoFocus: true,
                                        multiline: true,
                                        margin: "dense",
                                        id: "description_service",
                                        label: "Description du service",
                                        type: "text",
                                        fullWidth: true,
                                        variant: "standard",
                                        value: description,
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
                                        Button,
                                        { onClick: handleSubmit },
                                        "Update"
                                )
                        )
                )
        );
}

var columns = [{
        id: 'name',
        label: 'Nom',
        format: function format(value) {
                return React.createElement(Name_component, { value: value });
        },
        minWidth: 50
}, {
        id: 'description',
        label: 'Description',
        format: function format(value) {
                return React.createElement(Description_component, { value: value });
        },
        minWidth: 250
}];

function Services(_ref3) {
        var rows = _ref3.rows;

        var _useState5 = useState(0),
            _useState6 = _slicedToArray(_useState5, 2),
            page = _useState6[0],
            setPage = _useState6[1];

        var _useState7 = useState(10),
            _useState8 = _slicedToArray(_useState7, 2),
            rowsPerPage = _useState8[0],
            setRowsPerPage = _useState8[1];

        var handleChangePage = function handleChangePage(event, newPage) {
                setPage(newPage);
        };

        var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
                setRowsPerPage(+event.target.value);
                setPage(0);
        };

        return React.createElement(
                Paper,
                { sx: { width: '100%', height: "85%", overflow: 'hidden' }, elevation: 0, variant: "outlined" },
                React.createElement(
                        TableContainer,
                        { sx: { maxHeight: 440 } },
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

                                                                if (column.id === "name") value = { name: row[column.id], id: row.id };else if (column.id === "description") value = { description: row[column.id], id: row.id };else value = row[column.id];

                                                                return React.createElement(
                                                                        TableCell,
                                                                        { key: column.id, align: column.align },
                                                                        column.format ? column.format(value) : value
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

export default function Service_admin_section(_ref4) {
        var services = _ref4.services;

        var _useState9 = useState(0),
            _useState10 = _slicedToArray(_useState9, 2),
            value = _useState10[0],
            setValue = _useState10[1];

        var _useState11 = useState(''),
            _useState12 = _slicedToArray(_useState11, 2),
            name = _useState12[0],
            setName = _useState12[1];

        var _useState13 = useState(false),
            _useState14 = _slicedToArray(_useState13, 2),
            open_dialog = _useState14[0],
            setOpen_dialog = _useState14[1];

        var _useState15 = useState(undefined),
            _useState16 = _slicedToArray(_useState15, 2),
            error = _useState16[0],
            setError = _useState16[1];

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
                        console.log("Creating service", name);
                        setOpen_dialog(false);
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
                        React.createElement(Services, { rows: services })
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
                        Paper,
                        { sx: { position: 'absolute', bottom: 0, left: 0, right: 0 }, elevation: 3 },
                        React.createElement(
                                BottomNavigation,
                                {
                                        showLabels: true,
                                        value: value,
                                        onChange: function onChange(event, newValue) {
                                                setValue(newValue);
                                        }
                                },
                                React.createElement(BottomNavigationAction, { label: "Services", icon: React.createElement(IoBusinessOutline, { size: 30 }) }),
                                React.createElement(BottomNavigationAction, { label: "Requests", icon: React.createElement(ImNotification, { size: 30 }) })
                        )
                ),
                React.createElement(
                        Dialog,
                        { open: open_dialog, onClose: handleClose },
                        React.createElement(
                                DialogTitle,
                                null,
                                "Add service"
                        ),
                        React.createElement(
                                DialogContent,
                                { sx: { minWidth: 350 } },
                                React.createElement(
                                        DialogContentText,
                                        null,
                                        "Enter le nom du service"
                                ),
                                React.createElement(TextField, {
                                        autoFocus: true,
                                        margin: "dense",
                                        id: "name_service",
                                        label: "Nom du service",
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
                                        Button,
                                        { onClick: handleSubmit },
                                        "Add"
                                )
                        )
                )
        );
}