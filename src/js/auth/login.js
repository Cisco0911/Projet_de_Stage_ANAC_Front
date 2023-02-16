var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Formik } from 'formik';
import * as yup from 'yup';

import { useNavigate } from "react-router-dom";

import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { RiLockPasswordFill, RiMapPinUserFill } from "react-icons/ri";
import { FaUserTie, FaUserSecret } from "react-icons/fa";
import { Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// https://api.anac-togo-file-manager.com
export var http = axios.create({
        baseURL: 'http://localhost:80',
        headers: {},
        withCredentials: true
});

export default function Login() {

        var navigate = useNavigate();

        var msg_err = "Valeur de champ invalide";

        useEffect(function () {
                http.get('/sanctum/csrf-cookie').then(function (response) {
                        console.log(response);
                }).catch(function (err) {
                        console.log(err);
                });
        }, []);

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

                queryBody.append("num_inspector", submittedInfo.num_inspector);
                queryBody.append("password", submittedInfo.pwd);

                // console.log(queryBody)

                http.post('/login', queryBody).then(function (res) {
                        console.log(res);
                        setLoading(false);

                        if (!parseInt(res.data.user.id)) navigate("/administrator");else navigate("/files_browser");
                }).catch(function (err) {
                        console.log(err);
                        setLoading(true);

                        swal({
                                title: "Error",
                                text: err.response.data.message,
                                icon: "error"
                        });
                });
        };

        var validationRules = yup.object().shape({
                num_inspector: yup.string().required(),
                pwd: yup.string().required()
        });

        return React.createElement(
                'div',
                { className: 'full_size_element d-flex flex-column justify-content-center align-items-center position-relative' },
                React.createElement(
                        Container,
                        {
                                style: {
                                        maxWidth: 600,
                                        width: "90%",
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center',
                                        backgroundColor: "rgba(12,146,241,0.34)",
                                        padding: "20px 10px",
                                        border: "solid blue",
                                        borderRadius: "20px"
                                        // color: "whitesmoke"
                                }
                        },
                        React.createElement(
                                'div',
                                { className: 'custom_login_header' },
                                React.createElement(
                                        'div',
                                        { className: 'd-flex justify-content-center align-items-center ',
                                                style: {
                                                        height: "100%",
                                                        width: 80,
                                                        backgroundColor: 'blue',
                                                        borderRadius: "100%"
                                                }
                                        },
                                        React.createElement(FaUserSecret, { size: 50, color: 'white' })
                                )
                        ),
                        React.createElement(
                                Formik,
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                num_inspector: '',
                                                pwd: ''
                                        }
                                },
                                function (_ref) {
                                        var handleSubmit = _ref.handleSubmit,
                                            handleChange = _ref.handleChange,
                                            handleBlur = _ref.handleBlur,
                                            values = _ref.values,
                                            touched = _ref.touched,
                                            isValid = _ref.isValid,
                                            errors = _ref.errors;
                                        return React.createElement(
                                                Form,
                                                { value: undefined, onSubmit: handleSubmit },
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Numero Inspecteur'
                                                        ),
                                                        React.createElement(
                                                                InputGroup,
                                                                null,
                                                                React.createElement(
                                                                        InputGroup.Text,
                                                                        null,
                                                                        React.createElement(FaUserTie, null)
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        name: 'num_inspector',
                                                                        value: values.num_inspector,
                                                                        onChange: handleChange,
                                                                        type: 'text',
                                                                        placeholder: 'Ex: 12345',
                                                                        color: 'white',
                                                                        style: { color: "inherit" },
                                                                        isInvalid: !!errors.num_inspector
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        msg_err
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Mot de passe'
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
                                                                        name: 'pwd',
                                                                        value: values.pwd,
                                                                        onChange: handleChange,
                                                                        type: '' + (showPassword ? "text" : "password"),
                                                                        placeholder: 'password',
                                                                        color: 'white',
                                                                        style: { color: "inherit" },
                                                                        isInvalid: !!errors.pwd
                                                                }),
                                                                React.createElement(
                                                                        InputGroup.Text,
                                                                        { className: 'text-muted' },
                                                                        !showPassword ? React.createElement(VscEye, { onClick: toggleShowPassword }) : React.createElement(VscEyeClosed, { onClick: toggleShowPassword })
                                                                ),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        msg_err
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        'div',
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
                                                                { loading: loading, variant: 'outlined', type: 'submit' },
                                                                'Connexion'
                                                        )
                                                )
                                        );
                                }
                        )
                ),
                React.createElement(
                        'span',
                        { className: 'mt-3' },
                        'don\'t have account ? ',
                        React.createElement(
                                Link,
                                { href: "/sign_in" },
                                'Sign in'
                        )
                ),
                React.createElement(
                        Link,
                        { href: "/forgot_password" },
                        'Mot de passe oubli\xE9'
                )
        );
}