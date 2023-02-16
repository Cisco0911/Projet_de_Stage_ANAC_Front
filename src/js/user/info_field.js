var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect } from 'react';

import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { IoSaveOutline } from "react-icons/io5";
import { LoadingButton } from "@mui/lab";
import { http } from "../auth/login";

export default function Info_field(_ref) {
        var label = _ref.label,
            type = _ref.type,
            default_value = _ref.default_value,
            info_name = _ref.info_name;

        var _useState = useState(''),
            _useState2 = _slicedToArray(_useState, 2),
            value = _useState2[0],
            setValue = _useState2[1];

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            error = _useState4[0],
            setError = _useState4[1];

        var _useState5 = useState(false),
            _useState6 = _slicedToArray(_useState5, 2),
            loading = _useState6[0],
            setLoading = _useState6[1];

        var handleChange = function handleChange(e) {
                setValue(e.target.value);
        };

        var update = function update(e) {
                setLoading(true);

                var queryBody = new FormData();

                queryBody.append(info_name, value);

                var onFulfilled = function onFulfilled(res) {
                        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuupdate_" + info_name, res, window.Global_State);
                        setLoading(false);
                        if (res.data.statue === "success") {
                                // window.Global_State.updateAuthUserInfo(res.data.data)
                                setValue('');
                                window.show_response(label + " mis \xE1 jour !", "success");
                        } else window.show_response(res.data.data.msg, res.data.statue);
                };
                var onRejected = function onRejected(err) {
                        setLoading(false);
                        window.show_response(err.message + " " + err.response.data.message, "error");
                };

                http.post("update_" + info_name, queryBody).then(onFulfilled, onRejected);
        };

        return React.createElement(
                "div",
                { className: "full_size_element d-flex justify-content-center align-items-center", style: {
                                maxHeight: "fit-content"
                        } },
                React.createElement(
                        Stack,
                        { className: "full_size_element", direction: "column", spacing: 1, justifyContent: "center", alignItems: "center" },
                        React.createElement(
                                Stack,
                                { direction: "row", spacing: 3,
                                        sx: {
                                                width: "100%"
                                        } },
                                React.createElement(TextField, {
                                        sx: {
                                                width: "100%"
                                        }
                                        // size={"small"}
                                        , id: "Info_field_" + label,
                                        label: label,
                                        focused: true,
                                        placeholder: default_value,
                                        type: type,
                                        error: Boolean(error),
                                        value: value,
                                        onChange: handleChange,
                                        autoComplete: ''
                                }),
                                React.createElement(
                                        LoadingButton,
                                        { loading: loading, variant: "outlined", color: "primary", onClick: update },
                                        React.createElement(IoSaveOutline, { style: { width: "100%", height: "100%" } })
                                )
                        ),
                        error && React.createElement(
                                "span",
                                { className: "text-danger ml-2" },
                                " ",
                                error,
                                " "
                        )
                )
        );
}