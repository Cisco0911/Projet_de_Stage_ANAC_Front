/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer, useMemo, Component} from 'react';
import useGetData, {getFromDataBase} from "./data";
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

import toast, {Toaster} from "react-hot-toast";

import {
        createBrowserRouter,
        RouterProvider,
} from "react-router-dom";
import { useRouteError, redirect, useNavigate } from "react-router-dom";
import {Box, Button, Chip, Popover, Popper, Snackbar, SwipeableDrawer, Tooltip} from "@mui/material";
import {Collapse, Fade, Offcanvas} from "react-bootstrap";
import Administrator_home from "./administrator/administrator_home";
import swal from "sweetalert";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {createPortal} from "react-dom";



export default function ErrorPage() {
        const error = useRouteError();
        console.error(error);

        return (
        <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                        <i>{error.statusText || error.message}</i>
                </p>
        </div>
        );
}


export const test = "Success"



window.Global_State = {}

// Object.defineProperty(window, 'Global_State', {
//         get: function() {
//                 return Global_State;
//         },
//         set: function(value) {
//                 console.log('La valeur de myData a été modifiée : ' + value);
//         }
// });



function Lol({lal}) {

        const [o, setO] = useState(true)

        let [iconOK, iconNO] =
        [
                "OK",
                "NO"
        ]

        let ico = iconOK

        if (!o)
        {
                ico = iconNO
        }

        // console.log("Lolllllll rerender")

        return (
        <div onClick={ event => { window.Global_State.EventsManager.emit("updateOK", window.Global_State.o+"OK") } }
             style={
                     {
                             width: '100%',
                             height: '100%',
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center"
                     }
             }
        >
                {window.Global_State.o}
        </div>
        );
}


function Presentation()
{

        return(
                <React.Fragment>
                        <div className={`d-none d-sm-flex flex-column justify-content-center align-items-center`} style={{ width: "100%", height: "100%", padding: 90 }} >
                                <img className={`mb-2`} alt={`ANAC`} src = {`anac logo.jpeg`} />
                                <b className={`d-block`} style={{ textAlign: 'center', fontSize: 35, color: "#9c0505" }} > GESTIONNAIRE DE FICHIERS<br/>DNAA/ANAC/TOGO</b>
                        </div>
                        <div className={`d-flex d-sm-none flex-column justify-content-center align-items-center`} style={{ width: "100%", height: "100%" }} >
                                <img width={200} height={200} className={`mb-2`} alt={`ANAC`} src={`${window.location.origin}/anac logo.jpeg`} />
                                <b className={`d-block`} style={{ textAlign: 'center', color: "#9c0505" }} > AGENCE NATIONALE<br/>DE L'AVIATION CIVILE DU TOGO</b>
                        </div>
                </React.Fragment>
        )
}


function Header()
{

        const navigate = useNavigate()

        const dropMenuItemsUser = (
        <Box>
                <div className=" d-flex flex-column justify-content-center align-items-center py-4" data-background-image="./style/assets/media/image/user/man_avatar3.jpg" style={{background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100}}
                     onClick={
                        e =>
                        {
                                navigate("/user_information")
                        }
                     }
                >
                        <Avatar alt={`${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}`} src="" />
                        <h5 className="mb-0">{`${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}`}</h5>
                </div>
                <div className="dropdown-divider"/>
                <a className="list-group-item text-danger" onClick={
                        event =>
                        {
                                event.preventDefault(); event.stopPropagation()

                                const queryBody = new FormData()

                                toast.promise(
                                http.post('/logout', queryBody),
                                        {
                                                loading: "Déconnexion...",
                                                success: "Vous etes déconnecté !!",
                                                error: "Erreur de déconnexion"
                                        }
                                )
                                .then(
                                        res =>
                                        {
                                                // console.log(res)
                                                setTimeout( () => { navigate("/login") }, 1000 )
                                        }
                                )
                                .catch(err => {console.log(err)})
                        }
                } >Sign Out!</a>
        </Box>
        )
        const dropTogglerContentUser = (
        <React.Fragment>
                <Typography variant='userDropButton' >
                        <Stack className=''  direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >
                                <span className='m-5' > {`${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}`} </span>

                                <Avatar sx={{ bgcolor: 'green' }}>{window.Global_State.authUser.name[0]}</Avatar>
                                <MdOutlineArrowDropDownCircle />
                        </Stack>
                </Typography>
        </React.Fragment>
        )


        return (
                <React.Fragment>
                        <div className="d-sm-flex justify-content-start flex-sm-column container-fluid p-0"
                             style={{
                                     minWidth: 280
                             }}
                        >

                                <Stack className='justify-content-sm-end justify-content-center m-2' direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >

                                        {useMemo( () => <Notifications/>, [window.Global_State.authUser.asking_permission_notifications] )}

                                        {useMemo( () => <QuickSettings />, [window.Global_State.isEditorMode] )}

                                        <window.Global_State.CustomDropDown id = 'userPanel' icon={dropTogglerContentUser} content={dropMenuItemsUser} />

                                </Stack>

                                <Global_research display={'d-flex d-sm-none'} />

                        </div>
                </React.Fragment>
        );
}
function Responsive_header({component})
{

        const [open, setOpen] = useState(false);
        const ref = useRef()

        const handleOpen = e =>
        {
                // console.log("Open header")

                ref.current.style.position = "absolute"
                ref.current.style.top = 0
                ref.current.style.right = 0
                ref.current.style.zIndex = 1000
                // ref.current.style.width = "80%"
                ref.current.style.height = "fit-content"

                setOpen(true)
        }

        const handleClose = () =>
        {
                // console.log("Close header")

                ref.current.style.position = "unset"
                ref.current.style.top = "unset"
                ref.current.style.left = "unset"
                ref.current.style.zIndex = "unset"
                ref.current.style.width = "100%"
                ref.current.style.height = "100%"

                setOpen(false)
        }

        return(
        <div ref={ref} className={"full_size_element wrapper_xs_size_header"} >
                {
                        !open ?
                        <div className="full_size_element d-flex justify-content-start align-items-center" onClick={handleOpen} >
                                <Tooltip title={window.current_location}>
                                        <b
                                        style={{
                                                fontSize: 16,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: 'nowrap'
                                        }}
                                        >
                                                {window.current_location}
                                        </b>
                                </Tooltip>
                        </div>
                        :
                        <div className="content_header_xs_size"
                             style={{ animation: "fadeMe 0.3s", position: "relative" }}
                        >
                                {
                                        createPortal(
                                        <div className="custom_overlay" onClick={handleClose} > </div>,
                                        document.getElementById("file_loaded")
                                        )
                                }
                                {component}
                        </div>
                }
        </div>
        )
}


function GroupByServiceComponent({service, sections})
{
        const [anchorEl, setAnchorEl] = useState(null);

        const handlePopoverOpen = (event) => {
                // console.log("enterrrrrrrrrr", service.name, open)
                setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
                // console.log("closinnnnnnnnnnnnnnnnnnnnnnnnng", service.name, open)
                setAnchorEl(null);
        };

        const open = Boolean(anchorEl);

        const selectedSection = window.Global_State.sections.get(window.Global_State.selectedSectionId)

        const is_active = Boolean( selectedSection.services.find( sectionService => sectionService.id === service.id ) )

        return(
                <div>
                        <Typography
                        variant={'div'}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        >
                                <Chip className={`d-flex p-2 full_size_element`} tabIndex={-1} variant={`${ is_active ? "outlined" : "filled"}`}
                                        style={{
                                                borderColor: "blue"
                                        }}
                                        // disabled={is_active}
                                        onClick = {handlePopoverOpen}
                                        color={"primary"}
                                        label={
                                              <b
                                              style={{
                                                      maxWidth: "100%",
                                                      overflow: "hidden",
                                                      textOverflow: 'ellipsis',
                                                      color: `${ is_active ? "blue" : "white"}`,
                                              }}
                                              >
                                                      { service.name }
                                              </b>
                                        }
                                />
                        </Typography>
                        <Popover
                                id={`${service.name}-over-popover`}
                                PaperProps={{
                                        className: 'd-flex',
                                        style: {
                                                marginLeft: 20,
                                                border: "thin solid blue",
                                                boxShadow: "none",
                                        }
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right',
                                }}
                                transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                        >
                                <Typography variant={'div'} sx={{ p: 1 }}>
                                        <Stack direction={`column`} spacing={2} className="full_size_element d-flex justify-content-center align-items-center">
                                                {
                                                        sections.map(
                                                                (section, idx) =>
                                                                {
                                                                        // console.log(sections)
                                                                        return (
                                                                        <Tooltip key={ idx } title={section.name} placement="right-start" >
                                                                                        <span className="full_size_element" style={{
                                                                                                height: "fit-content"
                                                                                        }} >
                                                                                                <Button className={`d-flex p-2 full_size_element`} tabIndex={-1} variant="text"
                                                                                                        style={{
                                                                                                                borderColor: "blue"
                                                                                                        }}
                                                                                                        disabled={window.Global_State.selectedSectionId === section.id}
                                                                                                        onClick = {
                                                                                                                () => {
                                                                                                                        const overlay = document.getElementById("section_side_bar_responsive_overlay")
                                                                                                                        if (overlay) overlay.click()
                                                                                                                        window.Global_State.setSectionId(section.id)
                                                                                                                        // window.Global_State.backend.setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section.id) )
                                                                                                                }
                                                                                                        }
                                                                                                >

                                                                                                        <b
                                                                                                        style={{
                                                                                                                maxWidth: "100%",
                                                                                                                overflow: "hidden",
                                                                                                                textOverflow: 'ellipsis',
                                                                                                                color: `${window.Global_State.selectedSectionId === section.id ? '' : 'blue'}`,
                                                                                                        }}
                                                                                                        >
                                                                                                                { section.name }
                                                                                                        </b>
                                                                                                </Button>
                                                                                        </span>
                                                                        </Tooltip>
                                                                        )
                                                                }
                                                        )
                                                }
                                        </Stack>
                                </Typography>
                        </Popover>
                </div>
        )

}
function Sections_side_bar()
{
        let sections = []
        // console.log(window.Global_State.sections)
        window.Global_State.sections.forEach(
        (section) =>
        {
                sections.push( section )
        }
        )

        let services = [...window.Global_State.authUser.services]

        return (
                <div className="navigation_content full_size_element" >
                        <div className="anac_logo">
                                <a href="/" className="full_size_element">
                                        <img className="full_size_element" src={`${window.location.origin}/Favicon_anac.png`} alt="logo"/>
                                </a>
                        </div>
                        <div className="sections_div" >
                                {
                                        services.length > 1 ?
                                        <Stack direction={`column`} spacing={2} className="full_size_element d-flex justify-content-center align-items-center">
                                                {
                                                        services.map(
                                                        (service, idx) =>
                                                        {
                                                                // console.log(sections)

                                                                const service_sections = sections.filter(
                                                                section => Boolean( section.services.find( section_service => section_service.id === service.id ) )
                                                                )

                                                                return (
                                                                <GroupByServiceComponent key={idx} service={service} sections={service_sections} />
                                                                )
                                                        }
                                                        )
                                                }
                                        </Stack>
                                        :
                                        <Stack direction={`column`} spacing={2} className="full_size_element d-flex justify-content-center align-items-center">
                                                {
                                                        sections.map(
                                                        (section, idx) =>
                                                        {
                                                                // console.log(sections)
                                                                return (
                                                                <Tooltip key={ section.id } title={section.name} placement="right-start" >
                                                                                <span className="full_size_element" style={{
                                                                                        height: "fit-content"
                                                                                }} >
                                                                                        <Button className={`d-flex p-2 full_size_element`} tabIndex={-1} variant={`${window.Global_State.selectedSectionId === section.id ? "outlined" : "text"}`}
                                                                                                style={{
                                                                                                        borderColor: "blue"
                                                                                                }}
                                                                                                disabled={window.Global_State.selectedSectionId === section.id}
                                                                                                onClick = {
                                                                                                        () => {
                                                                                                                const overlay = document.getElementById("section_side_bar_responsive_overlay")
                                                                                                                if (overlay) overlay.click()
                                                                                                                window.Global_State.setSectionId(section.id)
                                                                                                                // window.Global_State.backend.setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section.id) )
                                                                                                        }
                                                                                                }
                                                                                        >

                                                                                                <b
                                                                                                style={{
                                                                                                        maxWidth: "100%",
                                                                                                        overflow: "hidden",
                                                                                                        textOverflow: 'ellipsis',
                                                                                                        color: `${window.Global_State.selectedSectionId === section.id ? '' : 'blue'}`,
                                                                                                }}
                                                                                                >
                                                                                                        { section.name }
                                                                                                </b>
                                                                                        </Button>
                                                                                </span>
                                                                </Tooltip>
                                                                )
                                                        }
                                                        )
                                                }
                                        </Stack>
                                }
                        </div>
                        {/*<IconButton size={`large`} color={`primary`} style={{ width: "fit-content" }} >*/}
                        {/*        <ManageAccountsTwoToneIcon style={{ fontSize: 60, color: "blue" }} />*/}
                        {/*</IconButton>*/}
                </div>
        );

}
function Responsive_sections_side_bar({component, icon})
{
        const [show, setShow] = useState(false)
        const ref = useRef()

        const [ open, close ] =
        [
                (e) =>
                {
                        e.preventDefault()
                        e.stopPropagation()
                        // console.log("opppppeeeeeeeeeeen", e.target)
                        // const element = document.getElementById("section_side_bar_responsive")
                        ref.current.style.height = "95vh"

                        setTimeout( () => { setShow(true) }, 200 )
                },
                (e) =>
                {
                        e.preventDefault()
                        e.stopPropagation()
                        // console.log("clossssssssssssssse")
                        // const element = document.getElementById("section_side_bar_responsive")
                        ref.current.style.height = "100%"

                        setShow(false)
                },
        ]

        return (
                <div id={"section_side_bar_responsive"} ref={ref} tabIndex={-1} onClick={open} /*onBlur={close}*/ >
                        {
                                show ?
                                <div className="full_size_element" tabIndex={-1} style={{ animation: "fadeMe 0.3s", position: "relative" }} onClick={ e => { /*console.log(e);*/ e.preventDefault(); e.stopPropagation() } }  >
                                        {
                                                createPortal(
                                                <div id={"section_side_bar_responsive_overlay"} className="custom_overlay" onClick={close} > </div>,
                                                document.getElementById("file_loaded")
                                                )
                                        }
                                        {component}
                                </div>
                                : icon
                        }
                </div>
        )
}


function Responsive_file_tree()
{


        const offsetX = useRef(0)
        const offsetY = useRef(0)

        // const content = useRef(component)
        //
        // useEffect(
        //         () =>
        //         {
        //                 content.current = component
        //                 console.log("component change")
        //         }, [component]
        // )

        const on_left = useRef(false)

        const set_initials = (e) =>
        {

                const element = document.getElementById("file_tree_responsive");

                // X here is the distance between element and the left border
                const X = element.offsetLeft
                const Y = element.offsetTop

                offsetX.current = e.clientX - X
                offsetY.current = e.clientY - Y

                // console.log("Drag startttttttttttt", offsetX, offsetY )
                // console.log("element.offsetLeft", element.offsetLeft)
        }

        function arrange(distance, max, component_size, strict = false)
        {
                if (strict)
                {
                        if (distance < max/2) return 0
                        if (distance > max/2) return max - component_size
                }
                else
                {
                        if (distance < 0) return 0
                        if (distance > max) return max - component_size
                }

                return distance
        }

        const put_down = (e) =>
        {
                e.preventDefault()
                e.stopPropagation()

                // X here is the distance between element and the left border
                const X = e.clientX - offsetX.current
                // X here is the distance between element and the right border
                const xOpposite =  window.innerWidth - X - 48

                const Y = e.clientY - offsetY.current

                const newX = arrange(xOpposite, window.innerWidth, 48, true)
                const newY = arrange(Y, window.innerHeight, 48)

                // console.log("New plaaaaaaaaace", xOpposite, newY)

                on_left.current = Boolean(newX)

                const element = document.getElementById("file_tree_responsive");

                element.style.top = `${newY}px`;
                element.style.right = `${newX}px`;
        }





        const [open, setOpen] = useState(false);

        const handleClick = e =>
        {
                // console.log("Toggle file treeeeeeeeeeeeeeeeee", on_left)
                setOpen( !open)
        }
        const handleClose = () => setOpen(false)



        return(
                <React.Fragment>
                        <div id={"file_tree_responsive"} className="file_tree_sm_size"  > {/*draggable="true" onDragStart={set_initials} onDragEnd={put_down}*/}
                                <IconButton  onClick={handleClick} >
                                        <GiPalmTree size={30} color={"brown"} />
                                </IconButton>
                        </div>

                        <Offcanvas show={open} onHide={handleClose} placement="end" >
                                <Offcanvas.Body>
                                        <div className="full_size_element" >
                                                {window.files_family.fileTree}
                                        </div>
                                </Offcanvas.Body>
                        </Offcanvas>
                </React.Fragment>
        )
}





function Load({datas})
{
        // const initData = d
        // const [le, setLe] = useState(initData)
        // console.log("Leeeee", le);
        window.Global_State = useGetData(JSON.parse(JSON.stringify(datas)))
        // console.log(window.Global_State)

        window.files_family = useGetFiles(<Global_research display={'d-none d-sm-flex'} />)

        const leftSideBar = <Sections_side_bar/>;
        const header = <Header />

        const k = <Lol />

        return(
        <div id={"file_loaded"} className={`full_size_element`} >
                <div>
                        <Toaster
                        toastOptions={{
                                // Define default options
                                className: '',
                                duration: 3000,
                                position: 'top-right',
                                style:
                                {
                                        maxWidth: 1920,
                                        // background: 'yellow',
                                },

                                // Default options for specific types
                                // success: {
                                //     duration: 3000,
                                //     theme: {
                                //         primary: 'green',
                                //         secondary: 'black',
                                //     },
                                // }
                        }}
                        />
                </div>
                {/* {overlaySideBar} */}
                {window.Global_State.Overlay_component}
                {window.Global_State.absolutePopover.popover}
                {window.Global_State.modalManager.modal}
                {window.Global_State.editor.save_component}
                {window.files_family.fileDetails}

                <div className="full_size_element layout-wrapper d-none d-xl-block">
                        <Stack className="full_size_element d-flex" direction="row" spacing={0.5} alignItems = 'center' justifyContent='flex-end' >

                                <div className = 'navigation_side_bar d-block' >
                                        {leftSideBar}
                                </div>

                                <div className="content_xl_size" >

                                        <div className="full_size_element d-flex flex-column justify-content-between" >
                                                <div className="content_xl_size_header" >
                                                        <Tooltip title={window.current_location}>
                                                                <b
                                                                style={{
                                                                        fontSize: 16,
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: 'nowrap'
                                                                }}
                                                                >
                                                                        {window.current_location}
                                                                </b>
                                                        </Tooltip>
                                                        <div style={{minWidth: 'fit-content', display: 'block' }} >
                                                                {header}
                                                        </div>
                                                </div>

                                                <div className="content_xl_size_content" >

                                                        <Stack className="full_size_element" direction={"row"} spacing={2} >
                                                                <div className="file_tree_xl_size" >
                                                                        { window.files_family.fileTree }
                                                                </div>
                                                                <div className="file_table_xl_size" >
                                                                        { window.files_family.fileTable }
                                                                </div>
                                                        </Stack>

                                                        {/*<div className="content-wrapper" style={{ width: '100%' }}>*/}
                                                        {/*        <div className="sidebar-group d-print-none">*/}

                                                        {/*                { files.fileDetails }*/}

                                                        {/*        </div>*/}

                                                        {/*</div>*/}
                                                </div>
                                        </div>

                                </div>

                        </Stack>
                </div>

                <div className="full_size_element layout-wrapper d-none d-xl-none d-sm-block">

                        <div className="full_size_element" >

                                <div className="content_sm_size p-2" >
                                        <div
                                                style={{
                                                        width: "100%",
                                                        height: "8%",
                                                        backgroundColor: "#f6f8fc",
                                                        display: "flex",
                                                        justifyContent: "space-between"
                                                }}
                                        >
                                                <Responsive_sections_side_bar component={leftSideBar} icon={<HiOutlineMenuAlt2 color={"blue"} size={45} />} />
                                                <div className={"full_size_element content_sm_size_header"} >
                                                        <Tooltip title={window.current_location}>
                                                                <b
                                                                style={{
                                                                        fontSize: 16,
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: 'nowrap'
                                                                }}
                                                                >
                                                                        {window.current_location}
                                                                </b>
                                                        </Tooltip>
                                                        <div style={{minWidth: 'fit-content', display: 'block' }} >
                                                                {header}
                                                        </div>
                                                </div>
                                        </div>

                                        <div className="content_xl_size_content" >

                                                <Responsive_file_tree />

                                                <div className="full_size_element" >
                                                        {/*{k}*/}
                                                        { window.files_family.fileTable }
                                                </div>

                                        </div>

                                </div>

                        </div>

                </div>

                <div className="full_size_element layout-wrapper d-block d-sm-none">

                        <div className="full_size_element" >

                                <div className="content_sm_size p-2" >
                                        <div
                                        style={{
                                                width: "100%",
                                                height: "8%",
                                                backgroundColor: "#f6f8fc",
                                                display: "flex",
                                                justifyContent: "space-between"
                                        }}
                                        >
                                                <Responsive_sections_side_bar component={leftSideBar} icon={<HiOutlineMenuAlt2 color={"blue"} size={45} />} />
                                                <Responsive_header component={header} />
                                        </div>

                                        <div className="content_xl_size_content" >

                                                <Responsive_file_tree />

                                                <div className="full_size_element" >
                                                        {/*{k}*/}
                                                        { window.files_family.fileTable }
                                                </div>

                                        </div>

                                </div>

                        </div>

                </div>

        </div>
        )
}

function File_home()
{
        window.show_response = (msg, type) =>
        {
                const msg_part = [...msg.split("L@O%L&")]

                toast(
                        (t) =>
                        (
                                // t.visible ?
                                <Alert onClose={ () => toast.dismiss(t.id) } severity={type} sx={{ width: 'fit-content', minWidth: 300, animation: "fadeMe 0.3s" }}>
                                        <AlertTitle> { type.replace(/^\w/, c => c.toUpperCase()) } </AlertTitle>
                                        {
                                                msg_part.map(
                                                        (value, idx) =>
                                                        (
                                                                <div key={idx} >
                                                                        {value}
                                                                </div>
                                                        )
                                                )

                                        }
                                </Alert>
                        ),
                        {
                                position: "bottom-left",
                                duration: type === "error" ? Infinity : 3000,
                                style: {
                                        background: 'rgba(255,255,255,0)',
                                        padding: 0,
                                        boxShadow: 'unset',
                                },
                        }
                )
                // swal({
                //         title: "Error",
                //         text: msg,
                //         icon: type
                // })
        }

        document.onkeydown = function (e) {
                if(e.ctrlKey && e.key === 'f') return false
                if(e.ctrlKey && e.key === 'd') return false
                if(e.ctrlKey && e.key === 'r') return false
        }

        const [Data_Base, setData_base] = useState(null)

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        const container  = Data_Base === null ? <div className="preloader"> <div className="preloader-icon" /> </div> : <Load datas ={JSON.parse(JSON.stringify(Data_Base))} />

        useEffect(() => {
                async function FetchData()
                {
                        const Datas = await getFromDataBase()
                        setData_base(Datas)

                }
                FetchData()
        }, [])

        // console.log("render")

        const theme = createTheme({
                typography: {
                        fontFamily: '"Josefin Sans", sans-serif',
                        userDropButton:
                        {
                                '&:hover':
                                {
                                        color: '#6c757d',
                                },
                        },

                },
        });

        return(
        <ThemeProvider theme={theme}>
                {container}
        </ThemeProvider>
        )
}



function Page()
{

        // const [container, setContainer] = useState(<Presentation/>)
        const container = <Presentation />

        const navigate = useNavigate()

        useEffect(() => {
                setTimeout( () => { navigate("/files_browser") }, 3000 )
        }, [])

        // console.log("render")

        return(
        container
        )

}

const auth_loader = async () => {
        let user
        await http.get('user')
        .then(
                res =>
                {
                        // console.log(res)
                        user = res.data
                }
        )
        .catch( err => { console.log(err) })

        // console.log(user)

        if(user instanceof Object)
        {
                if ( !user.id ) return redirect("/administrator")
                else return redirect("/files_browser")
        }
        else return "ok"
};

const files_loader = async () => {
        let user
        await http.get('user')
        .then(
                res =>
                {
                        // console.log(res)
                        user = res.data
                }
        )
        .catch( err => { console.log(err) })

        // console.log(user)

        if(user === '') return redirect("/login")
        else if ( !user.id ) return redirect("/administrator")
        else return "ok"
};

const user_info_loader = async () => {
        let user
        await http.get('user')
        .then(
                res =>
                {
                        // console.log(res)
                        user = res.data
                }
        )
        .catch( err => { console.log(err) })

        // console.log(user)

        if(user === '') return redirect("/login")
        else if ( !window.Global_State || !window.Global_State.authUser ) return redirect("/files_browser")
        else if ( !user.id ) return redirect("/administrator")
        else return "ok"
};

const admin_loader = async () => {
        let user
        await http.get('user')
        .then(
                res =>
                {
                        // console.log(res)
                        user = res.data
                }
        )
        .catch( err => { console.log(err) })

        // console.log(user)

        if(user === '') return redirect("/login")
        else if ( user.id ) return redirect("/files_browser")
        else return "ok"
};

const router = createBrowserRouter([
        {
                path: "/",
                element: <Page />,
                errorElement: <ErrorPage />,
        },
        {
                path: "/login",
                element: <Login />,
                loader: auth_loader
        },
        {
                path: "/sign_in",
                element: <Create_account />,
                loader: auth_loader
        },
        {
                path: "/forgot_password",
                element: <Forgot_password />,
                loader: auth_loader
        },
        {
                path: "/reset_password",
                element: <Reset_password />,
                loader: auth_loader
        },
        {
                path: "/files_browser",
                element: <File_home />,
                loader: files_loader
        },
        {
                path: "/administrator",
                element: <Administrator_home />,
                loader: admin_loader,
        },
        {
                path: "/user_information",
                element: <User_infos />,
                loader: user_info_loader,
        },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <RouterProvider router={router} />
);