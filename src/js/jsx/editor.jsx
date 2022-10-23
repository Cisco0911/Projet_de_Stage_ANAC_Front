/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer} from 'react';

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';











export default function useEditor(data, active)
{

    const initData = JSON.parse( JSON.stringify(data) )

    const id = useRef(1)

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

    function data_reducer( state, action )
    {
      switch (action.type) {
        case 'add_folder':
          {
            
            console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder')

            const data = action.job

            const new_folder = 
            Global_State.createNodeData(
              `edit_${id.current}`,
              "folder",
              data.services,
              false,
              data.name,
              "ds",
              false,
              data.parent_type === 'App\\Models\\Section' ? '0' : data.parent_type + data.parent_id,
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

            state.push(new_folder)

            id.current = id.current + 1
  
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
  
    const [localDataState, setDatasState] = useReducer(data_reducer, initData ) //.map( node => ({...node, name: 'lol'}) )

    function jobs_reducer( state, action ) 
    {
        const request = action.request

        switch (action.type) {
          case 'add_folder':
            {
                const job = form_to_json(request)

                state.push(job)

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
            if ( active && jobs.length > 0 )
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
            else if ( !active )
            {
                toast.dismiss('save')
            }

        }, [jobs, active]
    )



    console.log('localDataState',localDataState)

    return (
        {
            data: localDataState,
            add_folder: (request) => { dispatch_job({ type: 'add_folder', request }) }
        }
    )

}