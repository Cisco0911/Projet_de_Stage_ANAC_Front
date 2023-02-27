var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { http } from "../auth/login";
import Warning_component from "./warning_component";

import { BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Popover, Select, TableHead, TablePagination, TextField } from "@mui/material";
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

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';

import swal from "sweetalert";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

import { CgAirplane } from "react-icons/cg";

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
export function Services_component(_ref) {
        var value = _ref.value,
            is_user = _ref.is_user;

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            open = _useState2[0],
            setOpen = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            loading = _useState4[0],
            setLoading = _useState4[1];

        var _useState5 = useState(value.services.map(function (service) {
                return service.name;
        })),
            _useState6 = _slicedToArray(_useState5, 2),
            selectedServices = _useState6[0],
            setSelectedServices = _useState6[1];

        var _useState7 = useState(false),
            _useState8 = _slicedToArray(_useState7, 2),
            open_confirmation = _useState8[0],
            setOpen_confirmation = _useState8[1];

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
                        setOpen_confirmation(false);
                        if (is_user) {
                                console.log("Update services", selectedServices, value.id);
                                setLoading(true);

                                var queryBody = new FormData();

                                queryBody.append('id', value.id.toString());
                                queryBody.append('update_object', "services");
                                queryBody.append("new_value", JSON.stringify(selectedServices));

                                http.post("admin_update_user", queryBody).then(function (res) {
                                        console.log(res);

                                        if (res.data.statue === "success") {
                                                window.reload();
                                                window.show_response("Mise á jour reussie !", "success");
                                        } else {
                                                window.show_response(res.data.data.msg, res.data.statue);
                                        }
                                        setLoading(false);
                                }).catch(function (err) {
                                        console.log(err);

                                        window.show_response(err.message + " " + err.response.data.message, "error");
                                        setLoading(false);
                                });
                        } else {
                                console.log("Update services", selectedServices, value.id);
                                setLoading(true);

                                var _queryBody = new FormData();

                                _queryBody.append('id', value.id.toString());
                                _queryBody.append('update_object', "services");
                                _queryBody.append("new_value", JSON.stringify(selectedServices));

                                http.post("admin_update_section", _queryBody).then(function (res) {
                                        console.log(res);

                                        if (res.data.statue === "success") {
                                                window.reload();
                                                window.show_response("Mise á jour reussie !", "success");
                                        } else {
                                                window.show_response(res.data.data.msg, res.data.statue);
                                        }
                                        setLoading(false);
                                }).catch(function (err) {
                                        console.log(err);

                                        window.show_response(err.message + " " + err.response.data.message, "error");
                                        setLoading(false);
                                });
                        }
                }
        };

        var warning_infos = is_user ? ["Si l'utilisateur est détaché d'un service ou il a validé des fichiers, ces derniers seront automatiquement dévalidés; Il est préférable de faire une transmission de rôles d'abord;", "L'utilisateur sera detaché des audits auxquels il a participé;", "S'il est responsable d'un audit, la mise á jour n'aboutira pas, il faudra faire une transmission de role au préalable 1"] : ["Les Audits, Dossier, ... seront détachés de tous services dont la section sera detachée;", "Au cas ou ils se retrouvent détachés de tous les services, ils seront automatiquement ratachés aux nouveaux services de la section"];

        var services_names = value.services.reduce(function (acc, service) {
                return acc ? acc + ", " + service.name : service.name;
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
                                        { loading: loading, onClick: function onClick(e) {
                                                        return setOpen_confirmation(true);
                                                } },
                                        "Ok"
                                )
                        )
                ),
                React.createElement(Warning_component, { open: open_confirmation, onConfirm: handleSubmit, onCancel: function onCancel(e) {
                                setOpen_confirmation(false);handleClose();
                        }, warning_infos: warning_infos })
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
                toast("Updating...", {
                        type: "loading",
                        id: "right_" + value.id,
                        duration: Infinity
                });

                if (parseInt(value.right_lvl) === 2) {
                        swal({
                                title: "Etes vous sûr ?",
                                text: "L'utilisateur a un niveau 2 de droit d'accès, il pourrait avoir validé des fichiers, ces derniers seront automatiquement dévalidés; Il est préférable de faire une transmission de rôles d'abord !!!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true
                        }).then(function (will_continue) {
                                if (will_continue) {
                                        console.log("change right level danger", nextLvl(value.right_lvl), value.id);

                                        var queryBody = new FormData();

                                        queryBody.append('id', value.id.toString());
                                        queryBody.append('update_object', "right_lvl");
                                        queryBody.append("new_value", nextLvl(value.right_lvl));

                                        http.post("admin_update_user", queryBody).then(function (res) {
                                                console.log(res);

                                                toast.dismiss("right_" + value.id);
                                                if (res.data.statue === "success") {
                                                        window.reload();
                                                        window.show_response("Mise á jour reussie !", "success");
                                                } else {
                                                        window.show_response(res.data.data.msg, res.data.statue);
                                                }
                                        }).catch(function (err) {
                                                console.log(err);

                                                toast.dismiss("right_" + value.id);
                                                window.show_response(err.message + " " + err.response.data.message, "error");
                                        });
                                } else toast.dismiss("right_" + value.id);
                        });
                } else {
                        console.log("change right level", nextLvl(value.right_lvl), value.id);

                        var queryBody = new FormData();

                        queryBody.append('id', value.id.toString());
                        queryBody.append('update_object', "right_lvl");
                        queryBody.append("new_value", nextLvl(value.right_lvl));

                        http.post("admin_update_user", queryBody).then(function (res) {
                                console.log(res);

                                if (res.data.statue === "success") {
                                        window.reload();
                                        window.show_response("Mise á jour reussie !", "success");
                                } else {
                                        window.show_response(res.data.data.msg, res.data.statue);
                                        toast.dismiss("right_" + value.id);
                                }
                        }).catch(function (err) {
                                console.log(err);

                                window.show_response(err.message + " " + err.response.data.message, "error");
                                toast.dismiss("right_" + value.id);
                        });
                }
        };

        var color = void 0;
        switch (parseInt(value.right_lvl)) {
                case 1:
                        color = "primary";
                        break;
                case 2:
                        color = "success";
                        break;
                default:
                        color = "default";
        }

        return React.createElement(Chip, { label: value.right_lvl, onClick: handleClick, color: color });
}
function Name_component(_ref3) {
        var value = _ref3.value;

        var _useState9 = useState(false),
            _useState10 = _slicedToArray(_useState9, 2),
            loading = _useState10[0],
            setLoading = _useState10[1];

        var _useState11 = useState(false),
            _useState12 = _slicedToArray(_useState11, 2),
            open_confirmation = _useState12[0],
            setOpen_confirmation = _useState12[1];

        var handleDelete = function handleDelete(e) {
                console.log("suppress user", value.id);
                setLoading(true);
                setOpen_confirmation(false);

                http.delete("delete_user?id=" + value.id).then(function (res) {
                        console.log(res);
                        window.reload();
                        if (res.data.statue === 'success') window.show_response("Utilisateur supprim\xE9 avec succ\xE8s !", "success");else window.show_response(res.data.data.msg, res.data.statue);
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
                React.createElement(Chip, {
                        avatar: React.createElement(
                                Avatar,
                                null,
                                value.name[0]
                        ),
                        label: value.name,
                        variant: "outlined",
                        onDelete: function onDelete(e) {
                                return setOpen_confirmation(true);
                        },
                        deleteIcon: React.createElement(
                                LoadingButton,
                                { as: IconButton, loading: loading, color: "error" },
                                loading ? null : React.createElement(TiUserDelete, { size: 20, color: "red" })
                        )
                }),
                React.createElement(Warning_component, { open: open_confirmation, onConfirm: handleDelete, onCancel: function onCancel(e) {
                                return setOpen_confirmation(false);
                        }, warning_infos: ["Tout Audit, Dossir, Fichier ... que l'utilisateur a validé sera dévalidé !"] })
        );
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}
function Switch_user_component(_ref4) {
        var user_id = _ref4.user_id;

        var _React$useState = React.useState(false),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            open = _React$useState2[0],
            setOpen = _React$useState2[1];

        var _useState13 = useState(''),
            _useState14 = _slicedToArray(_useState13, 2),
            to_id = _useState14[0],
            setTo_id = _useState14[1];

        var _useState15 = useState(),
            _useState16 = _slicedToArray(_useState15, 2),
            error_msg = _useState16[0],
            setError = _useState16[1];

        var _useState17 = useState(false),
            _useState18 = _slicedToArray(_useState17, 2),
            echange = _useState18[0],
            setEchange = _useState18[1];

        var _useState19 = useState(false),
            _useState20 = _slicedToArray(_useState19, 2),
            loading = _useState20[0],
            setLoading = _useState20[1];

        var handleChange = function handleChange(event) {
                setTo_id(event.target.value);
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
                        if (to_id === '') setError("selectionner un utilisateur");else {
                                console.log("Switching roles", user_id.id, to_id, echange);
                                setLoading(true);

                                var queryBody = new FormData();

                                queryBody.append('from_id', user_id.id.toString());
                                queryBody.append('to_id', to_id.toString());
                                queryBody.append("exchange", echange ? '1' : '0');

                                console.log("Switching roles queryBody", queryBody.get("exchange"));

                                http.post("role_exchange", queryBody).then(function (res) {
                                        console.log(res);

                                        if (res.data.statue === "success") {
                                                window.reload();
                                                window.show_response((echange ? 'Echange' : 'Transmission') + " de role reussie !", "success");
                                        } else {
                                                window.show_response(res.data.data.msg, res.data.statue);
                                        }
                                        setLoading(false);
                                }).catch(function (err) {
                                        console.log(err);

                                        window.show_response(err.message + " " + err.response.data.message, "error");
                                        setLoading(false);
                                });
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
                                                                value: to_id,
                                                                label: "Nouveau utilisateur",
                                                                onChange: handleChange
                                                        },
                                                        window.datas.users.filter(function (user) {
                                                                return user.id !== user_id.id;
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
                                                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: echange, onChange: function onChange(e) {
                                                                        return setEchange(!echange);
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
                                        LoadingButton,
                                        { loading: loading, onClick: handleSubmit },
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
        format: function format(value) {
                return React.createElement(Services_component, { value: value, is_user: true });
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

        var _useState21 = useState(0),
            _useState22 = _slicedToArray(_useState21, 2),
            page = _useState22[0],
            setPage = _useState22[1];

        var _useState23 = useState(10),
            _useState24 = _slicedToArray(_useState23, 2),
            rowsPerPage = _useState24[0],
            setRowsPerPage = _useState24[1];

        var handleChangePage = function handleChangePage(event, newPage) {
                setPage(newPage);
        };

        var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
                setRowsPerPage(+event.target.value);
                setPage(0);
        };

        return React.createElement(
                Paper,
                { className: "d-flex flex-column", sx: { width: '100%', height: "85%", overflow: 'hidden' }, elevation: 0, variant: "outlined" },
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

export default function User_admin_section(_ref6) {
        var users = _ref6.users,
            new_users = _ref6.new_users;

        var _useState25 = useState(0),
            _useState26 = _slicedToArray(_useState25, 2),
            value = _useState26[0],
            setValue = _useState26[1];

        return React.createElement(
                "div",
                { className: "full_size_element",
                        style: {
                                position: "relative",
                                backgroundColor: "white",
                                borderRadius: 10
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