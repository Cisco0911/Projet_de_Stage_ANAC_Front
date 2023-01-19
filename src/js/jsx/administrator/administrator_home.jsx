/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';
import axios from "axios";
import swal from 'sweetalert';

import {http} from "../auth/login";
import Loaded_administrator_page from "./loaded_administrator_page";

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
import {Toaster} from "react-hot-toast";
import {createTheme, ThemeProvider} from "@mui/material/styles";





function fetch_data(setData_base, setErr)
{
        new Promise(
        (resolve, reject) =>
        {
                http.get("administrative_data")
                .then(
                res =>
                {
                        console.log(res)
                        resolve(res.data)
                }
                )
                .catch(
                err =>
                {
                        console.log(err)
                        reject(new Error(`${err.message}\n${err.response.data.message}`))
                }
                )
        }
        )
        .then( data => setData_base(data) )
        .catch( err =>  setErr(err.message) )
}


export default function Administrator_home()
{



        const [Data_Base, setData_base] = useState(null)
        const [err, setErr] = useState(null)

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        const container  = Data_Base === null ? <div className="preloader"> <div className="preloader-icon" /> </div> : <Loaded_administrator_page datas={Data_Base} />

        useEffect(
        () =>
        {
                fetch_data(setData_base, setErr)
        }, [])

        window.reload = () => fetch_data(setData_base, setErr)


        console.log("render_administrator")


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

        return(
                <ThemeProvider theme={theme}>
                        <div className="full_size_element d-flex justify-content-center align-items-center"
                             style={{
                                     textAlign: "center"
                             }}
                        >
                                <div>
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
                                </div>
                                { err || container }
                        </div>
                </ThemeProvider>
        )

}


