var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { MdDeleteSweep } from "react-icons/md";
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
import { LoadingButton } from "@mui/lab";
import { http } from "../auth/login";
import toast from "react-hot-toast";
import Warning_component from "./warning_component";

export function Name_component(_ref) {
        var value = _ref.value,
            is_service = _ref.is_service;

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            loading = _useState2[0],
            setLoading = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            open_confirmation = _useState4[0],
            setOpen_confirmation = _useState4[1];

        var handleDelete = function handleDelete(e) {
                console.log("suppress services", value.id);
                setLoading(true);
                setOpen_confirmation(false);

                http.delete((is_service ? "delete_service" : "delete_section") + "?id=" + value.id).then(function (res) {
                        console.log(res);

                        if (res.data.statue === 'success') {
                                window.reload();
                                window.show_response((is_service ? "Service" : "Section") + " supprim\xE9 !", "success");
                        } else window.show_response(res.data.data.msg, res.data.statue);

                        setLoading(false);
                }).catch(function (err) {
                        console.log(err);

                        window.show_response(err.message + " " + err.response.data.message, "error");
                        setLoading(false);
                });
        };

        var warning_infos = is_service ? ["Les Audits, Dossier, ... et utilisateurs seront détachés du service;", "Au cas ou ils se retrouvent n'appartenant à aucun autre service, ils seront automatiquent supprimés;", "S'il s'avèrent qu'un utilisateur est validateur d'un fichier ou responsabe d'un audit qui est lié à un autre service, la suppression n'aboutira pas !!"] : ["Tout ce que contient la section sera supprimé, la suppression est irréversible !!"];

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(Chip, {
                        label: value.name,
                        variant: "outlined",
                        onDelete: function onDelete(e) {
                                return setOpen_confirmation(true);
                        },
                        deleteIcon: React.createElement(
                                LoadingButton,
                                { as: IconButton, loading: loading, color: "error" },
                                loading ? '' : React.createElement(MdDeleteSweep, { color: "red", size: 20 })
                        )
                }),
                React.createElement(Warning_component, { open: open_confirmation, onConfirm: handleDelete, onCancel: function onCancel(e) {
                                return setOpen_confirmation(false);
                        }, warning_infos: warning_infos })
        );
}

export function Description_component(_ref2) {
        var value = _ref2.value,
            is_service = _ref2.is_service;

        var _useState5 = useState(value.description),
            _useState6 = _slicedToArray(_useState5, 2),
            description = _useState6[0],
            setDescription = _useState6[1];

        var _useState7 = useState(false),
            _useState8 = _slicedToArray(_useState7, 2),
            open_dialog = _useState8[0],
            setOpen_dialog = _useState8[1];

        var _useState9 = useState(false),
            _useState10 = _slicedToArray(_useState9, 2),
            loading = _useState10[0],
            setLoading = _useState10[1];

        var handleChange = function handleChange(e) {
                var typed_value = e.target.value;
                // console.log(typed_value)

                setDescription(typed_value);
        };

        var handleClose = function handleClose() {
                setOpen_dialog(false);
        };

        var handleSubmit = function handleSubmit() {

                console.log("Updating description", description, value.id);

                setLoading(true);

                var queryData = new FormData();
                queryData.append("id", value.id);
                queryData.append("description", description === '' ? "Aucune description apportée" : description);

                http.post(is_service ? "describe_service" : "describe_section", queryData).then(function (res) {
                        console.log(res);

                        if (res.data.statue === 'success') {
                                window.reload();
                                window.show_response("Service mise á jour !", "success");

                                setOpen_dialog(false);
                        } else window.show_response(res.data.data.msg, res.data.statue);

                        setLoading(false);
                }).catch(function (err) {
                        console.log(err);

                        window.show_response(err.message + " " + err.response.data.message, "error");
                        setLoading(false);
                });
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
                        value.description
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
                                        onFocus: function onFocus(e) {
                                                e.target.select();
                                        },
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
                                        LoadingButton,
                                        { loading: loading, onClick: handleSubmit },
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
                return React.createElement(Name_component, { value: value, is_service: true });
        },
        minWidth: 50
}, {
        id: 'description',
        label: 'Description',
        format: function format(value) {
                return React.createElement(Description_component, { value: value, is_service: true });
        },
        minWidth: 250
}];

function Services(_ref3) {
        var rows = _ref3.rows;

        var _useState11 = useState(0),
            _useState12 = _slicedToArray(_useState11, 2),
            page = _useState12[0],
            setPage = _useState12[1];

        var _useState13 = useState(10),
            _useState14 = _slicedToArray(_useState13, 2),
            rowsPerPage = _useState14[0],
            setRowsPerPage = _useState14[1];

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

        var _useState15 = useState(''),
            _useState16 = _slicedToArray(_useState15, 2),
            name = _useState16[0],
            setName = _useState16[1];

        var _useState17 = useState(false),
            _useState18 = _slicedToArray(_useState17, 2),
            open_dialog = _useState18[0],
            setOpen_dialog = _useState18[1];

        var _useState19 = useState(false),
            _useState20 = _slicedToArray(_useState19, 2),
            loading = _useState20[0],
            setLoading = _useState20[1];

        var _useState21 = useState(undefined),
            _useState22 = _slicedToArray(_useState21, 2),
            error = _useState22[0],
            setError = _useState22[1];

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
                        setLoading(true);

                        var queryData = new FormData();
                        queryData.append("name", name);

                        http.post("create_service", queryData).then(function (res) {
                                console.log(res);

                                if (res.data.statue === 'success') {
                                        window.reload();
                                        window.show_response("Service créé !", "success");

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
                                        LoadingButton,
                                        { loading: loading, onClick: handleSubmit },
                                        "Add"
                                )
                        )
                )
        );
}