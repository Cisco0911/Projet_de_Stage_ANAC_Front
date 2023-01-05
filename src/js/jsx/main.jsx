/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer, useMemo} from 'react';
import useGetData, {getFromDataBase} from "./data";
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
import {TiThumbsDown, TiThumbsOk} from "react-icons/ti";
import { MdNotificationsActive, MdOutlineArrowDropDownCircle } from "react-icons/md";

import toast, {Toaster} from "react-hot-toast";

import {
        createBrowserRouter,
        RouterProvider,
} from "react-router-dom";
import { useRouteError, redirect, useNavigate } from "react-router-dom";



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


export let Global_State = {};



function Lol({lal}) {

        const [o, setO] = useState(true)

        let [iconOK, iconNO] =
        [
                <TiThumbsOk size={24} color={'red'} />,
                <TiThumbsDown size={24} color={'green'} />
        ]

        if (!o)
        {
                iconOK = <span> p </span>
        }

        return (
        <div onClick={ event => { setO(!o) } }
             style={
                     {
                             width: '100vh',
                             height: '100vh',
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center"
                     }
             }
        >
                {iconOK}
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
        <React.Fragment>
                <div className=" d-flex flex-column justify-content-center align-items-center py-4" data-background-image="./style/assets/media/image/user/man_avatar3.jpg" style={{background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100}} >
                        <Avatar alt={`${Global_State.authUser.name} ${Global_State.authUser.second_name}`} src="./style/assets/media/image/user/man_avatar3.jpg" />
                        <h5 className="mb-0">{`${Global_State.authUser.name} ${Global_State.authUser.second_name}`}</h5>
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
                                                console.log(res)
                                                setTimeout( () => { navigate("/login") }, 1000 )
                                        }
                                )
                                .catch(err => {console.log(err)})
                        }
                } >Sign Out!</a>
        </React.Fragment>
        )
        const dropTogglerContentUser = (
        <React.Fragment>
                <Typography variant='userDropButton' >
                        <Stack className=''  direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >
                                <span className='m-5' > {`${Global_State.authUser.name} ${Global_State.authUser.second_name}`} </span>

                                <Avatar sx={{ bgcolor: 'green' }}>N</Avatar>
                                <MdOutlineArrowDropDownCircle />
                        </Stack>
                </Typography>
        </React.Fragment>
        )


        return (
        <Navbar /* bg="light"  */ expand="sm" style={{padding: 0}}>
                <Container fluid style={{ justifyContent: 'end', alignItems: 'start', paddingRight: '15px', }} >
                        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
                        <Navbar.Toggle className='p-0  justify-content-start align-items-start d-flex d-sm-none' aria-controls={`offcanvasNavbar-expand-${'sm'}`} children = {<GiOverhead size={40} />}
                                       style={{
                                               width: 60,
                                               color: 'rgb(0 0 0)',
                                               transform: 'rotateY(180deg)',
                                               paddingLeft: 17,
                                               border: 'none',
                                       }} />
                        <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'sm'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
                        placement="top"
                        className = 'container-fluid d-flex flex-row justify-content-end'
                        style={{/* width: '100%' */ height: 105, padding: 0}}
                        >
                                <div className={ 'd-flex justify-content-start flex-column container-fluid p-0' } >

                                        <Stack className='justify-content-sm-end justify-content-center m-2' direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >

                                                {useMemo( () => <Notifications/>, [Global_State.authUser.asking_permission_notifications] )}

                                                {useMemo( () => <QuickSettings />, [Global_State.isEditorMode] )}

                                                <Global_State.CustomDropDown id = 'userPanel' icon={dropTogglerContentUser} content={dropMenuItemsUser} />

                                        </Stack>

                                        <Global_research display={'d-flex d-sm-none'} />

                                </div>

                        </Navbar.Offcanvas>
                </Container>
        </Navbar>
        );
}


function Sections_side_bar()
{
        let sections = []
        // console.log(Global_State.sections)
        Global_State.sections.forEach(
        (section) =>
        {
                sections.push( section )
        }
        )

        return (
        <div style={{width: 'auto', height: 'auto' }}>
                <Navbar key={'xl'} expand={'xl'} style = {{padding: '0 30px'}} >
                        <Container fluid style={{ justifyContent: 'start', alignItems: 'start' }} >
                                {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
                                <Navbar.Toggle className='p-0 d-flex justify-content-center align-items-start' aria-controls={`offcanvasNavbar-expand-${'xl'}`} children = {<AiOutlineMenuUnfold size={50} />}
                                               style={{
                                                       width: 50,
                                                       height: 50,
                                                       color: 'rgb(0 0 0)',
                                                       border: 'none',
                                               }}
                                />
                                <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${'xl'}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${'xl'}`}
                                placement="start"
                                style={{width: 110 }}
                                >
                                        <div className="navigation bg-dark" >
                                                <div className="logo">
                                                        <a href="/">
                                                                <img width={100} height={100} src={`${window.location.origin}/Favicon_anac.png`} alt="logo"/>
                                                        </a>
                                                </div>
                                                <ul>
                                                        {
                                                                sections.map(
                                                                (section, idx) =>
                                                                {
                                                                        // console.log(sections)
                                                                        return (
                                                                        <li key={ section.id } className= { sections.length - 1 === idx ? "flex-grow-1" : "" } style = {{marginBottom: 10}} onClick = { async () => {
                                                                                await Global_State.setSectionId(section.id)
                                                                                Global_State.backend.setCurrentSelectedFolder(Global_State.selectedNodeIdsInSections.current.get(section.id) )
                                                                        } } >

                                                                                <a  className= { Global_State.selectedSectionId === section.id ? "active" : "" } >
                                                                                        <i className="nav-link-icon ti-file"></i>
                                                                                        <span className="nav-link-label">{ section.name }</span>
                                                                                </a>
                                                                        </li>
                                                                        )
                                                                }
                                                                )
                                                        }


                                                        <li>
                                                                <a  href="settings.html">
                                                                        <i className="nav-link-icon ti-settings"></i>
                                                                        <span className="nav-link-label">Settings</span>
                                                                </a>
                                                        </li>
                                                </ul>
                                        </div>
                                </Navbar.Offcanvas>
                        </Container>
                </Navbar>
        </div>
        );

}



function File_home()
{

        document.onkeydown = function (e) {
                if(e.ctrlKey && e.key === 'f') return false
                if(e.ctrlKey && e.key === 'd') return false
        }

        const [Data_Base, setData_base] = useState(null)

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        // console.log(Data_Base)

        const container  = Data_Base === null ? <div className="preloader"> <div className="preloader-icon" /> </div> : <Load datas ={JSON.parse(JSON.stringify(Data_Base))} />

        function Load({datas})
        {
                // const initData = d
                // const [le, setLe] = useState(initData)
                // console.log("Leeeee", le);
                Global_State = useGetData(JSON.parse(JSON.stringify(datas)))
                console.log(Global_State)

                const files = useGetFiles(<Global_research display={'d-none d-sm-flex'} />)

                const leftSideBar = <Sections_side_bar/>;

                const [ hide, setHide ] = useState(false)

                const overlaySideBar =
                <div className='d-xl-none' hidden = {hide} style={{ width: '100%', height: '100%', backgroundColor: 'red', position: 'absolute', zIndex: 999,}} >
                        <div />
                        {leftSideBar}
                </div>

                return(
                <div>
                        <div>
                                <Toaster
                                // containerStyle={{ maxWidth: Infinity, }}
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
                        {Global_State.Overlay_component}
                        {Global_State.modalManager.modal}

                        <div className="layout-wrapper">

                                <Stack direction="row" spacing={0.5} alignItems = 'center' justifyContent='flex-end' >
                                        <Col xl = {1} className = 'd-none d-xl-block' >
                                                {leftSideBar}
                                        </Col>

                                        <Col xl = {11} >

                                                <Row sm = {1} style = {
                                                        {
                                                                position: 'sticky',
                                                                top: 0,
                                                                // width: '100%',
                                                                backgroundColor: 'white',
                                                                whiteSpace: 'normal',
                                                                zIndex: 999,
                                                        }}
                                                >
                                                        <Row>
                                                                <div style={{ marginTop: 20, width: '100%', display: 'block' }} />
                                                        </Row>
                                                        <Row sm = {12} >
                                                                <div style={{width: '100%', display: 'block' }} >
                                                                        <Row >

                                                                                <Col className='d-xl-none' md = {2} xs = {4} >
                                                                                        {leftSideBar}
                                                                                </Col>
                                                                                <Col className='d-flex' md = {10} xs = {8} xl = {12} style={{padding: 0, alignItems: 'center'}}>
                                                                                        <div style={{ width: '100%' }}>
                                                                                                <Header />
                                                                                        </div>
                                                                                </Col>

                                                                        </Row>
                                                                </div>
                                                        </Row>
                                                </Row>

                                                <Row sm = {11} >
                                                        <div className="content-wrapper" style={{ width: '100%' }}>

                                                                <div className="content-body">

                                                                        <div className="content" style={{ paddingLeft: 0, paddingTop: 30, }} >
                                                                                <div className="page-header d-flex justify-content-between">
                                                                                        <h2>Files</h2>
                                                                                        <a href="#" className="files-toggler">
                                                                                                <i className="ti-menu"></i>
                                                                                        </a>
                                                                                </div>

                                                                                <div className="row">
                                                                                        <div className="col-xl-4 files-sidebar">
                                                                                                <div className="card border-0">
                                                                                                        <h6 className="card-title">My Folders</h6>
                                                                                                        <div className="card">
                                                                                                                <div className="card-body">
                                                                                                                        <div className="card-scroll" >
                                                                                                                                { files.fileTree }
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                        { files.fileTable }
                                                                                </div>


                                                                        </div>

                                                                        <footer className="content-footer d-print-none">
                                                                                <div>© 2022 ESSOAZINA - <a href="https://www.anac-togo.tg" target="_blank">ANAC</a></div>
                                                                                <div>
                                                                                        <nav className="nav">
                                                                                                <a href="https://themeforest.net/licenses/standard" className="nav-link">Licenses</a>
                                                                                                <a href="#" className="nav-link">Change Log</a>
                                                                                                <a href="#" className="nav-link">Get Help</a>
                                                                                        </nav>
                                                                                </div>
                                                                        </footer>

                                                                </div>



                                                                <div className="sidebar-group d-print-none">

                                                                        { files.fileDetails }

                                                                </div>

                                                        </div>
                                                </Row>

                                        </Col>

                                </Stack>




                        </div>

                </div>
                )
        }


        useEffect(() => {
                async function FetchData()
                {
                        const Datas = await getFromDataBase()
                        setData_base(Datas)

                }
                FetchData()
        }, [])

        console.log("render")

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

        useEffect(() => {
                setTimeout( () => { navigate("/files") }, 3000 )
        }, [])

        console.log("render")

        return(
        container
        )

}

const loader = async () => {
        let user
        await http.get('user')
        .then(
                res =>
                {
                        console.log(res)
                        user = res.data
                }
        )
        .catch( err => { console.log(err) })

        console.log(user)

        if(user === '') return redirect("/login")
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
        },
        {
                path: "/files",
                element: <File_home />,
                loader: loader
        },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
        <RouterProvider router={router} />
</React.StrictMode>
);