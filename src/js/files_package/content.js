import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React, { useMemo, useState, useReducer, useEffect, useRef, useCallback, forwardRef } from 'react';

import { Global_State } from '../main';
import { http } from "../data";

import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import toast from "react-hot-toast";
import { useDropzone } from 'react-dropzone';
import FileIcon from 'react-file-icon';
import Avatar from "react-avatar";

import Select from "react-select";
import makeAnimated from 'react-select/animated';

import { FaSort, FaInfoCircle } from "react-icons/fa";
import { FcFolder, FcVideoFile } from "react-icons/fc";
import { BsCardImage, BsFileWord, BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { RiFileWord2Fill } from "react-icons/ri";
import { SiMicrosoftpowerpoint, SiMicrosoftexcel } from "react-icons/si";
import { AiFillFileUnknown } from "react-icons/ai";
import { IoArrowUndoOutline, IoArrowUndoSharp } from "react-icons/io5";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { HiSaveAs } from 'react-icons/hi';
import { FaPaste } from 'react-icons/fa';

import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

import DatePicker from "react-datepicker";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";

var previousSelected = [];

function Files_Dropzone(props) {

        var baseStyle = {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                margin: '15px',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#eeeeee',
                borderStyle: 'dashed',
                backgroundColor: '#fafafa',
                color: '#bdbdbd',
                outline: 'none',
                transition: 'border .24s ease-in-out'
        };

        var focusedStyle = {
                borderColor: '#2196f3'
        };

        var acceptStyle = {
                borderColor: '#00e676'
        };

        var rejectStyle = {
                borderColor: '#ff1744'
        };

        var _useDropzone = useDropzone(),
            getRootProps = _useDropzone.getRootProps,
            getInputProps = _useDropzone.getInputProps,
            isFocused = _useDropzone.isFocused,
            isDragAccept = _useDropzone.isDragAccept,
            isDragReject = _useDropzone.isDragReject,
            acceptedFiles = _useDropzone.acceptedFiles;

        var style = useMemo(function () {
                return Object.assign({}, baseStyle, isFocused ? focusedStyle : {}, isDragAccept ? acceptStyle : {}, isDragReject ? rejectStyle : {});
        }, [isFocused, isDragAccept, isDragReject]);

        var _useState = useState(acceptedFiles.map(function (file) {
                return { file: file, customName: file.name };
        })),
            _useState2 = _slicedToArray(_useState, 2),
            filesObjects = _useState2[0],
            set = _useState2[1];

        useEffect(function () {
                set(acceptedFiles.map(function (file) {
                        return { file: file, customName: file.name };
                }));
        }, [acceptedFiles]);

        var files_name_list = filesObjects.map(function (fileObject) {
                var part_name = JSON.parse(JSON.stringify(fileObject.file.name.split('.')));
                var name = part_name.splice(0, part_name.length - 1).join('.');
                var ext = part_name[0];
                return React.createElement(
                        'div',
                        { key: name },
                        React.createElement('input', { key: fileObject.file.path, style: { border: 'none', width: '50%' }, placeholder: name,
                                onChange: function onChange(e) {
                                        e.preventDefault();
                                        fileObject.customName = (e.target.value === '' ? name : e.target.value) + '.' + ext;
                                        set(filesObjects);
                                }
                        }),
                        React.createElement(
                                'li',
                                { style: { display: 'inline' } },
                                ' ',
                                '.' + ext + " - " + fileObject.file.size + " bytes",
                                ' '
                        )
                );
        });

        useEffect(function () {
                props.updateMethod(filesObjects);
        }, [filesObjects]);

        return React.createElement(
                'div',
                { className: 'container', style: {
                                borderColor: 'gray',
                                borderWidth: 2,
                                borderStyle: 'ridge'
                        } },
                React.createElement(
                        'div',
                        getRootProps({ style: style }),
                        React.createElement('input', getInputProps()),
                        React.createElement(
                                'p',
                                null,
                                'Drag \'n\' drop some files here, or click to select files'
                        )
                ),
                React.createElement(
                        'aside',
                        null,
                        React.createElement(
                                'h4',
                                null,
                                'Files'
                        ),
                        React.createElement(
                                'ul',
                                null,
                                files_name_list
                        )
                )
        );
}

// let handleChange


export default function FileTable(_ref) {
        var _this = this;

        var set = _ref.set;


        var node = useMemo(function () {
                return Global_State.backend.selectedNode.model;
        }, [Global_State.backend.selectedNode.model]);

        var contain_audit = node.type === "root" && /^Audit(( \b\w*\b)|)$/.test(Global_State.getCurrentSection().name);

        console.log('contentNooooooooooooode', node, Global_State.backend);

        var _useState3 = useState({
                tag: "le Nom",
                element: ''
        }),
            _useState4 = _slicedToArray(_useState3, 2),
            filter = _useState4[0],
            setFilter = _useState4[1];

        // const [previousSelected, setPreviousSelected] = useState([0])

        previousSelected = useMemo(function () {
                previousSelected.push(node.parentId);return previousSelected;
        }, [node]);

        var _useState5 = useState(0),
            _useState6 = _slicedToArray(_useState5, 2),
            selectedRowNumber = _useState6[0],
            setNumber = _useState6[1];

        var _useState7 = useState([]),
            _useState8 = _slicedToArray(_useState7, 2),
            selectedRow = _useState8[0],
            setSelectedRows = _useState8[1];

        var justChecking = useRef(false);

        var _useState9 = useState('none'),
            _useState10 = _slicedToArray(_useState9, 2),
            mc_state = _useState10[0],
            setMc_state = _useState10[1];

        var _ref2 = [useRef([]), useRef(0)],
            to_move_or_copy = _ref2[0],
            clear_clipboard_id = _ref2[1];

        // useEffect(
        //     () =>
        //     {
        //         selectedRow.forEach(selectedNode =>
        //             {
        //                 console.log('checkkkkk', selectedNode, selectedNode.id, node )
        //                 if( Global_State.getNodeDataById(selectedNode.id).section_id === Global_State.selectedSectionId)
        //                 {
        //                     let isDeleted = true
        //                     node.children.forEach(child => { if(selectedNode.id === child.id) isDeleted = false } );
        //                     if(isDeleted) Global_State.clearSelected(setSelectedRows)
        //                 }
        //             }
        //         );
        //     },
        //     [node]
        // )

        useEffect(function () {

                Global_State.EventsManager.on('clearSelected', function () {
                        console.log('clearSelected');setSelectedRows([]);setNumber(0);
                });
                Global_State.EventsManager.on('setSelectedNode', function () {
                        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                                switch (_context.prev = _context.next) {
                                                        case 0:
                                                                console.log(data);_context.next = 3;
                                                                return Global_State.setSectionId(data.section_id);

                                                        case 3:
                                                                Global_State.backend.setCurrentSelectedFolder(data.id);
                                                        case 4:
                                                        case 'end':
                                                                return _context.stop();
                                                }
                                        }
                                }, _callee, _this);
                        }));

                        return function (_x) {
                                return _ref3.apply(this, arguments);
                        };
                }());
                return function () {
                        Global_State.EventsManager.off('clearSelected');
                        Global_State.EventsManager.off('setSelectedNode');
                };
        }, []);

        var Paste_component = useCallback(function Paste_component() {
                var paste_here = function () {
                        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(node) {
                                var d, destination_id, destination_type, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, node_to_move, queryData;

                                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                                d = Global_State.identifyNode(JSON.parse(JSON.stringify(node)));
                                                                destination_id = d[0];
                                                                destination_type = d[1];

                                                                // console.log('arriiiiiiiiiiiiiveeee', to_move_or_copy.current)

                                                                _iteratorNormalCompletion = true;
                                                                _didIteratorError = false;
                                                                _iteratorError = undefined;
                                                                _context2.prev = 6;
                                                                _iterator = to_move_or_copy.current[Symbol.iterator]();

                                                        case 8:
                                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                                        _context2.next = 25;
                                                                        break;
                                                                }

                                                                node_to_move = _step.value;

                                                                if (!(node_to_move.type === 'ds')) {
                                                                        _context2.next = 22;
                                                                        break;
                                                                }

                                                                queryData = new FormData();


                                                                queryData.append('destination_id', destination_id);
                                                                queryData.append('destination_type', destination_type);
                                                                queryData.append('id', node_to_move.id);

                                                                // console.log('arriiiiiiiiiiiiiveeee')

                                                                _context2.next = 17;
                                                                return http.post('move_folder', queryData).then(function (res) {
                                                                        console.log(res);
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 17:

                                                                clearTimeout(clear_clipboard_id.current);

                                                                to_move_or_copy.current = [];
                                                                setMc_state('none');
                                                                _context2.next = 22;
                                                                break;

                                                        case 22:
                                                                _iteratorNormalCompletion = true;
                                                                _context2.next = 8;
                                                                break;

                                                        case 25:
                                                                _context2.next = 31;
                                                                break;

                                                        case 27:
                                                                _context2.prev = 27;
                                                                _context2.t0 = _context2['catch'](6);
                                                                _didIteratorError = true;
                                                                _iteratorError = _context2.t0;

                                                        case 31:
                                                                _context2.prev = 31;
                                                                _context2.prev = 32;

                                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                                        _iterator.return();
                                                                }

                                                        case 34:
                                                                _context2.prev = 34;

                                                                if (!_didIteratorError) {
                                                                        _context2.next = 37;
                                                                        break;
                                                                }

                                                                throw _iteratorError;

                                                        case 37:
                                                                return _context2.finish(34);

                                                        case 38:
                                                                return _context2.finish(31);

                                                        case 39:
                                                        case 'end':
                                                                return _context2.stop();
                                                }
                                        }
                                }, _callee2, this, [[6, 27, 31, 39], [32,, 34, 38]]);
                        }));

                        return function paste_here(_x2) {
                                return _ref4.apply(this, arguments);
                        };
                }();

                return React.createElement(
                        IconButton,
                        {
                                disabled: mc_state === 'none',
                                style: { marginRight: 20 },
                                onClick: function onClick(e) {
                                        console.log(to_move_or_copy.current, node.id);

                                        toast.promise(paste_here(node), {
                                                loading: 'Pasting...',
                                                success: 'Processus achevé',
                                                error: 'err'
                                        }, {
                                                id: 'Pasting'
                                                // duration: Infinity
                                        });
                                }
                        },
                        React.createElement(FaPaste, { size: 25, color: '' + (mc_state === 'none' ? '' : 'blue') })
                );
        }, [node, mc_state]);

        function handle_to_move_or_copy(operation_type, nodes) {
                var move_to = function () {
                        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(node) {
                                var d, destination_id, destination_type, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, node_to_move, id, queryData;

                                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                                d = Global_State.identifyNode(JSON.parse(JSON.stringify(node)));
                                                                destination_id = d[0];
                                                                destination_type = d[1];

                                                                // console.log('arriiiiiiiiiiiiiveeee', to_move_or_copy)

                                                                _iteratorNormalCompletion2 = true;
                                                                _didIteratorError2 = false;
                                                                _iteratorError2 = undefined;
                                                                _context3.prev = 6;
                                                                _iterator2 = to_move_or_copy[Symbol.iterator]();

                                                        case 8:
                                                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                                                        _context3.next = 23;
                                                                        break;
                                                                }

                                                                node_to_move = _step2.value;

                                                                if (!(node_to_move.type === 'ds')) {
                                                                        _context3.next = 20;
                                                                        break;
                                                                }

                                                                id = Global_State.identifyNode(node_to_move)[0];
                                                                queryData = new FormData();


                                                                queryData.append('destination_id', destination_id);
                                                                queryData.append('destination_type', destination_type);
                                                                queryData.append('id', id);

                                                                // console.log('arriiiiiiiiiiiiiveeee')

                                                                _context3.next = 18;
                                                                return http.post('move_folder', queryData).then(function (res) {
                                                                        console.log(res);
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 18:
                                                                _context3.next = 20;
                                                                break;

                                                        case 20:
                                                                _iteratorNormalCompletion2 = true;
                                                                _context3.next = 8;
                                                                break;

                                                        case 23:
                                                                _context3.next = 29;
                                                                break;

                                                        case 25:
                                                                _context3.prev = 25;
                                                                _context3.t0 = _context3['catch'](6);
                                                                _didIteratorError2 = true;
                                                                _iteratorError2 = _context3.t0;

                                                        case 29:
                                                                _context3.prev = 29;
                                                                _context3.prev = 30;

                                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                                        _iterator2.return();
                                                                }

                                                        case 32:
                                                                _context3.prev = 32;

                                                                if (!_didIteratorError2) {
                                                                        _context3.next = 35;
                                                                        break;
                                                                }

                                                                throw _iteratorError2;

                                                        case 35:
                                                                return _context3.finish(32);

                                                        case 36:
                                                                return _context3.finish(29);

                                                        case 37:
                                                        case 'end':
                                                                return _context3.stop();
                                                }
                                        }
                                }, _callee3, this, [[6, 25, 29, 37], [30,, 32, 36]]);
                        }));

                        return function move_to(_x3) {
                                return _ref5.apply(this, arguments);
                        };
                }();

                var to_move_or_copy = nodes.map(function (row) {
                        return JSON.parse(JSON.stringify(Global_State.getNodeDataById(row.id)));
                });

                toast(function (t) {
                        return React.createElement(
                                'div',
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
                                                { variant: 'light', onClick: function onClick() {
                                                                console.log(operation_type, to_move_or_copy[0].id);

                                                                toast.promise(move_to(node), {
                                                                        loading: 'Moving...',
                                                                        success: 'Processus achevé',
                                                                        error: 'err'
                                                                }, {
                                                                        id: 'Moving'
                                                                        // duration: Infinity
                                                                });
                                                        } },
                                                operation_type.toUpperCase()
                                        ),
                                        React.createElement(
                                                Button,
                                                { variant: 'danger', onClick: function onClick() {
                                                                toast.dismiss(operation_type);
                                                        } },
                                                'DISCARD'
                                        )
                                )
                        );
                }, {
                        id: operation_type,
                        position: "bottom-right",
                        duration: Infinity,
                        style: {
                                // width: '1700px',
                                border: '1px solid #0062ff',
                                padding: '16px',
                                color: '#0062ff'
                        }
                });
        }

        function add(thing_to_add) {
                // filtre de service
                var canAddToService = function canAddToService(authService) {
                        var services = node.isRoot ? Global_State.getCurrentSection().services : node.services;

                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                                for (var _iterator3 = services[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var elementService = _step3.value;

                                        // console.log(authService.id, elementService.id)
                                        if (authService.id === parseInt(elementService.id)) return true;
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

                        return false;
                };
                var servicesList = Global_State.authUser.services.filter(function (service) {
                        return canAddToService(service);
                }).map(function (service) {
                        return service;
                });
                // formatage en options
                var options = servicesList.map(function (service) {
                        return { value: service.id, label: service.name };
                });

                // composant de selection de service
                var SelectServices = function SelectServices(_ref6) {
                        var updateMethod = _ref6.updateMethod;

                        // console.log(servicesList)
                        // console.log(options)

                        return React.createElement(Select, {
                                onChange: updateMethod,
                                options: options,
                                defaultValue: options.slice(0, 1),
                                isMulti: true,
                                placeholder: "Sélectionner au moins 1 service",
                                closeMenuOnSelect: false,
                                components: makeAnimated(),
                                isDisabled: options.length === 1

                        });
                };

                if (thing_to_add === "add_audit") {

                        var Audit_form = function Audit_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)
                                        submittedInfo.num_chrono = submittedInfo.num_chrono < 10 ? "0" + submittedInfo.num_chrono : submittedInfo.num_chrono.toString();
                                        submittedInfo.annee = submittedInfo.annee < 10 ? "0" + submittedInfo.annee : submittedInfo.annee.toString();

                                        var queryBody = new FormData();

                                        var service = submittedInfo.services[0].label;

                                        queryBody.append("name", submittedInfo.type_audit + "-" + service + "-" + submittedInfo.annee + "-" + submittedInfo.num_chrono);
                                        queryBody.append("services", JSON.stringify(submittedInfo.services));
                                        queryBody.append("ra_id", Global_State.authUser.id);
                                        queryBody.append("section_id", Global_State.selectedSectionId);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))


                                        if (!Global_State.isEditorMode) {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner);

                                                http.post('add_audit', queryBody)

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log(res)
                                                        if (res.status === 201) {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Audit ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "existAlready") {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Audit existant !",
                                                                        icon: "info"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "Something went wrong !") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                                                        } else if (res.status === 200 && res.data.msg === "storingError") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.value,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data.msg === 'catchException') {
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.value.errorInfo[2],
                                                                        icon: "error"
                                                                });
                                                                // console.log(res)
                                                                Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                                                        }
                                                })

                                                // Catch errors if any
                                                .catch(function (err) {
                                                        // console.log(err)
                                                        var msg = void 0;
                                                        if (err.response.status === 500) msg = "erreur interne au serveur";else if (err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page";
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error"
                                                        });
                                                        Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                                                });
                                        } else {
                                                console.log('editorHandle audit');

                                                Global_State.editor.audit.add(queryBody);

                                                Global_State.modalManager.close_modal();
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                var validationRules = yup.object().shape({
                                        num_chrono: yup.number().required().positive().integer(),
                                        annee: yup.number().required().positive().integer().max(100),
                                        services: yup.array().min(1).required('Au moins 1')

                                });

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                type_audit: "AE",
                                                num_chrono: "",
                                                annee: '',
                                                services: options.slice(0, 1)
                                        }
                                });

                                return React.createElement(
                                        Form,
                                        { value: undefined, onSubmit: formik.handleSubmit },
                                        React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Type Audit'
                                                        ),
                                                        React.createElement(
                                                                Form.Select,
                                                                {
                                                                        'aria-label': 'Default select example',
                                                                        name: 'type_audit',
                                                                        value: formik.values.type_audit,
                                                                        onChange: formik.handleChange
                                                                },
                                                                React.createElement(
                                                                        'option',
                                                                        { value: 'AE' },
                                                                        'Audit Externe'
                                                                ),
                                                                React.createElement(
                                                                        'option',
                                                                        { value: 'AI' },
                                                                        'Audit Interne'
                                                                )
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                        Col,
                                                        null,
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Numero chronologique'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        name: 'num_chrono',
                                                                        value: formik.values.num_chrono,
                                                                        onChange: formik.handleChange,
                                                                        type: 'number',
                                                                        placeholder: 'NN',
                                                                        isInvalid: !!formik.errors.num_chrono
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        msg_err
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Col,
                                                        null,
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Ann\xE9e'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        name: 'annee',
                                                                        value: formik.values.annee,
                                                                        onChange: formik.handleChange,
                                                                        type: 'number',
                                                                        placeholder: 'YY',
                                                                        isInvalid: !!formik.errors.annee
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        msg_err
                                                                )
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(
                                                        Form.Label,
                                                        null,
                                                        'Service'
                                                ),
                                                React.createElement(SelectServices, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        } }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.services ? "Au moins 1 service doit être sélectionné" : null
                                                )
                                        ),
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center'
                                                        }
                                                },
                                                React.createElement(
                                                        Button,
                                                        { variant: 'primary', type: 'submit' },
                                                        'Submit'
                                                )
                                        )
                                );
                        };

                        Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                        Global_State.modalManager.open_modal("Nouvel Audit");
                } else if (thing_to_add === "add_folder") {

                        var Folder_form = function Folder_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)

                                        var queryBody = new FormData();

                                        var _Global_State$identif = Global_State.identifyNode(node),
                                            _Global_State$identif2 = _slicedToArray(_Global_State$identif, 2),
                                            parent_id = _Global_State$identif2[0],
                                            parent_type = _Global_State$identif2[1];

                                        // console.log(parent_id, parent_type)

                                        // switch (node.type) {
                                        //     case 'root':
                                        //         parent_type = 'App\\Models\\Section'
                                        //         parent_id = Global_State.getCurrentSection().id
                                        //         break;
                                        //     case 'audit':
                                        //         parent_type = "App\\Models\\Audit"
                                        //         parent_id = parseInt(node.id.substring(5), 10)
                                        //         break;
                                        //     case 'checkList':
                                        //         parent_type = "App\\Models\\checkList"
                                        //         parent_id = parseInt(node.id.substring(9), 10)
                                        //         break;
                                        //     case 'dp':
                                        //         parent_type = 'App\\Models\\DossierPreuve'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;
                                        //     case 'nonC':
                                        //         parent_type = 'App\\Models\\Nc'
                                        //         parent_id = parseInt(node.id.substring(4), 10)
                                        //         break;
                                        //     case 'fnc':
                                        //         parent_type = 'App\\Models\\NonConformite'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;
                                        //     case 'ds':
                                        //         parent_type = 'App\\Models\\DossierSimple'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;

                                        //     default:
                                        //         break;
                                        // }

                                        queryBody.append("services", JSON.stringify(submittedInfo.services));

                                        queryBody.append("name", submittedInfo.name);
                                        queryBody.append("parent_id", parent_id);
                                        queryBody.append("parent_type", parent_type);
                                        queryBody.append("section_id", Global_State.selectedSectionId);

                                        console.log("services", queryBody.get("services"));
                                        console.log("name", queryBody.get("name"));
                                        console.log("parent_id", parent_id);
                                        console.log("parent_type", parent_type);

                                        if (!Global_State.isEditorMode) {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner);

                                                http.post('add_folder', queryBody)

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        if (res.status === 201) {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Dossier ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "Something went wrong !") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                        } else if (res.status === 200 && res.data.msg === "storingError") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.value,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                        } else if (res.data === "existAlready") {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Ce Dossier existe deja !",
                                                                        icon: "info"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else console.log(res);
                                                        // console.log(res)
                                                })

                                                // Catch errors if any
                                                .catch(function (err) {
                                                        var msg = void 0;
                                                        if (err.response.status === 500) msg = "erreur interne au serveur";else if (err.response.status === 401 || err.response.status === 419) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page";
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error"
                                                        });
                                                        // console.log(err)
                                                        Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                });
                                        } else {
                                                console.log('editorHandle folder');
                                                queryBody.set('front_parent_type', node.type);
                                                Global_State.editor.folder.add(queryBody);

                                                Global_State.modalManager.close_modal();
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                var validationRules = yup.object().shape({
                                        name: yup.string().max(255).required(),
                                        services: yup.array().min(1).required('Au moins 1')

                                });

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                name: "Nouveau Dossier",
                                                services: options.slice(0, 1)
                                        }
                                });

                                return React.createElement(
                                        Form,
                                        { value: undefined, onSubmit: formik.handleSubmit },
                                        React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                        Col,
                                                        null,
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Nom (Nouveau Dossier par d\xE9faut)'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        name: 'name',
                                                                        value: formik.values.name,
                                                                        onChange: formik.handleChange,
                                                                        type: 'text',
                                                                        placeholder: 'Nouveau Dossier',
                                                                        isInvalid: !!formik.errors.num_chrono
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        msg_err
                                                                )
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(
                                                        Form.Label,
                                                        null,
                                                        'Service'
                                                ),
                                                React.createElement(SelectServices, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        } }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.services ? "Au moins 1 service doit être sélectionné" : null
                                                )
                                        ),
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center'
                                                        }
                                                },
                                                React.createElement(
                                                        Button,
                                                        { variant: 'primary', type: 'submit' },
                                                        'Submit'
                                                )
                                        )
                                );
                        };

                        Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                        Global_State.modalManager.open_modal("Nouveau Dossier");
                } else if (thing_to_add === "add_fncs") {

                        var FNCs_form = function FNCs_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        console.log(submittedInfo);

                                        var queryBody = new FormData();

                                        var service = submittedInfo.services[0].label;

                                        queryBody.append("nonC_id", parseInt(node.id.substring(4)));
                                        queryBody.append("services", JSON.stringify(submittedInfo.services));
                                        queryBody.append("debut", submittedInfo.debut);
                                        queryBody.append("fin", submittedInfo.fin);
                                        queryBody.append("level", submittedInfo.level);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("nc_id", queryBody.get("nonC_id"))
                                        // console.log("debut", queryBody.get("debut"))
                                        // console.log("fin", queryBody.get("fin"))

                                        if (!Global_State.isEditorMode) {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner);

                                                http.post('add_fncs', queryBody)

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log(res)
                                                        if (res.status === 201) {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "FNC ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "existAlready") {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "FNC existant !",
                                                                        icon: "info"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "Something went wrong !") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                        } else if (res.status === 200 && res.data.msg === "storingError") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.value,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data.msg === 'catchException') {
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.value.errorInfo[2],
                                                                        icon: "error"
                                                                });
                                                                // console.log(res)
                                                                Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                        } else console.log(res);
                                                })

                                                // Catch errors if any
                                                .catch(function (err) {
                                                        console.log(err);
                                                        var msg = void 0;
                                                        if (err.response.status === 500) msg = "erreur interne au serveur";else if (err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page";
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error"
                                                        });
                                                        Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                });
                                        } else {
                                                console.log('editorHandle fnc');

                                                queryBody.set('front_parent_type', node.type);
                                                Global_State.editor.fnc.add(queryBody);

                                                Global_State.modalManager.close_modal();
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                var _useState11 = useState(1),
                                    _useState12 = _slicedToArray(_useState11, 2),
                                    min = _useState12[0],
                                    setMin = _useState12[1];

                                var _useState13 = useState(false),
                                    _useState14 = _slicedToArray(_useState13, 2),
                                    enableEnd = _useState14[0],
                                    setEndState = _useState14[1];

                                var validationRules = yup.object().shape({
                                        debut: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide"),
                                        fin: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").min(min, "La fin ne saurait être inférieur au debut"),
                                        level: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").max(3, "Niveau invalide").min(1, "Niveau invalide"),
                                        services: yup.array().min(1).required('Au moins un service doit être sélectionné')

                                });

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                debut: "",
                                                fin: "",
                                                level: "",
                                                services: options.slice(0, 1)
                                        }
                                });

                                return React.createElement(
                                        Form,
                                        { value: undefined, onSubmit: formik.handleSubmit },
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center',
                                                                marginBottom: 10
                                                        }
                                                },
                                                'Entrez la plage de num\xE9rotation'
                                        ),
                                        React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                        Col,
                                                        null,
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Debut'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        disabled: enableEnd,
                                                                        name: 'debut',
                                                                        value: formik.values.debut,
                                                                        onChange: formik.handleChange,
                                                                        onBlur: function onBlur(e) {
                                                                                if (formik.values.debut !== '') {
                                                                                        e.preventDefault();setMin(formik.values.debut);setEndState(!enableEnd);
                                                                                }
                                                                        },
                                                                        type: 'number',
                                                                        placeholder: 'Ex: 1',
                                                                        isInvalid: !!formik.errors.debut
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        formik.errors.debut
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Col,
                                                        null,
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mb-3', onClick: function onClick() {
                                                                                if (!enableEnd) toast.error('Veuillez renseigner le debut d’abord', { position: 'top-center' });
                                                                        } },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        null,
                                                                        'Fin'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        disabled: !enableEnd,
                                                                        name: 'fin',
                                                                        value: formik.values.fin,
                                                                        onChange: formik.handleChange,
                                                                        type: 'number',
                                                                        placeholder: 'Ex: 147',
                                                                        isInvalid: !!formik.errors.fin
                                                                }),
                                                                React.createElement(
                                                                        Form.Control.Feedback,
                                                                        { type: 'invalid' },
                                                                        formik.errors.fin
                                                                )
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(
                                                        Form.Label,
                                                        null,
                                                        'Niveau des FNCs \xE0 g\xE9n\xE9rer'
                                                ),
                                                React.createElement(Form.Control, {
                                                        name: 'level',
                                                        value: formik.values.level,
                                                        onChange: formik.handleChange,
                                                        type: 'number',
                                                        placeholder: '1 ou 2',
                                                        isInvalid: !!formik.errors.level
                                                }),
                                                React.createElement(
                                                        Form.Control.Feedback,
                                                        { type: 'invalid' },
                                                        formik.errors.level
                                                )
                                        ),
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(
                                                        Form.Label,
                                                        null,
                                                        'Service'
                                                ),
                                                React.createElement(SelectServices, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        } }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.services
                                                )
                                        ),
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center'
                                                        }
                                                },
                                                React.createElement(
                                                        Button,
                                                        { variant: 'primary', type: 'submit' },
                                                        'Submit'
                                                )
                                        )
                                );
                        };

                        Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                        Global_State.modalManager.open_modal("Generation de Non-Conformite");
                } else if (thing_to_add === "add_files") {

                        var Fs_form = function Fs_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        console.log(submittedInfo);

                                        Global_State.modalManager.setContent(Global_State.spinnerManager.spinner);

                                        var queryBody = new FormData();

                                        var _Global_State$identif3 = Global_State.identifyNode(node),
                                            _Global_State$identif4 = _slicedToArray(_Global_State$identif3, 2),
                                            parent_id = _Global_State$identif4[0],
                                            parent_type = _Global_State$identif4[1];

                                        // switch (node.type) {
                                        //     case 'root':
                                        //         parent_type = 'App\\Models\\Section'
                                        //         parent_id = Global_State.getCurrentSection().id
                                        //         break;
                                        //     case 'audit':
                                        //         parent_type = "App\\Models\\Audit"
                                        //         parent_id = parseInt(node.id.substring(5), 10)
                                        //         break;
                                        //     case 'checkList':
                                        //         parent_type = "App\\Models\\checkList"
                                        //         parent_id = parseInt(node.id.substring(9), 10)
                                        //         break;
                                        //     case 'dp':
                                        //         parent_type = 'App\\Models\\DossierPreuve'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;
                                        //     case 'nonC':
                                        //         parent_type = 'App\\Models\\Nc'
                                        //         parent_id = parseInt(node.id.substring(4), 10)
                                        //         break;
                                        //     case 'fnc':
                                        //         parent_type = 'App\\Models\\NonConformite'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;
                                        //     case 'ds':
                                        //         parent_type = 'App\\Models\\DossierSimple'
                                        //         parent_id = parseInt(node.id.substring(2), 10)
                                        //         break;

                                        //     default:
                                        //         break;
                                        // }


                                        queryBody.append("parent_type", parent_type);
                                        queryBody.append("parent_id", parent_id);
                                        submittedInfo.files.map(function (fileObject) {
                                                queryBody.append("fichiers[]", fileObject.file, fileObject.customName);
                                        });
                                        queryBody.append("services", JSON.stringify(submittedInfo.services));
                                        queryBody.append("section_id", Global_State.selectedSectionId);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("nc_id", queryBody.get("nonC_id"))
                                        // console.log("debut", queryBody.get("debut"))
                                        console.log("fin", queryBody.get("fichiers[]"));

                                        if (!Global_State.isEditorMode) {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner);

                                                http.post('add_files', queryBody, {
                                                        headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                        }
                                                })

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log(res)
                                                        if (res.status === 200 && res.data === "ok") {
                                                                // console.log("looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Fichier(s) ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data.msg === "duplicated") {
                                                                // console.log(res)
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Certains fichiers son existant ou possède le mm chemin, des copies ont été créées !\n" + JSON.stringify(res.data.value),
                                                                        icon: "info"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data.msg === "existAlready") {
                                                                // console.log(res)
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Certains fichiers son existant ou possède le mm chemin !\n" + JSON.stringify(res.data.value),
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data === "Something went wrong !") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                                                        } else if (res.status === 200 && res.data.msg === "storingError") {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.value,
                                                                        icon: "error"
                                                                });
                                                                Global_State.modalManager.close_modal();
                                                        } else if (res.status === 200 && res.data.msg === 'catchException') {
                                                                console.log(res);
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.value.errorInfo[2],
                                                                        icon: "error"
                                                                });
                                                                // console.log(res)
                                                                Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                                                        } else {
                                                                console.log(res);
                                                        }
                                                })

                                                // Catch errors if any
                                                .catch(function (err) {
                                                        console.log(err);
                                                        var msg = void 0;
                                                        if (err.response.status === 500) msg = "erreur interne au serveur";else if (err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page";
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error"
                                                        });
                                                        Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                                                });
                                        } else {
                                                console.log('editorHandle for files');
                                                // queryBody.forEach((value, key) => console.log(key, value));
                                                queryBody.set('front_parent_type', node.type);
                                                Global_State.editor.files.add(queryBody);

                                                Global_State.modalManager.close_modal();
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                var validationRules = yup.object().shape({
                                        files: yup.array().min(1).required("Au moins un fichier doit être sélectionné"),
                                        services: yup.array().min(1).required('Au moins un service doit être sélectionné')

                                });

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                files: null,
                                                services: options.slice(0, 1)
                                        }
                                });

                                return React.createElement(
                                        Form,
                                        { value: undefined, onSubmit: formik.handleSubmit },
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(Files_Dropzone, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("files", e);
                                                        } }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.files
                                                )
                                        ),
                                        React.createElement(
                                                Form.Group,
                                                { className: 'mb-3' },
                                                React.createElement(
                                                        Form.Label,
                                                        null,
                                                        'Service'
                                                ),
                                                React.createElement(SelectServices, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        } }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.services
                                                )
                                        ),
                                        React.createElement(
                                                'div',
                                                {
                                                        style: {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                position: 'relative',
                                                                alignItems: 'center'
                                                        }
                                                },
                                                React.createElement(
                                                        Button,
                                                        { variant: 'primary', type: 'submit' },
                                                        'Submit'
                                                )
                                        )
                                );
                        };

                        Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                        Global_State.modalManager.open_modal("Ajouter des Fichiers");
                }
        }

        // node:
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


        var ActionsMenu = function ActionsMenu() {
                // let label1 =  ?  : node.type === "audit" ? "Nouvelle Non-Conformité" : "Nouveau Fichier de preuve"
                var buttons = [];

                // console.log("kkkkkkkkkkkkk", Global_State.getCurrentSection().name)


                var _Global_State$identif5 = Global_State.identifyNode(node),
                    _Global_State$identif6 = _slicedToArray(_Global_State$identif5, 2),
                    id = _Global_State$identif6[0],
                    type = _Global_State$identif6[1];

                if (node.global_type === "folder") buttons.push([React.createElement(
                        'option',
                        { key: "add_folder", className: 'dropdown-item', onClick: function onClick() {
                                        add("add_folder");
                                } },
                        'Nouveau Dossier'
                ), React.createElement(
                        'option',
                        { key: "add_files", className: 'dropdown-item', onClick: function onClick() {
                                        add("add_files");
                                } },
                        'Ajouter des fichiers'
                )]);
                if (contain_audit) buttons.push(React.createElement(
                        'option',
                        { key: "add_audit", className: 'dropdown-item', onClick: function onClick() {
                                        add("add_audit");
                                } },
                        'Nouvel Audit'
                ));
                if (node.type === "nonC") buttons.push(React.createElement(
                        'option',
                        { key: "add_fncs", className: 'dropdown-item', disabled: false, onClick: function onClick() {
                                        add("add_fncs");
                                } },
                        'G\xE9n\xE9rer des Non-Conformit\xE9s'
                ));

                return React.createElement(
                        'div',
                        { className: 'd-md-flex justify-content-between' },
                        React.createElement(
                                'ul',
                                { className: 'list-inline mb-3' },
                                React.createElement(
                                        'li',
                                        { className: 'list-inline-item mb-0' },
                                        React.createElement(
                                                'a',
                                                { className: 'btn btn-outline-light dropdown-toggle', 'data-toggle': 'dropdown' },
                                                'Ajouter'
                                        ),
                                        React.createElement(
                                                'div',
                                                { className: 'dropdown-menu' },
                                                buttons
                                        )
                                ),
                                selectedRowNumber === 0 ? null : React.createElement(
                                        'li',
                                        { className: 'list-inline-item mb-0' },
                                        React.createElement(
                                                'a',
                                                { className: 'btn btn-outline-light dropdown-toggle', 'data-toggle': 'dropdown' },
                                                'Plus'
                                        ),
                                        React.createElement(
                                                'div',
                                                { className: 'dropdown-menu' },
                                                selectedRowNumber === 1 ? React.createElement(
                                                        'i',
                                                        { onClick: function onClick() {
                                                                        Global_State.EventsManager.emit('viewDetailEnabled', selectedRow[0]);
                                                                }, className: 'dropdown-item', 'data-sidebar-target': '#view-detail' },
                                                        'Voir les Details'
                                                ) : null,
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item' },
                                                        'Partager'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item' },
                                                        'T\xE9l\xE9charger'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item' },
                                                        'Copier vers'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item',
                                                                onClick: function onClick(e) {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();

                                                                        clearTimeout(clear_clipboard_id.current);

                                                                        clear_clipboard_id.current = setTimeout(function () {
                                                                                setMc_state('none');to_move_or_copy.current = [];
                                                                        }, 2 * 60000);

                                                                        to_move_or_copy.current = selectedRow.map(function (row) {
                                                                                return { id: Global_State.identifyNode(row)[0], type: row.type };
                                                                        });

                                                                        setMc_state('move');
                                                                }
                                                        },
                                                        'D\xE9placer vers'
                                                ),
                                                selectedRowNumber === 1 ? React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item' },
                                                        'Renommer'
                                                ) : null,
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item', onClick: function onClick(e) {
                                                                        // http.delete("")

                                                                        var remove = function () {
                                                                                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
                                                                                        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                                                                while (1) {
                                                                                                        switch (_context5.prev = _context5.next) {
                                                                                                                case 0:
                                                                                                                        _context5.next = 2;
                                                                                                                        return Promise.all(selectedRow.map(function () {
                                                                                                                                var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(row) {
                                                                                                                                        var nodeIdentity;
                                                                                                                                        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                                                                                                                while (1) {
                                                                                                                                                        switch (_context4.prev = _context4.next) {
                                                                                                                                                                case 0:
                                                                                                                                                                        // console.log(Global_State.identifyNode(row))
                                                                                                                                                                        nodeIdentity = Global_State.identifyNode(row);
                                                                                                                                                                        // const [ id, type ] = Global_State.identifyNode(row)

                                                                                                                                                                        console.log(selectedRow);
                                                                                                                                                                        _context4.t0 = row.type;
                                                                                                                                                                        _context4.next = _context4.t0 === 'audit' ? 5 : _context4.t0 === 'checkList' ? 8 : _context4.t0 === 'dp' ? 9 : _context4.t0 === 'nonC' ? 10 : _context4.t0 === 'fnc' ? 11 : _context4.t0 === 'ds' ? 14 : _context4.t0 === 'f' ? 17 : 20;
                                                                                                                                                                        break;

                                                                                                                                                                case 5:
                                                                                                                                                                        _context4.next = 7;
                                                                                                                                                                        return http.delete('del_audit?id=' + nodeIdentity[0]).then(function (res) {
                                                                                                                                                                                console.log(res);
                                                                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation: ' + row.value, {
                                                                                                                                                                                        icon: React.createElement(FaInfoCircle, { color: '#2196F3', size: 28 })
                                                                                                                                                                                });
                                                                                                                                                                        }).catch(function (err) {
                                                                                                                                                                                console.log(err);
                                                                                                                                                                                if (err.response.data === 'en attente') toast.error('Cet Audit est deja dans une file d\'attente de suppression: ' + row.value);else toast.error("error on this one, Audit: " + row.value);
                                                                                                                                                                        });

                                                                                                                                                                case 7:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 8:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 9:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 10:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 11:
                                                                                                                                                                        _context4.next = 13;
                                                                                                                                                                        return http.delete('del_fnc?id=' + nodeIdentity[0]).then(function (res) {
                                                                                                                                                                                console.log(res);
                                                                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation: ' + row.value, {
                                                                                                                                                                                        icon: React.createElement(FaInfoCircle, { color: '#2196F3', size: 28 })
                                                                                                                                                                                });
                                                                                                                                                                        }).catch(function (err) {
                                                                                                                                                                                console.log(err);
                                                                                                                                                                                if (err.response.data === 'en attente') toast.error('Cette FNC est deja dans une file d\'attente de suppression: ' + row.value);else toast.error("error on this one, FNC: " + row.value);
                                                                                                                                                                        });

                                                                                                                                                                case 13:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 14:
                                                                                                                                                                        _context4.next = 16;
                                                                                                                                                                        return http.delete('del_folder?id=' + nodeIdentity[0]).then(function (res) {
                                                                                                                                                                                console.log(res);
                                                                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation: ' + row.value, {
                                                                                                                                                                                        icon: React.createElement(FaInfoCircle, { color: '#2196F3', size: 28 })
                                                                                                                                                                                });
                                                                                                                                                                        }).catch(function (err) {
                                                                                                                                                                                console.log(err);
                                                                                                                                                                                if (err.response.data === 'en attente') toast.error('Cet Dossier est deja dans une file d\'attente de suppression: ' + row.value);else toast.error("error on this one, Dossier: " + row.value);
                                                                                                                                                                        });

                                                                                                                                                                case 16:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 17:
                                                                                                                                                                        _context4.next = 19;
                                                                                                                                                                        return http.delete('del_file?id=' + nodeIdentity[0]).then(function (res) {
                                                                                                                                                                                console.log(res);
                                                                                                                                                                                if (res.data === 'attente') toast('En attente de confirmation: ' + row.value, {
                                                                                                                                                                                        icon: React.createElement(FaInfoCircle, { color: '#2196F3', size: 28 })
                                                                                                                                                                                });
                                                                                                                                                                        }).catch(function (err) {
                                                                                                                                                                                console.log(err);
                                                                                                                                                                                if (err.response.data === 'en attente') toast.error('Cet Dossier est deja dans une file d\'attente de suppression: ' + row.value);else toast.error("error on this one, Ficher: " + row.value);
                                                                                                                                                                        });

                                                                                                                                                                case 19:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 20:
                                                                                                                                                                        return _context4.abrupt('break', 21);

                                                                                                                                                                case 21:
                                                                                                                                                                case 'end':
                                                                                                                                                                        return _context4.stop();
                                                                                                                                                        }
                                                                                                                                                }
                                                                                                                                        }, _callee4, _this);
                                                                                                                                }));

                                                                                                                                return function (_x4) {
                                                                                                                                        return _ref8.apply(this, arguments);
                                                                                                                                };
                                                                                                                        }()

                                                                                                                        // return 0;

                                                                                                                        ));

                                                                                                                case 2:
                                                                                                                case 'end':
                                                                                                                        return _context5.stop();
                                                                                                        }
                                                                                                }
                                                                                        }, _callee5, _this);
                                                                                }));

                                                                                return function remove() {
                                                                                        return _ref7.apply(this, arguments);
                                                                                };
                                                                        }();

                                                                        var localRemove = function localRemove() {
                                                                                selectedRow.map(function (row) {
                                                                                        // console.log(Global_State.identifyNode(row))
                                                                                        var nodeIdentity = Global_State.identifyNode(row);
                                                                                        // const [ id, type ] = Global_State.identifyNode(row)

                                                                                        console.log(selectedRow);
                                                                                        switch (row.type) {
                                                                                                case 'audit':

                                                                                                        console.log('audit dispatch del');
                                                                                                        Global_State.editor.audit.delete(nodeIdentity[0]);

                                                                                                        break;
                                                                                                case 'checkList':
                                                                                                        break;
                                                                                                case 'dp':
                                                                                                        break;
                                                                                                case 'nonC':
                                                                                                        break;
                                                                                                case 'fnc':

                                                                                                        console.log('fnc dispatch del');
                                                                                                        Global_State.editor.fnc.delete(nodeIdentity[0]);

                                                                                                        break;
                                                                                                case 'ds':

                                                                                                        console.log('folder del');
                                                                                                        Global_State.editor.folder.delete(nodeIdentity[0]);

                                                                                                        break;
                                                                                                case 'f':

                                                                                                        console.log('file dispatch del');
                                                                                                        Global_State.editor.files.delete(nodeIdentity[0]);

                                                                                                        break;

                                                                                                default:
                                                                                                        break;
                                                                                        }
                                                                                });
                                                                        };

                                                                        // console.log(selectedRow[0].id.substring(2))
                                                                        if (!Global_State.isEditorMode) {
                                                                                toast.promise(remove(), {
                                                                                        loading: 'Loading...',
                                                                                        success: 'Processus achevé',
                                                                                        error: 'err'
                                                                                });
                                                                        } else localRemove();
                                                                } },
                                                        'Supprimer'
                                                )
                                        )
                                ),
                                React.createElement(
                                        'li',
                                        { className: 'list-inline-item mb-0' },
                                        React.createElement(
                                                'a',
                                                { className: 'btn btn-outline-light dropdown-toggle', 'data-toggle': 'dropdown' },
                                                'Tags'
                                        ),
                                        React.createElement(
                                                'div',
                                                { className: 'dropdown-menu' },
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item', onClick: function onClick(e) {
                                                                        e.stopPropagation();setFilter({ tag: 'le Nom', element: '' });
                                                                } },
                                                        'Nom'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item', onClick: function onClick(e) {
                                                                        e.stopPropagation();setFilter({ tag: 'la Date de creation', element: [null, null] });
                                                                } },
                                                        'Date de Creation'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item', onClick: function onClick(e) {
                                                                        e.stopPropagation();setFilter({ tag: 'la Date de revision', element: [null, null] });
                                                                }, disabled: node.type !== 'nonC' },
                                                        'Date de Revision'
                                                ),
                                                React.createElement(
                                                        'option',
                                                        { className: 'dropdown-item', onClick: function onClick(e) {
                                                                        e.stopPropagation();setFilter({ tag: 'le RA', element: '' });
                                                                }, disabled: !contain_audit },
                                                        'RA'
                                                )
                                        )
                                )
                        )
                );
        };

        // const SubHeaderComponent = () =>
        // {
        //     return (
        //         <React.Fragment>
        //             {node.isRoot ? <IoArrowUndoOutline size={25} style = {{ marginRight: 20, }} /> :
        //             <IoArrowUndoSharp onClick={ (e) => { e.preventDefault(); backend.setCurrentSelectedFolder(previousSelected.pop()) } }  size={25} style = {{ marginRight: 20, }}  />}
        //             <SearchComponent set = {recherche} tag = {tag} />
        //         </React.Fragment>
        //     )
        // }

        var dataFormater = function dataFormater(node) {

                // console.log(node)
                var datas = [];

                function getTypeExt(ext) {
                        var img = ["jpeg", "jpg", "png", "gif"];
                        var vid = ["mp4", "avi", "MOV", "mpeg"];

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                                for (var _iterator4 = img[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var imgExt = _step4.value;

                                        if (imgExt === ext) return "img";
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

                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                                for (var _iterator5 = vid[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                        var vidExt = _step5.value;

                                        if (vidExt === ext) return "vid";
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

                        return ext;
                }

                function TypeIcon(props) {
                        var _ref9 = [props.data, props.iconSize],
                            data = _ref9[0],
                            iconSize = _ref9[1];

                        if (data.global_type === "folder") {
                                return React.createElement(FcFolder, { size: iconSize });
                        } else {
                                // <BsCardImage size={iconSize} />
                                switch (getTypeExt(data.ext)) {
                                        case "img":
                                                return React.createElement('img', { onClick: function onClick(e) {
                                                                Global_State.modalManager.setContent(React.createElement(
                                                                        'div',
                                                                        { style: {
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        position: 'relative',
                                                                                        alignItems: 'center'
                                                                                } },
                                                                        React.createElement('img', { style: {
                                                                                        width: 'auto',
                                                                                        height: 'auto'
                                                                                }, alt: 'Avatar', src: data.url })
                                                                ));
                                                                Global_State.modalManager.open_modal("Apercu de l' image");
                                                        }, style: { width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }, src: data.url, alt: '' });
                                        case "vid":
                                                return React.createElement(FcVideoFile, { onClick: function onClick(e) {
                                                                Global_State.modalManager.setContent(React.createElement(
                                                                        'div',
                                                                        { style: {
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        position: 'relative',
                                                                                        alignItems: 'center'
                                                                                } },
                                                                        React.createElement(
                                                                                'video',
                                                                                { width: 'auto', height: 'auto', controls: true, autoPlay: true, preload: '' },
                                                                                React.createElement('source', { src: data.url, type: "video/" + data.ext })
                                                                        )
                                                                ));
                                                                Global_State.modalManager.open_modal("Apercu de l' image");
                                                        }, size: iconSize });
                                        case "docx":
                                                return React.createElement(RiFileWord2Fill, { color: '#295394', size: iconSize, onClick: function onClick(e) {
                                                                Global_State.modalManager.setContent(React.createElement('div', { style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                position: 'relative',
                                                                                alignItems: 'center'
                                                                        } }));
                                                                Global_State.modalManager.open_modal("Apercu du fichier");
                                                        } });
                                        case "pdf":
                                                return React.createElement(BsFillFileEarmarkPdfFill, { color: '#ad0b00', size: iconSize, onClick: function onClick(e) {
                                                                console.log(data);
                                                                Global_State.modalManager.setContent(React.createElement(
                                                                        'div',
                                                                        { style: {
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        position: 'relative',
                                                                                        alignItems: 'center'
                                                                                } },
                                                                        Global_State.getNodeDataById(data.id).onEdit ? 'Pas encore telechargé' : React.createElement('embed', { src: data.url + "#toolbar=0&navpanes=0&scrollbar=0", width: 900, height: 400, type: 'application/pdf' })
                                                                ));
                                                                Global_State.modalManager.open_modal("Apercu du fichier");
                                                        } });
                                        case "xlsx":
                                                return React.createElement(SiMicrosoftexcel, { color: '#1f6e43', size: iconSize });
                                        case "pptx":
                                                return React.createElement(SiMicrosoftpowerpoint, { color: '#ad0b00', size: iconSize, onClick: function onClick(e) {
                                                                Global_State.modalManager.setContent(React.createElement('div', { style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                position: 'relative',
                                                                                alignItems: 'center'
                                                                        } }));
                                                                Global_State.modalManager.open_modal("Apercu du fichier");
                                                        } });
                                        default:
                                                return React.createElement(AiFillFileUnknown, { size: iconSize });
                                }
                        }
                }

                var NameFormater = function NameFormater(props) {
                        var div = useRef();

                        var nameComponent = React.createElement(
                                'div',
                                Object.assign({ id: props.data.id, ref: div, className: 'd-flex justify-content-center align-items-center', style: { height: '100%', width: '100%', zIndex: -1000, pointerEvents: "none" } }, props),
                                React.createElement(TypeIcon, Object.assign({ iconSize: 30 }, props)),
                                React.createElement(
                                        'span',
                                        {
                                                style: {
                                                        MozUserSelect: 'none',
                                                        msUserSelect: 'none',
                                                        WebkitUserSelect: 'none',
                                                        userSelect: 'none',
                                                        marginLeft: 10,
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                } },
                                        props.data.name
                                )
                        );

                        useEffect(function () {

                                var pDoc = document.getElementById('' + props.data.id);

                                var parent = pDoc.parentNode;

                                parent.classList.add("h-100");
                                parent.style.height = '100%';
                        });

                        return React.createElement(
                                React.Fragment,
                                null,
                                nameComponent
                        );
                };

                var LevelComponent = function LevelComponent(_ref10) {
                        var data = _ref10.data;

                        // const [niv, setNiv] = useState(level)

                        var level = parseInt(data.level);

                        var nextNiv = function nextNiv(currentNiv) {
                                switch (currentNiv) {
                                        case 1:
                                                return 2;
                                        case 2:
                                                return 3;
                                        case 3:
                                                return 1;

                                        default:
                                                return 0;
                                }
                        };

                        var class_name = void 0;
                        switch (level) {
                                case 1:
                                        class_name = "badge bg-danger-bright text-dark";
                                        break;
                                case 2:
                                        class_name = "badge bg-warning-bright text-dark";
                                        break;
                                case 3:
                                        class_name = "badge bg-dark-bright text-dark";
                                        break;

                                default:
                                        break;
                        }

                        function handleClick(e) {
                                var _this2 = this;

                                console.log(level);
                                var node_data = Global_State.getNodeDataById(data.id);

                                var _Global_State$identif7 = Global_State.identifyNode(node_data),
                                    _Global_State$identif8 = _slicedToArray(_Global_State$identif7, 2),
                                    id = _Global_State$identif8[0],
                                    lol = _Global_State$identif8[1];
                                // Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                var query = new FormData();
                                query.append('id', id);
                                query.append('update_object', 'level');
                                query.append('new_value', nextNiv(level));
                                query.append('additional_info', JSON.stringify({}));

                                if (!Global_State.isEditorMode) {
                                        var update = function () {
                                                var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
                                                        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                                while (1) {
                                                                        switch (_context6.prev = _context6.next) {
                                                                                case 0:
                                                                                        _context6.next = 2;
                                                                                        return http.post('update_fnc', query).then(function (res) {
                                                                                                console.log(res);
                                                                                        }).catch(function (err) {
                                                                                                console.log(err);throw err;
                                                                                        });

                                                                                case 2:
                                                                                case 'end':
                                                                                        return _context6.stop();
                                                                        }
                                                                }
                                                        }, _callee6, _this2);
                                                }));

                                                return function update() {
                                                        return _ref11.apply(this, arguments);
                                                };
                                        }();

                                        // console.log(selectedRow[0].id.substring(2))
                                        toast.promise(update(), {
                                                loading: 'Loading...',
                                                success: 'Processus achevé',
                                                error: 'err'
                                        });
                                } else {
                                        Global_State.editor.fnc.update(query);
                                }
                        }

                        return React.createElement(
                                'div',
                                { className: class_name, onClick: handleClick },
                                level
                        );
                };

                var ReviewDateComponenr = function ReviewDateComponenr(_ref12) {
                        var data = _ref12.data;

                        var value = data.review_date ? data.review_date : '____/__/__';

                        var handleClick = function handleClick(e) {
                                e.stopPropagation();
                                console.log("review date handle click");

                                var Date_input = function Date_input(_ref13) {
                                        var data = _ref13.data;


                                        var CustomInput = forwardRef(function (_ref14, ref) {
                                                var value = _ref14.value,
                                                    onClick = _ref14.onClick;
                                                return React.createElement(
                                                        Stack,
                                                        { direction: 'row', sx: { width: 'fit-content', backgroundColor: 'whitesmoke' } },
                                                        React.createElement('input', { ref: ref,
                                                                className: 'form-control form-control-sm',
                                                                style: { height: 35, textAlign: 'center', border: 'none', borderRadius: 0 },
                                                                value: '' + value,
                                                                onChange: function onChange(e) {
                                                                        e.preventDefault();e.stopPropagation();
                                                                },
                                                                onClick: onClick,
                                                                readOnly: true
                                                        }),
                                                        React.createElement(
                                                                'div',
                                                                { style: { width: 'fit-content', height: 'fit-content', padding: 5, backgroundColor: '#E9ECEFFF' }, onClick: handleSubmit },
                                                                React.createElement(HiSaveAs, { size: 25, color: 'blue' })
                                                        )
                                                );
                                        });

                                        var CustomTimeInput = useCallback(function CustomTimeInput(_ref15) {
                                                var date = _ref15.date,
                                                    value = _ref15.value,
                                                    onChange = _ref15.onChange;


                                                var validationRules = yup.object().shape({
                                                        hour: yup.number().integer().positive("L'heure est positive").min(new Date().getHours()).max(24, 'maximum 24h'),
                                                        minutes: yup.number().integer().positive("L'heure est positive").min(0).max(60, 'maximum 60mins')

                                                });

                                                var formik = useFormik({
                                                        validationSchema: validationRules,
                                                        onSubmit: handleSubmit,
                                                        initialValues: {
                                                                hour: new Date().getHours(),
                                                                minutes: 0
                                                        }
                                                });

                                                var handleBlur = function handleBlur(e) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (!formik.errors.hour && !formik.errors.minutes) {
                                                                onChange((formik.values.hour === '' ? 0 : formik.values.hour) + ':' + (formik.values.minutes === '' ? 0 : formik.values.minutes));
                                                        }
                                                };

                                                return React.createElement(
                                                        Form,
                                                        { className: 'd-flex flex-row', value: undefined, onSubmit: formik.handleSubmit },
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'mr-3 d-flex' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        { style: { margin: 0, marginRight: 5 } },
                                                                        'hh'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        style: {
                                                                                maxWidth: '35px',
                                                                                maxHeight: '20px',
                                                                                fontSize: '10px',
                                                                                padding: '2px'
                                                                        },
                                                                        maxLength: '2',
                                                                        name: 'hour',
                                                                        value: formik.values.hour,
                                                                        onChange: formik.handleChange,
                                                                        onBlur: handleBlur
                                                                        // type="number"
                                                                        , placeholder: '00',
                                                                        isInvalid: !!formik.errors.hour
                                                                })
                                                        ),
                                                        React.createElement(
                                                                Form.Group,
                                                                { className: 'd-flex' },
                                                                React.createElement(
                                                                        Form.Label,
                                                                        { style: { margin: 0, marginRight: 5 } },
                                                                        'mm'
                                                                ),
                                                                React.createElement(Form.Control, {
                                                                        style: {
                                                                                maxWidth: '35px',
                                                                                maxHeight: '20px',
                                                                                fontSize: '10px',
                                                                                padding: '2px'
                                                                        },
                                                                        maxLength: '2',
                                                                        name: 'minutes',
                                                                        value: formik.values.minutes,
                                                                        onChange: formik.handleChange,
                                                                        onBlur: handleBlur
                                                                        // type="number"
                                                                        , placeholder: '00',
                                                                        isInvalid: !!formik.errors.minutes
                                                                })
                                                        )
                                                );
                                        }, []);

                                        var _useState15 = useState(data.review_date !== null ? new Date(data.review_date) : new Date()),
                                            _useState16 = _slicedToArray(_useState15, 2),
                                            startDate = _useState16[0],
                                            setStartDate = _useState16[1];

                                        var new_review_date = startDate.getFullYear() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getDate() + ' ' + startDate.getHours() + ':' + startDate.getMinutes();
                                        console.log('new_review_date', new_review_date, e);

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        console.log('millesec dif', new Date(new_review_date).valueOf() - new Date().valueOf());

                                        var handleSubmit = function handleSubmit(e) {
                                                e.stopPropagation();

                                                Global_State.setOverlay_props(function (t) {
                                                        return Object.assign({}, t, {
                                                                style: Object.assign({}, t.style, {
                                                                        display: 'none'
                                                                })
                                                        });
                                                });

                                                console.log(new_review_date);

                                                var _Global_State$identif9 = Global_State.identifyNode(data),
                                                    _Global_State$identif10 = _slicedToArray(_Global_State$identif9, 2),
                                                    id = _Global_State$identif10[0],
                                                    model_type = _Global_State$identif10[1];

                                                var query = new FormData();
                                                query.append('id', id);
                                                query.append('update_object', 'review_date');
                                                query.append('new_value', new_review_date);
                                                query.append('additional_info', JSON.stringify({
                                                        remain_ms: '' + (new Date(new_review_date).valueOf() - new Date().valueOf())
                                                }));

                                                if (!Global_State.isEditorMode) {
                                                        var update = function () {
                                                                var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
                                                                        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                                                while (1) {
                                                                                        switch (_context7.prev = _context7.next) {
                                                                                                case 0:
                                                                                                        _context7.next = 2;
                                                                                                        return http.post('update_fnc', query).then(function (res) {
                                                                                                                console.log(res);
                                                                                                        }).catch(function (err) {
                                                                                                                console.log(err);throw err;
                                                                                                        });

                                                                                                case 2:
                                                                                                case 'end':
                                                                                                        return _context7.stop();
                                                                                        }
                                                                                }
                                                                        }, _callee7, _this);
                                                                }));

                                                                return function update() {
                                                                        return _ref16.apply(this, arguments);
                                                                };
                                                        }();

                                                        // console.log(selectedRow[0].id.substring(2))
                                                        toast.promise(update(), {
                                                                loading: 'Loading...',
                                                                success: 'Processus achevé',
                                                                error: 'err'
                                                        });
                                                } else {
                                                        Global_State.editor.fnc.update(query);
                                                }
                                        };

                                        return React.createElement(
                                                'div',
                                                { className: 'd-flex justify-content-center align-items-center',
                                                        style: {
                                                                backgroundColor: 'rgba(255,255,255,0)',
                                                                borderRadius: 10,
                                                                border: '1px solid blue',
                                                                overflow: "hidden"
                                                        }
                                                },
                                                React.createElement(
                                                        'div',
                                                        { className: 'd-flex', style: { width: "fit-content" } },
                                                        React.createElement(DatePicker, {
                                                                selected: startDate,
                                                                popperClassName: 'reactDatePickerPopper',
                                                                dateFormat: 'yyyy/MM/dd h:mm aa',
                                                                onChange: function onChange(date) {
                                                                        return setStartDate(date);
                                                                },
                                                                showYearDropdown: true,
                                                                scrollableYearDropdown: true,
                                                                showTimeInput: true,
                                                                customTimeInput: React.createElement(CustomTimeInput, null),
                                                                yearDropdownItemNumber: 20,
                                                                minDate: new Date(),
                                                                customInput: React.createElement(CustomInput, null)
                                                        })
                                                )
                                        );
                                };

                                Global_State.setOverlay_props(function (t) {
                                        return Object.assign({}, t, {
                                                style: Object.assign({}, t.style, {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                }),
                                                children: React.createElement(
                                                        'div',
                                                        {
                                                                style: {
                                                                        width: "max-content",
                                                                        marginTop: 15,
                                                                        backgroundColor: 'rgba(255,255,255,0)',
                                                                        translate: Math.abs(e.clientX - window.innerWidth / 2) + 'px ' + Math.abs(e.clientY - window.innerHeight / 2) + 'px'
                                                                },
                                                                onClick: function onClick(e) {
                                                                        e.stopPropagation();
                                                                }
                                                        },
                                                        React.createElement(Date_input, { data: data })
                                                )

                                        });
                                });
                        };

                        return React.createElement(
                                'span',
                                { className: '' + (data.review_date ? 'text-primary' : ''), onClick: handleClick },
                                value
                        );
                };

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                        for (var _iterator6 = node.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var child_node = _step6.value;

                                // console.log('child_node.id', child_node)
                                var data = child_node; // Global_State.getNodeDataById(child_node.id)
                                // if (data === null) continue
                                datas.push({
                                        id: data.id,
                                        value: data.name,
                                        level_value: data.level,
                                        name: React.createElement(NameFormater, { data: data }),
                                        level: data.type === "fnc" ? React.createElement(LevelComponent, { data: data }) : undefined,
                                        created_at: data.created_at,
                                        isClosed: data.type === "fnc" ? data.isClosed ? React.createElement(
                                                'div',
                                                { className: 'badge bg-success-bright text-success' },
                                                'Cl\xF4tur\xE9'
                                        ) : React.createElement(
                                                'div',
                                                { className: 'badge bg-danger-bright text-danger' },
                                                'Non-Cl\xF4tur\xE9'
                                        ) : undefined,
                                        RA: node.type === "root" && data.type === 'audit' ? data.ra.name.substring(0, 1) + ". " + data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " + node.ra.second_name : undefined,
                                        size: data.global_type === 'file' ? Global_State.sizeFormater(data.taille) : undefined,
                                        type: data.type,
                                        global_type: data.global_type,
                                        section_id: data.section_id,
                                        isBeingEdited: data.onEdit,
                                        review_date: data.review_date === undefined ? '' : React.createElement(ReviewDateComponenr, { data: data })

                                });
                        }
                } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                        _iterator6.return();
                                }
                        } finally {
                                if (_didIteratorError6) {
                                        throw _iteratorError6;
                                }
                        }
                }

                return datas;
        };

        // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
        var sortByName = function sortByName(rowA, rowB) {
                // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
                if (node.type === 'nonC') {
                        var _ref17 = [rowA.value.split('-'), rowB.value.split('-')],
                            listA = _ref17[0],
                            listB = _ref17[1];
                        var _ref18 = [parseInt(listA[listA.length - 1]), parseInt(listB[listB.length - 1])],
                            a = _ref18[0],
                            b = _ref18[1];


                        if (a > b) {
                                // console.log(a, " : ", b, " : ", 1)
                                return 1;
                        }

                        if (b > a) {
                                return -1;
                        }

                        return 0;
                } else {
                        var _a = rowA.value.toLowerCase();
                        var _b = rowB.value.toLowerCase();

                        if (_a > _b) {
                                // console.log(a, " : ", b, " : ", 1)
                                return 1;
                        }

                        if (_b > _a) {
                                return -1;
                        }

                        return 0;
                }
        };

        var sortByLevel = function sortByLevel(rowA, rowB) {
                var a = rowA.level_value;
                var b = rowB.level_value;

                if (a > b) {
                        // console.log(a, " : ", b, " : ", 1)
                        return 1;
                }

                if (b > a) {
                        return -1;
                }

                return 0;
        };

        var columns = useMemo(function () {
                var columns_of_the_type = void 0;

                if (node.type === "root" && contain_audit) {
                        columns_of_the_type = [{
                                name: 'NOM',
                                selector: function selector(row) {
                                        return row.name;
                                },
                                sortable: true,
                                sortFunction: sortByName
                        }, {
                                name: 'CREE LE',
                                selector: function selector(row) {
                                        return row.created_at;
                                },
                                sortable: true,
                                width: "30%"
                        }, {
                                name: 'RA',
                                selector: function selector(row) {
                                        return row.RA;
                                },
                                sortable: true,
                                width: "20%"
                        }];
                } else if (node.type === "audit") {
                        columns_of_the_type = [{
                                name: 'NOM',
                                selector: function selector(row) {
                                        return row.name;
                                },
                                sortable: true,
                                sortFunction: sortByName
                        }, {
                                name: 'RA',
                                selector: function selector(row) {
                                        return row.RA;
                                },
                                sortable: true
                        }];
                } else if (node.type === "nonC") {
                        columns_of_the_type = [{
                                name: 'NOM',
                                selector: function selector(row) {
                                        return row.name;
                                },
                                sortable: true,
                                sortFunction: sortByName
                        }, {
                                name: 'NIVEAU',
                                selector: function selector(row) {
                                        return row.level;
                                },
                                sortable: true,
                                sortFunction: sortByLevel,
                                width: "11%"
                        }, {
                                name: 'DATE DE REVISION',
                                selector: function selector(row) {
                                        return row.review_date;
                                },
                                sortable: true,
                                width: "22%"
                        }, {
                                name: 'STATUE',
                                selector: function selector(row) {
                                        return row.isClosed;
                                },
                                width: "16%"
                        }];
                } else columns_of_the_type = [{
                        name: 'NOM',
                        selector: function selector(row) {
                                return row.name;
                        },
                        sortable: true,
                        sortFunction: sortByName
                }, {
                        name: 'CREE LE',
                        selector: function selector(row) {
                                return row.created_at;
                        },
                        sortable: true
                }, {
                        name: 'TAILLE',
                        selector: function selector(row) {
                                return row.size;
                        },
                        sortable: true
                }];

                return columns_of_the_type;
        }, [node]);

        // const recherche = (value) => {
        //     setFilteringWord(value)
        //     // let matchingDatas = []
        //     // if (tag === "le Nom" && value !== "") {
        //     //     for(let data of datas)
        //     //     {
        //     //         if(data.value.indexOf(value) !== -1) matchingDatas.push(data)
        //     //     }
        //     // setVisibleData(matchingDatas)
        //     // }
        //     // else if(value === "") setVisibleData(datas)
        // }


        var formattedDatas = useMemo(function () {
                return dataFormater(node);
        }, [node, selectedRow]);

        var reducer = function reducer(state, action) {
                switch (action.type) {
                        case "toggleSelection":
                                // console.log('toggleSelection')
                                return state.map(function (node) {
                                        if (action.nodeIds.indexOf(node.id) !== -1) return Object.assign({}, node, { isSelected: true });else return Object.assign({}, node, { isSelected: false });
                                });
                        case 'nodeUpdate':
                                return action.newDatas;
                        default:
                                return state;
                }
        };

        // initDatas is always up to date
        var initDatas = formattedDatas.map(function (node) {
                return Object.assign({}, node, { isSelected: false });
        });

        var _useReducer = useReducer(reducer, initDatas),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            datas = _useReducer2[0],
            dispatch = _useReducer2[1];

        useEffect(function () {
                Global_State.EventsManager.emit('clearSelected');
        }, [node]);

        useEffect(function () {
                dispatch({ type: 'nodeUpdate', newDatas: initDatas });
        }, [formattedDatas]);

        // const [visibleData, setVisibleData] = useState(datas)


        // useEffect(
        //     () => {setVisibleData(datas)}, [datas]
        // )


        console.log('contentRender');

        var handleChange = function handleChange(selectedCount, selectedRows) {
                var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                // console.log(justChecking.current)
                if (!justChecking.current && !update) {
                        setNumber(selectedCount);
                        setSelectedRows(selectedRows);

                        // console.log('noAdd')
                        // const ids = selectedRows.map( row => row.id )
                        // console.log(ids)
                        // dispatch({type: 'toggleSelection', nodeIds: ids })
                } else if (!justChecking.current && update) {
                        setSelectedRows(function (t) {
                                var idx = -1;
                                t.forEach(function (row) {
                                        if (row.id === selectedRows[0].id) idx = t.indexOf(row);
                                });
                                if (idx === -1) t.push(selectedRows[0]);else t.splice(idx, 1);

                                return t.slice(0);
                        });
                        // console.log(selectedRowNumber, selectedRow.length, selectedRow)
                        setNumber(selectedRow.length);

                        // console.log('Add')

                }
                justChecking.current = false;
        };

        useEffect(function () {
                // console.log(selectedRow)
                // console.log('ctrlKey', selectedRow, selectedRow.length)
                var ids = selectedRow.map(function (row) {
                        return row.id;
                });
                // console.log(ids)
                dispatch({ type: 'toggleSelection', nodeIds: ids });
        }, [selectedRow]);

        var onRowDoubleClicked = function onRowDoubleClicked(row, event) {
                Global_State.backend.setCurrentSelectedFolder(row.id);
                // console.log('dbclick',row)
        };

        var handleClick = function handleClick(row, event) {
                // console.log(row.id, event);

                event.preventDefault();event.stopPropagation();
                if (event.ctrlKey || event.altKey || event.shiftKey) handleChange(1, [row], true);else handleChange(1, [row]);

                // selectedRowsByClick.current = [row]
        };

        var rowsStyles = [{
                when: function when(row) {
                        return row.isBeingEdited;
                },
                style: {
                        borderLeft: 'solid',
                        borderRight: 'solid',
                        borderRightColor: 'blue',
                        borderLeftColor: 'blue',
                        borderLeftWidth: '2px',
                        borderRightWidth: '2px',
                        borderRadius: '4px'
                        // borderTopWidth: '0px',
                        // borderBottomWidth: '0px',
                }
        }];

        var SubHeaderComponent = useCallback(function SubHeaderComponent(_ref19) {
                var set = _ref19.set,
                    filter = _ref19.filter,
                    node = _ref19.node;


                var FilterComponent = useCallback(function FilterComponent(_ref20) {
                        var set = _ref20.set,
                            filter = _ref20.filter;

                        switch (filter.tag) {
                                case 'la Date de creation':
                                        {
                                                var _filter$element = _slicedToArray(filter.element, 2),
                                                    startDate = _filter$element[0],
                                                    endDate = _filter$element[1];

                                                return React.createElement(
                                                        'div',
                                                        { style: { maxWidth: 243 } },
                                                        React.createElement(
                                                                'label',
                                                                null,
                                                                'Chercher selon ',
                                                                filter.tag,
                                                                ' :'
                                                        ),
                                                        React.createElement(DatePicker, {
                                                                selectsRange: true,
                                                                startDate: startDate,
                                                                endDate: endDate,
                                                                popperClassName: 'reactDatePickerPopper',
                                                                onChange: function onChange(update) {
                                                                        // const now = new Date()
                                                                        // console.log(update[0].valueOf(), update[0].getMonth()+1, update[0].getFullYear())
                                                                        set(function (t) {
                                                                                return Object.assign({}, t, { element: update });
                                                                        });
                                                                },
                                                                isClearable: true,
                                                                showYearDropdown: true,
                                                                scrollableYearDropdown: true,
                                                                yearDropdownItemNumber: 1000,
                                                                minDate: new Date("2021/12/31"),
                                                                customInput: React.createElement('input', { className: 'form-control form-control-sm mr-15', value: startDate + ' - ' + endDate })

                                                        })
                                                );
                                        }
                                case 'la Date de revision':
                                        {
                                                var _filter$element2 = _slicedToArray(filter.element, 2),
                                                    _startDate = _filter$element2[0],
                                                    _endDate = _filter$element2[1];

                                                return React.createElement(
                                                        'div',
                                                        { style: { maxWidth: 243 } },
                                                        React.createElement(
                                                                'label',
                                                                null,
                                                                'Chercher selon ',
                                                                filter.tag,
                                                                ' :'
                                                        ),
                                                        React.createElement(DatePicker, {
                                                                selectsRange: true,
                                                                startDate: _startDate,
                                                                endDate: _endDate,
                                                                popperClassName: 'reactDatePickerPopper',
                                                                onChange: function onChange(update) {
                                                                        // const now = new Date()
                                                                        // console.log(update[0].valueOf(), update[0].getMonth()+1, update[0].getFullYear())
                                                                        set(function (t) {
                                                                                return Object.assign({}, t, { element: update });
                                                                        });
                                                                },
                                                                isClearable: true,
                                                                showYearDropdown: true,
                                                                scrollableYearDropdown: true,
                                                                yearDropdownItemNumber: 1000,
                                                                minDate: new Date("2021/12/31"),
                                                                customInput: React.createElement('input', { className: 'form-control form-control-sm mr-15', value: _startDate + ' - ' + _endDate })

                                                        })
                                                );
                                        }

                                default:
                                        return React.createElement(
                                                'div',
                                                null,
                                                React.createElement(
                                                        'label',
                                                        null,
                                                        'Chercher selon ',
                                                        filter.tag,
                                                        ' :'
                                                ),
                                                React.createElement('input', { onChange: function onChange(e) {
                                                                set(function (t) {
                                                                        return Object.assign({}, t, { element: e.target.value });
                                                                });
                                                        }, value: filter.element, type: 'search', className: 'form-control form-control-sm', placeholder: '', 'aria-controls': 'table-files' })
                                        );
                        }
                }, []);

                return React.createElement(
                        'div',
                        { className: 'd-flex flex-row align-items-end' },
                        React.createElement(Paste_component, null),
                        React.createElement(
                                IconButton,
                                { style: { marginRight: 20 },
                                        disabled: node.isRoot,
                                        onClick: function onClick(e) {
                                                e.preventDefault();Global_State.backend.setCurrentSelectedFolder(previousSelected.pop());
                                        }
                                },
                                node.isRoot ? React.createElement(IoArrowUndoOutline, { size: 25 }) : React.createElement(IoArrowUndoSharp, { size: 25, color: "black" })
                        ),
                        React.createElement(FilterComponent, { set: set, filter: filter, node: node })
                );
        }, [node, mc_state]);

        var filtered_datas = useMemo(function () {
                return datas.filter(function (row) {
                        switch (filter.tag) {
                                case 'le Nom':
                                        return row.value.indexOf(filter.element) !== -1;
                                case 'la Date de creation':
                                        {
                                                // console.log(new Date(row.created_at.substring(0, 10).split('-').join('/')).valueOf())

                                                var creation_string_date = row.created_at.substring(0, 10);
                                                var formated_creation_string_date = creation_string_date.split('-').join('/');

                                                var creation_date = new Date(formated_creation_string_date);

                                                var _filter$element3 = _slicedToArray(filter.element, 2),
                                                    debut = _filter$element3[0],
                                                    fin = _filter$element3[1];

                                                if (debut === null && fin === null) return true;else {
                                                        if (debut === null) {
                                                                return creation_date.valueOf() <= fin.valueOf();
                                                        } else if (fin === null) {
                                                                return creation_date.valueOf() >= debut.valueOf();
                                                        } else {
                                                                // console.log(debut.valueOf(), fin.valueOf(), creation_date.valueOf(), (creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf()) )
                                                                return creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf();
                                                        }
                                                }
                                        }
                                case 'le RA':
                                        if (row.RA) return row.RA.indexOf(filter.element) !== -1;else return false;
                                case 'la Date de revision':
                                        {
                                                // console.log(new Date(row.created_at.substring(0, 10).split('-').join('/')).valueOf())

                                                var data = Global_State.getNodeDataById(row.id);

                                                var _filter$element4 = _slicedToArray(filter.element, 2),
                                                    _debut = _filter$element4[0],
                                                    _fin = _filter$element4[1];

                                                if (_debut === null && _fin === null) return true;else if (data.review_date !== undefined) {

                                                        var revision_string_date = data.review_date.substring(0, 10);
                                                        var formatted_revision_string_date = revision_string_date.split('-').join('/');

                                                        var revision_date = new Date(formatted_revision_string_date);

                                                        console.log('review_daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate', revision_date.toString());
                                                        if (_debut === null) {
                                                                return revision_date.valueOf() <= _fin.valueOf();
                                                        } else if (_fin === null) {
                                                                return revision_date.valueOf() >= _debut.valueOf();
                                                        } else {
                                                                // console.log(debut.valueOf(), fin.valueOf(), creation_date.valueOf(), (creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf()) )
                                                                return revision_date.valueOf() >= _debut.valueOf() && revision_date.valueOf() <= _fin.valueOf();
                                                        }
                                                } else return false;
                                        }

                        }
                });
        }, [datas, filter]);

        console.log('dataaaaaaas', datas);

        return React.createElement(
                'div',
                { className: 'col-xl-8' },
                React.createElement(
                        'div',
                        { className: 'content-title mt-0' },
                        React.createElement(
                                'h4',
                                null,
                                node.name
                        )
                ),
                React.createElement(ActionsMenu, null),
                React.createElement(DataTable, {
                        columns: columns,
                        data: filtered_datas,

                        selectableRows: true,
                        selectableRowsVisibleOnly: true,
                        selectableRowsHighlight: true
                        // selectableRowsComponent={Checkbox}
                        // selectableRowsComponentProps={selectableRowsComponentProps}
                        , selectableRowSelected: function selectableRowSelected(row) {
                                justChecking.current = true; /* console.log('selectableRowSelected'); */return row.isSelected;
                        },
                        onSelectedRowsChange: function onSelectedRowsChange(_ref21) {
                                var selectedCount = _ref21.selectedCount,
                                    selectedRows = _ref21.selectedRows;
                                if (filtered_datas.length > 0) handleChange(selectedCount, selectedRows);
                        },
                        clearSelectedRows: Global_State.toggleCleared,
                        onRowDoubleClicked: onRowDoubleClicked,
                        onRowClicked: handleClick
                        // onContextMenu={(event) => { console.log(event) }}

                        , paginationRowsPerPageOptions: [15, 25, 50, 100, 200],
                        pagination: true,
                        paginationComponentOptions: {
                                rowsPerPageText: 'element par page:',
                                rangeSeparatorText: 'de',
                                noRowsPerPage: false,
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'Tout'
                        },
                        theme: 'default',
                        conditionalRowStyles: rowsStyles,
                        fixedHeader: true,
                        fixedHeaderScrollHeight: '100vh',
                        pointerOnHover: true,
                        highlightOnHover: true,
                        persistTableHead: true,
                        noHeader: true,
                        subHeader: true,
                        subHeaderComponent: React.createElement(SubHeaderComponent, { set: setFilter, filter: filter, node: node }),
                        noDataComponent: React.createElement(
                                'div',
                                { style: { textAlign: "center", marginTop: 100 } },
                                ' Vide \uD83D\uDE22 '
                        ),
                        sortIcon: React.createElement(FaSort, { size: 10 }),
                        defaultSortFieldId: 1
                })
        );
}