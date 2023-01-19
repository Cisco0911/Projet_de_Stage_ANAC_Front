var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';

import { http } from "./login";

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
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";

import Stack from "@mui/material/Stack";
import toast, { Toaster } from "react-hot-toast";

export default function Create_account() {

        var navigate = useNavigate();

        var msg_err = "Valeur de champ invalide";

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            showPassword = _useState2[0],
            setShowPassword = _useState2[1];

        var toggleShowPassword = function toggleShowPassword() {
                setShowPassword(!showPassword);
        };

        var handleSubmit = function handleSubmit(submittedInfo) {
                toast("Creating new account...", {
                        id: "new_account",
                        type: "loading",
                        duration: Infinity
                });

                console.log(submittedInfo);

                var queryBody = new FormData();

                queryBody.append("name", submittedInfo.name);
                queryBody.append("snd_name", submittedInfo.second_name);
                queryBody.append("num_inspector", submittedInfo.num_inspector);
                queryBody.append("email", submittedInfo.email);
                queryBody.append("password", submittedInfo.pwd);
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm);

                // console.log(queryBody)

                http.post('/register', queryBody).then(function (res) {
                        console.log(res);

                        toast("Compte crée avec success", {
                                id: "new_account",
                                type: "success",
                                duration: 2000
                        });

                        navigate("/login");
                }).catch(function (err) {
                        toast.dismiss("new_account");

                        console.log(err);
                        swal({
                                title: "Error",
                                text: err.response.data.message,
                                icon: "error"
                        });
                });
        };

        var validationRules = yup.object().shape({
                num_inspector: yup.string().required("champ récquis"),
                name: yup.string().required("champ récquis"),
                second_name: yup.string().required("champ récquis"),
                email: yup.string().required("champ récquis").email("email non valide"),
                pwd: yup.string().required("champ récquis").min(8, "minimum 8 charactères").max(25, "maximum 25 charactères").matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, 'doit contenir au moins une majuscule, une minuscule, un chiffre, une charactère spécial'),
                pwd_confirm: yup.string().required("champ récquis").oneOf([yup.ref('pwd'), null], "les mots de passe doivent être les même")
        });

        // console.log("pwddddddddd", pwd)
        return React.createElement(
                'div',
                { className: 'full_size_element d-flex justify-content-center align-items-center position-relative' },
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
                }),
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
                                'div',
                                { className: 'custom_login_header d-none d-sm-flex' },
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
                                        React.createElement(TiUserAdd, { size: 50, color: 'white' })
                                )
                        ),
                        React.createElement(
                                Formik,
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                num_inspector: '',
                                                email: '',
                                                name: '',
                                                second_name: '',
                                                pwd: '',
                                                pwd_confirm: ''
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
                                                                        errors.num_inspector
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Stack,
                                                        { className: 'full_size_element', direction: "row", spacing: 2, justifyContent: "space-around" },
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Nom'
                                                                ),
                                                                React.createElement(
                                                                        InputGroup,
                                                                        null,
                                                                        React.createElement(Form.Control, {
                                                                                name: 'name',
                                                                                value: values.name,
                                                                                onChange: handleChange,
                                                                                type: 'text',
                                                                                placeholder: 'Ex: Ibn Fumilay\xF4',
                                                                                color: 'white',
                                                                                style: { color: "inherit" },
                                                                                isInvalid: !!errors.name
                                                                        }),
                                                                        React.createElement(
                                                                                Form.Control.Feedback,
                                                                                { type: 'invalid' },
                                                                                errors.name
                                                                        )
                                                                )
                                                        ),
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Pr\xE9nom'
                                                                ),
                                                                React.createElement(
                                                                        InputGroup,
                                                                        null,
                                                                        React.createElement(Form.Control, {
                                                                                name: 'second_name',
                                                                                value: values.second_name,
                                                                                onChange: handleChange,
                                                                                type: 'text',
                                                                                placeholder: 'Ex: \xD4m\xF4dada',
                                                                                color: 'white',
                                                                                style: { color: "inherit" },
                                                                                isInvalid: !!errors.second_name
                                                                        }),
                                                                        React.createElement(
                                                                                Form.Control.Feedback,
                                                                                { type: 'invalid' },
                                                                                errors.second_name
                                                                        )
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Email'
                                                        ),
                                                        React.createElement(
                                                                InputGroup,
                                                                null,
                                                                React.createElement(
                                                                        InputGroup.Text,
                                                                        null,
                                                                        '@'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        name: 'email',
                                                                        value: values.email,
                                                                        onChange: handleChange,
                                                                        type: 'email',
                                                                        placeholder: 'Ex: omodada1@gmail.com',
                                                                        color: 'white',
                                                                        style: { color: "inherit" },
                                                                        isInvalid: !!errors.email
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        errors.email
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
                                                                        errors.pwd
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Confirmer le mot de passe'
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
                                                                        name: 'pwd_confirm',
                                                                        value: values.pwd_confirm,
                                                                        onChange: handleChange,
                                                                        type: '' + (showPassword ? "text" : "password"),
                                                                        placeholder: 'confirm password',
                                                                        color: 'white',
                                                                        style: { color: "inherit" },
                                                                        isInvalid: !!errors.pwd_confirm
                                                                }),
                                                                React.createElement(
                                                                        InputGroup.Text,
                                                                        { className: 'text-muted' },
                                                                        !showPassword ? React.createElement(VscEye, { onClick: toggleShowPassword }) : React.createElement(VscEyeClosed, { onClick: toggleShowPassword })
                                                                ),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        errors.pwd_confirm
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
                                                                Button,
                                                                { variant: 'primary', type: 'submit' },
                                                                'Connexion'
                                                        )
                                                )
                                        );
                                }
                        )
                )
        );
}