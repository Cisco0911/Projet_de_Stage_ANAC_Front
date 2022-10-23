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






function useLogin(submittedInfo, redirect) 
{
    http.get('/sanctum/csrf-cookie')
    .then(response => {
        console.log(response)

        let queryBody = new FormData()

        queryBody.append("num_inspector",  submittedInfo.num_inspector)
        queryBody.append("password", submittedInfo.pwd)

        // console.log(queryBody)

        http.post('/login', queryBody)
        .then(
            res => 
            {
                console.log(res)
                // http.get('user').then(res => {console.log(res)})
                redirect()

            })
        .catch(err => {console.log(err)})



    })
    .catch(err => {console.log(err)})
    
}


export default function Login({redirectTo})
{


    const msg_err = "Valeur de champ invalide"

    const useHandleSubmit = (submittedInfo) => {

        const response = useLogin(submittedInfo, redirectTo)

        console.log(submittedInfo)
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
            onSubmit={ useHandleSubmit }
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


