import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  var _this = this;

  // const active = useMemo( () => (isEditorMode), [active] )

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var initData = useRef(JSON.parse(JSON.stringify(data)));

  var initManager = {
    data: initData,
    isNew: function isNew(id) {
      var isNew = true;

      // console.log('enter foooooooooooooooor', initData.current)
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = initData.current[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var initNode = _step.value;

          // console.log('idddddddddddddddddddddddddddddddddd', id, initNode.id)
          if (id === initNode.id) {
            isNew = false;
            break;
          }
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

  var form_to_json = function form_to_json(formData) {

    var object = {};
    formData.forEach(function (value, key) {
      return object[key] = key === 'services' ? JSON.parse(value) : value;
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
          console.log('initData.current', initData.current);

          id.current = -2;
          job_id.current = 1;

          return JSON.parse(JSON.stringify(initData.current));
        }
      case 'update_initData':
        {
          var updated_state = [];
          var modified_nodes = [];

          var new_data = JSON.parse(JSON.stringify(action.new_data));

          new_data.forEach(function (node) {
            if (initManager.isNew(node.id)) updated_state.push(node);
          });

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = state[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var localNode = _step2.value;

              var added = false;
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = new_data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var node = _step3.value;

                  if (node.id === localNode.id) {
                    if (initManager.haveBeenModified(node)) {
                      updated_state.push(node);
                    } else updated_state.push(localNode);

                    added = true;
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              if (added) continue;
              if (localNode.id.split('-').length === 2) updated_state.push(localNode);
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

          initData.current = JSON.parse(JSON.stringify(new_data));

          return JSON.parse(JSON.stringify(updated_state));
        }
      case 'add_folder':
        {

          console.log('ediiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit_add_folder');

          var _data = action.job.data;

          var new_folder = Global_State.createNodeData("ds" + id.current, "folder", getService(_data.services), false, _data.name, "ds", false, _data.front_parent_type === 'root' ? '0' : _data.front_parent_type + _data.parent_id, "", true, undefined, undefined, undefined, 'pas encore créé', undefined, parseInt(_data.section_id), undefined, undefined);
          new_folder['onEdit'] = true;

          state.push(new_folder);

          id.current = id.current - 1;

          return JSON.parse(JSON.stringify(state));
        }
      case 'del_folder':
        {

          var suppress_from = function suppress_from(list_, id) {
            var rest = list_.filter(function (node) {
              return node.id === "ds" + id;
            });
          };

          var newState = state.filter(function (node) {
            return node.id !== "ds" + action.id;
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

    var getJob = function getJob(id) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = state[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var job = _step4.value;

          console.log('searching joooooooooob', job.id, id);
          if (job.id === id) return job;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return {};
    };

    switch (action.type) {
      case 'reset':
        {
          setDatasState({ type: 'reset' });
          return state.length === 0 ? state : [];
        }
      case 'add_folder':
        {
          var request = action.request;

          var getDependencies = function getDependencies(parent_id) {
            if (parseInt(parent_id) < 0) {
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = state[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var _job = _step5.value;

                  if (_job.node_id === parseInt(parent_id)) return [_job.id];
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }
            }
            return [];
          };

          var node = form_to_json(request);
          var job = {
            id: job_id.current,
            operation: 'add',
            node_id: id.current,
            node_model: 'App\\Models\\DossierSimple',
            data: node,
            etat: 'waiting',
            dependencies: getDependencies(node.parent_id)

          };

          state.push(job);

          job_id.current = job_id.current + 1;

          setDatasState({ type: 'add_folder', job: job });

          return JSON.parse(JSON.stringify(state));
        }
      case 'del_folder':
        {
          var _id = action.id;

          state = state.filter(function (job) {
            // console.log('del filterrrrrrrrrrrrrrrrrrrrrrrrrrrrr', job.id)
            if (job.node_id === _id) return false;
            // console.log(job.id, job.dependencies[0], getJob(job.dependencies[0]), id)
            if (getJob(job.dependencies[0]).node_id === _id) return false;

            return true;
          });

          if (!(parseInt(_id) < 0)) {
            var _job2 = {
              id: job_id.current,
              operation: 'del',
              node_id: _id,
              node_model: 'App\\Models\\DossierSimple',
              etat: 'waiting'

            };

            state.push(_job2);

            job_id.current = job_id.current + 1;
          }

          setDatasState({ type: 'del_folder', id: _id });

          return JSON.parse(JSON.stringify(state));
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

  var update_initData = function update_initData(new_data) {
    console.log('update_initData');

    setDatasState({ type: 'update_initData', new_data: new_data });
  };

  var save = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(request) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return http.post('handle_edit', request).then(function (res) {
                console.log(res);
                // toast.dismiss('Saving')
              }).catch(function (err) {
                console.log(err);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function save(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  useEffect(function () {
    if (jobs.length > 0) {

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
              { variant: "light", onClick: function onClick() {
                  var queryData = new FormData();

                  jobs.map(function (job) {
                    queryData.append("jobs[]", JSON.stringify(job));
                  });

                  // console.log('jooooooooobs', queryData.get('jobs[]'))

                  Global_State.changeMode();

                  toast.promise(save(queryData), {
                    loading: 'Saving...',
                    success: 'Processus achevé',
                    error: 'err'
                  }, {
                    // id: 'Saving',
                    // duration: Infinity
                  });
                } },
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
    } else {
      toast.dismiss('save');
    }
    // else if ( !active )
    // {
    //     toast.dismiss('save')
    //     dispatch_job({ type: 'reset' })
    // }
  }, [jobs]);

  var close = function close() {
    setActive(false);
    toast.dismiss('save');
    dispatch_job({ type: 'reset' });
  };

  console.log('localDataState', localDataState, initData.current, jobs);

  return {
    data: localDataState,
    update_initData: update_initData,
    open: function open() {
      setActive(true);
    },
    close: close,
    folder: {
      add: function add(request) {
        dispatch_job({ type: 'add_folder', request: request });
      },
      delete: function _delete(id) {
        dispatch_job({ type: 'del_folder', id: id });
      }
    }

  };
}