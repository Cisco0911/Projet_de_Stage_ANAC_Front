/* eslint-disable import/first */

import {useCallback, useMemo, useState, useEffect, useRef} from 'react';
import TreeModel from "tree-model";

import { isUpdate, endUpdate } from './parse_to_json';


const findById = (node, id) => {
        return node.first((n) => n.model.id === id)
}



let i = 888

export default function useBack() {

        const jsonData = window.Global_State.jsonValue

        const [current_location, update_location] = useState('')

        window.current_location = current_location
        const current_section = useRef()

        const [ [prev, setPrev], [next, setNext] ] = [ useState([]), useState([]) ]
        const navigation_history = useRef(
                {
                        prev: [],
                        next: []
                }
        )

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

        const updateOpenState = (id, isOpen) =>
        {
                // console.log(id, isOpen)
                const theMap = new Map()
                for(let [key, value] of window.Global_State.structuredData) theMap.set(key, JSON.parse(JSON.stringify(value)))
                for(let data of theMap.get(window.Global_State.selectedSectionId) )
                {
                        if(data.id === id) {
                                data.isOpen = isOpen
                                // console.log(data.isOpen)
                        }
                }
                // console.log(theMap)
                // console.log(jsonData)
                // console.log(window.Global_State.value)
                window.Global_State.setFnd(theMap)
                // window.Global_State.setSectionId(window.Global_State.selectedSectionId)

        };

        const [selectedNode, setSelectedFolder] = useState(root);


        const setCurrentSelectedFolder = (id, update_history = true) =>
        {

                // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid", id)

                let node = find(id)
                console.log("nooooooooooooooooode_modeeeeeeeel", node, root)

                let new_node_section_id

                if (node.model.isRoot)
                {
                        new_node_section_id = window.Global_State.selectedSectionId
                }
                else new_node_section_id = node.model.section_id

                if (node.model.global_type === "folder")
                {

                        if ( ( selectedNode.model.id !== node.model.id ) && update_history && (current_section.current === new_node_section_id) )
                        {
                                navigation_history.current.prev.push(selectedNode.model.id)
                                navigation_history.current.next = []
                        }

                        window.Global_State.selectedNodeIdsInSections.current.set(window.Global_State.selectedSectionId, id)

                        // console.log(window.Global_State.selectedNodeIdsInSections)
                        setSelectedFolder(node)
                        // window.Global_State.clearSelected()
                }
        }

        const handlePrev = async () =>
        {
                const new_prev = [...navigation_history.current.prev]

                const new_next = [...navigation_history.current.next]

                const prev_id = new_prev.pop()
                new_next.push(selectedNode.model.id)

                navigation_history.current.prev = new_prev

                navigation_history.current.next = new_next

                setCurrentSelectedFolder(prev_id, false)
        }

        const handleNext = async () =>
        {
                // console.log("neeeeeeeeeeeeeeeeeeeeeeext", next)
                const new_prev = [...navigation_history.current.prev]

                const new_next = [...navigation_history.current.next]

                // console.log("new_neeeeeeeeeeeeeeeeeeeeeeext", new_next)
                const next_id = new_next.pop()
                new_prev.push(selectedNode.model.id)

                navigation_history.current.prev = new_prev

                navigation_history.current.next = new_next

                setCurrentSelectedFolder(next_id, false)
        }

        useEffect(
        () =>
        {
                navigation_history.current.prev = []
                navigation_history.current.next = []
        }, [window.Global_State.selectedSectionId]
        )

        useEffect(
        () =>
        {
                window.Global_State.EventsManager.on("prev", handlePrev)
                window.Global_State.EventsManager.on("next", handleNext)

                return(
                () =>
                {
                        window.Global_State.EventsManager.off("prev")
                        window.Global_State.EventsManager.off("next")
                }
                )
        },
        )

        useEffect(
        () =>
        {

                console.log('root', root)
                window.Global_State.clearSelected()
                // setSelectedFolder(find(selectedNode.model.id))
                const section_id = window.Global_State.selectedSectionId
                if (section_id) setCurrentSelectedFolder(window.Global_State.selectedNodeIdsInSections.current.get(section_id))
                console.log('nodeBackend_selectedNode', selectedNode)
                console.log('2',isUpdate)
        },
        [root]
        )

        useEffect(
        () =>
        {
                if (selectedNode.model.isRoot)
                {
                        let location
                        try {
                                location = `${window.Global_State.getCurrentSection().name}:`
                        }
                        catch (e)
                        {
                                location = ''
                        }

                        update_location(location)

                        current_section.current = window.Global_State.selectedSectionId
                }
                else
                {
                        update_location(selectedNode.model.path)
                        current_section.current = selectedNode.model.section_id
                }

                setPrev(navigation_history.current.prev)
                setNext(navigation_history.current.next)
        },
        [selectedNode]
        )


        // console.log('nodeBackend', jsonData)
        // console.log('root', root)
        console.log('selectedNode', selectedNode.model)

        return {
                data: jsonData.data,
                root,
                onToggle: updateOpenState,
                selectedNode,
                prev, next,
                setCurrentSelectedFolder
        }
}
