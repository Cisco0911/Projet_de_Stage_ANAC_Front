/* eslint-disable import/first */


// import { findByDisplayValue } from '@testing-library/react';
import { data } from 'jquery';
import React, {useState} from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import {Global_State} from "../main";
import {forEach} from "react-bootstrap/ElementChildren";
// import { Tree } from "react-arborist";
// import TreeModel from "tree-model";

/*
node: 
{
 id,
 name,
 type,
 isOpen,
 children,
 isRoot,
 parentId
 path,
 hasChildren,
 ext,
 createdAt,
 modifiedAt,
}
*/

export let isUpdate = false;

export const endUpdate = () => {isUpdate = false; console.log('endUpdate', isUpdate)}

const startUpdate = () => {isUpdate = true; console.log('startUpdate', isUpdate)}

const createdNodeIds = [];

let echosHandler

const listeners = () =>
{
  Global_State.EventsManager.once('updateData', () => { echosHandler('updateData') } )
}

export default function parseToJson(value) {


        // console.log('valllllllllllllluuuuuuuuuuuuuuuuuuuuuuuuuuuuuue', value)
    const nodesData = { data : value };

    
    echosHandler = (tag, data = null) => 
    {
      switch (tag) {
        case 'updateData':
          startUpdate()
          break;
      
        default:
          break;
      }
    }

  //   useEffect(
  //     () =>
  //     {
  //         Global_State.EventsManager.on('updateData', () => { startUpdate() } )
  //         return () => 
  //         {
  //             Global_State.EventsManager.off('updateData');
  //         }
  //     },
  //     []
  //  )
    

    // function useGetNodesData() {
    //     const [ data, setData ] = useState(FetchedNodesData)

    //     return ({
    //         data,
    //         setData
    //     })
    // }
    
    // const nodesData = useGetNodesData();

    // useEffect( () => { startUpdate(); nodesData.setData(FetchedNodesData) }, [FetchedNodesData] )

    // console.log(nodesData)
    
    let nodesDataCopy = nodesData.data.slice();
    
    function isCreated(nodeId) {
      const copy = createdNodeIds.slice();
    
      for(let id of copy )
      {
        if (nodeId === id) {
          return true
        }
      }
      return false
    }

    function getChildren(nodeId) {
        let children = [];
        for(let nodeData of value)
        {
          if (nodeData.parentId === nodeId) {
            children.push(nodeData);
          }
        }
        return children
    }
    
    
    // function makeJsonNode(id, global_type, services, name, type, isOpen, children, isRoot, parentId, path, hasChildren, ext, ra, isClosed, created_at, level, taille, url) {
    //
    //   return ({
    //     id: id,
    //     global_type: global_type,
    //     services,
    //     name: name,
    //     type: type,
    //     taille,
    //     level: level,
    //     created_at: created_at,
    //     ra: ra,
    //     hasChildren: hasChildren,
    //     isOpen: isOpen,
    //     children: children,
    //     isRoot: isRoot,
    //     parentId: parentId,
    //     path: path,
    //     isClosed: isClosed,
    //     ext: ext,
    //     url,
    // })
    // }
    
    
    function makeChildren(node)
    {
    
      if(node.hasChildren)
      {
        let children = [];
        const childrenData = getChildren(node.id);
        for(let childData of childrenData)
        {
          let children1 = makeChildren(childData)
          
          // let child = makeJsonNode(
          //   childData.id,
          //   childData.global_type,
          //   childData.services,
          //   childData.name,
          //   childData.type,
          //   childData.isOpen,
          //   children1,
          //   childData.isRoot,
          //   childData.parentId,
          //   childData.path,
          //   childData.hasChildren,
          //   childData.ext,
          //   childData.ra,
          //   childData.isClosed,
          //   childData.created_at,
          //   childData.level,
          //   childData.taille,
          //   childData.url,
          //
          //   );

                let child =
                {
                        ...JSON.parse(JSON.stringify(childData)),
                        children: children1
                }

          children.push(child);
        }
        return children
      }
      else return undefined
      
    }
    
    function makeJsonTree()
    {
      for(let node of nodesData.data)
      {
        if (node.isRoot) {
                let children = makeChildren(node)
                let racine = {}

                // node.forEach(
                //         (value, key) =>
                //         {
                //                 racine[key] = JSON.parse(JSON.stringify(value))
                //         }
                // );
                // racine['children'] = children

          return (

                {
                        ...JSON.parse(JSON.stringify(node)),
                        children
                }

            // makeJsonNode(
            //   node.id,
            //   node.global_type,
            //   node.services,
            //   node.name,
            //   node.type,
            //   node.isOpen,
            //   children,
            //   node.isRoot,
            //   node.parentId,
            //   node.path,
            //   node.hasChildren,
            //   node.ext,
            //   node.ra,
            //   node.isClosed,
            //   node.created_at,
            //   node.level,
            //   node.taille,
            //   node.url,
            //
            //   )

          )
        }
      }
      
    
      
    }

        let jsonData = makeJsonTree();

    console.log('jsonData', jsonData)

    return {
        update: (n) => {
            isUpdate = true
            nodesData.setData(
                [...nodesData.data, n],
                
            )
        },
        data: jsonData,
        nodes: nodesData.data,
    }
}
