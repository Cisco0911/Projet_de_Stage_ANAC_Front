import _regeneratorRuntime from 'babel-runtime/regenerator';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable import/first */

import React, { forwardRef, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { http } from "../auth/login";

import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import toast from "react-hot-toast";
import { useDropzone } from 'react-dropzone';

import Select from "react-select";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import { FaInfoCircle, FaPaste, FaSort } from "react-icons/fa";
import { FcFolder, FcVideoFile } from "react-icons/fc";
import { BsFillFileEarmarkPdfFill, BsPatchCheckFill } from "react-icons/bs";
import { RiFileWord2Fill, RiDeleteBin2Fill, RiUploadCloud2Fill } from "react-icons/ri";
import { SiMicrosoftexcel, SiMicrosoftpowerpoint } from "react-icons/si";
import { AiFillFileUnknown, AiFillCloseCircle } from "react-icons/ai";
import { IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoAdd } from "react-icons/io5";
import { IoIosCut } from "react-icons/io";
import { HiSaveAs } from 'react-icons/hi';
import { BiRename } from "react-icons/bi";
import { VscLiveShare, VscCircleLargeOutline } from "react-icons/vsc";
import { ImDownload2 } from "react-icons/im";
import { MdUndo, MdRedo } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useFormik } from 'formik';
import * as yup from 'yup';

import DatePicker, { CalendarContainer } from "react-datepicker";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Tooltip } from "@mui/material";
import MuiSelect from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useSpring, animated } from 'react-spring';
import { Dropdown, FormCheck } from "react-bootstrap";
import useCustomCheckBox, { CheckBox1 } from "../custom_checkBox/custom_check";
import { LoadingButton } from "@mui/lab";
import { createPortal } from "react-dom";

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

function FilterComponent(_ref) {
        var set = _ref.set,
            filter = _ref.filter,
            node = _ref.node;

        var compenent = void 0;

        var MyContainer = function MyContainer(_ref2) {
                var className = _ref2.className,
                    children = _ref2.children;

                return (
                        // <CalendarContainer className={className}
                        //                    style={{
                        //                            border: "thin solid blue"
                        //                    }}
                        // >
                        //         <div style={{ position: "relative" }}>{children}</div>
                        // </CalendarContainer>
                        React.createElement(
                                'div',
                                {
                                        style: {
                                                position: "relative",
                                                border: "thin solid blue",
                                                borderRadius: "0.3rem",
                                                backgroundColor: "white",
                                                display: 'flex'
                                        }
                                },
                                children
                        )
                );
        };

        switch (filter.tag) {
                case 'la Date de creation':
                        {
                                var _filter$element = _slicedToArray(filter.element, 2),
                                    startDate = _filter$element[0],
                                    endDate = _filter$element[1];

                                compenent = React.createElement(
                                        'div',
                                        { className: 'full_size_element filter_by_date_component' },
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
                                                showMonthDropdown: true,
                                                showYearDropdown: true,
                                                yearDropdownItemNumber: 1000,
                                                yearItemNumber: 9,
                                                dropdownMode: 'select',
                                                minDate: new Date("2021/12/31"),
                                                customInput: React.createElement('input', { className: 'form-control form-control-sm full_size_element', value: startDate + ' - ' + endDate }),
                                                calendarContainer: MyContainer
                                        })
                                );

                                break;
                        }
                case 'la Date de revision':
                        {
                                var _filter$element2 = _slicedToArray(filter.element, 2),
                                    _startDate = _filter$element2[0],
                                    _endDate = _filter$element2[1];

                                compenent = React.createElement(
                                        'div',
                                        { className: 'full_size_element filter_by_date_component' },
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
                                                showMonthDropdown: true,
                                                showYearDropdown: true,
                                                yearDropdownItemNumber: 1000,
                                                yearItemNumber: 9,
                                                dropdownMode: 'select',
                                                scrollableYearDropdown: true,
                                                minDate: new Date("2021/12/31"),
                                                customInput: React.createElement('input', { className: 'form-control form-control-sm full_size_element', value: _startDate + ' - ' + _endDate }),
                                                calendarContainer: MyContainer
                                        })
                                );

                                break;
                        }

                default:
                        compenent = React.createElement(
                                'div',
                                { className: 'full_size_element' },
                                React.createElement('input', { onChange: function onChange(e) {
                                                set(function (t) {
                                                        return Object.assign({}, t, { element: e.target.value });
                                                });
                                        }, value: filter.element, type: 'search', className: 'full_size_element form-control form-control-sm', placeholder: '', 'aria-controls': 'table-files' })
                        );

                        break;
        }

        var update_tag = function update_tag(event) {
                var value = event.target.value;

                switch (value) {
                        case "le Nom":
                                set({ tag: 'le Nom', element: '' });
                                break;
                        case "la Date de creation":
                                set({ tag: 'la Date de creation', element: [null, null] });
                                break;
                        case "la Date de revision":
                                set({ tag: 'la Date de revision', element: [null, null] });
                                break;
                        case "le RA":
                                set({ tag: 'le RA', element: '' });
                                break;
                }
        };

        var contain_audit = node.type === "root" && /^(Audit|AUDIT)(( \b\w*\b)|)$/.test(window.Global_State.getCurrentSection().name);

        return React.createElement(
                'div',
                { id: 'file_table_filter_component', className: 'full_size_element' },
                React.createElement(
                        'div',
                        {
                                style: {
                                        // width: filter.element.constructor === Array ? "74%" : "86%"
                                        marginRight: 10,
                                        width: "100%",
                                        flex: "1 0 60%"
                                }
                        },
                        compenent
                ),
                React.createElement(
                        'div',
                        {
                                style: {}
                        },
                        React.createElement(
                                Tooltip,
                                { title: "TAG RESEARCH", placement: 'top-start' },
                                React.createElement(
                                        Box,
                                        null,
                                        React.createElement(
                                                FormControl,
                                                { size: 'small' },
                                                React.createElement(
                                                        MuiSelect,
                                                        {
                                                                labelId: 'tag_select_label',
                                                                id: 'tag_select',
                                                                value: filter.tag,
                                                                renderValue: function renderValue(value) {
                                                                        return window.innerWidth > 576 ? value : '';
                                                                }
                                                                // label="Tag"
                                                                , onChange: update_tag
                                                        },
                                                        React.createElement(
                                                                MenuItem,
                                                                { value: "le Nom" },
                                                                'Nom'
                                                        ),
                                                        React.createElement(
                                                                MenuItem,
                                                                { value: "la Date de creation" },
                                                                'Date de creation'
                                                        ),
                                                        React.createElement(
                                                                MenuItem,
                                                                { disabled: node.type !== 'nonC', value: "la Date de revision" },
                                                                'Date de revision'
                                                        ),
                                                        React.createElement(
                                                                MenuItem,
                                                                { disabled: !contain_audit, value: "le RA" },
                                                                'RA'
                                                        )
                                                )
                                        )
                                )
                        )
                )
        );
}

function ClimbTree(_ref3) {
        var node = _ref3.node;


        var parent = window.Global_State.getNodeDataById(node.parentId);

        return React.createElement(
                'div',
                { className: 'd-flex flex-row align-items-end' },
                parent ? React.createElement(
                        Tooltip,
                        { title: 'Remonter vers ' + parent.name, placement: "top-start" },
                        React.createElement(
                                IconButton,
                                {
                                        onClick: function onClick(e) {
                                                e.preventDefault();

                                                var tree_row = document.getElementById('treeRow-' + node.id);

                                                if (tree_row) {
                                                        var doubleClickEvent = new MouseEvent("dblclick", {
                                                                view: window,
                                                                bubbles: true,
                                                                cancelable: true
                                                        });
                                                        doubleClickEvent.is_opening = false;

                                                        tree_row.dispatchEvent(doubleClickEvent);
                                                }

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.backend.setCurrentSelectedFolder(parent.id);
                                        }
                                },
                                React.createElement(IoArrowUpCircleSharp, { size: 25, color: "black" })
                        )
                ) : React.createElement(
                        IconButton,
                        { disabled: true },
                        React.createElement(IoArrowUpCircleOutline, { size: 25 })
                )
        );
}

function Prev() {

        var prev = [].concat(_toConsumableArray(window.Global_State.backend.prev));

        var prev_id = prev.pop();

        // console.log('prrrrrrreeeeeeeeeeev', prev_id, prev)

        return React.createElement(
                'div',
                { className: 'd-flex flex-row align-items-end' },
                prev_id ? React.createElement(
                        Tooltip,
                        { title: 'Retour', placement: "top-start" },
                        React.createElement(
                                IconButton,
                                {
                                        onClick: function onClick(e) {
                                                e.preventDefault();

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.EventsManager.emit("prev");
                                        }
                                },
                                React.createElement(ArrowLeftIcon, { size: 25, color: "action", style: { color: "black" } })
                        )
                ) : React.createElement(
                        IconButton,
                        { disabled: true },
                        React.createElement(ArrowLeftIcon, { size: 25 })
                )
        );
}

function Next() {

        var next = [].concat(_toConsumableArray(window.Global_State.backend.next));

        var next_id = next.pop();

        return React.createElement(
                'div',
                { className: 'd-flex flex-row align-items-end' },
                next_id ? React.createElement(
                        Tooltip,
                        { title: 'Suivant', placement: "top-start" },
                        React.createElement(
                                IconButton,
                                {
                                        onClick: function onClick(e) {
                                                e.preventDefault();

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.EventsManager.emit("next");
                                        }
                                },
                                React.createElement(ArrowRightIcon, { size: 25, color: "action", style: { color: "black" } })
                        )
                ) : React.createElement(
                        IconButton,
                        { disabled: true },
                        React.createElement(ArrowRightIcon, { size: 25 })
                )
        );
}

var SelectComponent = function SelectComponent(_ref4) {
        var updateMethod = _ref4.updateMethod,
            options = _ref4.options,
            placeholder = _ref4.placeholder;

        // console.log(servicesList)
        // console.log(options)

        return React.createElement(Select, {
                onChange: updateMethod,
                options: options,
                defaultValue: options.slice(0, 1),
                isMulti: true,
                placeholder: placeholder,
                closeMenuOnSelect: false,
                components: makeAnimated(),
                isDisabled: options.length === 1

        });
};

var AsyncUsersSelectComponent = function AsyncUsersSelectComponent(_ref5) {
        var areFixed = _ref5.areFixed,
            updateMethod = _ref5.updateMethod,
            filter = _ref5.filter,
            placeholder = _ref5.placeholder;

        var styles = {
                multiValue: function multiValue(base, state) {
                        return state.data.isFix ? Object.assign({}, base, { backgroundColor: 'gray' }) : base;
                },
                multiValueLabel: function multiValueLabel(base, state) {
                        return state.data.isFix ? Object.assign({}, base, { fontWeight: 'bold', color: 'white', paddingRight: 6 }) : base;
                },
                multiValueRemove: function multiValueRemove(base, state) {
                        return state.data.isFix ? Object.assign({}, base, { display: 'none' }) : base;
                }
        };

        var filterUsers = filter;

        var promiseOptions = function promiseOptions(inputValue) {
                return new Promise(function (resolve) {
                        http.get('get_users').then(function (res) {
                                // console.log('userrsssss', res)
                                var users = res.data.map(function (user) {
                                        return { value: user.id, label: user.name + ' ' + user.second_name };
                                });
                                resolve(filterUsers(inputValue, users));
                        });
                });
        };

        areFixed = [].concat(_toConsumableArray(areFixed)).map(function (fix_el) {
                return Object.assign({}, fix_el, { isFix: true });
        });

        var _useState3 = useState(areFixed),
            _useState4 = _slicedToArray(_useState3, 2),
            values = _useState4[0],
            setValue = _useState4[1];

        var handleChange = function handleChange(e) {
                var new_val = [].concat(_toConsumableArray(areFixed));

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                        for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var element = _step.value;

                                // if ( !areFixed.find( fix_el => fix_el.value === element.value ) ) new_val.push(element)
                                if (!element.isFix) new_val.push(element);
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

                setValue(new_val);

                updateMethod(new_val);
        };

        return React.createElement(AsyncSelect, {
                value: values,
                styles: styles,
                onChange: handleChange,
                loadOptions: promiseOptions,
                defaultValue: areFixed,
                isClearable: values.some(function (v) {
                        return !v.isFix;
                }),
                isMulti: true,
                placeholder: placeholder,
                closeMenuOnSelect: false,
                components: makeAnimated()
                // isDisabled = { options.length === 1 }

        });
};

var CustomDateInput = function CustomDateInput(_ref6) {
        var id = _ref6.id,
            value = _ref6.value,
            onClick = _ref6.onClick,
            loading = _ref6.loading,
            onSubmit = _ref6.onSubmit,
            other_params = _ref6.other_params;
        return React.createElement(
                Stack,
                { direction: 'row', sx: { width: 'fit-content', backgroundColor: '#e9ecef' } },
                React.createElement('input', {
                        className: 'form-control form-control-sm',
                        style: { height: 35, textAlign: 'center', border: 'none', borderRadius: 0, backgroundColor: "rgba(233,236,239,0)" },
                        value: '' + value,
                        onChange: function onChange(e) {
                                e.preventDefault();e.stopPropagation();
                        },
                        onClick: onClick,
                        readOnly: true
                }),
                React.createElement(
                        LoadingButton,
                        { as: IconButton, loading: loading, title: "EFFACER", color: "primary", size: "small", style: { minWidth: 30 }, onClick: onSubmit },
                        loading ? null : React.createElement(RiUploadCloud2Fill, { size: 20 })
                )
        );
};

export default function FileTable() {
        var _this4 = this;

        var node = useMemo(function () {
                return window.Global_State.backend.selectedNode.model;
        }, [window.Global_State.backend.selectedNode.model]);

        // console.log("window.current_location", window.current_location)

        var contain_audit = node.type === "root" && /^(Audit|AUDIT)(( \b\w*\b)|)$/.test(window.Global_State.getCurrentSection().name);

        // console.log('contentNooooooooooooode', node, window.Global_State.backend)

        var _useState5 = useState({
                tag: "le Nom",
                element: ''
        }),
            _useState6 = _slicedToArray(_useState5, 2),
            filter = _useState6[0],
            setFilter = _useState6[1];

        // const [previousSelected, setPreviousSelected] = useState([0])

        var _useState7 = useState(0),
            _useState8 = _slicedToArray(_useState7, 2),
            selectedRowNumber = _useState8[0],
            setNumber = _useState8[1];

        var _useState9 = useState([]),
            _useState10 = _slicedToArray(_useState9, 2),
            selectedRow = _useState10[0],
            setSelectedRows = _useState10[1];

        var justChecking = useRef(false);

        var _useState11 = useState('none'),
            _useState12 = _slicedToArray(_useState11, 2),
            mc_state = _useState12[0],
            setMc_state = _useState12[1];

        var _ref7 = [useRef([]), useRef(undefined), useRef(undefined)],
            to_move_or_copy = _ref7[0],
            from_id = _ref7[1],
            clear_clipboard_id = _ref7[2];


        useEffect(function () {
                if (mc_state === 'none') {
                        to_move_or_copy.current = [];
                        clearTimeout(clear_clipboard_id.current);
                        clear_clipboard_id.current = undefined;
                        from_id.current = undefined;
                }
        }, [mc_state]);

        useEffect(function () {

                window.Global_State.EventsManager.on('clearSelected', function () {
                        /*console.log('clearSelected');*/setSelectedRows([]);setNumber(0);
                });
                // window.Global_State.EventsManager.once('show_on_screen',
                // async (data) =>
                // {
                //         console.log(data);
                //         await window.Global_State.setSectionId(data.section_id);
                //         const parent_id = window.Global_State.getNodeDataById(data.id).parentId
                //         await window.Global_State.backend.setCurrentSelectedFolder(parent_id)
                //
                //         setTimeout(
                //         () =>
                //         {
                //                 console.log("scroooooooooooooooooooooooooooool")
                //                 const row = document.getElementById(`row-${data.id}`)
                //                 const parent = document.querySelector(".content_xl_size_content")
                //
                //                 parent.scrollTop = row.offsetTop
                //
                //         }, 800)
                // })
                window.Global_State.EventsManager.on("select_row", function (id) {
                        var row = datas.find(function (row) {
                                return row.id === id;
                        });

                        // console.log("roooooooooooooooooow", row, datas, id)

                        handleChange(1, [row]);
                });
                return function () {
                        window.Global_State.EventsManager.off('clearSelected');
                        window.Global_State.EventsManager.off('select_row');
                        // window.Global_State.EventsManager.off('show_on_screen');
                };
        });

        var Paste_component = useCallback(function Paste_component() {
                var paste_here = function () {
                        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(node) {
                                var _this = this;

                                var concern_nodes, destination_node, destination_info, destination_id, destination_type, operation_type, Save_for_rest, _loop, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, node_to_copy, to_move, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, node_to_move, queryData, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _queryData, services, section;

                                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                                concern_nodes = window.Global_State.copyObject(to_move_or_copy.current);
                                                                destination_node = JSON.parse(JSON.stringify(node));
                                                                destination_info = window.Global_State.identifyNode(destination_node);
                                                                destination_id = destination_info[0];
                                                                destination_type = destination_info[1];

                                                                // console.log('arriiiiiiiiiiiiiveeee', to_move_or_copy.current)

                                                                operation_type = mc_state;

                                                                Save_for_rest = function Save_for_rest() {

                                                                        return React.createElement(
                                                                                'div',
                                                                                { className: 'd-flex align-items-stretch' },
                                                                                React.createElement('input', { id: 'save_checkbox', type: 'checkbox',
                                                                                        onChange: function onChange(e) {
                                                                                                // e.preventDefault()
                                                                                                // console.log('e.target',e.target)
                                                                                                action.current = { saved: e.target.checked };
                                                                                        }
                                                                                }),
                                                                                React.createElement(
                                                                                        'label',
                                                                                        { htmlFor: 'save_checkbox',
                                                                                                style: {
                                                                                                        fontSize: 12,
                                                                                                        display: "contents"
                                                                                                }
                                                                                        },
                                                                                        ' Enregistrer l\'action pour autres cas similaires '
                                                                                )
                                                                        );
                                                                };

                                                                // console.log('destination_node.id === from_id.current', destination_node.id, from_id.current)


                                                                if (!(destination_node.id === from_id.current)) {
                                                                        _context3.next = 15;
                                                                        break;
                                                                }

                                                                if (!(operation_type === 'copy')) {
                                                                        _context3.next = 12;
                                                                        break;
                                                                }

                                                                action.current = { saved: true, value: 2 };
                                                                _context3.next = 15;
                                                                break;

                                                        case 12:
                                                                if (!(operation_type === 'move')) {
                                                                        _context3.next = 15;
                                                                        break;
                                                                }

                                                                setMc_state('none');

                                                                return _context3.abrupt('return', 'nothing to do');

                                                        case 15:
                                                                _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(node_to_copy) {
                                                                        var _loop2, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, child_node, _ret2;

                                                                        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                                while (1) {
                                                                                        switch (_context2.prev = _context2.next) {
                                                                                                case 0:
                                                                                                        _loop2 = /*#__PURE__*/_regeneratorRuntime.mark(function _callee(child_node) {
                                                                                                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                                                        while (1) {
                                                                                                                                switch (_context.prev = _context.next) {
                                                                                                                                        case 0:
                                                                                                                                                if (!(child_node.name === (node_to_copy.ori_name || node_to_copy.name))) {
                                                                                                                                                        _context.next = 12;
                                                                                                                                                        break;
                                                                                                                                                }

                                                                                                                                                if (action.current.saved) {
                                                                                                                                                        _context.next = 11;
                                                                                                                                                        break;
                                                                                                                                                }

                                                                                                                                                if (!(!node_to_copy.onCopy && node_to_copy.type === 'ds' && parseInt(node_to_copy.id) < 0 && operation_type === 'move')) {
                                                                                                                                                        _context.next = 5;
                                                                                                                                                        break;
                                                                                                                                                }

                                                                                                                                                // toast.error(`Selon les données locales, il existe deja un ${node_to_copy.type === 'f' ? 'fichier' : 'dossiser'} de ce nom á la destination:\n${node_to_copy.name}`)
                                                                                                                                                toast(React.createElement(
                                                                                                                                                        'div',
                                                                                                                                                        null,
                                                                                                                                                        'Selon les donn\xE9es locales, il existe deja un ' + (node_to_copy.type === 'f' ? 'fichier' : 'dossiser') + ' de ce nom \xE1 la destination:',
                                                                                                                                                        React.createElement('br', null),
                                                                                                                                                        '"',
                                                                                                                                                        React.createElement(
                                                                                                                                                                'span',
                                                                                                                                                                { style: { fontWeight: "bold", fontSize: 18 } },
                                                                                                                                                                node_to_copy.name
                                                                                                                                                        ),
                                                                                                                                                        '"'
                                                                                                                                                ), { type: "error" });
                                                                                                                                                return _context.abrupt('return', 'continue');

                                                                                                                                        case 5:
                                                                                                                                                if (!(node.path.indexOf(node_to_copy.path) !== -1)) {
                                                                                                                                                        _context.next = 7;
                                                                                                                                                        break;
                                                                                                                                                }

                                                                                                                                                return _context.abrupt('return', 'continue');

                                                                                                                                        case 7:
                                                                                                                                                _context.next = 9;
                                                                                                                                                return new Promise(function (resolve) {
                                                                                                                                                        var BsToMuiComp = React.forwardRef(function MyComponent(props, ref) {
                                                                                                                                                                //  Spread the props to the underlying DOM element.
                                                                                                                                                                return React.createElement(
                                                                                                                                                                        Button,
                                                                                                                                                                        Object.assign({}, props, { ref: ref }),
                                                                                                                                                                        'FUSIONNER'
                                                                                                                                                                );
                                                                                                                                                        });

                                                                                                                                                        var content = React.createElement(
                                                                                                                                                                'div',
                                                                                                                                                                null,
                                                                                                                                                                React.createElement(
                                                                                                                                                                        'div',
                                                                                                                                                                        { className: 'mb-3' },
                                                                                                                                                                        'La destination pourrait contenir un ' + (child_node.type === 'f' ? 'fichier' : 'dossier') + ' de meme nom: ',
                                                                                                                                                                        React.createElement('br', null),
                                                                                                                                                                        React.createElement(
                                                                                                                                                                                'span',
                                                                                                                                                                                { style: { fontWeight: "bold" } },
                                                                                                                                                                                ' ',
                                                                                                                                                                                '' + node_to_copy.name,
                                                                                                                                                                                ' '
                                                                                                                                                                        )
                                                                                                                                                                ),
                                                                                                                                                                React.createElement(Save_for_rest, null),
                                                                                                                                                                React.createElement(
                                                                                                                                                                        'div',
                                                                                                                                                                        { className: 'd-flex justify-content-end' },
                                                                                                                                                                        React.createElement(
                                                                                                                                                                                Button,
                                                                                                                                                                                { className: 'mr-1', variant: 'outline-light', onClick: function onClick(e) {
                                                                                                                                                                                                e.stopPropagation();resolve(1);
                                                                                                                                                                                        } },
                                                                                                                                                                                'IGNORER'
                                                                                                                                                                        ),
                                                                                                                                                                        React.createElement(
                                                                                                                                                                                Button,
                                                                                                                                                                                { className: 'mr-1', variant: 'outline-primary', onClick: function onClick(e) {
                                                                                                                                                                                                e.stopPropagation();{/*console.log('RENOMEEEEEEEEEEER');*/}resolve(2);
                                                                                                                                                                                        } },
                                                                                                                                                                                'RENOMER'
                                                                                                                                                                        ),
                                                                                                                                                                        child_node.global_type === 'folder' ? React.createElement(
                                                                                                                                                                                Tooltip,
                                                                                                                                                                                { title: 'Les fichiers en conflits seront \xE9craser \xE0 la destination' },
                                                                                                                                                                                React.createElement(
                                                                                                                                                                                        'span',
                                                                                                                                                                                        null,
                                                                                                                                                                                        React.createElement(BsToMuiComp, { disabled: parseInt(node_to_copy.id) < 0, variant: 'outline-danger', onClick: function onClick(e) {
                                                                                                                                                                                                        e.stopPropagation();resolve(3);
                                                                                                                                                                                                } })
                                                                                                                                                                                )
                                                                                                                                                                        ) : React.createElement(
                                                                                                                                                                                Button,
                                                                                                                                                                                { disabled: parseInt(node_to_copy.id) < 0, variant: 'outline-danger', onClick: function onClick(e) {
                                                                                                                                                                                                e.stopPropagation();resolve(3);
                                                                                                                                                                                        } },
                                                                                                                                                                                'ECRASER'
                                                                                                                                                                        )
                                                                                                                                                                )
                                                                                                                                                        );

                                                                                                                                                        window.Global_State.modalManager.setContent(content);
                                                                                                                                                        window.Global_State.modalManager.open_modal('Conflit de ' + (child_node.type === 'f' ? 'fichiers' : 'dossiers'), false);
                                                                                                                                                }).then(function (res) {
                                                                                                                                                        // console.log(res, action.current)
                                                                                                                                                        node_to_copy['on_exist'] = res;
                                                                                                                                                        if (action.current.saved) action.current = Object.assign({}, action.current, { value: res });
                                                                                                                                                });

                                                                                                                                        case 9:
                                                                                                                                                _context.next = 12;
                                                                                                                                                break;

                                                                                                                                        case 11:
                                                                                                                                                node_to_copy['on_exist'] = action.current.value;

                                                                                                                                        case 12:
                                                                                                                                        case 'end':
                                                                                                                                                return _context.stop();
                                                                                                                                }
                                                                                                                        }
                                                                                                                }, _callee, _this);
                                                                                                        });
                                                                                                        _iteratorNormalCompletion5 = true;
                                                                                                        _didIteratorError5 = false;
                                                                                                        _iteratorError5 = undefined;
                                                                                                        _context2.prev = 4;
                                                                                                        _iterator5 = node.children[Symbol.iterator]();

                                                                                                case 6:
                                                                                                        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                                                                                                _context2.next = 15;
                                                                                                                break;
                                                                                                        }

                                                                                                        child_node = _step5.value;
                                                                                                        return _context2.delegateYield(_loop2(child_node), 't0', 9);

                                                                                                case 9:
                                                                                                        _ret2 = _context2.t0;

                                                                                                        if (!(_ret2 === 'continue')) {
                                                                                                                _context2.next = 12;
                                                                                                                break;
                                                                                                        }

                                                                                                        return _context2.abrupt('continue', 12);

                                                                                                case 12:
                                                                                                        _iteratorNormalCompletion5 = true;
                                                                                                        _context2.next = 6;
                                                                                                        break;

                                                                                                case 15:
                                                                                                        _context2.next = 21;
                                                                                                        break;

                                                                                                case 17:
                                                                                                        _context2.prev = 17;
                                                                                                        _context2.t1 = _context2['catch'](4);
                                                                                                        _didIteratorError5 = true;
                                                                                                        _iteratorError5 = _context2.t1;

                                                                                                case 21:
                                                                                                        _context2.prev = 21;
                                                                                                        _context2.prev = 22;

                                                                                                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                                                                                _iterator5.return();
                                                                                                        }

                                                                                                case 24:
                                                                                                        _context2.prev = 24;

                                                                                                        if (!_didIteratorError5) {
                                                                                                                _context2.next = 27;
                                                                                                                break;
                                                                                                        }

                                                                                                        throw _iteratorError5;

                                                                                                case 27:
                                                                                                        return _context2.finish(24);

                                                                                                case 28:
                                                                                                        return _context2.finish(21);

                                                                                                case 29:
                                                                                                case 'end':
                                                                                                        return _context2.stop();
                                                                                        }
                                                                                }
                                                                        }, _callee2, _this, [[4, 17, 21, 29], [22,, 24, 28]]);
                                                                });
                                                                _iteratorNormalCompletion2 = true;
                                                                _didIteratorError2 = false;
                                                                _iteratorError2 = undefined;
                                                                _context3.prev = 19;
                                                                _iterator2 = concern_nodes[Symbol.iterator]();

                                                        case 21:
                                                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                                                        _context3.next = 27;
                                                                        break;
                                                                }

                                                                node_to_copy = _step2.value;
                                                                return _context3.delegateYield(_loop(node_to_copy), 't0', 24);

                                                        case 24:
                                                                _iteratorNormalCompletion2 = true;
                                                                _context3.next = 21;
                                                                break;

                                                        case 27:
                                                                _context3.next = 33;
                                                                break;

                                                        case 29:
                                                                _context3.prev = 29;
                                                                _context3.t1 = _context3['catch'](19);
                                                                _didIteratorError2 = true;
                                                                _iteratorError2 = _context3.t1;

                                                        case 33:
                                                                _context3.prev = 33;
                                                                _context3.prev = 34;

                                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                                        _iterator2.return();
                                                                }

                                                        case 36:
                                                                _context3.prev = 36;

                                                                if (!_didIteratorError2) {
                                                                        _context3.next = 39;
                                                                        break;
                                                                }

                                                                throw _iteratorError2;

                                                        case 39:
                                                                return _context3.finish(36);

                                                        case 40:
                                                                return _context3.finish(33);

                                                        case 41:

                                                                window.Global_State.modalManager.close_modal();

                                                                // console.log('taaaaaaaaaaaaaaaaaaaaaaaaaa')
                                                                // console.log( 'to_move_or_copy.current1', to_move_or_copy.current )

                                                                if (!(operation_type === 'move')) {
                                                                        _context3.next = 95;
                                                                        break;
                                                                }

                                                                to_move = [].concat(_toConsumableArray(concern_nodes));


                                                                setMc_state('none');

                                                                // console.log('zaaaaaaaaaaaaaaaaaaaaaa')
                                                                _iteratorNormalCompletion3 = true;
                                                                _didIteratorError3 = false;
                                                                _iteratorError3 = undefined;
                                                                _context3.prev = 48;
                                                                _iterator3 = to_move[Symbol.iterator]();

                                                        case 50:
                                                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                                                        _context3.next = 79;
                                                                        break;
                                                                }

                                                                node_to_move = _step3.value;

                                                                if (!(node.path.indexOf(node_to_move.path) !== -1)) {
                                                                        _context3.next = 55;
                                                                        break;
                                                                }

                                                                toast(React.createElement(
                                                                        'div',
                                                                        null,
                                                                        'Le dossier de destination est un sous-dossier du dossier source.',
                                                                        React.createElement('br', null),
                                                                        React.createElement('br', null),
                                                                        'source: ',
                                                                        React.createElement(
                                                                                'span',
                                                                                { style: { fontWeight: "bold", fontSize: 12 } },
                                                                                node_to_move.path
                                                                        ),
                                                                        React.createElement('br', null),
                                                                        'destination: ',
                                                                        React.createElement(
                                                                                'span',
                                                                                { style: { fontWeight: "bold", fontSize: 12 } },
                                                                                node.path
                                                                        )
                                                                ), { type: "error" });
                                                                return _context3.abrupt('continue', 76);

                                                        case 55:
                                                                queryData = new FormData();


                                                                queryData.append('destination_id', destination_id);
                                                                queryData.append('destination_type', destination_type);
                                                                queryData.append('id', node_to_move.id);
                                                                queryData.append('on_exist', node_to_move.on_exist ? node_to_move.on_exist : '-1');

                                                                // console.log('arriiiiiiiiiiiiiveeee', node_to_move)

                                                                if (!(node_to_move.type === 'ds')) {
                                                                        _context3.next = 69;
                                                                        break;
                                                                }

                                                                if (!window.Global_State.isEditorMode) {
                                                                        _context3.next = 65;
                                                                        break;
                                                                }

                                                                window.Global_State.editor.folder.move(queryData);
                                                                _context3.next = 67;
                                                                break;

                                                        case 65:
                                                                _context3.next = 67;
                                                                return http.post('move_folder', queryData).then(function (res) {
                                                                        // console.log(res)
                                                                        switch (res.data.statue) {
                                                                                case 'success':
                                                                                        toast('Dossier deplac\xE9 avec succ\xE8s', { type: 'success' });
                                                                                        break;
                                                                                case 'error':
                                                                                        toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                                                        break;
                                                                                case 'info':
                                                                                        toast('Info: ' + res.data.data.msg, { icon: "📢", style: { fontWeight: 'bold' } });
                                                                                        break;
                                                                        }
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 67:
                                                                _context3.next = 76;
                                                                break;

                                                        case 69:
                                                                if (!(node_to_move.type === 'f')) {
                                                                        _context3.next = 76;
                                                                        break;
                                                                }

                                                                if (!window.Global_State.isEditorMode) {
                                                                        _context3.next = 74;
                                                                        break;
                                                                }

                                                                window.Global_State.editor.files.move(queryData);
                                                                _context3.next = 76;
                                                                break;

                                                        case 74:
                                                                _context3.next = 76;
                                                                return http.post('move_file', queryData).then(function (res) {
                                                                        // console.log(res)
                                                                        switch (res.data.statue) {
                                                                                case 'success':
                                                                                        toast('Fichier deplac\xE9 avec succ\xE8s', { type: 'success' });
                                                                                        break;
                                                                                case 'error':
                                                                                        toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                                                        break;
                                                                                case 'info':
                                                                                        toast('Info: ' + res.data.data.msg, { icon: "📢", style: { fontWeight: 'bold' } });
                                                                                        break;
                                                                        }
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 76:
                                                                _iteratorNormalCompletion3 = true;
                                                                _context3.next = 50;
                                                                break;

                                                        case 79:
                                                                _context3.next = 85;
                                                                break;

                                                        case 81:
                                                                _context3.prev = 81;
                                                                _context3.t2 = _context3['catch'](48);
                                                                _didIteratorError3 = true;
                                                                _iteratorError3 = _context3.t2;

                                                        case 85:
                                                                _context3.prev = 85;
                                                                _context3.prev = 86;

                                                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                                        _iterator3.return();
                                                                }

                                                        case 88:
                                                                _context3.prev = 88;

                                                                if (!_didIteratorError3) {
                                                                        _context3.next = 91;
                                                                        break;
                                                                }

                                                                throw _iteratorError3;

                                                        case 91:
                                                                return _context3.finish(88);

                                                        case 92:
                                                                return _context3.finish(85);

                                                        case 93:
                                                                _context3.next = 147;
                                                                break;

                                                        case 95:

                                                                // console.log( 'to_move_or_copy.current', concern_nodes )

                                                                _iteratorNormalCompletion4 = true;
                                                                _didIteratorError4 = false;
                                                                _iteratorError4 = undefined;
                                                                _context3.prev = 98;
                                                                _iterator4 = concern_nodes[Symbol.iterator]();

                                                        case 100:
                                                                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                                                        _context3.next = 133;
                                                                        break;
                                                                }

                                                                node_to_copy = _step4.value;

                                                                if (!(node.path.indexOf(node_to_copy.path) !== -1)) {
                                                                        _context3.next = 105;
                                                                        break;
                                                                }

                                                                toast(React.createElement(
                                                                        'div',
                                                                        null,
                                                                        'Le dossier de destination est un sous-dossier du dossier source.',
                                                                        React.createElement('br', null),
                                                                        React.createElement('br', null),
                                                                        'source: ',
                                                                        React.createElement(
                                                                                'span',
                                                                                { style: { fontWeight: "bold", fontSize: 12 } },
                                                                                node_to_copy.path
                                                                        ),
                                                                        React.createElement('br', null),
                                                                        'destination: ',
                                                                        React.createElement(
                                                                                'span',
                                                                                { style: { fontWeight: "bold", fontSize: 12 } },
                                                                                node.path
                                                                        )
                                                                ), { type: "error" });
                                                                return _context3.abrupt('continue', 130);

                                                        case 105:
                                                                _queryData = new FormData();


                                                                _queryData.append('destination_id', destination_id);
                                                                _queryData.append('destination_type', destination_type);
                                                                _queryData.append('id', node_to_copy.id);
                                                                _queryData.append('on_exist', node_to_copy.on_exist ? node_to_copy.on_exist : '-1');
                                                                _queryData.append('section_id', window.Global_State.selectedSectionId);

                                                                services = void 0;

                                                                if (node.type === 'root') {
                                                                        section = window.Global_State.sections.get(window.Global_State.selectedSectionId);


                                                                        services = section.services.map(function (service) {
                                                                                return { value: service.id };
                                                                        });
                                                                } else services = node.services.map(function (service) {
                                                                        return { value: service.id };
                                                                });

                                                                _queryData.append('services', JSON.stringify(services));

                                                                // console.log('arriiiiiiiiiiiiiveeee', node_to_move)

                                                                if (!(node_to_copy.type === 'ds')) {
                                                                        _context3.next = 123;
                                                                        break;
                                                                }

                                                                if (!window.Global_State.isEditorMode) {
                                                                        _context3.next = 119;
                                                                        break;
                                                                }

                                                                window.Global_State.editor.folder.copy(_queryData);
                                                                _context3.next = 121;
                                                                break;

                                                        case 119:
                                                                _context3.next = 121;
                                                                return http.post('copy_folder', _queryData).then(function (res) {
                                                                        // console.log(res)
                                                                        switch (res.data.statue) {
                                                                                case 'success':
                                                                                        toast('Dossier copi\xE9 avec succ\xE8s', { type: 'success' });
                                                                                        break;
                                                                                case 'error':
                                                                                        toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                                                        break;
                                                                                case 'info':
                                                                                        toast('Info: ' + res.data.data.msg, { icon: "📢", style: { fontWeight: 'bold' } });
                                                                                        break;
                                                                        }
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 121:
                                                                _context3.next = 130;
                                                                break;

                                                        case 123:
                                                                if (!(node_to_copy.type === 'f')) {
                                                                        _context3.next = 130;
                                                                        break;
                                                                }

                                                                if (!window.Global_State.isEditorMode) {
                                                                        _context3.next = 128;
                                                                        break;
                                                                }

                                                                window.Global_State.editor.files.copy(_queryData);
                                                                _context3.next = 130;
                                                                break;

                                                        case 128:
                                                                _context3.next = 130;
                                                                return http.post('copy_file', _queryData).then(function (res) {
                                                                        // console.log(res)
                                                                        switch (res.data.statue) {
                                                                                case 'success':
                                                                                        toast('Fichier copi\xE9 avec succ\xE8s', { type: 'success' });
                                                                                        break;
                                                                                case 'error':
                                                                                        toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                                                        break;
                                                                                case 'info':
                                                                                        toast('Info: ' + res.data.data.msg, { icon: "📢", style: { fontWeight: 'bold' } });
                                                                                        break;
                                                                        }
                                                                }).catch(function (err) {
                                                                        console.log(err);throw err;
                                                                });

                                                        case 130:
                                                                _iteratorNormalCompletion4 = true;
                                                                _context3.next = 100;
                                                                break;

                                                        case 133:
                                                                _context3.next = 139;
                                                                break;

                                                        case 135:
                                                                _context3.prev = 135;
                                                                _context3.t3 = _context3['catch'](98);
                                                                _didIteratorError4 = true;
                                                                _iteratorError4 = _context3.t3;

                                                        case 139:
                                                                _context3.prev = 139;
                                                                _context3.prev = 140;

                                                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                                        _iterator4.return();
                                                                }

                                                        case 142:
                                                                _context3.prev = 142;

                                                                if (!_didIteratorError4) {
                                                                        _context3.next = 145;
                                                                        break;
                                                                }

                                                                throw _iteratorError4;

                                                        case 145:
                                                                return _context3.finish(142);

                                                        case 146:
                                                                return _context3.finish(139);

                                                        case 147:
                                                        case 'end':
                                                                return _context3.stop();
                                                }
                                        }
                                }, _callee3, this, [[19, 29, 33, 41], [34,, 36, 40], [48, 81, 85, 93], [86,, 88, 92], [98, 135, 139, 147], [140,, 142, 146]]);
                        }));

                        return function paste_here(_x) {
                                return _ref8.apply(this, arguments);
                        };
                }();

                var action = useRef({});
                var ref = useRef();

                useEffect(function () {
                        window.Global_State.EventsManager.on("shortcut", function (value) {
                                // console.log("Paste");
                                if (value === "ctrl_v") {

                                        if (ref.current) ref.current.click();
                                }
                        });

                        return function () {
                                window.Global_State.EventsManager.off("shortcut");
                        };
                }, []);

                return React.createElement(
                        IconButton,
                        { id: 'ctrl_v', ref: ref,
                                disabled: mc_state === 'none'
                                // style = {{ marginRight: 20, }}
                                , onClick: function onClick(e) {
                                        // console.log(to_move_or_copy.current, node.id)

                                        if (window.Global_State.isEditorMode) paste_here(node);else {
                                                toast.promise(paste_here(node), {
                                                        loading: 'Pasting...',
                                                        success: 'Processus achevé',
                                                        error: 'Une erreur est survenue'
                                                }, {
                                                        id: 'Pasting',
                                                        duration: Infinity
                                                }).then(function (res) {
                                                        setTimeout(function () {
                                                                toast.dismiss('Pasting');
                                                        }, 800);
                                                }).catch(function (err) {
                                                        setTimeout(function () {
                                                                toast.dismiss('Pasting');
                                                        }, 800);
                                                });
                                        }
                                }
                        },
                        React.createElement(FaPaste, { size: 24, color: '' + (mc_state === 'none' ? '' : 'blue') })
                );
        }, [node, mc_state]);

        function add(thing_to_add) {
                // filtre de service
                var canAddToService = function canAddToService(authService) {
                        var services = node.isRoot ? window.Global_State.getCurrentSection().services : node.services;

                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                                for (var _iterator6 = services[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                        var elementService = _step6.value;

                                        // console.log(authService.id, elementService.id)
                                        if (authService.id === parseInt(elementService.id)) return true;
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

                        return false;
                };
                var servicesList = window.Global_State.authUser.services.filter(function (service) {
                        return canAddToService(service);
                }).map(function (service) {
                        return service;
                });
                // formatage en options
                var options_services = servicesList.map(function (service) {
                        return { value: service.id, label: service.name };
                });

                // composant de selection de service

                if (thing_to_add === "add_audit") {

                        var Audit_form = function Audit_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)
                                        // return
                                        submittedInfo.num_chrono = submittedInfo.num_chrono < 10 ? "0" + submittedInfo.num_chrono : submittedInfo.num_chrono.toString();
                                        submittedInfo.annee = submittedInfo.annee < 10 ? "0" + submittedInfo.annee : submittedInfo.annee.toString();

                                        var queryBody = new FormData();

                                        var inspector_ids = submittedInfo.inspectors.map(function (element) {
                                                return parseInt(element.value);
                                        });
                                        // console.log(inspector_ids)

                                        var service = submittedInfo.services[0].label;

                                        queryBody.append("name", submittedInfo.type_audit + "-" + submittedInfo.annee + "-" + service + "-" + submittedInfo.num_chrono);
                                        queryBody.append("services", JSON.stringify(submittedInfo.services));
                                        queryBody.append("inspectors", JSON.stringify(inspector_ids));
                                        queryBody.append("ra_id", window.Global_State.authUser.id);
                                        queryBody.append("section_id", window.Global_State.selectedSectionId);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))


                                        if (!window.Global_State.isEditorMode) {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);

                                                http.post('add_audit', queryBody)

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log(res)

                                                        if (res.data.statue === 'success') {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Audit ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                window.Global_State.modalManager.close_modal();
                                                        } else {
                                                                // console.log('cooooooode', res.data.data.code)
                                                                switch (parseInt(res.data.data.code)) {
                                                                        case 0:
                                                                                {
                                                                                        swal({
                                                                                                title: "FIN!",
                                                                                                text: "Ce Audit existe deja !",
                                                                                                icon: "info"
                                                                                        });
                                                                                        window.Global_State.modalManager.close_modal();
                                                                                        break;
                                                                                }
                                                                        default:
                                                                                {
                                                                                        swal({
                                                                                                title: "ERROR!",
                                                                                                text: res.data.data.msg,
                                                                                                icon: "error"
                                                                                        });
                                                                                        window.Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                                                                                        break;
                                                                                }
                                                                }
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
                                                        window.Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                                                });
                                        } else {
                                                // console.log('editorHandle audit')

                                                window.Global_State.editor.audit.add(queryBody);

                                                window.Global_State.modalManager.close_modal();
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                var validationRules = yup.object().shape({
                                        num_chrono: yup.number().required().positive().integer(),
                                        annee: yup.number().required().positive().integer().max(100),
                                        inspectors: yup.array().min(1).required('Au moins 1'),
                                        services: yup.array().min(1).required('Au moins 1')

                                });

                                var ra = { value: parseInt(window.Global_State.authUser.id), label: window.Global_State.authUser.name + ' ' + window.Global_State.authUser.second_name };

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                type_audit: "AE",
                                                num_chrono: "",
                                                annee: '',
                                                inspectors: [ra],
                                                services: options_services.slice(0, 1)
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
                                                        'Inspecteurs'
                                                ),
                                                React.createElement(AsyncUsersSelectComponent, {
                                                        updateMethod: function updateMethod(r) {
                                                                // console.log('new_val', r)
                                                                // const e = window.Global_State.copyObject(r)
                                                                // if (!r.length) r.unshift( { value: parseInt(window.Global_State.authUser.id), label: `${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}` } );
                                                                formik.setFieldValue("inspectors", r);
                                                        },
                                                        areFixed: [ra],
                                                        placeholder: "Sélectionner au moins 1 inspecteur",
                                                        filter: function filter(inputValue, list) {
                                                                return list.filter(function (i) {
                                                                        return i.label.toLowerCase().includes(inputValue.toLowerCase());
                                                                });
                                                        }
                                                }),
                                                React.createElement(
                                                        'span',
                                                        { className: 'text-danger', style: { fontSize: 11.2 } },
                                                        formik.errors.inspectors ? "Au moins 1 inspecteur doit être sélectionné" : null
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
                                                React.createElement(SelectComponent, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        }, options: options_services, placeholder: "Sélectionner au moins 1 service" }),
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

                        window.Global_State.modalManager.setContent(React.createElement(Audit_form, null));
                        window.Global_State.modalManager.open_modal("Nouvel Audit");
                } else if (thing_to_add === "add_folder") {

                        var Folder_form = function Folder_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)

                                        var queryBody = new FormData();

                                        var _window$Global_State$ = window.Global_State.identifyNode(node),
                                            _window$Global_State$2 = _slicedToArray(_window$Global_State$, 2),
                                            parent_id = _window$Global_State$2[0],
                                            parent_type = _window$Global_State$2[1];

                                        queryBody.append("services", JSON.stringify(submittedInfo.services));

                                        queryBody.append("name", submittedInfo.name);
                                        queryBody.append("parent_id", parent_id);
                                        queryBody.append("parent_type", parent_type);
                                        queryBody.append("section_id", window.Global_State.selectedSectionId);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))
                                        // console.log("parent_id", parent_id)
                                        // console.log("parent_type", parent_type)


                                        if (!window.Global_State.isEditorMode) {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);

                                                http.post('add_folder', queryBody)

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log('res', res)
                                                        if (res.data.statue === 'success') {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Dossier ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                window.Global_State.modalManager.close_modal();
                                                        } else if (res.data.state === 'info') {
                                                                swal({
                                                                        title: "Info!",
                                                                        text: res.data.data.msg,
                                                                        icon: "info"
                                                                });
                                                                window.Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                        } else {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.data.msg,
                                                                        icon: "error"
                                                                });
                                                                window.Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                        }
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
                                                        window.Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                                                });
                                        } else {
                                                // console.log('editorHandle folder')
                                                queryBody.set('front_parent_type', node.type);
                                                window.Global_State.editor.folder.add(queryBody);

                                                window.Global_State.modalManager.close_modal();
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
                                                services: options_services.slice(0, 1)
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
                                                                        isInvalid: !!formik.errors.num_chrono,
                                                                        autoFocus: true,
                                                                        onFocus: function onFocus(e) {
                                                                                e.target.select();
                                                                        }
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
                                                React.createElement(SelectComponent, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        }, options: options_services, placeholder: "Sélectionner au moins 1 service" }),
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

                        window.Global_State.modalManager.setContent(React.createElement(Folder_form, null));
                        window.Global_State.modalManager.open_modal("Nouveau Dossier");
                } else if (thing_to_add === "add_fncs") {

                        var FNCs_form = function FNCs_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)

                                        var check_feasibility = function check_feasibility(debut, fin, nonC_id) {
                                                var nonC = window.Global_State.getNodeDataById(nonC_id);
                                                var audit = window.Global_State.getNodeDataById(nonC.parentId);

                                                // const existing_fncs = window.Global_State.getChildrenById(window.Global_State.value, nonC_id)

                                                var _loop3 = function _loop3(i) {
                                                        if (window.Global_State.value.find(function (node) {
                                                                return node.path === nonC.path + '\\FNC-' + audit.name + '-' + i;
                                                        })) return {
                                                                        v: false
                                                                };
                                                };

                                                for (var i = debut; i < fin + 1; i++) {
                                                        var _ret3 = _loop3(i);

                                                        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
                                                }
                                                return true;
                                        };

                                        if (check_feasibility(parseInt(submittedInfo.debut), parseInt(submittedInfo.fin), node.id)) {

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

                                                if (!window.Global_State.isEditorMode) {

                                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);

                                                        http.post('add_fncs', queryBody)

                                                        // Handle the response from backend here
                                                        .then(function (res) {
                                                                // console.log(res)

                                                                if (res.data.statue === 'success') {
                                                                        if (res.data.data.existing_fnc) {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Certains FNC sont existants ou possède le mm chemin !\n" + JSON.stringify(res.data.data.existing_fnc),
                                                                                        icon: "info"
                                                                                });
                                                                                window.Global_State.modalManager.close_modal();
                                                                        } else {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Dossier ajouté avec success !",
                                                                                        icon: "success"
                                                                                });
                                                                                window.Global_State.modalManager.close_modal();
                                                                        }
                                                                } else {
                                                                        switch (res.data.data.code) {
                                                                                case 1:
                                                                                        {
                                                                                                swal({
                                                                                                        title: "ERROR!",
                                                                                                        text: res.data.data.msg,
                                                                                                        icon: "error"
                                                                                                });
                                                                                                window.Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                                                                break;
                                                                                        }
                                                                                default:
                                                                                        {
                                                                                                swal({
                                                                                                        title: "ERROR!",
                                                                                                        text: res.data.data.msg,
                                                                                                        icon: "error"
                                                                                                });
                                                                                                window.Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                                                                break;
                                                                                        }
                                                                        }
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
                                                                window.Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                                                        });
                                                } else {
                                                        // console.log('editorHandle fnc')

                                                        queryBody.set('front_parent_type', node.type);
                                                        window.Global_State.editor.fnc.add(queryBody);

                                                        window.Global_State.modalManager.close_modal();
                                                }

                                                // console.log(queryBody.get("name"))
                                        } else {
                                                // console.log('not feasible')

                                                swal({
                                                        title: "ERROR!",
                                                        text: 'La plage de génération contient des numéros de FNC existant !',
                                                        icon: "warning"
                                                });
                                                window.Global_State.modalManager.close_modal();
                                        }
                                };

                                var _useState13 = useState(1),
                                    _useState14 = _slicedToArray(_useState13, 2),
                                    min = _useState14[0],
                                    setMin = _useState14[1];

                                var _useState15 = useState(false),
                                    _useState16 = _slicedToArray(_useState15, 2),
                                    enableEnd = _useState16[0],
                                    setEndState = _useState16[1];

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
                                                services: options_services.slice(0, 1)
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
                                                React.createElement(SelectComponent, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        }, options: options_services, placeholder: "Sélectionner au moins 1 service" }),
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

                        window.Global_State.modalManager.setContent(React.createElement(FNCs_form, null));
                        window.Global_State.modalManager.open_modal("Generation de Non-Conformite");
                } else if (thing_to_add === "add_files") {

                        var Fs_form = function Fs_form() {
                                // const [selectedService, setSelectedServices] = useState(null);

                                var msg_err = "Valeur de champ invalide";

                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)

                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);

                                        var queryBody = new FormData();

                                        var _window$Global_State$3 = window.Global_State.identifyNode(node),
                                            _window$Global_State$4 = _slicedToArray(_window$Global_State$3, 2),
                                            parent_id = _window$Global_State$4[0],
                                            parent_type = _window$Global_State$4[1];

                                        queryBody.append("parent_type", parent_type);
                                        queryBody.append("parent_id", parent_id);
                                        submittedInfo.files.map(function (fileObject) {
                                                queryBody.append("fichiers[]", fileObject.file, fileObject.customName);
                                        });
                                        queryBody.append("services", JSON.stringify(submittedInfo.services));
                                        queryBody.append("section_id", window.Global_State.selectedSectionId);

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("nc_id", queryBody.get("nonC_id"))
                                        // console.log("debut", queryBody.get("debut"))
                                        // console.log("fin", queryBody.get("fichiers[]"))

                                        if (!window.Global_State.isEditorMode) {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);

                                                http.post('add_files', queryBody, {
                                                        headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                        }
                                                })

                                                // Handle the response from backend here
                                                .then(function (res) {
                                                        // console.log(res)

                                                        if (res.data.statue === 'success') {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Fichier(s) ajouté avec success !",
                                                                        icon: "success"
                                                                });
                                                                window.Global_State.modalManager.close_modal();
                                                                // if (res.data.data.msg === 'ok')
                                                                // {
                                                                //         swal({
                                                                //                 title: "FIN!",
                                                                //                 text: "Fichier(s) ajouté avec success !",
                                                                //                 icon: "success",
                                                                //         });
                                                                //         window.Global_State.modalManager.close_modal()
                                                                // }
                                                                // else if (res.data.data.list)
                                                                // {
                                                                //         swal({
                                                                //                 title: "FIN!",
                                                                //                 text: "Certains fichiers sont existant ou possède le mm chemin, des copies ont été créées !\n" + JSON.stringify(res.data.data.list),
                                                                //                 icon: "info",
                                                                //         });
                                                                //         window.Global_State.modalManager.close_modal()
                                                                // }
                                                        } else {
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.data.msg,
                                                                        icon: "error"
                                                                });
                                                                window.Global_State.modalManager.setContent(React.createElement(Fs_form, null));
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
                                                        window.Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                                                });
                                        } else {
                                                // console.log('editorHandle for files')
                                                // queryBody.forEach((value, key) => console.log(key, value));
                                                queryBody.set('front_parent_type', node.type);
                                                window.Global_State.editor.files.add(queryBody);

                                                window.Global_State.modalManager.close_modal();
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
                                                services: options_services.slice(0, 1)
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
                                                React.createElement(SelectComponent, { updateMethod: function updateMethod(e) {
                                                                formik.setFieldValue("services", e);
                                                        }, options: options_services, placeholder: "Sélectionner au moins 1 service" }),
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

                        window.Global_State.modalManager.setContent(React.createElement(Fs_form, null));
                        window.Global_State.modalManager.open_modal("Ajouter des Fichiers");
                }
        }

        var ActionsMenu = function ActionsMenu() {
                // let label1 =  ?  : node.type === "audit" ? "Nouvelle Non-Conformité" : "Nouveau Fichier de preuve"
                var _useState17 = useState({
                        rename: false,
                        share: false,
                        download: false,
                        delete: false
                }),
                    _useState18 = _slicedToArray(_useState17, 2),
                    loading_buttons = _useState18[0],
                    setLoading = _useState18[1];

                var buttons = [];

                // console.log("kkkkkkkkkkkkk", window.Global_State.getCurrentSection().name)


                var _window$Global_State$5 = window.Global_State.identifyNode(node),
                    _window$Global_State$6 = _slicedToArray(_window$Global_State$5, 2),
                    id = _window$Global_State$6[0],
                    type = _window$Global_State$6[1];

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

                function handleCut(e) {
                        // console.log("Couperrrrrrrrrrrrr")
                        if (selectedRow.length > 0) {
                                e.preventDefault();
                                e.stopPropagation();

                                clearTimeout(clear_clipboard_id.current);

                                clear_clipboard_id.current = setTimeout(function () {
                                        setMc_state('none');to_move_or_copy.current = [];
                                }, 2 * 60000);

                                to_move_or_copy.current = selectedRow.map(function (row) {
                                        var node_data = window.Global_State.getNodeDataById(row.id);

                                        return Object.assign({}, node_data, { id: window.Global_State.identifyNode(node_data)[0] });
                                });

                                from_id.current = node.id;

                                setMc_state('move');
                        }
                }
                function handleCopy(e) {
                        // console.log("Copieeeeeeeeeeeeeee")
                        if (selectedRow.length > 0) {
                                e.preventDefault();
                                e.stopPropagation();

                                clearTimeout(clear_clipboard_id.current);

                                clear_clipboard_id.current = setTimeout(function () {
                                        setMc_state('none');
                                }, 10 * 60000);

                                to_move_or_copy.current = selectedRow.map(function (row) {
                                        var node_data = window.Global_State.getNodeDataById(row.id);

                                        return Object.assign({}, node_data, { id: window.Global_State.identifyNode(node_data)[0] });
                                });

                                from_id.current = node.id;

                                setMc_state('copy');
                        }
                }
                function handleRename(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var node = selectedRow[0];

                        if (node) {
                                if (node.type === "f" || node.type === "ds") {
                                        swal("Nouveau nom:", {
                                                content: "input"
                                        }).then(function (value) {
                                                if (value === '') swal('Vous devez fournir un nom');else if (/^(checkList|Dossier Preuve|Nc|FNC-(AI|AE)-(AGA|ANS)-\d+-\d+-\d+|(AI|AE)-(AGA|ANS)-\d+-\d+)$/.test(value)) {
                                                        swal('Les noms "checkList", "Dossier Preuve", "Nc", d\'audit et de fnc sont reserv\xE9s !!');
                                                } else if (/^(?=.*[\\/:*?"<>|])/.test(value)) {
                                                        swal('Les charact\xE8res suivantes sont prohib\xE9es: \\/:*?"<>|');
                                                } else if (/^\s|\s$/.test(value)) {
                                                        swal("Evitez les espaces au début ou á la fin des noms !!");
                                                } else {
                                                        setLoading(Object.assign({}, loading_buttons, { rename: true }));

                                                        var _window$Global_State$7 = window.Global_State.identifyNode(node),
                                                            _window$Global_State$8 = _slicedToArray(_window$Global_State$7, 2),
                                                            _id = _window$Global_State$8[0],
                                                            model = _window$Global_State$8[1];
                                                        // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                                        var query = new FormData();
                                                        query.append('id', _id);
                                                        query.append('update_object', 'name');
                                                        query.append('new_value', value.toString());

                                                        var route = void 0;

                                                        switch (model) {
                                                                case 'App\\Models\\DossierSimple':
                                                                        route = 'update_folder';
                                                                        break;
                                                                case 'App\\Models\\Fichier':
                                                                        route = 'update_file';
                                                                        break;
                                                                default:
                                                                        return null;

                                                        }

                                                        // console.log(selectedRow[0].id.substring(2))
                                                        http.post('' + route, query).then(function (res) {
                                                                // console.log(res)
                                                                if (res.data.statue === 'success') window.show_response(node.value + ' renomm\xE9 avec succ\xE8s !', "success");else window.show_response(res.data.data.msg, res.data.statue);
                                                                setLoading(Object.assign({}, loading_buttons, { rename: false }));
                                                        }).catch(function (err) {
                                                                console.log(err);
                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                                setLoading(Object.assign({}, loading_buttons, { rename: false }));
                                                        });
                                                }
                                        });
                                } else toast.error("Can't do that 😒");
                        }
                }

                function handleDetails(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        window.Global_State.showDetails(selectedRow[0].id);
                }
                function handleShare(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var nodes_info = selectedRow.map(function (row) {
                                var node_data = window.Global_State.getNodeDataById(row.id);

                                return {
                                        id: window.Global_State.identifyNode(node_data)[0],
                                        model: window.Global_State.identifyNode(node_data)[1]
                                };
                        });

                        // console.log("Shaaaaaaaaaaaaaaaaaaaaaring")

                        var Share_to_users_form = function Share_to_users_form() {
                                // const [selectedService, setSelectedServices] = useState(null);


                                var handleSubmit = function handleSubmit(submittedInfo) {
                                        // console.log(submittedInfo)
                                        // return

                                        setLoading(Object.assign({}, loading_buttons, { share: true }));

                                        var queryBody = new FormData();

                                        var inspector_ids = submittedInfo.inspectors.map(function (element) {
                                                return parseInt(element.value);
                                        });
                                        // console.log(inspector_ids)

                                        queryBody.append("inspectors", JSON.stringify(inspector_ids));

                                        // console.log("nodes_infoooooooooooooooo", nodes_info)
                                        // return
                                        queryBody.append("nodes_info", JSON.stringify(nodes_info));

                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))


                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner);
                                        http.post('share', queryBody).then(function (res) {
                                                // console.log(res)

                                                if (res.data.statue === 'success') window.show_response('Fichier(s) partag\xE9(s) avec success"', "success");else window.show_response(res.data.data.msg, res.data.statue);
                                                setLoading(Object.assign({}, loading_buttons, { share: false }));
                                        })

                                        // Catch errors if any
                                        .catch(function (err) {
                                                console.log(err);
                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                setLoading(Object.assign({}, loading_buttons, { share: false }));
                                        });

                                        // console.log(queryBody.get("name"))
                                };

                                var validationRules = yup.object().shape({
                                        inspectors: yup.array().min(1).required('Au moins 1')

                                });

                                var formik = useFormik({
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues: {
                                                inspectors: []
                                        }
                                });

                                return React.createElement(
                                        'div',
                                        { onClick: function onClick(e) {
                                                        e.stopPropagation(); /*console.log(e)*/
                                                },
                                                style: {
                                                        // position: "fixed"
                                                        backgroundColor: "white",
                                                        width: "85%",
                                                        height: "fit-content",
                                                        maxHeight: "90%",
                                                        borderRadius: "15px",
                                                        padding: 15,
                                                        margin: 20
                                                }
                                        },
                                        React.createElement(
                                                Form,
                                                { value: undefined, onSubmit: formik.handleSubmit },
                                                React.createElement(
                                                        Form.Group,
                                                        { className: 'mb-3' },
                                                        React.createElement(
                                                                Form.Label,
                                                                null,
                                                                'Inspecteurs'
                                                        ),
                                                        React.createElement(AsyncUsersSelectComponent, {
                                                                areFixed: [],
                                                                updateMethod: function updateMethod(r) {
                                                                        // console.log('new_val', r)
                                                                        // const e = window.Global_State.copyObject(r)
                                                                        // if (!r.length) r.unshift( { value: parseInt(window.Global_State.authUser.id), label: `${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}` } );
                                                                        formik.setFieldValue("inspectors", r);
                                                                },
                                                                placeholder: "Sélectionner au moins 1 inspecteur",
                                                                filter: function filter(inputValue, list) {
                                                                        return list.filter(function (i) {
                                                                                return i.value !== window.Global_State.authUser.id && i.label.toLowerCase().includes(inputValue.toLowerCase());
                                                                        });
                                                                }
                                                        }),
                                                        React.createElement(
                                                                'span',
                                                                { className: 'text-danger', style: { fontSize: 11.2 } },
                                                                formik.errors.inspectors && "Au moins 1 inspecteur doit être sélectionné"
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
                                        )
                                );
                        };

                        var component = React.createElement(
                                'div',
                                { className: 'custom_overlay d-flex justify-content-center'
                                },
                                React.createElement(Share_to_users_form, null)
                        );

                        // window.Global_State.setOverlay_props( t => (
                        // {
                        //         ...t,
                        //         style:
                        //         {
                        //                 ...t.style,
                        //                 display: 'flex',
                        //                 alignItems: 'center',
                        //                 justifyContent: 'center'
                        //         },
                        //         children: (
                        //                 <div className="full_size_element d-flex justify-content-center"
                        //                      style={{
                        //                              backgroundColor: "rgba(0,0,0,0.22)"
                        //                      }}
                        //                 >
                        //                         <Share_to_users_form />
                        //                 </div>
                        //         ),
                        //
                        // }
                        // ) )

                        window.Global_State.absolutePopover.open(component);
                }
                function handleDownload(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var nodes_info = selectedRow.map(function (row) {
                                var node_data = window.Global_State.getNodeDataById(row.id);

                                return {
                                        id: window.Global_State.identifyNode(node_data)[0],
                                        model: window.Global_State.identifyNode(node_data)[1]
                                };
                        });

                        setLoading(Object.assign({}, loading_buttons, { download: true }));

                        if (nodes_info.length === 1 && nodes_info[0].model === "App\\Models\\Fichier") {
                                // console.log(nodes_info)
                                // return

                                http.get('download_file?id=' + nodes_info[0].id, { responseType: 'blob' }).then(function (res) {
                                        // console.log(res)
                                        var blob = new Blob([res.data]);
                                        // console.log(blob)
                                        var url = window.URL.createObjectURL(blob);
                                        var link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', '' + selectedRow[0].value);
                                        document.body.appendChild(link);
                                        link.click();

                                        setLoading(Object.assign({}, loading_buttons, { download: false }));
                                }).catch(function (err) {
                                        console.log(err);
                                        setLoading(Object.assign({}, loading_buttons, { download: false }));
                                        window.show_response(err.message + ' ' + err.response.data.message, "error");
                                });
                        } else {
                                // console.log(nodes_info)
                                // return
                                var to_compress = new FormData();
                                to_compress.append("nodes_info", JSON.stringify(nodes_info));

                                http.post("compress", to_compress).then(function (res) {
                                        // console.log(res)

                                        http.get('download_by_path?path=' + res.data, { responseType: 'blob' }).then(function (res) {
                                                // console.log(res)
                                                var blob = new Blob([res.data]);
                                                // console.log(blob)
                                                var url = window.URL.createObjectURL(blob);
                                                var link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download', '' + (selectedRow.length === 1 ? selectedRow[0].value + '.zip' : "Compressed_file.zip"));
                                                document.body.appendChild(link);
                                                link.click();

                                                setLoading(Object.assign({}, loading_buttons, { download: false }));
                                        }).catch(function (err) {
                                                console.log(err);
                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                setLoading(Object.assign({}, loading_buttons, { download: false }));
                                        });
                                }).catch(function (err) {
                                        console.log(err);
                                        window.show_response(err.message + ' ' + err.response.data.message, "error");
                                        setLoading(Object.assign({}, loading_buttons, { download: false }));
                                });
                        }
                }
                function handleDelete(e) {
                        var _this2 = this;

                        e.preventDefault();
                        e.stopPropagation();

                        var remove = function () {
                                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
                                        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                while (1) {
                                                        switch (_context5.prev = _context5.next) {
                                                                case 0:
                                                                        setLoading(Object.assign({}, loading_buttons, { delete: true }));

                                                                        return _context5.abrupt('return', Promise.all(selectedRow.map(function () {
                                                                                var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(row) {
                                                                                        var nodeIdentity, route;
                                                                                        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                                                                while (1) {
                                                                                                        switch (_context4.prev = _context4.next) {
                                                                                                                case 0:
                                                                                                                        // console.log(window.Global_State.identifyNode(row))
                                                                                                                        nodeIdentity = window.Global_State.identifyNode(row);
                                                                                                                        // const [ id, type ] = window.Global_State.identifyNode(row)

                                                                                                                        // console.log(selectedRow)

                                                                                                                        route = '';
                                                                                                                        _context4.t0 = row.type;
                                                                                                                        _context4.next = _context4.t0 === 'audit' ? 5 : _context4.t0 === 'checkList' ? 7 : _context4.t0 === 'dp' ? 8 : _context4.t0 === 'nonC' ? 9 : _context4.t0 === 'fnc' ? 10 : _context4.t0 === 'ds' ? 12 : _context4.t0 === 'f' ? 14 : 16;
                                                                                                                        break;

                                                                                                                case 5:
                                                                                                                        route = 'del_audit';
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 7:
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 8:
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 9:
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 10:
                                                                                                                        route = 'del_fnc';
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 12:
                                                                                                                        route = 'del_folder';
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 14:
                                                                                                                        route = 'del_file';
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 16:
                                                                                                                        return _context4.abrupt('break', 17);

                                                                                                                case 17:
                                                                                                                        _context4.next = 19;
                                                                                                                        return http.delete(route + '?id=' + nodeIdentity[0]).then(function (res) {
                                                                                                                                // console.log(res);
                                                                                                                                if (res.data.statue === 'success') window.show_response(row.value + ' supprim\xE9 avec succ\xE8s !', "success");else window.show_response(res.data.data.msg, res.data.statue);
                                                                                                                                setLoading(Object.assign({}, loading_buttons, { delete: false }));
                                                                                                                        }).catch(function (err) {
                                                                                                                                console.log(err);
                                                                                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                                                                                                setLoading(Object.assign({}, loading_buttons, { delete: false }));
                                                                                                                                // swal({
                                                                                                                                //         title: "Error",
                                                                                                                                //         text: err.response.data.message,
                                                                                                                                //         icon: "error"
                                                                                                                                // })
                                                                                                                        });

                                                                                                                case 19:
                                                                                                                case 'end':
                                                                                                                        return _context4.stop();
                                                                                                        }
                                                                                                }
                                                                                        }, _callee4, _this2);
                                                                                }));

                                                                                return function (_x2) {
                                                                                        return _ref10.apply(this, arguments);
                                                                                };
                                                                        }()

                                                                        // return 0;

                                                                        )));

                                                                case 2:
                                                                case 'end':
                                                                        return _context5.stop();
                                                        }
                                                }
                                        }, _callee5, _this2);
                                }));

                                return function remove() {
                                        return _ref9.apply(this, arguments);
                                };
                        }();

                        var localRemove = function localRemove() {
                                selectedRow.map(function (row) {
                                        // console.log(window.Global_State.identifyNode(row))
                                        var nodeIdentity = window.Global_State.identifyNode(row);
                                        // const [ id, type ] = window.Global_State.identifyNode(row)

                                        // console.log(selectedRow)
                                        switch (row.type) {
                                                case 'audit':

                                                        // console.log('audit dispatch del')
                                                        window.Global_State.editor.audit.delete(nodeIdentity[0]);

                                                        break;
                                                case 'checkList':
                                                        break;
                                                case 'dp':
                                                        break;
                                                case 'nonC':
                                                        break;
                                                case 'fnc':

                                                        // console.log('fnc dispatch del')
                                                        window.Global_State.editor.fnc.delete(nodeIdentity[0]);

                                                        break;
                                                case 'ds':

                                                        // console.log('folder del')
                                                        window.Global_State.editor.folder.delete(nodeIdentity[0]);

                                                        break;
                                                case 'f':

                                                        // console.log('file dispatch del')
                                                        window.Global_State.editor.files.delete(nodeIdentity[0]);

                                                        break;

                                                default:
                                                        break;
                                        }
                                });
                        };

                        // console.log(selectedRow[0].id.substring(2))
                        if (!window.Global_State.isEditorMode) {
                                swal({
                                        title: "Etes vous sûr ?",
                                        text: "La suppression est définitive !!",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true
                                }).then(function (willDelete) {
                                        if (willDelete) remove();
                                });
                        } else localRemove();
                }
                function handleUndo(e) {
                        // console.log("Undooooooooooo")
                        if (window.Global_State.editor.can_undo) {
                                e.preventDefault();
                                e.stopPropagation();

                                window.Global_State.EventsManager.emit("undo");
                        }
                }
                function handleRedo(e) {
                        // console.log("Redooooooooooo")
                        if (window.Global_State.editor.can_redo) {
                                e.preventDefault();
                                e.stopPropagation();

                                window.Global_State.EventsManager.emit("redo");
                        }
                }

                var refs = {
                        ctrl_c: useRef(),
                        ctrl_x: useRef(),
                        ctrl_d: useRef(),
                        ctrl_s: useRef(),
                        ctrl_t: useRef(),
                        ctrl_r: useRef()
                };

                useEffect(function () {
                        window.Global_State.EventsManager.on("shortcut", function (value) {
                                // console.log(refs[value]);
                                if (refs[value]) {
                                        var action_button = refs[value].current;

                                        if (action_button) action_button.click();
                                }
                        });

                        return function () {
                                window.Global_State.EventsManager.off("shortcut");
                        };
                }, []);

                var disable_feature = function disable_feature() {
                        var editing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                        var renaming = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                        if (editing) {
                                if (selectedRowNumber === 0) return true;

                                var _iteratorNormalCompletion7 = true;
                                var _didIteratorError7 = false;
                                var _iteratorError7 = undefined;

                                try {
                                        for (var _iterator7 = selectedRow[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                                var row = _step7.value;

                                                if (row.type !== "ds" && row.type !== "f") return true;
                                        }
                                } catch (err) {
                                        _didIteratorError7 = true;
                                        _iteratorError7 = err;
                                } finally {
                                        try {
                                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                                        _iterator7.return();
                                                }
                                        } finally {
                                                if (_didIteratorError7) {
                                                        throw _iteratorError7;
                                                }
                                        }
                                }

                                if (renaming) return selectedRowNumber !== 1;

                                return false;
                        } else return selectedRowNumber === 0;
                };

                return React.createElement(
                        'div',
                        { className: 'file_table_container_actions' },
                        React.createElement(
                                'div',
                                { className: 'full_size_element d-flex justify-content-between' },
                                React.createElement(
                                        Stack,
                                        { className: 'full_size_element', direction: "row", spacing: 1, divider: React.createElement(Divider, { orientation: 'vertical', flexItem: true }) },
                                        React.createElement(
                                                Tooltip,
                                                { title: "AJOUTER", placement: 'left-start' },
                                                React.createElement(
                                                        Dropdown,
                                                        null,
                                                        React.createElement(
                                                                Dropdown.Toggle,
                                                                { as: IconButton, color: "primary", id: 'add_dropdown' },
                                                                React.createElement(AddCircleTwoToneIcon, { color: "info", fontSize: "medium" })
                                                        ),
                                                        React.createElement(
                                                                Dropdown.Menu,
                                                                null,
                                                                buttons
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Stack,
                                                { direction: "row" },
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "COUPER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        IconButton,
                                                                        { id: 'ctrl_x', ref: refs.ctrl_x, color: "error", disabled: disable_feature(true), onClick: handleCut },
                                                                        React.createElement(IoIosCut, { color: disable_feature(true) ? '' : "#cc7613", size: 24 })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "COPIER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        IconButton,
                                                                        { id: 'ctrl_c', ref: refs.ctrl_c, color: "success", disabled: disable_feature(true), onClick: handleCopy },
                                                                        React.createElement(CopyAllTwoToneIcon, { color: disable_feature(true) ? '' : "success", fontSize: "medium" })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "COLLER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(Paste_component, null)
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "RENOMMER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        LoadingButton,
                                                                        { as: IconButton, loading: loading_buttons.rename, ref: refs.ctrl_r, color: "primary", disabled: disable_feature(true, true), onClick: handleRename },
                                                                        loading_buttons.rename ? null : React.createElement(BiRename, { color: disable_feature(true, true) ? '' : "blue", size: 24 })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "DÉTAILS", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        IconButton,
                                                                        { color: "info", disabled: selectedRowNumber !== 1, onClick: handleDetails },
                                                                        React.createElement(TbListDetails, { size: 24 })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "PARTAGER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        LoadingButton,
                                                                        { as: IconButton, loading: loading_buttons.share, color: "secondary", disabled: disable_feature(), onClick: handleShare },
                                                                        loading_buttons.share ? null : React.createElement(VscLiveShare, { color: disable_feature() ? '' : "purple", size: 24 })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "ACQUERIR", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        LoadingButton,
                                                                        { as: IconButton, loading: loading_buttons.download, color: "primary", disabled: disable_feature(), onClick: handleDownload },
                                                                        loading_buttons.download ? null : React.createElement(ImDownload2, { color: disable_feature() ? '' : "#1565c0", size: 24 })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        Tooltip,
                                                        { title: "SUPPRIMER", placement: 'top-end' },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'action_button' },
                                                                React.createElement(
                                                                        LoadingButton,
                                                                        { as: IconButton, loading: loading_buttons.delete, id: 'ctrl_d', ref: refs.ctrl_d, color: "error", disabled: disable_feature(), onClick: handleDelete },
                                                                        loading_buttons.delete ? null : React.createElement(RiDeleteBin2Fill, {
                                                                                color: disable_feature() ? '' : "red",
                                                                                size: 24 })
                                                                )
                                                        )
                                                )
                                        )
                                ),
                                window.Global_State.isEditorMode ? React.createElement(
                                        Stack,
                                        { className: 'd-none d-sm-flex', direction: "row", justifyContent: 'end' },
                                        React.createElement(
                                                Tooltip,
                                                { title: "Undo", placement: 'top-end' },
                                                React.createElement(
                                                        'div',
                                                        null,
                                                        React.createElement(
                                                                IconButton,
                                                                { disabled: !window.Global_State.editor.can_undo, onClick: handleUndo },
                                                                React.createElement(MdUndo, { color: !window.Global_State.editor.can_undo ? '' : "black", size: 24 })
                                                        )
                                                )
                                        ),
                                        React.createElement(
                                                Tooltip,
                                                { title: "Redo", placement: 'top-end' },
                                                React.createElement(
                                                        'div',
                                                        null,
                                                        React.createElement(
                                                                IconButton,
                                                                { disabled: !window.Global_State.editor.can_redo, onClick: handleRedo },
                                                                React.createElement(MdRedo, { color: !window.Global_State.editor.can_redo ? '' : "black", size: 24 })
                                                        )
                                                )
                                        )
                                ) : null
                        )
                );
        };

        var dataFormater = function dataFormater(node) {

                // console.log(node)
                var datas = [];

                function getTypeExt(ext) {
                        var img = ["jpeg", "jpg", "png", "gif"];
                        var vid = ["mp4", "avi", "MOV", "mpeg"];

                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                                for (var _iterator8 = img[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                        var imgExt = _step8.value;

                                        if (imgExt === ext) return "img";
                                }
                        } catch (err) {
                                _didIteratorError8 = true;
                                _iteratorError8 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                                _iterator8.return();
                                        }
                                } finally {
                                        if (_didIteratorError8) {
                                                throw _iteratorError8;
                                        }
                                }
                        }

                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                                for (var _iterator9 = vid[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                        var vidExt = _step9.value;

                                        if (vidExt === ext) return "vid";
                                }
                        } catch (err) {
                                _didIteratorError9 = true;
                                _iteratorError9 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                                _iterator9.return();
                                        }
                                } finally {
                                        if (_didIteratorError9) {
                                                throw _iteratorError9;
                                        }
                                }
                        }

                        return ext;
                }

                function TypeIcon(props) {
                        var _ref11 = [props.data, props.iconSize],
                            data = _ref11[0],
                            iconSize = _ref11[1];

                        if (data.global_type === "folder") {

                                var icon = window.Global_State.get_auditFamily_icon(data.type);

                                return icon || React.createElement(FcFolder, { style: { pointerEvents: "none" }, size: iconSize });
                        } else {
                                // <BsCardImage size={iconSize} />
                                switch (getTypeExt(data.ext)) {
                                        case "img":
                                                return React.createElement('img', { onClick: function onClick(e) {
                                                                window.Global_State.modalManager.setContent(React.createElement(
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
                                                                window.Global_State.modalManager.open_modal("Apercu de l' image");
                                                        }, style: { width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }, src: data.url, alt: '' });
                                        case "vid":
                                                return React.createElement(FcVideoFile, { onClick: function onClick(e) {
                                                                window.Global_State.modalManager.setContent(React.createElement(
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
                                                                window.Global_State.modalManager.open_modal("Apercu de l' image");
                                                        }, size: iconSize });
                                        case "docx":
                                                return React.createElement(RiFileWord2Fill, { color: '#295394', size: iconSize, onClick: function onClick(e) {
                                                                window.Global_State.modalManager.setContent(React.createElement('div', { style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                position: 'relative',
                                                                                alignItems: 'center'
                                                                        } }));
                                                                window.Global_State.modalManager.open_modal("Apercu du fichier");
                                                        } });
                                        case "pdf":
                                                return React.createElement(BsFillFileEarmarkPdfFill, { color: '#ad0b00', size: iconSize,
                                                        style: {
                                                                pointerEvents: 'all'
                                                        },
                                                        onClick: function onClick(e) {
                                                                // console.log(data)
                                                                window.Global_State.modalManager.setContent(React.createElement(
                                                                        'div',
                                                                        { style: {
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        position: 'relative',
                                                                                        alignItems: 'center'
                                                                                } },
                                                                        window.Global_State.getNodeDataById(data.id).onEdit ? 'Pas encore telechargé' : React.createElement('embed', { src: data.url + "#toolbar=0&navpanes=0&scrollbar=0", width: 900, height: 400, type: 'application/pdf' })
                                                                ));
                                                                window.Global_State.modalManager.open_modal("Apercu du fichier");
                                                        }
                                                });
                                        case "xlsx":
                                                return React.createElement(SiMicrosoftexcel, { color: '#1f6e43', size: iconSize });
                                        case "pptx":
                                                return React.createElement(SiMicrosoftpowerpoint, { color: '#ad0b00', size: iconSize, onClick: function onClick(e) {
                                                                window.Global_State.modalManager.setContent(React.createElement('div', { style: {
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                position: 'relative',
                                                                                alignItems: 'center'
                                                                        } }));
                                                                window.Global_State.modalManager.open_modal("Apercu du fichier");
                                                        } });
                                        default:
                                                return React.createElement(AiFillFileUnknown, { size: iconSize });
                                }
                        }
                }

                var NameFormater = function NameFormater(props) {
                        var name_ref = useRef();

                        var nameComponent = React.createElement(
                                'div',
                                Object.assign({ id: props.data.id, ref: name_ref, 'data-tag': 'allowRowEvents', className: 'd-flex justify-content-center align-items-center', style: { height: '100%', /* minWidth: 'fit-content',*/maxWidth: 400, zIndex: -1000 } }, props),
                                React.createElement(
                                        'span',
                                        { 'data-tag': 'allowRowEvents', style: { minWidth: 30, minHeight: 30 } },
                                        React.createElement(TypeIcon, Object.assign({ iconSize: 30 }, props))
                                ),
                                React.createElement(
                                        'span',
                                        { title: props.data.name, 'data-tag': 'allowRowEvents',
                                                style: {
                                                        MozUserSelect: 'none',
                                                        msUserSelect: 'none',
                                                        WebkitUserSelect: 'none',
                                                        userSelect: 'none',
                                                        marginLeft: 10,
                                                        fontSize: 15,
                                                        fontWeight: 'bold',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                }
                                        },
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

                var LevelComponent = function LevelComponent(_ref12) {
                        var data = _ref12.data;

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
                                var _this3 = this;

                                // console.log(level)
                                var node_data = window.Global_State.getNodeDataById(data.id);

                                var _window$Global_State$9 = window.Global_State.identifyNode(node_data),
                                    _window$Global_State$10 = _slicedToArray(_window$Global_State$9, 2),
                                    id = _window$Global_State$10[0],
                                    lol = _window$Global_State$10[1];
                                // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                var query = new FormData();
                                query.append('id', id);
                                query.append('update_object', 'level');
                                query.append('new_value', nextNiv(level));
                                query.append('additional_info', JSON.stringify({}));

                                if (!window.Global_State.isEditorMode) {
                                        var update = function () {
                                                var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
                                                        var onFulfilled, onRejected;
                                                        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                                while (1) {
                                                                        switch (_context6.prev = _context6.next) {
                                                                                case 0:
                                                                                        onFulfilled = function onFulfilled(res) {
                                                                                                // console.log('update_leveeeeeeeeeeeeeeeeeeeeeel', res)
                                                                                                toast.dismiss('update_lvl_' + data.id);
                                                                                                if (res.data.statue === "success") {
                                                                                                        window.show_response("Le niveau a été mis à jour", "success");
                                                                                                } else window.show_response(res.data.data.msg, res.data.statue);
                                                                                        };

                                                                                        onRejected = function onRejected(err) {
                                                                                                console.log(err);
                                                                                                toast.dismiss('update_lvl_' + data.id);
                                                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                                                        };

                                                                                        _context6.next = 4;
                                                                                        return http.post('update_fnc', query).then(onFulfilled, onRejected);

                                                                                case 4:
                                                                                case 'end':
                                                                                        return _context6.stop();
                                                                        }
                                                                }
                                                        }, _callee6, _this3);
                                                }));

                                                return function update() {
                                                        return _ref13.apply(this, arguments);
                                                };
                                        }();

                                        toast("Loading...", {
                                                id: 'update_lvl_' + data.id,
                                                type: 'loading',
                                                duration: Infinity
                                        });

                                        update();
                                } else {
                                        window.Global_State.editor.fnc.update(query);
                                }
                        }

                        return React.createElement(
                                'div',
                                { className: class_name, onClick: handleClick },
                                level
                        );
                };

                var OpeningDateComponent = function OpeningDateComponent(_ref14) {
                        var data = _ref14.data;

                        var value = data.opening_date ? data.opening_date : '____/__/__';

                        var handleClick = function handleClick(e) {
                                e.stopPropagation();
                                // console.log("opening date handle click")

                                var Date_input = function Date_input(_ref15) {
                                        var data = _ref15.data;

                                        var _useState19 = useState(false),
                                            _useState20 = _slicedToArray(_useState19, 2),
                                            open = _useState20[0],
                                            setOpen = _useState20[1];

                                        var _useState21 = useState(null),
                                            _useState22 = _slicedToArray(_useState21, 2),
                                            anchorEl = _useState22[0],
                                            setAnchorEl = _useState22[1];

                                        var _useState23 = useState(false),
                                            _useState24 = _slicedToArray(_useState23, 2),
                                            loading = _useState24[0],
                                            setLoading = _useState24[1];

                                        var _useState25 = useState(data.opening_date !== null ? new Date(data.opening_date) : new Date()),
                                            _useState26 = _slicedToArray(_useState25, 2),
                                            openingDate = _useState26[0],
                                            setOpeningDate = _useState26[1];

                                        // `${openingDate.getFullYear()}/${openingDate.getMonth()+1}/${openingDate.getDate()}`


                                        var new_opening_date = openingDate.getFullYear() + '/' + (openingDate.getMonth() + 1).toString().padStart(2, '0') + '/' + openingDate.getDate().toString().padStart(2, '0');
                                        // console.log('new_opening_date', new_opening_date, e)

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        // console.log('millesec dif', new Date(new_opening_date).valueOf() - new Date().valueOf())

                                        var handleSubmit = function handleSubmit(e) {
                                                e.stopPropagation();
                                                setLoading(true);

                                                // window.Global_State.setOverlay_props(t => (
                                                //                 {
                                                //                         ...t,
                                                //                         style:
                                                //                         {
                                                //                                 ...t.style,
                                                //                                 display: 'none',
                                                //                         },
                                                //                 }
                                                //         )
                                                // )

                                                // console.log(new_opening_date)

                                                var _window$Global_State$11 = window.Global_State.identifyNode(data),
                                                    _window$Global_State$12 = _slicedToArray(_window$Global_State$11, 2),
                                                    id = _window$Global_State$12[0],
                                                    model_type = _window$Global_State$12[1];

                                                var query = new FormData();
                                                query.append('id', id);
                                                query.append('update_object', 'opening_date');
                                                query.append('new_value', new_opening_date);

                                                if (!window.Global_State.isEditorMode) {
                                                        var onFulfilled = function onFulfilled(res) {
                                                                // console.log('update_open_daaaaaaaaate', res)
                                                                setLoading(false);
                                                                if (res.data.statue === "success") {
                                                                        window.show_response("La date d'ouverture a été mis à jour", "success");
                                                                        window.Global_State.absolutePopover.close();
                                                                } else window.show_response(res.data.data.msg, res.data.statue);
                                                        };
                                                        var onRejected = function onRejected(err) {
                                                                console.log(err);
                                                                setLoading(false);
                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                        };

                                                        http.post('update_fnc', query).then(onFulfilled, onRejected);
                                                } else {}
                                        };

                                        var handleChange = function handleChange(newValue) {
                                                var date = new Date(newValue);
                                                // console.log( "open_daaaaaaaate newValue", newValue, date.getDate())
                                                setOpeningDate(date);
                                        };

                                        var ResponsiveDatePicker = window.innerWidth > 576 ? DesktopDatePicker : MobileDatePicker;

                                        return React.createElement(
                                                'div',
                                                { className: 'd-flex justify-content-center align-items-center m-2',
                                                        onClick: function onClick(e) {
                                                                e.preventDefault();e.stopPropagation();
                                                        },
                                                        style: {
                                                                backgroundColor: 'rgba(255,255,255,0)',
                                                                borderRadius: 10,
                                                                border: '1px solid blue',
                                                                overflow: "hidden",
                                                                height: "fit-content",
                                                                width: "fit-content"
                                                        }
                                                },
                                                React.createElement(
                                                        'div',
                                                        { className: 'd-flex', style: { width: "fit-content" } },
                                                        React.createElement(
                                                                LocalizationProvider,
                                                                { dateAdapter: AdapterDayjs },
                                                                React.createElement(ResponsiveDatePicker, {
                                                                        open: open,
                                                                        PopperProps: {
                                                                                anchorEl: anchorEl
                                                                        },
                                                                        onClose: function onClose() {
                                                                                setOpen(false);setAnchorEl(null);
                                                                        },
                                                                        inputFormat: 'YYYY/MM/DD',
                                                                        value: openingDate,
                                                                        onChange: handleChange,
                                                                        maxDate: data.created_at.substring(0, 10),
                                                                        renderInput: function renderInput(params) {
                                                                                return React.createElement(CustomDateInput, { id: "lol78",
                                                                                        value: openingDate.toDateString(),
                                                                                        loading: loading,
                                                                                        onSubmit: handleSubmit,
                                                                                        onClick: function onClick(e) {
                                                                                                setAnchorEl(e.target);setOpen(true);
                                                                                        }
                                                                                });
                                                                        }
                                                                        // disablePast
                                                                })
                                                        )
                                                )
                                        );
                                };

                                // window.Global_State.setOverlay_props( t => (
                                // {
                                //         ...t,
                                //         style:
                                //         {
                                //                 ...t.style,
                                //                 display: 'flex',
                                //                 alignItems: 'center',
                                //                 justifyContent: 'center'
                                //         },
                                //         children: (
                                //         <div
                                //                 style=
                                //                 {{
                                //                         width: "max-content",
                                //                         marginTop: 15,
                                //                         backgroundColor: 'rgba(255,255,255,0)' ,
                                //                         position: "absolute",
                                //                         top: e.clientY - 37,
                                //                         left: e.clientX - 185/2
                                //                         // translate: `${Math.abs( e.clientX - window.innerWidth/2 )}px ${Math.abs( e.clientY - window.innerHeight/2 )}px`
                                //                 }}
                                //                 onClick={ e => { e.stopPropagation() } }
                                //         >
                                //                 <Date_input data={data} />
                                //         </div>
                                //         ),
                                //
                                // }
                                // ) )

                                window.Global_State.absolutePopover.open(React.createElement(Date_input, { data: data }), e.target);
                        };

                        return React.createElement(
                                'span',
                                { className: '' + (data.opening_date ? 'text-primary' : ''), onClick: handleClick },
                                value
                        );
                };

                var ReviewDateComponent = function ReviewDateComponent(_ref16) {
                        var data = _ref16.data;

                        var value = data.review_date ? data.review_date : '____/__/__';

                        var handleClick = function handleClick(e) {
                                e.stopPropagation();
                                // console.log("OPENING date handle click")

                                var Date_input = function Date_input(_ref17) {
                                        var data = _ref17.data;

                                        var _useState27 = useState(false),
                                            _useState28 = _slicedToArray(_useState27, 2),
                                            clearLoading = _useState28[0],
                                            setClearLoading = _useState28[1];

                                        var _useState29 = useState(false),
                                            _useState30 = _slicedToArray(_useState29, 2),
                                            open = _useState30[0],
                                            setOpen = _useState30[1];

                                        var _useState31 = useState(null),
                                            _useState32 = _slicedToArray(_useState31, 2),
                                            anchorEl = _useState32[0],
                                            setAnchorEl = _useState32[1];

                                        var _useState33 = useState(false),
                                            _useState34 = _slicedToArray(_useState33, 2),
                                            loading = _useState34[0],
                                            setLoading = _useState34[1];

                                        // const CustomInput = forwardRef(
                                        //         ({ value, onClick }, ref) =>
                                        //         (
                                        //                 <Stack direction={'row'} sx={{ width: 'fit-content', backgroundColor: 'whitesmoke' }}>
                                        //                         <input ref={ref}
                                        //                                className="form-control form-control-sm"
                                        //                                style={{ height: 35, textAlign: 'center', border: 'none', borderRadius: 0 }}
                                        //                                value={`${value}`}
                                        //                                onChange={e => {e.preventDefault(); e.stopPropagation()}}
                                        //                                onClick={onClick}
                                        //                                readOnly
                                        //                         />
                                        //
                                        //                         <div  style={{ width: 'fit-content', height: 'fit-content', padding: 5, backgroundColor: '#E9ECEFFF' }} onClick={ handleSubmit } >
                                        //                                 <HiSaveAs size={25} color={'blue'} />
                                        //                         </div>
                                        //                 </Stack>
                                        //         )
                                        // );

                                        var CustomTimeInput = useCallback(function CustomTimeInput(_ref18) {
                                                var date = _ref18.date,
                                                    value = _ref18.value,
                                                    onChange = _ref18.onChange;


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

                                        var _useState35 = useState(data.review_date !== null ? new Date(data.review_date) : new Date()),
                                            _useState36 = _slicedToArray(_useState35, 2),
                                            reviewDate = _useState36[0],
                                            setReviewDate = _useState36[1];

                                        var new_review_date = reviewDate.getFullYear() + '/' + (reviewDate.getMonth() + 1) + '/' + reviewDate.getDate() + ' ' + reviewDate.getHours() + ':' + reviewDate.getMinutes();
                                        // console.log('new_review_date', new_review_date, e)

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        // console.log('millesec dif', new Date(new_review_date).valueOf() - new Date().valueOf())

                                        var handleSubmit = function handleSubmit(e) {
                                                e.stopPropagation();

                                                // window.Global_State.setOverlay_props(t => (
                                                //                 {
                                                //                         ...t,
                                                //                         style:
                                                //                         {
                                                //                                 ...t.style,
                                                //                                 display: 'none',
                                                //                         },
                                                //                 }
                                                //         )
                                                // )

                                                setLoading(true);

                                                // console.log(new_review_date)

                                                var _window$Global_State$13 = window.Global_State.identifyNode(data),
                                                    _window$Global_State$14 = _slicedToArray(_window$Global_State$13, 2),
                                                    id = _window$Global_State$14[0],
                                                    model_type = _window$Global_State$14[1];

                                                var query = new FormData();
                                                query.append('id', id);
                                                query.append('update_object', 'review_date');
                                                query.append('new_value', new_review_date);
                                                query.append('additional_info', JSON.stringify({
                                                        remain_ms: '' + (new Date(new_review_date).valueOf() - new Date().valueOf())
                                                }));

                                                if (!window.Global_State.isEditorMode) {
                                                        var onFulfilled = function onFulfilled(res) {
                                                                // console.log('update_review_daaaaaaaaate', res)
                                                                setLoading(false);
                                                                if (res.data.statue === "success") {
                                                                        window.show_response("La date de révision a été mis à jour", "success");
                                                                        window.Global_State.absolutePopover.close();
                                                                } else window.show_response(res.data.data.msg, res.data.statue);
                                                        };
                                                        var onRejected = function onRejected(err) {
                                                                console.log(err);
                                                                setLoading(false);
                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                        };

                                                        http.post('update_fnc', query).then(onFulfilled, onRejected);
                                                } else {
                                                        window.Global_State.editor.fnc.update(query);
                                                }
                                        };

                                        var handleClear = function handleClear(e) {
                                                e.stopPropagation();

                                                // console.log("clear_review_date")

                                                var id = window.Global_State.identifyNode(data)[0];

                                                if (!window.Global_State.isEditorMode) {
                                                        setClearLoading(true);

                                                        var onFulfilled = function onFulfilled(res) {
                                                                // console.log('clear_review_daaaaaaaaaaaaaate', res)
                                                                setClearLoading(false);
                                                                window.Global_State.absolutePopover.close();
                                                                if (res.data.statue === "success") {
                                                                        window.show_response("Programation de révision annulée", "success");
                                                                } else window.show_response(res.data.data.msg, res.data.statue);
                                                        };
                                                        var onRejected = function onRejected(err) {
                                                                console.log(err);
                                                                setClearLoading(false);
                                                                window.Global_State.absolutePopover.close();
                                                                window.show_response(err.message + ' ' + err.response.data.message, "error");
                                                        };

                                                        http.post("update_fnc", { id: id, update_object: "cancel_review", new_value: 'null' }).then(onFulfilled, onRejected);
                                                } else {}
                                        };

                                        var handleChange = function handleChange(newValue) {
                                                var date = new Date(newValue);
                                                setReviewDate(date);
                                        };

                                        return React.createElement(
                                                Stack,
                                                { className: 'm-2', direction: "row", spacing: 1, alignItems: "center", onClick: function onClick(e) {
                                                                e.preventDefault();e.stopPropagation();
                                                        } },
                                                React.createElement(
                                                        'div',
                                                        { className: 'd-flex justify-content-center align-items-center',
                                                                style: {
                                                                        backgroundColor: 'rgba(255,255,255,0)',
                                                                        borderRadius: 10,
                                                                        border: '1px solid blue',
                                                                        overflow: "hidden",
                                                                        height: "fit-content",
                                                                        width: "fit-content"
                                                                }
                                                        },
                                                        React.createElement(
                                                                'div',
                                                                { className: 'd-flex', style: { width: "fit-content" } },
                                                                React.createElement(
                                                                        LocalizationProvider,
                                                                        { dateAdapter: AdapterDayjs },
                                                                        React.createElement(DateTimePicker, {
                                                                                open: open,
                                                                                PopperProps: {
                                                                                        anchorEl: anchorEl
                                                                                },
                                                                                onClose: function onClose() {
                                                                                        setOpen(false);setAnchorEl(null);
                                                                                },
                                                                                inputFormat: 'YYYY/MM/DD',
                                                                                value: reviewDate,
                                                                                onChange: handleChange,
                                                                                minDate: new Date(),
                                                                                renderInput: function renderInput(params) {
                                                                                        return React.createElement(CustomDateInput, { id: "lol78",
                                                                                                value: reviewDate.toDateString(),
                                                                                                loading: loading,
                                                                                                onSubmit: handleSubmit,
                                                                                                onClick: function onClick(e) {
                                                                                                        setAnchorEl(e.target);setOpen(true);
                                                                                                }
                                                                                        });
                                                                                },
                                                                                disablePast: true
                                                                        })
                                                                )
                                                        )
                                                ),
                                                React.createElement(
                                                        LoadingButton,
                                                        { as: IconButton, loading: clearLoading, title: "EFFACER", color: "error", disabled: value === '____/__/__', onClick: handleClear },
                                                        clearLoading ? null : React.createElement(AiFillCloseCircle, { size: 25 })
                                                )
                                        );
                                };

                                // window.Global_State.setOverlay_props( t => (
                                // {
                                //         ...t,
                                //         style:
                                //         {
                                //                 ...t.style,
                                //                 display: 'flex',
                                //                 alignItems: 'center',
                                //                 justifyContent: 'center'
                                //         },
                                //         children: (
                                //         <div
                                //                 style=
                                //                 {{
                                //                         width: "max-content",
                                //                         marginTop: 15,
                                //                         backgroundColor: 'rgba(255,255,255,0)' ,
                                //                         position: "absolute",
                                //                         top: e.clientY - 37,
                                //                         left: e.clientX - 185/2
                                //                         // translate: `${Math.abs( e.clientX - window.innerWidth/2 )}px ${Math.abs( e.clientY - window.innerHeight/2 )}px`
                                //                 }}
                                //                 onClick={ e => { e.stopPropagation() } }
                                //         >
                                //                 <Date_input data={data} />
                                //         </div>
                                //         ),
                                //
                                // }
                                // ) )

                                window.Global_State.absolutePopover.open(React.createElement(Date_input, { data: data }), e.target);
                        };

                        return React.createElement(
                                'span',
                                { className: '' + (data.review_date ? 'text-primary' : ''), onClick: handleClick },
                                value
                        );
                };

                var IsClosedComponent = function IsClosedComponent(_ref19) {
                        var data = _ref19.data;

                        var handleClick = function handleClick(e) {
                                e.stopPropagation();
                                // console.log("IsClosedComponent handle click")

                                var _window$Global_State$15 = window.Global_State.identifyNode(data),
                                    _window$Global_State$16 = _slicedToArray(_window$Global_State$15, 2),
                                    id = _window$Global_State$16[0],
                                    model = _window$Global_State$16[1];

                                var query = new FormData();
                                query.append('id', id);
                                query.append('update_object', 'isClosed');
                                query.append('new_value', data.isClosed ? 0 : 1);

                                if (!window.Global_State.isEditorMode) {
                                        toast.promise(http.post('update_fnc', query), {
                                                loading: 'Loading...',
                                                success: 'Processus achevé',
                                                error: 'Erreur'
                                        }, {
                                                id: 'is_closed_' + data.id,
                                                duration: Infinity
                                        }).then(function (res) {
                                                // console.log(res)
                                                switch (res.data.statue) {
                                                        case 'success':
                                                                toast('Le statue a \xE9t\xE9 mise \xE1 jour !!', { type: 'success' });
                                                                break;
                                                        case 'error':
                                                                toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                                break;
                                                        case 'info':
                                                                toast('Info: ' + res.data.data.msg, { icon: "📢", style: { fontWeight: 'bold' } });
                                                                break;
                                                }
                                                setTimeout(function () {
                                                        toast.dismiss('is_closed_' + data.id);
                                                }, 600);
                                        }).catch(function (err) {
                                                console.log(err);setTimeout(function () {
                                                        toast.dismiss('is_closed_' + data.id);
                                                }, 600);
                                        });
                                } else {
                                        // window.Global_State.editor.fnc.update(query)
                                }
                        };

                        return data.isClosed ? React.createElement(
                                'div',
                                { className: 'badge bg-success-bright text-success', onClick: handleClick },
                                'Cl\xF4tur\xE9'
                        ) : React.createElement(
                                'div',
                                { className: 'badge bg-danger-bright text-danger', onClick: handleClick },
                                'Non-Cl\xF4tur\xE9'
                        );
                };

                var ValidBadge = function ValidBadge(_ref20) {
                        var data = _ref20.data;

                        var _useState37 = useState(false),
                            _useState38 = _slicedToArray(_useState37, 2),
                            checked = _useState38[0],
                            check = _useState38[1];

                        function handleClick(e) {
                                e.preventDefault();
                                e.stopPropagation();

                                // console.log(e)

                                var _window$Global_State$17 = window.Global_State.identifyNode(data),
                                    _window$Global_State$18 = _slicedToArray(_window$Global_State$17, 2),
                                    id = _window$Global_State$18[0],
                                    model = _window$Global_State$18[1];
                                // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                var query = new FormData();
                                query.append('id', id);
                                query.append('update_object', 'is_validated');
                                query.append('new_value', data.is_validated ? 0 : 1);
                                query.append('additional_info', JSON.stringify({}));

                                var route = void 0;

                                switch (model) {
                                        case 'App\\Models\\Audit':
                                                route = 'update_audit';
                                                break;
                                        case 'App\\Models\\checkList':
                                                route = 'update_checkList';
                                                break;
                                        case 'App\\Models\\DossierPreuve':
                                                route = 'update_dp';
                                                break;
                                        case 'App\\Models\\Nc':
                                                route = 'update_nc';
                                                break;
                                        case 'App\\Models\\NonConformite':
                                                route = 'update_fnc';
                                                break;
                                        case 'App\\Models\\DossierSimple':
                                                route = 'update_folder';
                                                break;
                                        case 'App\\Models\\Fichier':
                                                route = 'update_file';
                                                break;
                                        default:
                                                return null;

                                }

                                // console.log(selectedRow[0].id.substring(2))
                                toast.promise(http.post('' + route, query), {
                                        loading: 'Loading...',
                                        success: 'Proccesus achevé',
                                        error: 'err'
                                }, {
                                        id: '' + route + data.id,
                                        duration: Infinity
                                }).then(function (res) {
                                        // console.log(res)
                                        switch (res.data.statue) {
                                                case 'success':
                                                        toast('L\'element a \xE9t\xE9 ' + (res.data.data.is_validated ? "validé" : "dévalidé"), { type: 'success' });
                                                        break;
                                                case 'error':
                                                        toast('Erreur survenue: ' + res.data.data.msg, { type: 'error' });
                                                        break;
                                                case 'info':
                                                        toast('Info: ' + res.data.data.msg, {
                                                                icon: "📢",
                                                                style: { fontWeight: 'bold' }
                                                        });
                                                        break;
                                        }
                                        setTimeout(function () {
                                                toast.dismiss('' + route + data.id);
                                        }, 600);
                                }).catch(function (err) {
                                        console.log(err);
                                        setTimeout(function () {
                                                toast.dismiss('' + route + data.id);
                                        }, 600);
                                });
                        }

                        var checkBox_package = useCustomCheckBox();

                        return React.createElement(
                                'div',
                                { className: 'd-flex align-items-center justify-content-center', style: { width: 40, height: 30 }, onClick: handleClick },
                                data.is_validated ? React.createElement(BsPatchCheckFill, { size: 16, color: "#0cd10c" }) : React.createElement(VscCircleLargeOutline, { size: 16, color: '#b4b2b2' })
                        );
                };

                function getTopLevelParent(node) {
                        if (node.parentId === "0") return Object.assign({}, node);else {
                                var parent = window.Global_State.getNodeDataById(node.parentId);

                                return getTopLevelParent(parent);
                        }
                }

                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                        for (var _iterator10 = node.children[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var child_node = _step10.value;

                                // console.log('child_node.id', child_node)
                                var data = child_node; // window.Global_State.getNodeDataById(child_node.id)
                                // if (data === null) continue

                                var validation_component = void 0;

                                if (data.is_validated) validation_component = React.createElement(ValidBadge, { data: data });else if (window.Global_State.authUser.right_lvl === 2) validation_component = React.createElement(ValidBadge, { data: data });else {
                                        var top_lvl_parent = getTopLevelParent(data);
                                        if (top_lvl_parent.ra && window.Global_State.authUser.id === top_lvl_parent.ra.id) validation_component = React.createElement(ValidBadge, { data: data });else validation_component = React.createElement('div', { style: { pointerEvents: "none" } });
                                }

                                datas.push({
                                        id: data.id,
                                        value: data.name,
                                        level_value: data.level,
                                        name: React.createElement(NameFormater, { data: data }),
                                        level: data.type === "fnc" ? React.createElement(LevelComponent, { data: data }) : undefined,
                                        created_at: data.created_at,
                                        isClosed: data.type === "fnc" ? React.createElement(IsClosedComponent, { data: data }) : undefined,
                                        RA: node.type === "root" && data.type === 'audit' ? data.ra.name.substring(0, 1) + ". " + data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " + node.ra.second_name : undefined,
                                        size: data.global_type === 'file' ? window.Global_State.sizeFormater(data.taille) : undefined,
                                        type: data.type,
                                        global_type: data.global_type,
                                        section_id: data.section_id,
                                        isBeingEdited: data.onEdit,
                                        opening_date: data.type !== "fnc" ? '' : React.createElement(OpeningDateComponent, { data: data }),
                                        review_date: data.review_date === undefined ? '' : React.createElement(ReviewDateComponent, { data: data }),
                                        valid_badge: validation_component

                                });
                        }
                } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                } finally {
                        try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                        _iterator10.return();
                                }
                        } finally {
                                if (_didIteratorError10) {
                                        throw _iteratorError10;
                                }
                        }
                }

                return datas;
        };

        // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
        var sortByName = function sortByName(rowA, rowB) {
                // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
                if (node.type === 'nonC') {
                        var _ref21 = [rowA.value.split('-'), rowB.value.split('-')],
                            listA = _ref21[0],
                            listB = _ref21[1];
                        var _ref22 = [parseInt(listA[listA.length - 1]), parseInt(listB[listB.length - 1])],
                            a = _ref22[0],
                            b = _ref22[1];


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

        var compareDate = function compareDate(dateA, dateB) {
                // console.log("daaaaaaaaate", dateA, dateB)
                if (!dateA && !dateB) return 0;else if (!dateA) return 0;else if (!dateB) return 0;else {
                        var a = new Date(dateA);
                        var b = new Date(dateB);

                        if (a.valueOf() > b.valueOf()) return 1;

                        if (b.valueOf() > a.valueOf()) return -1;

                        return 0;
                }
        };

        var columns = useMemo(function () {
                var columns_of_the_type = [{
                        name: '',
                        button: true,
                        cell: function cell(row) {
                                return row.valid_badge;
                        },
                        sortable: false,
                        width: "20px"
                }, {
                        name: 'NOM',
                        selector: function selector(row) {
                                return row.name;
                        },
                        sortable: true,
                        sortFunction: sortByName
                }];

                if (node.type === "root" && contain_audit) {
                        columns_of_the_type.push.apply(columns_of_the_type, [{
                                name: 'CREE LE',
                                selector: function selector(row) {
                                        return row.created_at.replace("T", " À ");
                                },
                                sortable: true,
                                sortFunction: function sortFunction(rowA, rowB) {
                                        return compareDate(rowA.created_at, rowB.created_at);
                                },
                                width: "30%"
                        }, {
                                name: 'RA',
                                selector: function selector(row) {
                                        return row.RA;
                                },
                                sortable: true,
                                width: "20%"
                        }]);
                } else if (node.type === "audit") {
                        columns_of_the_type.push.apply(columns_of_the_type, [{
                                name: 'RA',
                                selector: function selector(row) {
                                        return row.RA;
                                },
                                sortable: true
                        }]);
                } else if (node.type === "nonC") {
                        columns_of_the_type.push.apply(columns_of_the_type, [{
                                name: "DATE D'OUVERTURE",
                                selector: function selector(row) {
                                        return row.opening_date;
                                },
                                sortable: true,
                                sortFunction: function sortFunction(rowA, rowB) {
                                        return rowA.opening_date ? compareDate(rowA.opening_date.props.data.opening_date, rowB.opening_date.props.data.opening_date) : 0;
                                },
                                width: "15%"
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
                                sortFunction: function sortFunction(rowA, rowB) {
                                        return rowA.review_date ? compareDate(rowA.review_date.props.data.review_date, rowB.review_date.props.data.review_date) : 0;
                                },
                                width: "15%"
                        }, {
                                name: 'STATUE',
                                selector: function selector(row) {
                                        return row.isClosed;
                                },
                                width: "16%"
                        }]);
                } else columns_of_the_type.push.apply(columns_of_the_type, [{
                        name: 'CREE LE',
                        selector: function selector(row) {
                                return row.created_at.replace("T", " À ");
                        },
                        sortable: true,
                        sortFunction: function sortFunction(rowA, rowB) {
                                return compareDate(rowA.created_at, rowB.created_at);
                        },
                        width: "30%"
                }, {
                        name: 'TAILLE',
                        selector: function selector(row) {
                                return row.size;
                        },
                        sortable: true,
                        width: "100px"
                }]);

                return columns_of_the_type;
        }, [node]);

        var formattedDatas = useMemo(function () {
                return dataFormater(node);
        }, [node]);
        // const formattedDatas = useDataFormater(node)

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
                window.Global_State.EventsManager.emit('clearSelected');

                if (filter.tag === "la Date de revision" && node.type !== "nonC") setFilter({ tag: "le Nom", element: '' });
                if (filter.tag === "le RA" && !contain_audit) setFilter({ tag: "le Nom", element: '' });
        }, [node]);

        useEffect(function () {
                dispatch({ type: 'nodeUpdate', newDatas: initDatas });
        }, [formattedDatas]);

        // console.log('contentRender')

        var handleChange = function handleChange(selectedCount, selectedRows) {
                var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                // console.log(selectedRows)
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

        var onRowDoubleClicked = function () {
                var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(row, event) {
                        var tree_row, full_row_data, parent_node, doubleClickEvent;
                        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                                while (1) {
                                        switch (_context7.prev = _context7.next) {
                                                case 0:
                                                        // console.log('db_cliked_row', row)
                                                        tree_row = document.getElementById('treeRow-' + row.id);

                                                        if (tree_row) {
                                                                _context7.next = 11;
                                                                break;
                                                        }

                                                        // console.log('checkpoint 1', tree_row)
                                                        full_row_data = window.Global_State.getNodeDataById(row.id);
                                                        // console.log('checkpoint 1.5', full_row_data)

                                                        if (!(full_row_data.global_type === 'folder')) {
                                                                _context7.next = 10;
                                                                break;
                                                        }

                                                        // console.log('checkpoint 2', full_row_data)

                                                        parent_node = window.Global_State.getNodeDataById(full_row_data.parentId);
                                                        _context7.next = 7;
                                                        return onRowDoubleClicked(parent_node, '');

                                                case 7:
                                                        tree_row = document.getElementById('treeRow-' + row.id);
                                                        _context7.next = 11;
                                                        break;

                                                case 10:
                                                        return _context7.abrupt('return');

                                                case 11:

                                                        tree_row.click();

                                                        doubleClickEvent = new MouseEvent("dblclick", {
                                                                view: window,
                                                                bubbles: true,
                                                                cancelable: true
                                                        });

                                                        doubleClickEvent.is_opening = true;

                                                        // console.log('dbclick_proggggggg', doubleClickEvent, doubleClickEvent.is_opening)

                                                        tree_row.dispatchEvent(doubleClickEvent);

                                                        // window.Global_State.backend.setCurrentSelectedFolder(row.id)
                                                        // console.log('dbclick',row)

                                                case 15:
                                                case 'end':
                                                        return _context7.stop();
                                        }
                                }
                        }, _callee7, _this4);
                }));

                return function onRowDoubleClicked(_x6, _x7) {
                        return _ref23.apply(this, arguments);
                };
        }();

        var handleClick = function handleClick(row, event) {
                // console.log(row.id, event);

                event.preventDefault();event.stopPropagation();
                if (event.ctrlKey || event.altKey || event.shiftKey) handleChange(1, [row], true);else handleChange(1, [row]);

                // selectedRowsByClick.current = [row]
        };

        var style = useSpring({
                from: {
                        opacity: 0,
                        transform: 'translate3d(20px,0,0)'
                },
                to: {
                        opacity: 1,
                        transform: 'translate3d(' + 0 + 'px,0,0)'
                },
                delay: 5000
        });

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

        var filtered_datas = useMemo(function () {
                return datas.filter(function (row) {
                        switch (filter.tag) {
                                case 'le Nom':
                                        if (node.type === 'nonC' && /^\d+$/.test(filter.element)) {
                                                var list = row.value.split('-');

                                                return parseInt(list[list.length - 1]) === parseInt(filter.element);
                                        } else return row.value.indexOf(filter.element) !== -1;
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

                                                var data = window.Global_State.getNodeDataById(row.id);

                                                var _filter$element4 = _slicedToArray(filter.element, 2),
                                                    _debut = _filter$element4[0],
                                                    _fin = _filter$element4[1];

                                                if (_debut === null && _fin === null) return true;else if (data.review_date && data.review_date.length) {

                                                        var revision_string_date = data.review_date.substring(0, 10);
                                                        var formatted_revision_string_date = revision_string_date.split('-').join('/');

                                                        var revision_date = new Date(formatted_revision_string_date);

                                                        // console.log('review_daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate', revision_date.toString() )
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

        // console.log('filtered_datataaaaaaas', filtered_datas, columns)

        return React.createElement(
                'div',
                { className: 'file_table_container full_size_element' },
                React.createElement(
                        'div',
                        { className: 'file_table_container_header' },
                        React.createElement(
                                Stack,
                                { direction: "row", spacing: 2, divider: React.createElement(Divider, { orientation: 'vertical', flexItem: true }),
                                        style: {
                                                padding: 3
                                        }
                                },
                                React.createElement(
                                        Stack,
                                        { direction: "row" },
                                        React.createElement(Prev, { node: node }),
                                        React.createElement(Next, null),
                                        useMemo(function () {
                                                return React.createElement(ClimbTree, { node: node });
                                        }, [node])
                                ),
                                useMemo(function () {
                                        return React.createElement(FilterComponent, { set: setFilter, filter: filter, node: node });
                                }, [filter, node])
                        ),
                        React.createElement(ActionsMenu, null)
                ),
                React.createElement(
                        'div',
                        { className: 'file_table_container_content' },
                        React.createElement(DataTable, {
                                className: 'dataTable_container',
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
                                onSelectedRowsChange: function onSelectedRowsChange(_ref24) {
                                        var selectedCount = _ref24.selectedCount,
                                            selectedRows = _ref24.selectedRows;
                                        if (filtered_datas.length > 0) handleChange(selectedCount, selectedRows);
                                },
                                clearSelectedRows: window.Global_State.toggleCleared,
                                onRowDoubleClicked: onRowDoubleClicked,
                                onRowClicked: handleClick
                                // onContextMenu={(event) => { console.log(event) }}

                                , paginationRowsPerPageOptions: [15, 25, 50, 100, 200],
                                paginationPerPage: 50,
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
                                noHeader: true
                                // subHeader
                                // subHeaderComponent = {  }
                                , noDataComponent: React.createElement(
                                        'div',
                                        { style: { textAlign: "center", marginTop: 100 } },
                                        ' Vide \uD83D\uDE22 '
                                ),
                                sortIcon: React.createElement(FaSort, { size: 10 }),
                                defaultSortFieldId: 1
                        })
                )
        );
}

// const OpeningDateComponent = ({data}) =>
// {
//         const value = data.opening_date ? data.opening_date : '____/__/__'
//
//         const handleClick = e =>
//         {
//                 e.stopPropagation()
//                 console.log("opening date handle click")
//
//                 const Date_input = ({data }) =>
//                 {
//                         const [loading, setLoading] = useState(false)
//
//                         const CustomInput = forwardRef(
//                         ({ value, onClick, loading, onSubmit }, ref) =>
//                         (
//                         <Stack direction={'row'} sx={{ width: 'fit-content', backgroundColor: '#e9ecef' }}>
//                                 <input ref={ref}
//                                        className="form-control form-control-sm"
//                                        style={{ height: 35, textAlign: 'center', border: 'none', borderRadius: 0, backgroundColor: "rgba(233,236,239,0)" }}
//                                        value={`${value}`}
//                                        onChange={e => {e.preventDefault(); e.stopPropagation()}}
//                                        onClick={onClick}
//                                        readOnly
//                                 />
//
//                                 <LoadingButton as={IconButton} loading={loading} title={"EFFACER"} color={"primary"} size={"small"} style={{ minWidth: 30 }} onClick={onSubmit} >
//                                         {
//                                                 loading ? null : <RiUploadCloud2Fill size={20} />
//                                         }
//                                 </LoadingButton>
//                         </Stack>
//                         )
//                         );
//
//                         const [openingDate, setOpeningDate] = useState(data.opening_date !== null ? new Date(data.opening_date) : new Date());
//
//                         const new_opening_date = `${openingDate.getFullYear()}/${openingDate.getMonth()+1}/${openingDate.getDate()} ${openingDate.getHours()}:${openingDate.getMinutes()}`
//                         console.log('new_opening_date', new_opening_date, e)
//
//                         // let today = new Date()
//                         // today.setHours(0, 0, 0, 0)
//
//                         console.log('millesec dif', new Date(new_opening_date).valueOf() - new Date().valueOf())
//
//                         const handleSubmit = e =>
//                         {
//                                 e.stopPropagation()
//                                 setLoading(true)
//
//                                 // window.Global_State.setOverlay_props(t => (
//                                 //                 {
//                                 //                         ...t,
//                                 //                         style:
//                                 //                         {
//                                 //                                 ...t.style,
//                                 //                                 display: 'none',
//                                 //                         },
//                                 //                 }
//                                 //         )
//                                 // )
//
//                                 console.log(new_opening_date)
//                                 const [id, model_type] = window.Global_State.identifyNode(data)
//
//                                 const query = new FormData;
//                                 query.append('id', id)
//                                 query.append('update_object', 'opening_date')
//                                 query.append('new_value', new_opening_date)
//
//                                 if(!window.Global_State.isEditorMode)
//                                 {
//                                         const onFulfilled = (res) =>
//                                         {
//                                                 console.log('update_open_daaaaaaaaate', res)
//                                                 setLoading(false)
//                                                 if (res.data.statue === "success")
//                                                 {
//                                                         window.show_response("Le niveau a été mis à jour", "success")
//                                                 }
//                                                 else window.show_response(res.data.data.msg, res.data.statue)
//                                         }
//                                         const onRejected = (err) =>
//                                         {
//                                                 console.log(err)
//                                                 setLoading(false)
//                                                 window.show_response(`${err.message} ${err.response.data.message}`, "error")
//                                         }
//
//                                         http.post('update_fnc', query)
//                                         .then(onFulfilled, onRejected)
//                                 }
//                                 else
//                                 {
//                                 }
//                         }
//
//                         return (
//                         <div className={`d-flex justify-content-center align-items-center m-2`}
//                              onClick={e => { e.preventDefault(); e.stopPropagation() }}
//                              style={{
//                                      backgroundColor: 'rgba(255,255,255,0)',
//                                      borderRadius: 10,
//                                      border: '1px solid blue',
//                                      overflow: "hidden",
//                                      height: "fit-content",
//                                      width: "fit-content",
//                              }}
//                         >
//                                 <div className={`d-flex`} style={{ width: "fit-content" }} >
//                                         <DatePicker
//                                         selected={openingDate}
//                                         popperClassName = 'reactDatePickerPopper'
//                                         dateFormat="yyyy/MM/dd"
//                                         onChange={(date) => setOpeningDate(date)}
//                                         showYearDropdown
//                                         scrollableYearDropdown
//                                         yearDropdownItemNumber={20}
//                                         customInput ={ <CustomInput loading={loading} onSubmit={handleSubmit} /> }
//                                         />
//                                 </div>
//                         </div>
//                         )
//                 }
//
//                 // window.Global_State.setOverlay_props( t => (
//                 // {
//                 //         ...t,
//                 //         style:
//                 //         {
//                 //                 ...t.style,
//                 //                 display: 'flex',
//                 //                 alignItems: 'center',
//                 //                 justifyContent: 'center'
//                 //         },
//                 //         children: (
//                 //         <div
//                 //                 style=
//                 //                 {{
//                 //                         width: "max-content",
//                 //                         marginTop: 15,
//                 //                         backgroundColor: 'rgba(255,255,255,0)' ,
//                 //                         position: "absolute",
//                 //                         top: e.clientY - 37,
//                 //                         left: e.clientX - 185/2
//                 //                         // translate: `${Math.abs( e.clientX - window.innerWidth/2 )}px ${Math.abs( e.clientY - window.innerHeight/2 )}px`
//                 //                 }}
//                 //                 onClick={ e => { e.stopPropagation() } }
//                 //         >
//                 //                 <Date_input data={data} />
//                 //         </div>
//                 //         ),
//                 //
//                 // }
//                 // ) )
//
//                 window.Global_State.absolutePopover.open(<Date_input data={data} />, e.target)
//         }
//
//         return(
//         <span className={`${data.opening_date ? 'text-primary' : ''}`} onClick={handleClick} >
//                                         {value}
//                                 </span>
//         )
// }
//
// const ReviewDateComponent = ({data}) =>
// {
//         const value = data.review_date ? data.review_date : '____/__/__'
//
//         const handleClick = e =>
//         {
//                 e.stopPropagation()
//                 console.log("OPENING date handle click")
//
//                 const Date_input = ({data }) =>
//                 {
//                         const [clearLoading, setClearLoading] = useState(false)
//                         const [loading, setLoading] = useState(false)
//
//                         // const CustomInput = forwardRef(
//                         //         ({ value, onClick }, ref) =>
//                         //         (
//                         //                 <Stack direction={'row'} sx={{ width: 'fit-content', backgroundColor: 'whitesmoke' }}>
//                         //                         <input ref={ref}
//                         //                                className="form-control form-control-sm"
//                         //                                style={{ height: 35, textAlign: 'center', border: 'none', borderRadius: 0 }}
//                         //                                value={`${value}`}
//                         //                                onChange={e => {e.preventDefault(); e.stopPropagation()}}
//                         //                                onClick={onClick}
//                         //                                readOnly
//                         //                         />
//                         //
//                         //                         <div  style={{ width: 'fit-content', height: 'fit-content', padding: 5, backgroundColor: '#E9ECEFFF' }} onClick={ handleSubmit } >
//                         //                                 <HiSaveAs size={25} color={'blue'} />
//                         //                         </div>
//                         //                 </Stack>
//                         //         )
//                         // );
//
//                         const CustomTimeInput = useCallback(
//                         function CustomTimeInput({ date, value, onChange })
//                         {
//
//                                 const validationRules = yup.object().shape({
//                                         hour: yup.number().integer().positive("L'heure est positive").min(new Date().getHours()).max(24, 'maximum 24h'),
//                                         minutes: yup.number().integer().positive("L'heure est positive").min(0).max(60, 'maximum 60mins'),
//
//                                 });
//
//                                 const formik = useFormik(
//                                 {
//                                         validationSchema: validationRules,
//                                         onSubmit: handleSubmit,
//                                         initialValues:
//                                         {
//                                                 hour: new Date().getHours(),
//                                                 minutes: 0
//                                         }
//                                 }
//                                 )
//
//                                 const handleBlur = e =>
//                                 {
//                                         e.preventDefault()
//                                         e.stopPropagation()
//                                         if (!formik.errors.hour && !formik.errors.minutes)
//                                         {
//                                                 onChange(`${formik.values.hour === '' ? 0 : formik.values.hour}:${formik.values.minutes === '' ? 0 : formik.values.minutes}`)
//                                         }
//                                 }
//
//                                 return(
//                                 <Form className={`d-flex flex-row`} value = {undefined} onSubmit={formik.handleSubmit} >
//
//
//                                         <Form.Group className="mr-3 d-flex" >
//                                                 <Form.Label style={{ margin: 0, marginRight: 5 }} >hh</Form.Label>
//                                                 <Form.Control
//                                                 style=
//                                                 {{
//                                                         maxWidth: '35px',
//                                                         maxHeight: '20px',
//                                                         fontSize: '10px',
//                                                         padding: '2px'
//                                                 }}
//                                                 maxLength = '2'
//                                                 name="hour"
//                                                 value={formik.values.hour}
//                                                 onChange={formik.handleChange}
//                                                 onBlur={ handleBlur }
//                                                 // type="number"
//                                                 placeholder="00"
//                                                 isInvalid={!!formik.errors.hour}
//                                                 />
//                                                 {/*<Form.Control.Feedback  type="invalid">*/}
//                                                 {/*        {formik.errors.hour}*/}
//                                                 {/*</Form.Control.Feedback>*/}
//                                         </Form.Group>
//
//
//                                         <Form.Group className="d-flex" >
//                                                 <Form.Label style={{ margin: 0, marginRight: 5 }} >mm</Form.Label>
//                                                 <Form.Control
//                                                 style=
//                                                 {{
//                                                         maxWidth: '35px',
//                                                         maxHeight: '20px',
//                                                         fontSize: '10px',
//                                                         padding: '2px'
//                                                 }}
//                                                 maxLength = '2'
//                                                 name="minutes"
//                                                 value={formik.values.minutes}
//                                                 onChange={formik.handleChange}
//                                                 onBlur={ handleBlur }
//                                                 // type="number"
//                                                 placeholder="00"
//                                                 isInvalid={!!formik.errors.minutes}
//                                                 />
//                                                 {/*<Form.Control.Feedback type="invalid">*/}
//                                                 {/*        {formik.errors.minutes}*/}
//                                                 {/*</Form.Control.Feedback>*/}
//                                         </Form.Group>
//
//                                         {/*<div*/}
//                                         {/*style = {*/}
//                                         {/*        {*/}
//                                         {/*                display: 'flex',*/}
//                                         {/*                justifyContent: 'center',*/}
//                                         {/*                position: 'relative',*/}
//                                         {/*                alignItems: 'center',*/}
//                                         {/*        }*/}
//                                         {/*}*/}
//                                         {/*>*/}
//                                         {/*        <Button variant="primary" type="submit">*/}
//                                         {/*                Submit*/}
//                                         {/*        </Button>*/}
//                                         {/*</div>*/}
//                                 </Form>
//                                 )
//                         }, []
//                         )
//
//                         const [startDate, setStartDate] = useState(data.review_date !== null ? new Date(data.review_date) : new Date());
//
//                         const new_review_date = `${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`
//                         console.log('new_review_date', new_review_date, e)
//
//                         // let today = new Date()
//                         // today.setHours(0, 0, 0, 0)
//
//                         console.log('millesec dif', new Date(new_review_date).valueOf() - new Date().valueOf())
//
//                         const handleSubmit = e =>
//                         {
//                                 e.stopPropagation()
//
//                                 window.Global_State.setOverlay_props(t => (
//                                 {
//                                         ...t,
//                                         style:
//                                         {
//                                                 ...t.style,
//                                                 display: 'none',
//                                         },
//                                 }
//                                 )
//                                 )
//
//                                 console.log(new_review_date)
//                                 const [id, model_type] = window.Global_State.identifyNode(data)
//
//                                 const query = new FormData;
//                                 query.append('id', id)
//                                 query.append('update_object', 'review_date')
//                                 query.append('new_value', new_review_date)
//                                 query.append('additional_info', JSON.stringify(
//                                 {
//                                         remain_ms: `${new Date(new_review_date).valueOf() - new Date().valueOf()}`
//                                 }
//                                 ))
//
//                                 if(!window.Global_State.isEditorMode)
//                                 {
//                                         // console.log(selectedRow[0].id.substring(2))
//                                         toast.promise(
//                                         http.post('update_fnc', query),
//                                         {
//                                                 loading: 'Loading...',
//                                                 success: 'Processus achevé',
//                                                 error: 'Erreur'
//                                         },
//                                         {
//                                                 id: `review_date_${data.id}`,
//                                                 duration: Infinity
//                                         }
//
//                                         )
//                                         .then(
//                                         res =>
//                                         {
//                                                 console.log(res)
//                                                 window.Global_State.absolutePopover.close()
//                                                 switch (res.data.statue)
//                                                 {
//                                                         case 'success':
//                                                                 toast(`La date de révision a été mise á jour !!`, {type: 'success'})
//                                                                 break
//                                                         case 'error':
//                                                                 toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
//                                                                 break
//                                                         case 'info':
//                                                                 toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
//                                                                 break
//                                                 }
//                                                 setTimeout( () => { toast.dismiss(`review_date_${data.id}`) }, 600 )
//                                         }
//                                         )
//                                         .catch(
//                                         err =>
//                                         {
//                                                 console.log(err);
//                                                 window.Global_State.absolutePopover.close()
//                                                 setTimeout( () => { toast.dismiss(`review_date_${data.id}`) }, 600 )
//                                         })
//                                 }
//                                 else
//                                 {
//                                         window.Global_State.editor.fnc.update(query)
//                                 }
//                         }
//
//                         const handleClear = e =>
//                         {
//                                 e.stopPropagation()
//
//                                 console.log("clear_review_date")
//
//                                 const id = window.Global_State.identifyNode(data)[0]
//
//                                 if(!window.Global_State.isEditorMode)
//                                 {
//                                         setClearLoading(true)
//
//                                         const onFulfilled = (res) =>
//                                         {
//                                                 console.log('clear_review_daaaaaaaaaaaaaate', res)
//                                                 setClearLoading(false)
//                                                 window.Global_State.absolutePopover.close()
//                                                 if (res.data.statue === "success")
//                                                 {
//                                                         window.show_response("Programation de révision annulée", "success")
//                                                 }
//                                                 else window.show_response(res.data.data.msg, res.data.statue)
//                                         }
//                                         const onRejected = (err) =>
//                                         {
//                                                 console.log(err)
//                                                 setClearLoading(false)
//                                                 window.Global_State.absolutePopover.close()
//                                                 window.show_response(`${err.message} ${err.response.data.message}`, "error")
//                                         }
//
//                                         http.post("update_fnc", {id, update_object: "cancel_review", new_value: 'null'})
//                                         .then(onFulfilled, onRejected)
//                                 }
//                                 else
//                                 {
//
//                                 }
//                         }
//
//                         return (
//                         <Stack className="m-2" direction={"row"} spacing={1} alignItems={"center"} onClick={e => { e.preventDefault(); e.stopPropagation() }} >
//                                 <div className={`d-flex justify-content-center align-items-center`}
//                                      style={{
//                                              backgroundColor: 'rgba(255,255,255,0)',
//                                              borderRadius: 10,
//                                              border: '1px solid blue',
//                                              overflow: "hidden",
//                                              height: "fit-content",
//                                              width: "fit-content",
//                                      }}
//                                 >
//                                         <div className={`d-flex`} style={{ width: "fit-content" }} >
//                                                 <DatePicker
//                                                 selected={startDate}
//                                                 popperClassName = 'reactDatePickerPopper'
//                                                 dateFormat="yyyy/MM/dd h:mm aa"
//                                                 onChange={(date) => setStartDate(date)}
//                                                 showYearDropdown
//                                                 scrollableYearDropdown
//                                                 showTimeInput
//                                                 customTimeInput={<CustomTimeInput />}
//                                                 yearDropdownItemNumber={20}
//                                                 minDate={new Date()}
//                                                 customInput ={ <CustomDateInput loading={loading} onSubmit={handleSubmit} /> }
//                                                 />
//                                         </div>
//                                 </div>
//                                 <LoadingButton as={IconButton} loading={clearLoading} title={"EFFACER"} color={"error"} disabled={value === '____/__/__'} onClick={handleClear} >
//                                         {
//                                                 clearLoading ? null : <AiFillCloseCircle size={25} />
//                                         }
//                                 </LoadingButton>
//                         </Stack>
//                         )
//                 }
//
//                 // window.Global_State.setOverlay_props( t => (
//                 // {
//                 //         ...t,
//                 //         style:
//                 //         {
//                 //                 ...t.style,
//                 //                 display: 'flex',
//                 //                 alignItems: 'center',
//                 //                 justifyContent: 'center'
//                 //         },
//                 //         children: (
//                 //         <div
//                 //                 style=
//                 //                 {{
//                 //                         width: "max-content",
//                 //                         marginTop: 15,
//                 //                         backgroundColor: 'rgba(255,255,255,0)' ,
//                 //                         position: "absolute",
//                 //                         top: e.clientY - 37,
//                 //                         left: e.clientX - 185/2
//                 //                         // translate: `${Math.abs( e.clientX - window.innerWidth/2 )}px ${Math.abs( e.clientY - window.innerHeight/2 )}px`
//                 //                 }}
//                 //                 onClick={ e => { e.stopPropagation() } }
//                 //         >
//                 //                 <Date_input data={data} />
//                 //         </div>
//                 //         ),
//                 //
//                 // }
//                 // ) )
//
//                 window.Global_State.absolutePopover.open(<Date_input data={data} />, e.target)
//         }
//
//         return(
//         <span className={`${data.review_date ? 'text-primary' : ''}`} onClick={handleClick} >
//                                         {value}
//                                 </span>
//         )
// }