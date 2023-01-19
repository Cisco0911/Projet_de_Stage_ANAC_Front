/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';
import axios from "axios";
import swal from 'sweetalert';

import { http } from "./login";

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
import {RiLockPasswordFill} from "react-icons/ri"
import {FaUserTie} from "react-icons/fa"
import {TiUserAdd} from "react-icons/ti"

import Stack from "@mui/material/Stack";
import toast, {Toaster} from "react-hot-toast";




export default function Create_account()
{

        const navigate = useNavigate()

        const msg_err = "Valeur de champ invalide"

        const [showPassword, setShowPassword] = useState(false)

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        const handleSubmit = (submittedInfo) =>
        {
                toast( "Creating new account...",
                        {
                                id: "new_account",
                                type: "loading",
                                duration: Infinity
                        }
                )

                console.log(submittedInfo)

                let queryBody = new FormData()

                queryBody.append("name",  submittedInfo.name)
                queryBody.append("snd_name",  submittedInfo.second_name)
                queryBody.append("num_inspector",  submittedInfo.num_inspector)
                queryBody.append("email",  submittedInfo.email)
                queryBody.append("password", submittedInfo.pwd)
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm)

                // console.log(queryBody)

                http.post('/register', queryBody)
                .then(
                res =>
                {
                        console.log(res)

                        toast("Compte crée avec success",
                                {
                                        id: "new_account",
                                        type: "success",
                                        duration: 2000
                                }
                        )

                        navigate("/login")

                })
                .catch(err =>
                {
                        toast.dismiss("new_account")

                        console.log(err)
                        swal({
                                title: "Error",
                                text: err.response.data.message,
                                icon: "error"
                        })
                })

        };

        const validationRules = yup.object().shape({
                num_inspector: yup.string().required("champ récquis"),
                name: yup.string().required("champ récquis"),
                second_name: yup.string().required("champ récquis"),
                email: yup.string().required("champ récquis").email("email non valide"),
                pwd: yup.string()
                .required("champ récquis")
                .min(8, "minimum 8 charactères")
                .max(25, "maximum 25 charactères")
                .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                'doit contenir au moins une majuscule, une minuscule, un chiffre, une charactère spécial'
                ),
                pwd_confirm: yup.string().required("champ récquis").oneOf([yup.ref('pwd'), null], "les mots de passe doivent être les même"),
        });


        // console.log("pwddddddddd", pwd)
        return (
        <div className="full_size_element d-flex justify-content-center align-items-center position-relative" >
                <Toaster
                toastOptions={{
                        // Define default options
                        className: '',
                        duration: 3000,
                        position: 'top-right',
                        style:
                        {
                                maxWidth: 1920,
                                // background: 'yellow',
                        },

                        // Default options for specific types
                        // success: {
                        //     duration: 3000,
                        //     theme: {
                        //         primary: 'green',
                        //         secondary: 'black',
                        //     },
                        // }
                }}
                />
                <Container
                        style = {
                                {
                                        width: "90%",
                                        minHeight: 'fit-content',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center',
                                        // backgroundColor: "rgba(12,146,241,0.34)",
                                        padding: "20px 10px",
                                        border: "solid blue",
                                        borderRadius: "20px",
                                        // color: "whitesmoke"
                                }
                        }
                >
                        <div className="custom_login_header d-none d-sm-flex" >
                                <div className="d-flex justify-content-center align-items-center "
                                        style={{
                                                height: "100%",
                                                width: 80,
                                                backgroundColor: 'blue',
                                                borderRadius: "100%",
                                        }}
                                >
                                        <TiUserAdd size={50} color="white" />
                                </div>
                        </div>
                        <Formik
                        validationSchema={validationRules}
                        onSubmit={ handleSubmit }
                        initialValues={{
                                num_inspector: '',
                                email: '',
                                name: '',
                                second_name: '',
                                pwd: '',
                                pwd_confirm: '',
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
                                                                        {errors.num_inspector}
                                                                </Form.Control.Feedback>
                                                        </InputGroup>
                                                </Form.Group>

                                                <Stack className="full_size_element" direction={"row"} spacing={2} justifyContent={"space-around"} >

                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Nom</Form.Label>
                                                                <InputGroup>
                                                                        <Form.Control
                                                                        name="name"
                                                                        value={values.name}
                                                                        onChange={handleChange}
                                                                        type="text"
                                                                        placeholder="Ex: Ibn Fumilayô"
                                                                        color="white"
                                                                        style={{ color: "inherit" }}
                                                                        isInvalid={!!errors.name}
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">
                                                                                {errors.name}
                                                                        </Form.Control.Feedback>
                                                                </InputGroup>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Prénom</Form.Label>
                                                                <InputGroup>
                                                                        <Form.Control
                                                                        name="second_name"
                                                                        value={values.second_name}
                                                                        onChange={handleChange}
                                                                        type="text"
                                                                        placeholder="Ex: Ômôdada"
                                                                        color="white"
                                                                        style={{ color: "inherit" }}
                                                                        isInvalid={!!errors.second_name}
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">
                                                                                {errors.second_name}
                                                                        </Form.Control.Feedback>
                                                                </InputGroup>
                                                        </Form.Group>
                                                </Stack>

                                                <Form.Group className="mb-3" >
                                                        <Form.Label>Email</Form.Label>
                                                        <InputGroup>
                                                                <InputGroup.Text>
                                                                        @
                                                                </InputGroup.Text>
                                                                <Form.Control
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                type="email"
                                                                placeholder="Ex: omodada1@gmail.com"
                                                                color="white"
                                                                style={{ color: "inherit" }}
                                                                isInvalid={!!errors.email}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {errors.email}
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
                                                                        {errors.pwd}
                                                                </Form.Control.Feedback>
                                                        </InputGroup>
                                                </Form.Group>
                                                <Form.Group className="mb-3" >
                                                        <Form.Label>Confirmer le mot de passe</Form.Label>
                                                        <InputGroup>
                                                                <InputGroup.Text>
                                                                        <RiLockPasswordFill />
                                                                </InputGroup.Text>
                                                                <Form.Control
                                                                name="pwd_confirm"
                                                                value={values.pwd_confirm}
                                                                onChange={handleChange}
                                                                type={ `${ showPassword ? "text" : "password" }` }
                                                                placeholder="confirm password"
                                                                color="white"
                                                                style={{ color: "inherit" }}
                                                                isInvalid={!!errors.pwd_confirm}
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
                                                                        {errors.pwd_confirm}
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
        </div>

        )


}


