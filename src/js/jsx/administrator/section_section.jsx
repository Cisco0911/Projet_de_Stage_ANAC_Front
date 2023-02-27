/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {Name_component, Description_component} from "./service_section"
import {Services_component} from "./user_section";

import {
        Box, Button, Chip,
        Dialog, DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        Fab, TableHead, TablePagination, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {http} from "../auth/login";
import toast from "react-hot-toast";
import {LoadingButton} from "@mui/lab";











const columns = [
        {
                id: 'name',
                label: 'Nom',
                format: (value) => <Name_component value={value} is_service={false} />,
                minWidth: 50
        },
        {
                id: 'services',
                label: 'Services',
                align: 'right',
                format: (value) => <Services_component value={value} is_user={false} />,
        },
        {
                id: 'description',
                label: 'Description',
                format: (value) => <Description_component value={value} is_service={false} />,
                minWidth: 250
        },
];

function Sections({rows})
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


export default function Section_admin_section({sections})
{

        const [open_dialog, setOpen_dialog] = useState(false);
        const [name, setName] = useState('');
        const [error, setError] = useState(undefined);
        const [loading, setLoading] = useState(false);

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
                        console.log("Creating section", name)
                        setLoading(true)

                        const queryData = new FormData()
                        queryData.append("name", name)

                        http.post("create_section", queryData)
                        .then(
                        res =>
                        {
                                console.log(res)

                                if ( res.data.statue === 'success' )
                                {
                                        window.reload()
                                        window.show_response("Section créée !", "success")

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
                     position: "relative",
                     backgroundColor: "white",
                     borderRadius: 10,
             }}
        >
                <div className="full_size_element p-3" >
                        <Sections rows={sections} />
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
                        <DialogTitle>Add section</DialogTitle>
                        <DialogContent sx={{ minWidth: 350 }}>
                                <DialogContentText>
                                        Enter le nom de la section
                                </DialogContentText>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name_service"
                                label="Nom de la section"
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