/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';
import axios from "axios";
import swal from 'sweetalert';

import { http } from "../data";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Formik } from 'formik';
import * as yup from 'yup'

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


export default function Login()
{

        const navigate = useNavigate()

        const msg_err = "Valeur de champ invalide"

        useEffect(
                () =>
                {
                        http.get('/sanctum/csrf-cookie')
                        .then(response => {
                                console.log(response)
                        })
                        .catch(err => {console.log(err)})
                }, []
        )

        const handleSubmit = (submittedInfo) =>
        {
                console.log(submittedInfo)

                let queryBody = new FormData()

                queryBody.append("num_inspector",  submittedInfo.num_inspector)
                queryBody.append("password", submittedInfo.pwd)

                // console.log(queryBody)

                http.post('/login', queryBody)
                .then(
                res =>
                {
                        console.log(res)

                        navigate("/files")

                })
                .catch(err => {console.log(err)})

        };

        const validationRules = yup.object().shape({
                num_inspector: yup.string().required(),
                pwd: yup.string().required(),
        });


        return (
        <Container
        style = {
                {
                        width: 400,
                        justifyContent: 'center',
                        position: 'relative',
                        alignItems: 'center',
                }
        }
        >
                <Formik
                validationSchema={validationRules}
                onSubmit={ handleSubmit }
                initialValues={{
                        num_inspector: '',
                        pwd: '',
                }}
                >
                        {
                                (
                                {
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        touched,
                                        isValid,
                                        errors,
                                }
                                ) =>
                                (
                                <Form value = {undefined} onSubmit={handleSubmit} >
                                        <Form.Group className="mb-3" >
                                                <Form.Label>Numero Inspecteur</Form.Label>
                                                <Form.Control
                                                name="num_inspector"
                                                value={values.num_inspector}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="..."
                                                isInvalid={!!errors.num_inspector}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                        {msg_err}
                                                </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                                <Form.Label>Mot de passe</Form.Label>
                                                <Form.Control
                                                name="pwd"
                                                value={values.pwd}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="..."
                                                isInvalid={!!errors.pwd}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                        {msg_err}
                                                </Form.Control.Feedback>
                                        </Form.Group>
                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                }
                                        }
                                        >
                                                <Button variant="primary" type="submit">
                                                        Connexion
                                                </Button>
                                        </div>
                                </Form>
                                )
                        }

                </Formik>
        </Container>

        )


}


