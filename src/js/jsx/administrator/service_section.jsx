/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {FcDepartment, FcDeleteRow} from "react-icons/fc";
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












function Name_component({value})
{

        const handleDelete = e =>
        {
                console.log("suppress services", value.id)
        }

        return(
        <Chip
                label={value.name}
                variant="outlined"
                onDelete={handleDelete}
                deleteIcon={
                        <IconButton color="error" >
                                <FcDeleteRow size={20} />
                        </IconButton>
                }
                />
        )
}


function Description_component({value})
{
        const [description, setDescription] = useState('');
        const [open_dialog, setOpen_dialog] = useState(false);

        const handleChange = (e) =>
        {
                const typed_value = e.target.value
                // console.log(typed_value)

                setDescription(typed_value);
        };

        const handleClose = () => {
                setOpen_dialog(false);
        };

        const handleSubmit = () => {

                console.log("Updating description", description)
                setOpen_dialog(false);
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
                        {value.description + "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"}
                </div>
                <Dialog open={open_dialog} onClose={handleClose} >
                        <DialogTitle>Update description</DialogTitle>
                        <DialogContent sx={{ minWidth: 350 }}>
                                <DialogContentText>
                                        Décrivez le service
                                </DialogContentText>
                                <TextField
                                        autoFocus
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
                                <Button onClick={handleSubmit}>Update</Button>
                        </DialogActions>
                </Dialog>
        </React.Fragment>

        )
}


const columns = [
        {
                id: 'name',
                label: 'Nom',
                format: (value) => <Name_component value={value} />,
                minWidth: 50
        },
        {
                id: 'description',
                label: 'Description',
                format: (value) => <Description_component value={value} />,
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

        const [value, setValue] = useState(0);
        const [name, setName] = useState('');
        const [open_dialog, setOpen_dialog] = useState(false);
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
                        setOpen_dialog(false);
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
                <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                                setValue(newValue);
                        }}
                        >

                                <BottomNavigationAction label="Services" icon={<IoBusinessOutline size={30} />} />
                                <BottomNavigationAction label="Requests" icon={<ImNotification size={30} />} />
                        </BottomNavigation>
                </Paper>
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
                                <Button onClick={handleSubmit}>Add</Button>
                        </DialogActions>
                </Dialog>
        </div>
        )
}