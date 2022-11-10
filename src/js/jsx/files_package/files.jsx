/* eslint-disable import/first */

import React, {useRef, useState, useCallback, useEffect} from 'react';
import { Tree } from "react-arborist";
import useBack from "./nodeBackend";
import { Node } from "./node";
import { makeNodeData } from "./parse_to_json";
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

export let backend

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
                                                        children: Global_research
                                                }
                                        ) )
                                }
                        }

                        document.addEventListener('keyup', handleKeyDown);

                        return(
                                () =>
                                {
                                        document.removeEventListener('keyup', handleKeyDown)
                                }
                        )

                }, []
        )

        backend = useBack()

        return (
        {
                fileTree: Global_State.hasSection ? <FileTree data = {backend.data} /> : <div/>,
                fileTable: Global_State.hasSection ? <FileTable  /> : <div/> ,
                fileDetails: Global_State.hasSection ? <FileDetails/> : <div/>,
        }
        )

}


function FileTree({data}) {

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
                // let icon
                // expanded.forEach(element => {

                // });
                // const expended = useRef(['0'])

                const item = useRef()
                const [isOpen, setIsOpen] = useState((expanded.indexOf(node.id) !== -1)? true: false)

                const handleDbClick = e =>
                {
                        if(e) e.stopPropagation();
                        item.current.click();

                        // console.log(item);
                        let t = expanded
                        if(expanded.indexOf(node.id.toString()) !== -1)
                        {
                                t.splice(expanded.indexOf(node.id.toString()), 1)
                                setIsOpen(false)
                        }
                        else
                        {
                                t.push(node.id)
                                setIsOpen(true)
                        }
                        // console.log(t);

                        setExpanded( t )
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
                <div ref = {item} onDoubleClick = { handleDbClick } >
        <span className = 'mr-1'  >
          {isOpen ? <FcOpenedFolder size={28} />:<FcFolder size={28} />}
        </span>
                        {node.name}
                </div>
                )
        }


        const RenderTree = useCallback(
        function RenderTree({nodes})
        {
                // console.log(tree.current.expanded)

                return (
                <StyledTreeItem key={nodes.id} nodeId={nodes.id.toString()} label={<Label node = {nodes} />}
                                expandIcon = {<ChevronRightIcon onClick = { e => { Global_State.EventsManager.emit(`toggle${nodes.id}`, e) } } />}
                                collapseIcon = {<ExpandMoreIcon onClick = { e => { Global_State.EventsManager.emit(`toggle${nodes.id}`, e) } } />}
                >
                        {Array.isArray(nodes.children)
                        ? nodes.children.map((node) => <RenderTree key={node.id} nodes = {node} /> )
                        : null}
                </StyledTreeItem>
                );
        },[]
        )


        const handleFocus = (event, nodeId) =>
        {

                backend.setCurrentSelectedFolder(nodeId)

                // setExpanded( [nodeId] )
        }

        console.log(data)

        return (
        <TreeView
        id = 'muiTree'
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['0']}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 'max-content', flexGrow: 1, width: 'max-content', overflowY: 'auto' }}
        expanded={expanded}
        // onNodeToggle = { e => { console.log(e); } }
        onNodeFocus = {handleFocus}
        multiSelect
        ref={tree}
        >
                <RenderTree nodes = {data} />
        </TreeView>
        );
}

