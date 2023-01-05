import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this2 = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import useGetData, { getFromDataBase } from "./data";
import ReactDOM from 'react-dom/client';

import useGetFiles from './files_package/files';
import Global_research from "./files_package/global_research";
import Login from "./auth/login";
import { http } from "./data";
import Notifications from "./auth/user_notification";
import QuickSettings from "./auth/quick_settings";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { styled, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GiOverhead } from "react-icons/gi";
import { TiThumbsDown, TiThumbsOk } from "react-icons/ti";
import { MdNotificationsActive, MdOutlineArrowDropDownCircle } from "react-icons/md";

import toast, { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRouteError, redirect, useNavigate } from "react-router-dom";

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

export var Global_State = {};

function Lol(_ref) {
        var lal = _ref.lal;

        var _useState = useState(true),
            _useState2 = _slicedToArray(_useState, 2),
            o = _useState2[0],
            setO = _useState2[1];

        var iconOK = React.createElement(TiThumbsOk, { size: 24, color: 'red' }),
            iconNO = React.createElement(TiThumbsDown, { size: 24, color: 'green' });


        if (!o) {
                iconOK = React.createElement(
                        'span',
                        null,
                        ' p '
                );
        }

        return React.createElement(
                'div',
                { onClick: function onClick(event) {
                                setO(!o);
                        },
                        style: {
                                width: '100vh',
                                height: '100vh',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                        }
                },
                iconOK
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
                React.Fragment,
                null,
                React.createElement(
                        'div',
                        { className: ' d-flex flex-column justify-content-center align-items-center py-4', 'data-background-image': './style/assets/media/image/user/man_avatar3.jpg', style: { background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100 } },
                        React.createElement(Avatar, { alt: Global_State.authUser.name + ' ' + Global_State.authUser.second_name, src: './style/assets/media/image/user/man_avatar3.jpg' }),
                        React.createElement(
                                'h5',
                                { className: 'mb-0' },
                                Global_State.authUser.name + ' ' + Global_State.authUser.second_name
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
                                                console.log(res);
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
                                        Global_State.authUser.name + ' ' + Global_State.authUser.second_name,
                                        ' '
                                ),
                                React.createElement(
                                        Avatar,
                                        { sx: { bgcolor: 'green' } },
                                        'N'
                                ),
                                React.createElement(MdOutlineArrowDropDownCircle, null)
                        )
                )
        );

        return React.createElement(
                Navbar /* bg="light"  */,
                { expand: 'sm', style: { padding: 0 } },
                React.createElement(
                        Container,
                        { fluid: true, style: { justifyContent: 'end', alignItems: 'start', paddingRight: '15px' } },
                        React.createElement(Navbar.Toggle, { className: 'p-0  justify-content-start align-items-start d-flex d-sm-none', 'aria-controls': 'offcanvasNavbar-expand-' + 'sm', children: React.createElement(GiOverhead, { size: 40 }),
                                style: {
                                        width: 60,
                                        color: 'rgb(0 0 0)',
                                        transform: 'rotateY(180deg)',
                                        paddingLeft: 17,
                                        border: 'none'
                                } }),
                        React.createElement(
                                Navbar.Offcanvas,
                                {
                                        id: 'offcanvasNavbar-expand-' + 'sm',
                                        'aria-labelledby': 'offcanvasNavbarLabel-expand-' + 'sm',
                                        placement: 'top',
                                        className: 'container-fluid d-flex flex-row justify-content-end',
                                        style: { /* width: '100%' */height: 105, padding: 0 }
                                },
                                React.createElement(
                                        'div',
                                        { className: 'd-flex justify-content-start flex-column container-fluid p-0' },
                                        React.createElement(
                                                Stack,
                                                { className: 'justify-content-sm-end justify-content-center m-2', direction: 'row', spacing: 1, alignItems: 'center', justifyContent: 'flex-end' },
                                                useMemo(function () {
                                                        return React.createElement(Notifications, null);
                                                }, [Global_State.authUser.asking_permission_notifications]),
                                                useMemo(function () {
                                                        return React.createElement(QuickSettings, null);
                                                }, [Global_State.isEditorMode]),
                                                React.createElement(Global_State.CustomDropDown, { id: 'userPanel', icon: dropTogglerContentUser, content: dropMenuItemsUser })
                                        ),
                                        React.createElement(Global_research, { display: 'd-flex d-sm-none' })
                                )
                        )
                )
        );
}

function Sections_side_bar() {
        var _this = this;

        var sections = [];
        // console.log(Global_State.sections)
        Global_State.sections.forEach(function (section) {
                sections.push(section);
        });

        return React.createElement(
                'div',
                { style: { width: 'auto', height: 'auto' } },
                React.createElement(
                        Navbar,
                        { key: 'xl', expand: 'xl', style: { padding: '0 30px' } },
                        React.createElement(
                                Container,
                                { fluid: true, style: { justifyContent: 'start', alignItems: 'start' } },
                                React.createElement(Navbar.Toggle, { className: 'p-0 d-flex justify-content-center align-items-start', 'aria-controls': 'offcanvasNavbar-expand-' + 'xl', children: React.createElement(AiOutlineMenuUnfold, { size: 50 }),
                                        style: {
                                                width: 50,
                                                height: 50,
                                                color: 'rgb(0 0 0)',
                                                border: 'none'
                                        }
                                }),
                                React.createElement(
                                        Navbar.Offcanvas,
                                        {
                                                id: 'offcanvasNavbar-expand-' + 'xl',
                                                'aria-labelledby': 'offcanvasNavbarLabel-expand-' + 'xl',
                                                placement: 'start',
                                                style: { width: 110 }
                                        },
                                        React.createElement(
                                                'div',
                                                { className: 'navigation bg-dark' },
                                                React.createElement(
                                                        'div',
                                                        { className: 'logo' },
                                                        React.createElement(
                                                                'a',
                                                                { href: '/' },
                                                                React.createElement('img', { width: 100, height: 100, src: window.location.origin + '/Favicon_anac.png', alt: 'logo' })
                                                        )
                                                ),
                                                React.createElement(
                                                        'ul',
                                                        null,
                                                        sections.map(function (section, idx) {
                                                                // console.log(sections)
                                                                return React.createElement(
                                                                        'li',
                                                                        { key: section.id, className: sections.length - 1 === idx ? "flex-grow-1" : "", style: { marginBottom: 10 }, onClick: _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                                                                                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                                while (1) {
                                                                                                        switch (_context.prev = _context.next) {
                                                                                                                case 0:
                                                                                                                        _context.next = 2;
                                                                                                                        return Global_State.setSectionId(section.id);

                                                                                                                case 2:
                                                                                                                        Global_State.backend.setCurrentSelectedFolder(Global_State.selectedNodeIdsInSections.current.get(section.id));

                                                                                                                case 3:
                                                                                                                case 'end':
                                                                                                                        return _context.stop();
                                                                                                        }
                                                                                                }
                                                                                        }, _callee, _this);
                                                                                })) },
                                                                        React.createElement(
                                                                                'a',
                                                                                { className: Global_State.selectedSectionId === section.id ? "active" : "" },
                                                                                React.createElement('i', { className: 'nav-link-icon ti-file' }),
                                                                                React.createElement(
                                                                                        'span',
                                                                                        { className: 'nav-link-label' },
                                                                                        section.name
                                                                                )
                                                                        )
                                                                );
                                                        }),
                                                        React.createElement(
                                                                'li',
                                                                null,
                                                                React.createElement(
                                                                        'a',
                                                                        { href: 'settings.html' },
                                                                        React.createElement('i', { className: 'nav-link-icon ti-settings' }),
                                                                        React.createElement(
                                                                                'span',
                                                                                { className: 'nav-link-label' },
                                                                                'Settings'
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                )
        );
}

function File_home() {

        document.onkeydown = function (e) {
                if (e.ctrlKey && e.key === 'f') return false;
                if (e.ctrlKey && e.key === 'd') return false;
        };

        var _useState3 = useState(null),
            _useState4 = _slicedToArray(_useState3, 2),
            Data_Base = _useState4[0],
            setData_base = _useState4[1];

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        // console.log(Data_Base)

        var container = Data_Base === null ? React.createElement(
                'div',
                { className: 'preloader' },
                ' ',
                React.createElement('div', { className: 'preloader-icon' }),
                ' '
        ) : React.createElement(Load, { datas: JSON.parse(JSON.stringify(Data_Base)) });

        function Load(_ref3) {
                var datas = _ref3.datas;

                // const initData = d
                // const [le, setLe] = useState(initData)
                // console.log("Leeeee", le);
                Global_State = useGetData(JSON.parse(JSON.stringify(datas)));
                console.log(Global_State);

                var files = useGetFiles(React.createElement(Global_research, { display: 'd-none d-sm-flex' }));

                var leftSideBar = React.createElement(Sections_side_bar, null);

                var _useState5 = useState(false),
                    _useState6 = _slicedToArray(_useState5, 2),
                    hide = _useState6[0],
                    setHide = _useState6[1];

                var overlaySideBar = React.createElement(
                        'div',
                        { className: 'd-xl-none', hidden: hide, style: { width: '100%', height: '100%', backgroundColor: 'red', position: 'absolute', zIndex: 999 } },
                        React.createElement('div', null),
                        leftSideBar
                );

                return React.createElement(
                        'div',
                        null,
                        React.createElement(
                                'div',
                                null,
                                React.createElement(Toaster
                                // containerStyle={{ maxWidth: Infinity, }}
                                , { toastOptions: {
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
                        Global_State.Overlay_component,
                        Global_State.modalManager.modal,
                        React.createElement(
                                'div',
                                { className: 'layout-wrapper' },
                                React.createElement(
                                        Stack,
                                        { direction: 'row', spacing: 0.5, alignItems: 'center', justifyContent: 'flex-end' },
                                        React.createElement(
                                                Col,
                                                { xl: 1, className: 'd-none d-xl-block' },
                                                leftSideBar
                                        ),
                                        React.createElement(
                                                Col,
                                                { xl: 11 },
                                                React.createElement(
                                                        Row,
                                                        { sm: 1, style: {
                                                                        position: 'sticky',
                                                                        top: 0,
                                                                        // width: '100%',
                                                                        backgroundColor: 'white',
                                                                        whiteSpace: 'normal',
                                                                        zIndex: 999
                                                                }
                                                        },
                                                        React.createElement(
                                                                Row,
                                                                null,
                                                                React.createElement('div', { style: { marginTop: 20, width: '100%', display: 'block' } })
                                                        ),
                                                        React.createElement(
                                                                Row,
                                                                { sm: 12 },
                                                                React.createElement(
                                                                        'div',
                                                                        { style: { width: '100%', display: 'block' } },
                                                                        React.createElement(
                                                                                Row,
                                                                                null,
                                                                                React.createElement(
                                                                                        Col,
                                                                                        { className: 'd-xl-none', md: 2, xs: 4 },
                                                                                        leftSideBar
                                                                                ),
                                                                                React.createElement(
                                                                                        Col,
                                                                                        { className: 'd-flex', md: 10, xs: 8, xl: 12, style: { padding: 0, alignItems: 'center' } },
                                                                                        React.createElement(
                                                                                                'div',
                                                                                                { style: { width: '100%' } },
                                                                                                React.createElement(Header, null)
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Row,
                                                        { sm: 11 },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'content-wrapper', style: { width: '100%' } },
                                                                React.createElement(
                                                                        'div',
                                                                        { className: 'content-body' },
                                                                        React.createElement(
                                                                                'div',
                                                                                { className: 'content', style: { paddingLeft: 0, paddingTop: 30 } },
                                                                                React.createElement(
                                                                                        'div',
                                                                                        { className: 'page-header d-flex justify-content-between' },
                                                                                        React.createElement(
                                                                                                'h2',
                                                                                                null,
                                                                                                'Files'
                                                                                        ),
                                                                                        React.createElement(
                                                                                                'a',
                                                                                                { href: '#', className: 'files-toggler' },
                                                                                                React.createElement('i', { className: 'ti-menu' })
                                                                                        )
                                                                                ),
                                                                                React.createElement(
                                                                                        'div',
                                                                                        { className: 'row' },
                                                                                        React.createElement(
                                                                                                'div',
                                                                                                { className: 'col-xl-4 files-sidebar' },
                                                                                                React.createElement(
                                                                                                        'div',
                                                                                                        { className: 'card border-0' },
                                                                                                        React.createElement(
                                                                                                                'h6',
                                                                                                                { className: 'card-title' },
                                                                                                                'My Folders'
                                                                                                        ),
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'card' },
                                                                                                                React.createElement(
                                                                                                                        'div',
                                                                                                                        { className: 'card-body' },
                                                                                                                        React.createElement(
                                                                                                                                'div',
                                                                                                                                { className: 'card-scroll' },
                                                                                                                                files.fileTree
                                                                                                                        )
                                                                                                                )
                                                                                                        )
                                                                                                )
                                                                                        ),
                                                                                        files.fileTable
                                                                                )
                                                                        ),
                                                                        React.createElement(
                                                                                'footer',
                                                                                { className: 'content-footer d-print-none' },
                                                                                React.createElement(
                                                                                        'div',
                                                                                        null,
                                                                                        '\xA9 2022 ESSOAZINA - ',
                                                                                        React.createElement(
                                                                                                'a',
                                                                                                { href: 'https://www.anac-togo.tg', target: '_blank' },
                                                                                                'ANAC'
                                                                                        )
                                                                                ),
                                                                                React.createElement(
                                                                                        'div',
                                                                                        null,
                                                                                        React.createElement(
                                                                                                'nav',
                                                                                                { className: 'nav' },
                                                                                                React.createElement(
                                                                                                        'a',
                                                                                                        { href: 'https://themeforest.net/licenses/standard', className: 'nav-link' },
                                                                                                        'Licenses'
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'a',
                                                                                                        { href: '#', className: 'nav-link' },
                                                                                                        'Change Log'
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'a',
                                                                                                        { href: '#', className: 'nav-link' },
                                                                                                        'Get Help'
                                                                                                )
                                                                                        )
                                                                                )
                                                                        )
                                                                ),
                                                                React.createElement(
                                                                        'div',
                                                                        { className: 'sidebar-group d-print-none' },
                                                                        files.fileDetails
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                );
        }

        useEffect(function () {
                var FetchData = function () {
                        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                                var Datas;
                                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                                _context2.next = 2;
                                                                return getFromDataBase();

                                                        case 2:
                                                                Datas = _context2.sent;

                                                                setData_base(Datas);

                                                        case 4:
                                                        case 'end':
                                                                return _context2.stop();
                                                }
                                        }
                                }, _callee2, this);
                        }));

                        return function FetchData() {
                                return _ref4.apply(this, arguments);
                        };
                }();

                FetchData();
        }, []);

        console.log("render");

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

        // useEffect(() => {
        //         function checkAuthState()
        //         {
        //                 http.get('user').then(res =>
        //                 {
        //                         console.log(res)
        //                         // if(res.data === '') redirect("/login")
        //                         // else redirect("/files")
        //
        //                         if(res.data === '') setContainer(<Login redirectTo = {() => {setContainer(<Page/>)}} />)
        //                         else setContainer(<File_home/>)
        //                 }
        //                 )
        //                 .catch( err => { console.log(err) })
        //
        //         }
        //         checkAuthState()
        // }, [])

        useEffect(function () {
                setTimeout(function () {
                        navigate("/files");
                }, 3000);
        }, []);

        console.log("render");

        return container;
}

var loader = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                var user;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                                switch (_context3.prev = _context3.next) {
                                        case 0:
                                                user = void 0;
                                                _context3.next = 3;
                                                return http.get('user').then(function (res) {
                                                        console.log(res);
                                                        user = res.data;
                                                }).catch(function (err) {
                                                        console.log(err);
                                                });

                                        case 3:

                                                console.log(user);

                                                if (!(user === '')) {
                                                        _context3.next = 8;
                                                        break;
                                                }

                                                return _context3.abrupt('return', redirect("/login"));

                                        case 8:
                                                return _context3.abrupt('return', "ok");

                                        case 9:
                                        case 'end':
                                                return _context3.stop();
                                }
                        }
                }, _callee3, _this2);
        }));

        return function loader() {
                return _ref5.apply(this, arguments);
        };
}();

var router = createBrowserRouter([{
        path: "/",
        element: React.createElement(Page, null),
        errorElement: React.createElement(ErrorPage, null)
}, {
        path: "/login",
        element: React.createElement(Login, null)
}, {
        path: "/files",
        element: React.createElement(File_home, null),
        loader: loader
}]);

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(
        React.StrictMode,
        null,
        React.createElement(RouterProvider, { router: router })
));