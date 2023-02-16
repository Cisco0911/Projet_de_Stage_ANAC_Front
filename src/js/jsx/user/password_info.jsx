/* eslint-disable import/first */

import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {http} from "../auth/login";
import swal from "sweetalert";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import {TiUserAdd} from "react-icons/ti";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {FaUserTie} from "react-icons/fa";
import Stack from "@mui/material/Stack";
import {RiLockPasswordFill} from "react-icons/ri";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import Button from "react-bootstrap/Button";








export default function Password_info()
{

        const navigate = useNavigate()

        const msg_err = "Valeur de champ invalide"

        const [showPassword, setShowPassword] = useState(false)

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        const handleSubmit = (submittedInfo) =>
        {

                console.log(submittedInfo)

                let queryBody = new FormData()

                queryBody.append("name",  submittedInfo.name)
                queryBody.append("password", submittedInfo.pwd)
                queryBody.append("password_confirmation", submittedInfo.pwd_confirm)

                // console.log(queryBody)

                http.post('/register', queryBody)
                .then(
                res =>
                {
                        console.log(res)

                })
                .catch(err =>
                {

                        console.log(err)
                })

        };

        const validationRules = yup.object().shape({
                name: yup.string().required("champ récquis"),
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
                                name: '',
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
                                                <Stack className="full_size_element" direction={"row"} spacing={2} justifyContent={"space-around"} >
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
