/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";
import Alert from "@mui/material/Alert";










function Activity({data})
{
        let severity

        switch (data.operation)
        {
                case 'add':
                        severity = "info"
                        break
                case 'delete':
                        severity = "error"
                        break
                case "validate":
                        severity = "info";
                        break
                case "invalidate":
                        severity = "info";
                        break
                case "close":
                        severity = "info";
                        break
                case "set_review":
                        severity = "info";
                        break
                case "set_opening":
                        severity = "info";
                        break
                case "copy":
                        severity = "info";
                        break
                default:
                        severity = "warning"
        }

        return(
        <React.Fragment>
                <Stack direction={"row"} spacing={1} width={"100%"} className="d-none d-sm-flex" >
                        <Alert severity={severity} style={{ fontSize: 12 }} >
                                { data.msg }
                        </Alert>
                        <Alert severity={severity} icon={false} style={{ fontSize: 12, flex: "1 0 0%", minWidth: 135, justifyContent: "end" }} >
                                { new Date(data.created_at).toDateString() }
                        </Alert>
                </Stack>
                <Stack direction={"column"} spacing={1} width={"100%"} className="d-sm-none" >
                        <Alert severity={severity} style={{ fontSize: 10}} >
                                { data.msg }
                        </Alert>
                        <Alert severity={severity} icon={false} style={{ fontSize: 10, justifyContent: "end" }} >
                                { new Date(data.created_at).toDateString() }
                        </Alert>
                </Stack>
        </React.Fragment>

        )
}

export default function History_admin_section({history})
{




        return(
        <div className="full_size_element" style={{ backgroundColor: "rgba(255,255,255,0)", paddingBottom: '5px' }} >
                <Stack className="full_size_element" direction={"column"} spacing={1} style={{ backgroundColor: "rgba(255,255,255,0)" }} >
                        <Box
                        style={{
                                minHeight: 100,
                                minWidth: "100%",
                                backgroundColor: "white",
                                borderRadius: 10,
                                border: "thin solid blue"
                        }}
                        >
                                Header
                        </Box>

                        <Box
                        style={{
                                minHeight: "100%",
                                minWidth: "100%",
                                backgroundColor: "white",
                                borderRadius: 10,
                                flex: '1 0 0%',
                                padding: 20,
                                overflowY: "auto"
                        }}
                        >
                                <Stack direction={"column"} spacing={1} >
                                        {
                                                history.map(
                                                        activity => <Activity key={activity.id} data={activity} />
                                                )
                                        }
                                </Stack>
                        </Box>
                </Stack>
        </div>
        )
}