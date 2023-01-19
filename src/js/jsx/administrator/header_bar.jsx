/* eslint-disable import/first */

import React, {useState, useEffect, useMemo} from 'react';
import Stack from "@mui/material/Stack";
import Notifications from "../auth/user_notification";

import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import Avatar from "@mui/material/Avatar";
import {http} from "../auth/login";
import Typography from "@mui/material/Typography";

import {MdOutlineArrowDropDownCircle} from "react-icons/md";
import {Box, Popover, Popper} from "@mui/material";











export default function Header_bar({user})
{

        const navigate = useNavigate()


        const dropTogglerContentUser = (
        <React.Fragment>
                <Typography variant='userDropButton' >
                        <Stack className=''  direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >
                                <span className='m-5' > {`${user.name} ${user.second_name}`} </span>

                                <Avatar sx={{ bgcolor: 'green' }}>N</Avatar>
                                <MdOutlineArrowDropDownCircle />
                        </Stack>
                </Typography>
        </React.Fragment>
        )

        const dropMenuItemsUser = (
        <React.Fragment>
                <div className=" d-flex flex-column justify-content-center align-items-center py-4" data-background-image="./style/assets/media/image/user/man_avatar3.jpg" style={{background: 'url("./style/assets/media/image/user/man_avatar3.jpg")', width: 300, height: 100}} >
                        <Avatar alt={`${user.name} ${user.second_name}`} src="./style/assets/media/image/user/man_avatar3.jpg" />
                        <h5 className="mb-0"
                            style={{
                                    textAlign: "center",
                                    textOverflow: "ellipsis",
                            }}
                        >
                                {`${user.name} ${user.second_name}`}
                        </h5>
                </div>
                <div className="dropdown-divider"/>
                <a className="list-group-item text-danger" onClick={
                        event =>
                        {
                                event.stopPropagation()
                                event.preventDefault();

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

        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
                setAnchorEl(anchorEl ? null : event.currentTarget);
        };
        const handleClose = (event) => {
                setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'user_info_popper' : undefined;

        return (
        <React.Fragment>
                <div className="d-sm-flex justify-content-start flex-sm-column container-fluid p-0"
                     style={{
                             minWidth: 280
                     }}
                >

                        <Stack className='justify-content-sm-end justify-content-center m-2' direction="row" spacing={1} alignItems = 'center' justifyContent='flex-end' >

                                {/*{useMemo( () => <Notifications/>, [window.Global_State.authUser.asking_permission_notifications] )}*/}

                                <div>
                                        <div aria-describedby={id} onClick={handleClick}>
                                                {dropTogglerContentUser}
                                        </div>
                                        <Popover id={id}
                                                 open={open}
                                                 anchorEl={anchorEl}
                                                 onClose={handleClose}
                                                 anchorOrigin={{
                                                         vertical: 'bottom',
                                                         horizontal: 'left',
                                                 }}
                                                 PaperProps={{
                                                         style: {
                                                                 border: "thin solid blue",
                                                                 // borderRadius: 10,
                                                         }
                                                 }}
                                        >
                                                <Box
                                                        sx={{
                                                                width: "fit-content",
                                                                height: "fit-content",
                                                                overflow: "hidden",
                                                        }}
                                                >
                                                        {dropMenuItemsUser}
                                                </Box>
                                        </Popover>
                                </div>

                        </Stack>

                </div>
        </React.Fragment>
        );
}