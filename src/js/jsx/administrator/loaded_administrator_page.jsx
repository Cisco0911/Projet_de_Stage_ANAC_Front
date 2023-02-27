/* eslint-disable import/first */

import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";

import {http} from "../auth/login";
import Side_bar from "./side_bar";
import Header_bar from "./header_bar";
import User_admin_section from "./user_section";
import Service_admin_section from "./service_section";
import Section_admin_section from "./section_section";
import History_admin_section from "./history_section";

import {Button} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';








const options_init_state =
[
        {
                id: 1,
                name: "Users",
                isSelected: true,
        },
        {
                id: 2,
                name: "Services",
                isSelected: false,
        },
        {
                id: 3,
                name: "Sections",
                isSelected: false,
        },
        {
                id: 4,
                name: "History",
                isSelected: false,
        },
]
function option_reducer(state, action)
{
        let new_state = state
        switch (action.type)
        {
                case "select_section":
                {
                        new_state = [...new_state].map(
                                option =>
                                (
                                        option.id === action.id ? { ...option, isSelected: true } : { ...option, isSelected: false }
                                )
                        )

                        break
                }
        }

        return new_state
}


export default function Loaded_administrator_page({datas})
{

        window.datas = datas

        const [adimin_options, dispatch_options_state] = useReducer(option_reducer, options_init_state, () => options_init_state )

        const sections =
        {
                1: <User_admin_section users={datas.users} new_users={datas.new_users} />,
                2: <Service_admin_section services={datas.services} />,
                3: <Section_admin_section sections={datas.sections} />,
                4: <History_admin_section history={datas.history || []} />,
        }

        const selectedSection = adimin_options.find( option => option.isSelected === true ).id


        return(
                <div className="full_size_element d-flex justify-content-between align-items-center"
                     style={{
                             backgroundColor: "whitesmoke",
                     }}
                >
                        <div style={{
                                minWidth: '110px',
                                width: 110,
                                height: "100%",
                                position: "static",
                                borderRight: "thin dashed blue",
                                borderRadius: "0 10px 10px 0",
                                backgroundColor: "white"
                        }} >
                                <Side_bar options={adimin_options} setOption={ id => { dispatch_options_state({type: "select_section", id}) } } />
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-center"
                             style={{
                                width: "100%",
                                height: "100%",
                                margin: "0 5px",
                             }}
                        >
                                <div className="d-flex justify-content-center align-items-center"
                                style={{
                                        height: 50,
                                        minHeight: 50,
                                        width: "100%",
                                        borderRadius: 10,
                                        backgroundColor: "white",
                                        marginBottom: 5,
                                }}
                                >
                                        <Header_bar user={datas.auth} />
                                </div>
                                <div id="section_display" className="full_size_element"
                                     style={{
                                             backgroundColor: "#ffffff00",
                                             borderRadius: 10,
                                     }}
                                >
                                        {sections[`${selectedSection}`]}
                                </div>

                        </div>
                </div>
        )
}