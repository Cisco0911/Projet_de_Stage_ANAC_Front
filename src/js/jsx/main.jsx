/* eslint-disable import/first */

import React, {useState, useEffect, useRef, useReducer} from 'react';

import ReactDOM from 'react-dom/client';

import EventEmitter from 'eventemitter3';



function Lol({lal}) {
    const EventsManager = new EventEmitter();

    const [o, setO] = useState([2,6,9,7,3])

    const [p, setP] = useState('p')

    function usela(g)
    {
        return setP
    }

    function emit()
    {
        
        console.log('dddddddd')
        EventsManager.emit('p')
    }

    function reducer(state, action)
    {
        return [action]
    }

    const [h, dispatch] = useReducer(reducer, ['89'])
    EventsManager.on('p', () => {console.log('set'); setP(t => t+t)})

    useEffect(
        () =>
        {
            EventsManager.emit('p')
        }, [h]
    )

    // useEffect(()=>{
    //     setTimeout(function()
    // {
    
    //     setO(o + 5)

    // }, 2000)
    // })
    
    console.log( p, h)

    // const k = usela()

    return (
        <div className="container" onClick={ () => {dispatch('22222')} } >
            {p}
        </div>
    );
}

/* <li>
    <a  href="activities.html">
        <i className="nav-link-icon ti-pulse"></i>
        <span className="nav-link-label">Activities</span>
        <span className="badge badge-warning">New</span>
    </a>
</li>*/


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Lol />);