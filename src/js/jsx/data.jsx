/* eslint-disable import/first */


import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";


import parseToJson from "./files_package/parse_to_json";
import useEditor from './editor'
import {http} from "./auth/login"

import Echo from 'laravel-echo';
import EventEmitter from 'eventemitter3';

import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";
import {Box, Fade, Grow, Popover, Popper} from "@mui/material";
import {Queue} from "@mui/icons-material";
import {useSpring, animated} from "react-spring";
import {Collapse} from "react-bootstrap";

window.Pusher = require('pusher-js');

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


        // await http
        //         .get("user")
        //         .then(response => {Datas.authUser = response.data})
        //
        // await http
        //         .get("get_ss")
        //         .then(response => { Datas.status.sections = response.status; Datas.data.sections = response.data; })
        //         .catch(error => Datas.errors.sections = error);
        //
        // await http
        //         .get("get_audits")
        //         .then(response => { Datas.status.audits = response.status; Datas.data.audits = response.data; })
        //         .catch(error => Datas.errors.audits = error);
        //
        // await http
        //         .get("get_checkLists")
        //         .then(response => { Datas.status.checkLists = response.status; Datas.data.checkLists = response.data; })
        //         .catch(error => Datas.errors.checkLists = error);
        //
        // await http
        //         .get("get_Dps")
        //         .then(response => { Datas.status.dps = response.status; Datas.data.dps = response.data; })
        //         .catch(error => Datas.errors.dps = error);
        //
        // await http
        //         .get("get_NonCs")
        //         .then(response => { Datas.status.nonCs = response.status; Datas.data.nonCs = response.data; })
        //         .catch(error => Datas.errors.nonCs = error);
        //
        // await http
        //         .get("get_fncs")
        //         .then(response => { Datas.status.fncs = response.status; Datas.data.fncs = response.data; })
        //         .catch(error => Datas.errors.fncs = error);
        //
        // await http
        //         .get("get_ds")
        //         .then(response => { Datas.status.ds = response.status; Datas.data.ds = response.data; })
        //         .catch(error => Datas.errors.ds = error);
        //
        // await http
        //         .get("get_fs")
        //         .then(response => { Datas.status.fs = response.status; Datas.data.fs = response.data; })
        //         .catch(error => Datas.errors.fs = error);
        //
        // await http
        //         .get("get_services")
        //         .then(response => { Datas.status.services = response.status; Datas.data.services = response.data; })
        //         .catch(error => Datas.errors.services = error);


        let data

        await http.post("get_data", {})
        .then( res => data = res.data )
        .catch(error => console.log(error));

        // console.log("Dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas", data)

        return data

}

function useAbsolutePopover()
{
        const [isOpen, setIsOpen] = useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const [content, setContent] = useState(null);

        function open(child, origin = null)
        {
                // console.log("origiiiiiiiiiiiinnnnnnnnn", origin)
                if (origin) setAnchorEl(origin)
                setContent(child)
                setIsOpen(true)
        }

        function close()
        {
                setIsOpen(false)
                setTimeout( () => setAnchorEl(null), 500 )
        }

        const paperStyle = anchorEl ?
        {
                backgroundColor: '#ffffff00',
                boxShadow: 'none',
                overflow: 'visible',
        }
        :
        {
                display: "contents"
        }

        const popover =
        <Popover
                open={isOpen}
                anchorReference={ anchorEl ? "anchorEl" : "none" }
                anchorEl={anchorEl}
                onClose={close}
                PaperProps={{
                        style: paperStyle
                }}
                anchorOrigin={{
                        vertical: anchorEl ? 'bottom' : 'top',
                        horizontal: 'center',
                }}
                transformOrigin={{
                        vertical: anchorEl ? "top" : 'center',
                        horizontal: 'center',
                }}
                // TransitionComponent={Fade}
        >
                <div className={`${ anchorEl ? '' : "d-flex justify-content-center align-items-start" }`}
                     style={{
                             marginTop: !anchorEl ? 15 : 0,
                             width: anchorEl ? "fit-content" : "100%",
                             height: anchorEl ? "fit-content" : "100%",
                             animation: "fadeMe 0.5s"
                        }}
                     onClick={close}
                >
                        {content}
                </div>
        </Popover>

        return {open, close, popover}
}

export default function useGetData(TheDatas)
{

        // console.log('checking', TheDatas)


        const [authUser, updateAuthUser] = useState(TheDatas.authUser)
        const [isEditorMode, setIsEditorMode] = useState(false)

        const to_refresh = useRef(true)
        const handling_node_events = useRef(false)
        const node_events_queue = useRef([])


        const echosHandler = async (tag, data = null) =>
                {
                        switch (tag) {
                                case 'updateAuthUserInfo':
                                {
                                        // console.log('updateAuthUserInfo')
                                        await http.get('user')
                                        .then(res =>
                                                {
                                                        // console.log(res)
                                                        updateAuthUser(res.data)
                                                }
                                        )
                                        .catch( err => { console.log(err) })
                                        break;
                                }
                                case 'handle_node_events':
                                {
                                        handling_node_events.current = true

                                        do {
                                                const data = node_events_queue.current.shift()
                                                // console.log('start', data, node_events_queue.current)
                                                // return

                                                if (data.operation === 'add')
                                                {
                                                        // console.log('emitting echo')
                                                        // console.log(data)
                                                        const ids = new FormData
                                                        data.node.map(element => {
                                                                // console.log(element)
                                                                ids.append('ids[]', element)
                                                        });
                                                        // console.log(ids.get('ids[]'))

                                                        await http.post('getDatasByIds', ids)
                                                        .then( res =>
                                                        {
                                                                // console.log('getDatasByIds_add', res)

                                                                setImmediate( () => { dispatch({type: 'add', data: {...data, 'node': res.data}}) } )
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
                                                        // console.log('emitting echo')
                                                        setImmediate( () => { dispatch({type: 'delete', data}) } )
                                                }
                                                else if(data.operation === 'update')
                                                {
                                                        // console.log('echo update ')

                                                        const ids = new FormData
                                                        // console.log('data.node', data.node)
                                                        data.node.map(element => {
                                                                // console.log(element)
                                                                ids.append('ids[]', element)
                                                        });
                                                        await http.post('getDatasByIds', ids)
                                                        .then( res =>
                                                        {
                                                                // console.log('getDatasByIds_update', res)

                                                                setImmediate( () => { dispatch({type: 'update', data: {...data, 'node': res.data}}) } )
                                                        }
                                                        )
                                                        .catch( err =>
                                                        {
                                                                console.log(err)
                                                        }
                                                        )
                                                }
                                                // else if (data.operation === 'move')
                                                // {
                                                //         console.log('emitting move echo', data)
                                                //         const ids = new FormData
                                                //         data.node.map(element => {
                                                //                 console.log(element)
                                                //                 ids.append('ids[]', element)
                                                //         });
                                                //         console.log(ids.get('ids[]'))
                                                //
                                                //         http.post('getDatasByIds', ids)
                                                //         .then( res =>
                                                //         {
                                                //                 console.log(res)
                                                //
                                                //                 dispatch({type: 'move', data: {...data, 'node': res.data}})
                                                //         }
                                                //         )
                                                //         .catch( err =>
                                                //         {
                                                //                 console.log(err)
                                                //         }
                                                //         )
                                                // }

                                                // console.log('end', node_events_queue.current)
                                        }
                                        while (node_events_queue.current.length)

                                        handling_node_events.current = false

                                        break
                                }

                                default:
                                        break;
                        }

                }

        const [expanded, setExpanded] = useState(["0"])

        useEffect(
                () =>
                {
                        const echo = new Echo(options);

                        for (const service of authUser.services)
                        {
                                echo.private(`nodeUpdate.${service.id}`).listen( 'NodeUpdateEvent', (data) =>
                                {
                                        node_events_queue.current.push(data)
                                        // console.log('NodeUpdateEvent', node_events_queue.current, data)
                                        if (!handling_node_events.current) echosHandler('handle_node_events')
                                }
                                );
                        }

                        // echo.private(`nodeUpdate.1`).listen( 'NodeUpdateEvent', (data) =>
                        // {
                        //         node_events_queue.current.push(data)
                        //         console.log('NodeUpdateEvent', node_events_queue.current, data)
                        //         if (!handling_node_events.current) echosHandler('handle_node_events')
                        // }
                        // );

                        echo.private(`user.${authUser.id}`).listen('AuthUserUpdate',
                                () =>
                                {
                                        // console.log('AuthUserUpdate')
                                        echosHandler('updateAuthUserInfo')
                                }
                        )

                        echo.private(`user.${authUser.id}`).notification((data) => {
                                if(data.type === 'AskPermission')
                                {
                                        // console.log(data)

                                        echosHandler('updateAuthUserInfo')

                                        // toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                        toast(`Info: L'inspecteur ${data.name} a fait une demande de permission de votre part á l'instant !`,
                                                {
                                                        id: data.from_id,
                                                        icon: "📢",
                                                        style: { fontWeight: 'bold' },
                                                        duration: 5000,
                                                }
                                        );
                                }
                                else if (data.type === "Information")
                                {
                                        // console.log('Informationnnnnnnnnnnnnn!!!!!', data)

                                        const attachment = JSON.parse(data.attachment)
                                        const attachment_items = []

                                        for (const key in attachment)
                                        {
                                                attachment_items.push(
                                                        <React.Fragment key={key}>
                                                                <b>{key}:</b> {attachment[key]} <br/>
                                                        </React.Fragment>
                                                )
                                        }

                                        toast(
                                                <div>
                                                        <b
                                                                style={
                                                                        {
                                                                                width: '100%',
                                                                                display: 'inline-block',
                                                                                textAlign: 'center',
                                                                                textDecoration: 'underline'
                                                                        }
                                                                }
                                                        >
                                                                ￣へ￣--- <span style={{ transform: "rotateY(180deg)", display: "inline-block", }} >📢</span> INFORMATION <span style={{ display: "inline-block", }} >📢</span> ---￣へ￣
                                                        </b> <br/> <br/>
                                                        <b>Destinateur:</b> {data.user_from} 👈(ﾟヮﾟ👈) <br/>
                                                        <b>Objet:</b> {data.object} <br/>
                                                        <b>Message:</b>&nbsp;
                                                        <span
                                                                style={
                                                                        {
                                                                                color: 'blue'
                                                                        }
                                                                }
                                                        >
                                                                {data.msg}
                                                        </span>
                                                        <br/>
                                                        <div className={`info_attachment`} >
                                                                {attachment_items}
                                                        </div>
                                                        <Button className='d-block mt-2' style={{ width: '100%' }} variant="light" onClick={() => { toast.dismiss(data.id) }}>
                                                                Dismiss
                                                        </Button>

                                                </div>,
                                                {
                                                        id: data.id,
                                                        // icon: 'p',
                                                        // type: 'success',
                                                        duration: Infinity
                                                }
                                        );

                                }
                                else if (data.type === 'FncReviewNotification')
                                {
                                        // console.log(data)

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
                                                }
                                        )

                                        echosHandler('updateAuthUserInfo')
                                }

                        });

                        EventsManager.on('updateAuthUserInfo', () => { echosHandler('updateAuthUserInfo') })

                        // EventsManager.on('updateOK', (data) => { setO(data) })

                        // EventsManager.on('update_open_state', data => { dispatch({ type: 'update_open_state', data }) })
                        EventsManager.on('setExpanded', new_expanded => { setExpanded([...new_expanded]) })

                        // EventsManager.on('updateData', () => { console.log('emit working') })

                        return () =>
                        {
                                echo.disconnect();
                                EventsManager.off('updateAuthUserInfo')
                                // EventsManager.off('updateOK')
                                EventsManager.off('setExpanded')
                        }
                },[]

        )


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

        function makeNodeData(id, global_type, services, isOpen, name, type, isRoot, parentId, path, hasChildren, ext, ra, opening_date, isClosed, review_date, created_at, level, section_id, taille, url, is_validated, validator_id, validator = null)
        {


                return {
                        id,
                        global_type,
                        services,
                        isOpen,
                        section_id,
                        name,
                        type,
                        is_validated,
                        validator_id,
                        taille,
                        level,
                        created_at: created_at && created_at.substring(0, 19),
                        ra,
                        hasChildren,
                        isRoot,
                        parentId,
                        path,
                        isClosed,
                        opening_date,
                        review_date,
                        ext,
                        url,
                        validator,
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



        function copyObject(obj)
        {
                if (!obj) return obj

                const constructors =
                {
                        is_json: (json) => (json.constructor === Object),
                        is_array: (array) => (array.constructor === Array),
                        is_map: (map) => (map.constructor === Map),
                        is_file: (file) => (file.constructor === File),


                }

                if ( constructors.is_map(obj) )
                {
                        const map = new Map()

                        obj.forEach(
                        (value, key) =>
                        {
                                map.set(key, copyObject(value))
                        }
                        )

                        return map
                }
                else if ( constructors.is_array(obj) )
                {
                        const array = []

                        for (const arrayElement of obj)
                        {
                                array.push( copyObject(arrayElement) )
                        }

                        return array
                }
                else if ( constructors.is_json(obj) )
                {
                        const json = {}

                        for (const key in obj)
                        {
                                json[`${key}`] = copyObject(obj[`${key}`])
                        }

                        return json
                }
                else return obj
        }

        function compareObjects(obj1, obj2) {
                // Si l'un des objets n'existe pas, retourner false
                if (!obj1 || !obj2) return false;

                // Si les objets sont de types différents, retourner false
                if (obj1.constructor !== obj2.constructor) return false;

                // Si les objets sont des Maps
                if (obj1.constructor === Map) {
                        // Si les Maps ont un nombre différent d'entrées, retourner false
                        if (obj1.size !== obj2.size) return false;
                        // Pour chaque entrée de la Map, comparer la clé et la valeur avec celles de l'autre Map
                        for (const [key, value] of obj1) {
                                if (!obj2.has(key) || !compareObjects(value, obj2.get(key))) return false;
                        }
                        return true;
                }

                // Si les objets sont des tableaux
                if (obj1.constructor === Array) {
                        // Si les tableaux ont une taille différente, retourner false
                        if (obj1.length !== obj2.length) return false;
                        // Pour chaque élément du tableau, comparer avec celui de l'autre tableau
                        for (let i = 0; i < obj1.length; i++) {
                                if (!compareObjects(obj1[i], obj2[i])) return false;
                        }
                        return true;
                }

                // Si les objets sont des objets JSON
                if (obj1.constructor === Object) {
                        // Si les objets JSON ont un nombre différent de propriétés, retourner false
                        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
                        // Pour chaque propriété de l'objet, comparer avec celle de l'autre objet
                        for (const key in obj1) {
                                if (!(key in obj2) || !compareObjects(obj1[key], obj2[key])) return false;
                        }
                        return true;
                }

                // Si les objets sont de types différents, retourner false
                return obj1 === obj2;
        }

        const getNewPath = (new_node, all_nodes, to_update = false) =>
        {
                if (!new_node) return 'undefined'

                if (new_node.type === 'root')
                {
                        // console.log('sectionnnnnnnnnnnnnnnnnnnnnnnnnn', sections.get(1), new_node)
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
                        case 'dp':
                        {
                                let audit

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId) audit = JSON.parse(JSON.stringify(node))
                                }

                                return `${getNewPath(audit, all_nodes)}\\${new_node.name}`
                        }
                        case 'nonC':
                        {
                                let audit

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId) audit = JSON.parse(JSON.stringify(node))
                                }

                                return `${getNewPath(audit, all_nodes)}\\${new_node.name}`
                        }
                        case 'fnc':
                        {
                                let nc

                                for (const node of  all_nodes)
                                {
                                        if(node.id === new_node.parentId) nc = JSON.parse(JSON.stringify(node))
                                }

                                return `${getNewPath(nc, all_nodes)}\\${new_node.name}`
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
                                // if (new_node.name === "Levius") console.log("Levius***************", all_nodes, parent, new_node)
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

        const update_path = (node, current_state) =>
        {
                let up_to_date_node = JSON.parse( JSON.stringify( node ) )

                up_to_date_node.path = getNewPath(up_to_date_node, current_state, true)

                // console.log('current_state', current_state)

                let new_state = JSON.parse( JSON.stringify( current_state ) ).map(
                current_node =>
                {
                        if ( (current_node.id === up_to_date_node.id) ) return up_to_date_node
                        return current_node
                }
                )

                // console.log('new_state', new_state)

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

        const dataFormater = () =>
        {

                // Data_Base.data.audits[0].name = "dddd"

                // makeNodeData(0, "Racine", "root", true, -1, "", true)

                let allDataAsNodeData = [makeNodeData('0', "folder", "all", true, "Racine", "root", true, -1, "", true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1)]

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
                                        undefined,
                                        audit.created_at,
                                        undefined,
                                        audit.section_id,
                                        undefined,
                                        undefined,
                                        audit.is_validated,
                                        audit.validator_id,
                                        audit.validator,
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
                                        undefined,
                                        checkList.created_at,
                                        undefined,
                                        checkList.section_id,
                                        undefined,
                                        undefined,
                                        checkList.is_validated,
                                        checkList.validator_id,
                                        checkList.validator,
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
                                        undefined,
                                        dp.created_at,
                                        undefined,
                                        dp.section_id,
                                        undefined,
                                        undefined,
                                        dp.is_validated,
                                        dp.validator_id,
                                        dp.validator,
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
                                        undefined,
                                        nonC.created_at,
                                        undefined,
                                        nonC.section_id,
                                        undefined,
                                        undefined,
                                        nonC.is_validated,
                                        nonC.validator_id,
                                        nonC.validator,
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
                                        fnc.opening_date,
                                        fnc.isClosed,
                                        fnc.review_date,
                                        fnc.created_at,
                                        fnc.level,
                                        fnc.section_id,
                                        undefined,
                                        undefined,
                                        fnc.is_validated,
                                        fnc.validator_id,
                                        fnc.validator,
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
                                        undefined,
                                        f.created_at,
                                        undefined,
                                        f.section_id,
                                        f.size,
                                        f.url,
                                        f.is_validated,
                                        f.validator_id,
                                        f.validator,
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
                                        undefined,
                                        d.created_at,
                                        undefined,
                                        d.section_id,
                                        undefined,
                                        undefined,
                                        d.is_validated,
                                        d.validator_id,
                                        d.validator,
                                )
                        )
                }

                // console.log("DataFormater", allDataAsNodeData)


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
                                type === 'audit' ? node.user : undefined,
                                type === 'fnc' ? node.opening_date : undefined,
                                type === 'fnc' ? node.isClosed : undefined,
                                type === 'fnc' ? node.review_date : undefined,
                                node.created_at,//
                                type === 'fnc' ? node.level : undefined,
                                parseInt(node.section_id),
                                type === 'f' ? node.size : undefined,
                                type === 'f' ? node.url : undefined,
                                node.is_validated,
                                node.validator_id,
                                node.validator
                        )
                }

                function supress_from_list(qualified_id, list_of_data)
                {
                        let new_list = [...list_of_data].filter( node => node.id !== qualified_id )

                        for ( const child of [...getChildrenFrom([...new_list], qualified_id)] )
                        {
                                new_list = supress_from_list(child.id, [...new_list])
                        }

                        return new_list
                }

                switch (action.type) {
                        case 'refresh':
                                return [...state]
                        case 'add':
                        {
                                to_refresh.current = true

                                const data = action.data
                                // console.log( 'broadcast.........', data);

                                // const section_id = data.node.constructor === Array ? parseInt(data.node[0].section_id) : parseInt(data.node.section_id)

                                if (data.node.constructor === Array)
                                {
                                        // console.log("heeeerre", existing_data)
                                        for (const node of data.node)
                                        {
                                                const new_node = create_new_node(node)

                                                if ( state.find( node => node.id === new_node.id ) ) continue

                                                new_node.path = getNewPath({...new_node}, [...state], true)

                                                state.push(new_node)
                                        }
                                }

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'delete':
                        {
                                to_refresh.current = true

                                const data = action.data
                                // console.log( 'broadcast.........', data);

                                // console.log('enter notif update')

                                authUser.asking_permission_notifications.forEach(notif =>
                                        {
                                                // console.log(notif.operable_id, data.node.id, notif.operable_id === data.node.id)
                                                if (notif.operable_id === data.node.id)
                                                {
                                                        // console.log('notif update')
                                                        echosHandler('updateAuthUserInfo')
                                                        EventsManager.emit('updateNotif', notif.id)
                                                }
                                        }
                                );

                                const newState = supress_from_list(data.node.type + data.node.id, [...state])

                                // EventsManager.emit('updateData')

                                // console.log('newState', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'update':
                        {
                                to_refresh.current = true

                                const data = action.data
                                // console.log( 'broadcast.........', data);

                                let newState = JSON.parse( JSON.stringify(state) )

                                for (const node of data.node)
                                {
                                        const updatedNode = create_new_node(node)

                                        // console.log('updatedNode', updatedNode)

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

                                        newState = update_path(updatedNode, JSON.parse(JSON.stringify(newState)) )
                                }

                                // EventsManager.emit('updateData')

                                // console.log('finalState', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        // case "update_open_state":
                        // {
                        //         state = copyObject(state).map(
                        //          node =>
                        //          {
                        //                  if (node.id === action.data.id) return {...node, isOpen: action.data.new_state}
                        //                  return node
                        //          }
                        //         )
                        //
                        //         return state
                        // }

                        default:
                                break;
                }
        }

        const [FetchedNodesData, dispatch] = useReducer(reducer, dataFormater())


        window.Global_State['isEditorMode'] = isEditorMode
        window.Global_State['dataBaseData'] = FetchedNodesData
        window.Global_State['EventsManager'] = EventsManager

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
        // console.log('structuredData',structuredData)


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

        function getChildrenFrom(list_of_data, nodeId) {
                let children = [];
                for(let nodeData of list_of_data)
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

        const getNodeSection = id =>
        {
                const node = dataToUse.find( node => node.id === id )

                if (node) return node.section_id
                return undefined
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
                function CustomDropDown({id, icon, content, f = undefined})
                {

                        const [anchorEl, setAnchorEl] = useState(null);

                        const handleEnter = (event) => {
                                setAnchorEl(event.currentTarget);
                        };

                        const handleLeave = () => {
                                setAnchorEl(null);
                        };

                        const open = Boolean(anchorEl);
                        const drop_id = open ? id : undefined;

                        useEffect(
                        () =>
                        {
                                if (id === 'notifPanel')
                                {
                                        EventsManager.emit('setOpenState', open)
                                }
                        }, [anchorEl]
                        )

                        // useEffect(() => {
                        //         /**
                        //          * Alert if clicked on outside of element
                        //          */
                        //         function handleClickOutside(event) {
                        //                 // console.log('outside')
                        //                 const dropdown = document.getElementById(id)
                        //                 if (dropdown && !dropdown.contains(event.target)) {
                        //                         // console.log('outside')
                        //                         handleLeave()
                        //                 }
                        //         }
                        //         // Bind the event listener
                        //         document.addEventListener("click", handleClickOutside);
                        //         return () => {
                        //                 // Unbind the event listener on clean up
                        //                 console.log('byeeeeeeeeeeeeeeeeeeeee')
                        //                 document.removeEventListener("click", handleClickOutside);
                        //
                        //         };
                        //
                        // }, [])

                        useEffect(
                                () =>
                                {
                                        // console.log('byeeeeeeeeeeeeeeeeeeeee', open)
                                }
                        )

                        // const popperAnimation = useSpring({
                        //         from: { transform: 'translate3d(0, -20px, 0)'},
                        //         to: { transform: 'translate3d(0, 0, 0)' },
                        //         config: { duration: 200},
                        //         // pause: to_delay === 3,
                        //         reset: true,
                        //         loop: true,
                        // });

                        return (
                                <div id={id} tabIndex={0} onClick={e => { e.preventDefault(); e.stopPropagation() }} >
                                        <div onClick={handleEnter} >{icon}</div>
                                        <Popover id={`${drop_id}_pop`}
                                                 PaperProps={{
                                                         className: "d-flex",
                                                         style: {
                                                         borderRadius: '0.25rem',
                                                         fontSize: '14px',
                                                         border: 'none',
                                                         overflow: 'hidden',
                                                         padding: '0.5rem',
                                                         maxHeight: "80%",
                                                         maxWidth: "95%",
                                                         backgroundColor: "white",
                                                        },
                                                         onMouseLeave: handleLeave
                                                 }}
                                                 anchorOrigin={{
                                                         vertical: 'bottom',
                                                         horizontal: 'center',
                                                 }}
                                                 transformOrigin={{
                                                         vertical: 'top',
                                                         horizontal: 'center',
                                                 }}
                                                 onClose={handleLeave}
                                                 open={open}
                                                 anchorEl={anchorEl}
                                        >
                                                <Box className="d-flex" >
                                                        {content}
                                                </Box>
                                        </Popover>
                                </div>
                        );

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

        const selectedNodeIdsInSections = useRef(initSelectedNodes)

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

        const parseModelToFrontType = model =>
        {
                switch (model)
                {
                        case 'App\\Models\\Section':
                                return 'root'
                        case 'App\\Models\\Audit':
                                return 'audit'
                        case 'App\\Models\\checkList':
                                return 'checkList'
                        case 'App\\Models\\DossierPreuve':
                                return 'dp'
                        case 'App\\Models\\Nc':
                                return 'nonC'
                        case 'App\\Models\\NonConformite':
                                return 'fnc'
                        case 'App\\Models\\DossierSimple':
                                return 'ds'
                        case 'App\\Models\\Fichier':
                                return 'f'
                        default:
                                return null

                }
        }


        const [Overlay_props, setOverlay_props] = useState({
                style: {
                        display: 'none',
                        position: 'fixed',
                        zIndex: '1040',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        animation: "fadeMe 0.5s",
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

        const absolutePopover = useAbsolutePopover()

        return (
                {
                        ...window.Global_State,
                        // EventsManager,
                        // isEditorMode,
                        authUser: Data_Base.authUser, updateAuthUserInfo: value => { /*console.log("updateAuthUser", value);*/ updateAuthUser(value) },
                        // dataBaseData: FetchedNodesData,
                        dataToUse,
                        hasSection: Data_Base.data.sections.length !== 0,
                        value: displayingSection,
                        jsonValue: dataParsedToJson,
                        editor,
                        changeMode: () => { setIsEditorMode(t => !t) },
                        createNodeData: makeNodeData,
                        parseModelToFrontType,
                        getNodeDataById: getNodeData,
                        getChildrenById: getChildrenFrom,
                        getType: getType,
                        getNodeSection,
                        getNewPath,
                        update_path,
                        copyObject,
                        compareObjects,
                        modalManager,
                        spinnerManager,
                        selectedSectionId,
                        setSectionId,
                        sections,
                        structuredData,
                        // setFnd,
                        selectedNodeIdsInSections,
                        getCurrentSection,
                        sizeFormater,
                        identifyNode,
                        toggleCleared,
                        clearSelected,
                        CustomDropDown,
                        Overlay_component,
                        setOverlay_props,
                        absolutePopover,
                        expanded
                }
        )

}


