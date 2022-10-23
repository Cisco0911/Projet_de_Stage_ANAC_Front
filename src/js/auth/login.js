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

function useLogin(submittedInfo, redirect) {
    http.get('/sanctum/csrf-cookie').then(function (response) {
        console.log(response);

        var queryBody = new FormData();

        queryBody.append("num_inspector", submittedInfo.num_inspector);
        queryBody.append("password", submittedInfo.pwd);

        // console.log(queryBody)

        http.post('/login', queryBody).then(function (res) {
            console.log(res);
            // http.get('user').then(res => {console.log(res)})
            redirect();
        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        console.log(err);
    });
}

export default function Login(_ref) {
    var redirectTo = _ref.redirectTo;


    var msg_err = "Valeur de champ invalide";

    var useHandleSubmit = function useHandleSubmit(submittedInfo) {

        var response = useLogin(submittedInfo, redirectTo);

        console.log(submittedInfo);
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
                onSubmit: useHandleSubmit,
                initialValues: {
                    num_inspector: '',
                    pwd: ''
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