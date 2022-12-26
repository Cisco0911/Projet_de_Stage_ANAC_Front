/* eslint-disable import/first */

import React, {useEffect, useReducer, useRef, useState} from 'react';

import isEqual from "lodash.isequal";

import {http} from "./data";
import {Global_State} from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import {Stack} from '@mui/material';


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

        const isExistingIn = (list_of_data, node_name, destination_id) =>
        {
                const children = Global_State.getChildrenById([...list_of_data], destination_id)

                for (const child of children) if (child.name === node_name) return {...child}

                return false
        }

        const getNewName = (list_of_data, original_name, destination_id) =>
        {
                let new_name = original_name
                let num = 1

                while ( isExistingIn([...list_of_data], new_name, destination_id) )
                {
                        let num_copy = num === 1 ? `Copie` : `Copie (${num})`
                        new_name = `${original_name} - ${num_copy}`
                        // console.log(new_name)

                        num++
                }

                return new_name
        }

        function data_reducer( state, action )
        {

                const suppress_from = ( list_, qualified_id ) =>
                {
                        let rest = list_.filter(
                                node => ( node.id !== qualified_id )
                        )

                        for (const node of list_)
                        {
                                if (node.copying_node_id === qualified_id)
                                {
                                        rest = suppress_from(rest, node.id)
                                }
                        }

                        const children = Global_State.getChildrenById([...state], qualified_id)

                        // console.log('childreeeeeeeeeeeeen', children)

                        for (const child of children)
                        {
                                // console.log(id, node.parentId)
                                rest = suppress_from(rest, child.id)
                        }

                        // console.log('resttttttttttttttttt', rest)
                        return rest
                }

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
                                                        `ds${action.job.node_id}`,
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
                                                        undefined,
                                                        'pas encore créé',
                                                        undefined,
                                                        parseInt(data.section_id),
                                                        undefined,
                                                        undefined,
                                                )
                                new_folder.path = Global_State.getNewPath({...new_folder}, [...state], true)
                                new_folder['onEdit'] = true

                                state.push(new_folder)

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_folder':
                        {

                                const newState = suppress_from(state, `ds${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'move_folder':
                        {
                                const now_state = [...state]

                                const data = action.job

                                const to_delete = []

                                const to_update = []

                                // console.log('============', now_state, `${ Global_State.parseModelToFrontType(data.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(data.destination_type)}${data.destination_id}` }`)
                                const destination = now_state.find(node => node.id === `${ Global_State.parseModelToFrontType(data.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(data.destination_type)}${data.destination_id}` }`)

                                let new_state = now_state.map(
                                        node =>
                                        {
                                                if (node.id === `ds${data.id}`)
                                                {
                                                        const parent_type = destination.type

                                                        const new_node = JSON.parse( JSON.stringify(node) )

                                                        if (parent_type === 'root')
                                                        {
                                                                const section = Global_State.getCurrentSection()

                                                                new_node.parentId = '0'
                                                                new_node.section_id = section.id
                                                                new_node.services = section.services
                                                        }
                                                        else
                                                        {
                                                                new_node.parentId = parent_type + data.destination_id
                                                                new_node.section_id = destination.section_id
                                                                new_node.services = destination.services
                                                        }

                                                        new_node.name = new_node.onCopy || new_node.name

                                                        if ( isExistingIn([...now_state], new_node.name, destination.id) )
                                                        {
                                                                console.log('on_________exist', data)

                                                                switch ( parseInt(data.on_exist) )
                                                                {
                                                                        case 1:
                                                                        {
                                                                                return node
                                                                        }
                                                                        case 2:
                                                                        {

                                                                                new_node.name = getNewName([...now_state], new_node.name, destination.id)

                                                                                break
                                                                        }
                                                                        case 3:
                                                                        {
                                                                                function attach_children(node_to_move, existant_node, all_nodes)
                                                                                {
                                                                                        const children_to_move = Global_State.getChildrenById([...all_nodes], node_to_move.id)
                                                                                        const existant_children = [...Global_State.getChildrenById([...all_nodes], existant_node.id)]

                                                                                        for (const child_to_move of children_to_move)
                                                                                        {
                                                                                                const existant_child = existant_children.find(
                                                                                                        node => node.name === child_to_move.name
                                                                                                )

                                                                                                if (existant_child)
                                                                                                {
                                                                                                        if (existant_child.type === 'ds')
                                                                                                        {
                                                                                                                attach_children(child_to_move, existant_child, all_nodes)
                                                                                                                to_delete.push(child_to_move.id)

                                                                                                                continue
                                                                                                        }
                                                                                                        else if (existant_child.type === 'f')
                                                                                                        {
                                                                                                                to_delete.push(existant_child.id)
                                                                                                        }
                                                                                                }

                                                                                                child_to_move.parentId = existant_node.id
                                                                                                child_to_move.section_id = existant_node.section_id
                                                                                                child_to_move.services = existant_node.services
                                                                                                child_to_move.path = Global_State.getNewPath({...child_to_move}, all_nodes, true)

                                                                                                to_update.push(child_to_move)
                                                                                        }
                                                                                }

                                                                                const children = Global_State.getChildrenById([...now_state], destination.id)

                                                                                const existant_node = children.find(child => child.name === node.name)

                                                                                attach_children(node, existant_node, [...now_state])

                                                                                to_delete.push(node.id)

                                                                                return node
                                                                        }
                                                                        default:
                                                                                return node
                                                                }

                                                        }

                                                        new_node.path = Global_State.getNewPath(new_node, now_state, true)

                                                        return new_node
                                                }
                                                return node
                                        }
                                )

                                to_delete.forEach(
                                        qualified_id =>
                                        {
                                                const current_state = JSON.parse(JSON.stringify(new_state))

                                                new_state = suppress_from(current_state, qualified_id)
                                        }
                                )

                                new_state = [...new_state].map(
                                        node => ( to_update.find(element => element.id === node.id) || node )
                                )

                                to_update.splice(0, to_update.length);
                                to_delete.splice(0, to_delete.length);

                                return new_state
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
                                                undefined,
                                                'pas encore créé',
                                                undefined,
                                                parseInt(data.section_id),
                                                file.size,
                                                undefined,
                                        )
                                        new_file.path = Global_State.getNewPath({...new_file}, [...state], true)
                                        new_file['onEdit'] = true

                                        state.push(new_file)

                                        id.current = id.current - 1
                                }

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_file':
                        {

                                const newState = suppress_from(state, `f${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'move_file':
                        {
                                const now_state = [...state]

                                const data = action.job

                                const to_delete = []

                                const destination = now_state.find(node => node.id === `${ Global_State.parseModelToFrontType(data.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(data.destination_type)}${data.destination_id}`}`)

                                let new_state = now_state.map(
                                node =>
                                {
                                        if (node.id === `f${data.id}`)
                                        {
                                                const parent_type = destination.type

                                                const new_node = JSON.parse( JSON.stringify(node) )

                                                if (parent_type === 'root')
                                                {
                                                        const section = Global_State.getCurrentSection()

                                                        new_node.parentId = '0'
                                                        new_node.section_id = section.id
                                                        new_node.services = section.services
                                                }
                                                else
                                                {
                                                        new_node.parentId = parent_type + data.destination_id
                                                        new_node.section_id = destination.section_id
                                                        new_node.services = destination.services
                                                }

                                                new_node.name = new_node.onCopy || new_node.name

                                                if ( isExistingIn([...now_state], node.name, destination.id) )
                                                {
                                                        console.log('on_________exist', data)

                                                        switch ( parseInt(data.on_exist) )
                                                        {
                                                                case 1:
                                                                {
                                                                        return node
                                                                }
                                                                case 2:
                                                                {

                                                                        new_node.name = getNewName([...now_state], new_node.name, destination.id)

                                                                        break
                                                                }
                                                                case 3:
                                                                {
                                                                        const children = Global_State.getChildrenById([...now_state], destination.id)

                                                                        for (const child of children) if (child.name === node.name) to_delete.push(child.id)

                                                                        break
                                                                }
                                                                default:
                                                                        return node
                                                        }

                                                }

                                                new_node.path = Global_State.getNewPath(new_node, now_state, true)

                                                return new_node
                                        }
                                        return node
                                }
                                )

                                to_delete.map(
                                qualified_id =>
                                {
                                        const current_state = JSON.parse(JSON.stringify(new_state))

                                        new_state = suppress_from(current_state, qualified_id)
                                }
                                )

                                return new_state
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
                                                undefined,
                                                'pas encore créé',
                                                undefined,
                                                parseInt(data.section_id),
                                                undefined,
                                                undefined
                                        )
                                        new_node.path = Global_State.getNewPath({...new_node}, [...state], true)
                                        new_node['onEdit'] = true

                                        state.push(new_node)
                                }


                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_audit':
                        {

                                const newState = suppress_from(state, `audit${action.id}`)

                                // console.log('new_staaaaaaaaaaaaate', newState)

                                return JSON.parse(JSON.stringify(newState))
                        }
                        case 'add_fncs':
                        {

                                console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

                                const data = action.job.data

                                const [debut, fin] = [parseInt(data.debut), parseInt(data.fin)]

                                const audit = state.find( node => node.id === state.find(node => node.id === `nonC${data.nonC_id}`).parentId )

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
                                                null,
                                                'pas encore créé',
                                                data.level,
                                                parseInt(audit.section_id),
                                                undefined,
                                                undefined
                                        )
                                        new_fnc.path = Global_State.getNewPath({...new_fnc}, [...state], true)
                                        new_fnc['onEdit'] = true
                                        new_fnc['access_key'] = { job_id: action.job.id, num: i }

                                        state.push(new_fnc)

                                        id.current = id.current - 1
                                }

                                return JSON.parse(JSON.stringify(state))
                        }
                        case 'del_fnc':
                        {

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
                        case 'copy':
                        {
                                // console.log('copy new_nodes', new_nodes)
                                //
                                // const new_state = [...state]
                                //
                                // new_state.push(...new_nodes)

                                return JSON.parse(JSON.stringify(action.job))
                        }

                        default:
                                break;
                }
        }

        const [localDataState, setDatasState] = useReducer(data_reducer, initData.current ) //.map( node => ({...node, name: 'lol'}) )

        function jobs_reducer( state, action )
        {

                const getJobByKey = key =>
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
                                        return [state.find(job => job.node_id === parseInt(parent_id)).id]
                                        // for (const job of state)
                                        // {
                                        //         if(  ) return [job.id]
                                        // }
                                }
                        }
                        return []
                }

                const getJobsByNodeId = (node_id, node_model) =>
                {
                        let jobs = new Map()

                        if (node_id && node_model)
                        {
                                for (const job of state)
                                {
                                        if ( (job.node_id === parseInt(node_id)) && (job.node_model === node_model) )
                                        {
                                                if (job.operation === 'copy')
                                                {
                                                        const copy_jobs = jobs.get(job.operation)
                                                        if (copy_jobs)
                                                        {
                                                                copy_jobs.push(job)

                                                                jobs.set(job.operation, copy_jobs)
                                                        }
                                                        else jobs.set(job.operation, [job])
                                                }
                                                else jobs.set(job.operation, job)
                                        }
                                }
                        }

                        return jobs
                }

                const supress_from_jobs = ( job_list, id, model ) =>
                {
                        const children = Global_State.getChildrenById([...localDataState], Global_State.parseModelToFrontType(model) + id )

                        let new_job_list = [...job_list]

                        const jobs_to_del = getJobsByNodeId(id, model)
                        console.log('jobs_to_del', jobs_to_del)
                        if (jobs_to_del.size)
                        {

                                jobs_to_del.forEach(
                                (job_to_del, key) =>
                                {

                                        new_job_list = [...new_job_list].filter(
                                                job =>
                                                {
                                                        // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)

                                                        return job.id !== job_to_del.id;
                                                }
                                        )

                                        if ((key === 'add_copy' || key === 'fuse_copy') && job_to_del.root_node)
                                        {
                                                new_job_list = [...new_job_list].filter(
                                                job => (job.id !== job_to_del.copy_job_id )
                                                )
                                        }

                                        if (key === 'copy')
                                        {
                                                for (const copy_job of job_to_del)
                                                {
                                                        for (const job of [...new_job_list])
                                                        {
                                                                if (job.copy_job_id === copy_job.id)
                                                                {
                                                                        new_job_list = supress_from_jobs([...new_job_list], job.node_id, job.node_model)
                                                                }
                                                        }
                                                }
                                        }

                                }
                                )
                        }

                        console.log('children'+id, children)
                        for (const child of children)
                        {
                                const identity = Global_State.identifyNode(child)

                                new_job_list = supress_from_jobs([...new_job_list], identity[0], identity[1])
                        }

                        return [...new_job_list]
                }

                function getRelativePath(path, basePath)
                {
                        // Récupération de l'index du début du sous-chemin dans le chemin complet
                        const startIndex = path.indexOf(basePath);
                        if (startIndex === -1) {
                                // Si le sous-chemin n'a pas été trouvé, retour de la chaîne vide
                                return '';
                        }

                        // Récupération de l'index de fin du sous-chemin
                        const endIndex = startIndex + basePath.length;

                        // Récupération du sous-chemin relatif en utilisant la méthode substring
                        return path.substring(endIndex);
                }

                const create_copy = (from_id, to_id, all_nodes, on_exist, copy_job_id, root_node = false) =>
                {
                        console.log('from_id, to_id, all_nodes, on_exist', from_id, to_id, on_exist)

                        let root_children = false

                        let new_all_nodes = [...all_nodes]
                        let new_add_jobs = []

                        const node_to_copy = new_all_nodes.find(node => node.id === from_id)
                        const node_model = node_to_copy.type === 'ds' ? 'App\\Models\\DossierSimple' : 'App\\Models\\Fichier'
                        const children_to_copy = Global_State.getChildrenById([...new_all_nodes], node_to_copy.id)
                        let destination = new_all_nodes.find(node => node.id === to_id)

                        let new_node = destination ? isExistingIn([...new_all_nodes], node_to_copy.name, destination.id) : false
                        // if (!destination)
                        // {
                        //         for(let node of new_all_nodes)
                        //         {
                        //                 // console.log(node.id)
                        //                 if (node.id === to_id) {
                        //                         destination = node
                        //                         break
                        //                 }
                        //         }
                        // }

                        // console.log('create_copy1')

                        if ( new_node )
                        {
                                switch (parseInt(on_exist))
                                {
                                        case 1:
                                        {
                                                return [new_all_nodes, new_add_jobs]
                                        }
                                        case 2:
                                        {
                                                //create add in copy job

                                                const parent_id = Global_State.identifyNode(destination)[0]

                                                const data =
                                                {
                                                        relative_path: '',
                                                        front_parent_type: destination.type,
                                                        parent_id
                                                }

                                                const add_copy_job =
                                                {
                                                        id: job_id.current,
                                                        operation: 'add_copy',
                                                        node_id: id.current,
                                                        node_model,
                                                        copy_job_id,
                                                        root_node,
                                                        data,
                                                        etat: 'waiting',
                                                }

                                                //create node

                                                // console.log('create_copy4')
                                                new_node.name = getNewName([...localDataState], new_node.name, destination.id)

                                                // console.log('create_copy5')

                                                new_node.id = `${new_node.type}${id.current}`

                                                id.current = id.current - 1

                                                new_node.created_at = 'pas encore cree'

                                                if (node_to_copy.type === 'f')
                                                {
                                                        new_node.taille = node_to_copy.taille
                                                        new_node.url = node_to_copy.url
                                                }

                                                new_node.path = Global_State.getNewPath(new_node, new_all_nodes)
                                                new_node['onEdit'] = true
                                                new_node['onCopy'] = new_node.name
                                                if (root_node && (from_id.split('-').length > 1)) new_node.copying_node_id = from_id

                                                // console.log('create_copy6')

                                                // console.log('relative path', destination.path, new_node.path)
                                                add_copy_job.data.relative_path = new_node.path.replace(/:/g, '');

                                                job_id.current++

                                                new_add_jobs.push(add_copy_job)

                                                new_all_nodes.push(new_node)

                                                break
                                        }
                                        case 3:
                                        {
                                                // create add in copy job

                                                const data =
                                                {
                                                        relative_path: ''
                                                }

                                                const fuse_to_existant_job =
                                                {
                                                        id: job_id.current,
                                                        operation: 'fuse_copy',
                                                        node_id: new_node.id,
                                                        node_model,
                                                        copy_job_id,
                                                        root_node,
                                                        data,
                                                        etat: 'waiting',
                                                }

                                                job_id.current++

                                                new_add_jobs.push(fuse_to_existant_job)

                                                // create node
                                                new_all_nodes = new_all_nodes.map(
                                                node =>
                                                {
                                                        if (node.id === new_node.id)
                                                        {
                                                                if (node_to_copy.type === 'f')
                                                                {
                                                                        node.taille = node_to_copy.taille
                                                                        node.url = node_to_copy.url
                                                                }

                                                                // if (root_node && (from_id.split('-').length > 1)) root_children = true
                                                        }
                                                        return node
                                                }
                                                )

                                                break
                                        }
                                }
                        }
                        else
                        {
                                //create add in copy job

                                console.log('destination', destination)

                                const parent_id = Global_State.identifyNode(destination)[0]

                                const data =
                                {
                                        relative_path: '',
                                        front_parent_type: destination.type,
                                        parent_id
                                }

                                const add_copy_job =
                                {
                                        id: job_id.current,
                                        operation: 'add_copy',
                                        node_id: id.current,
                                        node_model,
                                        copy_job_id,
                                        root_node,
                                        data,
                                        etat: 'waiting',
                                }

                                //create node

                                new_node = JSON.parse( JSON.stringify(node_to_copy) )

                                new_node.id = `${new_node.type}${id.current}`

                                id.current = id.current - 1

                                new_node.parentId = destination.id
                                new_node.section_id = destination.section_id
                                new_node.services = destination.services

                                if (node_to_copy.type === 'f')
                                {
                                        new_node.taille = node_to_copy.taille
                                        new_node.url = node_to_copy.url
                                }

                                new_node.created_at = 'pas encore cree'
                                new_node.path = Global_State.getNewPath(new_node, new_all_nodes)
                                new_node['onEdit'] = true
                                new_node['onCopy'] = new_node.name
                                if (root_node && (from_id.split('-').length > 1)) new_node.copying_node_id = from_id

                                add_copy_job.data.relative_path = new_node.path.replace(/:/g, '');

                                job_id.current++

                                new_add_jobs.push(add_copy_job)

                                new_all_nodes.push(new_node)
                        }

                        // console.log('create_copy2')

                        for (const child of children_to_copy)
                        {
                                const res = root_children ? create_copy(child.id, new_node.id, new_all_nodes, on_exist, copy_job_id, true) : create_copy(child.id, new_node.id, new_all_nodes, on_exist, copy_job_id)

                                new_all_nodes = [...res[0]]

                                new_add_jobs.push(...res[1])
                        }

                        // console.log('create_copy3')

                        return [new_all_nodes, new_add_jobs]
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

                                id.current = id.current - 1

                                setDatasState({type: 'add_folder', job})

                                return new_state
                        }
                        case 'del_folder':
                        {

                                const id = action.id

                                let new_state = supress_from_jobs([...state], id, 'App\\Models\\DossierSimple')

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
                        case 'move_folder':
                        {
                                let new_state = Global_State.copyObject(state);

                                const request = action.request

                                const json_request = form_to_json(request)

                                const to_move = localDataState.find(node => node.id === `ds${json_request.id}`)

                                console.log('mooooooove', json_request)

                                if ( (parseInt(json_request.id) > 0) || to_move.onCopy )
                                {
                                        const existant_job = getJobsByNodeId(json_request.id, 'App\\Models\\DossierSimple').get('move')
                                        if (existant_job)
                                        {
                                                new_state = new_state.map(
                                                job =>
                                                {
                                                        if (job.operation === 'move')
                                                        {
                                                                if ( ( job.node_model === 'App\\Models\\DossierSimple' ) && ( job.node_id === parseInt(json_request.id) ) )
                                                                {
                                                                        return (
                                                                                {
                                                                                        ...job,
                                                                                        data: json_request,
                                                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                                                }
                                                                        )
                                                                }
                                                                return job
                                                        }
                                                        else return job
                                                }
                                                )
                                        }
                                        else
                                        {
                                                const job =
                                                {
                                                        id: job_id.current,
                                                        operation: 'move',
                                                        node_id: parseInt(json_request.id),
                                                        node_model: 'App\\Models\\DossierSimple',
                                                        data: json_request,
                                                        etat: 'waiting',
                                                        from_dependency: getDependencies(json_request.id, 'App\\Models\\DossierSimple'),
                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                }

                                                new_state.push(job)

                                                job_id.current = job_id.current + 1
                                        }
                                }
                                else
                                {
                                        const folder = to_move
                                        const destination = localDataState.find(node => node.id === `${ Global_State.parseModelToFrontType(json_request.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(json_request.destination_type)}${json_request.destination_id}`}`)

                                        if (isExistingIn([...localDataState], folder.name, destination.id))
                                        {
                                                // toast.error(`Selon les données locales, il existe deja un dossier de ce nom a la destination:\n${folder.name}`)

                                                return state
                                        }
                                        new_state = new_state.map(
                                        job =>
                                        {
                                                if (job.operation === 'add')
                                                {
                                                        if ( ( job.node_model === 'App\\Models\\DossierSimple' ) && ( job.node_id === parseInt(json_request.id) ) )
                                                        {
                                                                console.log('destination', destination)

                                                                const parent_services = destination.type === 'root' ? Global_State.getCurrentSection().services : destination.services
                                                                const parent_section_id = destination.type === 'root' ? Global_State.getCurrentSection().id : destination.section_id

                                                                const services = parent_services.map(
                                                                service => ({value: service.id, label: service.name})
                                                                )
                                                                const new_data =
                                                                {
                                                                        ...job.data,
                                                                        front_parent_type: destination.type,
                                                                        parent_id: json_request.destination_id,
                                                                        parent_type: json_request.destination_type,
                                                                        section_id: parent_section_id,
                                                                        services

                                                                }

                                                                return {
                                                                        ...job,
                                                                        data: new_data,
                                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                                }
                                                        }
                                                        return job
                                                }
                                                else return job
                                        }
                                        )
                                }

                                setDatasState({type: 'move_folder', job: json_request})

                                return new_state
                        }
                        case 'copy_folder':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const json_request = form_to_json(request)

                                console.log('new_state_copy', new_state, state)

                                const destination = localDataState.find(node => node.id === `${ Global_State.parseModelToFrontType(json_request.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(json_request.destination_type)}${json_request.destination_id}`}`)
                                if (destination.type === 'root') destination.section_id = Global_State.getCurrentSection().id
                                console.log('destination', destination, Global_State.parseModelToFrontType(json_request.destination_type))

                                const old_folder = localDataState.find(node => node.id === `ds${json_request.id}`)

                                console.log('cooooooopy', json_request)

                                // id.current = id.current - 1
                                let job

                                if (parseInt(json_request.id) > 0)
                                {
                                         job =
                                        {
                                                id: job_id.current,
                                                operation: 'copy',
                                                // node_id: parseInt(json_request.id),
                                                node_model: 'App\\Models\\DossierSimple',
                                                data: json_request,
                                                etat: 'waiting',
                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1
                                }
                                else
                                {

                                        job =
                                        {
                                                id: job_id.current,
                                                operation: 'copy',
                                                node_id: parseInt(json_request.id),
                                                node_model: 'App\\Models\\DossierSimple',
                                                data: json_request,
                                                etat: 'waiting',
                                                from_dependency: getDependencies(json_request.id, 'App\\Models\\DossierSimple'),
                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1
                                }

                                const copy_object = create_copy(old_folder.id, destination.id, localDataState, json_request.on_exist, job.id, true)

                                new_state.push(...copy_object[1])

                                setDatasState({type: 'copy', job: copy_object[0] })
                                // setDatasState({type: 'add_folder', job})

                                // setDatasState({type: 'move_folder', job: json_request})

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

                                const id = action.id

                                let new_state = supress_from_jobs([...state], id, 'App\\Models\\Fichier');

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
                        case 'move_file':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const json_request = form_to_json(request)

                                const file_to_move = localDataState.find(node => node.id === `f${json_request.id}`)

                                console.log('mooooooove', json_request)

                                if ( (parseInt(json_request.id) > 0)  || file_to_move.onCopy )
                                {
                                        const existant_job = getJobsByNodeId(json_request.id, 'App\\Models\\Fichier').get('move')
                                        if (existant_job)
                                        {
                                                new_state = [...new_state].map(
                                                job =>
                                                {
                                                        if ( job.id === existant_job.id )
                                                        {
                                                                return {...job, data: json_request, dependencies: getDependencies(json_request.destination_id, json_request.destination_type)}
                                                        }
                                                        else return job
                                                }
                                                )
                                        }
                                        else
                                        {
                                                const job =
                                                {
                                                        id: job_id.current,
                                                        operation: 'move',
                                                        node_id: parseInt(json_request.id),
                                                        node_model: 'App\\Models\\Fichier',
                                                        data: json_request,
                                                        etat: 'waiting',
                                                        from_dependency: getDependencies(json_request.id, 'App\\Models\\Fichier'),
                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                }

                                                new_state.push(job)

                                                job_id.current = job_id.current + 1
                                        }
                                }
                                else
                                {
                                        const destination = localDataState.find(node => node.id === `${ Global_State.parseModelToFrontType(json_request.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(json_request.destination_type)}${json_request.destination_id}`}`)

                                        if (isExistingIn([...localDataState], file_to_move.name, destination.id))
                                        {
                                                // toast.error(`Selon les données locales, il existe deja un dossier de ce nom a la destination:\n${folder.name}`)

                                                return state
                                        }

                                        new_state = new_state.map(
                                        job =>
                                        {
                                                if (job.operation === 'add')
                                                {
                                                        if ( ( job.node_model === 'App\\Models\\Fichier' ) && ( job.node_id === parseInt(json_request.id) ) )
                                                        {
                                                                console.log('destination', destination)

                                                                const parent_services = destination.type === 'root' ? Global_State.getCurrentSection().services : destination.services
                                                                const parent_section_id = destination.type === 'root' ? Global_State.getCurrentSection().id : destination.section_id

                                                                const services = parent_services.map(
                                                                service => ({value: service.id, label: service.name})
                                                                )
                                                                const new_data =
                                                                {
                                                                        ...job.data,
                                                                        front_parent_type: destination.type,
                                                                        parent_id: json_request.destination_id,
                                                                        parent_type: json_request.destination_type,
                                                                        section_id: parent_section_id,
                                                                        services

                                                                }

                                                                return {
                                                                        ...job,
                                                                        data: new_data,
                                                                        dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                                                }
                                                        }
                                                        return job
                                                }
                                                else return job
                                        }
                                        )
                                }

                                setDatasState({type: 'move_file', job: json_request})

                                return new_state
                        }
                        case 'copy_file':
                        {
                                let new_state = [...state];

                                const request = action.request

                                const json_request = form_to_json(request)

                                const destination = localDataState.find(node => node.id === `${ Global_State.parseModelToFrontType(json_request.destination_type) === 'root' ?  '0' : `${Global_State.parseModelToFrontType(json_request.destination_type)}${json_request.destination_id}`}`)
                                if (destination.type === 'root') destination.section_id = Global_State.getCurrentSection().id
                                console.log('destination', destination, Global_State.parseModelToFrontType(json_request.destination_type))

                                const old_file = localDataState.find(node => node.id === `f${json_request.id}`)

                                console.log('cooooooopy', json_request)

                                // id.current = id.current - 1
                                let job

                                if (parseInt(json_request.id) > 0)
                                {
                                        job =
                                        {
                                                id: job_id.current,
                                                operation: 'copy',
                                                // node_id: parseInt(json_request.id),
                                                node_model: 'App\\Models\\Fichier',
                                                data: json_request,
                                                etat: 'waiting',
                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1
                                }
                                else
                                {

                                        job =
                                        {
                                                id: job_id.current,
                                                operation: 'copy',
                                                node_id: parseInt(json_request.id),
                                                node_model: 'App\\Models\\Fichier',
                                                data: json_request,
                                                etat: 'waiting',
                                                from_dependency: getDependencies(json_request.id, 'App\\Models\\Fichier'),
                                                dependencies: getDependencies(json_request.destination_id, json_request.destination_type)
                                        }

                                        new_state.push(job)

                                        job_id.current = job_id.current + 1
                                }

                                const copy_object = create_copy(old_file.id, destination.id, localDataState, json_request.on_exist, job.id, true)

                                new_state.push(...copy_object[1])

                                setDatasState({type: 'copy', job: copy_object[0] })
                                // setDatasState({type: 'add_folder', job})

                                // setDatasState({type: 'move_folder', job: json_request})

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

                                let new_state = supress_from_jobs([...state], id, 'App\\Models\\Audit')

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

                                let new_state = supress_from_jobs([...state], id, 'App\\Models\\NonConformite')

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
                                        const fnc = new_state.find(node => node.id === `fnc${id}`)

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

                                                                        const sortedJobs = [];
                                                                        const visitedJobs = new Set();

                                                                        function topologicalSort(jobs, jobId) {

                                                                                visitedJobs.add(jobId);

                                                                                const job = jobs.find((j) => j.id === jobId);
                                                                                if (!job) return;

                                                                                if  ( ( !job.dependencies || (job.dependencies.length === 0) ) && !job.copy_job_id ) {
                                                                                        sortedJobs.push(job);
                                                                                        return;
                                                                                }

                                                                                for ( const dependency of (job.dependencies || (job.copy_job_id ? [job.copy_job_id] : []) ) ) {
                                                                                        const dependencyId = typeof dependency === 'number' ? dependency : dependency.job_id;
                                                                                        if (!visitedJobs.has(dependencyId)) {
                                                                                                topologicalSort(jobs, dependencyId);
                                                                                        }
                                                                                }

                                                                                sortedJobs.push(job);
                                                                        }

                                                                        for (const job of jobs) {
                                                                                if (!visitedJobs.has(job.id)) {
                                                                                        topologicalSort(jobs, job.id);
                                                                                }
                                                                        }

                                                                        sortedJobs.map(
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
                                                                                        duration: Infinity
                                                                                }
                                                                        ).then( res => { setTimeout( () => { toast.dismiss('Saving') }, 800 ) } )


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
                                delete: (id) => { dispatch_job({ type: 'del_folder', id }) },
                                move: (request) => { dispatch_job({ type: 'move_folder', request }) },
                                copy: (request) => { dispatch_job({ type: 'copy_folder', request }) }
                        },
                        files:
                        {
                                add: (request) => { dispatch_job({ type: 'add_files', request }) },
                                delete: (id) => { dispatch_job({ type: 'del_file', id }) },
                                move: (request) => { dispatch_job({ type: 'move_file', request }) },
                                copy: (request) => { dispatch_job({ type: 'copy_file', request }) }
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