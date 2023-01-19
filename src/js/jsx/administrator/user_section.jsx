/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {
        BottomNavigation,
        BottomNavigationAction,
        Box, Button, Checkbox,
        Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel,
        InputLabel, ListItemText, MenuItem, OutlinedInput,
        Popover, Select,
        TableHead,
        TablePagination
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

import swal from "sweetalert";
import {LoadingButton} from "@mui/lab";








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
function Services_component({services})
{
        const [open, setOpen] = React.useState(false);
        const [loading, setLoading] = useState(false);
        const [selectedServices, setSelectedServices] = useState( services.map(service => service.name) );

        const handleChange = (event) => {
                const {
                        target: { value },
                } = event;
                setSelectedServices(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
                );
        };

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = (event, reason) => {
                if (reason !== 'backdropClick')
                {
                        setOpen(false);
                }
        };

        const handleSubmit = (event, reason) => {
                if (reason !== 'backdropClick')
                {
                        console.log("Update services", selectedServices)
                        setLoading(true)
                        // setOpen(false);
                }
        };


        const services_names = services.reduce((acc, services) => acc ? `${acc}, ${services.name}` : services.name, "")

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
                                        <LoadingButton loading={loading} onClick={handleSubmit}>Ok</LoadingButton>
                                </DialogActions>
                        </Dialog>
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
                if ( parseInt(value) === 2 )
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
                                                console.log("change right level", nextLvl(value))
                                        }
                                }
                        )
                }
                else
                {
                        console.log("change right level", nextLvl(value))
                }
        }

        let color
        switch (parseInt(value))
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
                <Chip label={value} onClick={handleClick} color={color} />
        )
}
function Name_component({value})
{

        const handleDelete = e =>
        {
                console.log("suppress user", value.id)
        }

        return(
                <Chip
                        avatar={<Avatar>{value.name[0]}</Avatar>}
                        label={value.name}
                        variant="outlined"
                        onDelete={handleDelete}
                        deleteIcon={
                                <IconButton color="error" >
                                        <TiUserDelete size={20} color={"red"} />
                                </IconButton>
                        }
                />
        )
        // <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
}
function Switch_user_component({user_id})
{

        const [open, setOpen] = React.useState(false);
        const [new_user, setNew_user] = useState('');
        const [error_msg, setError] = useState();
        const [echange, setEchange] = useState(0);

        const handleChange = (event) => {
                setNew_user(event.target.value);
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
                        if (new_user === '') setError("selectionner un utilisateur")
                        else
                        {
                                console.log("Switching roles", user_id, new_user, echange)
                                setOpen(false);
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
                                                value={new_user}
                                                label="Nouveau utilisateur"
                                                onChange={handleChange}
                                                >
                                                        {
                                                                window.datas.users
                                                                .filter(user => user.id !== user_id)
                                                                .map(
                                                                user => <MenuItem key={user.id} value={user.id}>{`${user.name} ${user.second_name}`}</MenuItem>
                                                                )
                                                        }
                                                </Select>
                                        </FormControl>

                                        <Box className="mt-2">
                                                <FormControlLabel control={<Checkbox checked={ Boolean(echange) } onChange={e => setEchange( echange ? 0 : 1 )} />} label="Echange" />
                                        </Box>
                                </Box>
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleSubmit}>Ok</Button>
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
                format: (services) => <Services_component services={services} />,
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
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleChangePage = (event, newPage) => {
                setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
                setRowsPerPage(+event.target.value);
                setPage(0);
        };


        return(
        <Paper sx={{ width: '100%', height: "85%", overflow: 'hidden' }} elevation={0} variant="outlined" >
                <TableContainer sx={{ maxHeight: 440 }}>
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
                                        {rows
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

                                                                                if (column.id === "name") value = {name: row[column.id], id: row.id};
                                                                                else value = row[column.id]

                                                                                return (
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                        {
                                                                                                column.format
                                                                                                ? column.format(value)
                                                                                                : value
                                                                                        }
                                                                                </TableCell>
                                                                                );
                                                                        }
                                                                )
                                                        }
                                                </TableRow>
                                                );
                                        })}
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
                     position: "relative"
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