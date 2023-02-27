var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useEffect, useState } from 'react';
import { AppBar, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { AiFillCloseSquare } from "react-icons/ai";

//     node: 
// {
//  id,
//  name,
//  type,
//  isOpen,
//  children,
//  isRoot,
//  parentId
//  path,
//  hasChildren,
//  ext,
//  createdAt,
//  modifiedAt,
// }
// }


var Transition = React.forwardRef(function Transition(props, ref) {
        return React.createElement(Slide, Object.assign({ direction: "up", ref: ref }, props));
});

function FileDetail(_ref) {
        var node = _ref.node,
            open = _ref.open,
            handleClose = _ref.handleClose;

        var jsonDetails = {
                general: {
                        NOM: node.name,
                        CHEMIN: node.path,
                        "CREE LE": node.created_at.replace("T", " À "),
                        VALIDE: node.is_validated ? "OUI par " + (node.validator ? node.validator.name + " " + node.validator.second_name : 'inconnu') : "NON",
                        SERVICES: node.services.reduce(function (acc, service) {
                                return acc ? acc + ", " + service.name : service.name;
                        }, "")
                }
        };

        switch (node.type) {
                case 'audit':
                        jsonDetails.specific = {
                                TYPE: "AUDIT",
                                "RESPONSABLE AUDIT": React.createElement(
                                        "b",
                                        { style: { color: "blue" } },
                                        node.ra.name + " " + node.ra.second_name
                                )
                        };

                        break;
                case 'checkList':
                        jsonDetails.specific = {
                                TYPE: "CHECKLIST"
                        };

                        break;
                case 'dp':
                        jsonDetails.specific = {
                                TYPE: "DOSSIER PREUVE"
                        };

                        break;
                case 'nonC':
                        jsonDetails.specific = {
                                TYPE: "DOSSIER NC"
                        };

                        break;
                case 'fnc':
                        var levelComponent = void 0;
                        switch (parseInt(node.level)) {
                                case 1:
                                        levelComponent = React.createElement(Chip, { label: node.level, variant: "filled", color: "error" });
                                        break;
                                case 2:
                                        levelComponent = React.createElement(Chip, { label: node.level, variant: "filled", color: "warning" });
                                        break;
                                case 3:
                                        levelComponent = React.createElement(Chip, { label: node.level, variant: "filled", color: "default" });
                                        break;

                        }

                        jsonDetails.specific = {
                                TYPE: "NON-CONFORMITÉ",
                                NIVEAU: levelComponent,
                                "DATE DE REVISION": node.review_date || "____/__/__",
                                STATUT: node.isClosed ? React.createElement(
                                        "div",
                                        { className: "badge bg-success-bright text-success" },
                                        "Cl\xF4tur\xE9"
                                ) : React.createElement(
                                        "div",
                                        { className: "badge bg-danger-bright text-danger" },
                                        "Non-Cl\xF4tur\xE9"
                                )
                        };

                        break;
                case 'ds':
                        jsonDetails.specific = {
                                TYPE: "DOSSIER SIMPLE"
                        };

                        break;
                case 'f':
                        jsonDetails.specific = {
                                TYPE: "FICHIER"
                        };

                        break;
                default:
                        break;
        }

        var generalDetails = [];

        for (var key in jsonDetails.general) {
                var value = jsonDetails.general[key];

                generalDetails.push(React.createElement(
                        Stack,
                        { direction: "row", spacing: 1, key: key,
                                style: {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block"
                                }
                        },
                        React.createElement(
                                "b",
                                { style: {
                                                height: "fit-content"
                                        } },
                                " ",
                                key,
                                ": "
                        ),
                        typeof value === "string" ? React.createElement(
                                "b",
                                { title: value },
                                " ",
                                value,
                                " "
                        ) : value
                ));
        }
        var specificDetails = [];

        for (var _key in jsonDetails.specific) {
                var _value = jsonDetails.specific[_key];

                specificDetails.push(React.createElement(
                        Stack,
                        { direction: "row", spacing: 1, key: _key, alignItems: "end",
                                style: {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block"
                                }
                        },
                        React.createElement(
                                "b",
                                { style: {
                                                height: "fit-content"
                                        } },
                                " ",
                                _key,
                                ": "
                        ),
                        typeof _value === "string" ? React.createElement(
                                "b",
                                { title: _value },
                                " ",
                                _value,
                                " "
                        ) : _value
                ));
        }

        return React.createElement(
                Dialog,
                {
                        fullScreen: window.innerWidth < 576,
                        open: open,
                        TransitionComponent: Transition,
                        onClose: handleClose,
                        "aria-labelledby": "FileDetail-dialog-title",
                        "aria-describedby": "FileDetail-dialog-description"
                },
                window.innerWidth > 576 ? React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                                DialogTitle,
                                { id: "FileDetail-dialog-title" },
                                node.name
                        ),
                        React.createElement(
                                DialogContent,
                                null,
                                React.createElement(
                                        Stack,
                                        { direction: "column", spacing: 5 },
                                        React.createElement(
                                                Divider,
                                                { textAlign: "center" },
                                                " GENERAL "
                                        ),
                                        React.createElement(
                                                Stack,
                                                { direction: "column", spacing: 3 },
                                                generalDetails
                                        ),
                                        React.createElement(
                                                Divider,
                                                { textAlign: "center" },
                                                " SPECIFIQUE "
                                        ),
                                        React.createElement(
                                                Stack,
                                                { direction: "column", spacing: 3 },
                                                specificDetails
                                        )
                                )
                        )
                ) : React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                                AppBar,
                                { sx: { position: 'relative' } },
                                React.createElement(
                                        Toolbar,
                                        null,
                                        React.createElement(
                                                IconButton,
                                                {
                                                        edge: "start",
                                                        color: "inherit",
                                                        onClick: handleClose,
                                                        "aria-label": "close"
                                                },
                                                React.createElement(AiFillCloseSquare, { size: 24 })
                                        ),
                                        React.createElement(
                                                Typography,
                                                { sx: { ml: 2, flex: 1 }, variant: "h6", component: "div" },
                                                node.name
                                        )
                                )
                        ),
                        React.createElement(
                                Stack,
                                { direction: "column", spacing: 5, margin: 3 },
                                React.createElement(
                                        Divider,
                                        { textAlign: "center" },
                                        " GENERAL "
                                ),
                                React.createElement(
                                        Stack,
                                        { direction: "column", spacing: 3 },
                                        generalDetails
                                ),
                                React.createElement(
                                        Divider,
                                        { textAlign: "center" },
                                        " SPECIFIQUE "
                                ),
                                React.createElement(
                                        Stack,
                                        { direction: "column", spacing: 3 },
                                        specificDetails
                                )
                        )
                )
        );
}

export default function useFileDetails() {
        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            open = _useState2[0],
            setOpen = _useState2[1];

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            nodeId = _useState4[0],
            setNodeId = _useState4[1];

        var showDetails = function showDetails(id) {
                setNodeId(id);
                setOpen(true);
        };

        var handleClose = function handleClose() {
                setOpen(false);
                setNodeId(null);
        };

        var detailsComponent = null;

        if (nodeId) {
                var node = window.Global_State.getNodeDataById(nodeId);

                if (node) {
                        detailsComponent = React.createElement(FileDetail, { node: node, open: open, handleClose: handleClose });
                } else {
                        detailsComponent = React.createElement(
                                Dialog,
                                {
                                        open: open,
                                        onClose: handleClose,
                                        "aria-labelledby": "not_found-dialog-title",
                                        "aria-describedby": "not_found-dialog-description"
                                },
                                React.createElement(
                                        DialogTitle,
                                        { id: "not_found-dialog-title" },
                                        "Fichier introuvable"
                                ),
                                React.createElement(
                                        DialogContent,
                                        null,
                                        React.createElement(
                                                DialogContentText,
                                                { id: "not_found-dialog-description" },
                                                "Aucun d\xE9tail"
                                        )
                                )
                        );
                }
        } else {
                detailsComponent = React.createElement(
                        Dialog,
                        {
                                open: open,
                                onClose: handleClose,
                                "aria-labelledby": "invalid_id-dialog-title",
                                "aria-describedby": "invalid_id-dialog-description"
                        },
                        React.createElement(
                                DialogTitle,
                                { id: "invalid_id-dialog-title" },
                                "Id invalide"
                        ),
                        React.createElement(
                                DialogContent,
                                null,
                                React.createElement(
                                        DialogContentText,
                                        { id: "invalid_id-dialog-description" },
                                        "Aucun d\xE9tail"
                                )
                        )
                );
        }

        return { showDetails: showDetails, detailsComponent: detailsComponent };
}