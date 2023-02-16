var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";

import { http } from "../auth/login";
import Side_bar from "./side_bar";
import Header_bar from "./header_bar";
import User_admin_section from "./user_section";
import Service_admin_section from "./service_section";
import Section_admin_section from "./section_section";
import History_admin_section from "./history_section";

import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

var options_init_state = [{
        id: 1,
        name: "Users",
        isSelected: true
}, {
        id: 2,
        name: "Services",
        isSelected: false
}, {
        id: 3,
        name: "Sections",
        isSelected: false
}, {
        id: 4,
        name: "History",
        isSelected: false
}];
function option_reducer(state, action) {
        var new_state = state;
        switch (action.type) {
                case "select_section":
                        {
                                new_state = [].concat(_toConsumableArray(new_state)).map(function (option) {
                                        return option.id === action.id ? Object.assign({}, option, { isSelected: true }) : Object.assign({}, option, { isSelected: false });
                                });

                                break;
                        }
        }

        return new_state;
}

export default function Loaded_administrator_page(_ref) {
        var datas = _ref.datas;


        window.datas = datas;

        var _useReducer = useReducer(option_reducer, options_init_state, function () {
                return options_init_state;
        }),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            adimin_options = _useReducer2[0],
            dispatch_options_state = _useReducer2[1];

        var sections = {
                1: React.createElement(User_admin_section, { users: datas.users, new_users: datas.new_users }),
                2: React.createElement(Service_admin_section, { services: datas.services }),
                3: React.createElement(Section_admin_section, { sections: datas.sections }),
                4: React.createElement(History_admin_section, { histories: datas.history || [] })
        };

        var selectedSection = adimin_options.find(function (option) {
                return option.isSelected === true;
        }).id;

        return React.createElement(
                "div",
                { className: "full_size_element d-flex justify-content-between align-items-center",
                        style: {
                                backgroundColor: "whitesmoke"
                        }
                },
                React.createElement(
                        "div",
                        { style: {
                                        minWidth: '110px',
                                        width: 110,
                                        height: "100%",
                                        position: "static",
                                        borderRight: "thin dashed blue",
                                        borderRadius: "0 10px 10px 0",
                                        backgroundColor: "white"
                                } },
                        React.createElement(Side_bar, { options: adimin_options, setOption: function setOption(id) {
                                        dispatch_options_state({ type: "select_section", id: id });
                                } })
                ),
                React.createElement(
                        "div",
                        { className: "d-flex flex-column justify-content-between align-items-center",
                                style: {
                                        width: "100%",
                                        height: "100%",
                                        margin: "0 5px"
                                }
                        },
                        React.createElement(
                                "div",
                                { className: "d-flex justify-content-center align-items-center",
                                        style: {
                                                height: 50,
                                                minHeight: 50,
                                                width: "100%",
                                                borderRadius: 10,
                                                backgroundColor: "white",
                                                marginBottom: 5
                                        }
                                },
                                React.createElement(Header_bar, { user: datas.auth })
                        ),
                        React.createElement(
                                "div",
                                { id: "section_display", className: "full_size_element",
                                        style: {
                                                backgroundColor: "white",
                                                borderRadius: 10
                                        }
                                },
                                sections["" + selectedSection]
                        )
                )
        );
}