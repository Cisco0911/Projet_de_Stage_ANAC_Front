/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {MdDeleteSweep} from "react-icons/md";
import {ImNotification} from "react-icons/im";
import {IoBusinessOutline} from "react-icons/io5";

import Paper from "@mui/material/Paper";
import {
        BottomNavigation,
        BottomNavigationAction,
        Box, Button,
        Chip,
        Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
        Fab,
        TableHead,
        TablePagination, TextField
} from "@mui/material";
import Badge from "@mui/material/Badge";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {LoadingButton} from "@mui/lab";
import {http} from "../auth/login";
import toast from "react-hot-toast";
import Warning_component from "./warning_component";












export function Name_component({value, is_service})
{
        const [loading, setLoading] = useState(false);
        const [open_confirmation, setOpen_confirmation] = useState(false);

        const handleDelete = e =>
        {
                console.log("suppress services", value.id)
                setLoading(true)
                setOpen_confirmation(false)

                http.delete( `${ is_service ? "delete_service" : "delete_section"}?id=${value.id}` )
                .then(
                        res =>
                        {
                                console.log(res)

                                if ( res.data.statue === 'success' )
                                {
                                        window.reload()
                                        window.show_response(`${is_service ? "Service" : "Section"} supprimé !`, "success")
                                }
                                else window.show_response(res.data.data.msg, res.data.statue)

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

        const warning_infos = is_service ?
        [
                "Les Audits, Dossier, ... et utilisateurs seront détachés du service;",
                "Au cas ou ils se retrouvent n'appartenant à aucun autre service, ils seront automatiquent supprimés;",
                "S'il s'avèrent qu'un utilisateur est validateur d'un fichier ou responsabe d'un audit qui est lié à un autre service, la suppression n'aboutira pas !!"
        ] :
        [
                "Tout ce que contient la section sera supprimé, la suppression est irréversible !!",
        ]

        return(
        <React.Fragment>
                <Chip
                label={value.name}
                variant="outlined"
                onDelete={e => setOpen_confirmation(true)}
                deleteIcon={
                        <LoadingButton as={IconButton} loading={loading} color="error" >
                                {
                                        loading ? '' : <MdDeleteSweep color="red" size={20} />
                                }
                        </LoadingButton>
                }
                />
                <Warning_component open={open_confirmation} onConfirm={handleDelete} onCancel={e => setOpen_confirmation(false) } warning_infos={warning_infos} />
        </React.Fragment>

        )
}


export function Description_component({value, is_service})
{
        const [description, setDescription] = useState(value.description);
        const [open_dialog, setOpen_dialog] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleChange = (e) =>
        {
                const typed_value = e.target.value
                // console.log(typed_value)

                setDescription(typed_value);
        };

        const handleClose = () => {
                setOpen_dialog(false);
        };

        const handleSubmit = () =>
        {

                console.log("Updating description", description, value.id)

                setLoading(true)

                const queryData = new FormData()
                queryData.append("id", value.id)
                queryData.append("description", description === '' ? "Aucune description apportée" : description)

                http.post(is_service ? "describe_service" : "describe_section", queryData)
                .then(
                res =>
                {
                        console.log(res)

                        if ( res.data.statue === 'success' )
                        {
                                window.reload()
                                window.show_response("Service mise á jour !", "success")

                                setOpen_dialog(false);
                        }
                        else window.show_response(res.data.data.msg, res.data.statue)

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

        };



        return(
        <React.Fragment>
                <div title={value.description} onClick={ e => setOpen_dialog(true) }
                     style={{
                             display: "flex",
                             overflow: "hidden",
                             textOverflow: "ellipsis",
                             cursor: "pointer",
                     }}
                >
                        {/*{value.description + "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"}*/}
                        {value.description}
                </div>
                <Dialog open={open_dialog} onClose={handleClose} >
                        <DialogTitle>Update description</DialogTitle>
                        <DialogContent sx={{ minWidth: 350 }}>
                                <DialogContentText>
                                        Décrivez le service
                                </DialogContentText>
                                <TextField
                                        autoFocus
                                        onFocus={e => { e.target.select() }}
                                        multiline
                                        margin="dense"
                                        id="description_service"
                                        label="Description du service"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={description}
                                        onChange={handleChange}
                                />
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <LoadingButton loading={loading} onClick={handleSubmit}>Update</LoadingButton>
                        </DialogActions>
                </Dialog>
        </React.Fragment>

        )
}


const columns = [
        {
                id: 'name',
                label: 'Nom',
                format: (value) => <Name_component value={value} is_service={true} />,
                minWidth: 50
        },
        {
                id: 'description',
                label: 'Description',
                format: (value) => <Description_component value={value} is_service={true} />,
                minWidth: 250
        },
];

function Services({rows})
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
        <Paper sx={{ width: '100%', height: "100%", overflow: 'hidden' }} elevation={0} variant="outlined" >
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
                                                                        else if (column.id === "description") value = {description: row[column.id], id: row.id};
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

export default function Service_admin_section({services})
{

        const [name, setName] = useState('');
        const [open_dialog, setOpen_dialog] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(undefined);

        const handleChange = (e) =>
        {
                const typed_value = e.target.value
                // console.log(typed_value)

                setName(typed_value.toUpperCase());
                if (typed_value !== '') setError(undefined)
                else setError("Veuillez saisir le nom")
        };

        const handleClose = () => {
                setOpen_dialog(false);
        };

        const handleSubmit = () => {
                if (name === '') setError("Veuillez saisir le nom")
                else
                {
                        console.log("Creating service", name)
                        setLoading(true)

                        const queryData = new FormData()
                        queryData.append("name", name)

                        http.post("create_service", queryData)
                        .then(
                                res =>
                                {
                                        console.log(res)

                                        if ( res.data.statue === 'success' )
                                        {
                                                window.reload()
                                                window.show_response("Service créé !", "success")

                                                setOpen_dialog(false);
                                        }
                                        else window.show_response(res.data.data.msg, res.data.statue)

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

                        setError(undefined)
                }
        };


        return(
        <div className="full_size_element"
             style={{
                     position: "relative"
             }}
        >
                <div className="full_size_element p-3" >
                        <Services rows={services} />
                </div>
                <Box
                        sx={{
                                position: "absolute",
                                right: "5%",
                                bottom: "9%"
                        }}
                >
                        <Fab size="small" color="secondary" aria-label="add" onClick={ e => setOpen_dialog(true) } >
                                <AddIcon />
                        </Fab>
                </Box>
                <Dialog open={open_dialog} onClose={handleClose} >
                        <DialogTitle>Add service</DialogTitle>
                        <DialogContent sx={{ minWidth: 350 }}>
                                <DialogContentText>
                                        Enter le nom du service
                                </DialogContentText>
                                <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name_service"
                                        label="Nom du service"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(error)}
                                        helperText={error}
                                        value={name}
                                        onChange={handleChange}
                                />
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <LoadingButton loading={loading} onClick={handleSubmit}>Add</LoadingButton>
                        </DialogActions>
                </Dialog>
        </div>
        )
}