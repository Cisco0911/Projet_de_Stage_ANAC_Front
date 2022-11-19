/* eslint-disable import/first */

import React, {useEffect, useState} from 'react';
import { Global_State } from "../main";

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


export default function FileDetails() {


    const [selectedRow, setSelectedRow] = useState(null)

    Global_State.EventsManager.on('viewDetailEnabled', (data) => { console.log('viewDetailEnabled'); setSelectedRow(data) })

    useEffect(
        () =>
        {
            return () => 
            {
                Global_State.EventsManager.off('viewDetailEnabled');
            }
        },
        []
    )

    const data = selectedRow !== null ? Global_State.getNodeDataById(selectedRow.id) : null
    
    let Type

    if (selectedRow !== null && data !== null) {

        console.log(selectedRow)
        console.log(data)

        switch (data.type) {
            case "audit":
                Type = "Audit"
                break;
            case "fnc":
                Type = "Non-Conformite"
                break;
            case "ds":
                Type = "Dossier"
                break;
            case "checkList":
                Type = "CheckList"
                break;
            case "dp":
                Type = "Dossier Preuve d'Audit"
                break;
            case "nonC":
                Type = "Dossier des Non-Conformités"
                break;
        
            default:
                Type = "Unknown"
                break;
        }
        
    }
    
    return (
    <React.Fragment>
            {
                    selectedRow !== null && data !== null ?
                    <div className="sidebar" id="view-detail">
                            <div className="sidebar-header">
                                    <h4>View Detail</h4>
                                    <a href="#" className="btn btn-light btn-floating sidebar-close-btn">
                                            <i className="ti-angle-right"></i>
                                    </a>
                            </div>
                            <div className="sidebar-content">
                                    <figure className="avatar mb-4">
                            <span className="avatar-title bg-info-bright text-info rounded-pill">
                                <i className="ti-file"></i>
                            </span>
                                    </figure>
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Nom:</div>
                                            <div className="col-8">{data.name}</div>
                                    </div>
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Type:</div>
                                            <div className="col-8">{data.type === "f" ? Global_State.getType(data.ext) : Type}</div>
                                    </div>
                                    {data.type === "checkList" || data.type === "dp" || data.type === "nonC" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Audit:</div>
                                            <div className="col-8">{Global_State.getNodeDataById(data.parentId).name}</div>
                                    </div> : null}
                                    {data.type === "f" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Taille:</div>
                                            <div className="col-8">{Global_State.sizeFormater(data.taille, false)}</div>
                                    </div> : null}
                                    {data.type === "audit" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >RA:</div>
                                            <div className="col-8">{data.ra.name + " " + data.ra.second_name}</div>
                                    </div> : null}
                                    {data.type === "fnc" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Level:</div>
                                            <div className="col-8 text-danger">{"Level " + data.level}</div>
                                    </div> : null}
                                    {data.type === "fnc" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Revision:</div>
                                            <div className={`col-8 ${data.review_date !== null ? 'text-success' : 'text-warning'}`}>{`${data.review_date !== null ? data.review_date : '____/__/__'}`}</div>
                                    </div> : null}
                                    {data.type === "fnc" ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Clôturé:</div>
                                            <div className="col-8">
                                                    {
                                                            data.isClosed ? <div className="badge bg-success-bright text-success">true</div> : <div className="badge bg-danger-bright text-danger">false</div>
                                                    }
                                            </div>
                                    </div> : null}
                                    {data.isClosed === 1 ?
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Date de cloture:</div>
                                            <div className="col-8">
                                                    2022-11-05
                                            </div>
                                    </div> : null}
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Créé le:</div>
                                            <div className="col-8 text-primary">{data.created_at}</div>
                                    </div>
                                    <div className="row mb-3">
                                            <div className="col-4" style = {{fontWeight: 'bold'}} >Modifié le:</div>
                                            <div className="col-8 text-success">{data.created_at}</div>
                                    </div>
                            </div>
                            <div className="sidebar-footer">
                                    <button className="btn btn-lg btn-block btn-primary">
                                            <i className="ti-share mr-3"></i> Share
                                    </button>
                            </div>
                    </div> : null
            }
    </React.Fragment>
        )
}

