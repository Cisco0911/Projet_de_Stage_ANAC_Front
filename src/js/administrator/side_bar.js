/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import Stack from "@mui/material/Stack";
import { Button, Tooltip } from "@mui/material";

export default function Side_bar(_ref) {
        var options = _ref.options,
            setOption = _ref.setOption;


        return React.createElement(
                "div",
                { className: "navigation_content full_size_element" },
                React.createElement(
                        "div",
                        { className: "anac_logo",
                                style: {
                                        // height: 88,
                                        width: "100%",
                                        marginBottom: 20
                                }
                        },
                        React.createElement(
                                "a",
                                { href: "/", className: "full_size_element" },
                                React.createElement("img", { className: "full_size_element", src: window.location.origin + "/Favicon_anac.png", alt: "logo" })
                        )
                ),
                React.createElement(
                        "div",
                        { className: "sections_div",
                                style: {
                                        height: "100%"
                                }
                        },
                        React.createElement(
                                Stack,
                                { direction: "column", spacing: 2, className: "full_size_element" },
                                options.map(function (section, idx) {
                                        // console.log(sections)
                                        return React.createElement(
                                                Tooltip,
                                                { key: section.id, title: section.name, placement: "right-start" },
                                                React.createElement(
                                                        "span",
                                                        { className: "full_size_element" },
                                                        React.createElement(
                                                                Button,
                                                                { className: "d-flex p-2 full_size_element", tabIndex: -1, variant: "" + (section.isSelected ? "outlined" : "text"),
                                                                        style: {
                                                                                borderColor: "blue"
                                                                        },
                                                                        disabled: section.isSelected,
                                                                        onClick: function onClick() {
                                                                                return setOption(section.id);
                                                                        }
                                                                },
                                                                React.createElement(
                                                                        "b",
                                                                        {
                                                                                style: {
                                                                                        maxWidth: "100%",
                                                                                        overflow: "hidden",
                                                                                        textOverflow: 'ellipsis',
                                                                                        color: "" + (window.Global_State.selectedSectionId === section.id ? '' : 'blue')
                                                                                }
                                                                        },
                                                                        section.name
                                                                )
                                                        )
                                                )
                                        );
                                })
                        )
                )
        );
}