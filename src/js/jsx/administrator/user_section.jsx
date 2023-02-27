/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {http} from "../auth/login";
import Warning_component from "./warning_component";

import {
        BottomNavigation,
        BottomNavigationAction,
        Box, Button, Checkbox,
        Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
        InputLabel, ListItemText, MenuItem, OutlinedInput,
        Popover, Select,
        TableHead,
        TablePagination, TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";

import {FaUsers} from "react-icons/fa"
import {AiOutlineUserSwitch} from "react-icons/ai"
import {TiUserAdd, TiUserDelete} from "react-icons/ti"

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
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";

import {CgAirplane} from "react-icons/cg"








const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
        PaperProps: {
                style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                },
        },
};
export function Services_component({value, is_user})
{
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [selectedServices, setSelectedServices] = useState( value.services.map(service => service.name) );
        const [open_confirmation, setOpen_confirmation] = useState(false);

        const handleChange = (event) => {
                const {
                        target: { value },
                } = event;
                setSelectedServices(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
                );
        };

        const handleClickOpen = () =>
        {
                setOpen(true);
        };

        const handleClose = (event, reason) => {
                if (reason !== 'backdropClick')
                {
                        setOpen(false);
                }
        };

        const handleSubmit = (event, reason) =>
        {
                if (reason !== 'backdropClick')
                {
                        setOpen_confirmation(false)
                        if (is_user)
                        {
                                console.log("Update services", selectedServices, value.id)
                                setLoading(true)

                                const queryBody = new FormData();

                                queryBody.append('id', value.id.toString())
                                queryBody.append('update_object', "services")
                                queryBody.append("new_value", JSON.stringify(selectedServices))

                                http.post("admin_update_user", queryBody)
                                .then(
                                res =>
                                {
                                        console.log(res)

                                        if (res.data.statue === "success")
                                        {
                                                window.reload()
                                                window.show_response("Mise á jour reussie !", "success")
                                        }
                                        else
                                        {
                                                window.show_response(res.data.data.msg, res.data.statue)
                                        }
                                        setLoading(false)
                                }
                                )
                                .catch(
                                err =>
                                {
                                        console.log(err)

                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                        setLoading(false)
                                }
                                )
                        }
                        else
                        {
                                console.log("Update services", selectedServices, value.id)
                                setLoading(true)

                                const queryBody = new FormData();

                                queryBody.append('id', value.id.toString())
                                queryBody.append('update_object', "services")
                                queryBody.append("new_value", JSON.stringify(selectedServices))

                                http.post("admin_update_section", queryBody)
                                .then(
                                res =>
                                {
                                        console.log(res)

                                        if (res.data.statue === "success")
                                        {
                                                window.reload()
                                                window.show_response("Mise á jour reussie !", "success")
                                        }
                                        else
                                        {
                                                window.show_response(res.data.data.msg, res.data.statue)
                                        }
                                        setLoading(false)
                                }
                                )
                                .catch(
                                err =>
                                {
                                        console.log(err)

                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                        setLoading(false)
                                }
                                )
                        }
                }
        };


        const warning_infos = is_user ?
        [
                "Si l'utilisateur est détaché d'un service ou il a validé des fichiers, ces derniers seront automatiquement dévalidés; Il est préférable de faire une transmission de rôles d'abord;",
                "L'utilisateur sera detaché des audits auxquels il a participé;",
                "S'il est responsable d'un audit, la mise á jour n'aboutira pas, il faudra faire une transmission de role au préalable 1"
        ] :
        [
                "Les Audits, Dossier, ... seront détachés de tous services dont la section sera detachée;",
                "Au cas ou ils se retrouvent détachés de tous les services, ils seront automatiquement ratachés aux nouveaux services de la section"
        ]

        const services_names = value.services.reduce((acc, service) => acc ? `${acc}, ${service.name}` : service.name, "")

        return(
                <Box>
                        <Button variant="outlined" color="secondary" onClick={handleClickOpen} >
                                <div style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 70, overflow: "hidden" }} title={services_names} >
                                        {services_names === '' ? "___" : services_names}
                                </div>
                        </Button>
                        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Update services</DialogTitle>
                                <DialogContent>
                                        <Box
                                        sx={{
                                                minWidth: 250,
                                                paddingTop: 1
                                        }}
                                        >
                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                        <InputLabel id="demo-multiple-checkbox-label">Services</InputLabel>
                                                        <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"
                                                        multiple
                                                        value={selectedServices}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput label="Services" />}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={MenuProps}
                                                        >
                                                                {
                                                                        window.datas.services
                                                                        .map(
                                                                        (service) => (
                                                                                <MenuItem key={service.name} value={service.name}>
                                                                                        <Checkbox checked={selectedServices.indexOf(service.name) > -1} />
                                                                                        <ListItemText primary={service.name} />
                                                                                </MenuItem>
                                                                        ))
                                                                }
                                                        </Select>
                                                </FormControl>
                                        </Box>
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <LoadingButton loading={loading} onClick={e => setOpen_confirmation(true)}>Ok</LoadingButton>
                                </DialogActions>
                        </Dialog>
                        <Warning_component open={open_confirmation} onConfirm={handleSubmit} onCancel={e => {setOpen_confirmation(false); handleClose()} } warning_infos={warning_infos} />
                </Box>
        )
}
const nextLvl = currentLvl =>
{
        switch ( parseInt(currentLvl) ) {
                case 1:
                        return 2
                case 2:
                        return 0
                default:
                        return 1
        }
}
function Right_component({value})
{

        const handleClick = e =>
        {
                toast("Updating...",
                {
                        type: "loading",
                        id: `right_${value.id}`,
                        duration: Infinity
                }
                )

                if ( parseInt(value.right_lvl) === 2 )
                {
                        swal({
                                title: "Etes vous sûr ?",
                                text: "L'utilisateur a un niveau 2 de droit d'accès, il pourrait avoir validé des fichiers, ces derniers seront automatiquement dévalidés; Il est préférable de faire une transmission de rôles d'abord !!!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                        })
                        .then(
                                will_continue =>
                                {
                                        if (will_continue)
                                        {
                                                console.log("change right level danger", nextLvl(value.right_lvl), value.id)

                                                const queryBody = new FormData();

                                                queryBody.append('id', value.id.toString())
                                                queryBody.append('update_object', "right_lvl")
                                                queryBody.append("new_value", nextLvl(value.right_lvl))

                                                http.post("admin_update_user", queryBody)
                                                .then(
                                                        res =>
                                                        {
                                                                console.log(res)

                                                                toast.dismiss(`right_${value.id}`)
                                                                if (res.data.statue === "success")
                                                                {
                                                                        window.reload()
                                                                        window.show_response("Mise á jour reussie !", "success")
                                                                }
                                                                else
                                                                {
                                                                        window.show_response(res.data.data.msg, res.data.statue)
                                                                }
                                                        }
                                                )
                                                .catch(
                                                        err =>
                                                        {
                                                                console.log(err)

                                                                toast.dismiss(`right_${value.id}`)
                                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                        }
                                                )
                                        }
                                        else toast.dismiss(`right_${value.id}`)
                                }
                        )
                }
                else
                {
                        console.log("change right level", nextLvl(value.right_lvl), value.id)

                        const queryBody = new FormData();

                        queryBody.append('id', value.id.toString())
                        queryBody.append('update_object', "right_lvl")
                        queryBody.append("new_value", nextLvl(value.right_lvl))

                        http.post("admin_update_user", queryBody)
                        .then(
                                res =>
                                {
                                        console.log(res)

                                        if (res.data.statue === "success")
                                        {
                                                window.reload()
                                                window.show_response("Mise á jour reussie !", "success")
                                        }
                                        else
                                        {
                                                window.show_response(res.data.data.msg, res.data.statue)
                                                toast.dismiss(`right_${value.id}`)
                                        }
                                }
                        )
                        .catch(
                                err =>
                                {
                                        console.log(err)

                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                        toast.dismiss(`right_${value.id}`)
                                }
                        )

                }
        }

        let color
        switch (parseInt(value.right_lvl))
        {
                case 1:
                        color = "primary"
                        break
                case 2:
                        color = "success"
                        break
                default:
                        color = "default"
        }

        return(
                <Chip label={value.right_lvl} onClick={handleClick} color={color} />
        )
}
function Name_component({value})
{
        const [loading, setLoading] = useState(false);
        const [open_confirmation, setOpen_confirmation] = useState(false);

        const handleDelete = e =>
        {
                console.log("suppress user", value.id)
                setLoading( true )
                setOpen_confirmation(false)

                http.delete(`delete_user?id=${value.id}`)
                .then(
                res => {
                        console.log(res);
                        window.reload();
                        if(res.data.statue === 'success') window.show_response(`Utilisateur supprimé avec succès !`, "success")
                        else window.show_response(res.data.data.msg, res.data.statue)
                        setLoading( false )
                }
                )
                .catch(err =>
                {
                        console.log(err);
                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                        setLoading( false )
                })
        }

        return(
                <React.Fragment>
                        <Chip
                                avatar={<Avatar>{value.name[0]}</Avatar>}
                                label={value.name}
                                variant="outlined"
                                onDelete={ e => setOpen_confirmation(true) }
                                deleteIcon={
                                        <LoadingButton as={IconButton} loading={loading} color="error" >
                                                {
                                                        loading ? null : <TiUserDelete size={20} color={"red"} />
                                                }
                                        </LoadingButton>
                                }
                        />
                        <Warning_component open={open_confirmation} onConfirm={handleDelete} onCancel={e => setOpen_confirmation(false)} warning_infos={[ "Tout Audit, Dossir, Fichier ... que l'utilisateur a validé sera dévalidé !" ]} />
                </React.Fragment>
        )
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}
function Switch_user_component({user_id})
{

        const [open, setOpen] = React.useState(false);
        const [to_id, setTo_id] = useState('');
        const [error_msg, setError] = useState();
        const [echange, setEchange] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleChange = (event) => {
                setTo_id(event.target.value);
                setError(undefined)
        };

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = (event, reason) => {
                if (reason !== 'backdropClick') {
                        setOpen(false);
                }
        };
        const handleSubmit = (event, reason) => {
                if (reason !== 'backdropClick')
                {
                        if (to_id === '') setError("selectionner un utilisateur")
                        else
                        {
                                console.log("Switching roles", user_id.id, to_id, echange)
                                setLoading(true)

                                const queryBody = new FormData();

                                queryBody.append('from_id', user_id.id.toString())
                                queryBody.append('to_id', to_id.toString())
                                queryBody.append("exchange", echange ? '1' : '0')

                                console.log("Switching roles queryBody", queryBody.get("exchange"))

                                http.post("role_exchange", queryBody)
                                .then(
                                res =>
                                {
                                        console.log(res)

                                        if (res.data.statue === "success")
                                        {
                                                window.reload()
                                                window.show_response(`${ echange ? 'Echange'  : 'Transmission' } de role reussie !`, "success")
                                        }
                                        else
                                        {
                                                window.show_response(res.data.data.msg, res.data.statue)
                                        }
                                        setLoading(false)
                                }
                                )
                                .catch(
                                err =>
                                {
                                        console.log(err)

                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                        setLoading(false)
                                }
                                )
                        }
                }
        };


        return (
        <div>
                <IconButton  color="error" onClick={handleClickOpen}>
                        <AiOutlineUserSwitch size={20} color={"red"} />
                </IconButton>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>{ echange ? 'Echange' : 'Transmission' } de role</DialogTitle>
                        <DialogContent>
                                <Box
                                sx={{
                                        minWidth: 250,
                                        paddingTop: 1
                                }}
                                >
                                        <FormControl fullWidth error={Boolean(error_msg)} aria-errormessage={error_msg} >
                                                <InputLabel id="demo-simple-select-label">Nouveau utilisateur</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={to_id}
                                                label="Nouveau utilisateur"
                                                onChange={handleChange}
                                                >
                                                        {
                                                                window.datas.users
                                                                .filter(user => user.id !== user_id.id)
                                                                .map(
                                                                user => <MenuItem key={user.id} value={user.id}>{`${user.name} ${user.second_name}`}</MenuItem>
                                                                )
                                                        }
                                                </Select>
                                        </FormControl>

                                        <Box className="mt-2">
                                                <FormControlLabel control={<Checkbox checked={ echange } onChange={e => setEchange( !echange )} />} label="Echange" />
                                        </Box>
                                </Box>
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <LoadingButton loading={loading} onClick={handleSubmit}>Ok</LoadingButton>
                        </DialogActions>
                </Dialog>
        </div>
        );
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}


const columns = [
        { id: 'inspector_number', label: 'Numéro\u00a0Ins.', minWidth: 80 },
        {
                id: 'name',
                label: 'Nom',
                align: 'right',
                format: (value) => <Name_component value={value} />,
                minWidth: 170
        },
        { id: 'second_name', label: 'Prénom', minWidth: 150 },
        { id: 'email', label: 'Email', minWidth: 170 },
        {
                id: 'right_lvl',
                label: 'Niveau\u00a0de\u00a0droit',
                align: 'right',
                format: (value) => <Right_component value={value} />,
        },
        {
                id: 'services',
                label: 'Services',
                align: 'right',
                format: (value) => <Services_component value={value} is_user={true} />,
        },
        {
                id: 'id',
                label: 'Roles\u00a0transmission',
                minWidth: 70,
                align: 'right',
                format: (id) => <Switch_user_component user_id={id} />,
        },
];

function Users({rows})
{
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (event, newPage) => {
                setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
                setRowsPerPage(+event.target.value);
                setPage(0);
        };


        return(
        <Paper className="d-flex flex-column" sx={{ width: '100%', height: "85%", overflow: 'hidden' }} elevation={0} variant="outlined" >
                <TableContainer sx={{ maxHeight: "100%" }}>
                        <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                        <TableRow>
                                                {
                                                        columns.map(
                                                                column =>
                                                                (
                                                                        <TableCell
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        style={{ minWidth: column.minWidth }}
                                                                        >
                                                                                {column.label}
                                                                        </TableCell>
                                                                )
                                                        )
                                                }
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                        {
                                                rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(
                                                (row) => {
                                                        return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                {
                                                                        columns.map(
                                                                                column =>
                                                                                {
                                                                                        let value

                                                                                        value = {id: row.id};
                                                                                        value[column.id] = row[column.id]

                                                                                        return (
                                                                                        <TableCell key={column.id} align={column.align}>
                                                                                                {
                                                                                                        column.format
                                                                                                        ? column.format(value)
                                                                                                        : row[column.id]
                                                                                                }
                                                                                        </TableCell>
                                                                                        );
                                                                                }
                                                                        )
                                                                }
                                                        </TableRow>
                                                        );
                                                })
                                        }
                                </TableBody>
                        </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
        )
}


export default function User_admin_section({users, new_users})
{

        const [value, setValue] = useState(0);


        return(
        <div className="full_size_element"
             style={{
                     position: "relative",
                     backgroundColor: "white",
                     borderRadius: 10,
             }}
        >
                <div className="full_size_element p-3" >
                        <Users rows={value ? new_users : users} />
                </div>
                <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                                setValue(newValue);
                        }}
                        >

                                <BottomNavigationAction label="Users" icon={<FaUsers size={30} />} />
                                <BottomNavigationAction label="New Users"
                                        icon={
                                                <Badge color="primary" variant="dot" invisible={!new_users.length}>
                                                        <TiUserAdd size={30} />
                                                </Badge>
                                        }
                                />
                        </BottomNavigation>
                </Paper>
        </div>
        )
}