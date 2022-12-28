/* eslint-disable import/first */

import React, {useRef, useState, useCallback, useEffect, useMemo} from 'react';
import { Tree } from "react-arborist";
import useBack from "./nodeBackend";
import FileTable from "./content";
import FileDetails from "./files_details";
import "./file_style.css";
import { Global_State } from "../main";

import { useSpring, animated } from 'react-spring';


import { FcOpenedFolder, FcFolder } from "react-icons/fc";

import TreeView from '@mui/lab/TreeView';
// import TreeViewContext from '@mui/lab/TreeView/TreeViewContext';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';

export default function useGetFiles(Global_research) {

        useEffect(
                () =>
                {
                        const handleKeyDown = (e) =>
                        {
                                if(e.ctrlKey && e.key === 'f')
                                {
                                        console.log('find node')
                                        Global_State.setOverlay_props( t => (
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
                                        // console.log(e)
                                        const component = document.getElementById(`ctrl_${e.key}`)
                                        if (component) component.click()
                                }
                        }

                        // console.log('Global_research', Global_research)

                        document.addEventListener('keydown', handleKeyDown);

                        return(
                                () =>
                                {
                                        document.removeEventListener('keydown', handleKeyDown)
                                }
                        )

                }, []
        )

        Global_State['backend'] = useBack()

        const dataTable = useMemo(() => (<FileTable  />), [Global_State.backend.selectedNode.model])

        return (
        {
                fileTree: Global_State.hasSection ? <FileTree data = {Global_State.backend.data} /> : <div/>,
                fileTable: Global_State.hasSection ? dataTable : <div/> ,
                fileDetails: Global_State.hasSection ? <FileDetails/> : <div/>,
        }
        )

}


function FileTree({data}) {

        // console.log('data111111', data)
        //
        // data = [...data].filter( node_data => ( node_data.global_type === 'folder' ) )

        const tree = useRef()

        const [expanded, setExpanded] = useState(['0'])

        // return (
        //         <div style={{ height: "100%", width: "100%" }} >
        //           <div>
        //             <button onClick={ () => {tree.current.scrollToId(7); tree.current.selectById(7)} }>
        //               add
        //             </button>
        //           </div>
        //           <div id = 'tree' >
        //             <Tree
        //               ref={tree}
        //               indent={20}
        //               onToggle={backend.onToggle}
        //               data={backend.data}
        //               rowHeight = {40}
        //               width = {500}
        //             >
        //               {Node}
        //             </Tree>
        //           </div>
        //         </div>
        // )

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

                        setExpanded( [...expanded] )
                }

                const handleClick = e =>
                {
                        if(e) e.stopPropagation();
                        Global_State.backend.setCurrentSelectedFolder(node.id)
                }


                useEffect(
                () =>
                {
                        Global_State.EventsManager.on(`toggle${node.id}`, e => { console.log(`toggle${node.id}`); handleDbClick(e) })
                        return () =>
                        {
                                Global_State.EventsManager.off(`toggle${node.id}`);
                        }
                },
                []
                )

                return (
                <div id={`treeRow-${node.id}`} onClick={ handleClick } onDoubleClick = { handleDbClick } >
                        <span className = 'mr-1'  >
                                {isOpen ? <FcOpenedFolder size={28} />:<FcFolder size={28} />}
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
                <StyledTreeItem key={node.id} nodeId={node.id.toString()} label={useMemo( () => <Label node = {node} />, [] )}
                                expandIcon = {<ChevronRightIcon onClick = { e => { Global_State.EventsManager.emit(`toggle${node.id}`, e) } } />}
                                collapseIcon = {<ExpandMoreIcon onClick = { e => { Global_State.EventsManager.emit(`toggle${node.id}`, e) } } />}
                >
                        {
                                Array.isArray(node.children) ?
                                node.children.filter( node => ( node.global_type === 'folder' ) ).map((node) => <RenderTree key={node.id} node = {node} /> )
                                : null
                        }
                </StyledTreeItem>
                );
        },[]
        )


        // const handleFocus = (event) =>
        // {
        //         event.preventDefault()
        //         event.stopPropagation()
        //         console.log( 'foooooooooooooooooooooooooooooooocuuuuuuuuuuuuuuuuuuuuuus', event )
        //         // Global_State.backend.setCurrentSelectedFolder(nodeId)
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
        );
}

