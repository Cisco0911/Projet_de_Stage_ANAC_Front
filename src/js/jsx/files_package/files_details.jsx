/* eslint-disable import/first */

import React, {useEffect, useState} from 'react';
import {AppBar, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Toolbar} from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {AiFillCloseSquare} from "react-icons/ai";

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


const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
});

function FileDetail({node, open, handleClose})
{
        const jsonDetails =
        {
                general:
                {
                        NOM: node.name,
                        CHEMIN: node.path,
                        "CREE LE": node.created_at.replace("T", " À "),
                        VALIDE: node.is_validated ? `OUI par ${ node.validator ? `${node.validator.name} ${node.validator.second_name}` : 'inconnu' }` : "NON",
                        SERVICES: node.services.reduce((acc, service) => acc ? `${acc}, ${service.name}` : service.name, "")
                }
        }

        switch (node.type)
        {
                case 'audit':
                        jsonDetails.specific =
                        {
                                TYPE: "AUDIT",
                                "RESPONSABLE AUDIT":
                                <b style={{ color: "blue" }} >
                                        {`${node.ra.name} ${node.ra.second_name}`}
                                </b>,
                        }

                        break
                case 'checkList':
                        jsonDetails.specific =
                        {
                                TYPE: "CHECKLIST",
                        }

                        break
                case 'dp':
                        jsonDetails.specific =
                        {
                                TYPE: "DOSSIER PREUVE",
                        }

                        break
                case 'nonC':
                        jsonDetails.specific =
                        {
                                TYPE: "DOSSIER NC",
                        }

                        break
                case 'fnc':
                        let levelComponent
                        switch ( parseInt(node.level) )
                        {
                                case 1:
                                        levelComponent = <Chip label={node.level} variant={"filled"} color={"error"} />
                                        break
                                case 2:
                                        levelComponent = <Chip label={node.level} variant={"filled"} color={"warning"} />
                                        break
                                case 3:
                                        levelComponent = <Chip label={node.level} variant={"filled"} color={"default"} />
                                        break

                        }


                        jsonDetails.specific =
                        {
                                TYPE: "NON-CONFORMITÉ",
                                NIVEAU: levelComponent,
                                "DATE DE REVISION": node.review_date || "____/__/__",
                                STATUT: node.isClosed ?
                                <div className="badge bg-success-bright text-success" >Clôturé</div> :
                                <div className="badge bg-danger-bright text-danger" >Non-Clôturé</div>,
                        }

                        break
                case 'ds':
                        jsonDetails.specific =
                        {
                                TYPE: "DOSSIER SIMPLE",
                        }

                        break
                case 'f':
                        jsonDetails.specific =
                        {
                                TYPE: "FICHIER",
                        }

                        break
                default:
                        break;
        }

        const generalDetails = []

        for (const key in jsonDetails.general)
        {
                const value = jsonDetails.general[key]

                generalDetails.push(
                <Stack direction={"row"} spacing={1} key={key}
                       style={{
                               whiteSpace: "nowrap",
                               overflow: "hidden",
                               textOverflow: "ellipsis",
                               display: "block"
                       }}
                >
                        <b style={{
                                height: "fit-content"
                        }} > {key}: </b>
                        {
                                typeof value === "string" ?
                                <b title={value} > {value} </b> : value
                        }
                </Stack>
                )
        }
        const specificDetails = []

        for (const key in jsonDetails.specific)
        {
                const value = jsonDetails.specific[key]

                specificDetails.push(
                <Stack direction={"row"} spacing={1} key={key} alignItems={"end"}
                       style={{
                               whiteSpace: "nowrap",
                               overflow: "hidden",
                               textOverflow: "ellipsis",
                               display: "block"
                       }}
                >
                        <b style={{
                                height: "fit-content"
                        }} > {key}: </b>
                        {
                                typeof value === "string" ?
                                <b title={value} > {value} </b> : value
                        }
                </Stack>
                )
        }

        return (
                <Dialog
                fullScreen={ window.innerWidth < 576 }
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="FileDetail-dialog-title"
                aria-describedby="FileDetail-dialog-description"
                >
                        {
                                window.innerWidth > 576 ?
                                <React.Fragment>
                                        <DialogTitle id="FileDetail-dialog-title">
                                                {node.name}
                                        </DialogTitle>
                                        <DialogContent>
                                                <Stack direction={"column"} spacing={5} >
                                                        <Divider textAlign={"center"} > GENERAL </Divider>
                                                        <Stack direction={"column"} spacing={3} >
                                                                { generalDetails }
                                                        </Stack>
                                                        <Divider textAlign={"center"} > SPECIFIQUE </Divider>
                                                        <Stack direction={"column"} spacing={3} >
                                                                { specificDetails }
                                                        </Stack>
                                                </Stack>
                                        </DialogContent>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                        <AppBar sx={{ position: 'relative' }}>
                                                <Toolbar>
                                                        <IconButton
                                                        edge="start"
                                                        color="inherit"
                                                        onClick={handleClose}
                                                        aria-label="close"
                                                        >
                                                                <AiFillCloseSquare size={24} />
                                                        </IconButton>
                                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                                {node.name}
                                                        </Typography>
                                                </Toolbar>
                                        </AppBar>
                                        <Stack direction={"column"} spacing={5} margin={3} >
                                                <Divider textAlign={"center"} > GENERAL </Divider>
                                                <Stack direction={"column"} spacing={3} >
                                                        { generalDetails }
                                                </Stack>
                                                <Divider textAlign={"center"} > SPECIFIQUE </Divider>
                                                <Stack direction={"column"} spacing={3} >
                                                        { specificDetails }
                                                </Stack>
                                        </Stack>
                                </React.Fragment>
                        }
                </Dialog>
        )
}

export default function useFileDetails()
{
        const [open, setOpen] = useState(false)
        const [nodeId, setNodeId] = useState(null)

        const showDetails = (id) =>
        {
                setNodeId(id)
                setOpen(true)
        }

        const handleClose = () =>
        {
                setOpen(false)
                setNodeId(null)
        }

        let detailsComponent = null

        if (nodeId)
        {
                const node = window.Global_State.getNodeDataById(nodeId)

                if (node)
                {
                        detailsComponent = <FileDetail node={node} open={open} handleClose={handleClose} />
                }
                else
                {
                        detailsComponent =
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="not_found-dialog-title"
                        aria-describedby="not_found-dialog-description"
                        >
                                <DialogTitle id="not_found-dialog-title">
                                        {"Fichier introuvable"}
                                </DialogTitle>
                                <DialogContent>
                                        <DialogContentText id="not_found-dialog-description">
                                                Aucun détail
                                        </DialogContentText>
                                </DialogContent>
                        </Dialog>
                }
        }
        else
        {
                detailsComponent =
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="invalid_id-dialog-title"
                aria-describedby="invalid_id-dialog-description"
                >
                        <DialogTitle id="invalid_id-dialog-title">
                                {"Id invalide"}
                        </DialogTitle>
                        <DialogContent>
                                <DialogContentText id="invalid_id-dialog-description">
                                        Aucun détail
                                </DialogContentText>
                        </DialogContent>
                </Dialog>
        }

        return { showDetails, detailsComponent }
}

