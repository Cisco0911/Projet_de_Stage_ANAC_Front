function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

// import { findByDisplayValue } from '@testing-library/react';
import { data } from 'jquery';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { Global_State } from "../main";
import { forEach } from "react-bootstrap/ElementChildren";
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

export var isUpdate = false;

export var endUpdate = function endUpdate() {
  isUpdate = false;console.log('endUpdate', isUpdate);
};

var startUpdate = function startUpdate() {
  isUpdate = true;console.log('startUpdate', isUpdate);
};

var createdNodeIds = [];

var echosHandler = void 0;

var listeners = function listeners() {
  Global_State.EventsManager.once('updateData', function () {
    echosHandler('updateData');
  });
};

export default function parseToJson(value) {

  // console.log('valllllllllllllluuuuuuuuuuuuuuuuuuuuuuuuuuuuuue', value)
  var nodesData = { data: value };

  echosHandler = function echosHandler(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    switch (tag) {
      case 'updateData':
        startUpdate();
        break;

      default:
        break;
    }
  };

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

  var nodesDataCopy = nodesData.data.slice();

  function isCreated(nodeId) {
    var copy = createdNodeIds.slice();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = copy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;

        if (nodeId === id) {
          return true;
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

    return false;
  }

  function getChildren(nodeId) {
    var children = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var nodeData = _step2.value;

        if (nodeData.parentId === nodeId) {
          children.push(nodeData);
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

    return children;
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


  function makeChildren(node) {

    if (node.hasChildren) {
      var children = [];
      var childrenData = getChildren(node.id);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = childrenData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var childData = _step3.value;

          var children1 = makeChildren(childData);

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

          var child = Object.assign({}, JSON.parse(JSON.stringify(childData)), {
            children: children1
          });

          children.push(child);
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

      return children;
    } else return undefined;
  }

  function makeJsonTree() {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = nodesData.data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var node = _step4.value;

        if (node.isRoot) {
          var children = makeChildren(node);
          var racine = {};

          // node.forEach(
          //         (value, key) =>
          //         {
          //                 racine[key] = JSON.parse(JSON.stringify(value))
          //         }
          // );
          // racine['children'] = children

          return Object.assign({}, JSON.parse(JSON.stringify(node)), {
            children: children

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

          });
        }
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
  }

  var jsonData = makeJsonTree();

  console.log('jsonData', jsonData);

  return {
    update: function update(n) {
      isUpdate = true;
      nodesData.setData([].concat(_toConsumableArray(nodesData.data), [n]));
    },
    data: jsonData,
    nodes: nodesData.data
  };
}