/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';

import { http } from "../data";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Formik } from 'formik';
import * as yup from 'yup';

import { useNavigate } from "react-router-dom";

// function useLogin(submittedInfo)
// {
//
//         const navigate = useNavigate()
//
//         http.get('/sanctum/csrf-cookie')
//         .then(response => {
//                 console.log(response)
//
//                 let queryBody = new FormData()
//
//                 queryBody.append("num_inspector",  submittedInfo.num_inspector)
//                 queryBody.append("password", submittedInfo.pwd)
//
//                 // console.log(queryBody)
//
//                 http.post('/login', queryBody)
//                 .then(
//                 res =>
//                 {
//                         console.log(res)
//
//                         navigate("/files")
//
//                 })
//                 .catch(err => {console.log(err)})
//
//
//
//         })
//         .catch(err => {console.log(err)})
//
// }


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

        var handleSubmit = function handleSubmit(submittedInfo) {
                console.log(submittedInfo);

                var queryBody = new FormData();

                queryBody.append("num_inspector", submittedInfo.num_inspector);
                queryBody.append("password", submittedInfo.pwd);

                // console.log(queryBody)

                http.post('/login', queryBody).then(function (res) {
                        console.log(res);

                        navigate("/files");
                }).catch(function (err) {
                        console.log(err);
                });
        };

        var validationRules = yup.object().shape({
                num_inspector: yup.string().required(),
                pwd: yup.string().required()
        });

        return React.createElement(
                Container,
                {
                        style: {
                                width: 400,
                                justifyContent: 'center',
                                position: 'relative',
                                alignItems: 'center'
                        }
                },
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
                                                React.createElement(Form.Control, {
                                                        name: 'num_inspector',
                                                        value: values.num_inspector,
                                                        onChange: handleChange,
                                                        type: 'text',
                                                        placeholder: '...',
                                                        isInvalid: !!errors.num_inspector
                                                }),
                                                React.createElement(
                                                        Form.Control.Feedback,
                                                        { type: 'invalid' },
                                                        msg_err
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
                                                React.createElement(Form.Control, {
                                                        name: 'pwd',
                                                        value: values.pwd,
                                                        onChange: handleChange,
                                                        type: 'text',
                                                        placeholder: '...',
                                                        isInvalid: !!errors.pwd
                                                }),
                                                React.createElement(
                                                        Form.Control.Feedback,
                                                        { type: 'invalid' },
                                                        msg_err
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
        );
}