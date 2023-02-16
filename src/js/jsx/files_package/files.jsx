/* eslint-disable import/first */

import React, {useRef, useState, useCallback, useEffect, useMemo} from 'react';
import { Tree } from "react-arborist";
import useBack from "./nodeBackend";
import FileTable from "./content";
import FileDetails from "./files_details";
import "./file_style.css";

import { useSpring, animated } from 'react-spring';


import { FcOpenedFolder, FcFolder, FcTodoList, FcMultipleCameras} from "react-icons/fc";
import { GiArchiveResearch, GiTreeRoots } from "react-icons/gi";

import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import PolicyTwoToneIcon from '@mui/icons-material/PolicyTwoTone';
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone';
import RuleFolderTwoToneIcon from '@mui/icons-material/RuleFolderTwoTone';

export default function useGetFiles(Global_research) {

        useEffect(
                () =>
                {
                        const handleKeyDown = (e) =>
                        {
                                if(e.ctrlKey && e.key === 'f')
                                {
                                        console.log('find node')
                                        window.Global_State.setOverlay_props( t => (
                                                {
                                                        ...t,
                                                        style:
                                                        {
                                                                ...t.style,
                                                                display: 'flex',
                                                                alignItems: 'start',
                                                                justifyContent: 'center'
                                                        },
                                                        children: (
                                                        <div style={{ width: "max-content", marginTop: 15 }} onClick={ e => { e.stopPropagation() } } >
                                                                {Global_research}
                                                        </div>
                                                        ),

                                                }
                                        ) )


                                        setImmediate(
                                                () =>
                                                {
                                                        const gr_input = document.getElementById('global_research_input')
                                                        gr_input.focus()
                                                        gr_input.select()
                                                }
                                        )
                                }
                                else if (e.ctrlKey && e.key.length === 1)
                                {
                                        console.log(e)

                                        window.Global_State.EventsManager.emit("shortcut", `ctrl_${e.key}`)

                                        // const component = document.getElementById(`ctrl_${e.key}`)
                                        // if (component)
                                        // {
                                        //         console.log(component)
                                        //         component.click()
                                        // }
                                }
                        }

                        // console.log('Global_research', Global_research)

                        document.addEventListener('keydown', handleKeyDown);
                        window.Global_State.EventsManager.on('show_on_screen',
                        async (data) =>
                        {
                                console.log(data);
                                await window.Global_State.setSectionId(data.section_id);
                                const parent_id = window.Global_State.getNodeDataById(data.id).parentId
                                await window.Global_State.backend.setCurrentSelectedFolder(parent_id)

                                setTimeout(
                                () =>
                                {
                                        console.log("scroooooooooooooooooooooooooooool")
                                        // const row = document.getElementById(`row-${data.id}`)
                                        // row.click()
                                        // const parent = document.querySelector(".content_xl_size_content")
                                        //
                                        // parent.scrollTop = row.offsetTop

                                        window.Global_State.EventsManager.emit("select_row", data.id)

                                }, 500)
                        })

                        return(
                                () =>
                                {
                                        document.removeEventListener('keydown', handleKeyDown)
                                        window.Global_State.EventsManager.off('show_on_screen');
                                }
                        )

                }, []
        )

        window.Global_State['backend'] = useBack()

        window.Global_State.get_auditFamily_icon = (type) =>
        {
                switch (type)
                {
                        case "root":
                                return <GiTreeRoots size={30} color={"brown"} />
                        case "audit":
                                return <PolicyTwoToneIcon color={"secondary"} style={{ fontSize: 30, pointerEvents: "none" }} />
                        case "checkList":
                                return <FcTodoList size={30} style={ { pointerEvents: "none" } } />
                        case "dp":
                                return <GiArchiveResearch size={30} color={"#35c1f1"} style={ { pointerEvents: "none" } } />
                        case "nonC":
                                return <RuleFolderTwoToneIcon color={"error"} style={{ fontSize: 30, pointerEvents: "none" }} />
                        case "fnc":
                                return <GppBadTwoToneIcon color={"error"} style={{ fontSize: 30, pointerEvents: "none" }} />
                        default:
                                return null
                }
        }

        const dataTable = useMemo(() => (<FileTable  />), [window.Global_State.backend.selectedNode.model])

        return (
        {
                fileTree: window.Global_State.hasSection ? <FileTree data = {window.Global_State.backend.data} /> : <div/>,
                fileTable: window.Global_State.hasSection ? dataTable : <div/> ,
                fileDetails: window.Global_State.hasSection ? <FileDetails/> : <div/>,
        }
        )

}


function FileTree({data}) {

        const tree = useRef()

        const expanded = window.Global_State.expanded

        function TransitionComponent(props) {
                const style = useSpring({
                        from: {
                                opacity: 0,
                                transform: 'translate3d(20px,0,0)',
                        },
                        to: {
                                opacity: props.in ? 1 : 0,
                                transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
                        },
                });

                return (
                <animated.div style={style}>
                        <Collapse {...props} />
                </animated.div>
                );
        }

        const StyledTreeItem = styled((props) => (
        <TreeItem  {...props} TransitionComponent={TransitionComponent}  />
        ))(({ theme }) => ({
                [`& .${treeItemClasses.iconContainer}`]: {
                        '& .close': {
                                opacity: 0.3,
                        },
                },
                [`& .${treeItemClasses.group}`]: {
                        marginLeft: 15,
                        paddingLeft: 5,
                        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
                },
        }));



        const Label = ({node}) =>
        {
                const [isOpen, setIsOpen] = useState((expanded.indexOf(node.id) !== -1))

                const handleDbClick = e =>
                {
                        // console.log('db_eeeeeeeeeeeeeevent', e, e.nativeEvent.is_opening)

                        if(e) e.stopPropagation();

                        const force_open = e ? e.nativeEvent.is_opening : undefined
                        // console.log('db_eeeeeeeeeeeeeevent force_state', force_state)
                        // if (force_open !== false) tree_row.click();

                        const [ open, close ] =
                        [
                                () =>
                                {
                                        expanded.push(node.id)
                                        setIsOpen(true)
                                },
                                () =>
                                {
                                        expanded.splice(expanded.indexOf(node.id.toString()), 1)
                                        setIsOpen(false)
                                },
                        ]

                        if (force_open === undefined)
                        {
                                if(expanded.find( id => id === node.id.toString() )) close()
                                else open()
                        }
                        else if (force_open && !isOpen) open()
                        else if (!force_open && isOpen) close()



                        console.log(expanded);

                        window.Global_State.EventsManager.emit("setExpanded", expanded)
                }

                const handleClick = e =>
                {
                        if(e) e.stopPropagation();
                        window.Global_State.backend.setCurrentSelectedFolder(node.id)
                }


                useEffect(
                () =>
                {
                        window.Global_State.EventsManager.on(`toggle${node.id}`, e => { console.log(`toggle${node.id}`); handleDbClick(e) })
                        return () =>
                        {
                                window.Global_State.EventsManager.off(`toggle${node.id}`);
                        }
                },
                []
                )

                return (
                <div id={`treeRow-${node.id}`} onClick={ handleClick } onDoubleClick = { handleDbClick } >
                        <span className = 'mr-1'  >
                                { window.Global_State.get_auditFamily_icon(node.type) || (isOpen ? <FcOpenedFolder size={30} />:<FcFolder size={30} />) }
                        </span>
                        {node.name}
                </div>
                )
        }


        const RenderTree = useCallback(
                function RenderTree({node})
                {
                        // console.log(tree.current.expanded)

                        return (
                        <StyledTreeItem key={node.id} nodeId={node.id.toString()} label={<Label node = {node} />}
                                        expandIcon = {<ChevronRightIcon onClick = { e => { window.Global_State.EventsManager.emit(`toggle${node.id}`, e) } } />}
                                        collapseIcon = {<ExpandMoreIcon onClick = { e => { window.Global_State.EventsManager.emit(`toggle${node.id}`, e) } } />}
                        >
                                {
                                        Array.isArray(node.children) ?
                                        node.children.filter( node => ( node.global_type === 'folder' ) ).map((node) => <RenderTree key={node.id} node = {node} /> )
                                        : null
                                }
                        </StyledTreeItem>
                        );
                },[data]
        )


        // const handleFocus = (event) =>
        // {
        //         event.preventDefault()
        //         event.stopPropagation()
        //         console.log( 'foooooooooooooooooooooooooooooooocuuuuuuuuuuuuuuuuuuuuuus', event )
        //         // window.Global_State.backend.setCurrentSelectedFolder(nodeId)
        //
        //         // setExpanded( [nodeId] )
        // }

        console.log('data22222', data)

        useEffect(
        () =>
        {
                console.log('expand_change', expanded)
        }, [expanded]
        )

        return (
                <div className="file_tree_container" >
                        <TreeView
                        id = 'muiTree'
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={['0']}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ height: 'max-content', flexGrow: 1, width: 'max-content', overflowY: 'auto' }}
                        expanded={expanded}
                        multiSelect
                        ref={tree}
                        >
                                <RenderTree node = {data} />
                        </TreeView>
                </div>
        );
}

