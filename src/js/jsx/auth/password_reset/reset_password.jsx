/* eslint-disable import/first */

import React, {useEffect, useState} from "react";

import {http} from "../login";

import {useLocation, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {Formik} from "formik";

import Container from "react-bootstrap/Container";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

import {TiUserAdd} from "react-icons/ti";
import {RiLockPasswordFill} from "react-icons/ri";
import {VscEye, VscEyeClosed} from "react-icons/vsc";

import Stack from "@mui/material/Stack";
import {LoadingButton} from "@mui/lab";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import swal from "sweetalert";








export default function Reset_password()
{
        useEffect(
        () =>
        {
                http.get('/sanctum/csrf-cookie')
                .then(response => {
                        console.log("csrf cookie set", response)
                })
                .catch(err => {console.log(err)})
        }, []
        )

        const navigate = useNavigate()

        const location = useLocation();

        // Extract the query parameters from the URL
        const queryParams = new URLSearchParams(location.search);

        // Get the value of a specific query parameter
        const [token, email] = [queryParams.get('token'), queryParams.get('email')];

        console.log(token, email)

        const [showPassword, setShowPassword] = useState(false)
        const [loading, setLoading] = useState(false)

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        const handleSubmit = (submittedInfo) =>
        {

                console.log(submittedInfo)

                setLoading(true)

                let queryBody = new FormData()

                queryBody.append("email", email)
                queryBody.append("token", token)
                queryBody.append("password", submittedInfo.pwd)
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm)

                // console.log(queryBody)

                http.post('/reset-password', queryBody)
                .then(
                res =>
                {
                        console.log(res)
                        setLoading(false)
                        navigate("/login")

                })
                .catch(err =>
                {
                        console.log(err)
                        setLoading(false)
                        swal({
                                title: "ERROR!",
                                text: err.response.data.message,
                                icon: "error",
                        });
                })

        };

        const validationRules = yup.object().shape({
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

        const theme = createTheme({
                typography: {
                        fontFamily: '"Josefin Sans", sans-serif',
                        userDropButton:
                        {
                                '&:hover':
                                {
                                        color: '#6c757d',
                                },
                        },

                },
        });

        // console.log("pwddddddddd", pwd)
        return (
        <ThemeProvider theme={theme} >
                <div className="full_size_element d-flex justify-content-center align-items-center position-relative" >
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
                                                     backgroundColor: 'white',
                                                     borderRadius: "100%",
                                             }}
                                        >
                                                <div className="anac_logo">
                                                        <a href="/" className="full_size_element">
                                                                <img className="full_size_element" src={`${window.location.origin}/Favicon_anac.png`} alt="logo"/>
                                                        </a>
                                                </div>
                                        </div>
                                </div>
                                <Formik
                                validationSchema={validationRules}
                                onSubmit={ handleSubmit }
                                initialValues={{
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
                                                        <Stack className="full_size_element" direction={"column"} spacing={2} justifyContent={"space-around"} >
                                                                <Form.Group className="mb-3" >
                                                                        <Form.Label>EMAIL</Form.Label>
                                                                        <InputGroup>
                                                                                <InputGroup.Text>
                                                                                        @
                                                                                </InputGroup.Text>
                                                                                <Form.Control
                                                                                name="email"
                                                                                value={email}
                                                                                onChange={handleChange}
                                                                                type={ "email" }
                                                                                color="white"
                                                                                style={{ color: "inherit" }}
                                                                                readOnly
                                                                                />
                                                                        </InputGroup>
                                                                </Form.Group>
                                                                <Form.Group className="mb-3" >
                                                                        <Form.Label>Nouveau mot de passe</Form.Label>
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
                                                        </Stack>

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
                                                                <LoadingButton loading={loading} variant="primary" type="submit">
                                                                        RESET
                                                                </LoadingButton>
                                                        </div>
                                                </Form>
                                                )
                                        }

                                </Formik>
                        </Container>
                </div>
        </ThemeProvider>

        )


}
