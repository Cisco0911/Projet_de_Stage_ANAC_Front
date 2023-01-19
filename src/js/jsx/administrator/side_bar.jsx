/* eslint-disable import/first */

import React, {useState, useEffect} from 'react';

import Stack from "@mui/material/Stack";
import {Button, Tooltip} from "@mui/material";















export default function Side_bar ({options, setOption})
{

        return (
        <div className="navigation_content full_size_element" >
                <div className="anac_logo"
                     style={{
                             // height: 88,
                             width: "100%",
                             marginBottom: 20,
                     }}
                >
                        <a href="/" className="full_size_element">
                                <img className="full_size_element" src={`${window.location.origin}/Favicon_anac.png`} alt="logo"/>
                        </a>
                </div>
                <div className="sections_div"
                     style={{
                             height: "100%"
                     }}
                >
                        <Stack direction={`column`} spacing={2} className="full_size_element">
                                {
                                        options.map(
                                        (section, idx) =>
                                        {
                                                // console.log(sections)
                                                return (
                                                <Tooltip key={ section.id } title={section.name} placement="right-start" >
                                                        <span className="full_size_element" >
                                                                <Button className={`d-flex p-2 full_size_element`} tabIndex={-1} variant={`${section.isSelected ? "outlined" : "text"}`}
                                                                        style={{
                                                                                borderColor: "blue"
                                                                        }}
                                                                        disabled={section.isSelected}
                                                                        onClick = { () => setOption(section.id) }
                                                                >

                                                                        <b
                                                                        style={{
                                                                                maxWidth: "100%",
                                                                                overflow: "hidden",
                                                                                textOverflow: 'ellipsis',
                                                                                color: `${window.Global_State.selectedSectionId === section.id ? '' : 'blue'}`,
                                                                        }}
                                                                        >
                                                                                { section.name }
                                                                        </b>
                                                                </Button>
                                                        </span>
                                                </Tooltip>
                                                )
                                        }
                                        )
                                }
                        </Stack>
                </div>
        </div>
        );
}