import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer, useMemo, Component } from 'react';
import useGetData, { getFromDataBase } from "./data";
import ReactDOM from 'react-dom/client';

import useGetFiles from './files_package/files';
import Global_research from "./files_package/global_research";
import Login from "./auth/login";
import Create_account from "./auth/create_account";
import { http } from "./auth/login";
import Notifications from "./auth/user_notification";
import QuickSettings from "./auth/quick_settings";
import User_infos from "./user/user_infos";
import Forgot_password from "./auth/password_reset/forgot_password";
import Reset_password from "./auth/password_reset/reset_password";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { styled, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import IconButton from "@mui/material/IconButton";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GiPalmTree } from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { MdNotificationsActive, MdOutlineArrowDropDownCircle } from "react-icons/md";

import toast, { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRouteError, redirect, useNavigate } from "react-router-dom";
import { Box, Button, Chip, Popover, Popper, Snackbar, SwipeableDrawer, Tooltip } from "@mui/material";
import { Collapse, Fade, Offcanvas } from "react-bootstrap";
import Administrator_home from "./administrator/administrator_home";
import swal from "sweetalert";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createPortal } from "react-dom";

export default function ErrorPage() {
        var error = useRouteError();
        console.error(error);

        return React.createElement(
                'div',
                { id: 'error-page' },
                React.createElement(
                        'h1',
                        null,
                        'Oops!'
                ),
                React.createElement(
                        'p',
                        null,
                        'Sorry, an unexpected error has occurred.'
                ),
                React.createElement(
                        'p',
                        null,
                        React.createElement(
                                'i',
                                null,
                                error.statusText || error.message
                        )
                )
        );
}

export var test = "Success";

window.Global_State = {};

// Object.defineProperty(window, 'Global_State', {
//         get: function() {
//                 return Global_State;
//         },
//         set: function(value) {
//                 console.log('La valeur de myData a été modifiée : ' + value);
//         }
// });


function Lol(_ref) {
        var lal = _ref.lal;

        var _useState = useState(true),
            _useState2 = _slicedToArray(_useState, 2),
            o = _useState2[0],
            setO = _useState2[1];

        var iconOK = "OK",
            iconNO = "NO";


        var ico = iconOK;

        if (!o) {
                ico = iconNO;
        }

        // console.log("Lolllllll rerender")

        return React.createElement(
                'div',
                { onClick: function onClick(event) {
                                window.Global_State.EventsManager.emit("updateOK", window.Global_State.o + "OK");
                        },
                        style: {
                                width: '100%',
                                height: '100%',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                        }
                },
                window.Global_State.o
        );
}

function Presentation() {

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        'div',
                        { className: 'd-none d-sm-flex flex-column justify-content-center align-items-center', style: { width: "100%", height: "100%", padding: 90 } },
                        React.createElement('img', { className: 'mb-2', alt: 'ANAC', src: 'anac logo.jpeg' }),
                        React.createElement(
                                'b',
                                { className: 'd-block', style: { textAlign: 'center', fontSize: 35, color: "#9c0505" } },
                                ' GESTIONNAIRE DE FICHIERS',
                                React.createElement('br', null),
                                'DNAA/ANAC/TOGO'
                        )
                ),
                React.createElement(
                        'div',
                        { className: 'd-flex d-sm-none flex-column justify-content-center align-items-center', style: { width: "100%", height: "100%" } },
                        React.createElement('img', { width: 200, height: 200, className: 'mb-2', alt: 'ANAC', src: window.location.origin + '/anac logo.jpeg' }),
                        React.createElement(
                                'b',
                                { className: 'd-block', style: { textAlign: 'center', color: "#9c0505" } },
                                ' AGENCE NATIONALE',
                                React.createElement('br', null),
                                'DE L\'AVIATION CIVILE DU TOGO'
                        )
                )
        );
}

function Header() {

        var navigate = useNavigate();

        var dropMenuItemsUser = React.createElement(
                Box,
                null,
                React.createElement(
                        'div',
                        { className: ' d-flex flex-column justify-content-center align-items-center py-4', 'data-background-image': './style/assets/media/image/user/man_avatar3.jpg', style: { background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100 },
                                onClick: function onClick(e) {
                                        navigate("/user_information");
                                }
                        },
                        React.createElement(Avatar, { alt: window.Global_State.authUser.name + ' ' + window.Global_State.authUser.second_name, src: '' }),
                        React.createElement(
                                'h5',
                                { className: 'mb-0' },
                                window.Global_State.authUser.name + ' ' + window.Global_State.authUser.second_name
                        )
                ),
                React.createElement('div', { className: 'dropdown-divider' }),
                React.createElement(
                        'a',
                        { className: 'list-group-item text-danger', onClick: function onClick(event) {
                                        event.preventDefault();event.stopPropagation();

                                        var queryBody = new FormData();

                                        toast.promise(http.post('/logout', queryBody), {
                                                loading: "Déconnexion...",
                                                success: "Vous etes déconnecté !!",
                                                error: "Erreur de déconnexion"
                                        }).then(function (res) {
                                                // console.log(res)
                                                setTimeout(function () {
                                                        navigate("/login");
                                                }, 1000);
                                        }).catch(function (err) {
                                                console.log(err);
                                        });
                                } },
                        'Sign Out!'
                )
        );
        var dropTogglerContentUser = React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        Typography,
                        { variant: 'userDropButton' },
                        React.createElement(
                                Stack,
                                { className: '', direction: 'row', spacing: 1, alignItems: 'center', justifyContent: 'flex-end' },
                                React.createElement(
                                        'span',
                                        { className: 'm-5' },
                                        ' ',
                                        window.Global_State.authUser.name + ' ' + window.Global_State.authUser.second_name,
                                        ' '
                                ),
                                React.createElement(
                                        Avatar,
                                        { sx: { bgcolor: 'green' } },
                                        window.Global_State.authUser.name[0]
                                ),
                                React.createElement(MdOutlineArrowDropDownCircle, null)
                        )
                )
        );

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        'div',
                        { className: 'd-sm-flex justify-content-start flex-sm-column container-fluid p-0',
                                style: {
                                        minWidth: 280
                                }
                        },
                        React.createElement(
                                Stack,
                                { className: 'justify-content-sm-end justify-content-center m-2', direction: 'row', spacing: 1, alignItems: 'center', justifyContent: 'flex-end' },
                                useMemo(function () {
                                        return React.createElement(Notifications, null);
                                }, [window.Global_State.authUser.asking_permission_notifications]),
                                useMemo(function () {
                                        return React.createElement(QuickSettings, null);
                                }, [window.Global_State.isEditorMode]),
                                React.createElement(window.Global_State.CustomDropDown, { id: 'userPanel', icon: dropTogglerContentUser, content: dropMenuItemsUser })
                        ),
                        React.createElement(Global_research, { display: 'd-flex d-sm-none' })
                )
        );
}
function Responsive_header(_ref2) {
        var component = _ref2.component;

        var _useState3 = useState(false),
            _useState4 = _slicedToArray(_useState3, 2),
            open = _useState4[0],
            setOpen = _useState4[1];

        var ref = useRef();

        var handleOpen = function handleOpen(e) {
                // console.log("Open header")

                ref.current.style.position = "absolute";
                ref.current.style.top = 0;
                ref.current.style.right = 0;
                ref.current.style.zIndex = 1000;
                // ref.current.style.width = "80%"
                ref.current.style.height = "fit-content";

                setOpen(true);
        };

        var handleClose = function handleClose() {
                // console.log("Close header")

                ref.current.style.position = "unset";
                ref.current.style.top = "unset";
                ref.current.style.left = "unset";
                ref.current.style.zIndex = "unset";
                ref.current.style.width = "100%";
                ref.current.style.height = "100%";

                setOpen(false);
        };

        return React.createElement(
                'div',
                { ref: ref, className: "full_size_element wrapper_xs_size_header" },
                !open ? React.createElement(
                        'div',
                        { className: 'full_size_element d-flex justify-content-start align-items-center', onClick: handleOpen },
                        React.createElement(
                                Tooltip,
                                { title: window.current_location },
                                React.createElement(
                                        'b',
                                        {
                                                style: {
                                                        fontSize: 16,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: 'nowrap'
                                                }
                                        },
                                        window.current_location
                                )
                        )
                ) : React.createElement(
                        'div',
                        { className: 'content_header_xs_size',
                                style: { animation: "fadeMe 0.3s", position: "relative" }
                        },
                        createPortal(React.createElement(
                                'div',
                                { className: 'custom_overlay', onClick: handleClose },
                                ' '
                        ), document.getElementById("file_loaded")),
                        component
                )
        );
}

function GroupByServiceComponent(_ref3) {
        var service = _ref3.service,
            sections = _ref3.sections;

        var _useState5 = useState(null),
            _useState6 = _slicedToArray(_useState5, 2),
            anchorEl = _useState6[0],
            setAnchorEl = _useState6[1];

        var handlePopoverOpen = function handlePopoverOpen(event) {
                // console.log("enterrrrrrrrrr", service.name, open)
                setAnchorEl(event.currentTarget);
        };

        var handlePopoverClose = function handlePopoverClose() {
                // console.log("closinnnnnnnnnnnnnnnnnnnnnnnnng", service.name, open)
                setAnchorEl(null);
        };

        var open = Boolean(anchorEl);

        var selectedSection = window.Global_State.sections.get(window.Global_State.selectedSectionId);

        var is_active = Boolean(selectedSection.services.find(function (sectionService) {
                return sectionService.id === service.id;
        }));

        return React.createElement(
                'div',
                null,
                React.createElement(
                        Typography,
                        {
                                variant: 'div',
                                'aria-owns': open ? 'mouse-over-popover' : undefined,
                                'aria-haspopup': 'true'
                        },
                        React.createElement(Chip, { className: 'd-flex p-2 full_size_element', tabIndex: -1, variant: '' + (is_active ? "outlined" : "filled"),
                                style: {
                                        borderColor: "blue"
                                }
                                // disabled={is_active}
                                , onClick: handlePopoverOpen,
                                color: "primary",
                                label: React.createElement(
                                        'b',
                                        {
                                                style: {
                                                        maxWidth: "100%",
                                                        overflow: "hidden",
                                                        textOverflow: 'ellipsis',
                                                        color: '' + (is_active ? "blue" : "white")
                                                }
                                        },
                                        service.name
                                )
                        })
                ),
                React.createElement(
                        Popover,
                        {
                                id: service.name + '-over-popover',
                                PaperProps: {
                                        className: 'd-flex',
                                        style: {
                                                marginLeft: 20,
                                                border: "thin solid blue",
                                                boxShadow: "none"
                                        }
                                },
                                open: open,
                                anchorEl: anchorEl,
                                anchorOrigin: {
                                        vertical: 'center',
                                        horizontal: 'right'
                                },
                                transformOrigin: {
                                        vertical: 'center',
                                        horizontal: 'left'
                                },
                                onClose: handlePopoverClose,
                                disableRestoreFocus: true
                        },
                        React.createElement(
                                Typography,
                                { variant: 'div', sx: { p: 1 } },
                                React.createElement(
                                        Stack,
                                        { direction: 'column', spacing: 2, className: 'full_size_element d-flex justify-content-center align-items-center' },
                                        sections.map(function (section, idx) {
                                                // console.log(sections)
                                                return React.createElement(
                                                        Tooltip,
                                                        { key: idx, title: section.name, placement: 'right-start' },
                                                        React.createElement(
                                                                'span',
                                                                { className: 'full_size_element', style: {
                                                                                height: "fit-content"
                                                                        } },
                                                                React.createElement(
                                                                        Button,
                                                                        { className: 'd-flex p-2 full_size_element', tabIndex: -1, variant: 'text',
                                                                                style: {
                                                                                        borderColor: "blue"
                                                                                },
                                                                                disabled: window.Global_State.selectedSectionId === section.id,
                                                                                onClick: function onClick() {
                                                                                        var overlay = document.getElementById("section_side_bar_responsive_overlay");
                                                                                        if (overlay) overlay.click();
                                                                                        window.Global_State.setSectionId(section.id);
                                                                                        // window.Global_State.backend.setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section.id) )
                                                                                }
                                                                        },
                                                                        React.createElement(
                                                                                'b',
                                                                                {
                                                                                        style: {
                                                                                                maxWidth: "100%",
                                                                                                overflow: "hidden",
                                                                                                textOverflow: 'ellipsis',
                                                                                                color: '' + (window.Global_State.selectedSectionId === section.id ? '' : 'blue')
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
                )
        );
}
function Sections_side_bar() {
        var sections = [];
        // console.log(window.Global_State.sections)
        window.Global_State.sections.forEach(function (section) {
                sections.push(section);
        });

        var services = [].concat(_toConsumableArray(window.Global_State.authUser.services));

        return React.createElement(
                'div',
                { className: 'navigation_content full_size_element' },
                React.createElement(
                        'div',
                        { className: 'anac_logo' },
                        React.createElement(
                                'a',
                                { href: '/', className: 'full_size_element' },
                                React.createElement('img', { className: 'full_size_element', src: window.location.origin + '/Favicon_anac.png', alt: 'logo' })
                        )
                ),
                React.createElement(
                        'div',
                        { className: 'sections_div' },
                        services.length > 1 ? React.createElement(
                                Stack,
                                { direction: 'column', spacing: 2, className: 'full_size_element d-flex justify-content-center align-items-center' },
                                services.map(function (service, idx) {
                                        // console.log(sections)

                                        var service_sections = sections.filter(function (section) {
                                                return Boolean(section.services.find(function (section_service) {
                                                        return section_service.id === service.id;
                                                }));
                                        });

                                        return React.createElement(GroupByServiceComponent, { key: idx, service: service, sections: service_sections });
                                })
                        ) : React.createElement(
                                Stack,
                                { direction: 'column', spacing: 2, className: 'full_size_element d-flex justify-content-center align-items-center' },
                                sections.map(function (section, idx) {
                                        // console.log(sections)
                                        return React.createElement(
                                                Tooltip,
                                                { key: section.id, title: section.name, placement: 'right-start' },
                                                React.createElement(
                                                        'span',
                                                        { className: 'full_size_element', style: {
                                                                        height: "fit-content"
                                                                } },
                                                        React.createElement(
                                                                Button,
                                                                { className: 'd-flex p-2 full_size_element', tabIndex: -1, variant: '' + (window.Global_State.selectedSectionId === section.id ? "outlined" : "text"),
                                                                        style: {
                                                                                borderColor: "blue"
                                                                        },
                                                                        disabled: window.Global_State.selectedSectionId === section.id,
                                                                        onClick: function onClick() {
                                                                                var overlay = document.getElementById("section_side_bar_responsive_overlay");
                                                                                if (overlay) overlay.click();
                                                                                window.Global_State.setSectionId(section.id);
                                                                                // window.Global_State.backend.setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section.id) )
                                                                        }
                                                                },
                                                                React.createElement(
                                                                        'b',
                                                                        {
                                                                                style: {
                                                                                        maxWidth: "100%",
                                                                                        overflow: "hidden",
                                                                                        textOverflow: 'ellipsis',
                                                                                        color: '' + (window.Global_State.selectedSectionId === section.id ? '' : 'blue')
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
function Responsive_sections_side_bar(_ref4) {
        var component = _ref4.component,
            icon = _ref4.icon;

        var _useState7 = useState(false),
            _useState8 = _slicedToArray(_useState7, 2),
            show = _useState8[0],
            setShow = _useState8[1];

        var ref = useRef();

        var open = function open(e) {
                e.preventDefault();
                e.stopPropagation();
                // console.log("opppppeeeeeeeeeeen", e.target)
                // const element = document.getElementById("section_side_bar_responsive")
                ref.current.style.height = "95vh";

                setTimeout(function () {
                        setShow(true);
                }, 200);
        },
            close = function close(e) {
                e.preventDefault();
                e.stopPropagation();
                // console.log("clossssssssssssssse")
                // const element = document.getElementById("section_side_bar_responsive")
                ref.current.style.height = "100%";

                setShow(false);
        };

        return React.createElement(
                'div',
                { id: "section_side_bar_responsive", ref: ref, tabIndex: -1, onClick: open /*onBlur={close}*/ },
                show ? React.createElement(
                        'div',
                        { className: 'full_size_element', tabIndex: -1, style: { animation: "fadeMe 0.3s", position: "relative" }, onClick: function onClick(e) {
                                        /*console.log(e);*/e.preventDefault();e.stopPropagation();
                                } },
                        createPortal(React.createElement(
                                'div',
                                { id: "section_side_bar_responsive_overlay", className: 'custom_overlay', onClick: close },
                                ' '
                        ), document.getElementById("file_loaded")),
                        component
                ) : icon
        );
}

function Responsive_file_tree() {

        var offsetX = useRef(0);
        var offsetY = useRef(0);

        // const content = useRef(component)
        //
        // useEffect(
        //         () =>
        //         {
        //                 content.current = component
        //                 console.log("component change")
        //         }, [component]
        // )

        var on_left = useRef(false);

        var set_initials = function set_initials(e) {

                var element = document.getElementById("file_tree_responsive");

                // X here is the distance between element and the left border
                var X = element.offsetLeft;
                var Y = element.offsetTop;

                offsetX.current = e.clientX - X;
                offsetY.current = e.clientY - Y;

                // console.log("Drag startttttttttttt", offsetX, offsetY )
                // console.log("element.offsetLeft", element.offsetLeft)
        };

        function arrange(distance, max, component_size) {
                var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                if (strict) {
                        if (distance < max / 2) return 0;
                        if (distance > max / 2) return max - component_size;
                } else {
                        if (distance < 0) return 0;
                        if (distance > max) return max - component_size;
                }

                return distance;
        }

        var put_down = function put_down(e) {
                e.preventDefault();
                e.stopPropagation();

                // X here is the distance between element and the left border
                var X = e.clientX - offsetX.current;
                // X here is the distance between element and the right border
                var xOpposite = window.innerWidth - X - 48;

                var Y = e.clientY - offsetY.current;

                var newX = arrange(xOpposite, window.innerWidth, 48, true);
                var newY = arrange(Y, window.innerHeight, 48);

                // console.log("New plaaaaaaaaace", xOpposite, newY)

                on_left.current = Boolean(newX);

                var element = document.getElementById("file_tree_responsive");

                element.style.top = newY + 'px';
                element.style.right = newX + 'px';
        };

        var _useState9 = useState(false),
            _useState10 = _slicedToArray(_useState9, 2),
            open = _useState10[0],
            setOpen = _useState10[1];

        var handleClick = function handleClick(e) {
                // console.log("Toggle file treeeeeeeeeeeeeeeeee", on_left)
                setOpen(!open);
        };
        var handleClose = function handleClose() {
                return setOpen(false);
        };

        return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                        'div',
                        { id: "file_tree_responsive", className: 'file_tree_sm_size' },
                        ' ',
                        React.createElement(
                                IconButton,
                                { onClick: handleClick },
                                React.createElement(GiPalmTree, { size: 30, color: "brown" })
                        )
                ),
                React.createElement(
                        Offcanvas,
                        { show: open, onHide: handleClose, placement: 'end' },
                        React.createElement(
                                Offcanvas.Body,
                                null,
                                React.createElement(
                                        'div',
                                        { className: 'full_size_element' },
                                        window.files_family.fileTree
                                )
                        )
                )
        );
}

function Load(_ref5) {
        var datas = _ref5.datas;

        // const initData = d
        // const [le, setLe] = useState(initData)
        // console.log("Leeeee", le);
        window.Global_State = useGetData(JSON.parse(JSON.stringify(datas)));
        // console.log(window.Global_State)

        window.files_family = useGetFiles(React.createElement(Global_research, { display: 'd-none d-sm-flex' }));

        var leftSideBar = React.createElement(Sections_side_bar, null);
        var header = React.createElement(Header, null);

        var k = React.createElement(Lol, null);

        return React.createElement(
                'div',
                { id: "file_loaded", className: 'full_size_element' },
                React.createElement(
                        'div',
                        null,
                        React.createElement(Toaster, {
                                toastOptions: {
                                        // Define default options
                                        className: '',
                                        duration: 3000,
                                        position: 'top-right',
                                        style: {
                                                maxWidth: 1920
                                                // background: 'yellow',
                                        }

                                        // Default options for specific types
                                        // success: {
                                        //     duration: 3000,
                                        //     theme: {
                                        //         primary: 'green',
                                        //         secondary: 'black',
                                        //     },
                                        // }
                                }
                        })
                ),
                window.Global_State.Overlay_component,
                window.Global_State.absolutePopover.popover,
                window.Global_State.modalManager.modal,
                window.Global_State.editor.save_component,
                window.files_family.fileDetails,
                React.createElement(
                        'div',
                        { className: 'full_size_element layout-wrapper d-none d-xl-block' },
                        React.createElement(
                                Stack,
                                { className: 'full_size_element d-flex', direction: 'row', spacing: 0.5, alignItems: 'center', justifyContent: 'flex-end' },
                                React.createElement(
                                        'div',
                                        { className: 'navigation_side_bar d-block' },
                                        leftSideBar
                                ),
                                React.createElement(
                                        'div',
                                        { className: 'content_xl_size' },
                                        React.createElement(
                                                'div',
                                                { className: 'full_size_element d-flex flex-column justify-content-between' },
                                                React.createElement(
                                                        'div',
                                                        { className: 'content_xl_size_header' },
                                                        React.createElement(
                                                                Tooltip,
                                                                { title: window.current_location },
                                                                React.createElement(
                                                                        'b',
                                                                        {
                                                                                style: {
                                                                                        fontSize: 16,
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis",
                                                                                        whiteSpace: 'nowrap'
                                                                                }
                                                                        },
                                                                        window.current_location
                                                                )
                                                        ),
                                                        React.createElement(
                                                                'div',
                                                                { style: { minWidth: 'fit-content', display: 'block' } },
                                                                header
                                                        )
                                                ),
                                                React.createElement(
                                                        'div',
                                                        { className: 'content_xl_size_content' },
                                                        React.createElement(
                                                                Stack,
                                                                { className: 'full_size_element', direction: "row", spacing: 2 },
                                                                React.createElement(
                                                                        'div',
                                                                        { className: 'file_tree_xl_size' },
                                                                        window.files_family.fileTree
                                                                ),
                                                                React.createElement(
                                                                        'div',
                                                                        { className: 'file_table_xl_size' },
                                                                        window.files_family.fileTable
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                ),
                React.createElement(
                        'div',
                        { className: 'full_size_element layout-wrapper d-none d-xl-none d-sm-block' },
                        React.createElement(
                                'div',
                                { className: 'full_size_element' },
                                React.createElement(
                                        'div',
                                        { className: 'content_sm_size p-2' },
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                width: "100%",
                                                                height: "8%",
                                                                backgroundColor: "#f6f8fc",
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                        }
                                                },
                                                React.createElement(Responsive_sections_side_bar, { component: leftSideBar, icon: React.createElement(HiOutlineMenuAlt2, { color: "blue", size: 45 }) }),
                                                React.createElement(
                                                        'div',
                                                        { className: "full_size_element content_sm_size_header" },
                                                        React.createElement(
                                                                Tooltip,
                                                                { title: window.current_location },
                                                                React.createElement(
                                                                        'b',
                                                                        {
                                                                                style: {
                                                                                        fontSize: 16,
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis",
                                                                                        whiteSpace: 'nowrap'
                                                                                }
                                                                        },
                                                                        window.current_location
                                                                )
                                                        ),
                                                        React.createElement(
                                                                'div',
                                                                { style: { minWidth: 'fit-content', display: 'block' } },
                                                                header
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                'div',
                                                { className: 'content_xl_size_content' },
                                                React.createElement(Responsive_file_tree, null),
                                                React.createElement(
                                                        'div',
                                                        { className: 'full_size_element' },
                                                        window.files_family.fileTable
                                                )
                                        )
                                )
                        )
                ),
                React.createElement(
                        'div',
                        { className: 'full_size_element layout-wrapper d-block d-sm-none' },
                        React.createElement(
                                'div',
                                { className: 'full_size_element' },
                                React.createElement(
                                        'div',
                                        { className: 'content_sm_size p-2' },
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                width: "100%",
                                                                height: "8%",
                                                                backgroundColor: "#f6f8fc",
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                        }
                                                },
                                                React.createElement(Responsive_sections_side_bar, { component: leftSideBar, icon: React.createElement(HiOutlineMenuAlt2, { color: "blue", size: 45 }) }),
                                                React.createElement(Responsive_header, { component: header })
                                        ),
                                        React.createElement(
                                                'div',
                                                { className: 'content_xl_size_content' },
                                                React.createElement(Responsive_file_tree, null),
                                                React.createElement(
                                                        'div',
                                                        { className: 'full_size_element' },
                                                        window.files_family.fileTable
                                                )
                                        )
                                )
                        )
                )
        );
}

function File_home() {
        window.show_response = function (msg, type) {
                var msg_part = [].concat(_toConsumableArray(msg.split("L@O%L&")));

                toast(function (t) {
                        return (
                                // t.visible ?
                                React.createElement(
                                        Alert,
                                        { onClose: function onClose() {
                                                        return toast.dismiss(t.id);
                                                }, severity: type, sx: { width: 'fit-content', minWidth: 300, animation: "fadeMe 0.3s" } },
                                        React.createElement(
                                                AlertTitle,
                                                null,
                                                ' ',
                                                type.replace(/^\w/, function (c) {
                                                        return c.toUpperCase();
                                                }),
                                                ' '
                                        ),
                                        msg_part.map(function (value, idx) {
                                                return React.createElement(
                                                        'div',
                                                        { key: idx },
                                                        value
                                                );
                                        })
                                )
                        );
                }, {
                        position: "bottom-left",
                        duration: type === "error" ? Infinity : 3000,
                        style: {
                                background: 'rgba(255,255,255,0)',
                                padding: 0,
                                boxShadow: 'unset'
                        }
                });
                // swal({
                //         title: "Error",
                //         text: msg,
                //         icon: type
                // })
        };

        document.onkeydown = function (e) {
                if (e.ctrlKey && e.key === 'f') return false;
                if (e.ctrlKey && e.key === 'd') return false;
                if (e.ctrlKey && e.key === 'r') return false;
        };

        var _useState11 = useState(null),
            _useState12 = _slicedToArray(_useState11, 2),
            Data_Base = _useState12[0],
            setData_base = _useState12[1];

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        var container = Data_Base === null ? React.createElement(
                'div',
                { className: 'preloader' },
                ' ',
                React.createElement('div', { className: 'preloader-icon' }),
                ' '
        ) : React.createElement(Load, { datas: JSON.parse(JSON.stringify(Data_Base)) });

        useEffect(function () {
                var FetchData = function () {
                        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                                var Datas;
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                                switch (_context.prev = _context.next) {
                                                        case 0:
                                                                _context.next = 2;
                                                                return getFromDataBase();

                                                        case 2:
                                                                Datas = _context.sent;

                                                                setData_base(Datas);

                                                        case 4:
                                                        case 'end':
                                                                return _context.stop();
                                                }
                                        }
                                }, _callee, this);
                        }));

                        return function FetchData() {
                                return _ref6.apply(this, arguments);
                        };
                }();

                FetchData();
        }, []);

        // console.log("render")

        var theme = createTheme({
                typography: {
                        fontFamily: '"Josefin Sans", sans-serif',
                        userDropButton: {
                                '&:hover': {
                                        color: '#6c757d'
                                }
                        }

                }
        });

        return React.createElement(
                ThemeProvider,
                { theme: theme },
                container
        );
}

function Page() {

        // const [container, setContainer] = useState(<Presentation/>)
        var container = React.createElement(Presentation, null);

        var navigate = useNavigate();

        useEffect(function () {
                setTimeout(function () {
                        navigate("/files_browser");
                }, 3000);
        }, []);

        // console.log("render")

        return container;
}

var auth_loader = function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                var user;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                                switch (_context2.prev = _context2.next) {
                                        case 0:
                                                user = void 0;
                                                _context2.next = 3;
                                                return http.get('user').then(function (res) {
                                                        // console.log(res)
                                                        user = res.data;
                                                }).catch(function (err) {
                                                        console.log(err);
                                                });

                                        case 3:
                                                if (!(user instanceof Object)) {
                                                        _context2.next = 11;
                                                        break;
                                                }

                                                if (user.id) {
                                                        _context2.next = 8;
                                                        break;
                                                }

                                                return _context2.abrupt('return', redirect("/administrator"));

                                        case 8:
                                                return _context2.abrupt('return', redirect("/files_browser"));

                                        case 9:
                                                _context2.next = 12;
                                                break;

                                        case 11:
                                                return _context2.abrupt('return', "ok");

                                        case 12:
                                        case 'end':
                                                return _context2.stop();
                                }
                        }
                }, _callee2, _this);
        }));

        return function auth_loader() {
                return _ref7.apply(this, arguments);
        };
}();

var files_loader = function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                var user;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                                switch (_context3.prev = _context3.next) {
                                        case 0:
                                                user = void 0;
                                                _context3.next = 3;
                                                return http.get('user').then(function (res) {
                                                        // console.log(res)
                                                        user = res.data;
                                                }).catch(function (err) {
                                                        console.log(err);
                                                });

                                        case 3:
                                                if (!(user === '')) {
                                                        _context3.next = 7;
                                                        break;
                                                }

                                                return _context3.abrupt('return', redirect("/login"));

                                        case 7:
                                                if (user.id) {
                                                        _context3.next = 11;
                                                        break;
                                                }

                                                return _context3.abrupt('return', redirect("/administrator"));

                                        case 11:
                                                return _context3.abrupt('return', "ok");

                                        case 12:
                                        case 'end':
                                                return _context3.stop();
                                }
                        }
                }, _callee3, _this);
        }));

        return function files_loader() {
                return _ref8.apply(this, arguments);
        };
}();

var user_info_loader = function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                var user;
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                                switch (_context4.prev = _context4.next) {
                                        case 0:
                                                user = void 0;
                                                _context4.next = 3;
                                                return http.get('user').then(function (res) {
                                                        // console.log(res)
                                                        user = res.data;
                                                }).catch(function (err) {
                                                        console.log(err);
                                                });

                                        case 3:
                                                if (!(user === '')) {
                                                        _context4.next = 7;
                                                        break;
                                                }

                                                return _context4.abrupt('return', redirect("/login"));

                                        case 7:
                                                if (!(!window.Global_State || !window.Global_State.authUser)) {
                                                        _context4.next = 11;
                                                        break;
                                                }

                                                return _context4.abrupt('return', redirect("/files_browser"));

                                        case 11:
                                                if (user.id) {
                                                        _context4.next = 15;
                                                        break;
                                                }

                                                return _context4.abrupt('return', redirect("/administrator"));

                                        case 15:
                                                return _context4.abrupt('return', "ok");

                                        case 16:
                                        case 'end':
                                                return _context4.stop();
                                }
                        }
                }, _callee4, _this);
        }));

        return function user_info_loader() {
                return _ref9.apply(this, arguments);
        };
}();

var admin_loader = function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
                var user;
                return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                                switch (_context5.prev = _context5.next) {
                                        case 0:
                                                user = void 0;
                                                _context5.next = 3;
                                                return http.get('user').then(function (res) {
                                                        // console.log(res)
                                                        user = res.data;
                                                }).catch(function (err) {
                                                        console.log(err);
                                                });

                                        case 3:
                                                if (!(user === '')) {
                                                        _context5.next = 7;
                                                        break;
                                                }

                                                return _context5.abrupt('return', redirect("/login"));

                                        case 7:
                                                if (!user.id) {
                                                        _context5.next = 11;
                                                        break;
                                                }

                                                return _context5.abrupt('return', redirect("/files_browser"));

                                        case 11:
                                                return _context5.abrupt('return', "ok");

                                        case 12:
                                        case 'end':
                                                return _context5.stop();
                                }
                        }
                }, _callee5, _this);
        }));

        return function admin_loader() {
                return _ref10.apply(this, arguments);
        };
}();

var router = createBrowserRouter([{
        path: "/",
        element: React.createElement(Page, null),
        errorElement: React.createElement(ErrorPage, null)
}, {
        path: "/login",
        element: React.createElement(Login, null),
        loader: auth_loader
}, {
        path: "/sign_in",
        element: React.createElement(Create_account, null),
        loader: auth_loader
}, {
        path: "/forgot_password",
        element: React.createElement(Forgot_password, null),
        loader: auth_loader
}, {
        path: "/reset_password",
        element: React.createElement(Reset_password, null),
        loader: auth_loader
}, {
        path: "/files_browser",
        element: React.createElement(File_home, null),
        loader: files_loader
}, {
        path: "/administrator",
        element: React.createElement(Administrator_home, null),
        loader: admin_loader
}, {
        path: "/user_information",
        element: React.createElement(User_infos, null),
        loader: user_info_loader
}]);

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(RouterProvider, { router: router }));