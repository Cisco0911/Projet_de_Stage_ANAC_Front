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

export const endUpdate = () => {isUpdate = false; /*console.log('endUpdate', isUpdate)*/}

const startUpdate = () => {isUpdate = true; /*console.log('startUpdate', isUpdate)*/}

const createdNodeIds = [];

let echosHandler

const listeners = () =>
{
        window.Global_State.EventsManager.once('updateData', () => { echosHandler('updateData') } )
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
        //         window.Global_State.EventsManager.on('updateData', () => { startUpdate() } )
        //         return () =>
        //         {
        //             window.Global_State.EventsManager.off('updateData');
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

        function makeChildrenV2(root)
        {
                // Triage de la liste de fichiers selon l'ordre hiérarchique
                value.sort((a, b) => {
                        if (a.isRoot) return -1
                        else if (b.isRoot) return  1

                        const pathA = a.path.split('\\')
                        const pathB = b.path.split('\\')

                        // console.log('pathAB', pathA, pathB)

                        return pathA.length - pathB.length

                });

                // console.log('value', value)

                // Création d'un objet qui associe chaque identifiant de fichier à son noeud dans l'arbre
                const nodesById = {
                        [root.id]: root,
                };

                // Parcours de la liste de fichiers pour créer les noeuds de l'arbre
                for (const file of value) {

                        if (file.isRoot) continue

                        const node = {
                                ...file,
                                children: [],
                        };
                        nodesById[node.id] = node; // Ajout du noeud dans l'objet nodesById

                        // Récupération du noeud parent à partir de l'objet nodesById
                        const parentNode = nodesById[file.parentId] || root;

                        // if (!parentNode) continue

                        // console.log('file.parentId', file.parentId, nodesById)

                        // Ajout du noeud en tant que enfant du noeud parent
                        parentNode.children.push(node);
                }

                return root;
        }

        function makeJsonTree()
        {
                for(let node of nodesData.data)
                {
                        if (node.isRoot) {
                                node.children = []

                                makeChildrenV2(node)

                                // console.log('makeJsonTree', node)

                                return (

                                {
                                        ...JSON.parse(JSON.stringify(node))
                                }

                                )
                        }
                }



        }

        let jsonData = makeJsonTree();

        // console.log('jsonData', jsonData)

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
