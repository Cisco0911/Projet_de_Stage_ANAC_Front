/* eslint-disable import/first */

import React, {useState} from 'react';

import {http} from "../login";

import Container from "react-bootstrap/Container";
import {Link, TextField} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import Stack from "@mui/material/Stack";
















export default function Forgot_password()
{
        const [email, setEmail] = useState('')
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [emailSent, setEmailSent] = useState(false)

        const reset = e =>
        {
                setLoading(true)

                const onFulfilled = (res) =>
                {
                        console.log(`reseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet${email}`, res)
                        setLoading(false)
                        setError(null)
                        setEmailSent(true)
                        // if (res.data.statue === "success")
                        // {
                        //         // window.Global_State.updateAuthUserInfo(res.data.data)
                        //         setValue('')
                        //         window.show_response(`${label} mis á jour !`, "success")
                        // }
                        // else window.show_response(res.data.data.msg, res.data.statue)

                }
                const onRejected = (err) =>
                {
                        console.log(err)
                        setLoading(false)
                        setError(err.response.data.message)
                        setEmailSent(false)
                        // window.show_response(`${err.message} ${err.response.data.message}`, "error")
                }

                http.post("/forgot-password", {email})
                .then( onFulfilled, onRejected )

        }

        const handleChange = e =>
        {
                setEmail(e.target.value)
        }

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

        const Success_msg = () => <span className="text-success" style={{ fontWeight: "bold" }} >
                {
                        emailSent ? `Lien de réinitialisation a été envoyé à l'adresse ${email}` : ''
                }
        </span>

        return(
        <ThemeProvider theme={theme}>
                <div className="full_size_element d-flex flex-column justify-content-center align-items-center position-relative" >
                        <Container
                        style = {
                                {
                                        width: "90%",
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center',
                                        // backgroundColor: "rgba(12,146,241,0.34)",
                                        padding: "40px 20px",
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
                                <Stack direction={"column"} spacing={3} >
                                        <TextField
                                        color={ emailSent ? "success" : '' }
                                        sx={{
                                                width: "100%"
                                        }}
                                        size={"small"}
                                        id={`forgot_password`}
                                        label={"Email ..."}
                                        autoFocus
                                        type={"email"}
                                        error={Boolean(error)}
                                        helperText={ error || <Success_msg /> }
                                        value={email}
                                        onChange={handleChange}
                                        />
                                        <LoadingButton loading={loading} onClick={reset} sx={{
                                                width: "100%"
                                        }}>
                                                send email
                                        </LoadingButton>
                                </Stack>
                        </Container>
                </div>
        </ThemeProvider>
        )
}