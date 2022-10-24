var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer } from 'react';

import isEqual from "lodash.isequal";

import { http } from "./data";
import { Global_State } from "./main";

import Button from 'react-bootstrap/Button';

import toast from "react-hot-toast";

import { Stack } from '@mui/material';
import { useMemo } from 'react';

export default function useEditor(data) {
  // const active = useMemo( () => (isEditorMode), [Global_State.isEditorMode] )

  var initData = useRef(JSON.parse(JSON.stringify(data)));

  var initManager = {
    data: initData,
    isNew: function isNew(id) {
      var isNew = true;

      initData.current.forEach(function (initNode) {
        if (id === initNode.id) {
          isNew = false;
          return 0;
        }
      });

      return isNew;
    },
    haveBeenModified: function haveBeenModified(node) {
      var isModified = false;

      initData.current.forEach(function (initNode) {
        if (node.id === initNode.id) {
          if (!isEqual(node, initNode)) {
            isModified = true;return 1;
          }
        }
      });

      return isModified;
    }
  };

  var id = useRef(-2);
  var job_id = useRef(1);

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


  function data_reducer(state, action) {
    switch (action.type) {
      case 'reset':
        {
          console.log('Global_State.dataBaseData', Global_State.dataBaseData);
          return JSON.parse(JSON.stringify(Global_State.dataBaseData));
        }
      case 'update_initData':
        {
          var updated_state = [];
          var modified_nodes = [];

          var new_data = JSON.parse(JSON.stringify(Global_State.dataBaseData));

          new_data.forEach(function (node) {
            if (initManager.isNew(node.id)) updated_state.push(node);
          });

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = state[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var localNode = _step.value;

              var added = false;
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = Global_State.dataBaseData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var node = _step2.value;

                  if (node.id === localNode.id) {
                    if (initManager.haveBeenModified(node)) {
                      updated_state.push(node);
                    } else updated_state.push(localNode);

                    added = true;
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              if (added) continue;
              if (localNode.id.split('-').length === 2) updated_state.push(localNode);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return JSON.parse(JSON.stringify(updated_state));
        }
      case 'add_folder':
        {

          console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

          var _data = action.job.data;

          var new_folder = Global_State.createNodeData("ds" + id.current, "folder", _data.services, false, _data.name, "ds", false, _data.front_parent_type === 'root' ? '0' : _data.front_parent_type + _data.parent_id, "", true, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data.section_id), undefined, undefined);
          new_folder['onEdit'] = true;

          state.push(new_folder);

          id.current = id.current - 1;

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

  var _useReducer = useReducer(data_reducer, initData.current),
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
          var node = form_to_json(request);
          var job = {
            id: job_id.current,
            operation: 'add',
            node_type: 'folder',
            data: node,
            etat: 'waiting',
            dependencies: [{
              type: node.parent_type,
              id: node.parent_id
            }]

          };

          state.push(job);

          job_id.current = job_id.current + 1;

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

    console.log('update_initData');

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

  console.log('localDataState', localDataState, Global_State.dataBaseData, jobs);

  return {
    data: localDataState,
    add_folder: function add_folder(request) {
      dispatch_job({ type: 'add_folder', request: request });
    }
  };
}