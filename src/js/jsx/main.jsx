/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer} from 'react';
import useGetData, {getFromDataBase} from "./data";
import ReactDOM from 'react-dom/client';
import toast from "react-hot-toast";

import useGetFiles from './files_package/files';
import Login from "./auth/login";
import { http } from "./data";
import { backend } from "./files_package/files";
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

import {Toaster} from "react-hot-toast";

// import './files.js';
import EventEmitter from 'eventemitter3';

export const test = "Success"


export let Global_State = {};



function Lol({lal}) {
    const EventsManager = new EventEmitter();

    const [o, setO] = useState([2,6,9,7,3])

    const [p, setP] = useState('p')

    function usela(g)
    {
        return setP
    }

    function emit()
    {
        
        console.log('dddddddd')
        EventsManager.emit('p')
    }

    function reducer(state, action)
    {
        return [action]
    }

    const [h, dispatch] = useReducer(reducer, ['89'])
    EventsManager.on('p', () => {console.log('set'); setP(t => t+t)})

    useEffect(
        () =>
        {
            EventsManager.emit('p')
        }, [h]
    )

    // useEffect(()=>{
    //     setTimeout(function()
    // {
    
    //     setO(o + 5)

    // }, 2000)
    // })
    
    console.log( p, h)

    // const k = usela()

    return (
        <div className="container" onClick={ () => {dispatch('22222')} } >
            {p}
        </div>
    );
}

/* <li>
    <a  href="activities.html">
        <i className="nav-link-icon ti-pulse"></i>
        <span className="nav-link-label">Activities</span>
        <span className="badge badge-warning">New</span>
    </a>
</li>*/


function Global_research({display})
{

        const [value, setValue] = useState('')
        // const [result_display, setDiaplay] = useState('d-none')

        const handleChange = (e) =>
        {
                e.stopPropagation()
                setValue(e.target.value)
                // if (e.target.value.length > 0) setDiaplay('d-flex')
                // else setDiaplay('d-none')
        }

        return(
                <div  >
                        <Form id={'global_research'} className ={`${display} container-fluid`} >
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={value}
                                onChange={handleChange}
                                />
                        </Form>

                        <Card id={'global_research_result'} className={`${value === '' ? 'd-none' : 'd-flex'} mt-1 p-1`} sx={{ maxHeight: 3*window.innerHeight/4,  }} >
                                <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                                <TableBody>
                                                        {
                                                                Global_State.dataToUse.filter(
                                                                        node => ( value !== '' ? node.name.indexOf(value) !== -1 : false)
                                                                ).map((node) => (
                                                                                <TableRow
                                                                                        key={node.id}
                                                                                        className={'m-1'}
                                                                                        sx={{ margin: 5 }}
                                                                                >
                                                                                        <TableCell component="th" scope="row">
                                                                                                {node.name}
                                                                                        </TableCell>
                                                                                        <TableCell align="left">{node.path}</TableCell>
                                                                                </TableRow>
                                                                        )
                                                                )
                                                        }
                                                </TableBody>
                                        </Table>
                                </TableContainer>
                        </Card>

                </div>
        )
}


function Header() 
{

        const dropMenuItemsUser = (
        <React.Fragment>
                <div className=" d-flex flex-column justify-content-center align-items-center py-4" data-background-image="./style/assets/media/image/user/man_avatar3.jpg" style={{background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100}} >
                        <Avatar alt={`${Global_State.authUser.name} ${Global_State.authUser.second_name}`} src="./style/assets/media/image/user/man_avatar3.jpg" />
                        <h5 className="mb-0">{`${Global_State.authUser.name} ${Global_State.authUser.second_name}`}</h5>
                </div>
                <div className="dropdown-divider"/>
                <a className="list-group-item text-danger" >Sign Out!</a>
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
                                {/* <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                Link
                </Nav.Link>
            </Nav>
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form> */}

                                {/*<Col md = {5} >*/}
                                {/*    <Form className="d-flex">*/}
                                {/*        <Form.Control*/}
                                {/*        type="search"*/}
                                {/*        placeholder="Search"*/}
                                {/*        className="me-2"*/}
                                {/*        aria-label="Search"*/}
                                {/*        value={pre.current}*/}
                                {/*        />*/}
                                {/*        <Button onClick={() => { console.log('handleClick'); Global_State.EventsManager.emit('increase')}} className='justify-content-center' variant="outline-primary" >Search</Button>*/}
                                {/*    </Form>*/}
                                {/*</Col>*/}

                                <div className={ 'd-flex justify-content-start flex-column container-fluid' } >

                                        <Stack className='justify-content-md-end justify-content-center m-2' direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >

                                                <Notifications/>

                                                <QuickSettings />

                                                <Global_State.CustomDropDown id = 'userPanel' icon={dropTogglerContentUser} content={dropMenuItemsUser} />

                                        </Stack>

                                        <Global_research display={'d-flex d-sm-none'} />

                                </div>

                        </Navbar.Offcanvas>
                </Container>
        </Navbar>
        );
}


function File_section()
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
                        <a href="index.html">
                            <img src="./style/assets/media/image/logo.png" alt="logo"/>
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
                                            backend.setCurrentSelectedFolder(Global_State.selectedNodeIdsInSections.get(section.id) ) 
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



function Home()
{

        document.onkeydown = function (e) {
                if(e.ctrlKey && e.key === 'f') return false
        }

        const [Data_Base, setData_base] = useState(null)

        // useEffect(()=>(
        //     console.log("Daaa a change !!!", Data_Base)
        // ), [Data_Base])

        // console.log("da", Data_Base);

        // console.log(Data_Base)

        const container  = Data_Base === null ? <div className="preloader"> <div className="preloader-icon"></div> </div> : <Load datas ={JSON.parse(JSON.stringify(Data_Base))} />

        function Load({datas})
        {
                // const initData = d
                // const [le, setLe] = useState(initData)
                // console.log("Leeeee", le);
                Global_State = useGetData(JSON.parse(JSON.stringify(datas)))
                console.log(Global_State)

                const files = useGetFiles(<Global_research display={'d-none d-sm-flex'} />)

                const leftSideBar = <File_section/>;

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
                                                                                                        <div class="card">
                                                                                                                <div class="card-body">
                                                                                                                        <div class="card-scroll" >
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

                                                                        <div className="sidebar" id="settings">
                                                                                <div className="sidebar-header">
                                                                                        <h4>Settings</h4>
                                                                                        <a href="#" className="btn btn-light btn-floating sidebar-close-btn">
                                                                                                <i className="ti-angle-right"></i>
                                                                                        </a>
                                                                                </div>
                                                                                <div className="sidebar-content">
                                                                                        <ul className="list-group list-group-flush">
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked/>
                                                                                                                <label className="custom-control-label" for="customSwitch1">Allow notifications.</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch2"/>
                                                                                                                <label className="custom-control-label" for="customSwitch2">Hide user requests</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch3" checked/>
                                                                                                                <label className="custom-control-label" for="customSwitch3">Speed up demands</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch4" checked/>
                                                                                                                <label className="custom-control-label" for="customSwitch4">Hide menus</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch5"/>
                                                                                                                <label className="custom-control-label" for="customSwitch5">Remember next visits</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                                <li className="list-group-item pl-0 pr-0">
                                                                                                        <div className="custom-control custom-switch">
                                                                                                                <input type="checkbox" className="custom-control-input" id="customSwitch6"/>
                                                                                                                <label className="custom-control-label" for="customSwitch6">Enable report
                                                                                                                        generation.</label>
                                                                                                        </div>
                                                                                                </li>
                                                                                        </ul>
                                                                                </div>
                                                                        </div>

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




        return(
        <React.Fragment>
                {container}
        </React.Fragment>
        )
}



function Page()
{

        const [container, setContainer] = useState(
        <div>
            ANAC
        </div>
        )


        useEffect(() => {
            function checkAuthState()
            {
                http.get('user').then(res =>
                    {
                        console.log(res)
                        if(res.data === '') setContainer(<Login redirectTo = {() => {setContainer(<Page/>)}} />) 
                        else setContainer(<Home/>)
                    }
                    )
                    .catch( err => { console.log(err) })
            
            }
            checkAuthState()
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




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);