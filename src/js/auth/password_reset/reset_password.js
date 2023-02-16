var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useEffect, useState } from "react";

import { http } from "../login";

import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

import Container from "react-bootstrap/Container";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { TiUserAdd } from "react-icons/ti";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import swal from "sweetalert";

export default function Reset_password() {
        useEffect(function () {
                http.get('/sanctum/csrf-cookie').then(function (response) {
                        console.log("csrf cookie set", response);
                }).catch(function (err) {
                        console.log(err);
                });
        }, []);

        var navigate = useNavigate();

        var location = useLocation();

        // Extract the query parameters from the URL
        var queryParams = new URLSearchParams(location.search);

        // Get the value of a specific query parameter
        var _ref = [queryParams.get('token'), queryParams.get('email')],
            token = _ref[0],
            email = _ref[1];


        console.log(token, email);

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            showPassword = _useState2[0],
            setShowPassword = _useState2[1];

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            loading = _useState4[0],
            setLoading = _useState4[1];

        var toggleShowPassword = function toggleShowPassword() {
                setShowPassword(!showPassword);
        };

        var handleSubmit = function handleSubmit(submittedInfo) {

                console.log(submittedInfo);

                setLoading(true);

                var queryBody = new FormData();

                queryBody.append("email", email);
                queryBody.append("token", token);
                queryBody.append("password", submittedInfo.pwd);
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm);

                // console.log(queryBody)

                http.post('/reset-password', queryBody).then(function (res) {
                        console.log(res);
                        setLoading(false);
                        navigate("/login");
                }).catch(function (err) {
                        console.log(err);
                        setLoading(false);
                        swal({
                                title: "ERROR!",
                                text: err.response.data.message,
                                icon: "error"
                        });
                });
        };

        var validationRules = yup.object().shape({
                pwd: yup.string().required("champ récquis").min(8, "minimum 8 charactères").max(25, "maximum 25 charactères").matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, 'doit contenir au moins une majuscule, une minuscule, un chiffre, une charactère spécial'),
                pwd_confirm: yup.string().required("champ récquis").oneOf([yup.ref('pwd'), null], "les mots de passe doivent être les même")
        });

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

        // console.log("pwddddddddd", pwd)
        return React.createElement(
                ThemeProvider,
                { theme: theme },
                React.createElement(
                        "div",
                        { className: "full_size_element d-flex justify-content-center align-items-center position-relative" },
                        React.createElement(
                                Container,
                                {
                                        style: {
                                                width: "90%",
                                                minHeight: 'fit-content',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                alignItems: 'center',
                                                // backgroundColor: "rgba(12,146,241,0.34)",
                                                padding: "20px 10px",
                                                border: "solid blue",
                                                borderRadius: "20px"
                                                // color: "whitesmoke"
                                        }
                                },
                                React.createElement(
                                        "div",
                                        { className: "custom_login_header d-none d-sm-flex" },
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
                                        Formik,
                                        {
                                                validationSchema: validationRules,
                                                onSubmit: handleSubmit,
                                                initialValues: {
                                                        pwd: '',
                                                        pwd_confirm: ''
                                                }
                                        },
                                        function (_ref2) {
                                                var handleSubmit = _ref2.handleSubmit,
                                                    handleChange = _ref2.handleChange,
                                                    handleBlur = _ref2.handleBlur,
                                                    values = _ref2.values,
                                                    touched = _ref2.touched,
                                                    isValid = _ref2.isValid,
                                                    errors = _ref2.errors;
                                                return React.createElement(
                                                        Form,
                                                        { value: undefined, onSubmit: handleSubmit },
                                                        React.createElement(
                                                                Stack,
                                                                { className: "full_size_element", direction: "column", spacing: 2, justifyContent: "space-around" },
                                                                React.createElement(
                                                                        Form.Group,
                                                                        { className: "mb-3" },
                                                                        React.createElement(
                                                                                Form.Label,
                                                                                null,
                                                                                "EMAIL"
                                                                        ),
                                                                        React.createElement(
                                                                                InputGroup,
                                                                                null,
                                                                                React.createElement(
                                                                                        InputGroup.Text,
                                                                                        null,
                                                                                        "@"
                                                                                ),
                                                                                React.createElement(Form.Control, {
                                                                                        name: "email",
                                                                                        value: email,
                                                                                        onChange: handleChange,
                                                                                        type: "email",
                                                                                        color: "white",
                                                                                        style: { color: "inherit" },
                                                                                        readOnly: true
                                                                                })
                                                                        )
                                                                ),
                                                                React.createElement(
                                                                        Form.Group,
                                                                        { className: "mb-3" },
                                                                        React.createElement(
                                                                                Form.Label,
                                                                                null,
                                                                                "Nouveau mot de passe"
                                                                        ),
                                                                        React.createElement(
                                                                                InputGroup,
                                                                                null,
                                                                                React.createElement(
                                                                                        InputGroup.Text,
                                                                                        null,
                                                                                        React.createElement(RiLockPasswordFill, null)
                                                                                ),
                                                                                React.createElement(Form.Control, {
                                                                                        name: "pwd",
                                                                                        value: values.pwd,
                                                                                        onChange: handleChange,
                                                                                        type: "" + (showPassword ? "text" : "password"),
                                                                                        placeholder: "password",
                                                                                        color: "white",
                                                                                        style: { color: "inherit" },
                                                                                        isInvalid: !!errors.pwd
                                                                                }),
                                                                                React.createElement(
                                                                                        InputGroup.Text,
                                                                                        { className: "text-muted" },
                                                                                        !showPassword ? React.createElement(VscEye, { onClick: toggleShowPassword }) : React.createElement(VscEyeClosed, { onClick: toggleShowPassword })
                                                                                ),
                                                                                React.createElement(
                                                                                        Form.Control.Feedback,
                                                                                        { type: "invalid" },
                                                                                        errors.pwd
                                                                                )
                                                                        )
                                                                ),
                                                                React.createElement(
                                                                        Form.Group,
                                                                        { className: "mb-3" },
                                                                        React.createElement(
                                                                                Form.Label,
                                                                                null,
                                                                                "Confirmer le mot de passe"
                                                                        ),
                                                                        React.createElement(
                                                                                InputGroup,
                                                                                null,
                                                                                React.createElement(
                                                                                        InputGroup.Text,
                                                                                        null,
                                                                                        React.createElement(RiLockPasswordFill, null)
                                                                                ),
                                                                                React.createElement(Form.Control, {
                                                                                        name: "pwd_confirm",
                                                                                        value: values.pwd_confirm,
                                                                                        onChange: handleChange,
                                                                                        type: "" + (showPassword ? "text" : "password"),
                                                                                        placeholder: "confirm password",
                                                                                        color: "white",
                                                                                        style: { color: "inherit" },
                                                                                        isInvalid: !!errors.pwd_confirm
                                                                                }),
                                                                                React.createElement(
                                                                                        InputGroup.Text,
                                                                                        { className: "text-muted" },
                                                                                        !showPassword ? React.createElement(VscEye, { onClick: toggleShowPassword }) : React.createElement(VscEyeClosed, { onClick: toggleShowPassword })
                                                                                ),
                                                                                React.createElement(
                                                                                        Form.Control.Feedback,
                                                                                        { type: "invalid" },
                                                                                        errors.pwd_confirm
                                                                                )
                                                                        )
                                                                )
                                                        ),
                                                        React.createElement(
                                                                "div",
                                                                {
                                                                        style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                position: 'relative',
                                                                                alignItems: 'center'
                                                                        }
                                                                },
                                                                React.createElement(
                                                                        LoadingButton,
                                                                        { loading: loading, variant: "primary", type: "submit" },
                                                                        "RESET"
                                                                )
                                                        )
                                                );
                                        }
                                )
                        )
                )
        );
}