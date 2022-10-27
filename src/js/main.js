var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useState, useEffect, useRef, useReducer } from 'react';

import ReactDOM from 'react-dom/client';

import EventEmitter from 'eventemitter3';

function Lol(_ref) {
    var lal = _ref.lal;

    var EventsManager = new EventEmitter();

    var _useState = useState([2, 6, 9, 7, 3]),
        _useState2 = _slicedToArray(_useState, 2),
        o = _useState2[0],
        setO = _useState2[1];

    var _useState3 = useState('p'),
        _useState4 = _slicedToArray(_useState3, 2),
        p = _useState4[0],
        setP = _useState4[1];

    function usela(g) {
        return setP;
    }

    function emit() {

        console.log('dddddddd');
        EventsManager.emit('p');
    }

    function reducer(state, action) {
        return [action];
    }

    var _useReducer = useReducer(reducer, ['89']),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        h = _useReducer2[0],
        dispatch = _useReducer2[1];

    EventsManager.on('p', function () {
        console.log('set');setP(function (t) {
            return t + t;
        });
    });

    useEffect(function () {
        EventsManager.emit('p');
    }, [h]);

    // useEffect(()=>{
    //     setTimeout(function()
    // {

    //     setO(o + 5)

    // }, 2000)
    // })

    console.log(p, h);

    // const k = usela()

    return React.createElement(
        'div',
        { className: 'container', onClick: function onClick() {
                dispatch('22222');
            } },
        p
    );
}

/* <li>
    <a  href="activities.html">
        <i className="nav-link-icon ti-pulse"></i>
        <span className="nav-link-label">Activities</span>
        <span className="badge badge-warning">New</span>
    </a>
</li>*/

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Lol, null));