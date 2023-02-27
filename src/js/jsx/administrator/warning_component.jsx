/* eslint-disable import/first */

import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import {CgAirplane} from "react-icons/cg";













export default function Warning_component({open, onConfirm, onCancel, warning_infos, ...props})
{

        return(
        <React.Fragment>
                <Dialog open={open} >
                        <DialogTitle color="orangered" className="d-flex align-items-center" > <WarningTwoToneIcon fontSize={'large'} sx={{ margin: "0 10px" }} /> Êtes-vous sûr ?</DialogTitle>
                        <DialogContent sx={{ minWidth: 350 }}>
                                <DialogContentText>
                                        Les conséquences que cela pourait entrainer ...
                                </DialogContentText>
                                <div>
                                        {
                                                warning_infos.map(
                                                        (info, idx) =>
                                                        (
                                                                <span key={idx} className="danger_list_item" >
                                                                      <CgAirplane size={20} />  {info}
                                                                </span>
                                                        )
                                                )
                                        }
                                </div>
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={ onCancel }>Annuler</Button>
                                <Button onClick={onConfirm}>Confirmer</Button>
                        </DialogActions>
                </Dialog>
        </React.Fragment>
        )
}