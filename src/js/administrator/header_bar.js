var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect, useMemo } from 'react';
import Stack from "@mui/material/Stack";
import Notifications from "../auth/user_notification";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Avatar from "@mui/material/Avatar";
import { http } from "../auth/login";
import Typography from "@mui/material/Typography";

import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { Box, Popover, Popper } from "@mui/material";

export default function Header_bar(_ref) {
        var user = _ref.user;


        var navigate = useNavigate();

        var dropTogglerContentUser = React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        Typography,
                        { variant: "userDropButton" },
                        React.createElement(
                                Stack,
                                { className: "", direction: "row", spacing: 1, alignItems: "center", justifyContent: "flex-end" },
                                React.createElement(
                                        "span",
                                        { className: "m-5" },
                                        " ",
                                        user.name + " " + user.second_name,
                                        " "
                                ),
                                React.createElement(
                                        Avatar,
                                        { sx: { bgcolor: 'green' } },
                                        "N"
                                ),
                                React.createElement(MdOutlineArrowDropDownCircle, null)
                        )
                )
        );

        var dropMenuItemsUser = React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        "div",
                        { className: " d-flex flex-column justify-content-center align-items-center py-4", "data-background-image": "./style/assets/media/image/user/man_avatar3.jpg", style: { background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100 } },
                        React.createElement(Avatar, { alt: user.name + " " + user.second_name, src: "./style/assets/media/image/user/man_avatar3.jpg" }),
                        React.createElement(
                                "h5",
                                { className: "mb-0",
                                        style: {
                                                textAlign: "center",
                                                textOverflow: "ellipsis"
                                        }
                                },
                                user.name + " " + user.second_name
                        )
                ),
                React.createElement("div", { className: "dropdown-divider" }),
                React.createElement(
                        "a",
                        { className: "list-group-item text-danger", onClick: function onClick(event) {
                                        event.stopPropagation();
                                        event.preventDefault();

                                        var queryBody = new FormData();

                                        toast.promise(http.post('/logout', queryBody), {
                                                loading: "Déconnexion...",
                                                success: "Vous etes déconnecté !!",
                                                error: "Erreur de déconnexion"
                                        }).then(function (res) {
                                                console.log(res);
                                                setTimeout(function () {
                                                        navigate("/login");
                                                }, 1000);
                                        }).catch(function (err) {
                                                console.log(err);
                                        });
                                } },
                        "Sign Out!"
                )
        );

        var _React$useState = React.useState(null),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            anchorEl = _React$useState2[0],
            setAnchorEl = _React$useState2[1];

        var handleClick = function handleClick(event) {
                setAnchorEl(anchorEl ? null : event.currentTarget);
        };
        var handleClose = function handleClose(event) {
                setAnchorEl(null);
        };

        var open = Boolean(anchorEl);
        var id = open ? 'user_info_popper' : undefined;

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        "div",
                        { className: "d-sm-flex justify-content-start flex-sm-column container-fluid p-0",
                                style: {
                                        minWidth: 280
                                }
                        },
                        React.createElement(
                                Stack,
                                { className: "justify-content-sm-end justify-content-center m-2", direction: "row", spacing: 1, alignItems: "center", justifyContent: "flex-end" },
                                React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                                "div",
                                                { "aria-describedby": id, onClick: handleClick },
                                                dropTogglerContentUser
                                        ),
                                        React.createElement(
                                                Popover,
                                                { id: id,
                                                        open: open,
                                                        anchorEl: anchorEl,
                                                        onClose: handleClose,
                                                        anchorOrigin: {
                                                                vertical: 'bottom',
                                                                horizontal: 'left'
                                                        },
                                                        PaperProps: {
                                                                style: {
                                                                        border: "thin solid blue"
                                                                        // borderRadius: 10,
                                                                }
                                                        }
                                                },
                                                React.createElement(
                                                        Box,
                                                        {
                                                                sx: {
                                                                        width: "fit-content",
                                                                        height: "fit-content",
                                                                        overflow: "hidden"
                                                                }
                                                        },
                                                        dropMenuItemsUser
                                                )
                                        )
                                )
                        )
                )
        );
}