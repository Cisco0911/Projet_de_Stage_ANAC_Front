/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import {TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import {IoSaveOutline} from "react-icons/io5";
import {LoadingButton} from "@mui/lab";
import {http} from "../auth/login";










export default function Info_field({label, type, default_value, info_name})
{
        const [value, setValue] = useState('')
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(false)

        const handleChange = e =>
        {
                setValue(e.target.value)
        }

        const update = e =>
        {
                setLoading(true)

                const queryBody = new FormData()

                queryBody.append(info_name, value)

                const onFulfilled = (res) =>
                {
                        console.log(`uuuuuuuuuuuuuuuuuuuuuuuuuuuupdate_${info_name}`, res, window.Global_State)
                        setLoading(false)
                        if (res.data.statue === "success")
                        {
                                // window.Global_State.updateAuthUserInfo(res.data.data)
                                setValue('')
                                window.show_response(`${label} mis á jour !`, "success")
                        }
                        else window.show_response(res.data.data.msg, res.data.statue)

                }
                const onRejected = (err) =>
                {
                        setLoading(false)
                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                }

                http.post(`update_${info_name}`, queryBody)
                .then(onFulfilled, onRejected)
        }


        return(
                <div className="full_size_element d-flex justify-content-center align-items-center" style={{
                        maxHeight: "fit-content",
                }} >
                        <Stack className="full_size_element" direction={"column"} spacing={1} justifyContent={"center"} alignItems={"center"} >
                                <Stack direction={"row"} spacing={3}
                                       sx={{
                                               width: "100%"
                                       }}>
                                        <TextField
                                        sx={{
                                                width: "100%"
                                        }}
                                        // size={"small"}
                                        id={`Info_field_${label}`}
                                        label={label}
                                        focused
                                        placeholder={default_value}
                                        type={type}
                                        error={Boolean(error)}
                                        value={value}
                                        onChange={handleChange}
                                        autoComplete={''}
                                        />
                                        <LoadingButton loading={loading} variant={"outlined"} color={"primary"} onClick={update} >
                                                <IoSaveOutline style={{ width: "100%", height: "100%" }} />
                                        </LoadingButton>
                                </Stack>
                                {
                                        error && <span className="text-danger ml-2" > {error} </span>
                                }
                        </Stack>
                </div>
        )
}