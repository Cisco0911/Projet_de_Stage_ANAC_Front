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

    var object = {};
    formData.forEach((value, key) => object[key] = key === 'services' ? JSON.parse(value) : value);

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
          Global_State.createNodeData(
            `ds${id.current}`,
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
      case 'del_folder':
        {

          const suppress_from = ( list_, id ) =>
          {
            const rest = list_.filter(
              node => ( node.id === `ds${id}` )
            )
          }

          const newState = state.filter( node => node.id !== `ds${action.id}` )

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

    const getJob = id =>
    {
      for (const job of state) 
      {
        console.log('searching joooooooooob', job.id, id)
        if( job.id === id ) return job
      }

      return {}
    }


    switch (action.type) {
      case 'reset':
        {
          setDatasState({ type: 'reset' })
          return state.length === 0 ? state : []
        }
      case 'add_folder':
        {
          const request = action.request

          const getDependencies = parent_id =>
          {
            if(parseInt(parent_id) < 0)
            {
              for (const job of state) 
              {
                if( job.node_id === parseInt(parent_id) ) return [job.id]
              }
            }
            return []
          }

          const node = form_to_json(request)
          const job = 
          {
            id: job_id.current,
            operation: 'add',
            node_id: id.current,
            node_model: 'App\\Models\\DossierSimple',
            data: node,
            etat: 'waiting',
            dependencies: getDependencies(node.parent_id)

          }

          state.push(job)

          job_id.current = job_id.current + 1 

          setDatasState({type: 'add_folder', job})

          return JSON.parse(JSON.stringify(state))
        }
      case 'del_folder':
        {
          const id = action.id

          state = state.filter(
            job => 
            {
              // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
              if( job.node_id === id ) return false
              // console.log(job.id, job.dependencies[0], getJob(job.dependencies[0]), id)
              if( getJob(job.dependencies[0]).node_id === id ) return false
              
              return true
            }
          )

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

            state.push(job)

            job_id.current = job_id.current + 1 

          }

          setDatasState({type: 'del_folder', id})

          return JSON.parse(JSON.stringify(state))

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
    await http.post('handle_edit', request)
      .then(
        res =>
        {
          console.log(res)
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

                                jobs.map(job => { queryData.append( "jobs[]", JSON.stringify(job) ) })

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
                                    // id: 'Saving',
                                    // duration: Infinity
                                  }
                                )


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
            delete: (id) => { dispatch_job({ type: 'del_folder', id }) }
          },

      }
  )

}