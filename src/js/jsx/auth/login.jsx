/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';
import axios from "axios";
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {InputGroup} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Formik } from 'formik';
import * as yup from 'yup'

import { useNavigate } from "react-router-dom";

import {VscEyeClosed, VscEye} from "react-icons/vsc"
import {RiLockPasswordFill, RiMapPinUserFill} from "react-icons/ri"
import {FaUserTie, FaUserSecret} from "react-icons/fa"



export const http = axios.create({
        baseURL: 'https://api.anac-togo-file-manager.com',
        headers: {

        },
        withCredentials: true,
})

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


        const [showPassword, setShowPassword] = useState(false)

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

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

                        if ( !parseInt(res.data.user.id) ) navigate("/administrator")
                        else navigate("/files")

                })
                .catch(err => {console.log(err)})

        };

        const validationRules = yup.object().shape({
                num_inspector: yup.string().required(),
                pwd: yup.string().required(),
        });


        return (
        <div className="full_size_element d-flex flex-column justify-content-center align-items-center position-relative" >
                <Container
                        style = {
                                {
                                        width: "90%",
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center',
                                        backgroundColor: "rgba(12,146,241,0.34)",
                                        padding: "20px 10px",
                                        border: "solid blue",
                                        borderRadius: "20px",
                                        // color: "whitesmoke"
                                }
                        }
                >
                        <div className="custom_login_header" >
                                <div className="d-flex justify-content-center align-items-center "
                                        style={{
                                                height: "100%",
                                                width: 80,
                                                backgroundColor: 'blue',
                                                borderRadius: "100%",
                                        }}
                                >
                                        <FaUserSecret size={50} color="white" />
                                </div>
                        </div>
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
                                                        <InputGroup>
                                                                <InputGroup.Text>
                                                                        <FaUserTie />
                                                                </InputGroup.Text>
                                                                <Form.Control
                                                                name="num_inspector"
                                                                value={values.num_inspector}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Ex: 12345"
                                                                color="white"
                                                                style={{ color: "inherit" }}
                                                                isInvalid={!!errors.num_inspector}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {msg_err}
                                                                </Form.Control.Feedback>
                                                        </InputGroup>
                                                </Form.Group>

                                                <Form.Group className="mb-3" >
                                                        <Form.Label>Mot de passe</Form.Label>
                                                        <InputGroup>
                                                                <InputGroup.Text>
                                                                        <RiLockPasswordFill />
                                                                </InputGroup.Text>
                                                                <Form.Control
                                                                name="pwd"
                                                                value={values.pwd}
                                                                onChange={handleChange}
                                                                type={ `${ showPassword ? "text" : "password" }` }
                                                                placeholder="password"
                                                                color="white"
                                                                style={{ color: "inherit" }}
                                                                isInvalid={!!errors.pwd}
                                                                />
                                                                <InputGroup.Text className="text-muted">
                                                                        {
                                                                                !showPassword ?
                                                                                <VscEye onClick={toggleShowPassword} />
                                                                                :
                                                                                <VscEyeClosed onClick={toggleShowPassword} />
                                                                        }
                                                                </InputGroup.Text>
                                                                <Form.Control.Feedback type="invalid">
                                                                        {msg_err}
                                                                </Form.Control.Feedback>
                                                        </InputGroup>
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
                <span className="mt-3">
                        don't have account ? <a id="sign_in" href="/sign_in" >Sign in</a>
                </span>
        </div>

        )


}


