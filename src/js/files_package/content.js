import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/first */

import React, { useMemo, useState, useReducer, useEffect, useRef } from 'react';

import { backend } from "./files";
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

import Checkbox from "@mui/material/Checkbox";

import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { data, event } from 'jquery';

var previousSelected = [];

var SearchComponent = function SearchComponent(_ref) {
    var set = _ref.set,
        tag = _ref.tag,
        node = _ref.node;


    return React.createElement(
        'div',
        null,
        node.isRoot ? React.createElement(IoArrowUndoOutline, { size: 25, style: { marginRight: 20 } }) : React.createElement(IoArrowUndoSharp, { onClick: function onClick(e) {
                e.preventDefault();backend.setCurrentSelectedFolder(previousSelected.pop());
            }, size: 25, style: { marginRight: 20 } }),
        React.createElement(
            'label',
            null,
            'Chercher selon ',
            tag,
            ' :',
            React.createElement('input', { onChange: function onChange(e) {
                    set(e.target.value);
                }, type: 'search', className: 'form-control form-control-sm', placeholder: '', 'aria-controls': 'table-files' })
        )
    );
};

function Files_Dropzone(props) {
    var _this2 = this;

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

    var CustomDiv = function CustomDiv(_ref2) {
        var children = _ref2.children;

        var _useState = useState(children[0]),
            _useState2 = _slicedToArray(_useState, 2),
            html = _useState2[0],
            setHtml = _useState2[1];

        var ContentEditable = function (_React$Component) {
            _inherits(ContentEditable, _React$Component);

            function ContentEditable() {
                _classCallCheck(this, ContentEditable);

                return _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).apply(this, arguments));
            }

            _createClass(ContentEditable, [{
                key: 'render',
                value: function render() {
                    return React.createElement('div', {
                        onInput: this.emitChange,
                        onBlur: this.emitChange,
                        contentEditable: true,
                        dangerouslySetInnerHTML: { __html: this.props.html } });
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return nextProps.html !== this.getDOMNode().innerHTML;
                }
            }, {
                key: 'emitChange',
                value: function emitChange() {
                    var html = this.getDOMNode().innerHTML;
                    if (this.props.onChange && html !== this.lastHtml) {

                        this.props.onChange({
                            target: {
                                value: html
                            }
                        });
                    }
                    this.lastHtml = html;
                }
            }]);

            return ContentEditable;
        }(React.Component);

        ;

        var handleChange = function (event) {
            this.setHtml(event.target.value);
        }.bind(_this2);

        return React.createElement(ContentEditable, { html: html, onChange: handleChange });
    };

    var _useState3 = useState(acceptedFiles.map(function (file) {
        return { file: file, customName: file.name };
    })),
        _useState4 = _slicedToArray(_useState3, 2),
        filesObjects = _useState4[0],
        set = _useState4[1];

    useEffect(function () {
        set(acceptedFiles.map(function (file) {
            return { file: file, customName: file.name };
        }));
    }, [acceptedFiles]);

    var files = filesObjects.map(function (fileObject) {
        var part_name = JSON.parse(JSON.stringify(fileObject.file.name.split('.')));
        var name = part_name.splice(0, part_name.length - 1).join('.');
        var ext = part_name[0];
        return React.createElement(
            'div',
            { key: name },
            React.createElement('input', { key: fileObject.file.path, style: { border: 'none', width: '50%' }, placeholder: name, onChange: function onChange(e) {
                    e.preventDefault();fileObject.customName = e.target.value + '.' + ext;set(filesObjects);
                } }),
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
                files
            )
        )
    );
}

// let handleChange


export default function FileTable(_ref3) {
    var _this3 = this;

    var set = _ref3.set;


    var node = backend.selectedNode.model;

    var tag = "le Nom";

    // const [previousSelected, setPreviousSelected] = useState([0])

    previousSelected = useMemo(function () {
        previousSelected.push(node.parentId);return previousSelected;
    }, [node]);

    var _useState5 = useState(""),
        _useState6 = _slicedToArray(_useState5, 2),
        filteringWord = _useState6[0],
        setFilteringWord = _useState6[1];

    var _useState7 = useState(0),
        _useState8 = _slicedToArray(_useState7, 2),
        selectedRowNumber = _useState8[0],
        setNumber = _useState8[1];

    var _useState9 = useState([]),
        _useState10 = _slicedToArray(_useState9, 2),
        selectedRow = _useState10[0],
        setSelectedRows = _useState10[1];

    var selectedRowsByClick = useRef([]);
    var justChecking = useRef(false);

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
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(data);_context.next = 3;
                                return Global_State.setSectionId(data.section_id);

                            case 3:
                                backend.setCurrentSelectedFolder(data.id);
                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this3);
            }));

            return function (_x) {
                return _ref4.apply(this, arguments);
            };
        }());
        return function () {
            Global_State.EventsManager.off('clearSelected');
            Global_State.EventsManager.off('setSelectedNode');
        };
    }, []);

    function add(thing_to_add) {
        // filtre de service
        var canAddToService = function canAddToService(authService) {
            var services = node.isRoot ? Global_State.getCurrentSection().services : node.services;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = services[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elementService = _step.value;

                    // console.log(authService.id, elementService.id)
                    if (authService.id === parseInt(elementService.id)) return true;
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
        var SelectServices = function SelectServices(_ref5) {
            var updateMethod = _ref5.updateMethod;

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
                        console.log('editorHandle');
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
                            }
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
                        console.log('editorHandle');
                        Global_State.editor.add_folder(queryBody);

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
                            Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                        });
                    } else {
                        console.log('editorHandle');
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
                    level: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").max(2, "Niveau invalide").min(1, "Niveau invalide"),
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
                        console.log('editorHandle');
                    }

                    // console.log(queryBody.get("name"))
                };

                var _useState15 = useState(1),
                    _useState16 = _slicedToArray(_useState15, 2),
                    min = _useState16[0],
                    setMin = _useState16[1];

                var _useState17 = useState(false),
                    _useState18 = _slicedToArray(_useState17, 2),
                    enableEnd = _useState18[0],
                    setEndState = _useState18[1];

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
            'i',
            { key: "add_folder", className: 'dropdown-item', onClick: function onClick() {
                    add("add_folder");
                } },
            'Nouveau Dossier'
        ), React.createElement(
            'i',
            { key: "add_files", className: 'dropdown-item', onClick: function onClick() {
                    add("add_files");
                } },
            'Ajouter des fichiers'
        )]);
        if (node.type === "root" && /^Audit(( \b\w*\b)|)$/.test(Global_State.getCurrentSection().name)) buttons.push(React.createElement(
            'i',
            { key: "add_audit", className: 'dropdown-item', onClick: function onClick() {
                    add("add_audit");
                } },
            'Nouvel Audit'
        ));
        if (node.type === "nonC") buttons.push(React.createElement(
            'i',
            { key: "add_fncs", className: 'dropdown-item', onClick: function onClick() {
                    add("add_fncs");
                } },
            'G\xE9n\xE9rer des Non-Conformit\xE9s'
        ));

        return React.createElement(
            'div',
            { className: 'd-md-flex justify-content-between mb-4' },
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
                            'i',
                            { className: 'dropdown-item' },
                            'Partager'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'T\xE9l\xE9charger'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'Copier vers'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'D\xE9placer vers'
                        ),
                        selectedRowNumber === 1 ? React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'Renommer'
                        ) : null,
                        React.createElement(
                            'i',
                            { className: 'dropdown-item', onClick: function onClick(e) {
                                    // http.delete("")

                                    var remove = function () {
                                        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                                            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.next = 2;
                                                            return Promise.all(selectedRow.map(function () {
                                                                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(row) {
                                                                    var nodeIdentity;
                                                                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                        while (1) {
                                                                            switch (_context2.prev = _context2.next) {
                                                                                case 0:
                                                                                    // console.log(Global_State.identifyNode(row))
                                                                                    nodeIdentity = Global_State.identifyNode(row);
                                                                                    // const [ id, type ] = Global_State.identifyNode(row)

                                                                                    console.log(selectedRow);
                                                                                    _context2.t0 = row.type;
                                                                                    _context2.next = _context2.t0 === 'audit' ? 5 : _context2.t0 === 'checkList' ? 8 : _context2.t0 === 'dp' ? 9 : _context2.t0 === 'nonC' ? 10 : _context2.t0 === 'fnc' ? 11 : _context2.t0 === 'ds' ? 14 : _context2.t0 === 'f' ? 17 : 20;
                                                                                    break;

                                                                                case 5:
                                                                                    _context2.next = 7;
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
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 8:
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 9:
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 10:
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 11:
                                                                                    _context2.next = 13;
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
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 14:
                                                                                    _context2.next = 16;
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
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 17:
                                                                                    _context2.next = 19;
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
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 20:
                                                                                    return _context2.abrupt('break', 21);

                                                                                case 21:
                                                                                case 'end':
                                                                                    return _context2.stop();
                                                                            }
                                                                        }
                                                                    }, _callee2, _this3);
                                                                }));

                                                                return function (_x2) {
                                                                    return _ref7.apply(this, arguments);
                                                                };
                                                            }()

                                                            // return 0;

                                                            ));

                                                        case 2:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this3);
                                        }));

                                        return function remove() {
                                            return _ref6.apply(this, arguments);
                                        };
                                    }();

                                    // console.log(selectedRow[0].id.substring(2))
                                    toast.promise(remove(), {
                                        loading: 'Loading...',
                                        success: 'Processus achevé',
                                        error: 'err'
                                    });
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
                            'i',
                            { className: 'dropdown-item' },
                            'Nom'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'Date de Creation'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
                            'Date de Revision'
                        ),
                        React.createElement(
                            'i',
                            { className: 'dropdown-item' },
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = img[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var imgExt = _step2.value;

                    if (imgExt === ext) return "img";
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = vid[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var vidExt = _step3.value;

                    if (vidExt === ext) return "vid";
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

            return ext;
        }

        function TypeIcon(props) {
            var _ref8 = [props.data, props.iconSize],
                data = _ref8[0],
                iconSize = _ref8[1];

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
                            }, style: { width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }, src: data.url });
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
                                Global_State.modalManager.setContent(React.createElement(
                                    'div',
                                    { style: {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            alignItems: 'center'
                                        } },
                                    React.createElement('embed', { src: data.url + "#toolbar=0&navpanes=0&scrollbar=0", width: 900, height: 400, type: 'application/pdf' })
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
                Object.assign({ id: props.data.id, ref: div, className: 'd-flex justify-content-center align-items-center', style: { height: '100%', width: '100%' } }, props),
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

        var LevelComponent = function LevelComponent(_ref9) {
            var data = _ref9.data;

            // const [niv, setNiv] = useState(level)

            var level = data.level;

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
                        break;
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
                var _this4 = this;

                console.log(level);
                var node = Global_State.getNodeDataById(data.id);

                var _Global_State$identif7 = Global_State.identifyNode(node),
                    _Global_State$identif8 = _slicedToArray(_Global_State$identif7, 2),
                    id = _Global_State$identif8[0],
                    lol = _Global_State$identif8[1];
                // Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})


                var update = function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                        var query;
                        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        query = new FormData();

                                        query.append('id', id);
                                        query.append('update_object', 'level');
                                        query.append('new_value', nextNiv(level));

                                        _context4.next = 6;
                                        return http.post('update_fnc', query).then(function (res) {
                                            console.log(res);
                                        }).catch(function (err) {
                                            console.log(err);throw err;
                                        });

                                    case 6:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this4);
                    }));

                    return function update() {
                        return _ref10.apply(this, arguments);
                    };
                }();

                // console.log(selectedRow[0].id.substring(2))
                toast.promise(update(), {
                    loading: 'Loading...',
                    success: 'Processus achevé',
                    error: 'err'
                });
            }

            return React.createElement(
                'div',
                { className: class_name, onClick: handleClick },
                level
            );
        };

        var _loop = function _loop(_data) {
            datas.push({
                id: _data.id,
                value: _data.name,
                level_value: _data.level,
                name: React.createElement(NameFormater, { data: _data, onClick: function onClick(e) {
                        console.log('nameClicked');handleClick({ id: _data.id, name: _data.name }, e);
                    } }),
                level: _data.type === "fnc" ? React.createElement(LevelComponent, { data: _data }) : undefined,
                created_at: _data.created_at,
                isClosed: _data.type === "fnc" ? _data.isClosed ? React.createElement(
                    'div',
                    { className: 'badge bg-success-bright text-success' },
                    'Cl\xF4tur\xE9'
                ) : React.createElement(
                    'div',
                    { 'class': 'badge bg-danger-bright text-danger' },
                    'Non-Cl\xF4tur\xE9'
                ) : undefined,
                RA: node.type === "root" && _data.type === 'audit' ? _data.ra.name.substring(0, 1) + ". " + _data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " + node.ra.second_name : undefined,
                size: _data.global_type === 'file' ? Global_State.sizeFormater(_data.taille) : undefined,
                type: _data.type,
                global_type: _data.global_type,
                section_id: _data.section_id

            });
        };

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = node.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _data = _step4.value;

                _loop(_data);
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

        return datas;
    };

    // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
    var sortByName = function sortByName(rowA, rowB) {
        // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
        if (node.type === 'nonC') {
            var _ref11 = [rowA.value.split('-'), rowB.value.split('-')],
                listA = _ref11[0],
                listB = _ref11[1];
            var _ref12 = [parseInt(listA[listA.length - 1]), parseInt(listB[listB.length - 1])],
                a = _ref12[0],
                b = _ref12[1];


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

        if (node.type === "root" && Global_State.getCurrentSection().name === 'Audit') {
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
                name: 'CREE LE',
                selector: function selector(row) {
                    return row.created_at;
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
        backend.setCurrentSelectedFolder(row.id);
        // console.log('dbclick',row)
    };

    var handleClick = function handleClick(row, event) {
        // console.log(row.id, event); 
        if (event.ctrlKey || event.altKey || event.shiftKey) handleChange(1, [row], true);else handleChange(1, [row]);
        // selectedRowsByClick.current = [row]
    };

    var isIndeterminate = function isIndeterminate(indeterminate) {
        return indeterminate;
    };
    var selectableRowsComponentProps = { onclick: function onclick(e) {
            console.log(e);
        } };

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
            data: datas.filter(function (data) {
                // console.log(filteringWord)
                if (filteringWord !== "") return data.value.toLowerCase().indexOf(filteringWord) !== -1 || data.value.toUpperCase().indexOf(filteringWord) !== -1 ? true : false;else return true;
            }).map(function (data) {
                return data;
            }),

            selectableRows: true,
            selectableRowsVisibleOnly: true,
            selectableRowsHighlight: true
            // selectableRowsComponent={Checkbox}
            // selectableRowsComponentProps={selectableRowsComponentProps}
            , selectableRowSelected: function selectableRowSelected(row) {
                justChecking.current = true; /* console.log('selectableRowSelected'); */return row.isSelected;
            },
            onSelectedRowsChange: function onSelectedRowsChange(_ref13) {
                var selectedCount = _ref13.selectedCount,
                    selectedRows = _ref13.selectedRows;
                if (datas.length > 0) handleChange(selectedCount, selectedRows);
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
            fixedHeader: true,
            fixedHeaderScrollHeight: '100vh',
            pointerOnHover: true,
            highlightOnHover: true,
            persistTableHead: true,
            noHeader: true,
            subHeader: true,
            subHeaderComponent: React.createElement(SearchComponent, { set: setFilteringWord, tag: tag, node: node }),
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