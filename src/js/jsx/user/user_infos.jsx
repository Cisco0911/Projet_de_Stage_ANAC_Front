/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import Info_field from "./info_field";

import {useNavigate} from "react-router-dom";

import {Box, Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {Image} from "react-bootstrap";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Toaster} from "react-hot-toast";














export default function User_infos()
{
        const navigate = useNavigate()

        const user = window.Global_State.authUser

        const theme = createTheme({
                typography: {
                        fontFamily: '"Josefin Sans", sans-serif',
                        userDropButton:
                        {
                                '&:hover':
                                {
                                        color: '#6c757d',
                                },
                        },

                },
        });

        return(
        <React.Fragment>
                <ThemeProvider theme={theme} >
                        <div>
                                <Toaster
                                toastOptions={{
                                        // Define default options
                                        className: '',
                                        duration: 3000,
                                        position: 'top-right',
                                        style:
                                        {
                                                maxWidth: 1920,
                                                // background: 'yellow',
                                        },

                                        // Default options for specific types
                                        // success: {
                                        //     duration: 3000,
                                        //     theme: {
                                        //         primary: 'green',
                                        //         secondary: 'black',
                                        //     },
                                        // }
                                }}
                                />
                        </div>
                        <div className="full_size_element" style={{
                                padding: 30,
                                // display: "flex",
                                // flexDirection: "column",
                                overflowY: "scroll",
                        }} >
                                <Divider sx={{
                                        marginBottom: 10,
                                }} >
                                        <span style={{ fontWeight: "bold", fontSize: 25 }} >PROFIL</span>
                                </Divider>
                                <Grid container spacing={5} direction={"column"} >
                                        <Grid item xs={4} >
                                                <Grid container spacing={5} >
                                                        <Grid item md sm={12}>
                                                                <Paper className="full_size_element d-flex justify-content-center align-items-center" elevation={3} sx={{
                                                                        minWidth: 400,
                                                                        minHeight: 300,
                                                                        position: "relative",
                                                                }}>
                                                                        <Avatar sx={{
                                                                                position: "absolute",
                                                                                zIndex: 100,
                                                                                bottom: 20,
                                                                                right: 20,
                                                                                boxShadow: '0px 3px 5px -1px rgb(0 0 0), 0px 5px 8px 0px rgb(0 0 0), 0px 1px 14px 0px rgb(0 0 0 / 0%)',
                                                                                width: 70,
                                                                                height: 70,
                                                                        }} >

                                                                        </Avatar>
                                                                        pp
                                                                        <Image>

                                                                        </Image>
                                                                </Paper>
                                                        </Grid>
                                                        <Grid item md sm={12}>
                                                                <Box className="full_size_element" style={{
                                                                        border: 'thin solid blue',
                                                                        borderRadius: 10,
                                                                        padding: 20,
                                                                }} >
                                                                        <Stack className="full_size_element" direction={"column"} spacing={2} >
                                                                                <Info_field label={"NOM"} type={"text"} default_value={user.name} info_name={"name"} />
                                                                                <Info_field label={"PRENOM"} type={"text"} default_value={user.second_name} info_name={"second_name"} />
                                                                                <Info_field label={"EMAIL"} type={"email"} default_value={user.email} info_name={"email"} />
                                                                        </Stack>
                                                                </Box>
                                                        </Grid>
                                                </Grid>
                                        </Grid>
                                        {/*<Grid item xs={8} >*/}
                                        {/*        <Box className="full_size_element" style={{*/}
                                        {/*                border: 'thin solid red',*/}
                                        {/*                borderRadius: 10,*/}
                                        {/*                padding: 20,*/}
                                        {/*        }} >*/}
                                        {/*                <Stack className="full_size_element" direction={"column"} spacing={3} >*/}
                                        {/*                        <Divider sx={{*/}
                                        {/*                                // marginBottom: 10,*/}
                                        {/*                        }} >*/}
                                        {/*                                <span style={{ fontWeight: "bold", fontSize: 15, color: "red" }} >DANGER ZONE</span>*/}
                                        {/*                        </Divider>*/}

                                        {/*                        <Info_field label={"MOT DE PASSE"} type={"password"} default_value={''} />*/}
                                        {/*                </Stack>*/}
                                        {/*        </Box>*/}
                                        {/*</Grid>*/}
                                </Grid>
                        </div>
                </ThemeProvider>
        </React.Fragment>
        )
}