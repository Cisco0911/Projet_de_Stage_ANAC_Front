var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { http } from "../auth/login";
import swal from "sweetalert";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import { TiUserAdd } from "react-icons/ti";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";
import Stack from "@mui/material/Stack";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Button from "react-bootstrap/Button";

export default function Password_info() {

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

                console.log(submittedInfo);

                var queryBody = new FormData();

                queryBody.append("name", submittedInfo.name);
                queryBody.append("password", submittedInfo.pwd);
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm);

                // console.log(queryBody)

                http.post('/register', queryBody).then(function (res) {
                        console.log(res);
                }).catch(function (err) {

                        console.log(err);
                });
        };

        var validationRules = yup.object().shape({
                name: yup.string().required("champ récquis"),
                pwd: yup.string().required("champ récquis").min(8, "minimum 8 charactères").max(25, "maximum 25 charactères").matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, 'doit contenir au moins une majuscule, une minuscule, un chiffre, une charactère spécial'),
                pwd_confirm: yup.string().required("champ récquis").oneOf([yup.ref('pwd'), null], "les mots de passe doivent être les même")
        });

        // console.log("pwddddddddd", pwd)
        return React.createElement(
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
                                                        backgroundColor: 'blue',
                                                        borderRadius: "100%"
                                                }
                                        },
                                        React.createElement(TiUserAdd, { size: 50, color: "white" })
                                )
                        ),
                        React.createElement(
                                Formik,
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                name: '',
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
                                                        { className: "mb-3" },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                "Nom"
                                                        ),
                                                        React.createElement(
                                                                InputGroup,
                                                                null,
                                                                React.createElement(Form.Control, {
                                                                        name: "name",
                                                                        value: values.name,
                                                                        onChange: handleChange,
                                                                        type: "text",
                                                                        placeholder: "Ex: Ibn Fumilay\xF4",
                                                                        color: "white",
                                                                        style: { color: "inherit" },
                                                                        isInvalid: !!errors.name
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: "invalid" },
                                                                        errors.name
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Stack,
                                                        { className: "full_size_element", direction: "row", spacing: 2, justifyContent: "space-around" },
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: "mb-3" },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        "Mot de passe"
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
                                                                Button,
                                                                { variant: "primary", type: "submit" },
                                                                "Connexion"
                                                        )
                                                )
                                        );
                                }
                        )
                )
        );
}