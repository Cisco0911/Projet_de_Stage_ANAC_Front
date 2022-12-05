/* eslint-disable import/first */


import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";


import parseToJson from "./files_package/parse_to_json";
import useEditor from './editor'
import {Global_State} from "./main";

import axios from "axios";
import Echo from 'laravel-echo';
import EventEmitter from 'eventemitter3';

import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

window.Pusher = require('pusher-js');

export const http = axios.create({
        baseURL: 'http://localhost:80',
        headers: {

        },
        withCredentials: true,
})

const EventsManager = new EventEmitter();

const options = {
        broadcaster: 'pusher',
        key: 'cd05855e46706d768333',
        cluster: 'eu',
        forceTLS: true,
        authorizer: (channel, options) => {
                return {
                        authorize: (socketId, callback) => {
                                http.post('/broadcasting/auth', {
                                        socket_id: socketId,
                                        channel_name: channel.name
                                })
                                        .then(response => {
                                                callback(false, response.data);
                                        })
                                        .catch(error => {
                                                callback(true, error);
                                        });
                        }
                };
        },
};

const echo = new Echo(options);

let echosHandler

// echo.channel(`nodeUpdate`).listen( 'NodeUpdateEvent', (data) => {
//   if (data.operation === 'add') 
//   {
//     console.log('emitting echo')
//     console.log(data)
//     const ids = new FormData
//     data.node.forEach(element => {
//       console.log(element)
//       ids.append('ids[]', element)
//     });
//     console.log(ids.get('ids[]'))

//     http.post('getDatasByIds', ids)
//     .then( res =>
//       {
//         console.log(res)

//         echosHandler('NodeUpdateEvent', {...data, 'node': res.data})
//       }
//     )
//     .catch( err =>
//       {
//         console.log(err)
//       }
//     )
//   }
//   else if(data.operation === 'delete')
//   {
//     console.log('emitting echo')
//     echosHandler('NodeUpdateEvent', data)
//   }
// });


let isLogged = false


export const getFromDataBase = async () =>
{
        const Datas =
                {
                        authUser: {},
                        data:
                                {
                                        sections: [],
                                        audits: [],
                                        checkLists: [],
                                        dps: [],
                                        nonCs: [],
                                        fncs: [],
                                        fs: [],
                                        ds: [],
                                        services: [],
                                },
                        errors:
                                {
                                        sections: {},
                                        audits: {},
                                        checkLists: {},
                                        dps: {},
                                        nonCs: {},
                                        fncs: {},
                                        fs: {},
                                        ds: {},
                                        services: {},
                                },
                        status:
                                {
                                        sections: -1,
                                        audits: -1,
                                        checkLists: -1,
                                        dps: -1,
                                        nonCs: -1,
                                        fncs: -1,
                                        fs: -1,
                                        ds: -1,
                                        services: -1,
                                },
                }


        await http
                .get("user")
                .then(response => {Datas.authUser = response.data})

        await http
                .get("get_ss")
                .then(response => { Datas.status.sections = response.status; Datas.data.sections = response.data; })
                .catch(error => Datas.errors.sections = error);

        await http
                .get("get_audits")
                .then(response => { Datas.status.audits = response.status; Datas.data.audits = response.data; })
                .catch(error => Datas.errors.audits = error);

        await http
                .get("get_checkLists")
                .then(response => { Datas.status.checkLists = response.status; Datas.data.checkLists = response.data; })
                .catch(error => Datas.errors.checkLists = error);

        await http
                .get("get_Dps")
                .then(response => { Datas.status.dps = response.status; Datas.data.dps = response.data; })
                .catch(error => Datas.errors.dps = error);

        await http
                .get("get_NonCs")
                .then(response => { Datas.status.nonCs = response.status; Datas.data.nonCs = response.data; })
                .catch(error => Datas.errors.nonCs = error);

        await http
                .get("get_fncs")
                .then(response => { Datas.status.fncs = response.status; Datas.data.fncs = response.data; })
                .catch(error => Datas.errors.fncs = error);

        await http
                .get("get_ds")
                .then(response => { Datas.status.ds = response.status; Datas.data.ds = response.data; })
                .catch(error => Datas.errors.ds = error);

        await http
                .get("get_fs")
                .then(response => { Datas.status.fs = response.status; Datas.data.fs = response.data; })
                .catch(error => Datas.errors.fs = error);

        await http
                .get("get_services")
                .then(response => { Datas.status.services = response.status; Datas.data.services = response.data; })
                .catch(error => Datas.errors.services = error);

        console.log(Datas)

        // echo.private(`validating.${Datas.authUser.id}`).listen('RemovalEvent', (data) => {
        //   toast((t) => (
        //     <div>
        //       <div  >
        //         Confirmer la suppression de  : {data.node_type} <b>{data.node.name}</b>
        //       </div>
        //       <div
        //           style = {
        //               {
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 position: 'relative',
        //                 alignItems: 'center',
        //               }
        //           }
        //           >
        //           <Button style={{ width: 85, height: 35, alignItems: 'center', justifyContent: 'center', }}  variant="primary" onClick={() => toast.dismiss(t.id)}>
        //               Dismiss
        //           </Button>
        //       </div>
        //     </div>
        //   ),
        //   {
        //     position: "top-right",
        //     style: {
        //       border: '1px solid #713200',
        //       padding: '16px',
        //       color: '#713200',
        //     },
        //     duration: 9999999999999999,
        //   }
        //   );
        // });

        return Datas

}


export default function useGetData(TheDatas)
{

        console.log('checking', TheDatas)


        const [authUser, updateAuthUserInfo] = useState(TheDatas.authUser)
        const [isEditorMode, setIsEditorMode] = useState(false)

        const to_refresh = useRef(true)


        echosHandler =
                (tag, data = null) =>
                {
                        switch (tag) {
                                case 'updateAuthUserInfo':
                                {
                                        console.log('updateAuthUserInfo')
                                        http.get('user').then(res =>
                                                {
                                                        console.log(res)
                                                        updateAuthUserInfo(res.data)
                                                }
                                        )
                                                .catch( err => { console.log(err) })
                                }
                                        break;

                                default:
                                        break;
                        }

                }

        useEffect(
                () =>
                {

                        echo.channel(`nodeUpdate`).listen( 'NodeUpdateEvent', (data) => {
                                // EventsManager.emit('updateData')
                                if (data.operation === 'add')
                                {
                                        console.log('emitting echo')
                                        console.log(data)
                                        const ids = new FormData
                                        data.node.map(element => {
                                                console.log(element)
                                                ids.append('ids[]', element)
                                        });
                                        console.log(ids.get('ids[]'))

                                        http.post('getDatasByIds', ids)
                                                .then( res =>
                                                        {
                                                                console.log('getDatasByIds', res)

                                                                dispatch({type: 'add', data: {...data, 'node': res.data}})
                                                        }
                                                )
                                                .catch( err =>
                                                        {
                                                                console.log(err)
                                                        }
                                                )
                                }
                                else if(data.operation === 'delete')
                                {
                                        console.log('emitting echo')
                                        dispatch({type: 'delete', data})
                                }
                                else if(data.operation === 'update')
                                {
                                        console.log('echo update ')

                                        const ids = new FormData
                                        console.log('data.node', data.node)
                                        data.node.map(element => {
                                                console.log(element)
                                                ids.append('ids[]', element)
                                        });
                                        http.post('getDatasByIds', ids)
                                                .then( res =>
                                                        {
                                                                console.log(res)

                                                                dispatch({type: 'update', data: {...data, 'node': res.data}})
                                                        }
                                                )
                                                .catch( err =>
                                                        {
                                                                console.log(err)
                                                        }
                                                )
                                }
                                else if (data.operation === 'move')
                                {
                                        console.log('emitting move echo', data)
                                        const ids = new FormData
                                        data.node.map(element => {
                                                console.log(element)
                                                ids.append('ids[]', element)
                                        });
                                        console.log(ids.get('ids[]'))

                                        http.post('getDatasByIds', ids)
                                        .then( res =>
                                        {
                                                console.log(res)

                                                dispatch({type: 'move', data: {...data, 'node': res.data}})
                                        }
                                        )
                                        .catch( err =>
                                        {
                                                console.log(err)
                                        }
                                        )
                                }
                        });

                        echo.private(`user.${authUser.id}`).listen('AuthUserUpdate',
                                () =>
                                {
                                        console.log('AuthUserUpdate')
                                        echosHandler('updateAuthUserInfo')
                                }
                        )

                        echo.private(`user.${authUser.id}`).notification((data) => {
                                if(data.type === 'NodeRemovalNotification')
                                {
                                        console.log(data)
                                        toast((t) => (
                                                        <div style={{ width: 'auto' }} >
                                                                <div style={{textAlign: 'center', margin: 10 }} >
                                                                        Confirmer la suppression de  : {data.node_type} <b>{data.node.operable.name}</b>
                                                                </div>
                                                                <div
                                                                        style = {
                                                                                {
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        position: 'relative',
                                                                                        alignItems: 'center',
                                                                                }
                                                                        }
                                                                >
                                                                        <Button style={{ width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }}  variant="danger" onClick={() =>
                                                                        {
                                                                                const msg = new FormData;
                                                                                msg.append('object', 'confirmed')
                                                                                msg.append('value', `Suppression confirmé par ${authUser.name.substring(0, 1)}. ${authUser.second_name}`)
                                                                                msg.append('from', JSON.stringify(authUser))
                                                                                msg.append('to', data.user.id)
                                                                                msg.append('attachment', JSON.stringify(data.node))

                                                                                http.post('notify_response', msg)

                                                                                toast.dismiss(t.id)
                                                                        }
                                                                        }>
                                                                                Supprimer
                                                                        </Button>
                                                                        <Button style={{ width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }}  variant="light" onClick={() => { EventsManager.emit('setSelectedNode', {id: `${data.node.front_type}${data.node.operable.id}`, section_id: data.node.operable.section_id} ); toast.dismiss(t.id) }}>
                                                                                Consulter
                                                                        </Button>
                                                                        <Button style={{ width: 85, height: 35, alignItems: 'center', justifyContent: 'center', margin: 10 }}  variant="light" onClick={() =>
                                                                        {
                                                                                const msg = new FormData;
                                                                                msg.append('object', 'rejected')
                                                                                msg.append('value', `Suppression rejeté par ${authUser.name.substring(0, 1)}. ${authUser.second_name}`)
                                                                                msg.append('from', JSON.stringify(authUser))
                                                                                msg.append('to', data.user.id)
                                                                                msg.append('attachment', JSON.stringify(data.node))

                                                                                http.post('notify_response', msg)

                                                                                toast.dismiss(t.id)
                                                                        }
                                                                        }>
                                                                                Refuser
                                                                        </Button>
                                                                </div>
                                                        </div>
                                                ),
                                                {
                                                        id: 'NodeRemovalNotification',
                                                        position: "top-right",
                                                        style: {
                                                                // width: '1700px',
                                                                border: '1px solid #713200',
                                                                padding: '16px',
                                                                color: '#713200',
                                                        },
                                                        duration: 5000,
                                                }
                                        );

                                        echosHandler('updateAuthUserInfo')
                                }
                                else if (data.type === "NodeRemovalResponse")
                                {
                                        if(data.msg.object === 'rejected')
                                        {
                                                toast.error(`${data.msg.value}: ${data.msg.attachment.operable.name}`,
                                                        {
                                                                id: 'NodeRemovalResponse',
                                                                // duration: Infinity,
                                                        }
                                                )
                                        }
                                        else
                                        {
                                                const operation = data.msg.attachment
                                                console.log(operation)
                                                toast.success(`${data.msg.value}: ${data.msg.attachment.operable.name}`,
                                                        {
                                                                id: 'NodeRemovalResponse',
                                                                // duration: Infinity,
                                                        }
                                                )
                                                // http.delete(`del_folder?id=${data.msg.attachment.id};approved=${true}`)
                                                // toast.success(data.msg.value,
                                                //   {
                                                //     position: "top-right",
                                                //   }
                                                // )

                                        }
                                }
                                else if (data.type === 'FncReviewNotification')
                                {
                                        console.log(data)

                                        // const ids = new FormData
                                        //
                                        // ids.append('ids[]', `${data.fncId}-fnc`)
                                        //
                                        // http.post('getDatasByIds', ids)
                                        // .then( res =>
                                        // {
                                        //         console.log(res)
                                        //
                                        //         const fnc = res.data[0]
                                        //
                                        //         toast(`Revision de la Fnc ${fnc.name}`,
                                        //         {
                                        //                 id: 'FncReviewNotification',
                                        //                 icon: '🙌',
                                        //                 duration: Infinity,
                                        //         }
                                        //         )
                                        // }
                                        // )
                                        // .catch( err =>
                                        // {
                                        //         console.log(err)
                                        // }
                                        // )

                                        toast(`${data.msg}`,
                                                {
                                                        id: 'FncReviewNotification',
                                                        icon: '🙌',
                                                        duration: Infinity,
                                                }
                                        )
                                }

                        });

                        EventsManager.on('updateAuthUserInfo', () => { echosHandler('updateAuthUserInfo') })

                        // EventsManager.on('nodeUpdate', data => { dispatch({ type: 'update', data }) })

                        // EventsManager.on('updateData', () => { console.log('emit working') })

                        return () =>
                        {
                                EventsManager.off('updateAuthUserInfo')
                                // EventsManager.off('nodeUpdate')
                        }
                },
                []
        )




        // sections: [],
        //           audits: [],
        //           checkLists: [],
        //           dps: [],
        //           nonCs: [],
        //           fncs: [],
        //           fs: [],
        //           ds: [],

        // console.log(TheDatas)

        const haveRightToSee = (elementServices, authServices) =>
        {
                for(let authService of authServices)
                {
                        for(let elementService of elementServices) if(elementService.id === authService.id) return true
                }
                return false
        }

        const Data_Base = {authUser : authUser, data: TheDatas.data}

        Data_Base.data.sections = Data_Base.data.sections.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.audits = Data_Base.data.audits.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.checkLists = Data_Base.data.checkLists.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.dps = Data_Base.data.dps.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.nonCs = Data_Base.data.nonCs.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.fncs = Data_Base.data.fncs.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.ds = Data_Base.data.ds.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})
        Data_Base.data.fs = Data_Base.data.fs.filter((element) => { return haveRightToSee(element.services, Data_Base.authUser.services) }).map((visibleElement) => {return visibleElement})

        function makeNodeData(id, global_type, services, isOpen, name, type, isRoot, parentId, path, hasChildren, ext, ra, isClosed, review_date, created_at, level, section_id, taille, url)
        {


                return {
                        id,
                        global_type,
                        services,
                        isOpen,
                        section_id,
                        name,
                        type,
                        taille,
                        level,
                        created_at,
                        ra,
                        hasChildren,
                        isRoot,
                        parentId,
                        path,
                        isClosed,
                        review_date,
                        ext,
                        url,
                }

        }


        let sections = new Map()
        Data_Base.data.sections.map((section) =>
        {
                const sct = JSON.parse(JSON.stringify(section))
                // console.log(sct)
                sections.set(sct.id, {...sct, selectedNodeIdInSection: 0 })
        }
        )


        const getNewPath = (new_node, all_nodes, to_update = false) =>
        {
                if (new_node.type === 'root')
                {
                        return `${sections.get(new_node.section_id).name}:`
                }

                if (!to_update)
                {
                        for (const node of all_nodes)
                        {
                                if (node.id === new_node.id )  return node.path
                        }
                }

                switch (new_node.type)
                {
                        case 'audit':
                        {
                                // let audit
                                //
                                // for (const auditElement of  Data_Base.data.audits)
                                // {
                                //         // console.log('paath audit ', id, '  ', auditElement.id)
                                //         if(auditElement.id === id) audit = JSON.parse(JSON.stringify(auditElement))
                                // }

                                return `${getNewPath(sections.get(new_node.section_id), all_nodes, true)}\\${new_node.name}`
                        }
                        case 'checkList':
                        {
                                let audit

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId) audit = JSON.parse(JSON.stringify(node))
                                }

                                return `${getNewPath(audit, all_nodes)}\\${new_node.name}`
                        }
                        case 'ds':
                        {
                                let parent

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId)
                                        {
                                                if (node.type === 'root') parent = { type: 'root', section_id: new_node.section_id }
                                                else parent = JSON.parse(JSON.stringify(node))

                                                break
                                        }
                                }
                                // console.log('paaaaaaaaaaaaaath', new_node)

                                return `${getNewPath(parent, all_nodes)}\\${new_node.name}`
                        }
                        case 'f':
                        {
                                let parent

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId)
                                        {
                                                if (node.type === 'root') parent = { type: 'root', section_id: new_node.section_id }
                                                else parent = JSON.parse(JSON.stringify(node))

                                                break
                                        }
                                }

                                return `${getNewPath(parent, all_nodes)}\\${new_node.name}`
                        }
                        default:
                        {
                                 return `${new_node.name}:`
                        }
                }

        }

        const dataFormater = () =>
        {

                // Data_Base.data.audits[0].name = "dddd"

                // makeNodeData(0, "Racine", "root", true, -1, "", true)

                let allDataAsNodeData = [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, undefined, -1)]

                const audits = Data_Base.data.audits.map((audit) => { return(
                        {
                                ...audit,
                                id: "audit" + audit.id,
                        }
                )})
                const checkLists = Data_Base.data.checkLists.map((checkList) => { return(
                        {
                                ...checkList,
                                id: "checkList" + checkList.id,
                        }
                )})
                const dps = Data_Base.data.dps.map((dp) => { return(
                        {
                                ...dp,
                                id: "dp" + dp.id,
                        }
                )})
                const nonCs = Data_Base.data.nonCs.map((nonC) => { return(
                        {
                                ...nonC,
                                id: "nonC" + nonC.id,
                        }
                )})
                const fncs = Data_Base.data.fncs.map((fnc) => { return(
                        {
                                ...fnc,
                                id: "fnc" + fnc.id,
                        }
                )})
                const fs = Data_Base.data.fs.map((f) => { return(
                        {
                                ...f,
                                id: "f" + f.id,
                        }
                )})
                const ds = Data_Base.data.ds.map((ds) => { return(
                        {
                                ...ds,
                                id: "ds" + ds.id,
                        }
                )})

                const getPath = (id, node_type) =>
                {
                        for (const node of allDataAsNodeData)
                        {
                              if (node.id === id + node_type)  return node.path
                        }

                        switch (node_type)
                        {
                                case 'audit':
                                {
                                        let audit

                                        for (const auditElement of  Data_Base.data.audits)
                                        {
                                                // console.log('paath audit ', id, '  ', auditElement.id)
                                                if(auditElement.id === id) audit = JSON.parse(JSON.stringify(auditElement))
                                        }

                                        return `${getPath(audit.section_id, '')}\\${audit.name}`
                                }
                                case 'checkList':
                                {
                                        let checkList

                                        for (const checkListElement of  Data_Base.data.checkLists)
                                        {
                                                if(checkListElement.id === id) checkList = JSON.parse(JSON.stringify(checkListElement))
                                        }

                                        return `${getPath(checkList.audit_id, 'audit')}\\${checkList.name}`
                                }
                                case 'dp':
                                {
                                        let dp

                                        for (const dpElement of  Data_Base.data.dps)
                                        {
                                                if(dpElement.id === id) dp = JSON.parse(JSON.stringify(dpElement))
                                        }

                                        return `${getPath(dp.audit_id, 'audit')}\\${dp.name}`
                                }
                                case 'nonC':
                                {
                                        let nc

                                        for (const ncElement of  Data_Base.data.nonCs)
                                        {
                                                if(ncElement.id === id) nc = JSON.parse(JSON.stringify(ncElement))
                                        }

                                        return `${getPath(nc.audit_id, 'audit')}\\${nc.name}`
                                }
                                case 'fnc':
                                {
                                        let fnc

                                        for (const fncElement of  Data_Base.data.fncs)
                                        {
                                                if(fncElement.id === id) fnc = JSON.parse(JSON.stringify(fncElement))
                                        }

                                        return `${getPath(fnc.nc_id, 'nonC')}\\${fnc.name}`
                                }
                                case 'ds':
                                {
                                        let folder

                                        for (const ds of  Data_Base.data.ds)
                                        {
                                                if(ds.id === id) folder = JSON.parse(JSON.stringify(ds))
                                        }

                                        return `${getPath(folder.parent_id, folder.parent_type)}\\${folder.name}`
                                }
                                case 'f':
                                {
                                        let file

                                        for (const f of  Data_Base.data.fs)
                                        {
                                                if(f.id === id) file = JSON.parse(JSON.stringify(f))
                                        }

                                        return `${getPath(file.parent_id, file.parent_type)}\\${file.name}`
                                }
                                default:
                                {
                                        for (const section of  Data_Base.data.sections)
                                        {
                                                if(section.id === id) return `${section.name}:`
                                        }
                                }
                        }

                }

                // audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19)
                for(let audit of audits) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        audit.id,
                                        "folder",
                                        audit.services,
                                        false,
                                        audit.name,
                                        "audit",
                                        false,
                                        '0',
                                        getPath(parseInt(audit.id.substring(5), 10), 'audit'),
                                        true,
                                        undefined,
                                        audit.user,
                                        undefined,
                                        undefined,
                                        audit.created_at.substring(0, 10) + " A " + audit.created_at.substring(11, 19),
                                        undefined,
                                        audit.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19)
                for(let checkList of checkLists ) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        checkList.id,
                                        "folder",
                                        checkList.services,
                                        false,
                                        checkList.name,
                                        "checkList",
                                        false,
                                        "audit" + checkList.audit_id,
                                        getPath(parseInt(checkList.id.substring(9), 10), 'checkList'),
                                        true,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        checkList.created_at.substring(0, 10) + " A " + checkList.created_at.substring(11, 19),
                                        undefined,
                                        checkList.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19)
                for(let dp of dps) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        dp.id,
                                        "folder",
                                        dp.services,
                                        false,
                                        dp.name,
                                        "dp",
                                        false,
                                        "audit" + dp.audit_id,
                                        getPath(parseInt(dp.id.substring(2), 10), 'dp'),
                                        true,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        dp.created_at.substring(0, 10) + " A " + dp.created_at.substring(11, 19),
                                        undefined,
                                        dp.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19)
                for(let nonC of nonCs) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        nonC.id,
                                        "folder",
                                        nonC.services,
                                        false,
                                        nonC.name,
                                        "nonC",
                                        false,
                                        "audit" + nonC.audit_id,
                                        getPath(parseInt(nonC.id.substring(4), 10), 'nonC'),
                                        true,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        nonC.created_at.substring(0, 10) + " A " + nonC.created_at.substring(11, 19),
                                        undefined,
                                        nonC.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19)
                for(let fnc of fncs) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        fnc.id,
                                        "folder",
                                        fnc.services,
                                        false,
                                        fnc.name,
                                        "fnc",
                                        false,
                                        "nonC" + fnc.nc_id,
                                        getPath(parseInt(fnc.id.substring(3), 10), 'fnc'),
                                        true,
                                        undefined,
                                        undefined,
                                        fnc.isClosed,
                                        fnc.review_date,
                                        fnc.created_at.substring(0, 10) + " A " + fnc.created_at.substring(11, 19),
                                        fnc.level,
                                        fnc.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19)
                for(let f of fs) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        f.id,
                                        "file",
                                        f.services,
                                        false,
                                        f.name,
                                        "f",
                                        false,
                                        f.parent_type === '' ? '0' : f.parent_type + f.parent_id,
                                        getPath(parseInt(f.id.substring(1), 10), 'f'),
                                        false,
                                        f.extension,
                                        undefined,
                                        undefined,
                                        undefined,
                                        f.created_at.substring(0, 10) + " A " + f.created_at.substring(11, 19),
                                        undefined,
                                        f.section_id,
                                        f.size,
                                        f.url
                                )
                        )
                }

                // d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19)
                for(let d of ds) {
                        allDataAsNodeData.push(
                                makeNodeData(
                                        d.id,
                                        "folder",
                                        d.services,
                                        false,
                                        d.name,
                                        "ds",
                                        false,
                                        d.parent_type === '' ? '0' : d.parent_type + d.parent_id,
                                        getPath(parseInt(d.id.substring(2), 10), 'ds'),
                                        true,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        d.created_at.substring(0, 10) + " A " + d.created_at.substring(11, 19),
                                        undefined,
                                        d.section_id,
                                        undefined,
                                        undefined,
                                )
                        )
                }

                // console.log("DataFormater", allDataAsNodeData)

                const structuredData = new Map()

                for(let section of Data_Base.data.sections)
                {
                        structuredData.set(section.id, allDataAsNodeData.filter((nodeData) => { /*console.log(nodeData.section_id, section.id)*/; return nodeData.section_id === section.id || nodeData.section_id === -1 }).map((nodeData) => { return nodeData } ) )
                }

                // console.log(structuredData.get(1))


                return allDataAsNodeData

        }

        function reducer( state, action )
        {
                function create_new_node(node)
                {

                        const type = node.front_type

                        let parentId
                        switch (type)
                        {
                                case 'audit':
                                        parentId = '0'
                                        break;
                                case 'checkList':
                                        parentId = 'audit' + node.audit_id
                                        break;
                                case 'dp':
                                        parentId = 'audit' + node.audit_id
                                        break;
                                case 'nonC':
                                        parentId = 'audit' + node.audit_id
                                        break;
                                case 'fnc':
                                        parentId = 'nonC' + node.nc_id
                                        break;
                                case 'ds':
                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id
                                        break;
                                case 'f':
                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id
                                        break;

                                default:
                                        break;
                        }


                        return makeNodeData(
                                type + node.id,
                                type === 'f' ? 'file' : 'folder',
                                node.services,
                                false,
                                node.name,
                                type,
                                false,
                                parentId,
                                undefined,
                                type !== 'f',
                                type === 'f' ? node.extension : undefined,
                                node.user,
                                type === 'fnc' ? node.isClosed : undefined,
                                type === 'fnc' ? node.review_date : undefined,
                                node.created_at,//
                                type === 'fnc' ? node.level : undefined,
                                parseInt(node.section_id),
                                type === 'f' ? node.size : undefined,
                                type === 'f' ? node.url : undefined,
                        )
                }

                switch (action.type) {
                        case 'refresh':
                                return [...state]
                        case 'add':
                        {
                                to_refresh.current = true

                                const data = action.data
                                console.log( 'broadcast.........', data);

                                // const temp = new Map()

                                // FetchedNodesData.forEach((value, key) =>
                                //   {
                                //     temp.set(key, JSON.parse( JSON.stringify(value) ))
                                //   }
                                // )

                                const section_id = data.node.constructor === Array ? parseInt(data.node[0].section_id) : parseInt(data.node.section_id)

                                // const existing_data = temp.get(section_id)
                                if (data.node.constructor === Array)
                                {
                                        // console.log("heeeerre", existing_data)
                                        data.node.forEach(node =>
                                                {
                                                        // const type = data.node_type === 'audit' ? node.sub_type !== undefined ? node.sub_type : data.node_type : data.node_type
                                                        const type = node.front_type
                                                        let parentId

                                                        switch (type)
                                                        {
                                                                case 'audit':
                                                                        parentId = '0'
                                                                        break;
                                                                case 'checkList':
                                                                        parentId = 'audit' + node.audit_id
                                                                        break;
                                                                case 'dp':
                                                                        parentId = 'audit' + node.audit_id
                                                                        break;
                                                                case 'nonC':
                                                                        parentId = 'audit' + node.audit_id
                                                                        break;
                                                                case 'fnc':
                                                                        parentId = 'nonC' + node.nc_id
                                                                        break;
                                                                case 'ds':
                                                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id
                                                                        break;
                                                                case 'f':
                                                                        parentId = node.parent_type === '' ? '0' : node.parent_type + node.parent_id
                                                                        break;

                                                                default:
                                                                        break;
                                                        }

                                                        state.push(
                                                                makeNodeData(
                                                                        type + node.id,
                                                                        type === 'f' ? 'file' : 'folder',
                                                                        node.services,
                                                                        false,
                                                                        node.name,
                                                                        type,
                                                                        false,
                                                                        parentId,
                                                                        undefined,
                                                                        type !== 'f',
                                                                        type === 'f' ? node.extension : undefined,
                                                                        node.user,
                                                                        type === 'fnc' ? node.isClosed : undefined,
                                                                        type === 'fnc' ? node.review_date : undefined,
                                                                        node.created_at,//
                                                                        type === 'fnc' ? node.level : undefined,
                                                                        section_id,
                                                                        type === 'f' ? node.size : undefined,
                                                                        type === 'f' ? node.url : undefined,
                                                                )
                                                        )
                                                }
                                        );
                                }
                                // else
                                // {
                                //         state.push
                                //         (
                                //                 makeNodeData
                                //                 (
                                //                         data.node_type + data.node.id,
                                //                         data.node_type === 'f' ? 'file' : 'folder',
                                //                         data.node.services,
                                //                         false,
                                //                         data.node.name,
                                //                         data.node_type,
                                //                         false,
                                //                         data.node_type === 'f' || data.node_type === 'ds' ? data.node.parent_type === '' ? '0' : data.node.parent_type + data.node.parent_id : undefined,
                                //                         undefined,
                                //                         data.node_type !== 'f',
                                //                         data.node_type === 'f' ? data.node.extension : undefined,
                                //                         data.node_type === 'audit' ? data.node.user.name : undefined,
                                //                         data.node_type === 'fnc' ? data.node.isClosed : undefined,
                                //                         data.node_type === 'fnc' ? data.node.review_date : undefined,
                                //                         data.node.created_at,//
                                //                         data.node_type === 'fnc' ? data.node.level : undefined,
                                //                         section_id,
                                //                         data.node_type === 'f' ? data.node.size : undefined,
                                //                         data.node_type === 'f' ? data.node.url : undefined,
                                //                 )
                                //         )
                                // }

                                // temp.set(section_id, existing_data)

                                // console.log(temp)

                                // setFnd(temp)

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'delete':
                        {
                                to_refresh.current = true

                                const data = action.data
                                console.log( 'broadcast.........', data);

                                // const temp = new Map()

                                // console.log( 'fnd.........', FetchedNodesData);

                                // FetchedNodesData.forEach((value, key) =>
                                //   {
                                //     temp.set(key, JSON.parse( JSON.stringify(value) ))
                                //   }
                                // )

                                // const section_id = parseInt(data.node.section_id)

                                // const existing_data = temp.get(section_id)


                                // console.log( 'exist.........', existing_data);

                                // try
                                // {

                                //   console.log('enter notif update')

                                //   authUser.operation_notifications.forEach(notif =>
                                //     {
                                //       console.log(notif.operable_id, data.node.id, notif.operable_id === data.node.id)
                                //       if (notif.operable_id === data.node.id)
                                //       {
                                //         console.log('notif update')
                                //         echosHandler('updateAuthUserInfo')
                                //         EventsManager.emit('updateNotif', notif.id)
                                //       }
                                //     }
                                //     );

                                //   // existing_data.forEach(node =>
                                //   //   {
                                //   //     if(node.id === data.node_type + data.node.id)
                                //   //     {
                                //   //       existing_data.splice(existing_data.indexOf(node),1)
                                //   //       throw 'endForEach'
                                //   //     }
                                //   //   }
                                //   // );
                                // }
                                // catch (error)
                                // {
                                //   console.log(error, existing_data);
                                // }

                                console.log('enter notif update')

                                authUser.operation_notifications.forEach(notif =>
                                        {
                                                console.log(notif.operable_id, data.node.id, notif.operable_id === data.node.id)
                                                if (notif.operable_id === data.node.id)
                                                {
                                                        console.log('notif update')
                                                        echosHandler('updateAuthUserInfo')
                                                        EventsManager.emit('updateNotif', notif.id)
                                                }
                                        }
                                );

                                // temp.set(section_id, existing_data)

                                // console.log(temp)

                                // setFnd(temp)

                                const newState = state.filter( node => node.id !== data.node.type + data.node.id ).map( node => node )

                                // EventsManager.emit('updateData')

                                console.log('newState', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'update':
                        {
                                to_refresh.current = true

                                const data = action.data
                                console.log( 'broadcast.........', data);

                                // temp.set(section_id, existing_data)

                                // console.log(temp)

                                // setFnd(temp)

                                const update_path = (node, current_state) =>
                                {
                                        let up_to_date_node = JSON.parse( JSON.stringify( node ) )

                                        up_to_date_node.path = getNewPath(up_to_date_node, current_state, true)

                                        console.log('current_state', current_state)

                                        let new_state = JSON.parse( JSON.stringify( current_state ) ).map(
                                        current_node =>
                                        {
                                                if ( (current_node.id === up_to_date_node.id) ) return up_to_date_node
                                                return current_node
                                        }
                                        )

                                        console.log('new_state', new_state)

                                        let final_state = JSON.parse( JSON.stringify( new_state ) )

                                        new_state.forEach(
                                        new_node =>
                                        {
                                                if ( (new_node.parentId === up_to_date_node.id) )
                                                {
                                                        final_state = update_path(new_node, final_state)
                                                }
                                        }
                                        )

                                        return final_state

                                }

                                let newState = JSON.parse( JSON.stringify(state) )
                                let finalState = JSON.parse(JSON.stringify(newState))

                                for (const node of data.node)
                                {
                                        const updatedNode = create_new_node(node)

                                        console.log('updatedNode', updatedNode)

                                        const current_state = JSON.parse( JSON.stringify(newState) )
                                        newState = current_state.map(
                                                node =>
                                                {
                                                        if (node.id === updatedNode.id)
                                                        {
                                                                // updatedNode.path = getNewPath(updatedNode, state, true)

                                                                return updatedNode
                                                        }
                                                        // else if ( (node.parentId === updatedNode.id) )
                                                        // {
                                                        //         node.path = getNewPath(node, state, true)
                                                        //
                                                        //         return node
                                                        // }
                                                        return node
                                                }
                                        )

                                        finalState = update_path(updatedNode, JSON.parse(JSON.stringify(newState)) )
                                }

                                // EventsManager.emit('updateData')

                                console.log('finalState', finalState)

                                return JSON.parse(JSON.stringify(finalState))
                        }
                        // case 'move':
                        // {
                        //         const data = action.data
                        //
                        //         dispatch({type: 'update', data})
                        //
                        //         const moved_node = data.node[0];
                        //
                        //         const newState = state.map(
                        //                 node =>
                        //                 {
                        //                         if (node.id === data.node_type + moved_node.id)
                        //                         {
                        //                                 node.path = getNewPath(node, state)
                        //
                        //                                 return node
                        //                         }
                        //                         else if ( (node.parentId === data.node_type + moved_node.id) )
                        //                         {
                        //                                 node.path = getNewPath(node, state)
                        //                         }
                        //                 }
                        //         )
                        //
                        //         console.log('newState', newState)
                        //
                        //         return JSON.parse(JSON.stringify(newState))
                        // }

                        default:
                                break;
                }
        }

        const [FetchedNodesData, dispatch] = useReducer(reducer, dataFormater())

        // useEffect(
        //   () =>
        //   {
        //     console.log('emiiiiiiiiiiiiiiiiiiiiiiiiit' false
        //     EventsManager.emit('updateData')
        //   }, [FetchedNodesData]
        // )

        Global_State['isEditorMode'] = isEditorMode
        Global_State['dataBaseData'] = FetchedNodesData
        Global_State['EventsManager'] = EventsManager

        const editor = useEditor(FetchedNodesData)

        useEffect(
                () =>
                {
                        if(!isEditorMode) editor.close()
                        else editor.open()
                }, [isEditorMode]
        )

        useEffect(
                () =>
                {
                        editor.update_initData(FetchedNodesData)
                        if (to_refresh.current) setImmediate( () => { dispatch({type: 'refresh'}) } )
                        to_refresh.current = false
                }, [FetchedNodesData]
        )

        const dataToUse = useMemo(
                () => isEditorMode ? editor.data : JSON.parse(JSON.stringify(FetchedNodesData)),
                [FetchedNodesData, isEditorMode, editor.data]
        )

        // const [ dataToUse, setDataToUse ] = useState( FetchedNodesData )

        // const t = useRef([makeNodeData('0', "folder", "all", true, "lol", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "mike", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "lal", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, -1)])
        // const f = useRef([makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1), makeNodeData('1', "folder", "all", true, "delta", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 3), makeNodeData('1', "folder", "all", true, "code", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 3), makeNodeData('5', "folder", "all", true, "fifa", "ds", false, '0', "", true, undefined, undefined, undefined, undefined, undefined, 5) ])

        // useEffect(
        //   () =>
        //   {
        //     console.log('kkkkkkkkkkkkkkkkkkkkkkkkk')
        //     if(isEditorMode) setDataToUse(JSON.parse(JSON.stringify(editor.data)))
        //     else setDataToUse(JSON.parse(JSON.stringify(FetchedNodesData)))
        //   }, [isEditorMode, FetchedNodesData, editor.data]
        // )


        const structuredData = useMemo(
                () =>
                {
                        const map = new Map()

                        for(let section of Data_Base.data.sections)
                        {
                                map.set(section.id, dataToUse.filter((nodeData) => { /*console.log(nodeData.section_id, section.id);*/ return nodeData.section_id === section.id || nodeData.section_id === -1 }).map((nodeData) => { return nodeData } ) )
                        }
                        return map
                }, [dataToUse]
        )
        console.log('structuredData',structuredData)


        const [selectedSectionId, setSectionId] = useState(Data_Base.data.sections.length === 0 ? 0 : Data_Base.data.sections[0].id)

        // console.log('selectedSectionId',selectedSectionId)

        const displayingSection = useMemo( () =>
                {
                        return Data_Base.data.sections.length === 0 ?
                                [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, -1)] :
                                structuredData.get(selectedSectionId)
                },
                [selectedSectionId, structuredData]
        )

        const dataParsedToJson = useMemo( () => parseToJson(displayingSection), [displayingSection] )

        // console.log(displayingSection)


        const [toggleCleared, setToggleCleared] = useState(false);

        const clearSelected = (setSelectedRows) => { setToggleCleared(!toggleCleared); EventsManager.emit('clearSelected') }

        function getTypeExt(ext)
        {
                const img = ["jpeg", "jpg", "png", "gif"]
                const vid = ["mp4", "avi", "MOV", "mpeg"]

                for(let imgExt of img)
                {
                        if(imgExt === ext) return "img";
                }
                for(let vidExt of vid)
                {
                        if(vidExt === ext) return "vid";
                }
                return ext
        }

        function getNodeData(id) {
                for(let node of displayingSection)
                {
                        // console.log(node.id)
                        if (id === node.id) {
                                return node
                        }
                }
                return null
        }

        function getNodePath(nodeId)
        {
                const node = getNodeData(nodeId);
                if (node) {
                        if (!node.isRoot && node.path) {
                                return node.path
                        }
                        else if (!node.isRoot) {
                                node.path = getNodePath(node.parentId).push(node.name);
                                return node.path
                        }
                        else return [node.name]
                }
        }

        function getChildren(nodeId) {
                let children = [];
                for(let nodeData of displayingSection)
                {
                        if (nodeData.parentId === nodeId) {
                                children.push(nodeData);
                        }
                }
                return children
        }

        function getType(extension)
        {
                let ext = getTypeExt(extension)
                switch(ext) {
                        case "img":
                                return "Image"
                        case "vid":
                                return "Video"
                        case "docx":
                                return "Fichier Word"
                        case "pdf":
                                return "Fichier Pdf"
                        case "xlsx":
                                return "Fichier Excel"
                        case "pptx":
                                return "Fichier PowerPoint"
                        case undefined:
                                return "Dossier"
                        default:
                                return "Type de fichier inconnu"
                }
        }

        const getCurrentSection = () =>
        {
                // console.log(sections.get(selectedSectionId))
                return sections.get(selectedSectionId)
        }

        function useModalManager()
        {
                const [content, setContent] = useState(<div />)
                const [show, setShow] = useState(false);
                const modal_title = useRef("");
                const can_close = useRef(true)

                const modal =
                        <Modal
                                show = {show}
                                onHide = {() => { if (can_close.current) setShow(false) }}
                                size = "lg"
                                centered
                                scrollable
                        >
                                <Modal.Header closeButton = {can_close.current} >
                                        <Modal.Title>{modal_title.current}</Modal.Title>
                                </Modal.Header>

                                <Modal.Body style={
                                        {
                                                width: 'auto',
                                                height: 'auto',
                                        }
                                } >
                                        {content}
                                </Modal.Body>
                        </Modal >

                const [container, setModalOpening] = useState(<div></div>)

                return(
                        {
                                modal,
                                open_modal: (title, may_close = true)=>{ can_close.current = may_close; modal_title.current = title; setShow(true) },
                                close_modal: ()=>{ setShow(false) },
                                setContent,
                        }
                )


        }

        const modalManager = useModalManager()

        function useShowSpinner()
        {
                const [show, setShow] = useState(false)

                const spinner = <div
                        style = {
                                {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        alignItems: 'center',
                                }
                        }
                > <Spinner animation="grow" variant="primary" size="xl" /> </div>

                return(
                        {
                                spinner,
                                show_spinner: () => {setShow(true)},
                                hide_spinner: () => {setShow(false)},
                        }
                )

        }

        const spinnerManager = useShowSpinner()


        const CustomDropDown = useCallback(
                function CustomDropDown({id, icon, content})
                {

                        const [show, setShow] = useState(false);
                        // const setShow = (val) => {
                        //   set(val)
                        //   isLogged = val
                        //   console.log(isLogged)
                        // }
                        const dropdown = useRef();


                        EventsManager.once(id, () => { console.log(id); setShow(true) })

                        useEffect(() => {
                                /**
                                 * Alert if clicked on outside of element
                                 */
                                function handleClickOutside(event) {
                                        if (dropdown.current && !dropdown.current.contains(event.target)) {
                                                // console.log('outside')
                                                setShow(false);
                                        }
                                }
                                // Bind the event listener
                                document.addEventListener("click", handleClickOutside);
                                return () => {
                                        // Unbind the event listener on clean up
                                        document.removeEventListener("click", handleClickOutside);
                                        EventsManager.off(id);

                                };

                        }, []);

                        return (
                                <div className = {useMemo(() => (`dropdown ${show ? 'show' : ''}`), [show])} ref = {dropdown}>
                                        {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                </button> */}


                                        <div onMouseEnter = {() => { setShow(true) }} id={id} data-toggle="dropdown" aria-haspopup="true" aria-expanded = {show} >
                                                {icon}
                                        </div>


                                        <div className = {useMemo(() => (`dropdown-menu ${show ? 'show' : ''}`), [show])} onMouseLeave = {() => { setShow(false) }} aria-labelledby="userPanel"
                                             style={{
                                                     position: 'absolute',
                                                     willChange: 'transform',
                                                     top: 0,
                                                     left: 0,
                                                     transform: 'translate3d(-160px, 5px, 0px)',
                                                     maxHeight: ( (window.innerHeight/100)*80 ),
                                                     overflow: 'auto' ,
                                                     paddingTop: 0,
                                             }} >
                                                <div className="p-1" style={{ backgroundColor: 'white', zIndex: 999, position: 'sticky', top: 0 }} ></div>
                                                {content}
                                        </div>
                                </div>
                        )

                },
                []
        )
        // console.log(sections)


        const initSelectedNodes = new Map
        Data_Base.data.sections.map((section) =>
                {
                        const sct = JSON.parse(JSON.stringify(section))
                        initSelectedNodes.set(sct.id, '0')
                }
        )

        const [selectedNodeIdsInSections, updateSNIdIS] = useState(initSelectedNodes)

        const sizeFormater = (size, fix = true, unit = "Bytes") =>
        {
                const s = parseFloat(size)
                let new_unit
                switch (unit) {
                        case "Bytes":
                                new_unit = "Ko"
                                break;
                        case "Ko":
                                new_unit = "Mo"
                                break;
                        case "Mo":
                                new_unit = "Go"
                                break;
                        case "Go":
                                new_unit = "To"
                                break;

                        default:
                                new_unit = "To"
                                break;
                }
                if( s > 716.8) return sizeFormater(s/1024, fix, new_unit)
                return fix ? s.toFixed(3) + ' ' + unit : s + ' ' + unit;
        }

        const identifyNode = node =>
        {

                // getting type and id according to backend
                let id
                let type

                // console.log(node)

                switch (node.type)
                {
                        case 'root':
                                type = 'App\\Models\\Section'
                                id = getCurrentSection().id
                                return [id, type];
                        case 'audit':
                                type = "App\\Models\\Audit"
                                id = parseInt(node.id.substring(5), 10)
                                return [id, type];
                        case 'checkList':
                                type = "App\\Models\\checkList"
                                id = parseInt(node.id.substring(9), 10)
                                return [id, type];
                        case 'dp':
                                type = 'App\\Models\\DossierPreuve'
                                id = parseInt(node.id.substring(2), 10)
                                return [id, type];
                        case 'nonC':
                                type = 'App\\Models\\Nc'
                                id = parseInt(node.id.substring(4), 10)
                                return [id, type];
                        case 'fnc':
                                type = 'App\\Models\\NonConformite'
                                id = parseInt(node.id.substring(3), 10)
                                return [id, type];
                        case 'ds':
                                type = 'App\\Models\\DossierSimple'
                                id = parseInt(node.id.substring(2), 10)
                                return [id, type];
                        case 'f':
                                type = 'App\\Models\\Fichier'
                                id = parseInt(node.id.substring(1), 10)
                                return node.global_type === 'file' ? [id, type] : undefined;

                        default:
                                break;
                }
        }

        // function useOutsideAlerter(ref) {
        //   useEffect(() => {
        //     /**
        //      * Alert if clicked on outside of element
        //      */
        //     function handleClickOutside(event) {
        //       if (ref.current && !ref.current.contains(event.target)) {
        //         alert("You clicked outside of me!");
        //       }
        //     }
        //     // Bind the event listener
        //     document.addEventListener("mousedown", handleClickOutside);
        //     return () => {
        //       // Unbind the event listener on clean up
        //       document.removeEventListener("mousedown", handleClickOutside);
        //     };
        //   }, [ref]);
        // }

        const [Overlay_props, setOverlay_props] = useState({
                style: {
                        display: 'none',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        zIndex: '1040',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'auto',
                        backgroundColor: '#00000000',
                        // pointerEvents: 'none',
                        // opacity: 0.5,
                } }
        )
        const Overlay_component = <div {...Overlay_props} onClick={ (e) =>
                {
                        e.stopPropagation();
                        setOverlay_props(t => (
                                        {
                                                ...t,
                                                style:
                                                {
                                                        ...t.style,
                                                        display: 'none',
                                                },
                                        }
                                )
                        )
                }
        }  />

        return (
                {
                        ...Global_State,
                        // EventsManager,
                        // isEditorMode,
                        authUser: Data_Base.authUser,
                        // dataBaseData: FetchedNodesData,
                        dataToUse,
                        hasSection: Data_Base.data.sections.length !== 0,
                        value: displayingSection,
                        jsonValue: dataParsedToJson,
                        editor,
                        changeMode: () => { setIsEditorMode(t => !t) },
                        createNodeData: makeNodeData,
                        getNodeDataById: getNodeData,
                        getChildrenById: getChildren,
                        getType: getType,
                        modalManager,
                        spinnerManager,
                        selectedSectionId,
                        setSectionId,
                        sections: sections,
                        FetchedNodesData: structuredData,
                        // setFnd,
                        selectedNodeIdsInSections,
                        updateSNIdIS,
                        getCurrentSection,
                        sizeFormater,
                        identifyNode,
                        toggleCleared,
                        clearSelected,
                        CustomDropDown,
                        Overlay_component,
                        setOverlay_props,
                }
        )

}










// makeNodeData(1, "node1", "folder", true, -1, "", true),
//     makeNodeData(2, "node2", "folder", true, 1, "", true),
//     makeNodeData(3, "node3", "file", false, 7, "", false, "pdf"),//
//     makeNodeData(4, "node4", "folder", false, 1, "", false),
//     makeNodeData(5, "node5", "file", false, 1, "", false, "jpg"),//
//     makeNodeData(6, "node6", "file", false, 2, "", false, "mp4"),//
//     makeNodeData(7, "node7", "folder", false, 9, "", true),
//     makeNodeData(8, "nodxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe8", "file", false, 9, "", false, "pptx"),//
//     makeNodeData(9, "node9", "folder", false, 2, "", true),
//     makeNodeData(10, "node10", "file", false, 2, "", false, "xlsx"),//
//     makeNodeData(11, "node11", "folder", false, 1, "", true),
//     makeNodeData(12, "node2", "folder", false, 1, "", true),
//     makeNodeData(13, "node2", "folder", false, 1, "", true),
//     makeNodeData(14, "node2", "folder", false, 1, "", true),
//     makeNodeData(15, "node2", "folder", false, 1, "", true),
//     makeNodeData(16, "node2", "folder", false, 1, "", true),
//     makeNodeData(17, "node2", "folder", false, 1, "", true),
//     makeNodeData(18, "node2", "folder", false, 1, "", true),
//     makeNodeData(19, "node2", "folder", false, 1, "", true),
//     makeNodeData(20, "node2", "folder", false, 1, "", true),
//     makeNodeData(21, "node2", "folder", false, 1, "", true),
//     makeNodeData(22, "node2", "folder", true, 1, "", true),