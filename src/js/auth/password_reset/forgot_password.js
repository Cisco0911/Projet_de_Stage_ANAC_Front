var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState } from 'react';

import { http } from "../login";

import Container from "react-bootstrap/Container";
import { Link, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";

export default function Forgot_password() {
        var _useState = useState(''),
            _useState2 = _slicedToArray(_useState, 2),
            email = _useState2[0],
            setEmail = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            loading = _useState4[0],
            setLoading = _useState4[1];

        var _useState5 = useState(null),
            _useState6 = _slicedToArray(_useState5, 2),
            error = _useState6[0],
            setError = _useState6[1];

        var _useState7 = useState(false),
            _useState8 = _slicedToArray(_useState7, 2),
            emailSent = _useState8[0],
            setEmailSent = _useState8[1];

        var reset = function reset(e) {
                setLoading(true);

                var onFulfilled = function onFulfilled(res) {
                        console.log("reseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet" + email, res);
                        setLoading(false);
                        setError(null);
                        setEmailSent(true);
                        // if (res.data.statue === "success")
                        // {
                        //         // window.Global_State.updateAuthUserInfo(res.data.data)
                        //         setValue('')
                        //         window.show_response(`${label} mis á jour !`, "success")
                        // }
                        // else window.show_response(res.data.data.msg, res.data.statue)
                };
                var onRejected = function onRejected(err) {
                        console.log(err);
                        setLoading(false);
                        setError(err.response.data.message);
                        setEmailSent(false);
                        // window.show_response(`${err.message} ${err.response.data.message}`, "error")
                };

                http.post("/forgot-password", { email: email }).then(onFulfilled, onRejected);
        };

        var handleChange = function handleChange(e) {
                setEmail(e.target.value);
        };

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

        var Success_msg = function Success_msg() {
                return React.createElement(
                        "span",
                        { className: "text-success", style: { fontWeight: "bold" } },
                        emailSent ? "Lien de r\xE9initialisation a \xE9t\xE9 envoy\xE9 \xE0 l'adresse " + email : ''
                );
        };

        return React.createElement(
                ThemeProvider,
                { theme: theme },
                React.createElement(
                        "div",
                        { className: "full_size_element d-flex flex-column justify-content-center align-items-center position-relative" },
                        React.createElement(
                                Container,
                                {
                                        style: {
                                                width: "90%",
                                                justifyContent: 'center',
                                                position: 'relative',
                                                alignItems: 'center',
                                                // backgroundColor: "rgba(12,146,241,0.34)",
                                                padding: "40px 20px",
                                                border: "solid blue",
                                                borderRadius: "20px"
                                                // color: "whitesmoke"
                                        }
                                },
                                React.createElement(
                                        "div",
                                        { className: "custom_login_header" },
                                        React.createElement(
                                                "div",
                                                { className: "d-flex justify-content-center align-items-center ",
                                                        style: {
                                                                height: "100%",
                                                                width: 80,
                                                                backgroundColor: 'white',
                                                                borderRadius: "100%"
                                                        }
                                                },
                                                React.createElement(
                                                        "div",
                                                        { className: "anac_logo" },
                                                        React.createElement(
                                                                "a",
                                                                { href: "/", className: "full_size_element" },
                                                                React.createElement("img", { className: "full_size_element", src: window.location.origin + "/Favicon_anac.png", alt: "logo" })
                                                        )
                                                )
                                        )
                                ),
                                React.createElement(
                                        Stack,
                                        { direction: "column", spacing: 3 },
                                        React.createElement(TextField, {
                                                color: emailSent ? "success" : '',
                                                sx: {
                                                        width: "100%"
                                                },
                                                size: "small",
                                                id: "forgot_password",
                                                label: "Email ...",
                                                autoFocus: true,
                                                type: "email",
                                                error: Boolean(error),
                                                helperText: error || React.createElement(Success_msg, null),
                                                value: email,
                                                onChange: handleChange
                                        }),
                                        React.createElement(
                                                LoadingButton,
                                                { loading: loading, onClick: reset, sx: {
                                                                width: "100%"
                                                        } },
                                                "send email"
                                        )
                                )
                        )
                )
        );
}