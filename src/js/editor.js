var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer } from 'react';

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';
import { useMemo } from 'react';

export default function useEditor(data, isEditorMode) {
  // const active = useMemo( () => (isEditorMode), [Global_State.isEditorMode] )

  var initData = JSON.parse(JSON.stringify(data));

  var id = useRef(1);

  var form_to_json = function form_to_json(formData) {
    var getService = function getService(services) {
      // console.log('fffffffffffffffff',Global_State.authUser.services);  
      return Global_State.authUser.services.filter(function (service) {
        var belongsTo = false;
        services.forEach(function (element) {
          if (element.value === service.id) belongsTo = true;
        });
        return belongsTo;
      });
    };

    var object = {};
    formData.forEach(function (value, key) {
      return object[key] = key === 'services' ? getService(JSON.parse(value)) : value;
    });

    return object;
  };

  function data_reducer(state, action) {
    switch (action.type) {
      case 'reset':
        {
          console.log('Global_State.dataBaseData', Global_State.dataBaseData);
          return JSON.parse(JSON.stringify(Global_State.dataBaseData));
        }
      case 'update_initData':
        {

          return JSON.parse(JSON.stringify(state));
        }
      case 'add_folder':
        {

          console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

          var _data = action.job;

          var new_folder = Global_State.createNodeData("edit_" + id.current, "folder", _data.services, false, _data.name, "ds", false, _data.parent_type === 'App\\Models\\Section' ? '0' : _data.parent_type + _data.parent_id, "", true, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data.section_id), undefined, undefined);

          state.push(new_folder);

          id.current = id.current + 1;

          return JSON.parse(JSON.stringify(state));
        }
      case 'delete':
        {

          var newState = state.filter(function (node) {
            return node.id !== data.node_type + data.node.id;
          }).map(function (node) {
            return node;
          });

          return JSON.parse(JSON.stringify(newState));
        }
      case 'update':
        {

          return JSON.parse(JSON.stringify(state));
        }

      default:
        break;
    }
  }

  var _useReducer = useReducer(data_reducer, initData),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      localDataState = _useReducer2[0],
      setDatasState = _useReducer2[1]; //.map( node => ({...node, name: 'lol'}) )

  function jobs_reducer(state, action) {
    var request = action.request;

    switch (action.type) {
      case 'reset':
        {
          setDatasState({ type: 'reset' });
          return state.length === 0 ? state : [];
        }
      case 'add_folder':
        {
          var job = form_to_json(request);

          state.push(job);

          setDatasState({ type: 'add_folder', job: job });

          return JSON.parse(JSON.stringify(state));
        }
      case 'delete':
        {

          var newState = state.filter(function (node) {
            return node.id !== data.node_type + data.node.id;
          }).map(function (node) {
            return node;
          });

          return JSON.parse(JSON.stringify(newState));
        }
      case 'update':
        {

          return JSON.parse(JSON.stringify(state));
        }

      default:
        break;
    }
  }

  var _useReducer3 = useReducer(jobs_reducer, []),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      jobs = _useReducer4[0],
      dispatch_job = _useReducer4[1];

  useEffect(function () {
    // Global_State.EventsManager.on('update_initData', data => { setDatasState({ type: 'update_initData', new_nodes: data }) } )

    setDatasState({ type: 'update_initData' });

    return function () {
      // Global_State.EventsManager.off('update_initData')
    };
  }, [Global_State.dataBaseData]);

  useEffect(function () {
    if (Global_State.isEditorMode && jobs.length > 0) {

      toast(function (t) {
        return React.createElement(
          "div",
          { style: { width: 'max-content' } },
          React.createElement(
            Stack,
            { spacing: 2, direction: 'row',
              sx: {
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                alignItems: 'center'
              }
            },
            React.createElement(
              Button,
              { variant: "light", onClick: function onClick() {} },
              "SAVE"
            ),
            React.createElement(
              Button,
              { variant: "danger", onClick: function onClick() {} },
              "DISCARD"
            )
          )
        );
      }, {
        id: 'save',
        position: "bottom-right",
        duration: Infinity,
        style: {
          // width: '1700px',
          border: '1px solid #0062ff',
          padding: '16px',
          color: '#0062ff'
        }
      });
    } else if (!Global_State.isEditorMode) {
      toast.dismiss('save');
      dispatch_job({ type: 'reset' });
    }
  }, [jobs, Global_State.isEditorMode]);

  console.log('localDataState', localDataState, Global_State.dataBaseData);

  return {
    data: localDataState,
    add_folder: function add_folder(request) {
      dispatch_job({ type: 'add_folder', request: request });
    }
  };
}