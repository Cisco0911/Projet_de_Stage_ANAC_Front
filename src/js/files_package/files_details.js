var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* eslint-disable import/first */

import React, { useEffect, useState } from 'react';
import { Global_State } from "../main";

//     node: 
// {
//  id,
//  name,
//  type,
//  isOpen,
//  children,
//  isRoot,
//  parentId
//  path,
//  hasChildren,
//  ext,
//  createdAt,
//  modifiedAt,
// }


export default function FileDetails() {
    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        selectedRow = _useState2[0],
        setSelectedRow = _useState2[1];

    Global_State.EventsManager.on('viewDetailEnabled', function (data) {
        console.log('viewDetailEnabled');setSelectedRow(data);
    });

    useEffect(function () {
        return function () {
            Global_State.EventsManager.off('viewDetailEnabled');
        };
    }, []);

    var data = selectedRow !== null ? Global_State.getNodeDataById(selectedRow.id) : null;

    var Type = void 0;

    if (selectedRow !== null && data !== null) {

        console.log(selectedRow);
        console.log(data);

        switch (data.type) {
            case "audit":
                Type = "Audit";
                break;
            case "fnc":
                Type = "Non-Conformite";
                break;
            case "ds":
                Type = "Dossier";
                break;
            case "checkList":
                Type = "CheckList";
                break;
            case "dp":
                Type = "Dossier Preuve d'Audit";
                break;
            case "nonC":
                Type = "Dossier des Non-Conformités";
                break;

            default:
                Type = "Unknown";
                break;
        }
    }

    return React.createElement(
        React.Fragment,
        null,
        selectedRow !== null && data !== null ? React.createElement(
            'div',
            { className: 'sidebar', id: 'view-detail' },
            React.createElement(
                'div',
                { className: 'sidebar-header' },
                React.createElement(
                    'h4',
                    null,
                    'View Detail'
                ),
                React.createElement(
                    'a',
                    { href: '#', className: 'btn btn-light btn-floating sidebar-close-btn' },
                    React.createElement('i', { className: 'ti-angle-right' })
                )
            ),
            React.createElement(
                'div',
                { className: 'sidebar-content' },
                React.createElement(
                    'figure',
                    { className: 'avatar mb-4' },
                    React.createElement(
                        'span',
                        { className: 'avatar-title bg-info-bright text-info rounded-pill' },
                        React.createElement('i', { className: 'ti-file' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Nom:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        data.name
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Type:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        data.type === "f" ? Global_State.getType(data.ext) : Type
                    )
                ),
                data.type === "checkList" || data.type === "dp" || data.type === "nonC" ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Audit:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        Global_State.getNodeDataById(data.parentId).name
                    )
                ) : null,
                data.type === "f" ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Taille:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        Global_State.sizeFormater(data.taille, false)
                    )
                ) : null,
                data.type === "audit" ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'RA:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        data.ra.name + " " + data.ra.second_name
                    )
                ) : null,
                data.type === "fnc" ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Level:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8 text-danger' },
                        "Level " + data.level
                    )
                ) : null,
                data.type === "fnc" ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Cl\xF4tur\xE9:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        data.isClosed ? React.createElement(
                            'div',
                            { 'class': 'badge bg-success-bright text-success' },
                            'true'
                        ) : React.createElement(
                            'div',
                            { 'class': 'badge bg-danger-bright text-danger' },
                            'false'
                        )
                    )
                ) : null,
                data.isClosed === 1 ? React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Date de cloture:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        '2022-11-05'
                    )
                ) : null,
                React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Cr\xE9\xE9 le:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8 text-primary' },
                        data.created_at
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row mb-3' },
                    React.createElement(
                        'div',
                        { className: 'col-4', style: { fontWeight: 'bold' } },
                        'Modifi\xE9 le:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-8 text-success' },
                        data.created_at
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'sidebar-footer' },
                React.createElement(
                    'button',
                    { className: 'btn btn-lg btn-block btn-primary' },
                    React.createElement('i', { className: 'ti-share mr-3' }),
                    ' Share'
                )
            )
        ) : null
    );
}