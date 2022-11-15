import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer } from 'react';
import useGetData, { getFromDataBase } from "./data";
import ReactDOM from 'react-dom/client';
import toast from "react-hot-toast";

import useGetFiles from './files_package/files';
import Global_research from "./files_package/global_research";
import Login from "./auth/login";
import { http } from "./data";
import Notifications from "./auth/user_notification";
import QuickSettings from "./auth/quick_settings";
// import FileTable from "./files_package/content";
// import {FileIcon, defaultStyles} from 'react-file-icon';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { styled, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GiOverhead } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive, MdOutlineArrowDropDownCircle } from "react-icons/md";

import { Toaster } from "react-hot-toast";

// import './files.js';
import EventEmitter from 'eventemitter3';
import zIndex from "@mui/material/styles/zIndex";

export var test = "Success";

export var Global_State = {};

function Lol(_ref) {
        var lal = _ref.lal;

        var EventsManager = new EventEmitter();

        var _useState = useState([2, 6, 9, 7, 3]),
            _useState2 = _slicedToArray(_useState, 2),
            o = _useState2[0],
            setO = _useState2[1];

        var _useState3 = useState('p'),
            _useState4 = _slicedToArray(_useState3, 2),
            p = _useState4[0],
            setP = _useState4[1];

        function usela(g) {
                return setP;
        }

        function emit() {

                console.log('dddddddd');
                EventsManager.emit('p');
        }

        function reducer(state, action) {
                return [action];
        }

        var _useReducer = useReducer(reducer, ['89']),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            h = _useReducer2[0],
            dispatch = _useReducer2[1];

        EventsManager.on('p', function () {
                console.log('set');setP(function (t) {
                        return t + t;
                });
        });

        useEffect(function () {
                EventsManager.emit('p');
        }, [h]);

        // useEffect(()=>{
        //     setTimeout(function()
        // {

        //     setO(o + 5)

        // }, 2000)
        // })

        console.log(p, h);

        // const k = usela()

        return React.createElement(
                'div',
                { className: 'container', onClick: function onClick() {
                                dispatch('22222');
                        } },
                p
        );
}

/* <li>
    <a  href="activities.html">
        <i className="nav-link-icon ti-pulse"></i>
        <span className="nav-link-label">Activities</span>
        <span className="badge badge-warning">New</span>
    </a>
</li>*/

function Header() {

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
                        { className: 'list-group-item text-danger' },
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
                                        { className: 'd-flex justify-content-start flex-column container-fluid' },
                                        React.createElement(
                                                Stack,
                                                { className: 'justify-content-md-end justify-content-center m-2', direction: 'row', spacing: 1, alignItems: 'center', justifyContent: 'flex-end' },
                                                React.createElement(Notifications, null),
                                                React.createElement(QuickSettings, null),
                                                React.createElement(Global_State.CustomDropDown, { id: 'userPanel', icon: dropTogglerContentUser, content: dropMenuItemsUser })
                                        ),
                                        React.createElement(Global_research, { display: 'd-flex d-sm-none' })
                                )
                        )
                )
        );
}

function File_section() {
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
                                                                { href: 'index.html' },
                                                                React.createElement('img', { src: './style/assets/media/image/logo.png', alt: 'logo' })
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
                                                                                                                        Global_State.backend.setCurrentSelectedFolder(Global_State.selectedNodeIdsInSections.get(section.id));

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

function Home() {

        document.onkeydown = function (e) {
                if (e.ctrlKey && e.key === 'f') return false;
        };

        var _useState5 = useState(null),
            _useState6 = _slicedToArray(_useState5, 2),
            Data_Base = _useState6[0],
            setData_base = _useState6[1];

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

                var leftSideBar = React.createElement(File_section, null);

                var _useState7 = useState(false),
                    _useState8 = _slicedToArray(_useState7, 2),
                    hide = _useState8[0],
                    setHide = _useState8[1];

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
                                                                                                                { 'class': 'card' },
                                                                                                                React.createElement(
                                                                                                                        'div',
                                                                                                                        { 'class': 'card-body' },
                                                                                                                        React.createElement(
                                                                                                                                'div',
                                                                                                                                { 'class': 'card-scroll' },
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
                                                                        files.fileDetails,
                                                                        React.createElement(
                                                                                'div',
                                                                                { className: 'sidebar', id: 'settings' },
                                                                                React.createElement(
                                                                                        'div',
                                                                                        { className: 'sidebar-header' },
                                                                                        React.createElement(
                                                                                                'h4',
                                                                                                null,
                                                                                                'Settings'
                                                                                        ),
                                                                                        React.createElement(
                                                                                                'a',
                                                                                                { href: '#', className: 'btn btn-light btn-floating sidebar-close-btn' },
                                                                                                React.createElement('i', { className: 'ti-angle-right' })
                                                                                        )
                                                                                ),
                                                                                React.createElement(
                                                                                        'div',
                                                                                        { className: 'sidebar-content' },
                                                                                        React.createElement(
                                                                                                'ul',
                                                                                                { className: 'list-group list-group-flush' },
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch1', checked: true }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch1' },
                                                                                                                        'Allow notifications.'
                                                                                                                )
                                                                                                        )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch2' }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch2' },
                                                                                                                        'Hide user requests'
                                                                                                                )
                                                                                                        )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch3', checked: true }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch3' },
                                                                                                                        'Speed up demands'
                                                                                                                )
                                                                                                        )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch4', checked: true }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch4' },
                                                                                                                        'Hide menus'
                                                                                                                )
                                                                                                        )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch5' }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch5' },
                                                                                                                        'Remember next visits'
                                                                                                                )
                                                                                                        )
                                                                                                ),
                                                                                                React.createElement(
                                                                                                        'li',
                                                                                                        { className: 'list-group-item pl-0 pr-0' },
                                                                                                        React.createElement(
                                                                                                                'div',
                                                                                                                { className: 'custom-control custom-switch' },
                                                                                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customSwitch6' }),
                                                                                                                React.createElement(
                                                                                                                        'label',
                                                                                                                        { className: 'custom-control-label', 'for': 'customSwitch6' },
                                                                                                                        'Enable report generation.'
                                                                                                                )
                                                                                                        )
                                                                                                )
                                                                                        )
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

        return React.createElement(
                React.Fragment,
                null,
                container
        );
}

function Page() {
        var _useState9 = useState(React.createElement(
                'div',
                null,
                'ANAC'
        )),
            _useState10 = _slicedToArray(_useState9, 2),
            container = _useState10[0],
            setContainer = _useState10[1];

        useEffect(function () {
                function checkAuthState() {
                        http.get('user').then(function (res) {
                                console.log(res);
                                if (res.data === '') setContainer(React.createElement(Login, { redirectTo: function redirectTo() {
                                                setContainer(React.createElement(Page, null));
                                        } }));else setContainer(React.createElement(Home, null));
                        }).catch(function (err) {
                                console.log(err);
                        });
                }
                checkAuthState();
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

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Page, null));