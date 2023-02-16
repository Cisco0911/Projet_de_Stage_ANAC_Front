var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';

import { http } from "../auth/login";
import Loaded_administrator_page from "./loaded_administrator_page";

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
import toast, { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function fetch_data(setData_base, setErr) {
        new Promise(function (resolve, reject) {
                http.get("administrative_data").then(function (res) {
                        console.log(res);
                        resolve(res.data);
                }).catch(function (err) {
                        console.log(err);
                        reject(new Error(err.message + '\n' + err.response.data.message));
                });
        }).then(function (data) {
                return setData_base(data);
        }).catch(function (err) {
                return setErr(err.message);
        });
}

export default function Administrator_home() {
        var _useState = useState(null),
            _useState2 = _slicedToArray(_useState, 2),
            Data_Base = _useState2[0],
            setData_base = _useState2[1];

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            err = _useState4[0],
            setErr = _useState4[1];

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        var container = Data_Base === null ? React.createElement(
                'div',
                { className: 'preloader' },
                ' ',
                React.createElement('div', { className: 'preloader-icon' }),
                ' '
        ) : React.createElement(Loaded_administrator_page, { datas: Data_Base });

        useEffect(function () {
                fetch_data(setData_base, setErr);
        }, []);

        window.reload = function () {
                return fetch_data(setData_base, setErr);
        };

        console.log("render_administrator");

        window.show_error = function (msg) {
                swal({
                        title: "Error",
                        text: msg,
                        icon: "error"
                });
        };
        window.show_response = function (msg, type) {
                toast(function (t) {
                        return (
                                // t.visible ?
                                React.createElement(
                                        Alert,
                                        { onClose: function onClose() {
                                                        return toast.dismiss(t.id);
                                                }, severity: type, sx: { width: 'fit-content', minWidth: 300, animation: "fadeMe 0.3s" } },
                                        React.createElement(
                                                AlertTitle,
                                                { sx: { width: "fit-content" } },
                                                ' ',
                                                type.replace(/^\w/, function (c) {
                                                        return c.toUpperCase();
                                                }),
                                                ' '
                                        ),
                                        msg
                                )
                        );
                }, {
                        position: "bottom-left",
                        duration: type === "error" ? Infinity : 3000,
                        style: {
                                background: 'rgba(255,255,255,0)',
                                padding: 0,
                                boxShadow: 'unset'
                        }
                });
                // swal({
                //         title: "Error",
                //         text: msg,
                //         icon: type
                // })
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

        return React.createElement(
                ThemeProvider,
                { theme: theme },
                React.createElement(
                        'div',
                        { className: 'full_size_element d-flex justify-content-center align-items-center',
                                style: {
                                        textAlign: "center"
                                }
                        },
                        React.createElement(
                                'div',
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
                        err || container
                )
        );
}