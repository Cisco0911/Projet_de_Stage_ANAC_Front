/* eslint-disable import/first */

import React, {forwardRef, useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';

import {http} from "../auth/login";

import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import toast from "react-hot-toast";
import {useDropzone} from 'react-dropzone';

import Select from "react-select";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import {FaInfoCircle, FaPaste, FaSort} from "react-icons/fa";
import {FcFolder, FcVideoFile} from "react-icons/fc";
import {BsFillFileEarmarkPdfFill, BsPatchCheckFill} from "react-icons/bs";
import {RiFileWord2Fill, RiDeleteBin2Fill, RiUploadCloud2Fill} from "react-icons/ri";
import {SiMicrosoftexcel, SiMicrosoftpowerpoint} from "react-icons/si";
import {AiFillFileUnknown, AiFillCloseCircle} from "react-icons/ai";
import {IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoAdd} from "react-icons/io5";
import {IoIosCut} from "react-icons/io"
import {HiSaveAs} from 'react-icons/hi'
import {BiRename} from "react-icons/bi";
import {VscLiveShare, VscCircleLargeOutline} from "react-icons/vsc";
import {ImDownload2} from "react-icons/im";
import {MdUndo, MdRedo} from "react-icons/md";
import {TbListDetails} from "react-icons/tb";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useFormik} from 'formik';
import * as yup from 'yup'

import DatePicker, {CalendarContainer} from "react-datepicker";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {Box, FormControl, IconButton, InputLabel, MenuItem, Tooltip} from "@mui/material";
import MuiSelect  from '@mui/material/Select';
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
import {Dropdown, FormCheck} from "react-bootstrap";
import useCustomCheckBox, {CheckBox1} from "../custom_checkBox/custom_check";
import {LoadingButton} from "@mui/lab";
import {createPortal} from "react-dom";


function Files_Dropzone(props) {

    const baseStyle = {
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
      
      const focusedStyle = {
        borderColor: '#2196f3'
      };
      
      const acceptStyle = {
        borderColor: '#00e676'
      };
      
      const rejectStyle = {
        borderColor: '#ff1744'
      };


    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
      } = useDropzone();

    const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
    }), [
    isFocused,
    isDragAccept,
    isDragReject
    ]);

    const [filesObjects, set] = useState(acceptedFiles.map( file => { return {file, customName: file.name} } )) 

    useEffect( () => { set(acceptedFiles.map( file => { return {file, customName: file.name} } )) }, [acceptedFiles] )
    
    const files_name_list = filesObjects.map(fileObject => {
        const part_name = JSON.parse(JSON.stringify(fileObject.file.name.split('.')))
        const name = part_name.splice(0, part_name.length - 1).join('.')
        const ext = part_name[0]
        return (
            <div key={name} >
                <input key={fileObject.file.path} style = {{border: 'none', width: '50%'}} placeholder = { name }
                       onChange =
                       {
                                e =>
                                {
                                        e.preventDefault();
                                        fileObject.customName = (e.target.value === '' ? name : e.target.value) + '.' + ext;
                                        set(filesObjects)
                                }
                        }
                />
                <li style = {{display: 'inline' }} > { '.' + ext +  " - " + fileObject.file.size + " bytes"} </li>
            </div>
        )
    }
    );

    useEffect(() => {props.updateMethod(filesObjects)}, [filesObjects])
  
    return (
    <div className="container" style={
        {
            borderColor: 'gray',
            borderWidth: 2,
            borderStyle: 'ridge',
        }
        }>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files_name_list}</ul>
        </aside>
      </div>
    );
  }

function FilterComponent({set, filter, node})
{
        let compenent

        const MyContainer = ({ className, children }) => {
                return (
                // <CalendarContainer className={className}
                //                    style={{
                //                            border: "thin solid blue"
                //                    }}
                // >
                //         <div style={{ position: "relative" }}>{children}</div>
                // </CalendarContainer>
                        <div
                                style={{
                                        position: "relative" ,
                                        border: "thin solid blue",
                                        borderRadius: "0.3rem",
                                        backgroundColor: "white",
                                        display: 'flex'
                                }}
                        >
                                {children}
                        </div>
                );
        };

        switch (filter.tag)
        {
                case 'la Date de creation':
                {
                        const [startDate, endDate] = filter.element;
                        compenent = (
                        <div className="full_size_element filter_by_date_component" >
                                <DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        popperClassName = 'reactDatePickerPopper'
                                        onChange={
                                                (update) =>
                                                {
                                                        // const now = new Date()
                                                        // console.log(update[0].valueOf(), update[0].getMonth()+1, update[0].getFullYear())
                                                        set( t => ({...t, element: update}) );
                                                }
                                        }
                                        isClearable={true}
                                        showMonthDropdown
                                        showYearDropdown
                                        yearDropdownItemNumber={1000}
                                        yearItemNumber={9}
                                        dropdownMode="select"
                                        minDate={new Date("2021/12/31")}
                                        customInput={ <input className="form-control form-control-sm full_size_element" value={`${startDate} - ${endDate}`}/> }
                                        calendarContainer={MyContainer}
                                />
                        </div>

                        );

                        break
                }
                case 'la Date de revision':
                {
                        const [startDate, endDate] = filter.element;
                        compenent = (
                        <div className="full_size_element filter_by_date_component" >
                                {/*<label>Chercher selon {filter.tag} :</label>*/}
                                <DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        popperClassName = 'reactDatePickerPopper'
                                        onChange={
                                                (update) =>
                                                {
                                                        // const now = new Date()
                                                        // console.log(update[0].valueOf(), update[0].getMonth()+1, update[0].getFullYear())
                                                        set( t => ({...t, element: update}) );
                                                }
                                        }
                                        isClearable={true}
                                        showMonthDropdown
                                        showYearDropdown
                                        yearDropdownItemNumber={1000}
                                        yearItemNumber={9}
                                        dropdownMode="select"
                                        scrollableYearDropdown
                                        minDate={new Date("2021/12/31")}
                                        customInput ={ <input className="form-control form-control-sm full_size_element" value={`${startDate} - ${endDate}`}/> }
                                        calendarContainer={MyContainer}
                                />
                        </div>

                        );

                        break
                }

                default:
                        compenent = (
                        <div className="full_size_element" >
                                {/*<label>Chercher selon {filter.tag} :</label>*/}
                                <input onChange={(e) => {set( t => ({...t, element: e.target.value}) )}} value={filter.element} type="search" className="full_size_element form-control form-control-sm" placeholder="" aria-controls="table-files"/>
                        </div>
                        )

                        break
        }



        const update_tag = event =>
        {
                const value = event.target.value

                switch (value)
                {
                        case "le Nom":
                                set({tag: 'le Nom', element: ''})
                                break
                        case "la Date de creation":
                                set({tag: 'la Date de creation', element: [null, null]})
                                break
                        case "la Date de revision":
                                set({tag: 'la Date de revision', element: [null, null]})
                                break
                        case "le RA":
                                set({tag: 'le RA', element: ''})
                                break
                }
        }

        const contain_audit = ( node.type === "root" && /^(Audit|AUDIT)(( \b\w*\b)|)$/.test(window.Global_State.getCurrentSection().name) )

        return(
                <div id="file_table_filter_component" className="full_size_element" >
                        <div
                                style={{
                                        // width: filter.element.constructor === Array ? "74%" : "86%"
                                        marginRight: 10,
                                        width: "100%",
                                        flex: "1 0 60%"
                                }}
                        >
                                {compenent}
                        </div>
                        <div
                                style={{
                                }}
                        >
                                <Tooltip title={"TAG RESEARCH"} placement={`top-start`} >
                                        <Box  >{/*style={{ maxWidth: 100, padding: 5 }}*/}
                                                <FormControl size="small" >
                                                        {/*<InputLabel id="tag_select_label">Tag</InputLabel>*/}
                                                        <MuiSelect
                                                        labelId="tag_select_label"
                                                        id="tag_select"
                                                        value={filter.tag}
                                                        renderValue={ value => window.innerWidth > 576 ? value : '' }
                                                        // label="Tag"
                                                        onChange={update_tag}
                                                        >
                                                                <MenuItem value={"le Nom"}>Nom</MenuItem>
                                                                <MenuItem value={"la Date de creation"}>Date de creation</MenuItem>
                                                                <MenuItem disabled={node.type !== 'nonC'} value={"la Date de revision"}>Date de revision</MenuItem>
                                                                <MenuItem disabled={!contain_audit} value={"le RA"}>RA</MenuItem>
                                                        </MuiSelect>
                                                </FormControl>
                                        </Box>
                                </Tooltip>
                        </div>
                </div>
        )
}

function ClimbTree({node})
{

        const parent = window.Global_State.getNodeDataById(node.parentId)

        return (
        <div className={'d-flex flex-row align-items-end'} >
                {
                        parent ?
                        <Tooltip title={`Remonter vers ${parent.name}`} placement={"top-start"}>
                                <IconButton
                                onClick={
                                        (e) =>
                                        {
                                                e.preventDefault();

                                                const tree_row = document.getElementById(`treeRow-${node.id}`)

                                                if (tree_row)
                                                {
                                                        const doubleClickEvent = new MouseEvent("dblclick", {
                                                                view: window,
                                                                bubbles: true,
                                                                cancelable: true,
                                                        });
                                                        doubleClickEvent.is_opening = false

                                                        tree_row.dispatchEvent(doubleClickEvent);
                                                }

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.backend.setCurrentSelectedFolder(parent.id)
                                        }
                                }
                                >
                                        <IoArrowUpCircleSharp size={25} color={"black"} />
                                </IconButton>
                        </Tooltip>
                        :
                        <IconButton disabled={true} >
                                <IoArrowUpCircleOutline size={25} />
                        </IconButton>
                }
        </div>
        )
}

function Prev()
{

        const prev = [...window.Global_State.backend.prev]

        const prev_id = prev.pop()

        // console.log('prrrrrrreeeeeeeeeeev', prev_id, prev)

        return (
        <div className={'d-flex flex-row align-items-end'} >
                {
                        prev_id ?
                        <Tooltip title={`Retour`} placement={"top-start"}>
                                <IconButton
                                onClick={
                                        (e) =>
                                        {
                                                e.preventDefault();

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.EventsManager.emit("prev")
                                        }
                                }
                                >
                                        <ArrowLeftIcon size={25} color={"action"} style={{ color: "black" }} />
                                </IconButton>
                        </Tooltip>
                        :
                        <IconButton disabled={true} >
                                <ArrowLeftIcon size={25} />
                        </IconButton>
                }
        </div>
        )
}

function Next()
{

        const next = [...window.Global_State.backend.next]

        const next_id = next.pop()

        return (
        <div className={'d-flex flex-row align-items-end'} >
                {
                        next_id ?
                        <Tooltip title={`Suivant`} placement={"top-start"}>
                                <IconButton
                                onClick={
                                        (e) =>
                                        {
                                                e.preventDefault();

                                                // console.log('prrrrrrreeeeeeeeeeev', window.Global_State.backend.prev.current)

                                                window.Global_State.EventsManager.emit("next")
                                        }
                                }
                                >
                                        <ArrowRightIcon size={25} color={"action"} style={{ color: "black" }} />
                                </IconButton>
                        </Tooltip>
                        :
                        <IconButton disabled={true} >
                                <ArrowRightIcon size={25} />
                        </IconButton>
                }
        </div>
        )
}

const SelectComponent = ({updateMethod, options, placeholder}) =>
{
        // console.log(servicesList)
        // console.log(options)

        return(
        <Select
        onChange = { updateMethod }
        options = { options }
        defaultValue = { options.slice(0, 1) }
        isMulti = { true }
        placeholder = { placeholder }
        closeMenuOnSelect = { false }
        components = { makeAnimated() }
        isDisabled = { options.length === 1 }

        />
        )
}

const AsyncUsersSelectComponent = ({areFixed, updateMethod, filter, placeholder}) =>
{
        const styles = {
                multiValue: (base, state) => {
                        return state.data.isFix ? { ...base, backgroundColor: 'gray' } : base;
                },
                multiValueLabel: (base, state) => {
                        return state.data.isFix
                        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
                        : base;
                },
                multiValueRemove: (base, state) => {
                        return state.data.isFix ? { ...base, display: 'none' } : base;
                },
        };

        const filterUsers = filter;

        const promiseOptions = (inputValue) =>
        new Promise(
                (resolve) =>
                {
                        http.get('get_users')
                        .then(
                        res =>
                        {
                                // console.log('userrsssss', res)
                                const users = res.data.map( user => ( {value: user.id, label: `${user.name} ${user.second_name}`} ) )
                                resolve(filterUsers(inputValue, users))
                        }
                        )
                }
        );

        areFixed = [...areFixed].map( fix_el => ({...fix_el, isFix: true}) )

        const [values, setValue] = useState(areFixed)

        const handleChange = (e) =>
        {
                const new_val = [...areFixed]

                for (const element of e)
                {
                        // if ( !areFixed.find( fix_el => fix_el.value === element.value ) ) new_val.push(element)
                        if ( !element.isFix ) new_val.push(element)
                }

                setValue(new_val)

                updateMethod(new_val)
        }

        return(
        <AsyncSelect
        value={values}
        styles={styles}
        onChange = { handleChange }
        loadOptions={promiseOptions}
        defaultValue = { areFixed }
        isClearable={values.some( (v) => !v.isFix )}
        isMulti = { true }
        placeholder = { placeholder }
        closeMenuOnSelect = { false }
        components = { makeAnimated() }
        // isDisabled = { options.length === 1 }

        />
        )
}

const CustomDateInput = ({id, value, onClick, loading, onSubmit, other_params } ) =>
(
<Stack direction={'row'} sx={{ width: 'fit-content', backgroundColor: '#e9ecef' }}>
        <input
               className="form-control form-control-sm"
               style={{ height: 35, textAlign: 'center', border: 'none', borderRadius: 0, backgroundColor: "rgba(233,236,239,0)" }}
               value={`${value}`}
               onChange={e => {e.preventDefault(); e.stopPropagation()}}
               onClick={ onClick }
               readOnly
        />

        <LoadingButton as={IconButton} loading={loading} title={"EFFACER"} color={"primary"} size={"small"} style={{ minWidth: 30 }} onClick={onSubmit} >
                {
                        loading ? null : <RiUploadCloud2Fill size={20} />
                }
        </LoadingButton>
</Stack>
)

export default function FileTable()
{

        let node = useMemo(() => (window.Global_State.backend.selectedNode.model), [window.Global_State.backend.selectedNode.model])

        // console.log("window.current_location", window.current_location)

        const contain_audit = ( node.type === "root" && /^(Audit|AUDIT)(( \b\w*\b)|)$/.test(window.Global_State.getCurrentSection().name) )

        // console.log('contentNooooooooooooode', node, window.Global_State.backend)

        const [filter, setFilter] = useState(
                {
                        tag: "le Nom",
                        element: ''
                }
        )

        // const [previousSelected, setPreviousSelected] = useState([0])

        const [selectedRowNumber, setNumber] = useState(0)
        const [selectedRow, setSelectedRows] = useState([])
        const justChecking = useRef(false)

        const [mc_state, setMc_state] = useState('none')
        const [to_move_or_copy, from_id, clear_clipboard_id] = [useRef([]), useRef(undefined), useRef(undefined)]

        useEffect(
                () =>
                {
                        if (mc_state === 'none')
                        {
                                to_move_or_copy.current = []
                                clearTimeout(clear_clipboard_id.current)
                                clear_clipboard_id.current = undefined
                                from_id.current = undefined
                        }
                }, [mc_state]
        )

        useEffect(
        () =>
        {

                window.Global_State.EventsManager.on('clearSelected', () => { /*console.log('clearSelected');*/ setSelectedRows([]); setNumber(0) })
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
                window.Global_State.EventsManager.on("select_row",
                (id) =>
                {
                        const row = datas.find( row => row.id ===  id)

                        // console.log("roooooooooooooooooow", row, datas, id)

                        handleChange(1, [row])
                }
                )
                return () =>
                {
                        window.Global_State.EventsManager.off('clearSelected');
                        window.Global_State.EventsManager.off('select_row');
                        // window.Global_State.EventsManager.off('show_on_screen');
                }
        },

        )

        const Paste_component = useCallback(
                function Paste_component()
                {
                        const action = useRef({})
                        const ref = useRef()

                        useEffect(
                        () =>
                        {
                                window.Global_State.EventsManager.on("shortcut",
                                        (value) =>
                                        {
                                                // console.log("Paste");
                                                if (value === "ctrl_v")
                                                {

                                                        if (ref.current) ref.current.click()
                                                }
                                        }
                                )

                                return(
                                        () =>
                                        {
                                                window.Global_State.EventsManager.off("shortcut")
                                        }
                                )

                        }, []
                        )

                        async function paste_here(node)
                        {
                                const concern_nodes = window.Global_State.copyObject(to_move_or_copy.current)

                                const destination_node = JSON.parse( JSON.stringify(node) )
                                const destination_info = window.Global_State.identifyNode( destination_node )
                                const destination_id = destination_info[0]; const destination_type = destination_info[1]

                                // console.log('arriiiiiiiiiiiiiveeee', to_move_or_copy.current)

                                const operation_type = mc_state

                                const Save_for_rest = () =>
                                {

                                        return(
                                        <div className={`d-flex align-items-stretch`} >
                                                <input id={'save_checkbox'} type={'checkbox'}
                                                       onChange={
                                                               e => {
                                                                       // e.preventDefault()
                                                                       // console.log('e.target',e.target)
                                                                       action.current = { saved: e.target.checked }
                                                               }
                                                       }
                                                />
                                                <label htmlFor={'save_checkbox'}
                                                       style=
                                                       {{
                                                               fontSize: 12,
                                                               display: "contents"
                                                       }}
                                                > Enregistrer l'action pour autres cas similaires </label>
                                        </div>
                                        )
                                }

                                // console.log('destination_node.id === from_id.current', destination_node.id, from_id.current)
                                if (destination_node.id === from_id.current)
                                {
                                        if (operation_type === 'copy') action.current = { saved: true, value: 2 }
                                        else if (operation_type === 'move')
                                        {
                                                setMc_state('none')

                                                return 'nothing to do'
                                        }

                                }

                                for (const node_to_copy of concern_nodes)
                                {
                                        for (const child_node of node.children)
                                        {
                                                if (child_node.name === (node_to_copy.ori_name || node_to_copy.name) )
                                                {
                                                        if (!action.current.saved)
                                                        {
                                                                // console.log('node_to_copy__________', to_move_or_copy.current)
                                                                if ( !node_to_copy.onCopy && (node_to_copy.type === 'ds') && (parseInt(node_to_copy.id) < 0) && (operation_type === 'move') )
                                                                {
                                                                        // toast.error(`Selon les données locales, il existe deja un ${node_to_copy.type === 'f' ? 'fichier' : 'dossiser'} de ce nom á la destination:\n${node_to_copy.name}`)
                                                                        toast(
                                                                        <div>
                                                                                {
                                                                                        `Selon les données locales, il existe deja un ${node_to_copy.type === 'f' ? 'fichier' : 'dossiser'} de ce nom á la destination:`
                                                                                }
                                                                                <br/>
                                                                                "<span style={{ fontWeight: "bold", fontSize: 18 }}>{node_to_copy.name}</span>"
                                                                        </div>,
                                                                        { type: "error" }
                                                                        );
                                                                        continue
                                                                }

                                                                if ( node.path.indexOf(node_to_copy.path) !== -1 )
                                                                {
                                                                        continue
                                                                }

                                                                await new Promise(
                                                                        resolve =>
                                                                        {
                                                                                const BsToMuiComp = React.forwardRef(function MyComponent(props, ref) {
                                                                                        //  Spread the props to the underlying DOM element.
                                                                                        return (
                                                                                                <Button {...props} ref={ref}>
                                                                                                        FUSIONNER
                                                                                                </Button>
                                                                                        );
                                                                                });

                                                                                const content = (
                                                                                <div>
                                                                                        <div className={`mb-3`} >
                                                                                                {`La destination pourrait contenir un ${child_node.type === 'f' ? 'fichier' : 'dossier'} de meme nom: `}
                                                                                                <br/>
                                                                                                <span style={{ fontWeight: "bold" }} > {`${node_to_copy.name}`} </span>
                                                                                        </div>

                                                                                        <Save_for_rest />

                                                                                        <div className={`d-flex justify-content-end`} >
                                                                                                <Button className={`mr-1`} variant={`outline-light`} onClick={ e => { e.stopPropagation(); resolve(1) } } >
                                                                                                        IGNORER
                                                                                                </Button>
                                                                                                <Button className={`mr-1`} variant={`outline-primary`} onClick={ e => { e.stopPropagation(); {/*console.log('RENOMEEEEEEEEEEER');*/} resolve(2) } } >
                                                                                                        RENOMER
                                                                                                </Button>
                                                                                                {
                                                                                                        child_node.global_type === 'folder' ?
                                                                                                        <Tooltip title="Les fichiers en conflits seront écraser à la destination">
                                                                                                                <span>
                                                                                                                        <BsToMuiComp disabled={ parseInt(node_to_copy.id) < 0 } variant={`outline-danger`} onClick={ e => { e.stopPropagation(); resolve(3) } }  />
                                                                                                                </span>
                                                                                                        </Tooltip>:
                                                                                                        <Button disabled={ parseInt(node_to_copy.id) < 0 } variant={`outline-danger`} onClick={ e => { e.stopPropagation(); resolve(3) } } >
                                                                                                                ECRASER
                                                                                                        </Button>
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                                )

                                                                                window.Global_State.modalManager.setContent(content)
                                                                                window.Global_State.modalManager.open_modal(`Conflit de ${child_node.type === 'f' ? 'fichiers' : 'dossiers'}`, false)

                                                                        }
                                                                ).then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res, action.current)
                                                                                node_to_copy['on_exist'] = res
                                                                                if (action.current.saved) action.current = {...action.current, value: res}
                                                                        }
                                                                )
                                                        }
                                                        else
                                                        {
                                                                node_to_copy['on_exist'] = action.current.value
                                                        }
                                                }
                                        }
                                }

                                window.Global_State.modalManager.close_modal()

                                // console.log('taaaaaaaaaaaaaaaaaaaaaaaaaa')
                                // console.log( 'to_move_or_copy.current1', to_move_or_copy.current )
                                if (operation_type === 'move')
                                {
                                        const to_move = [...concern_nodes]

                                        setMc_state('none')

                                        // console.log('zaaaaaaaaaaaaaaaaaaaaaa')
                                        for (const node_to_move of to_move)
                                        {

                                                if ( node.path.indexOf(node_to_move.path) !== -1 )
                                                {
                                                        toast(
                                                        <div>
                                                                {
                                                                        `Le dossier de destination est un sous-dossier du dossier source.`
                                                                }
                                                                <br/>
                                                                <br/>
                                                                source: <span style={{ fontWeight: "bold", fontSize: 12 }}>{node_to_move.path}</span>
                                                                <br/>
                                                                destination: <span style={{ fontWeight: "bold", fontSize: 12 }}>{node.path}</span>
                                                        </div>,
                                                        { type: "error" }
                                                        );
                                                        continue
                                                }

                                                const queryData = new FormData

                                                queryData.append('destination_id', destination_id)
                                                queryData.append('destination_type', destination_type)
                                                queryData.append('id', node_to_move.id)
                                                queryData.append('on_exist', node_to_move.on_exist ?  node_to_move.on_exist : '-1')

                                                // console.log('arriiiiiiiiiiiiiveeee', node_to_move)
                                                if (node_to_move.type === 'ds')
                                                {

                                                        // console.log('arriiiiiiiiiiiiiveeee')

                                                        if (window.Global_State.isEditorMode)
                                                        {
                                                                window.Global_State.editor.folder.move(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('move_folder', queryData)
                                                                .then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res)
                                                                                switch (res.data.statue)
                                                                                {
                                                                                        case 'success':
                                                                                                toast(`Dossier deplacé avec succès`, {type: 'success'})
                                                                                                break
                                                                                        case 'error':
                                                                                                toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                                                                break
                                                                                        case 'info':
                                                                                                toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                                                                                break
                                                                                }
                                                                        }
                                                                )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                                else if (node_to_move.type === 'f')
                                                {

                                                        if (window.Global_State.isEditorMode)
                                                        {
                                                                window.Global_State.editor.files.move(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('move_file', queryData)
                                                                .then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res)
                                                                                switch (res.data.statue)
                                                                                {
                                                                                        case 'success':
                                                                                                toast(`Fichier deplacé avec succès`, {type: 'success'})
                                                                                                break
                                                                                        case 'error':
                                                                                                toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                                                                break
                                                                                        case 'info':
                                                                                                toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                                                                                break
                                                                                }
                                                                        }
                                                                )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                        }
                                }
                                else
                                {

                                        // console.log( 'to_move_or_copy.current', concern_nodes )

                                        for (const node_to_copy of concern_nodes)
                                        {
                                                // if (node_to_copy.on_exist === 1) continue

                                                if ( node.path.indexOf(node_to_copy.path) !== -1 )
                                                {
                                                        toast(
                                                                <div>
                                                                        {
                                                                                `Le dossier de destination est un sous-dossier du dossier source.`
                                                                        }
                                                                        <br/>
                                                                        <br/>
                                                                        source: <span style={{ fontWeight: "bold", fontSize: 12 }}>{node_to_copy.path}</span>
                                                                        <br/>
                                                                        destination: <span style={{ fontWeight: "bold", fontSize: 12 }}>{node.path}</span>
                                                                </div>,
                                                                { type: "error" }
                                                        );
                                                        continue
                                                }

                                                const queryData = new FormData

                                                queryData.append('destination_id', destination_id)
                                                queryData.append('destination_type', destination_type)
                                                queryData.append('id', node_to_copy.id)
                                                queryData.append('on_exist', node_to_copy.on_exist ?  node_to_copy.on_exist : '-1')
                                                queryData.append('section_id', window.Global_State.selectedSectionId)

                                                let services
                                                if (node.type === 'root')
                                                {
                                                        const section = window.Global_State.sections.get( window.Global_State.selectedSectionId )

                                                        services = section.services.map( service => ({value: service.id}) )
                                                }
                                                else services = node.services.map( service => ({value: service.id}) )

                                                queryData.append('services', JSON.stringify( services ) )


                                                // console.log('arriiiiiiiiiiiiiveeee', node_to_move)
                                                if (node_to_copy.type === 'ds')
                                                {

                                                        // console.log('arriiiiiiiiiiiiiveeee')

                                                        if (window.Global_State.isEditorMode)
                                                        {
                                                                window.Global_State.editor.folder.copy(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('copy_folder', queryData)
                                                                .then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res)
                                                                                switch (res.data.statue)
                                                                                {
                                                                                        case 'success':
                                                                                                toast(`Dossier copié avec succès`, {type: 'success'})
                                                                                                break
                                                                                        case 'error':
                                                                                                toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                                                                break
                                                                                        case 'info':
                                                                                                toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                                                                                break
                                                                                }
                                                                        }
                                                                )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                                else if (node_to_copy.type === 'f')
                                                {

                                                        if (window.Global_State.isEditorMode)
                                                        {
                                                                window.Global_State.editor.files.copy(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('copy_file', queryData)
                                                                .then(
                                                                        res =>
                                                                        {
                                                                                // console.log(res)
                                                                                switch (res.data.statue)
                                                                                {
                                                                                        case 'success':
                                                                                                toast(`Fichier copié avec succès`, {type: 'success'})
                                                                                                break
                                                                                        case 'error':
                                                                                                toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                                                                break
                                                                                        case 'info':
                                                                                                toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                                                                                break
                                                                                }
                                                                        }
                                                                )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                        }
                                }

                                // to_move_or_copy.current = []

                        }

                        return (
                                <IconButton id={`ctrl_v`} ref={ref}
                                        disabled={mc_state === 'none'}
                                        // style = {{ marginRight: 20, }}
                                        onClick={
                                                e =>
                                                {
                                                        // console.log(to_move_or_copy.current, node.id)

                                                        if (window.Global_State.isEditorMode) paste_here(node)
                                                        else
                                                        {
                                                                toast.promise(
                                                                        paste_here(node),
                                                                        {
                                                                                loading: 'Pasting...',
                                                                                success: 'Processus achevé',
                                                                                error: 'Une erreur est survenue',
                                                                        },
                                                                        {
                                                                                id: 'Pasting',
                                                                                duration: Infinity
                                                                        }
                                                                ).then( res => { setTimeout( () => { toast.dismiss('Pasting') }, 800 ) } )
                                                                .catch( err => { setTimeout( () => { toast.dismiss('Pasting') }, 800 ) } )

                                                        }

                                                }
                                        }
                                >
                                        <FaPaste size={24} color={`${mc_state === 'none'? '' : 'blue'}`} />
                                </IconButton>
                        )

                }, [node, mc_state]
        )

        function add(thing_to_add)
        {
                // filtre de service
                const canAddToService = (authService) =>
                {
                        const services = node.isRoot ? window.Global_State.getCurrentSection().services : node.services

                        for(let elementService of services) {
                                // console.log(authService.id, elementService.id)
                                if(authService.id === parseInt(elementService.id)) return true
                        }
                        return false
                }
                let servicesList = window.Global_State.authUser.services.filter( (service) => { return canAddToService(service) } ).map((service) => { return service } )
                // formatage en options
                const options_services = servicesList.map( (service) => { return {value: service.id, label: service.name } } )

                // composant de selection de service

                if (thing_to_add === "add_audit") {

                        const Audit_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)
                                        // return
                                        submittedInfo.num_chrono = submittedInfo.num_chrono < 10 ? "0" + submittedInfo.num_chrono : submittedInfo.num_chrono.toString()
                                        submittedInfo.annee = submittedInfo.annee < 10 ? "0" + submittedInfo.annee : submittedInfo.annee.toString()

                                        let queryBody = new FormData()

                                        const inspector_ids = submittedInfo.inspectors.map( element => parseInt(element.value) )
                                        // console.log(inspector_ids)

                                        const service =  submittedInfo.services[0].label

                                        queryBody.append("name",
                                        submittedInfo.type_audit + "-" + submittedInfo.annee + "-" + service + "-" + submittedInfo.num_chrono
                                        )
                                        queryBody.append("services", JSON.stringify(submittedInfo.services))
                                        queryBody.append("inspectors", JSON.stringify(inspector_ids))
                                        queryBody.append("ra_id", window.Global_State.authUser.id)
                                        queryBody.append("section_id", window.Global_State.selectedSectionId)


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))



                                        if(!window.Global_State.isEditorMode)
                                        {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)

                                                http.post('add_audit', queryBody)

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        // console.log(res)

                                                        if (res.data.statue === 'success')
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Audit ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                window.Global_State.modalManager.close_modal()
                                                        }
                                                        else
                                                        {
                                                                // console.log('cooooooode', res.data.data.code)
                                                                switch (parseInt(res.data.data.code))
                                                                {
                                                                        case 0:
                                                                        {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Ce Audit existe deja !",
                                                                                        icon: "info",
                                                                                });
                                                                                window.Global_State.modalManager.close_modal()
                                                                                break
                                                                        }
                                                                        default:
                                                                        {
                                                                                swal({
                                                                                        title: "ERROR!",
                                                                                        text: res.data.data.msg,
                                                                                        icon: "error",
                                                                                });
                                                                                window.Global_State.modalManager.setContent(<Audit_form/>)
                                                                                break
                                                                        }
                                                                }
                                                        }
                                                })

                                                // Catch errors if any
                                                .catch((err) => {
                                                        // console.log(err)
                                                        let msg
                                                        if(err.response.status === 500) msg = "erreur interne au serveur"
                                                        else if(err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page"
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error",
                                                        });
                                                        window.Global_State.modalManager.setContent(<Audit_form/>)
                                                })
                                        }
                                        else
                                        {
                                                // console.log('editorHandle audit')

                                                window.Global_State.editor.audit.add(queryBody)

                                                window.Global_State.modalManager.close_modal()
                                        }


                                        // console.log(queryBody.get("name"))
                                };

                                const validationRules = yup.object().shape({
                                        num_chrono: yup.number().required().positive().integer(),
                                        annee: yup.number().required().positive().integer().max(100),
                                        inspectors: yup.array().min(1).required('Au moins 1'),
                                        services: yup.array().min(1).required('Au moins 1'),

                                });

                                const ra = { value: parseInt(window.Global_State.authUser.id), label: `${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}` }

                                const formik = useFormik(
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues:
                                        {
                                                type_audit: "AE",
                                                num_chrono: "",
                                                annee: '',
                                                inspectors: [ra],
                                                services: options_services.slice(0, 1)
                                        }
                                }
                                )


                                return (
                                <Form value = {undefined} onSubmit={formik.handleSubmit} >
                                        <Row>
                                                <Form.Group className="mb-3">
                                                        <Form.Label>Type Audit</Form.Label>
                                                        <Form.Select
                                                        aria-label="Default select example"
                                                        name="type_audit"
                                                        value={formik.values.type_audit}
                                                        onChange={formik.handleChange}
                                                        >
                                                                <option value="AE">Audit Externe</option>
                                                                <option value="AI">Audit Interne</option>
                                                        </Form.Select>
                                                </Form.Group>
                                        </Row>

                                        <Row>
                                                <Col>
                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Numero chronologique</Form.Label>
                                                                <Form.Control
                                                                name="num_chrono"
                                                                value={formik.values.num_chrono}
                                                                onChange={formik.handleChange}
                                                                type="number"
                                                                placeholder="NN"
                                                                isInvalid={!!formik.errors.num_chrono}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {msg_err}
                                                                </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                                <Col>
                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Année</Form.Label>
                                                                <Form.Control
                                                                name="annee"
                                                                value={formik.values.annee}
                                                                onChange={formik.handleChange}
                                                                type="number"
                                                                placeholder="YY"
                                                                isInvalid={!!formik.errors.annee}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {msg_err}
                                                                </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                        </Row>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Inspecteurs</Form.Label>
                                                <AsyncUsersSelectComponent
                                                        updateMethod=
                                                        {
                                                                (r) =>
                                                                {
                                                                        // console.log('new_val', r)
                                                                        // const e = window.Global_State.copyObject(r)
                                                                        // if (!r.length) r.unshift( { value: parseInt(window.Global_State.authUser.id), label: `${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}` } );
                                                                        formik.setFieldValue("inspectors", r)
                                                                }
                                                        }
                                                        areFixed={ [ra] }
                                                        placeholder={"Sélectionner au moins 1 inspecteur"}
                                                        filter={
                                                                (inputValue, list) => {
                                                                        return list.filter((i) =>
                                                                        i.label.toLowerCase().includes(inputValue.toLowerCase())
                                                                        );
                                                                }
                                                        }
                                                />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.inspectors ? "Au moins 1 inspecteur doit être sélectionné" : null}</span>
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Service</Form.Label>
                                                <SelectComponent updateMethod= {(e) => {formik.setFieldValue("services", e)}} options={options_services}  placeholder={"Sélectionner au moins 1 service"} />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services ? "Au moins 1 service doit être sélectionné" : null}</span>
                                        </Form.Group>

                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                }
                                        }
                                        >
                                                <Button variant="primary" type="submit">
                                                        Submit
                                                </Button>
                                        </div>
                                </Form>
                                )
                        }

                        window.Global_State.modalManager.setContent(<Audit_form/>)
                        window.Global_State.modalManager.open_modal("Nouvel Audit")
                }
                else if (thing_to_add === "add_folder") {

                        const Folder_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)

                                        let queryBody = new FormData()


                                        const [parent_id, parent_type] = window.Global_State.identifyNode(node)

                                        queryBody.append("services", JSON.stringify(submittedInfo.services))

                                        queryBody.append("name", submittedInfo.name)
                                        queryBody.append("parent_id", parent_id)
                                        queryBody.append("parent_type", parent_type)
                                        queryBody.append("section_id", window.Global_State.selectedSectionId)


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))
                                        // console.log("parent_id", parent_id)
                                        // console.log("parent_type", parent_type)


                                        if(!window.Global_State.isEditorMode)
                                        {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)

                                                http.post('add_folder', queryBody)

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        // console.log('res', res)
                                                        if (res.data.statue === 'success')
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Dossier ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                window.Global_State.modalManager.close_modal()
                                                        }
                                                        else if (res.data.state === 'info')
                                                        {
                                                                swal({
                                                                        title: "Info!",
                                                                        text: res.data.data.msg,
                                                                        icon: "info",
                                                                });
                                                                window.Global_State.modalManager.setContent(<Folder_form/>)
                                                        }
                                                        else
                                                        {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.data.msg,
                                                                        icon: "error",
                                                                });
                                                                window.Global_State.modalManager.setContent(<Folder_form/>)
                                                        }
                                                })

                                                // Catch errors if any
                                                .catch((err) => {
                                                        let msg
                                                        if(err.response.status === 500) msg = "erreur interne au serveur"
                                                        else if(err.response.status === 401 || err.response.status === 419) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page"
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error",
                                                        });
                                                        // console.log(err)
                                                        window.Global_State.modalManager.setContent(<Folder_form/>)
                                                })
                                        }
                                        else
                                        {
                                                // console.log('editorHandle folder')
                                                queryBody.set('front_parent_type', node.type)
                                                window.Global_State.editor.folder.add(queryBody)

                                                window.Global_State.modalManager.close_modal()
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                const validationRules = yup.object().shape({
                                        name: yup.string().max(255).required(),
                                        services: yup.array().min(1).required('Au moins 1'),

                                });

                                const formik = useFormik(
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues:
                                        {
                                                name: "Nouveau Dossier",
                                                services: options_services.slice(0, 1)
                                        }
                                }
                                )


                                return (
                                <Form value = {undefined} onSubmit={formik.handleSubmit} >

                                        <Row>
                                                <Col>
                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Nom (Nouveau Dossier par défaut)</Form.Label>
                                                                <Form.Control
                                                                name="name"
                                                                value={formik.values.name}
                                                                onChange={formik.handleChange}
                                                                type="text"
                                                                placeholder="Nouveau Dossier"
                                                                isInvalid={!!formik.errors.num_chrono}
                                                                autoFocus
                                                                onFocus={ e => { e.target.select() } }
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {msg_err}
                                                                </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                        </Row>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Service</Form.Label>
                                                <SelectComponent updateMethod= {(e) => {formik.setFieldValue("services", e)}} options={options_services}  placeholder={"Sélectionner au moins 1 service"} />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services ? "Au moins 1 service doit être sélectionné" : null}</span>
                                        </Form.Group>

                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                }
                                        }
                                        >
                                                <Button variant="primary" type="submit">
                                                        Submit
                                                </Button>
                                        </div>
                                </Form>
                                )
                        }

                        window.Global_State.modalManager.setContent(<Folder_form/>)
                        window.Global_State.modalManager.open_modal("Nouveau Dossier")
                }
                else if (thing_to_add === "add_fncs") {

                        const FNCs_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)

                                        const check_feasibility = (debut, fin, nonC_id) =>
                                        {
                                                const nonC = window.Global_State.getNodeDataById(nonC_id)
                                                const audit = window.Global_State.getNodeDataById(nonC.parentId)

                                                // const existing_fncs = window.Global_State.getChildrenById(window.Global_State.value, nonC_id)

                                                for (let i = debut; i < fin+1; i++)
                                                {
                                                        if ( window.Global_State.value.find( node => node.path === `${nonC.path}\\FNC-${audit.name}-${i}` ) ) return false
                                                }
                                                return true
                                        }

                                        if ( check_feasibility( parseInt(submittedInfo.debut), parseInt(submittedInfo.fin), node.id ) )
                                        {

                                                let queryBody = new FormData()


                                                const service =  submittedInfo.services[0].label

                                                queryBody.append("nonC_id", parseInt(node.id.substring(4)))
                                                queryBody.append("services", JSON.stringify(submittedInfo.services))
                                                queryBody.append("debut", submittedInfo.debut)
                                                queryBody.append("fin", submittedInfo.fin)
                                                queryBody.append("level", submittedInfo.level)


                                                // console.log("services", queryBody.get("services"))
                                                // console.log("nc_id", queryBody.get("nonC_id"))
                                                // console.log("debut", queryBody.get("debut"))
                                                // console.log("fin", queryBody.get("fin"))

                                                if(!window.Global_State.isEditorMode)
                                                {

                                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)


                                                        http.post('add_fncs', queryBody)

                                                        // Handle the response from backend here
                                                        .then((res) =>
                                                        {
                                                                // console.log(res)

                                                                if (res.data.statue === 'success')
                                                                {
                                                                        if (res.data.data.existing_fnc)
                                                                        {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Certains FNC sont existants ou possède le mm chemin !\n" + JSON.stringify(res.data.data.existing_fnc),
                                                                                        icon: "info",
                                                                                });
                                                                                window.Global_State.modalManager.close_modal()
                                                                        }
                                                                        else
                                                                        {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Dossier ajouté avec success !",
                                                                                        icon: "success",
                                                                                });
                                                                                window.Global_State.modalManager.close_modal()
                                                                        }
                                                                }
                                                                else
                                                                {
                                                                        switch (res.data.data.code)
                                                                        {
                                                                                case 1:
                                                                                {
                                                                                        swal({
                                                                                                title: "ERROR!",
                                                                                                text: res.data.data.msg,
                                                                                                icon: "error",
                                                                                        });
                                                                                        window.Global_State.modalManager.setContent(<FNCs_form/>)
                                                                                        break
                                                                                }
                                                                                default:
                                                                                {
                                                                                        swal({
                                                                                                title: "ERROR!",
                                                                                                text: res.data.data.msg,
                                                                                                icon: "error",
                                                                                        });
                                                                                        window.Global_State.modalManager.setContent(<FNCs_form/>)
                                                                                        break
                                                                                }
                                                                        }
                                                                }


                                                        })

                                                        // Catch errors if any
                                                        .catch((err) => {
                                                                console.log(err)
                                                                let msg
                                                                if(err.response.status === 500) msg = "erreur interne au serveur"
                                                                else if(err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page"
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: err.response.data.message + "\n" + msg,
                                                                        icon: "error",
                                                                });
                                                                window.Global_State.modalManager.setContent(<FNCs_form/>)
                                                        })
                                                }
                                                else
                                                {
                                                        // console.log('editorHandle fnc')

                                                        queryBody.set('front_parent_type', node.type)
                                                        window.Global_State.editor.fnc.add(queryBody)

                                                        window.Global_State.modalManager.close_modal()
                                                }

                                                // console.log(queryBody.get("name"))
                                        }
                                        else
                                        {
                                                // console.log('not feasible')

                                                swal({
                                                        title: "ERROR!",
                                                        text: 'La plage de génération contient des numéros de FNC existant !',
                                                        icon: "warning",
                                                });
                                                window.Global_State.modalManager.close_modal()
                                        }
                                };

                                const [min, setMin] = useState(1)
                                const [enableEnd, setEndState] = useState(false)

                                const validationRules = yup.object().shape({
                                        debut: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide"),
                                        fin: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").min(min, "La fin ne saurait être inférieur au debut"),
                                        level: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").max(3, "Niveau invalide").min(1, "Niveau invalide"),
                                        services: yup.array().min(1).required('Au moins un service doit être sélectionné'),

                                });

                                const formik = useFormik(
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues:
                                        {
                                                debut: "",
                                                fin: "",
                                                level: "",
                                                services: options_services.slice(0, 1)
                                        }
                                }
                                )


                                return (
                                <Form value = {undefined} onSubmit={formik.handleSubmit} >

                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                        marginBottom: 10,
                                                }
                                        }
                                        >Entrez la plage de numérotation</div>

                                        <Row>
                                                <Col>
                                                        <Form.Group className="mb-3" >
                                                                <Form.Label>Debut</Form.Label>
                                                                <Form.Control
                                                                disabled = {enableEnd}
                                                                name="debut"
                                                                value={formik.values.debut}
                                                                onChange={formik.handleChange}
                                                                onBlur = {(e) => { if(formik.values.debut !== '') {e.preventDefault(); setMin(formik.values.debut); setEndState(!enableEnd)}  }}
                                                                type="number"
                                                                placeholder="Ex: 1"
                                                                isInvalid={!!formik.errors.debut}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {formik.errors.debut}
                                                                </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                                <Col>
                                                        <Form.Group className="mb-3" onClick = { () => { if(!enableEnd) toast.error('Veuillez renseigner le debut d’abord', { position: 'top-center', } ) } } >
                                                                <Form.Label>Fin</Form.Label>
                                                                <Form.Control
                                                                        disabled = {!enableEnd}
                                                                        name="fin"
                                                                        value={formik.values.fin}
                                                                        onChange={formik.handleChange}
                                                                        type="number"
                                                                        placeholder="Ex: 147"
                                                                        isInvalid={!!formik.errors.fin}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                        {formik.errors.fin}
                                                                </Form.Control.Feedback>
                                                        </Form.Group>
                                                </Col>
                                        </Row>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Niveau des FNCs à générer</Form.Label>
                                                <Form.Control
                                                name="level"
                                                value={formik.values.level}
                                                onChange={formik.handleChange}
                                                type="number"
                                                placeholder="1 ou 2"
                                                isInvalid={!!formik.errors.level}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                        {formik.errors.level}
                                                </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Service</Form.Label>
                                                <SelectComponent updateMethod= {(e) => {formik.setFieldValue("services", e)}} options={options_services}  placeholder={"Sélectionner au moins 1 service"} />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services ? "Au moins 1 service doit être sélectionné" : null}</span>
                                        </Form.Group>

                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                }
                                        }
                                        >
                                                <Button variant="primary" type="submit">
                                                        Submit
                                                </Button>
                                        </div>
                                </Form>
                                )
                        }

                        window.Global_State.modalManager.setContent(<FNCs_form/>)
                        window.Global_State.modalManager.open_modal("Generation de Non-Conformite")
                }
                else if (thing_to_add === "add_files") {

                        const Fs_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)

                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)

                                        let queryBody = new FormData()


                                        const [parent_id, parent_type] = window.Global_State.identifyNode(node)


                                        queryBody.append("parent_type", parent_type)
                                        queryBody.append("parent_id", parent_id)
                                        submittedInfo.files.map(fileObject => { queryBody.append("fichiers[]", fileObject.file, fileObject.customName ) })
                                        queryBody.append("services", JSON.stringify(submittedInfo.services))
                                        queryBody.append("section_id", window.Global_State.selectedSectionId)


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("nc_id", queryBody.get("nonC_id"))
                                        // console.log("debut", queryBody.get("debut"))
                                        // console.log("fin", queryBody.get("fichiers[]"))

                                        if(!window.Global_State.isEditorMode)
                                        {

                                                window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)


                                                http.post('add_files', queryBody, {
                                                        headers:{
                                                                'Content-Type': 'multipart/form-data'
                                                        }
                                                })

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        // console.log(res)

                                                        if (res.data.statue === 'success')
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Fichier(s) ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                window.Global_State.modalManager.close_modal()
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
                                                        }
                                                        else
                                                        {
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.data.msg,
                                                                        icon: "error",
                                                                });
                                                                window.Global_State.modalManager.setContent(<Fs_form/>)
                                                        }
                                                })

                                                // Catch errors if any
                                                .catch((err) => {
                                                        console.log(err)
                                                        let msg
                                                        if(err.response.status === 500) msg = "erreur interne au serveur"
                                                        else if(err.response.status === 401) msg = "erreur du a une session expirée, veuillez vous reconnecter en rechargeant la page"
                                                        swal({
                                                                title: "ERREUR!",
                                                                text: err.response.data.message + "\n" + msg,
                                                                icon: "error",
                                                        });
                                                        window.Global_State.modalManager.setContent(<Fs_form/>)
                                                })
                                        }
                                        else
                                        {
                                                // console.log('editorHandle for files')
                                                // queryBody.forEach((value, key) => console.log(key, value));
                                                queryBody.set('front_parent_type', node.type)
                                                window.Global_State.editor.files.add(queryBody)

                                                window.Global_State.modalManager.close_modal()
                                        }

                                        // console.log(queryBody.get("name"))
                                };

                                const validationRules = yup.object().shape({
                                        files: yup.array().min(1).required("Au moins un fichier doit être sélectionné"),
                                        services: yup.array().min(1).required('Au moins un service doit être sélectionné'),

                                });

                                const formik = useFormik(
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues:
                                        {
                                                files: null,
                                                services: options_services.slice(0, 1)
                                        }
                                }
                                )


                                return (
                                <Form value = {undefined} onSubmit={formik.handleSubmit} >

                                        <Form.Group className="mb-3" >
                                                <Files_Dropzone updateMethod = {(e) => {formik.setFieldValue("files", e)}} />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.files}</span>
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                                <Form.Label>Service</Form.Label>
                                                <SelectComponent updateMethod= {(e) => {formik.setFieldValue("services", e)}} options={options_services}  placeholder={"Sélectionner au moins 1 service"} />
                                                <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services ? "Au moins 1 service doit être sélectionné" : null}</span>
                                        </Form.Group>

                                        <div
                                        style = {
                                                {
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        alignItems: 'center',
                                                }
                                        }
                                        >
                                                <Button variant="primary" type="submit">
                                                        Submit
                                                </Button>
                                        </div>
                                </Form>
                                )
                        }

                        window.Global_State.modalManager.setContent(<Fs_form/>)
                        window.Global_State.modalManager.open_modal("Ajouter des Fichiers")
                }
        }

        const ActionsMenu = () =>
        {
                // let label1 =  ?  : node.type === "audit" ? "Nouvelle Non-Conformité" : "Nouveau Fichier de preuve"
                const [loading_buttons, setLoading] = useState(
                {
                        rename: false,
                        share: false,
                        download: false,
                        delete: false,
                }
                )

                let buttons = []

                // console.log("kkkkkkkkkkkkk", window.Global_State.getCurrentSection().name)


                const [ id, type ] = window.Global_State.identifyNode(node)

                if (node.global_type === "folder") buttons.push( [ <option key={"add_folder"} className="dropdown-item" onClick={() => {add("add_folder")}} >Nouveau Dossier</option>, <option key={"add_files"} className="dropdown-item" onClick={() => {add("add_files")}} >Ajouter des fichiers</option> ] )
                if ( contain_audit ) buttons.push(<option key={"add_audit"} className="dropdown-item" onClick={() => {add("add_audit")}} >Nouvel Audit</option>)
                if (node.type === "nonC") buttons.push(<option key={"add_fncs"} className="dropdown-item" disabled = { false }  onClick={() => {add("add_fncs")}} >Générer des Non-Conformités</option>)


                function handleCut(e)
                {
                        // console.log("Couperrrrrrrrrrrrr")
                        if (selectedRow.length > 0)
                        {
                                e.preventDefault()
                                e.stopPropagation()

                                clearTimeout(clear_clipboard_id.current)

                                clear_clipboard_id.current =
                                setTimeout(
                                () => { setMc_state('none'); to_move_or_copy.current = [] }, 2*60000
                                )

                                to_move_or_copy.current = selectedRow.map(
                                row =>
                                {
                                        const node_data = window.Global_State.getNodeDataById(row.id)

                                        return(
                                        {...node_data, id: window.Global_State.identifyNode(node_data)[0]}
                                        )
                                }
                                )

                                from_id.current = node.id

                                setMc_state('move')
                        }
                }
                function handleCopy(e)
                {
                        // console.log("Copieeeeeeeeeeeeeee")
                        if (selectedRow.length > 0)
                        {
                                e.preventDefault()
                                e.stopPropagation()

                                clearTimeout(clear_clipboard_id.current)

                                clear_clipboard_id.current =
                                setTimeout(
                                () => { setMc_state('none') }, 10*60000
                                )

                                to_move_or_copy.current = selectedRow.map(
                                row =>
                                {
                                        const node_data = window.Global_State.getNodeDataById(row.id)

                                        return(
                                        {...node_data, id: window.Global_State.identifyNode(node_data)[0]}
                                        )
                                }
                                )

                                from_id.current = node.id

                                setMc_state('copy')
                        }
                }
                function handleRename(e)
                {
                        e.preventDefault()
                        e.stopPropagation()

                        const node = selectedRow[0]

                        if (node)
                        {
                                if ( (node.type === "f") || (node.type === "ds") )
                                {
                                        swal("Nouveau nom:", {
                                                content: "input",
                                        })
                                        .then((value) => {
                                                if (value === '') swal(`Vous devez fournir un nom`);
                                                else if ( /^(checkList|Dossier Preuve|Nc|FNC-(AI|AE)-(AGA|ANS)-\d+-\d+-\d+|(AI|AE)-(AGA|ANS)-\d+-\d+)$/.test(value) )
                                                {
                                                        swal(`Les noms "checkList", "Dossier Preuve", "Nc", d'audit et de fnc sont reservés !!`);
                                                }
                                                else if ( /^(?=.*[\\/:*?"<>|])/.test(value) )
                                                {
                                                        swal(`Les charactères suivantes sont prohibées: \\/:*?"<>|`);
                                                }
                                                else if ( /^\s|\s$/.test(value) )
                                                {
                                                        swal("Evitez les espaces au début ou á la fin des noms !!");
                                                }
                                                else
                                                {
                                                        setLoading( { ...loading_buttons, rename: true } )

                                                        const [id, model] = window.Global_State.identifyNode(node)
                                                        // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                                        const query = new FormData;
                                                        query.append('id', id)
                                                        query.append('update_object', 'name')
                                                        query.append('new_value', value.toString())

                                                        let route

                                                        switch (model)
                                                        {
                                                                case 'App\\Models\\DossierSimple':
                                                                        route = 'update_folder'
                                                                        break
                                                                case 'App\\Models\\Fichier':
                                                                        route = 'update_file'
                                                                        break
                                                                default:
                                                                        return null

                                                        }

                                                        // console.log(selectedRow[0].id.substring(2))
                                                        http.post(`${route}`, query)
                                                        .then(
                                                        res => {
                                                                // console.log(res)
                                                                if(res.data.statue === 'success') window.show_response(`${node.value} renommé avec succès !`, "success")
                                                                else window.show_response(res.data.data.msg, res.data.statue)
                                                                setLoading( { ...loading_buttons, rename: false } )
                                                        }
                                                        )
                                                        .catch(err => {
                                                                console.log(err);
                                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                                setLoading( { ...loading_buttons, rename: false } )
                                                        })
                                                }

                                        });
                                }
                                else toast.error("Can't do that 😒")
                        }
                }

                function handleDetails(e)
                {
                        e.preventDefault()
                        e.stopPropagation()

                        window.Global_State.showDetails(selectedRow[0].id)
                }
                function handleShare(e)
                {
                        e.preventDefault()
                        e.stopPropagation()

                        const nodes_info = selectedRow.map(
                        row =>
                        {
                                const node_data = window.Global_State.getNodeDataById(row.id)

                                return (
                                {
                                        id: window.Global_State.identifyNode(node_data)[0],
                                        model: window.Global_State.identifyNode(node_data)[1]
                                }
                                )
                        }
                        )

                        // console.log("Shaaaaaaaaaaaaaaaaaaaaaring")

                        const Share_to_users_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)
                                        // return

                                        setLoading( { ...loading_buttons, share: true } )

                                        let queryBody = new FormData()

                                        const inspector_ids = submittedInfo.inspectors.map( element => parseInt(element.value) )
                                        // console.log(inspector_ids)

                                        queryBody.append("inspectors", JSON.stringify(inspector_ids))

                                        // console.log("nodes_infoooooooooooooooo", nodes_info)
                                        // return
                                        queryBody.append("nodes_info", JSON.stringify(nodes_info))


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))


                                        window.Global_State.modalManager.setContent(window.Global_State.spinnerManager.spinner)
                                        http.post('share', queryBody)
                                        .then((res) => {
                                                // console.log(res)

                                                if(res.data.statue === 'success') window.show_response(`Fichier(s) partagé(s) avec success"`, "success")
                                                else window.show_response(res.data.data.msg, res.data.statue)
                                                setLoading( { ...loading_buttons, share: false } )
                                        })

                                        // Catch errors if any
                                        .catch((err) => {
                                                console.log(err)
                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                setLoading( { ...loading_buttons, share: false } )
                                        })


                                        // console.log(queryBody.get("name"))
                                };

                                const validationRules = yup.object().shape({
                                        inspectors: yup.array().min(1).required('Au moins 1'),

                                });

                                const formik = useFormik(
                                {
                                        validationSchema: validationRules,
                                        onSubmit: handleSubmit,
                                        initialValues:
                                        {
                                                inspectors: [],
                                        }
                                }
                                )


                                return (
                                 <div onClick={ e => { e.stopPropagation(); /*console.log(e)*/ } }
                                 style={{
                                         // position: "fixed"
                                         backgroundColor: "white",
                                         width: "85%",
                                         height: "fit-content",
                                         maxHeight: "90%",
                                         borderRadius: "15px",
                                         padding: 15,
                                         margin: 20
                                 }}
                                 >
                                         <Form value = {undefined} onSubmit={formik.handleSubmit} >

                                                 <Form.Group className="mb-3" >
                                                         <Form.Label>Inspecteurs</Form.Label>
                                                         <AsyncUsersSelectComponent
                                                         areFixed={[]}
                                                         updateMethod=
                                                         {
                                                                 (r) =>
                                                                 {
                                                                         // console.log('new_val', r)
                                                                         // const e = window.Global_State.copyObject(r)
                                                                         // if (!r.length) r.unshift( { value: parseInt(window.Global_State.authUser.id), label: `${window.Global_State.authUser.name} ${window.Global_State.authUser.second_name}` } );
                                                                         formik.setFieldValue("inspectors", r)
                                                                 }
                                                         }
                                                         placeholder={"Sélectionner au moins 1 inspecteur"}
                                                         filter={
                                                                 (inputValue, list) => {
                                                                         return list.filter((i) => ( (i.value !== window.Global_State.authUser.id) && i.label.toLowerCase().includes(inputValue.toLowerCase()) ) );
                                                                 }
                                                         }
                                                         />
                                                         <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.inspectors && "Au moins 1 inspecteur doit être sélectionné" }</span>
                                                 </Form.Group>

                                                 <div
                                                 style = {
                                                         {
                                                                 display: 'flex',
                                                                 justifyContent: 'center',
                                                                 position: 'relative',
                                                                 alignItems: 'center',
                                                         }
                                                 }
                                                 >
                                                         <Button variant="primary" type="submit">
                                                                 Submit
                                                         </Button>
                                                 </div>
                                         </Form>
                                 </div>
                                )
                        }

                        const component =
                        <div className="custom_overlay d-flex justify-content-center"
                        >
                                <Share_to_users_form />
                        </div>

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

                        window.Global_State.absolutePopover.open(component)
                        
                }
                function handleDownload(e)
                {
                        e.preventDefault()
                        e.stopPropagation()

                        const nodes_info = selectedRow.map(
                        row =>
                        {
                                const node_data = window.Global_State.getNodeDataById(row.id)

                                return (
                                {
                                        id: window.Global_State.identifyNode(node_data)[0],
                                        model: window.Global_State.identifyNode(node_data)[1]
                                }
                                )
                        }
                        )

                        setLoading( { ...loading_buttons, download: true } )

                        if ( (nodes_info.length === 1) && (nodes_info[0].model === "App\\Models\\Fichier") )
                        {
                                // console.log(nodes_info)
                                // return

                                http.get(`download_file?id=${nodes_info[0].id}`, { responseType: 'blob' })
                                .then( res => {
                                        // console.log(res)
                                        const blob = new Blob([res.data])
                                        // console.log(blob)
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', `${selectedRow[0].value}`);
                                        document.body.appendChild(link);
                                        link.click();

                                        setLoading( { ...loading_buttons, download: false } )
                                } )
                                .catch( err =>
                                {
                                        console.log(err)
                                        setLoading( { ...loading_buttons, download: false } )
                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                } )
                        }
                        else
                        {
                                // console.log(nodes_info)
                                // return
                                const to_compress = new FormData()
                                to_compress.append("nodes_info", JSON.stringify(nodes_info))

                                http.post("compress", to_compress)
                                .then(
                                        res =>
                                        {
                                                // console.log(res)

                                                http.get(`download_by_path?path=${res.data}`, { responseType: 'blob' })
                                                .then( res => {
                                                        // console.log(res)
                                                        const blob = new Blob([res.data])
                                                        // console.log(blob)
                                                        const url = window.URL.createObjectURL(blob);
                                                        const link = document.createElement('a');
                                                        link.href = url;
                                                        link.setAttribute('download', `${ selectedRow.length === 1 ? `${selectedRow[0].value}.zip` : "Compressed_file.zip" }`);
                                                        document.body.appendChild(link);
                                                        link.click();

                                                        setLoading( { ...loading_buttons, download: false } )
                                                } )
                                                .catch(
                                                err =>
                                                {
                                                        console.log(err)
                                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                        setLoading( { ...loading_buttons, download: false } )
                                                } )

                                        }
                                )
                                .catch(
                                err =>
                                {
                                        console.log(err)
                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                        setLoading( { ...loading_buttons, download: false } )
                                } )
                        }

                }
                function handleDelete(e)
                {
                        e.preventDefault()
                        e.stopPropagation()

                        const remove = async () =>
                        {
                                setLoading( { ...loading_buttons, delete: true } )

                                return  Promise.all(
                                selectedRow.map(
                                async row =>
                                {
                                        // console.log(window.Global_State.identifyNode(row))
                                        const nodeIdentity = window.Global_State.identifyNode(row)
                                        // const [ id, type ] = window.Global_State.identifyNode(row)

                                        // console.log(selectedRow)
                                        let route = ''
                                        switch (row.type) {
                                                case 'audit':
                                                        route = 'del_audit'
                                                        break;
                                                case 'checkList':
                                                        break;
                                                case 'dp':
                                                        break;
                                                case 'nonC':
                                                        break;
                                                case 'fnc':
                                                        route = 'del_fnc'
                                                        break;
                                                case 'ds':
                                                        route = 'del_folder'
                                                        break;
                                                case 'f':
                                                        route = 'del_file'
                                                        break;

                                                default:
                                                        break;
                                        }

                                        await http.delete(`${route}?id=` + nodeIdentity[0])
                                        .then(
                                                res => {
                                                        // console.log(res);
                                                        if(res.data.statue === 'success') window.show_response(`${row.value} supprimé avec succès !`, "success")
                                                        else window.show_response(res.data.data.msg, res.data.statue)
                                                        setLoading( { ...loading_buttons, delete: false } )
                                                }
                                        )
                                        .catch(err =>
                                        {
                                                console.log(err);
                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                setLoading( { ...loading_buttons, delete: false } )
                                                // swal({
                                                //         title: "Error",
                                                //         text: err.response.data.message,
                                                //         icon: "error"
                                                // })
                                        })

                                        // return 0;

                                }
                                )
                                )
                        }

                        const localRemove = () =>
                        {
                                selectedRow.map(
                                row =>
                                {
                                        // console.log(window.Global_State.identifyNode(row))
                                        const nodeIdentity = window.Global_State.identifyNode(row)
                                        // const [ id, type ] = window.Global_State.identifyNode(row)

                                        // console.log(selectedRow)
                                        switch (row.type) {
                                                case 'audit':

                                                        // console.log('audit dispatch del')
                                                        window.Global_State.editor.audit.delete(nodeIdentity[0])

                                                        break;
                                                case 'checkList':
                                                        break;
                                                case 'dp':
                                                        break;
                                                case 'nonC':
                                                        break;
                                                case 'fnc':

                                                        // console.log('fnc dispatch del')
                                                        window.Global_State.editor.fnc.delete(nodeIdentity[0])

                                                        break;
                                                case 'ds':

                                                        // console.log('folder del')
                                                        window.Global_State.editor.folder.delete(nodeIdentity[0])

                                                        break;
                                                case 'f':

                                                        // console.log('file dispatch del')
                                                        window.Global_State.editor.files.delete(nodeIdentity[0])

                                                        break;

                                                default:
                                                        break;
                                        }

                                }
                                )

                        }

                        // console.log(selectedRow[0].id.substring(2))
                        if( !window.Global_State.isEditorMode )
                        {
                                swal({
                                        title: "Etes vous sûr ?",
                                        text: "La suppression est définitive !!",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true,
                                })
                                .then((willDelete) => {
                                        if (willDelete) remove()
                                });

                        }
                        else localRemove()

                }
                function handleUndo(e)
                {
                        // console.log("Undooooooooooo")
                        if (window.Global_State.editor.can_undo)
                        {
                                e.preventDefault()
                                e.stopPropagation()

                                window.Global_State.EventsManager.emit("undo")
                        }
                }
                function handleRedo(e)
                {
                        // console.log("Redooooooooooo")
                        if (window.Global_State.editor.can_redo)
                        {
                                e.preventDefault()
                                e.stopPropagation()

                                window.Global_State.EventsManager.emit("redo")
                        }
                }

                const refs =
                {
                        ctrl_c: useRef(),
                        ctrl_x: useRef(),
                        ctrl_d: useRef(),
                        ctrl_s: useRef(),
                        ctrl_t: useRef(),
                        ctrl_r: useRef(),
                }

                useEffect(
                        () =>
                        {
                                window.Global_State.EventsManager.on("shortcut",
                                (value) =>
                                {
                                        // console.log(refs[value]);
                                        if (refs[value])
                                        {
                                                const action_button = refs[value].current

                                                if (action_button) action_button.click()
                                        }
                                }
                                )

                                return(
                                        () =>
                                        {
                                                window.Global_State.EventsManager.off("shortcut")
                                        }
                                )

                        }, []
                )

                const disable_feature = (editing = false, renaming = false) =>
                {
                        if (editing)
                        {
                                if (selectedRowNumber === 0) return true
                                
                                for (const row of selectedRow) 
                                {
                                        if ( (row.type !== "ds") && (row.type !== "f") ) return true
                                }

                                if (renaming) return selectedRowNumber !== 1

                                return false
                        }
                        else return selectedRowNumber === 0
                }
                
                return(
                <div className="file_table_container_actions">
                        <div className="full_size_element d-flex justify-content-between" >

                                <Stack className="full_size_element" direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />} >

                                        <Tooltip title={"AJOUTER"} placement={`left-start`} >
                                                <Dropdown >
                                                        <Dropdown.Toggle as={IconButton} color={"primary"} id={`add_dropdown`} >
                                                                <AddCircleTwoToneIcon color={"info"} fontSize={"medium"} />
                                                        </Dropdown.Toggle >

                                                        <Dropdown.Menu>
                                                                {buttons}
                                                        </Dropdown.Menu>
                                                </Dropdown>
                                        </Tooltip>

                                        <Stack direction={"row"} >

                                                <Tooltip title={"COUPER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <IconButton id={`ctrl_x`} ref={refs.ctrl_x} color={"error"} disabled={disable_feature(true)} onClick={handleCut}>
                                                                        <IoIosCut color={ disable_feature(true) ? '' : "#cc7613"} size={24} />
                                                                </IconButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"COPIER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <IconButton id={`ctrl_c`} ref={refs.ctrl_c} color={"success"} disabled={disable_feature(true)} onClick={handleCopy}>
                                                                        <CopyAllTwoToneIcon color={ disable_feature(true) ? '' : "success"} fontSize={"medium"} />
                                                                </IconButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"COLLER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <Paste_component />
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"RENOMMER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <LoadingButton as={IconButton} loading={loading_buttons.rename} ref={refs.ctrl_r} color={"primary"} disabled={disable_feature(true, true)} onClick={handleRename} >
                                                                        {
                                                                                loading_buttons.rename ? null :
                                                                                <BiRename color={ disable_feature(true, true) ? '' : "blue"} size={24} />
                                                                        }
                                                                </LoadingButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"DÉTAILS"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <IconButton color={"info"} disabled={selectedRowNumber !== 1} onClick={handleDetails} >
                                                                        {
                                                                                <TbListDetails size={24} />
                                                                        }
                                                                </IconButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"PARTAGER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <LoadingButton as={IconButton} loading={loading_buttons.share} color={"secondary"} disabled={disable_feature()} onClick={handleShare}>
                                                                        {
                                                                                loading_buttons.share ? null :
                                                                                <VscLiveShare color={ disable_feature() ? '' : "purple"} size={24} />
                                                                        }
                                                                </LoadingButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"ACQUERIR"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <LoadingButton as={IconButton} loading={loading_buttons.download} color={"primary"} disabled={disable_feature()} onClick={handleDownload}>
                                                                        {
                                                                                loading_buttons.download ? null :
                                                                                <ImDownload2 color={ disable_feature() ? '' : "#1565c0"} size={24} />
                                                                        }
                                                                </LoadingButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"SUPPRIMER"} placement={`top-end`} >
                                                        <div className="action_button" >
                                                                <LoadingButton as={IconButton} loading={loading_buttons.delete} id={'ctrl_d'} ref={refs.ctrl_d} color={"error"} disabled={disable_feature()} onClick={handleDelete}>
                                                                        {
                                                                                loading_buttons.delete ? null :
                                                                                <RiDeleteBin2Fill
                                                                                color={disable_feature() ? '' : "red"}
                                                                                size={24}/>
                                                                        }
                                                                </LoadingButton>
                                                        </div>
                                                </Tooltip>

                                        </Stack>

                                </Stack>

                                {
                                        window.Global_State.isEditorMode ?
                                        <Stack className="d-none d-sm-flex" direction={"row"} justifyContent="end" >
                                                <Tooltip title={"Undo"} placement={`top-end`} >
                                                        <div>
                                                                <IconButton disabled={!window.Global_State.editor.can_undo} onClick={handleUndo}>
                                                                        <MdUndo color={ !window.Global_State.editor.can_undo ? '' : "black"} size={24} />
                                                                </IconButton>
                                                        </div>
                                                </Tooltip>

                                                <Tooltip title={"Redo"} placement={`top-end`} >
                                                        <div>
                                                                <IconButton disabled={!window.Global_State.editor.can_redo} onClick={handleRedo}>
                                                                        <MdRedo color={ !window.Global_State.editor.can_redo ? '' : "black"} size={24} />
                                                                </IconButton>
                                                        </div>
                                                </Tooltip>
                                        </Stack>
                                        :
                                        null
                                }

                        </div>
                </div>
                )

        }

        const dataFormater = (node) =>
        {

                // console.log(node)
                let datas = []

                function getTypeExt(ext) {
                        const img = ["jpeg", "jpg", "png", "gif"]
                        const vid = ["mp4", "avi", "MOV", "mpeg"]

                        for(let imgExt of img)
                        {
                                if(imgExt === ext) return "img";
                        }
                        for(let vidExt of vid)
                        {
                                if(vidExt === ext) return "vid";
                        }
                        return ext
                }

                function TypeIcon(props) {
                        const [data, iconSize] = [props.data, props.iconSize]
                        if (data.global_type === "folder") {

                                const icon = window.Global_State.get_auditFamily_icon(data.type)

                                return (
                                        icon || <FcFolder style={ { pointerEvents: "none" } } size={iconSize}  />
                                )
                        }
                        else
                        {
                                // <BsCardImage size={iconSize} />
                                switch(getTypeExt(data.ext)) {
                                        case "img":
                                                return <img onClick={e =>
                                                {
                                                        window.Global_State.modalManager.setContent(
                                                        <div style= {
                                                                {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        position: 'relative',
                                                                        alignItems: 'center',
                                                                }
                                                        } >
                                                                <img style={
                                                                        {
                                                                                width: 'auto',
                                                                                height: 'auto',
                                                                        }} alt="Avatar" src = {data.url}  />
                                                        </div>)
                                                        window.Global_State.modalManager.open_modal("Apercu de l' image")
                                                }}  style={{  width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }} src = {data.url}   alt={''}/>
                                        case "vid":
                                                return <FcVideoFile onClick={e =>
                                                {
                                                        window.Global_State.modalManager.setContent(
                                                        <div style= {
                                                                {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        position: 'relative',
                                                                        alignItems: 'center',
                                                                }
                                                        } >
                                                                <video width="auto" height="auto" controls autoPlay preload=''>
                                                                        <source src={data.url} type={"video/" + data.ext} />
                                                                </video>
                                                        </div>)
                                                        window.Global_State.modalManager.open_modal("Apercu de l' image")
                                                }}  size = {iconSize}   />
                                        case "docx":
                                                return <RiFileWord2Fill color='#295394' size={iconSize} onClick = { e =>
                                                {
                                                        window.Global_State.modalManager.setContent(
                                                        <div style= {
                                                                {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        position: 'relative',
                                                                        alignItems: 'center',
                                                                }
                                                        } >
                                                                {/* <iframe src = { "https://drive.google.com/viewer?url=https://sunumaths.com/wp-content/uploads/2020/08/Cours-Terminale-L.pdf"} width="auto" height="auto" type="application/docx" ></iframe> */}
                                                        </div>)
                                                        window.Global_State.modalManager.open_modal("Apercu du fichier")
                                                }
                                                } />
                                        case "pdf":
                                                return <BsFillFileEarmarkPdfFill color='#ad0b00' size={iconSize}
                                                                 style={
                                                                         {
                                                                                 pointerEvents: 'all'
                                                                         }
                                                                 }
                                                                 onClick = { e =>
                                                                        {
                                                                                // console.log(data)
                                                                                window.Global_State.modalManager.setContent(
                                                                                <div style= {
                                                                                        {
                                                                                                display: 'flex',
                                                                                                justifyContent: 'center',
                                                                                                position: 'relative',
                                                                                                alignItems: 'center',
                                                                                        }
                                                                                } >
                                                                                        {window.Global_State.getNodeDataById(data.id).onEdit ? 'Pas encore telechargé' : <embed src = {data.url + "#toolbar=0&navpanes=0&scrollbar=0"} width={900} height= {400} type="application/pdf"  ></embed>}
                                                                                </div>)
                                                                                window.Global_State.modalManager.open_modal("Apercu du fichier")
                                                                        }
                                                                }
                                                        />
                                        case "xlsx":
                                                return <SiMicrosoftexcel color='#1f6e43' size={iconSize} />
                                        case "pptx":
                                                return <SiMicrosoftpowerpoint color='#ad0b00' size={iconSize} onClick = { e =>
                                                {
                                                        window.Global_State.modalManager.setContent(
                                                        <div style= {
                                                                {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        position: 'relative',
                                                                        alignItems: 'center',
                                                                }
                                                        } >
                                                                {/* <iframe src = {data.url} width="auto" height="auto" type="application/pptx"></iframe> */}
                                                        </div>)
                                                        window.Global_State.modalManager.open_modal("Apercu du fichier")
                                                }
                                                } />
                                        default:
                                                return <AiFillFileUnknown size={iconSize} />
                                }
                        }
                }

                const NameFormater = (props) => {
                        const name_ref = useRef()

                        const nameComponent = (
                                <div id = {props.data.id} ref={name_ref} data-tag="allowRowEvents" className='d-flex justify-content-center align-items-center' style={{ height: '100%',/* minWidth: 'fit-content',*/ maxWidth: 400, zIndex: -1000 }} {...props} >
                                        <span data-tag="allowRowEvents" style={ { minWidth: 30, minHeight: 30 } } >
                                                <TypeIcon iconSize={30} {...props} />
                                        </span>
                                        <span title={props.data.name} data-tag="allowRowEvents"
                                              style={
                                                      {
                                                              MozUserSelect: 'none',
                                                              msUserSelect: 'none',
                                                              WebkitUserSelect: 'none',
                                                              userSelect: 'none',
                                                              marginLeft: 10,
                                                              fontSize: 15,
                                                              fontWeight: 'bold',
                                                              whiteSpace: 'nowrap',
                                                              overflow: 'hidden',
                                                              textOverflow: 'ellipsis',
                                                      }
                                              }
                                        >
                                                {props.data.name}
                                        </span>
                                </div>
                        )

                        useEffect(
                                () =>
                                {

                                        var pDoc = document.getElementById(`${props.data.id}`);

                                        var parent = pDoc.parentNode

                                        parent.classList.add("h-100")
                                        parent.style.height = '100%'


                                }
                        )

                        return(
                        <React.Fragment>
                                {nameComponent}
                        </React.Fragment>
                        )
                }

                const LevelComponent = ({data}) =>
                {
                        // const [niv, setNiv] = useState(level)

                        const level = parseInt(data.level)

                        const nextNiv = currentNiv =>
                        {
                                switch (currentNiv) {
                                        case 1:
                                                return 2
                                        case 2:
                                                return 3
                                        case 3:
                                                return 1

                                        default:
                                                return 0
                                }
                        }

                        let class_name
                        switch (level) {
                                case 1:
                                        class_name = "badge bg-danger-bright text-dark"
                                        break
                                case 2:
                                        class_name = "badge bg-warning-bright text-dark"
                                        break
                                case 3:
                                        class_name = "badge bg-dark-bright text-dark"
                                        break

                                default:
                                        break;
                        }

                        function handleClick(e)
                        {
                                // console.log(level)
                                const node_data = window.Global_State.getNodeDataById(data.id)
                                const [id, lol] = window.Global_State.identifyNode(node_data)
                                // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                const query = new FormData;
                                query.append('id', id)
                                query.append('update_object', 'level')
                                query.append('new_value', nextNiv(level))
                                query.append('additional_info', JSON.stringify( {} ))

                                if(!window.Global_State.isEditorMode)
                                {
                                        const update = async () =>
                                        {
                                                const onFulfilled = (res) =>
                                                {
                                                        // console.log('update_leveeeeeeeeeeeeeeeeeeeeeel', res)
                                                        toast.dismiss(`update_lvl_${data.id}`)
                                                        if (res.data.statue === "success")
                                                        {
                                                                window.show_response("Le niveau a été mis à jour", "success")
                                                        }
                                                        else window.show_response(res.data.data.msg, res.data.statue)
                                                }
                                                const onRejected = (err) =>
                                                {
                                                        console.log(err)
                                                        toast.dismiss(`update_lvl_${data.id}`)
                                                        window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                }

                                                await http.post('update_fnc', query)
                                                .then( onFulfilled, onRejected )
                                        }

                                        toast("Loading...",
                                        {
                                                id: `update_lvl_${data.id}`,
                                                type: 'loading',
                                                duration: Infinity
                                        }
                                        )

                                        update()
                                }
                                else
                                {
                                        window.Global_State.editor.fnc.update(query)
                                }


                        }

                        return( <div className={class_name} onClick = {handleClick} >{level}</div> )
                }

                const OpeningDateComponent = ({data}) =>
                {
                        const value = data.opening_date ? data.opening_date : '____/__/__'

                        const handleClick = e =>
                        {
                                e.stopPropagation()
                                // console.log("opening date handle click")

                                const Date_input = ({data }) =>
                                {
                                        const [open, setOpen] = useState(false)
                                        const [anchorEl, setAnchorEl] = useState(null)
                                        const [loading, setLoading] = useState(false)

                                        const [openingDate, setOpeningDate] = useState(data.opening_date !== null ? new Date(data.opening_date) : new Date());

                                        // `${openingDate.getFullYear()}/${openingDate.getMonth()+1}/${openingDate.getDate()}`
                                        const new_opening_date = `${openingDate.getFullYear()}/${(openingDate.getMonth()+1).toString().padStart(2, '0')}/${openingDate.getDate().toString().padStart(2, '0')}`
                                        // console.log('new_opening_date', new_opening_date, e)

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        // console.log('millesec dif', new Date(new_opening_date).valueOf() - new Date().valueOf())

                                        const handleSubmit = e =>
                                        {
                                                e.stopPropagation()
                                                setLoading(true)

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
                                                const [id, model_type] = window.Global_State.identifyNode(data)

                                                const query = new FormData;
                                                query.append('id', id)
                                                query.append('update_object', 'opening_date')
                                                query.append('new_value', new_opening_date)

                                                if(!window.Global_State.isEditorMode)
                                                {
                                                        const onFulfilled = (res) =>
                                                        {
                                                                // console.log('update_open_daaaaaaaaate', res)
                                                                setLoading(false)
                                                                if (res.data.statue === "success")
                                                                {
                                                                        window.show_response("La date d'ouverture a été mis à jour", "success")
                                                                        window.Global_State.absolutePopover.close()
                                                                }
                                                                else window.show_response(res.data.data.msg, res.data.statue)
                                                        }
                                                        const onRejected = (err) =>
                                                        {
                                                                console.log(err)
                                                                setLoading(false)
                                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                        }

                                                        http.post('update_fnc', query)
                                                        .then(onFulfilled, onRejected)
                                                }
                                                else
                                                {
                                                }
                                        }

                                        const handleChange = (newValue) => {
                                                const date = new Date(newValue)
                                                // console.log( "open_daaaaaaaate newValue", newValue, date.getDate())
                                                setOpeningDate(date)
                                        };

                                        const ResponsiveDatePicker = window.innerWidth > 576 ? DesktopDatePicker : MobileDatePicker

                                        return (
                                        <div className={`d-flex justify-content-center align-items-center m-2`}
                                             onClick={e => { e.preventDefault(); e.stopPropagation() }}
                                             style={{
                                                     backgroundColor: 'rgba(255,255,255,0)',
                                                     borderRadius: 10,
                                                     border: '1px solid blue',
                                                     overflow: "hidden",
                                                     height: "fit-content",
                                                     width: "fit-content",
                                             }}
                                        >
                                                <div className={`d-flex`} style={{ width: "fit-content" }} >
                                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                                <ResponsiveDatePicker
                                                                open={open}
                                                                PopperProps={{
                                                                        anchorEl,
                                                                }}
                                                                onClose={ () => { setOpen(false); setAnchorEl(null) } }
                                                                inputFormat="YYYY/MM/DD"
                                                                value={openingDate}
                                                                onChange={handleChange}
                                                                maxDate={data.created_at.substring(0, 10)}
                                                                renderInput={(params) =>
                                                                <CustomDateInput id={"lol78"}
                                                                             value={openingDate.toDateString()}
                                                                             loading={loading}
                                                                             onSubmit={handleSubmit}
                                                                             onClick={ e => { setAnchorEl(e.target); setOpen(true) } }
                                                                />
                                                                }
                                                                // disablePast
                                                                />
                                                        </LocalizationProvider>
                                                </div>
                                        </div>
                                        )
                                }

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

                                window.Global_State.absolutePopover.open(<Date_input data={data} />, e.target)
                        }

                        return(
                                <span className={`${data.opening_date ? 'text-primary' : ''}`} onClick={handleClick} >
                                        {value}
                                </span>
                        )
                }

                const ReviewDateComponent = ({data}) =>
                {
                        const value = data.review_date ? data.review_date : '____/__/__'

                        const handleClick = e =>
                        {
                                e.stopPropagation()
                                // console.log("OPENING date handle click")

                                const Date_input = ({data }) =>
                                {
                                        const [clearLoading, setClearLoading] = useState(false)
                                        const [open, setOpen] = useState(false)
                                        const [anchorEl, setAnchorEl] = useState(null)
                                        const [loading, setLoading] = useState(false)

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

                                        const CustomTimeInput = useCallback(
                                                function CustomTimeInput({ date, value, onChange })
                                                {

                                                        const validationRules = yup.object().shape({
                                                                hour: yup.number().integer().positive("L'heure est positive").min(new Date().getHours()).max(24, 'maximum 24h'),
                                                                minutes: yup.number().integer().positive("L'heure est positive").min(0).max(60, 'maximum 60mins'),

                                                        });

                                                        const formik = useFormik(
                                                        {
                                                                validationSchema: validationRules,
                                                                onSubmit: handleSubmit,
                                                                initialValues:
                                                                {
                                                                        hour: new Date().getHours(),
                                                                        minutes: 0
                                                                }
                                                        }
                                                        )

                                                        const handleBlur = e =>
                                                        {
                                                                e.preventDefault()
                                                                e.stopPropagation()
                                                                if (!formik.errors.hour && !formik.errors.minutes)
                                                                {
                                                                        onChange(`${formik.values.hour === '' ? 0 : formik.values.hour}:${formik.values.minutes === '' ? 0 : formik.values.minutes}`)
                                                                }
                                                        }

                                                        return(
                                                        <Form className={`d-flex flex-row`} value = {undefined} onSubmit={formik.handleSubmit} >


                                                                <Form.Group className="mr-3 d-flex" >
                                                                        <Form.Label style={{ margin: 0, marginRight: 5 }} >hh</Form.Label>
                                                                        <Form.Control
                                                                        style=
                                                                        {{
                                                                                maxWidth: '35px',
                                                                                maxHeight: '20px',
                                                                                fontSize: '10px',
                                                                                padding: '2px'
                                                                        }}
                                                                        maxLength = '2'
                                                                        name="hour"
                                                                        value={formik.values.hour}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={ handleBlur }
                                                                        // type="number"
                                                                        placeholder="00"
                                                                        isInvalid={!!formik.errors.hour}
                                                                        />
                                                                        {/*<Form.Control.Feedback  type="invalid">*/}
                                                                        {/*        {formik.errors.hour}*/}
                                                                        {/*</Form.Control.Feedback>*/}
                                                                </Form.Group>


                                                                <Form.Group className="d-flex" >
                                                                        <Form.Label style={{ margin: 0, marginRight: 5 }} >mm</Form.Label>
                                                                        <Form.Control
                                                                        style=
                                                                        {{
                                                                                maxWidth: '35px',
                                                                                maxHeight: '20px',
                                                                                fontSize: '10px',
                                                                                padding: '2px'
                                                                        }}
                                                                        maxLength = '2'
                                                                        name="minutes"
                                                                        value={formik.values.minutes}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={ handleBlur }
                                                                        // type="number"
                                                                        placeholder="00"
                                                                        isInvalid={!!formik.errors.minutes}
                                                                        />
                                                                        {/*<Form.Control.Feedback type="invalid">*/}
                                                                        {/*        {formik.errors.minutes}*/}
                                                                        {/*</Form.Control.Feedback>*/}
                                                                </Form.Group>

                                                                {/*<div*/}
                                                                {/*style = {*/}
                                                                {/*        {*/}
                                                                {/*                display: 'flex',*/}
                                                                {/*                justifyContent: 'center',*/}
                                                                {/*                position: 'relative',*/}
                                                                {/*                alignItems: 'center',*/}
                                                                {/*        }*/}
                                                                {/*}*/}
                                                                {/*>*/}
                                                                {/*        <Button variant="primary" type="submit">*/}
                                                                {/*                Submit*/}
                                                                {/*        </Button>*/}
                                                                {/*</div>*/}
                                                        </Form>
                                                        )
                                                }, []
                                        )

                                        const [reviewDate, setReviewDate] = useState(data.review_date !== null ? new Date(data.review_date) : new Date());

                                        const new_review_date = `${reviewDate.getFullYear()}/${reviewDate.getMonth()+1}/${reviewDate.getDate()} ${reviewDate.getHours()}:${reviewDate.getMinutes()}`
                                        // console.log('new_review_date', new_review_date, e)

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        // console.log('millesec dif', new Date(new_review_date).valueOf() - new Date().valueOf())

                                        const handleSubmit = e =>
                                        {
                                                e.stopPropagation()

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

                                                setLoading(true)

                                                // console.log(new_review_date)
                                                const [id, model_type] = window.Global_State.identifyNode(data)

                                                const query = new FormData;
                                                query.append('id', id)
                                                query.append('update_object', 'review_date')
                                                query.append('new_value', new_review_date)
                                                query.append('additional_info', JSON.stringify(
                                                        {
                                                                remain_ms: `${new Date(new_review_date).valueOf() - new Date().valueOf()}`
                                                        }
                                                ))

                                                if(!window.Global_State.isEditorMode)
                                                {
                                                        const onFulfilled = (res) =>
                                                        {
                                                                // console.log('update_review_daaaaaaaaate', res)
                                                                setLoading(false)
                                                                if (res.data.statue === "success")
                                                                {
                                                                        window.show_response("La date de révision a été mis à jour", "success")
                                                                        window.Global_State.absolutePopover.close()
                                                                }
                                                                else window.show_response(res.data.data.msg, res.data.statue)
                                                        }
                                                        const onRejected = (err) =>
                                                        {
                                                                console.log(err)
                                                                setLoading(false)
                                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                        }

                                                        http.post('update_fnc', query)
                                                        .then(onFulfilled, onRejected)
                                                }
                                                else
                                                {
                                                        window.Global_State.editor.fnc.update(query)
                                                }
                                        }

                                        const handleClear = e =>
                                        {
                                                e.stopPropagation()

                                                // console.log("clear_review_date")

                                                const id = window.Global_State.identifyNode(data)[0]

                                                if(!window.Global_State.isEditorMode)
                                                {
                                                        setClearLoading(true)

                                                        const onFulfilled = (res) =>
                                                        {
                                                                // console.log('clear_review_daaaaaaaaaaaaaate', res)
                                                                setClearLoading(false)
                                                                window.Global_State.absolutePopover.close()
                                                                if (res.data.statue === "success")
                                                                {
                                                                        window.show_response("Programation de révision annulée", "success")
                                                                }
                                                                else window.show_response(res.data.data.msg, res.data.statue)
                                                        }
                                                        const onRejected = (err) =>
                                                        {
                                                                console.log(err)
                                                                setClearLoading(false)
                                                                window.Global_State.absolutePopover.close()
                                                                window.show_response(`${err.message} ${err.response.data.message}`, "error")
                                                        }

                                                        http.post("update_fnc", {id, update_object: "cancel_review", new_value: 'null'})
                                                        .then(onFulfilled, onRejected)
                                                }
                                                else
                                                {

                                                }
                                        }

                                        const handleChange = (newValue) => {
                                                const date = new Date(newValue)
                                                setReviewDate(date)
                                        };

                                        return (
                                                <Stack className="m-2" direction={"row"} spacing={1} alignItems={"center"} onClick={e => { e.preventDefault(); e.stopPropagation() }} >
                                                        <div className={`d-flex justify-content-center align-items-center`}
                                                             style={{
                                                                     backgroundColor: 'rgba(255,255,255,0)',
                                                                     borderRadius: 10,
                                                                     border: '1px solid blue',
                                                                     overflow: "hidden",
                                                                     height: "fit-content",
                                                                     width: "fit-content",
                                                             }}
                                                        >
                                                                <div className={`d-flex`} style={{ width: "fit-content" }} >
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                                                <DateTimePicker
                                                                                open={open}
                                                                                PopperProps={{
                                                                                        anchorEl,
                                                                                }}
                                                                                onClose={ () => { setOpen(false); setAnchorEl(null) } }
                                                                                inputFormat="YYYY/MM/DD"
                                                                                value={reviewDate}
                                                                                onChange={handleChange}
                                                                                minDate={new Date()}
                                                                                renderInput={(params) =>
                                                                                <CustomDateInput id={"lol78"}
                                                                                                 value={reviewDate.toDateString()}
                                                                                                 loading={loading}
                                                                                                 onSubmit={handleSubmit}
                                                                                                 onClick={ e => { setAnchorEl(e.target); setOpen(true) } }
                                                                                />
                                                                                }
                                                                                disablePast
                                                                                />
                                                                        </LocalizationProvider>
                                                                </div>
                                                        </div>
                                                        <LoadingButton as={IconButton} loading={clearLoading} title={"EFFACER"} color={"error"} disabled={value === '____/__/__'} onClick={handleClear} >
                                                                {
                                                                        clearLoading ? null : <AiFillCloseCircle size={25} />
                                                                }
                                                        </LoadingButton>
                                                </Stack>
                                        )
                                }

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

                                window.Global_State.absolutePopover.open(<Date_input data={data} />, e.target)
                        }

                        return(
                                <span className={`${data.review_date ? 'text-primary' : ''}`} onClick={handleClick} >
                                        {value}
                                </span>
                        )
                }

                const IsClosedComponent = ({data}) =>
                {
                        const handleClick = e =>
                        {
                                e.stopPropagation()
                                // console.log("IsClosedComponent handle click")

                                const [id, model] = window.Global_State.identifyNode(data)

                                const query = new FormData;
                                query.append('id', id)
                                query.append('update_object', 'isClosed')
                                query.append('new_value', data.isClosed ? 0 : 1)

                                if(!window.Global_State.isEditorMode)
                                {
                                        toast.promise(
                                        http.post('update_fnc', query),
                                        {
                                                loading: 'Loading...',
                                                success: 'Processus achevé',
                                                error: 'Erreur'
                                        },
                                        {
                                                id: `is_closed_${data.id}`,
                                                duration: Infinity
                                        }

                                        )
                                        .then(
                                        res =>
                                        {
                                                // console.log(res)
                                                switch (res.data.statue)
                                                {
                                                        case 'success':
                                                                toast(`Le statue a été mise á jour !!`, {type: 'success'})
                                                                break
                                                        case 'error':
                                                                toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                                break
                                                        case 'info':
                                                                toast(`Info: ${res.data.data.msg}`, {icon: "📢", style: { fontWeight: 'bold' } })
                                                                break
                                                }
                                                setTimeout( () => { toast.dismiss(`is_closed_${data.id}`) }, 600 )
                                        }
                                        )
                                        .catch(err => { console.log(err); setTimeout( () => { toast.dismiss(`is_closed_${data.id}`) }, 600 ) })
                                }
                                else
                                {
                                        // window.Global_State.editor.fnc.update(query)
                                }
                        }

                        return(
                                data.isClosed ? <div className="badge bg-success-bright text-success" onClick={handleClick} >Clôturé</div> : <div className="badge bg-danger-bright text-danger" onClick={handleClick} >Non-Clôturé</div>
                        )
                }

                const ValidBadge = ({data}) =>
                {
                        const [checked, check] = useState(false)

                        function handleClick(e)
                        {
                                e.preventDefault();
                                e.stopPropagation();

                                // console.log(e)

                                const [id, model] = window.Global_State.identifyNode(data)
                                // window.Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                const query = new FormData;
                                query.append('id', id)
                                query.append('update_object', 'is_validated')
                                query.append('new_value', data.is_validated ? 0 : 1)
                                query.append('additional_info', JSON.stringify( {} ))

                                let route

                                switch (model)
                                {
                                        case 'App\\Models\\Audit':
                                                route = 'update_audit'
                                                break
                                        case 'App\\Models\\checkList':
                                                route = 'update_checkList'
                                                break
                                        case 'App\\Models\\DossierPreuve':
                                                route = 'update_dp'
                                                break
                                        case 'App\\Models\\Nc':
                                                route = 'update_nc'
                                                break
                                        case 'App\\Models\\NonConformite':
                                                route = 'update_fnc'
                                                break
                                        case 'App\\Models\\DossierSimple':
                                                route = 'update_folder'
                                                break
                                        case 'App\\Models\\Fichier':
                                                route = 'update_file'
                                                break
                                        default:
                                                return null

                                }

                                 // console.log(selectedRow[0].id.substring(2))
                                toast.promise(
                                http.post(`${route}`, query),
                                {
                                        loading: 'Loading...',
                                        success: 'Proccesus achevé',
                                        error: 'err'
                                },
                                {
                                        id: `${route}${data.id}`,
                                        duration: Infinity
                                }
                                )
                                .then(
                                res => {
                                        // console.log(res)
                                        switch (res.data.statue) {
                                                case 'success':
                                                        toast(`L'element a été ${res.data.data.is_validated ? "validé" : "dévalidé"}`, {type: 'success'})
                                                        break
                                                case 'error':
                                                        toast(`Erreur survenue: ${res.data.data.msg}`, {type: 'error'})
                                                        break
                                                case 'info':
                                                        toast(`Info: ${res.data.data.msg}`, {
                                                                icon: "📢",
                                                                style: {fontWeight: 'bold'}
                                                        })
                                                        break
                                        }
                                        setTimeout(() => {
                                                toast.dismiss(`${route}${data.id}`)
                                        }, 600)
                                }
                                )
                                .catch(err => {
                                        console.log(err);
                                        setTimeout(() => {
                                                toast.dismiss(`${route}${data.id}`)
                                        }, 600)
                                })


                        }

                        const checkBox_package = useCustomCheckBox()

                        return (
                                <div className={'d-flex align-items-center justify-content-center'} style={{ width: 40, height: 30 }} onClick={ handleClick } >
                                        {
                                                data.is_validated ?
                                                <BsPatchCheckFill size={16} color={"#0cd10c"} />
                                                :
                                                <VscCircleLargeOutline size={16} color={'#b4b2b2'} />
                                        }

                                </div>
                        );
                }

                function getTopLevelParent(node)
                {
                        if (node.parentId === "0") return {...node}
                        else
                        {
                                const parent = window.Global_State.getNodeDataById(node.parentId)

                                return getTopLevelParent(parent)
                        }
                }

                for(let child_node of node.children )
                {
                        // console.log('child_node.id', child_node)
                        const data = child_node // window.Global_State.getNodeDataById(child_node.id)
                        // if (data === null) continue

                        let validation_component

                        if (data.is_validated) validation_component = <ValidBadge data={data} />
                        else if (window.Global_State.authUser.right_lvl === 2) validation_component = <ValidBadge data={data} />
                        else
                        {
                                const top_lvl_parent = getTopLevelParent(data)
                                if ( top_lvl_parent.ra && (window.Global_State.authUser.id === top_lvl_parent.ra.id) ) validation_component = <ValidBadge data={data} />
                                else validation_component = <div style={{ pointerEvents: "none" }} />
                        }

                        datas.push(
                                {
                                        id: data.id,
                                        value: data.name,
                                        level_value: data.level,
                                        name: <NameFormater data = {data} />,
                                        level: data.type === "fnc" ? <LevelComponent data={data} /> : undefined,
                                        created_at: data.created_at,
                                        isClosed: data.type === "fnc" ? <IsClosedComponent data={data} /> : undefined ,
                                        RA:  node.type === "root" && data.type === 'audit' ? data.ra.name.substring(0, 1) + ". " +  data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " +  node.ra.second_name : undefined,
                                        size: data.global_type === 'file' ? window.Global_State.sizeFormater(data.taille) : undefined,
                                        type: data.type,
                                        global_type: data.global_type,
                                        section_id: data.section_id,
                                        isBeingEdited: data.onEdit,
                                        opening_date: data.type !== "fnc" ? '' : <OpeningDateComponent data={data} />,
                                        review_date: data.review_date === undefined ? '' : <ReviewDateComponent data={data} />,
                                        valid_badge:  validation_component,

                                }
                        )
                }

                return datas
        }

        // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
        const sortByName = (rowA, rowB) => {
                // console.log('tyyyyyyyyyyyyyyyyyyype', node.type)
                if(node.type === 'nonC')
                {
                        const [listA, listB] = [rowA.value.split('-'), rowB.value.split('-')];
                        const [a, b] = [parseInt(listA[listA.length - 1]), parseInt(listB[listB.length - 1])]

                        if (a > b) {
                                // console.log(a, " : ", b, " : ", 1)
                                return 1;
                        }

                        if (b > a) {
                                return -1;
                        }

                        return 0;
                }
                else
                {
                        const a = rowA.value.toLowerCase();
                        const b = rowB.value.toLowerCase();

                        if (a > b) {
                                // console.log(a, " : ", b, " : ", 1)
                                return 1;
                        }

                        if (b > a) {
                                return -1;
                        }

                        return 0;
                }
        };

        const sortByLevel = (rowA, rowB) => {
                const a = rowA.level_value;
                const b = rowB.level_value;

                if (a > b) {
                        // console.log(a, " : ", b, " : ", 1)
                        return 1;
                }

                if (b > a) {
                        return -1;
                }

                return 0;
        };

        const compareDate = (dateA, dateB) =>
        {
                // console.log("daaaaaaaaate", dateA, dateB)
                if (!dateA && !dateB) return 0;
                else if (!dateA) return 0;
                else if (!dateB) return 0;
                else {
                        const a = new Date(dateA);
                        const b = new Date(dateB);

                        if (a.valueOf() > b.valueOf()) return 1;

                        if (b.valueOf() > a.valueOf()) return -1;

                        return 0;
                }
        };


        const columns = useMemo(() =>
        {
                const columns_of_the_type =
                [
                        {
                                name: '',
                                button: true,
                                cell: row => row.valid_badge,
                                sortable: false,
                                width: "20px"
                        },
                        {
                                name: 'NOM',
                                selector: row => row.name,
                                sortable: true,
                                sortFunction: sortByName,
                        },
                ]

                if (node.type === "root" && contain_audit) {
                        columns_of_the_type.push(
                                ...[
                                        {
                                                name: 'CREE LE',
                                                selector: row => row.created_at.replace("T", " À "),
                                                sortable: true,
                                                sortFunction: (rowA, rowB) => compareDate( rowA.created_at, rowB.created_at ),
                                                width: "30%"
                                        },
                                        {
                                                name: 'RA',
                                                selector: row => row.RA,
                                                sortable: true,
                                                width: "20%"
                                        },

                                ]
                        )
                }
                else if (node.type === "audit") {
                        columns_of_the_type.push(
                                ...[
                                        {
                                                name: 'RA',
                                                selector: row => row.RA,
                                                sortable: true,
                                        },

                                ]
                        )
                }
                else if(node.type === "nonC") {
                        columns_of_the_type.push(
                                ...[
                                        {
                                                name: "DATE D'OUVERTURE",
                                                selector: row => row.opening_date,
                                                sortable: true,
                                                sortFunction: (rowA, rowB) => rowA.opening_date ? compareDate( rowA.opening_date.props.data.opening_date, rowB.opening_date.props.data.opening_date ) : 0,
                                                width: "15%"
                                        },
                                        {
                                                name: 'NIVEAU',
                                                selector: row => row.level,
                                                sortable: true,
                                                sortFunction: sortByLevel,
                                                width: "11%"
                                        },
                                        {
                                                name: 'DATE DE REVISION',
                                                selector: row => row.review_date,
                                                sortable: true,
                                                sortFunction: (rowA, rowB) => rowA.review_date ? compareDate( rowA.review_date.props.data.review_date, rowB.review_date.props.data.review_date ) : 0,
                                                width: "15%",
                                        },
                                        {
                                                name: 'STATUE',
                                                selector: row => row.isClosed,
                                                width: "16%"
                                        },

                                ]
                        )
                }
                else columns_of_the_type.push(
                                ...[
                                        {
                                                name: 'CREE LE',
                                                selector: row => row.created_at.replace("T", " À "),
                                                sortable: true,
                                                sortFunction: (rowA, rowB) => compareDate( rowA.created_at, rowB.created_at ),
                                                width: "30%",
                                        },
                                        {
                                                name: 'TAILLE',
                                                selector: row => row.size,
                                                sortable: true,
                                                width: "100px"
                                        },

                                ]
                        )

                return columns_of_the_type
        },
        [node]
        )

        const formattedDatas = useMemo(() => dataFormater(node), [node])
        // const formattedDatas = useDataFormater(node)

        const reducer = (state, action) => {
                switch (action.type) {
                        case "toggleSelection":
                                // console.log('toggleSelection')
                                return state.map((node) => {
                                        if (action.nodeIds.indexOf(node.id) !== -1 ) return { ...node, isSelected: true };
                                        else return { ...node, isSelected: false };
                                });
                        case 'nodeUpdate':
                                return action.newDatas
                        default:
                                return state;
                }
        };

        // initDatas is always up to date
        const initDatas = formattedDatas.map(node => ({...node, isSelected: false}) )

        const [datas, dispatch] = useReducer(reducer,  initDatas);

        useEffect(
        () =>
        {
                window.Global_State.EventsManager.emit('clearSelected')

                if( (filter.tag === "la Date de revision") && (node.type !== "nonC") ) setFilter({tag: "le Nom", element: ''})
                if( (filter.tag === "le RA") && (!contain_audit) ) setFilter({tag: "le Nom", element: ''})

        },[node]
        )

        useEffect(
        () =>
        {
                dispatch({type: 'nodeUpdate', newDatas: initDatas})
        }, [formattedDatas]
        )

        // console.log('contentRender')

        const handleChange = ( selectedCount, selectedRows, update = false ) =>
        {
                // console.log(selectedRows)
                if(!justChecking.current && !update)
                {
                        setNumber(selectedCount)
                        setSelectedRows(selectedRows)

                        // console.log('noAdd')
                        // const ids = selectedRows.map( row => row.id )
                        // console.log(ids)
                        // dispatch({type: 'toggleSelection', nodeIds: ids })
                }
                else if(!justChecking.current && update)
                {
                        setSelectedRows(t =>
                        {
                                let idx = -1
                                t.forEach(row => {
                                        if( row.id === selectedRows[0].id ) idx = t.indexOf(row)
                                });
                                if( idx === -1 ) t.push(selectedRows[0]);
                                else t.splice(idx, 1)

                                return t.slice(0)
                        }
                        )
                        // console.log(selectedRowNumber, selectedRow.length, selectedRow)
                        setNumber(selectedRow.length)

                        // console.log('Add')


                }
                justChecking.current = false

        };

        useEffect(
        () =>
        {
                // console.log(selectedRow)
                // console.log('ctrlKey', selectedRow, selectedRow.length)
                const ids = selectedRow.map( row => row.id )
                // console.log(ids)
                dispatch({type: 'toggleSelection', nodeIds: ids })
        }, [selectedRow]
        )

        const onRowDoubleClicked =
         async (row, event) =>
        {
                // console.log('db_cliked_row', row)
                let tree_row = document.getElementById(`treeRow-${row.id}`)

                if (!tree_row)
                {
                        // console.log('checkpoint 1', tree_row)
                        const full_row_data = window.Global_State.getNodeDataById(row.id)
                        // console.log('checkpoint 1.5', full_row_data)
                        if (full_row_data.global_type === 'folder')
                        {
                                // console.log('checkpoint 2', full_row_data)

                                const parent_node = window.Global_State.getNodeDataById(full_row_data.parentId)
                                await onRowDoubleClicked(parent_node, '')
                                tree_row = document.getElementById(`treeRow-${row.id}`)
                        }
                        else return
                }

                tree_row.click()

                const doubleClickEvent = new MouseEvent("dblclick", {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                });
                doubleClickEvent.is_opening = true

                // console.log('dbclick_proggggggg', doubleClickEvent, doubleClickEvent.is_opening)

                tree_row.dispatchEvent(doubleClickEvent);

                // window.Global_State.backend.setCurrentSelectedFolder(row.id)
                // console.log('dbclick',row)

        }

        const handleClick = (row, event) =>
        {
                // console.log(row.id, event);

                event.preventDefault(); event.stopPropagation()
                if(event.ctrlKey || event.altKey || event.shiftKey) handleChange(1, [row], true)
                else handleChange(1, [row])

                // selectedRowsByClick.current = [row]
        }

        const style = useSpring({
                from: {
                        opacity: 0,
                        transform: 'translate3d(20px,0,0)',
                },
                to: {
                        opacity: 1,
                        transform: `translate3d(${0}px,0,0)`,
                },
                delay:5000
        });

        const rowsStyles =
        [
                {
                        when: row => row.isBeingEdited,
                        style:
                        {
                                borderLeft: 'solid',
                                borderRight: 'solid',
                                borderRightColor: 'blue',
                                borderLeftColor: 'blue',
                                borderLeftWidth: '2px',
                                borderRightWidth: '2px',
                                borderRadius: '4px',
                                // borderTopWidth: '0px',
                                // borderBottomWidth: '0px',
                        },
                },
        ]

        const filtered_datas = useMemo( () =>
                {
                        return datas.filter(
                                row =>
                                {
                                        switch (filter.tag)
                                        {
                                                case 'le Nom':
                                                        if ( (node.type === 'nonC') && /^\d+$/.test(filter.element) )
                                                        {
                                                                const list = row.value.split('-')

                                                                return parseInt( list[ list.length - 1 ] ) === parseInt(filter.element)
                                                        }
                                                        else return row.value.indexOf(filter.element) !== -1
                                                case 'la Date de creation':
                                                {
                                                        // console.log(new Date(row.created_at.substring(0, 10).split('-').join('/')).valueOf())

                                                        const creation_string_date = row.created_at.substring(0, 10)
                                                        const formated_creation_string_date = creation_string_date.split('-').join('/')

                                                        const creation_date = new Date(formated_creation_string_date)

                                                        const [debut, fin] = filter.element

                                                        if (debut === null && fin === null) return true
                                                        else
                                                        {
                                                                if (debut === null)
                                                                {
                                                                        return ( creation_date.valueOf() <= fin.valueOf() )
                                                                }
                                                                else if (fin === null)
                                                                {
                                                                        return ( creation_date.valueOf() >= debut.valueOf() )
                                                                }
                                                                else
                                                                {
                                                                        // console.log(debut.valueOf(), fin.valueOf(), creation_date.valueOf(), (creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf()) )
                                                                        return ( creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf() )
                                                                }
                                                        }
                                                }
                                                case 'le RA':
                                                        if (row.RA) return row.RA.indexOf(filter.element) !== -1
                                                        else return false
                                                case 'la Date de revision':
                                                {
                                                        // console.log(new Date(row.created_at.substring(0, 10).split('-').join('/')).valueOf())

                                                        const data = window.Global_State.getNodeDataById(row.id)

                                                        const [debut, fin] = filter.element

                                                        if (debut === null && fin === null) return true
                                                        else if (data.review_date && data.review_date.length )
                                                        {

                                                                const revision_string_date = data.review_date.substring(0, 10)
                                                                const formatted_revision_string_date = revision_string_date.split('-').join('/')

                                                                const revision_date = new Date(formatted_revision_string_date)

                                                                // console.log('review_daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate', revision_date.toString() )
                                                                if (debut === null)
                                                                {
                                                                        return ( revision_date.valueOf() <= fin.valueOf() )
                                                                }
                                                                else if (fin === null)
                                                                {
                                                                        return ( revision_date.valueOf() >= debut.valueOf() )
                                                                }
                                                                else
                                                                {
                                                                        // console.log(debut.valueOf(), fin.valueOf(), creation_date.valueOf(), (creation_date.valueOf() >= debut.valueOf() && creation_date.valueOf() <= fin.valueOf()) )
                                                                        return ( revision_date.valueOf() >= debut.valueOf() && revision_date.valueOf() <= fin.valueOf() )
                                                                }
                                                        }
                                                        else return false
                                                }


                                        }
                                }
                        )
                }, [datas, filter]
        )

        // console.log('filtered_datataaaaaaas', filtered_datas, columns)

        return (
        <div className="file_table_container full_size_element" >
                <div className="file_table_container_header" >
                        <Stack direction={"row"} spacing={2} divider={<Divider orientation="vertical" flexItem />}
                               style={{
                                       padding: 3
                               }}
                        >
                                <Stack direction={"row"} >
                                        <Prev node={node} />
                                        <Next />
                                        { useMemo( () => <ClimbTree node={node} />, [node] ) }
                                </Stack>
                                {
                                        useMemo( () => <FilterComponent set={setFilter} filter={filter} node={node} />, [filter, node] )
                                }
                        </Stack>
                        <ActionsMenu/>
                </div>
                <div className="file_table_container_content" >
                        <DataTable
                                className="dataTable_container"
                                columns={columns}
                                data={filtered_datas}
                                selectableRows
                                selectableRowsVisibleOnly
                                selectableRowsHighlight
                                // selectableRowsComponent={Checkbox}
                                // selectableRowsComponentProps={selectableRowsComponentProps}
                                selectableRowSelected={ (row) => { justChecking.current = true; /* console.log('selectableRowSelected'); */ return row.isSelected }}
                                onSelectedRowsChange={ ({selectedCount, selectedRows}) => { if(filtered_datas.length > 0)handleChange(selectedCount, selectedRows) } }
                                clearSelectedRows={window.Global_State.toggleCleared}
                                onRowDoubleClicked = { onRowDoubleClicked }
                                onRowClicked = { handleClick }
                                // onContextMenu={(event) => { console.log(event) }}

                                paginationRowsPerPageOptions = {[15, 25, 50, 100, 200]}
                                paginationPerPage={50}
                                pagination = {true}
                                paginationComponentOptions =
                                {
                                        {
                                                rowsPerPageText: 'element par page:',
                                                rangeSeparatorText: 'de',
                                                noRowsPerPage: false,
                                                selectAllRowsItem: true,
                                                selectAllRowsItemText: 'Tout'
                                        }
                                }
                                theme = "default"
                                conditionalRowStyles={rowsStyles}
                                fixedHeader = {true}
                                fixedHeaderScrollHeight = "100vh"
                                pointerOnHover = {true}
                                highlightOnHover = {true}
                                persistTableHead = {true}
                                noHeader
                                // subHeader
                                // subHeaderComponent = {  }
                                noDataComponent = {<div style={{textAlign: "center", marginTop: 100}} > Vide 😢 </div>}
                                sortIcon = {<FaSort size={10} />}
                                defaultSortFieldId = {1}
                        />
                </div>
        </div>
        )
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