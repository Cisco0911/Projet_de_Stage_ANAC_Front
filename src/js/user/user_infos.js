/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import Info_field from "./info_field";

import { useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Image } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

export default function User_infos() {
        var navigate = useNavigate();

        var user = window.Global_State.authUser;

        var theme = createTheme({
                typography: {
                        fontFamily: '"Josefin Sans", sans-serif',
                        userDropButton: {
                                '&:hover': {
                                        color: '#6c757d'
                                }
                        }

                }
        });

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        ThemeProvider,
                        { theme: theme },
                        React.createElement(
                                "div",
                                null,
                                React.createElement(Toaster, {
                                        toastOptions: {
                                                // Define default options
                                                className: '',
                                                duration: 3000,
                                                position: 'top-right',
                                                style: {
                                                        maxWidth: 1920
                                                        // background: 'yellow',
                                                }

                                                // Default options for specific types
                                                // success: {
                                                //     duration: 3000,
                                                //     theme: {
                                                //         primary: 'green',
                                                //         secondary: 'black',
                                                //     },
                                                // }
                                        }
                                })
                        ),
                        React.createElement(
                                "div",
                                { className: "full_size_element", style: {
                                                padding: 30,
                                                // display: "flex",
                                                // flexDirection: "column",
                                                overflowY: "scroll"
                                        } },
                                React.createElement(
                                        Divider,
                                        { sx: {
                                                        marginBottom: 10
                                                } },
                                        React.createElement(
                                                "span",
                                                { style: { fontWeight: "bold", fontSize: 25 } },
                                                "PROFIL"
                                        )
                                ),
                                React.createElement(
                                        Grid,
                                        { container: true, spacing: 5, direction: "column" },
                                        React.createElement(
                                                Grid,
                                                { item: true, xs: 4 },
                                                React.createElement(
                                                        Grid,
                                                        { container: true, spacing: 5 },
                                                        React.createElement(
                                                                Grid,
                                                                { item: true, md: true, sm: 12 },
                                                                React.createElement(
                                                                        Paper,
                                                                        { className: "full_size_element d-flex justify-content-center align-items-center", elevation: 3, sx: {
                                                                                        minWidth: 400,
                                                                                        minHeight: 300,
                                                                                        position: "relative"
                                                                                } },
                                                                        React.createElement(Avatar, { sx: {
                                                                                        position: "absolute",
                                                                                        zIndex: 100,
                                                                                        bottom: 20,
                                                                                        right: 20,
                                                                                        boxShadow: '0px 3px 5px -1px rgb(0 0 0), 0px 5px 8px 0px rgb(0 0 0), 0px 1px 14px 0px rgb(0 0 0 / 0%)',
                                                                                        width: 70,
                                                                                        height: 70
                                                                                } }),
                                                                        "pp",
                                                                        React.createElement(Image, null)
                                                                )
                                                        ),
                                                        React.createElement(
                                                                Grid,
                                                                { item: true, md: true, sm: 12 },
                                                                React.createElement(
                                                                        Box,
                                                                        { className: "full_size_element", style: {
                                                                                        border: 'thin solid blue',
                                                                                        borderRadius: 10,
                                                                                        padding: 20
                                                                                } },
                                                                        React.createElement(
                                                                                Stack,
                                                                                { className: "full_size_element", direction: "column", spacing: 2 },
                                                                                React.createElement(Info_field, { label: "NOM", type: "text", default_value: user.name, info_name: "name" }),
                                                                                React.createElement(Info_field, { label: "PRENOM", type: "text", default_value: user.second_name, info_name: "second_name" }),
                                                                                React.createElement(Info_field, { label: "EMAIL", type: "email", default_value: user.email, info_name: "email" })
                                                                        )
                                                                )
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Grid,
                                                { item: true, xs: 8 },
                                                React.createElement(
                                                        Box,
                                                        { className: "full_size_element", style: {
                                                                        border: 'thin solid red',
                                                                        borderRadius: 10,
                                                                        padding: 20
                                                                } },
                                                        React.createElement(
                                                                Stack,
                                                                { className: "full_size_element", direction: "column", spacing: 3 },
                                                                React.createElement(
                                                                        Divider,
                                                                        { sx: {
                                                                                        // marginBottom: 10,
                                                                                } },
                                                                        React.createElement(
                                                                                "span",
                                                                                { style: { fontWeight: "bold", fontSize: 15, color: "red" } },
                                                                                "DANGER ZONE"
                                                                        )
                                                                ),
                                                                React.createElement(Info_field, { label: "MOT DE PASSE", type: "password", default_value: '' })
                                                        )
                                                )
                                        )
                                )
                        )
                )
        );
}