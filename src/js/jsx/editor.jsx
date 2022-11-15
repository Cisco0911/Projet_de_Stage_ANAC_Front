/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer} from 'react';

import isEqual from "lodash.isequal";

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';
import { useMemo } from 'react';





export default function useEditor(data)
{
        // const active = useMemo( () => (isEditorMode), [active] )

        const [active, setActive] = useState(false)

        const initData = useRef( JSON.parse( JSON.stringify(data) ) )

        const initManager =
        {
                data: initData,
                isNew: id =>
                {
                        let isNew = true

                        // console.log('enter foooooooooooooooor', initData.current)
                        for (const initNode of initData.current)
                        {
                                // console.log('idddddddddddddddddddddddddddddddddd', id, initNode.id)
                                if( id === initNode.id )
                                {
                                        isNew = false
                                        break
                                }
                        }

                        return isNew
                },
                haveBeenModified: node =>
                {
                        let isModified = false


                        initData.current.forEach(
                                initNode =>
                                {
                                        if( node.id === initNode.id )
                                        {
                                                if( !isEqual(node, initNode) ) { isModified = true; return 1 }
                                        }
                                }
                        );

                        return isModified
                },
        }

        const id = useRef(-2)
        const job_id = useRef(1)

        const formData = useRef()


        const getService = services =>
        {
                // console.log('fffffffffffffffff',Global_State.authUser.services);
                return Global_State.authUser.services.filter(
                        service =>
                        {
                                let belongsTo = false
                                services.forEach(
                                        element => { if(element.value === service.id) belongsTo = true }
                                );
                                return belongsTo
                        }
                )
        }

        const form_to_json = (formData) =>
        {
                // object[key] = key === 'services' ? JSON.parse(value) : value

                var object = {};
                formData.forEach(
                        (value, key) =>
                        {
                                switch (key)
                                {
                                        case 'services':
                                                object[key] = JSON.parse(value)
                                                break;
                                        case 'fichiers[]':
                                                if(Array.isArray(object.files)) object.files.push(value)
                                                else object.files = [value]
                                                break;
                                        default:
                                                object[key] = value
                                                break;
                                }
                        }
                );

                return object
        }

        // const haveBeenModified = node =>
        // {
        //   let isModified = false

        //   initData.current.forEach(
        //     initNode =>
        //     {
        //       if( node.id === initNode.id )
        //       {
        //         if( !isEqual(node, initNode) ) { isModified = true; return 1 }
        //       }
        //     }
        //   );

        //   return isModified
        // }


        function data_reducer( state, action )
        {
                switch (action.type) {
                        case 'reset':
                        {
                                console.log('initData.current', initData.current)

                                id.current = -2
                                job_id.current = 1

                                return JSON.parse( JSON.stringify( initData.current ) )
                        }
                        case 'update_initData':
                        {
                                let updated_state = []
                                let modified_nodes = []

                                const new_data = JSON.parse( JSON.stringify( action.new_data ) )

                                new_data.forEach(
                                        node =>
                                        {
                                                if( initManager.isNew(node.id) ) updated_state.push(node)
                                        }
                                )

                                for (const localNode of state)
                                {
                                        let added = false
                                        for (const node of new_data)
                                        {
                                                if(node.id === localNode.id)
                                                {
                                                        if( initManager.haveBeenModified(node) )
                                                        {
                                                                updated_state.push(node)
                                                        }
                                                        else updated_state.push(localNode)

                                                        added = true
                                                        break;
                                                }
                                        }
                                        if(added) continue
                                        if( localNode.id.split('-').length === 2 ) updated_state.push(localNode)
                                }

                                initData.current = JSON.parse( JSON.stringify( new_data ) )


                                return JSON.parse( JSON.stringify( updated_state ) )
                        }
                        case 'add_folder':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

                                const data = action.job.data

                                const new_folder =
                                        Global_State.createNodeData
                                                (
                                                        `ds${id.current}`,
                                                        "folder",
                                                        getService(data.services),
                                                        false,
                                                        data.name,
                                                        "ds",
                                                        false,
                                                        data.front_parent_type === 'root' ? '0' : data.front_parent_type + data.parent_id,
                                                        "",
                                                        true,
                                                        undefined,
                                                        undefined,
                                                        undefined,
                                                        'pas encore créé',
                                                        undefined,
                                                        parseInt(data.section_id),
                                                        undefined,
                                                        undefined,
                                                )
                                new_folder['onEdit'] = true

                                state.push(new_folder)

                                id.current = id.current - 1

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_folder':
                        {

                                const suppress_from = ( list_, id ) =>
                                {
                                        let rest = list_.filter(
                                                node => ( node.id !== id )
                                        )

                                        for (const node of list_)
                                        {
                                                // console.log(id, node.parentId)
                                                if( id === node.parentId ) rest = suppress_from(rest, node.id)
                                        }

                                        // console.log('resttttttttttttttttt', rest)
                                        return rest
                                }

                                const newState = suppress_from(state, `ds${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'add_files':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_files')

                                const data = action.job.data
                                const files = action.job.data.files

                                console.log('dataaaaaaaaaaaaaaaaaaas', files, action.job)

                                for (const file of files)
                                {

                                        const part_name = file.name.split('.')

                                        const ext = part_name[part_name.length-1]

                                        let new_file =
                                        Global_State.createNodeData
                                        (
                                        `f${id.current}`,
                                        "file",
                                        getService(data.services),
                                        false,
                                        file.name,
                                        "f",
                                        false,
                                        data.front_parent_type === 'root' ? '0' : data.front_parent_type + data.parent_id,
                                        "",
                                        false,
                                        ext,
                                        undefined,
                                        undefined,
                                        'pas encore créé',
                                        undefined,
                                        parseInt(data.section_id),
                                        file.size,
                                        undefined,
                                        )
                                        new_file['onEdit'] = true

                                        state.push(new_file)

                                        id.current = id.current - 1
                                }

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_file':
                        {

                                const suppress_from = ( list_, id ) =>
                                {
                                        let rest = list_.filter(
                                        node => ( node.id !== id )
                                        )

                                        for (const node of list_)
                                        {
                                                // console.log(id, node.parentId)
                                                if( id === node.parentId ) rest = suppress_from(rest, node.id)
                                        }

                                        // console.log('resttttttttttttttttt', rest)
                                        return rest
                                }

                                const newState = suppress_from(state, `f${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'add_audit':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_audit')

                                for (const job of action.jobs)
                                {
                                        const data = job.data

                                        const type = data.sub_type !== undefined ? data.sub_type : 'audit';

                                        const new_node =
                                        Global_State.createNodeData
                                        (
                                        `${type}${job.node_id}`,
                                        "folder",
                                        getService(data.services),
                                        false,
                                        data.name,
                                        type,
                                        false,
                                        type === 'audit' ? '0' : `audit${job.data.audit_id}`,
                                        "",
                                        true,
                                        undefined,
                                        type === 'audit' ? Global_State.authUser : undefined,
                                        undefined,
                                        'pas encore créé',
                                        undefined,
                                        parseInt(data.section_id),
                                        undefined,
                                        undefined
                                        )
                                        new_node['onEdit'] = true

                                        state.push(new_node)
                                }


                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_audit':
                        {

                                const suppress_from_data = ( list_, id ) =>
                                {
                                        let rest = list_.filter(
                                        node => ( node.id !== id )
                                        )

                                        for (const node of list_)
                                        {
                                                // console.log(id, node.parentId)
                                                if( id === node.parentId ) rest = suppress_from_data(rest, node.id)
                                        }

                                        // console.log('resttttttttttttttttt', rest)
                                        return rest
                                }

                                const newState = suppress_from_data(state, `audit${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'add_fncs':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

                                const data = action.job.data

                                const [debut, fin] = [parseInt(data.debut), parseInt(data.fin)]

                                const audit = Global_State.getNodeDataById( Global_State.getNodeDataById( `nonC${data.nonC_id}` ).parentId )

                                for (let i = debut; i < fin + 1; i++)
                                {
                                        const new_fnc =
                                        Global_State.createNodeData
                                        (
                                        `fnc${id.current}`,
                                        "folder",
                                        getService(data.services),
                                        false,
                                        `FNC-${ audit.name }-${i}`,
                                        "fnc",
                                        false,
                                        `nonC${data.nonC_id}`,
                                        "",
                                        true,
                                        undefined,
                                        undefined,
                                        false,
                                        'pas encore créé',
                                        data.level,
                                        parseInt(audit.section_id),
                                        undefined,
                                        undefined
                                        )
                                        new_fnc['onEdit'] = true
                                        new_fnc['access_key'] = { job_id: action.job.id, num: i }

                                        state.push(new_fnc)

                                        id.current = id.current - 1
                                }

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_fnc':
                        {

                                const suppress_from = ( list_, id ) =>
                                {
                                        let rest = list_.filter(
                                        node => ( node.id !== id )
                                        )

                                        for (const node of list_)
                                        {
                                                // console.log(id, node.parentId)
                                                if( id === node.parentId ) rest = suppress_from(rest, node.id)
                                        }

                                        // console.log('resttttttttttttttttt', rest)
                                        return rest
                                }

                                const newState = suppress_from(state, `fnc${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'update_fnc':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

                                const data = action.job.data

                                // for (let node of state)
                                // {
                                //        if (node.id === `fnc${data.id}`)
                                //        {
                                //
                                //        }
                                // }

                                return JSON.parse(JSON.stringify(
                                        state.map(
                                                node =>
                                                {
                                                        if (node.id === `fnc${data.id}`)
                                                        {
                                                                node[data.update_object] = data.new_value
                                                                node['onEdit'] = true
                                                        }

                                                        return node
                                                }

                                        )
                                ))
                        }

                        default:
                                break;
                }
        }

        const [localDataState, setDatasState] = useReducer(data_reducer, initData.current ) //.map( node => ({...node, name: 'lol'}) )

        function jobs_reducer( state, action )
        {

                const getJob = key =>
                {
                        try
                        {
                                for (const job of state)
                                {
                                        console.log('searching joooooooooob key.job_id', job.id, key.job_id)
                                        if( job.id === key.job_id ) return job
                                }

                                return {}
                        }
                        catch (e)
                        {
                                for (const job of state)
                                {
                                        console.log('searching joooooooooob key', job.id, key)
                                        if( job.id === key ) return job
                                }

                                return {}
                        }
                }

                const getDependencies = (parent_id, parent_type) =>
                {
                        if(parseInt(parent_id) < 0)
                        {
                                if (parent_type === 'App\\Models\\NonConformite')
                                {
                                        const fnc = Global_State.getNodeDataById(`fnc${parent_id}`)

                                        return [fnc.access_key]
                                }
                                else
                                {
                                        for (const job of state)
                                        {
                                                if( job.node_id === parseInt(parent_id) ) return [job.id]
                                        }
                                }
                        }
                        return []
                }


                switch (action.type)
                {
                        case 'reset':
                        {
                                setDatasState({ type: 'reset' })
                                return state.length === 0 ? state : []
                        }
                        case 'add_folder':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const node = form_to_json(request)
                                const job =
                                        {
                                                id: job_id.current,
                                                operation: 'add',
                                                node_id: id.current,
                                                node_model: 'App\\Models\\DossierSimple',
                                                data: node,
                                                etat: 'waiting',
                                                dependencies: getDependencies(node.parent_id, node.parent_type)

                                        }

                                new_state.push(job)

                                job_id.current = job_id.current + 1

                                setDatasState({type: 'add_folder', job})

                                return new_state
                        }
                        case 'del_folder':
                        {

                                const id = action.id

                                const supress_from_jobs =
                                ( job_list, id ) =>
                                {
                                        let new_job_list = job_list.filter(
                                        job =>
                                        {
                                                // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                return job.node_id !== id;
                                        }
                                        )

                                        for (const job of new_job_list)
                                        {
                                                // console.log(job, job.dependencies[0], id)
                                                if (
                                                (Array.isArray(job.dependencies) && getJob(job.dependencies[0]).node_id === id)
                                                ||
                                                (job.data !== undefined && `${job.data.front_parent_type}${job.data.parent_id}` === `ds${id}`)
                                                )
                                                {
                                                        // console.log(job, job.dependencies[0], getJob(job.dependencies[0]), id)
                                                        new_job_list = supress_from_jobs(new_job_list, job.node_id)
                                                }
                                        }

                                        return new_job_list
                                }

                                let new_state = supress_from_jobs([...state], id)

                                if( ! (parseInt(id) < 0) )
                                {
                                        const job =
                                        {
                                                id: job_id.current,
                                                operation: 'del',
                                                node_id: id,
                                                node_model: 'App\\Models\\DossierSimple',
                                                etat: 'waiting',

                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1

                                }

                                setDatasState({type: 'del_folder', id})

                                return new_state

                        }
                        case 'add_files':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const node = form_to_json(request)
                                // console.log('nooooooooooooooooooooooooooooode file', {node})
                                const job =
                                {
                                        id: job_id.current,
                                        operation: 'add',
                                        node_id: id.current,
                                        node_model: 'App\\Models\\Fichier',
                                        data: node,
                                        etat: 'waiting',
                                        dependencies: getDependencies(node.parent_id, node.parent_type)

                                }


                                console.log('nooooooooooooooooooooooooooooode file', {node})

                                new_state.push(job)

                                job_id.current = job_id.current + 1

                                setDatasState({type: 'add_files', job})

                                return new_state
                        }
                        case 'del_file':
                        {
                                let new_state = [...state];

                                const id = action.id

                                new_state = new_state.filter(
                                        job =>
                                        {
                                                // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                return job.node_id !== id;
                                        }
                                )

                                if( ! (parseInt(id) < 0) )
                                {
                                        const job =
                                        {
                                                id: job_id.current,
                                                operation: 'del',
                                                node_id: id,
                                                node_model: 'App\\Models\\Fichier',
                                                etat: 'waiting',

                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1

                                }

                                setDatasState({type: 'del_file', id})

                                return new_state

                        }
                        case 'add_audit':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const node = form_to_json(request)

                                const job =
                                {
                                        id: job_id.current,
                                        operation: 'add',
                                        node_id: id.current,
                                        node_model: 'App\\Models\\Audit',
                                        data: node,
                                        etat: 'waiting',

                                }
                                job_id.current = job_id.current + 1
                                id.current = id.current - 1

                                const  checkList_job =
                                {
                                        id: job_id.current,
                                        node_id: id.current,
                                        node_model: 'App\\Models\\checkList',
                                        data:
                                        {
                                                name: 'checkList',
                                                audit_id: job.node_id,
                                                sub_type: 'checkList',
                                                services: job.data.services,
                                                section_id: job.data.section_id,
                                        },
                                        dependencies: [job.id],
                                        etat: 'waiting',
                                }
                                job_id.current = job_id.current + 1
                                id.current = id.current - 1

                                const  dp_job =
                                {
                                        id: job_id.current,
                                        node_id: id.current,
                                        node_model: 'App\\Models\\DossierPreuve',
                                        data:
                                        {
                                                name: 'Dossier Preuve',
                                                audit_id: job.node_id,
                                                sub_type: 'dp',
                                                services: job.data.services,
                                                section_id: job.data.section_id,
                                        },
                                        dependencies: [job.id],
                                        etat: 'waiting',
                                }
                                job_id.current = job_id.current + 1
                                id.current = id.current - 1

                                const  NC_job =
                                {
                                        id: job_id.current,
                                        node_id: id.current,
                                        node_model: 'App\\Models\\Nc',
                                        data:
                                        {
                                                name: 'NC',
                                                audit_id: job.node_id,
                                                sub_type: 'nonC',
                                                services: job.data.services,
                                                section_id: job.data.section_id,
                                        },
                                        dependencies: [job.id],
                                        etat: 'waiting',
                                }
                                job_id.current = job_id.current + 1
                                id.current = id.current - 1

                                new_state.push(job, checkList_job, dp_job, NC_job)


                                setDatasState({type: 'add_audit', jobs: [ job, checkList_job, dp_job, NC_job ] })

                                return new_state
                        }
                        case 'del_audit':
                        {

                                const id = action.id

                                const supress_from_jobs =
                                ( job_list, id ) =>
                                {
                                        let new_job_list = job_list.filter(
                                                job =>
                                                {
                                                        // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                        return job.node_id !== id;
                                                }
                                        )

                                        for (const job of new_job_list)
                                        {
                                                // console.log(job, job.dependencies[0], id)
                                                if (
                                                (Array.isArray(job.dependencies) && getJob(job.dependencies[0]).node_id === id)
                                                ||
                                                (job.data !== undefined && `${job.data.front_parent_type}${job.data.parent_id}` === `audit${id}`)
                                                )
                                                {
                                                        // console.log(job, job.dependencies[0], getJob(job.dependencies[0]), id)
                                                        new_job_list = supress_from_jobs(new_job_list, job.node_id)
                                                }
                                        }

                                        return new_job_list
                                }

                                let new_state = supress_from_jobs([...state], id)

                                if( ! (parseInt(id) < 0) )
                                {
                                        const job =
                                        {
                                                id: job_id.current,
                                                operation: 'del',
                                                node_id: id,
                                                node_model: 'App\\Models\\Audit',
                                                etat: 'waiting',

                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1

                                }

                                setDatasState({type: 'del_audit', id})

                                return new_state

                        }
                        case 'add_fncs':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const node = form_to_json(request)
                                const job =
                                {
                                        id: job_id.current,
                                        operation: 'add',
                                        // node_id: id.current,
                                        node_model: 'App\\Models\\NonConformite',
                                        data: node,
                                        etat: 'waiting',
                                        dependencies: getDependencies(node.nonC_id, 'App\\Models\\Nc'),
                                        exceptions: []

                                }

                                new_state.push(job)

                                job_id.current = job_id.current + 1

                                setDatasState({type: 'add_fncs', job})

                                return new_state
                        }
                        case 'del_fnc':
                        {

                                const id = action.id

                                const supress_from_jobs =
                                ( job_list, id ) =>
                                {
                                        let new_job_list = job_list.filter(
                                                job =>
                                                {
                                                        // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
                                                        return job.node_id !== id;
                                                }
                                        )

                                        for (const job of new_job_list)
                                        {
                                                // console.log(job, job.dependencies[0], id)
                                                if (
                                                        (Array.isArray(job.dependencies) && getJob(job.dependencies[0]).node_id === id)
                                                        ||
                                                        (job.data !== undefined && `${job.data.front_parent_type}${job.data.parent_id}` === `fnc${id}`)
                                                )
                                                {
                                                        // console.log(job, job.dependencies[0], getJob(job.dependencies[0]), id)
                                                        new_job_list = supress_from_jobs(new_job_list, job.node_id)
                                                }
                                        }

                                        return new_job_list
                                }

                                let new_state = supress_from_jobs([...state], id)

                                if( ! (parseInt(id) < 0) )
                                {
                                        const job =
                                        {
                                                id: job_id.current,
                                                operation: 'del',
                                                node_id: id,
                                                node_model: 'App\\Models\\NonConformite',
                                                etat: 'waiting',
                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1

                                }
                                else
                                {
                                        const fnc = Global_State.getNodeDataById(`fnc${id}`)

                                        new_state = new_state.map(
                                                job =>
                                                {
                                                        if(parseInt(job.id) === parseInt(fnc.access_key.job_id))
                                                        {
                                                                job.exceptions.push(fnc.access_key.num)
                                                        }
                                                        return job
                                                }
                                        ).filter(
                                                job =>
                                                {
                                                        return !((parseInt(job.id) === parseInt(fnc.access_key.job_id)) && (job.exceptions.length === (parseInt(job.data.fin) - parseInt(job.data.debut) + 1)));

                                                }
                                        )
                                }

                                setDatasState({type: 'del_fnc', id})

                                return new_state

                        }
                        case 'update_fnc':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const node = form_to_json(request)

                                for (const job of new_state)
                                {
                                        if( job.operation === 'update' && job.data.id === node.id && job.data.update_object === node.update_object )
                                        {
                                                job.data = node

                                                setDatasState({type: 'update_fnc', job})

                                                return new_state
                                        }
                                }

                                const job =
                                {
                                        id: job_id.current,
                                        operation: 'update',
                                        node_id: parseInt(node.id),
                                        node_model: 'App\\Models\\NonConformite',
                                        data: node,
                                        etat: 'waiting',
                                        dependencies: getDependencies(node.id, 'App\\Models\\NonConformite')

                                }

                                new_state.push(job)

                                job_id.current = job_id.current + 1

                                setDatasState({type: 'update_fnc', job})

                                return new_state
                        }

                        default:
                                break;
                }
        }

        const [jobs, dispatch_job] = useReducer(jobs_reducer, [])


        // useEffect(
        //   () =>
        //   {
        //     // Global_State.EventsManager.on('update_initData', data => { setDatasState({ type: 'update_initData', new_nodes: data }) } )

        //     console.log('update_initData')

        //     setDatasState({ type: 'update_initData' })

        //     return () =>
        //     {
        //       // Global_State.EventsManager.off('update_initData')
        //     }
        //   }, [ iniData.current ]
        // )

        const update_initData =
                new_data =>
                {
                        console.log('update_initData')

                        setDatasState({ type: 'update_initData', new_data })
                }

        const save = async request =>
        {
                await http.post('handle_edit', request, {
                                headers:{
                                        'Content-Type': 'multipart/form-data'
                                }
                        })
                        .then(
                                res =>
                                {
                                        console.log('editor handling ressssssssssssssssssssssssssssssssssss', res)
                                        // toast.dismiss('Saving')
                                }
                        )
                        .catch(
                                err =>
                                {
                                        console.log(err)
                                }
                        )


        }

        useEffect(
                () =>
                {
                        if (jobs.length > 0 )
                        {

                                toast((t) => (
                                                <div style={{ width: 'max-content' }} >
                                                        <Stack spacing={2} direction = {'row'}
                                                               sx = {
                                                                       {
                                                                               display: 'flex',
                                                                               justifyContent: 'center',
                                                                               position: 'relative',
                                                                               alignItems: 'center',
                                                                       }
                                                               }
                                                        >
                                                                <Button variant="light" onClick={() =>
                                                                {
                                                                        const queryData = new FormData

                                                                        jobs.map(
                                                                        job =>
                                                                        {
                                                                                queryData.append( "jobs[]", JSON.stringify(job) )
                                                                                if( job.node_model === 'App\\Models\\Fichier'  && job.operation === 'add' )
                                                                                {
                                                                                        job.data.files.map(
                                                                                        file =>
                                                                                        {
                                                                                                queryData.append( `job${job.id}_files[]`, file )
                                                                                        }
                                                                                        )
                                                                                }
                                                                        })

                                                                        // console.log('jooooooooobs', queryData.get('jobs[]'))

                                                                        Global_State.changeMode()

                                                                        toast.promise(
                                                                                save(queryData),
                                                                                {
                                                                                        loading: 'Saving...',
                                                                                        success: 'Processus achevé',
                                                                                        error: 'err'
                                                                                },
                                                                                {
                                                                                        id: 'Saving',
                                                                                        // duration: Infinity
                                                                                }
                                                                        )


                                                                }
                                                                }>
                                                                        SAVE
                                                                </Button>
                                                                <Button   variant="danger" onClick={() =>
                                                                {
                                                                }
                                                                }>
                                                                        DISCARD
                                                                </Button>
                                                        </Stack>
                                                </div>
                                        ),
                                        {
                                                id: 'save',
                                                position: "bottom-right",
                                                duration: Infinity,
                                                style: {
                                                        // width: '1700px',
                                                        border: '1px solid #0062ff',
                                                        padding: '16px',
                                                        color: '#0062ff',
                                                },
                                        }
                                );
                        }
                        else
                        {
                                toast.dismiss('save')
                        }
                        // else if ( !active )
                        // {
                        //     toast.dismiss('save')
                        //     dispatch_job({ type: 'reset' })
                        // }

                }, [jobs]
        )

        const close = () =>
        {
                setActive(false)
                toast.dismiss('save')
                dispatch_job({ type: 'reset' })
        }



        console.log('localDataState', localDataState, initData.current, jobs)

        return (
                {
                        data: localDataState,
                        update_initData,
                        open: () => { setActive(true) },
                        close,
                        folder:
                        {
                                add: (request) => { dispatch_job({ type: 'add_folder', request }) },
                                delete: (id) => { dispatch_job({ type: 'del_folder', id }) }
                        },
                        files:
                        {
                                add: (request) => { dispatch_job({ type: 'add_files', request }) },
                                delete: (id) => { dispatch_job({ type: 'del_file', id }) }
                        },
                        audit:
                        {
                                add: (request) => { dispatch_job({ type: 'add_audit', request }) },
                                delete: (id) => { dispatch_job({ type: 'del_audit', id }) }
                        },
                        fnc:
                        {
                                add: (request) => { dispatch_job({ type: 'add_fncs', request }) },
                                delete: (id) => { dispatch_job({ type: 'del_fnc', id }) },
                                update: (request) => { dispatch_job({ type: 'update_fnc', request }) },
                        }

                }
        )

}