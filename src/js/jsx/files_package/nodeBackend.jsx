/* eslint-disable import/first */

import {useCallback, useMemo, useState, useEffect, useRef} from 'react';
import TreeModel from "tree-model";

import { isUpdate, endUpdate } from './parse_to_json';
import useGetJsonData from "./parse_to_json";
import { Global_State } from "../main";


const findById = (node, id) => {
        return node.first((n) => n.model.id === id)
}

export default function useBack() {

        const jsonData = Global_State.jsonValue

        // const initData = jsonData.data

        // const [data, setData] = useState(initData)

        // useEffect(() => {
        //     if (isUpdate) {
        //         endUpdate()
        //         setData(jsonData.data)
        //     }
        // }, [jsonData])

        // console.log(jsonData)
        // console.log(data)

        let root = useMemo(() => new TreeModel().parse(jsonData.data), [jsonData.data])

        const find = useCallback((id) => findById(root, id), [root])

        const updateOpenState = (id, isOpen) => {
                // console.log(id, isOpen)
                const theMap = new Map()
                for(let [key, value] of Global_State.FetchedNodesData) theMap.set(key, JSON.parse(JSON.stringify(value)))
                for(let data of theMap.get(Global_State.selectedSectionId) )
                {
                        if(data.id === id) {
                                data.isOpen = isOpen
                                // console.log(data.isOpen)
                        }
                }
                // console.log(theMap)
                // console.log(jsonData)
                // console.log(Global_State.value)
                Global_State.setFnd(theMap)
                // Global_State.setSectionId(Global_State.selectedSectionId)

        };

        const [selectedNode, setCurrentSelectedFolder] = useState(root);
        const prev = useRef(null)

        useEffect(
        () =>
        {

                console.log('root', root)
                Global_State.clearSelected()
                setCurrentSelectedFolder(find(selectedNode.model.id))
                console.log('nodeBackend_selectedNode', selectedNode)
                console.log('2',isUpdate)
        },
        [root]
        )


        // console.log('nodeBackend', jsonData)
        // console.log('root', root)
        // console.log('selectedNode', selectedNode)

        return {
                data: jsonData.data,
                root,
                onToggle: updateOpenState,
                selectedNode,
                prev,
                setCurrentSelectedFolder: (id) => {
                        let node = find(id)
                        if (node.model.global_type === "folder")
                        {
                                if ( JSON.stringify(selectedNode.model) !== JSON.stringify(node.model) ) prev.current = selectedNode.model

                                Global_State.selectedNodeIdsInSections.current.set(Global_State.selectedSectionId, id)

                                // console.log(Global_State.selectedNodeIdsInSections)
                                setCurrentSelectedFolder(node)
                                // Global_State.clearSelected()
                        }
                }
        }
}
