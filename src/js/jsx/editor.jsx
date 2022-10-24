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
  // const active = useMemo( () => (isEditorMode), [Global_State.isEditorMode] )

  const initData = useRef( JSON.parse( JSON.stringify(data) ) )

  const initManager = 
  {
    data: initData,
    isNew: id =>
    {
      let isNew = true
  
      initData.current.forEach(
        initNode => 
        {
          if( id === initNode.id )
          {
            isNew = false
            return 0
          }
        }
      );
      
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

  const form_to_json = (formData) => 
  {
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

    var object = {};
    formData.forEach((value, key) => object[key] = key === 'services' ? getService(JSON.parse(value)) : value);

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
          console.log('Global_State.dataBaseData', Global_State.dataBaseData)
          return JSON.parse( JSON.stringify( Global_State.dataBaseData ) )
        }
      case 'update_initData':
        {
          let updated_state = []
          let modified_nodes = []

          const new_data = JSON.parse( JSON.stringify( Global_State.dataBaseData ) )

          new_data.forEach(
            node =>
            {
              if( initManager.isNew(node.id) ) updated_state.push(node)
            }
          )

          for (const localNode of state) 
          {
            let added = false
            for (const node of Global_State.dataBaseData) 
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

          
          return JSON.parse( JSON.stringify( updated_state ) )
        }
      case 'add_folder':
        {
          
          console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

          const data = action.job.data

          const new_folder = 
          Global_State.createNodeData(
            `ds${id.current}`,
            "folder",
            data.services,
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
      case 'delete':
        {

          const newState = state.filter( node => node.id !== data.node_type + data.node.id ).map( node => node )

          return JSON.parse(JSON.stringify(newState))
        }
      case 'update':
        {

          return JSON.parse(JSON.stringify(state))
        }
      
      default:
        break;
    }
  }

  const [localDataState, setDatasState] = useReducer(data_reducer, initData.current ) //.map( node => ({...node, name: 'lol'}) )

  function jobs_reducer( state, action ) 
  {
      const request = action.request

      switch (action.type) {
        case 'reset':
          {
            setDatasState({ type: 'reset' })
            return state.length === 0 ? state : []
          }
        case 'add_folder':
          {
            const node = form_to_json(request)
            const job = 
            {
              id: job_id.current,
              operation: 'add',
              node_type: 'folder',
              data: node,
              etat: 'waiting',
              dependencies: 
              [
                {
                  type: node.parent_type,
                  id: node.parent_id
                }
              ]

            }

            state.push(job)

            job_id.current = job_id.current + 1 

            setDatasState({type: 'add_folder', job})

            return JSON.parse(JSON.stringify(state))
          }
        case 'delete':
          {
  
            const newState = state.filter( node => node.id !== data.node_type + data.node.id ).map( node => node )
  
            return JSON.parse(JSON.stringify(newState))
          }
        case 'update':
          {
  
            return JSON.parse(JSON.stringify(state))
          }
        
        default:
          break;
      }
  }

  const [jobs, dispatch_job] = useReducer(jobs_reducer, [])

  useEffect(
    () =>
    {
      // Global_State.EventsManager.on('update_initData', data => { setDatasState({ type: 'update_initData', new_nodes: data }) } )

      console.log('update_initData')

      setDatasState({ type: 'update_initData' })

      return () => 
      {
        // Global_State.EventsManager.off('update_initData')
      }
    }, [ Global_State.dataBaseData ]
  )

  useEffect(
      () =>
      {
          if ( Global_State.isEditorMode && jobs.length > 0 )
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
          else if ( !Global_State.isEditorMode )
          {
              toast.dismiss('save')
              dispatch_job({ type: 'reset' })
          }

      }, [jobs, Global_State.isEditorMode]
  )



  console.log('localDataState',localDataState,Global_State.dataBaseData, jobs)

  return (
      {
          data: localDataState,
          add_folder: (request) => { dispatch_job({ type: 'add_folder', request }) }
      }
  )

}