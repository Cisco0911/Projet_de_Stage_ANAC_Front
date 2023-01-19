var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Popover, Select, TableHead, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";

import { FaUsers } from "react-icons/fa";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";

import Badge from "@mui/material/Badge";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import swal from "sweetalert";
import { LoadingButton } from "@mui/lab";

var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
        PaperProps: {
                style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250
                }
        }
};
function Services_component(_ref) {
        var services = _ref.services;

        var _React$useState = React.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            open = _React$useState2[0],
            setOpen = _React$useState2[1];

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            loading = _useState2[0],
            setLoading = _useState2[1];

        var _useState3 = useState(services.map(function (service) {
                return service.name;
        })),
            _useState4 = _slicedToArray(_useState3, 2),
            selectedServices = _useState4[0],
            setSelectedServices = _useState4[1];

        var handleChange = function handleChange(event) {
                var value = event.target.value;

                setSelectedServices(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value);
        };

        var handleClickOpen = function handleClickOpen() {
                setOpen(true);
        };

        var handleClose = function handleClose(event, reason) {
                if (reason !== 'backdropClick') {
                        setOpen(false);
                }
        };

        var handleSubmit = function handleSubmit(event, reason) {
                if (reason !== 'backdropClick') {
                        console.log("Update services", selectedServices);
                        setLoading(true);
                        // setOpen(false);
                }
        };

        var services_names = services.reduce(function (acc, services) {
                return acc ? acc + ", " + services.name : services.name;
        }, "");

        return React.createElement(
                Box,
                null,
                React.createElement(
                        Button,
                        { variant: "outlined", color: "secondary", onClick: handleClickOpen },
                        React.createElement(
                                "div",
                                { style: { textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 70, overflow: "hidden" }, title: services_names },
                                services_names === '' ? "___" : services_names
                        )
                ),
                React.createElement(
                        Dialog,
                        { disableEscapeKeyDown: true, open: open, onClose: handleClose },
                        React.createElement(
                                DialogTitle,
                                null,
                                "Update services"
                        ),
                        React.createElement(
                                DialogContent,
                                null,
                                React.createElement(
                                        Box,
                                        {
                                                sx: {
                                                        minWidth: 250,
                                                        paddingTop: 1
                                                }
                                        },
                                        React.createElement(
                                                FormControl,
                                                { sx: { m: 1, width: 300 } },
                                                React.createElement(
                                                        InputLabel,
                                                        { id: "demo-multiple-checkbox-label" },
                                                        "Services"
                                                ),
                                                React.createElement(
                                                        Select,
                                                        {
                                                                labelId: "demo-multiple-checkbox-label",
                                                                id: "demo-multiple-checkbox",
                                                                multiple: true,
                                                                value: selectedServices,
                                                                onChange: handleChange,
                                                                input: React.createElement(OutlinedInput, { label: "Services" }),
                                                                renderValue: function renderValue(selected) {
                                                                        return selected.join(', ');
                                                                },
                                                                MenuProps: MenuProps
                                                        },
                                                        window.datas.services.map(function (service) {
                                                                return React.createElement(
                                                                        MenuItem,
                                                                        { key: service.name, value: service.name },
                                                                        React.createElement(Checkbox, { checked: selectedServices.indexOf(service.name) > -1 }),
                                                                        React.createElement(ListItemText, { primary: service.name })
                                                                );
                                                        })
                                                )
                                        )
                                )
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
                                        "Ok"
                                )
                        )
                )
        );
}
var nextLvl = function nextLvl(currentLvl) {
        switch (parseInt(currentLvl)) {
                case 1:
                        return 2;
                case 2:
                        return 0;
                default:
                        return 1;
        }
};
function Right_component(_ref2) {
        var value = _ref2.value;


        var handleClick = function handleClick(e) {
                if (parseInt(value) === 2) {
                        swal({
                                title: "Etes vous sûr ?",
                                text: "L'utilisateur a un niveau 2 de droit d'accès, il pourrait avoir validé des fichiers, ces derniers seront automatiquement dévalidés; Il est préférable de faire une transmission de rôles d'abord !!!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true
                        }).then(function (will_continue) {
                                if (will_continue) {
                                        console.log("change right level", nextLvl(value));
                                }
                        });
                } else {
                        console.log("change right level", nextLvl(value));
                }
        };

        var color = void 0;
        switch (parseInt(value)) {
                case 1:
                        color = "primary";
                        break;
                case 2:
                        color = "success";
                        break;
                default:
                        color = "default";
        }

        return React.createElement(Chip, { label: value, onClick: handleClick, color: color });
}
function Name_component(_ref3) {
        var value = _ref3.value;


        var handleDelete = function handleDelete(e) {
                console.log("suppress user", value.id);
        };

        return React.createElement(Chip, {
                avatar: React.createElement(
                        Avatar,
                        null,
                        value.name[0]
                ),
                label: value.name,
                variant: "outlined",
                onDelete: handleDelete,
                deleteIcon: React.createElement(
                        IconButton,
                        { color: "error" },
                        React.createElement(TiUserDelete, { size: 20, color: "red" })
                )
        });
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}
function Switch_user_component(_ref4) {
        var user_id = _ref4.user_id;

        var _React$useState3 = React.useState(false),
            _React$useState4 = _slicedToArray(_React$useState3, 2),
            open = _React$useState4[0],
            setOpen = _React$useState4[1];

        var _useState5 = useState(''),
            _useState6 = _slicedToArray(_useState5, 2),
            new_user = _useState6[0],
            setNew_user = _useState6[1];

        var _useState7 = useState(),
            _useState8 = _slicedToArray(_useState7, 2),
            error_msg = _useState8[0],
            setError = _useState8[1];

        var _useState9 = useState(0),
            _useState10 = _slicedToArray(_useState9, 2),
            echange = _useState10[0],
            setEchange = _useState10[1];

        var handleChange = function handleChange(event) {
                setNew_user(event.target.value);
                setError(undefined);
        };

        var handleClickOpen = function handleClickOpen() {
                setOpen(true);
        };

        var handleClose = function handleClose(event, reason) {
                if (reason !== 'backdropClick') {
                        setOpen(false);
                }
        };
        var handleSubmit = function handleSubmit(event, reason) {
                if (reason !== 'backdropClick') {
                        if (new_user === '') setError("selectionner un utilisateur");else {
                                console.log("Switching roles", user_id, new_user, echange);
                                setOpen(false);
                        }
                }
        };

        return React.createElement(
                "div",
                null,
                React.createElement(
                        IconButton,
                        { color: "error", onClick: handleClickOpen },
                        React.createElement(AiOutlineUserSwitch, { size: 20, color: "red" })
                ),
                React.createElement(
                        Dialog,
                        { disableEscapeKeyDown: true, open: open, onClose: handleClose },
                        React.createElement(
                                DialogTitle,
                                null,
                                echange ? 'Echange' : 'Transmission',
                                " de role"
                        ),
                        React.createElement(
                                DialogContent,
                                null,
                                React.createElement(
                                        Box,
                                        {
                                                sx: {
                                                        minWidth: 250,
                                                        paddingTop: 1
                                                }
                                        },
                                        React.createElement(
                                                FormControl,
                                                { fullWidth: true, error: Boolean(error_msg), "aria-errormessage": error_msg },
                                                React.createElement(
                                                        InputLabel,
                                                        { id: "demo-simple-select-label" },
                                                        "Nouveau utilisateur"
                                                ),
                                                React.createElement(
                                                        Select,
                                                        {
                                                                labelId: "demo-simple-select-label",
                                                                id: "demo-simple-select",
                                                                value: new_user,
                                                                label: "Nouveau utilisateur",
                                                                onChange: handleChange
                                                        },
                                                        window.datas.users.filter(function (user) {
                                                                return user.id !== user_id;
                                                        }).map(function (user) {
                                                                return React.createElement(
                                                                        MenuItem,
                                                                        { key: user.id, value: user.id },
                                                                        user.name + " " + user.second_name
                                                                );
                                                        })
                                                )
                                        ),
                                        React.createElement(
                                                Box,
                                                { className: "mt-2" },
                                                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: Boolean(echange), onChange: function onChange(e) {
                                                                        return setEchange(echange ? 0 : 1);
                                                                } }), label: "Echange" })
                                        )
                                )
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
                                        "Ok"
                                )
                        )
                )
        );
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}

var columns = [{ id: 'inspector_number', label: "Num\xE9ro\xA0Ins.", minWidth: 80 }, {
        id: 'name',
        label: 'Nom',
        align: 'right',
        format: function format(value) {
                return React.createElement(Name_component, { value: value });
        },
        minWidth: 170
}, { id: 'second_name', label: 'Prénom', minWidth: 150 }, { id: 'email', label: 'Email', minWidth: 170 }, {
        id: 'right_lvl',
        label: "Niveau\xA0de\xA0droit",
        align: 'right',
        format: function format(value) {
                return React.createElement(Right_component, { value: value });
        }
}, {
        id: 'services',
        label: 'Services',
        align: 'right',
        format: function format(services) {
                return React.createElement(Services_component, { services: services });
        }
}, {
        id: 'id',
        label: "Roles\xA0transmission",
        minWidth: 70,
        align: 'right',
        format: function format(id) {
                return React.createElement(Switch_user_component, { user_id: id });
        }
}];

function Users(_ref5) {
        var rows = _ref5.rows;

        var _React$useState5 = React.useState(0),
            _React$useState6 = _slicedToArray(_React$useState5, 2),
            page = _React$useState6[0],
            setPage = _React$useState6[1];

        var _React$useState7 = React.useState(10),
            _React$useState8 = _slicedToArray(_React$useState7, 2),
            rowsPerPage = _React$useState8[0],
            setRowsPerPage = _React$useState8[1];

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

                                                                if (column.id === "name") value = { name: row[column.id], id: row.id };else value = row[column.id];

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

export default function User_admin_section(_ref6) {
        var users = _ref6.users,
            new_users = _ref6.new_users;

        var _useState11 = useState(0),
            _useState12 = _slicedToArray(_useState11, 2),
            value = _useState12[0],
            setValue = _useState12[1];

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
                        React.createElement(Users, { rows: value ? new_users : users })
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
                                React.createElement(BottomNavigationAction, { label: "Users", icon: React.createElement(FaUsers, { size: 30 }) }),
                                React.createElement(BottomNavigationAction, { label: "New Users",
                                        icon: React.createElement(
                                                Badge,
                                                { color: "primary", variant: "dot", invisible: !new_users.length },
                                                React.createElement(TiUserAdd, { size: 30 })
                                        )
                                })
                        )
                )
        );
}