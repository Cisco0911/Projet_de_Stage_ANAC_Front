function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable import/first */

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';

import './checkBox_style.scss';

import gsap from 'gsap';
import * as THREE from 'three';

// export function CheckBox1({id, checked, onChange, ...props})
// {
//
//         const style =
//         {
//                 '--active': checked ? props.color : null,
//                 ...props.style,
//         }
//
//         return(
//         <label className="checkbox1"  style={ style }>
//                 <input id={'checkbox1_input'} type="checkbox" checked={checked} onChange={(e) => { console.log(checked); onChange(e) }} style={ style } />
//                 {
//                         checked ?
//                         <svg id={'checkbox1_svg'} viewBox="0 0 21 18">
//                                 <symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
//                                               fill="none" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
//                                 </symbol>
//                                 <defs >
//                                         <mask id={`tick${id}`}>
//                                                 <use className="tick mask" href="#tick-path"/>
//                                         </mask>
//                                 </defs>
//                                 <use className="tick" href="#tick-path" stroke="currentColor"/>
//                                 <path fill="white" mask={`url(#tick${id})`}
//                                       d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"/>
//                         </svg>
//                         : null
//                 }
//                 <svg className="lines" viewBox="0 0 11 11">
//                         <path d="M5.88086 5.89441L9.53504 4.26746"/>
//                         <path d="M5.5274 8.78838L9.45391 9.55161"/>
//                         <path d="M3.49371 4.22065L5.55387 0.79198"/>
//                 </svg>
//         </label>
//         )
// }


function CheckBox1(_ref) {
        var id = _ref.id,
            checked = _ref.checked,
            _onChange = _ref.onChange,
            props = _objectWithoutProperties(_ref, ['id', 'checked', 'onChange']);

        var style = Object.assign({
                '--active': props.color
        }, props.style);

        return React.createElement(
                'label',
                { className: 'checkbox1', style: style },
                React.createElement('input', { id: 'checkbox1_input', type: 'checkbox', checked: checked, onChange: function onChange(e) {
                                console.log(checked);_onChange(e);
                        }, style: style }),
                React.createElement(
                        'svg',
                        { id: 'checkbox1_svg', viewBox: '0 0 21 18' },
                        React.createElement(
                                'symbol',
                                { id: 'tick-path', viewBox: '0 0 21 18', xmlns: 'http://www.w3.org/2000/svg' },
                                React.createElement('path', { d: 'M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69',
                                        fill: 'none', strokeWidth: '2.25', strokeLinecap: 'round', strokeLinejoin: 'round' })
                        ),
                        React.createElement(
                                'defs',
                                null,
                                React.createElement(
                                        'mask',
                                        { id: 'tick' + id },
                                        React.createElement('use', { className: 'tick mask', href: '#tick-path' })
                                )
                        ),
                        React.createElement('use', { className: 'tick', href: '#tick-path', stroke: 'currentColor' }),
                        React.createElement('path', { fill: 'white', mask: 'url(#tick' + id + ')',
                                d: 'M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' })
                ),
                React.createElement(
                        'svg',
                        { className: 'lines', viewBox: '0 0 11 11' },
                        React.createElement('path', { d: 'M5.88086 5.89441L9.53504 4.26746' }),
                        React.createElement('path', { d: 'M5.5274 8.78838L9.45391 9.55161' }),
                        React.createElement('path', { d: 'M3.49371 4.22065L5.55387 0.79198' })
                )
        );
}

function CheckBox2_switch() {

        useEffect(function () {
                var to = gsap.to;


                var width = 78;
                var height = 48;

                var backgroundColor = '#F4F4F8';
                var dotColor = '#AAAAB7';
                var activeColor = '#0000f1';

                var switchs = document.querySelectorAll('.CheckBox2_switch');

                switchs.forEach(function (toggle) {
                        var canvas = toggle.querySelector('canvas'),
                            input = toggle.querySelector('input'),
                            mouseX = 0,
                            mouseY = 0,
                            renderer = new THREE.WebGLRenderer({
                                canvas: canvas,
                                context: canvas.getContext('webgl2'),
                                antialias: true,
                                alpha: true
                        });

                        canvas.style.width = width;
                        canvas.style.height = height;

                        renderer.setSize(width, height);
                        renderer.setPixelRatio(window.devicePixelRatio || 1);
                        renderer.shadowMap.enabled = true;
                        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

                        var scene = new THREE.Scene(),
                            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

                        camera.position.z = 120;

                        var rectangle = new THREE.Shape();
                        roundedRect(rectangle, -36, -20, 72, 40, 20);

                        var backgroundShape = new THREE.ExtrudeGeometry(rectangle, {
                                curveSegments: 20,
                                depth: 2,
                                bevelEnabled: true,
                                bevelSegments: 20,
                                steps: 12,
                                bevelSize: 6,
                                bevelThickness: 6
                        });

                        var background = new THREE.Mesh(backgroundShape, new THREE.MeshPhongMaterial({
                                color: new THREE.Color(backgroundColor),
                                shininess: 40
                        }));
                        background.receiveShadow = true;

                        scene.add(background);

                        var dotShape = new THREE.SphereGeometry(14, 32, 32);

                        var sphere = new THREE.Mesh(dotShape, new THREE.MeshPhongMaterial({
                                color: new THREE.Color(dotColor),
                                shininess: 10
                        }));
                        sphere.castShadow = true;

                        scene.add(sphere);

                        dotShape.translate(-16, 0, 24);
                        sphere.scale.set(.8, .8, .8);

                        scene.add(directionLight(.1, 0, 0, 100));
                        scene.add(directionLight(.9, 0, 80, 30));
                        scene.add(directionLight(.2, 0, -80, 60));
                        scene.add(directionLight(.3, -120, -120, -1));
                        scene.add(directionLight(.3, 120, -120, -1));

                        scene.add(new THREE.AmbientLight(0x626267));

                        renderer.domElement.addEventListener('pointermove', function (e) {
                                mouseX = (e.clientX - e.target.getBoundingClientRect().left - e.target.offsetWidth / 2) * -.8;
                                mouseY = (e.clientY - e.target.getBoundingClientRect().top - e.target.offsetHeight / 2) * -.8;
                        }, false);

                        renderer.domElement.addEventListener('pointerleave', function (e) {
                                mouseX = 0;
                                mouseY = 0;
                        }, false);

                        renderer.domElement.addEventListener('pointerdown', function (e) {
                                to(background.position, {
                                        z: -4,
                                        duration: .15
                                });
                        });

                        renderer.domElement.addEventListener('pointerup', function (e) {
                                to(background.position, {
                                        z: 0,
                                        duration: .15
                                });
                        });

                        input.addEventListener('change', function (e) {
                                if (input.checked) {
                                        to(sphere.scale, {
                                                x: .9,
                                                y: .9,
                                                z: .9,
                                                duration: .6,
                                                ease: 'elastic.out(1, .75)'
                                        });
                                        to(sphere.position, {
                                                x: 26,
                                                z: 4,
                                                duration: .6,
                                                ease: 'elastic.out(1, .75)'
                                        });
                                        var _newColor = new THREE.Color(activeColor);
                                        to(sphere.material.color, {
                                                r: _newColor.r,
                                                g: _newColor.g,
                                                b: _newColor.b,
                                                duration: .3
                                        });
                                        return;
                                }
                                to(sphere.scale, {
                                        x: .8,
                                        y: .8,
                                        z: .8,
                                        duration: .6,
                                        ease: 'elastic.out(1, .75)'
                                });
                                to(sphere.position, {
                                        x: 0,
                                        z: 0,
                                        duration: .6,
                                        ease: 'elastic.out(1, .75)'
                                });
                                var newColor = new THREE.Color(dotColor);
                                to(sphere.material.color, {
                                        r: newColor.r,
                                        g: newColor.g,
                                        b: newColor.b,
                                        duration: .3
                                });
                        });

                        var render = function render() {
                                requestAnimationFrame(render);

                                camera.position.x += (mouseX - camera.position.x) * .25;
                                camera.position.y += (-mouseY - camera.position.y) * .25;

                                camera.lookAt(scene.position);

                                renderer.render(scene, camera);
                        };

                        render();
                });

                function roundedRect(ctx, x, y, width, height, radius) {
                        ctx.moveTo(x, y + radius);
                        ctx.lineTo(x, y + height - radius);
                        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
                        ctx.lineTo(x + width - radius, y + height);
                        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
                        ctx.lineTo(x + width, y + radius);
                        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
                        ctx.lineTo(x + radius, y);
                        ctx.quadraticCurveTo(x, y, x, y + radius);
                }

                function directionLight(opacity, x, y, z) {
                        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFFFFFF;

                        var light = new THREE.DirectionalLight(color, opacity);
                        light.position.set(x, y, z);
                        light.castShadow = true;

                        var d = 4000;
                        light.shadow.camera.left = -d;
                        light.shadow.camera.right = d;
                        light.shadow.camera.top = d * .25;
                        light.shadow.camera.bottom = -d;

                        light.shadow.mapSize.width = 1024;
                        light.shadow.mapSize.height = 1024;

                        return light;
                }

                // console.log(switchs)
        }, []);

        return React.createElement(
                'label',
                { className: 'CheckBox2_switch' },
                React.createElement('input', { type: 'checkbox' }),
                React.createElement('canvas', null)
        );
}

export default function useCustomCheckBox() {

        return {
                CheckBox1: CheckBox1,
                CheckBox2_switch: CheckBox2_switch
        };
}