/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useMemo, useReducer } from 'react';

import { Global_State } from "../main";
import { http } from "../data";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import { AiTwotoneSetting } from "react-icons/ai";

export default function QuickSettings() {

        var AntSwitch = useMemo(function () {
                return styled(Switch)(function (_ref) {
                        var theme = _ref.theme;
                        return {
                                width: 35,
                                height: 16,
                                padding: 0,
                                display: 'flex',
                                '&:active': {
                                        '& .MuiSwitch-thumb': {
                                                width: 22
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                                transform: 'translateX(9px)'
                                        }
                                },
                                '& .MuiSwitch-switchBase': {
                                        padding: 2,
                                        '&.Mui-checked': {
                                                transform: 'translateX(12px)',
                                                color: '#fff',
                                                '& + .MuiSwitch-track': {
                                                        opacity: 1,
                                                        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#0062ff'
                                                }
                                        }
                                },
                                '& .MuiSwitch-thumb': {
                                        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                                        width: 18,
                                        height: 12,
                                        borderRadius: 6,
                                        transition: theme.transitions.create(['width'], {
                                                duration: 200
                                        })
                                },
                                '& .MuiSwitch-track': {
                                        borderRadius: 16 / 2,
                                        opacity: 1,
                                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
                                        boxSizing: 'border-box'
                                }
                        };
                });
        }, []);

        // const switchRef = document.getElementById('switchRef')


        var settingButton = React.createElement(
                IconButton,
                { "aria-label": "settings", style: { width: 36, height: 36, overflowWrap: 'break-word' } },
                React.createElement(AiTwotoneSetting, { size: 30 })
        );

        var handleChange = function handleChange(e) {
                e.preventDefault();
                e.stopPropagation();
                Global_State.changeMode();
        };

        var renderingComponent = React.createElement(
                List,
                { sx: { minWidth: 250, maxWidth: 390 }, onClick: function onClick(e) {
                                e.preventDefault();e.stopPropagation();
                        } },
                React.createElement(
                        ListItem,
                        { key: 'mode éditeur' },
                        React.createElement(
                                Stack,
                                { direction: "row", spacing: 1, alignItems: "center" },
                                React.createElement(AntSwitch, { id: 'switchRef', checked: Global_State.isEditorMode, onClick: handleChange }),
                                React.createElement(
                                        "label",
                                        { style: { width: 'max-content', cursor: 'pointer' }, htmlFor: 'switchRef', onClick: handleChange },
                                        " ",
                                        (Global_State.editorMode ? 'désactiver' : 'activer') + " le mode \xE9diteur",
                                        " "
                                )
                        ),
                        React.createElement(Divider, null)
                )
        );

        return React.createElement(Global_State.CustomDropDown, { id: 'settingPanel', icon: settingButton, content: renderingComponent });
}