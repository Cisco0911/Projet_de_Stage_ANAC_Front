function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable import/first */

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import { CgAirplane } from "react-icons/cg";

export default function Warning_component(_ref) {
        var open = _ref.open,
            onConfirm = _ref.onConfirm,
            onCancel = _ref.onCancel,
            warning_infos = _ref.warning_infos,
            props = _objectWithoutProperties(_ref, ["open", "onConfirm", "onCancel", "warning_infos"]);

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        Dialog,
                        { open: open },
                        React.createElement(
                                DialogTitle,
                                { color: "orangered", className: "d-flex align-items-center" },
                                " ",
                                React.createElement(WarningTwoToneIcon, { fontSize: 'large', sx: { margin: "0 10px" } }),
                                " \xCAtes-vous s\xFBr ?"
                        ),
                        React.createElement(
                                DialogContent,
                                { sx: { minWidth: 350 } },
                                React.createElement(
                                        DialogContentText,
                                        null,
                                        "Les cons\xE9quences que cela pourait entrainer ..."
                                ),
                                React.createElement(
                                        "div",
                                        null,
                                        warning_infos.map(function (info, idx) {
                                                return React.createElement(
                                                        "span",
                                                        { key: idx, className: "danger_list_item" },
                                                        React.createElement(CgAirplane, { size: 20 }),
                                                        "  ",
                                                        info
                                                );
                                        })
                                )
                        ),
                        React.createElement(
                                DialogActions,
                                null,
                                React.createElement(
                                        Button,
                                        { onClick: onCancel },
                                        "Annuler"
                                ),
                                React.createElement(
                                        Button,
                                        { onClick: onConfirm },
                                        "Confirmer"
                                )
                        )
                )
        );
}