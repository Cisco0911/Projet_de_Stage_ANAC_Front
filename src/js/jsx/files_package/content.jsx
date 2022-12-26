/* eslint-disable import/first */

import React, {forwardRef, useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';

import {Global_State} from '../main';
import {http} from "../data";

import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import toast from "react-hot-toast";
import {useDropzone} from 'react-dropzone';

import Select from "react-select";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import {FaInfoCircle, FaPaste, FaSort} from "react-icons/fa";
import {FcFolder, FcVideoFile} from "react-icons/fc";
import {BsFillFileEarmarkPdfFill} from "react-icons/bs";
import {RiFileWord2Fill} from "react-icons/ri";
import {SiMicrosoftexcel, SiMicrosoftpowerpoint} from "react-icons/si";
import {AiFillFileUnknown} from "react-icons/ai";
import {IoArrowUndoOutline, IoArrowUndoSharp} from "react-icons/io5";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {HiSaveAs} from 'react-icons/hi'

import {useFormik} from 'formik';
import * as yup from 'yup'

import DatePicker from "react-datepicker";
import Stack from "@mui/material/Stack";
import {IconButton, Tooltip} from "@mui/material";


let previousSelected = []




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

// let handleChange


export default function FileTable({set})
{

        let node = useMemo(() => (Global_State.backend.selectedNode.model), [Global_State.backend.selectedNode.model])

        const contain_audit = ( node.type === "root" && /^Audit(( \b\w*\b)|)$/.test(Global_State.getCurrentSection().name) )

        console.log('contentNooooooooooooode', node, Global_State.backend)

        const [filter, setFilter] = useState(
                {
                        tag: "le Nom",
                        element: ''
                }
        )

        // const [previousSelected, setPreviousSelected] = useState([0])

        previousSelected = useMemo( () => { previousSelected.push(node.parentId); return previousSelected }, [node] )

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

                Global_State.EventsManager.on('clearSelected', () => { console.log('clearSelected'); setSelectedRows([]); setNumber(0) })
                Global_State.EventsManager.on('setSelectedNode', async (data) => { console.log(data); await Global_State.setSectionId(data.section_id); Global_State.backend.setCurrentSelectedFolder(data.id) })
                return () =>
                {
                        Global_State.EventsManager.off('clearSelected');
                        Global_State.EventsManager.off('setSelectedNode');
                }
        },
        []
        )

        const Paste_component = useCallback(
                function Paste_component()
                {
                        const action = useRef({})

                        async function paste_here(node)
                        {
                                const concern_nodes = Global_State.copyObject(to_move_or_copy.current)

                                const destination_node = JSON.parse( JSON.stringify(node) )
                                const destination_info = Global_State.identifyNode( destination_node )
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
                                                                       console.log('e.target',e.target)
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
                                                if (child_node.name === (node_to_copy.onCopy || node_to_copy.name) )
                                                {
                                                        if (!action.current.saved)
                                                        {
                                                                // console.log('node_to_copy__________', to_move_or_copy.current)
                                                                if ( !node_to_copy.onCopy && (parseInt(node_to_copy.id) < 0) && (operation_type === 'move') )
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
                                                                                                <Button className={`mr-1`} variant={`outline-primary`} onClick={ e => { e.stopPropagation(); console.log('RENOMEEEEEEEEEEER'); resolve(2) } } >
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

                                                                                Global_State.modalManager.setContent(content)
                                                                                Global_State.modalManager.open_modal(`Conflit de ${child_node.type === 'f' ? 'fichiers' : 'dossiers'}`, false)

                                                                        }
                                                                ).then(
                                                                        res =>
                                                                        {
                                                                                console.log(res, action.current)
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

                                Global_State.modalManager.close_modal()

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

                                                console.log('arriiiiiiiiiiiiiveeee', node_to_move)
                                                if (node_to_move.type === 'ds')
                                                {

                                                        // console.log('arriiiiiiiiiiiiiveeee')

                                                        if (Global_State.isEditorMode)
                                                        {
                                                                Global_State.editor.folder.move(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('move_folder', queryData)
                                                                .then( res => { console.log(res) } )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                                else if (node_to_move.type === 'f')
                                                {

                                                        if (Global_State.isEditorMode)
                                                        {
                                                                Global_State.editor.files.move(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('move_file', queryData)
                                                                .then( res => { console.log(res) } )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                        }
                                }
                                else
                                {

                                        console.log( 'to_move_or_copy.current', concern_nodes )

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
                                                queryData.append('section_id', Global_State.selectedSectionId)

                                                let services
                                                if (node.type === 'root')
                                                {
                                                        const section = Global_State.sections.get( Global_State.selectedSectionId )

                                                        services = section.services.map( service => ({value: service.id}) )
                                                }
                                                else services = node.services.map( service => ({value: service.id}) )

                                                queryData.append('services', JSON.stringify( services ) )


                                                // console.log('arriiiiiiiiiiiiiveeee', node_to_move)
                                                if (node_to_copy.type === 'ds')
                                                {

                                                        // console.log('arriiiiiiiiiiiiiveeee')

                                                        if (Global_State.isEditorMode)
                                                        {
                                                                Global_State.editor.folder.copy(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('copy_folder', queryData)
                                                                .then( res => { console.log(res) } )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                                else if (node_to_copy.type === 'f')
                                                {

                                                        if (Global_State.isEditorMode)
                                                        {
                                                                Global_State.editor.files.copy(queryData)
                                                        }
                                                        else
                                                        {
                                                                await http.post('copy_file', queryData)
                                                                .then( res => { console.log(res) } )
                                                                .catch( err => { console.log(err); throw err} )
                                                        }
                                                }
                                        }
                                }

                                // to_move_or_copy.current = []

                        }

                        return (
                                <IconButton id={`ctrl_v`}
                                        disabled={mc_state === 'none'}
                                        style = {{ marginRight: 20, }}
                                        onClick={
                                                e =>
                                                {
                                                        console.log(to_move_or_copy.current, node.id)

                                                        if (Global_State.isEditorMode) paste_here(node)
                                                        else
                                                        {
                                                                toast.promise(
                                                                        paste_here(node),
                                                                        {
                                                                                loading: 'Pasting...',
                                                                                success: 'Processus achevé',
                                                                                error: 'err',
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
                                        <FaPaste size={25} color={`${mc_state === 'none'? '' : 'blue'}`} />
                                </IconButton>
                        )

                }, [node, mc_state]
        )

        function add(thing_to_add)
        {
                // filtre de service
                const canAddToService = (authService) =>
                {
                        const services = node.isRoot ? Global_State.getCurrentSection().services : node.services

                        for(let elementService of services) {
                                // console.log(authService.id, elementService.id)
                                if(authService.id === parseInt(elementService.id)) return true
                        }
                        return false
                }
                let servicesList = Global_State.authUser.services.filter( (service) => { return canAddToService(service) } ).map((service) => { return service } )
                // formatage en options
                const options_services = servicesList.map( (service) => { return {value: service.id, label: service.name } } )

                // composant de selection de service
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

                const AsyncSelectComponent = ({areFixed, updateMethod, defaultOptions, placeholder}) =>
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

                        const filterUsers = (inputValue, list) => {
                                return list.filter((i) =>
                                i.label.toLowerCase().includes(inputValue.toLowerCase())
                                );
                        };

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
                                        submittedInfo.type_audit + "-" + service + "-" + submittedInfo.annee + "-" + submittedInfo.num_chrono
                                        )
                                        queryBody.append("services", JSON.stringify(submittedInfo.services))
                                        queryBody.append("inspectors", JSON.stringify(inspector_ids))
                                        queryBody.append("ra_id", Global_State.authUser.id)
                                        queryBody.append("section_id", Global_State.selectedSectionId)


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("name", queryBody.get("name"))



                                        if(!Global_State.isEditorMode)
                                        {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner)

                                                http.post('add_audit', queryBody)

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        console.log(res)

                                                        if (res.data.statue === 'success')
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Audit ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                Global_State.modalManager.close_modal()
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
                                                                                Global_State.modalManager.close_modal()
                                                                                break
                                                                        }
                                                                        case 1:
                                                                        {
                                                                                swal({
                                                                                        title: "ERROR!",
                                                                                        text: res.data.data.msg,
                                                                                        icon: "error",
                                                                                });
                                                                                Global_State.modalManager.setContent(<Audit_form/>)
                                                                                break
                                                                        }
                                                                        default:
                                                                        {
                                                                                swal({
                                                                                        title: "ERROR!",
                                                                                        text: res.data.data.msg,
                                                                                        icon: "error",
                                                                                });
                                                                                Global_State.modalManager.setContent(<Audit_form/>)
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
                                                        Global_State.modalManager.setContent(<Audit_form/>)
                                                })
                                        }
                                        else
                                        {
                                                console.log('editorHandle audit')

                                                Global_State.editor.audit.add(queryBody)

                                                Global_State.modalManager.close_modal()
                                        }


                                        // console.log(queryBody.get("name"))
                                };

                                const validationRules = yup.object().shape({
                                        num_chrono: yup.number().required().positive().integer(),
                                        annee: yup.number().required().positive().integer().max(100),
                                        inspectors: yup.array().min(1).required('Au moins 1'),
                                        services: yup.array().min(1).required('Au moins 1'),

                                });

                                const ra = { value: parseInt(Global_State.authUser.id), label: `${Global_State.authUser.name} ${Global_State.authUser.second_name}` }

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
                                                <AsyncSelectComponent
                                                        updateMethod=
                                                        {
                                                                (r) =>
                                                                {
                                                                        console.log('new_val', r)
                                                                        // const e = Global_State.copyObject(r)
                                                                        // if (!r.length) r.unshift( { value: parseInt(Global_State.authUser.id), label: `${Global_State.authUser.name} ${Global_State.authUser.second_name}` } );
                                                                        formik.setFieldValue("inspectors", r)
                                                                }
                                                        }
                                                        areFixed={ [ra] }
                                                        placeholder={"Sélectionner au moins 1 inspecteur"}
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

                        Global_State.modalManager.setContent(<Audit_form/>)
                        Global_State.modalManager.open_modal("Nouvel Audit")
                }
                else if (thing_to_add === "add_folder") {

                        const Folder_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        // console.log(submittedInfo)

                                        let queryBody = new FormData()


                                        const [parent_id, parent_type] = Global_State.identifyNode(node)

                                        queryBody.append("services", JSON.stringify(submittedInfo.services))

                                        queryBody.append("name", submittedInfo.name)
                                        queryBody.append("parent_id", parent_id)
                                        queryBody.append("parent_type", parent_type)
                                        queryBody.append("section_id", Global_State.selectedSectionId)


                                        console.log("services", queryBody.get("services"))
                                        console.log("name", queryBody.get("name"))
                                        console.log("parent_id", parent_id)
                                        console.log("parent_type", parent_type)


                                        if(!Global_State.isEditorMode)
                                        {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner)

                                                http.post('add_folder', queryBody)

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        console.log('res', res)
                                                        if (res.data.statue === 'success')
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "Dossier ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                Global_State.modalManager.close_modal()
                                                        }
                                                        else
                                                        {
                                                                switch (res.data.data.code)
                                                                {
                                                                        case 0:
                                                                        {
                                                                                swal({
                                                                                        title: "FIN!",
                                                                                        text: "Ce Dossier existe deja !",
                                                                                        icon: "info",
                                                                                });
                                                                                Global_State.modalManager.close_modal()
                                                                                break
                                                                        }
                                                                        case 1:
                                                                        {
                                                                                swal({
                                                                                        title: "ERROR!",
                                                                                        text: res.data.data.msg,
                                                                                        icon: "error",
                                                                                });
                                                                                Global_State.modalManager.setContent(<Folder_form/>)
                                                                                break
                                                                        }
                                                                        default:
                                                                        {
                                                                                swal({
                                                                                        title: "ERROR!",
                                                                                        text: res.data.data.msg,
                                                                                        icon: "error",
                                                                                });
                                                                                Global_State.modalManager.setContent(<Folder_form/>)
                                                                                break
                                                                        }
                                                                }
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
                                                        Global_State.modalManager.setContent(<Folder_form/>)
                                                })
                                        }
                                        else
                                        {
                                                console.log('editorHandle folder')
                                                queryBody.set('front_parent_type', node.type)
                                                Global_State.editor.folder.add(queryBody)

                                                Global_State.modalManager.close_modal()
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

                        Global_State.modalManager.setContent(<Folder_form/>)
                        Global_State.modalManager.open_modal("Nouveau Dossier")
                }
                else if (thing_to_add === "add_fncs") {

                        const FNCs_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        console.log(submittedInfo)

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

                                        if(!Global_State.isEditorMode)
                                        {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner)


                                                http.post('add_fncs', queryBody)

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        // console.log(res)
                                                        if(res.status === 201)
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "FNC ajouté avec success !",
                                                                        icon: "success",
                                                                });
                                                                Global_State.modalManager.close_modal()
                                                        }
                                                        else if(res.status === 200 && res.data === "existAlready")
                                                        {
                                                                swal({
                                                                        title: "FIN!",
                                                                        text: "FNC existant !",
                                                                        icon: "info",
                                                                });
                                                                Global_State.modalManager.close_modal()
                                                        }
                                                        else if(res.status === 200 && res.data === "Something went wrong !")
                                                        {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data,
                                                                        icon: "error",
                                                                });
                                                                Global_State.modalManager.setContent(<FNCs_form/>)
                                                        }
                                                        else if(res.status === 200 && res.data.msg === "storingError")
                                                        {
                                                                swal({
                                                                        title: "ERROR!",
                                                                        text: res.data.value,
                                                                        icon: "error",
                                                                });
                                                                Global_State.modalManager.close_modal()
                                                        }
                                                        else if(res.status === 200 && res.data.msg === 'catchException')
                                                        {
                                                                swal({
                                                                        title: "ERREUR!",
                                                                        text: res.data.value.errorInfo[2],
                                                                        icon: "error",
                                                                });
                                                                // console.log(res)
                                                                Global_State.modalManager.setContent(<FNCs_form/>)
                                                        }
                                                        else console.log(res)
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
                                                        Global_State.modalManager.setContent(<FNCs_form/>)
                                                })
                                        }
                                        else
                                        {
                                                console.log('editorHandle fnc')

                                                queryBody.set('front_parent_type', node.type)
                                                Global_State.editor.fnc.add(queryBody)

                                                Global_State.modalManager.close_modal()
                                        }

                                        // console.log(queryBody.get("name"))
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

                        Global_State.modalManager.setContent(<FNCs_form/>)
                        Global_State.modalManager.open_modal("Generation de Non-Conformite")
                }
                else if (thing_to_add === "add_files") {

                        const Fs_form = () =>
                        {
                                // const [selectedService, setSelectedServices] = useState(null);

                                const msg_err = "Valeur de champ invalide"


                                const handleSubmit = (submittedInfo) => {
                                        console.log(submittedInfo)

                                        Global_State.modalManager.setContent(Global_State.spinnerManager.spinner)

                                        let queryBody = new FormData()


                                        const [parent_id, parent_type] = Global_State.identifyNode(node)


                                        queryBody.append("parent_type", parent_type)
                                        queryBody.append("parent_id", parent_id)
                                        submittedInfo.files.map(fileObject => { queryBody.append("fichiers[]", fileObject.file, fileObject.customName ) })
                                        queryBody.append("services", JSON.stringify(submittedInfo.services))
                                        queryBody.append("section_id", Global_State.selectedSectionId)


                                        // console.log("services", queryBody.get("services"))
                                        // console.log("nc_id", queryBody.get("nonC_id"))
                                        // console.log("debut", queryBody.get("debut"))
                                        console.log("fin", queryBody.get("fichiers[]"))

                                        if(!Global_State.isEditorMode)
                                        {

                                                Global_State.modalManager.setContent(Global_State.spinnerManager.spinner)


                                                http.post('add_files', queryBody, {
                                                        headers:{
                                                                'Content-Type': 'multipart/form-data'
                                                        }
                                                })

                                                // Handle the response from backend here
                                                .then((res) =>
                                                {
                                                        console.log(res)

                                                        if (res.data.statue === 'success')
                                                        {
                                                                if (res.data.data.msg === 'ok')
                                                                {
                                                                        swal({
                                                                                title: "FIN!",
                                                                                text: "Fichier(s) ajouté avec success !",
                                                                                icon: "success",
                                                                        });
                                                                        Global_State.modalManager.close_modal()
                                                                }
                                                                else if (res.data.data.list)
                                                                {
                                                                        swal({
                                                                                title: "FIN!",
                                                                                text: "Certains fichiers son existant ou possède le mm chemin, des copies ont été créées !\n" + JSON.stringify(res.data.data.list),
                                                                                icon: "info",
                                                                        });
                                                                        Global_State.modalManager.close_modal()
                                                                }
                                                        }
                                                        else
                                                        {
                                                                if (res.data.data.list)
                                                                {
                                                                        swal({
                                                                                title: "FIN!",
                                                                                text: `${res.data.data.msg}\n` + JSON.stringify(res.data.data.list),
                                                                                icon: "error",
                                                                        });
                                                                        Global_State.modalManager.close_modal()
                                                                }
                                                                else
                                                                {
                                                                        swal({
                                                                                title: "ERREUR!",
                                                                                text: res.data.data.msg,
                                                                                icon: "error",
                                                                        });
                                                                        Global_State.modalManager.setContent(<Fs_form/>)
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
                                                        Global_State.modalManager.setContent(<Fs_form/>)
                                                })
                                        }
                                        else
                                        {
                                                console.log('editorHandle for files')
                                                // queryBody.forEach((value, key) => console.log(key, value));
                                                queryBody.set('front_parent_type', node.type)
                                                Global_State.editor.files.add(queryBody)

                                                Global_State.modalManager.close_modal()
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

                        Global_State.modalManager.setContent(<Fs_form/>)
                        Global_State.modalManager.open_modal("Ajouter des Fichiers")
                }
        }


        const ActionsMenu = () =>
        {
                // let label1 =  ?  : node.type === "audit" ? "Nouvelle Non-Conformité" : "Nouveau Fichier de preuve"
                let buttons = []

                // console.log("kkkkkkkkkkkkk", Global_State.getCurrentSection().name)


                const [ id, type ] = Global_State.identifyNode(node)

                if (node.global_type === "folder") buttons.push( [ <option key={"add_folder"} className="dropdown-item" onClick={() => {add("add_folder")}} >Nouveau Dossier</option>, <option key={"add_files"} className="dropdown-item" onClick={() => {add("add_files")}} >Ajouter des fichiers</option> ] )
                if ( contain_audit ) buttons.push(<option key={"add_audit"} className="dropdown-item" onClick={() => {add("add_audit")}} >Nouvel Audit</option>)
                if (node.type === "nonC") buttons.push(<option key={"add_fncs"} className="dropdown-item" disabled = { false }  onClick={() => {add("add_fncs")}} >Générer des Non-Conformités</option>)

                return(
                <div className="d-md-flex justify-content-between">
                        <ul className="list-inline mb-3">
                                <li className="list-inline-item mb-0">
                                        <a className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown">
                                                Ajouter
                                        </a>
                                        <div className="dropdown-menu">
                                                {buttons}
                                        </div>
                                </li>
                                {
                                        selectedRowNumber === 0 ? null :
                                        <li className="list-inline-item mb-0">
                                                <a className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown">
                                                        Plus
                                                </a>
                                                <div className="dropdown-menu">
                                                        {
                                                                selectedRowNumber === 1 ?
                                                                <i onClick = {() => { Global_State.EventsManager.emit('viewDetailEnabled', selectedRow[0]); }} className="dropdown-item" data-sidebar-target="#view-detail">Voir les Details</i> : null
                                                        }
                                                        <option className="dropdown-item">Partager</option>
                                                        <option className="dropdown-item">Télécharger</option>
                                                        <option id={`ctrl_c`} className="dropdown-item"
                                                                onClick={
                                                                        e =>
                                                                        {
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
                                                                                                        const node_data = Global_State.getNodeDataById(row.id)

                                                                                                        return(
                                                                                                                {...node_data, id: Global_State.identifyNode(node_data)[0]}
                                                                                                        )
                                                                                                }
                                                                                        )

                                                                                        from_id.current = node.id

                                                                                        setMc_state('copy')
                                                                                }
                                                                                }
                                                                }
                                                        >Copier vers</option>
                                                        <option id={`ctrl_x`} className="dropdown-item"
                                                                onClick={
                                                                        e =>
                                                                        {
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
                                                                                                        const node_data = Global_State.getNodeDataById(row.id)

                                                                                                        return(
                                                                                                        {...node_data, id: Global_State.identifyNode(node_data)[0]}
                                                                                                        )
                                                                                                }
                                                                                        )

                                                                                        from_id.current = node.id

                                                                                        setMc_state('move')
                                                                                }
                                                                        }
                                                                }
                                                        >Déplacer vers</option>
                                                        {
                                                                selectedRowNumber === 1 ?
                                                                <option className="dropdown-item">Renommer</option> : null
                                                        }
                                                        <option id={'ctrl_d'} className="dropdown-item" onClick = { e =>
                                                        {
                                                                // http.delete("")

                                                                const remove = async () =>
                                                                {
                                                                        await Promise.all(
                                                                                selectedRow.map(
                                                                                        async row =>
                                                                                        {
                                                                                                // console.log(Global_State.identifyNode(row))
                                                                                                const nodeIdentity = Global_State.identifyNode(row)
                                                                                                // const [ id, type ] = Global_State.identifyNode(row)

                                                                                                console.log(selectedRow)
                                                                                                switch (row.type) {
                                                                                                        case 'audit':

                                                                                                                await http.delete('del_audit?id=' + nodeIdentity[0])
                                                                                                                .then( res => {
                                                                                                                        console.log(res);
                                                                                                                        if(res.data === 'attente') toast(`En attente de confirmation: ${row.value}`,
                                                                                                                        {
                                                                                                                                icon: <FaInfoCircle color='#2196F3' size={28} />
                                                                                                                        })

                                                                                                                } )
                                                                                                                .catch(err =>
                                                                                                                {
                                                                                                                        console.log(err);
                                                                                                                        if(err.response.data === 'en attente') toast.error(`Cet Audit est deja dans une file d'attente de suppression: ${row.value}`)
                                                                                                                        else toast.error("error on this one, Audit: " + row.value)
                                                                                                                })

                                                                                                                break;
                                                                                                        case 'checkList':
                                                                                                                break;
                                                                                                        case 'dp':
                                                                                                                break;
                                                                                                        case 'nonC':
                                                                                                                break;
                                                                                                        case 'fnc':

                                                                                                                await http.delete('del_fnc?id=' + nodeIdentity[0])
                                                                                                                .then( res => {
                                                                                                                        console.log(res);
                                                                                                                        if(res.data === 'attente') toast(`En attente de confirmation: ${row.value}`,
                                                                                                                        {
                                                                                                                                icon: <FaInfoCircle color='#2196F3' size={28} />
                                                                                                                        })

                                                                                                                } )
                                                                                                                .catch(err =>
                                                                                                                {
                                                                                                                        console.log(err);
                                                                                                                        if(err.response.data === 'en attente') toast.error(`Cette FNC est deja dans une file d'attente de suppression: ${row.value}`)
                                                                                                                        else toast.error("error on this one, FNC: " + row.value)
                                                                                                                })

                                                                                                                break;
                                                                                                        case 'ds':

                                                                                                                await http.delete('del_folder?id=' + nodeIdentity[0])
                                                                                                                .then( res => {
                                                                                                                        console.log(res);
                                                                                                                        if(res.data === 'attente') toast(`En attente de confirmation: ${row.value}`,
                                                                                                                        {
                                                                                                                                icon: <FaInfoCircle color='#2196F3' size={28} />
                                                                                                                        })

                                                                                                                } )
                                                                                                                .catch(err =>
                                                                                                                {
                                                                                                                        console.log(err);
                                                                                                                        if(err.response.data === 'en attente') toast.error(`Cet Dossier est deja dans une file d'attente de suppression: ${row.value}`)
                                                                                                                        else toast.error("error on this one, Dossier: " + row.value)
                                                                                                                })

                                                                                                                break;
                                                                                                        case 'f':
                                                                                                                // console.log(nodeIdentity[0])

                                                                                                                await http.delete('del_file?id=' + nodeIdentity[0])
                                                                                                                .then( res => {
                                                                                                                        console.log(res);
                                                                                                                        if(res.data === 'attente') toast(`En attente de confirmation: ${row.value}`,
                                                                                                                        {
                                                                                                                                icon: <FaInfoCircle color='#2196F3' size={28} />,
                                                                                                                        })

                                                                                                                } )
                                                                                                                .catch(err =>
                                                                                                                {
                                                                                                                        console.log(err);
                                                                                                                        if(err.response.data === 'en attente') toast.error(`Cet Dossier est deja dans une file d'attente de suppression: ${row.value}`)
                                                                                                                        else toast.error("error on this one, Ficher: " + row.value)
                                                                                                                })

                                                                                                                break;

                                                                                                        default:
                                                                                                                break;
                                                                                                }

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
                                                                                // console.log(Global_State.identifyNode(row))
                                                                                const nodeIdentity = Global_State.identifyNode(row)
                                                                                // const [ id, type ] = Global_State.identifyNode(row)

                                                                                console.log(selectedRow)
                                                                                switch (row.type) {
                                                                                        case 'audit':

                                                                                                console.log('audit dispatch del')
                                                                                                Global_State.editor.audit.delete(nodeIdentity[0])

                                                                                                break;
                                                                                        case 'checkList':
                                                                                                break;
                                                                                        case 'dp':
                                                                                                break;
                                                                                        case 'nonC':
                                                                                                break;
                                                                                        case 'fnc':

                                                                                                console.log('fnc dispatch del')
                                                                                                Global_State.editor.fnc.delete(nodeIdentity[0])

                                                                                                break;
                                                                                        case 'ds':

                                                                                                console.log('folder del')
                                                                                                Global_State.editor.folder.delete(nodeIdentity[0])

                                                                                                break;
                                                                                        case 'f':

                                                                                                console.log('file dispatch del')
                                                                                                Global_State.editor.files.delete(nodeIdentity[0])

                                                                                                break;

                                                                                        default:
                                                                                                break;
                                                                                }

                                                                        }
                                                                        )

                                                                }

                                                                // console.log(selectedRow[0].id.substring(2))
                                                                if( !Global_State.isEditorMode )
                                                                {
                                                                        toast.promise(
                                                                                remove(),
                                                                                {
                                                                                        loading: 'Suppressing...',
                                                                                        success: 'Processus achevé',
                                                                                        error: 'err'
                                                                                },
                                                                                {
                                                                                        id: 'Suppressing',
                                                                                        duration: Infinity
                                                                                }
                                                                        ).then( res => { setTimeout( () => { toast.dismiss('Suppressing') }, 800 ) } )
                                                                }
                                                                else localRemove()

                                                        } } >Supprimer</option>
                                                </div>
                                        </li>
                                }
                                <li className="list-inline-item mb-0">
                                        <a className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown">
                                                Tags
                                        </a>
                                        <div className="dropdown-menu">
                                                <option className="dropdown-item" onClick={e => { e.stopPropagation(); setFilter({tag: 'le Nom', element: ''}) }} >Nom</option>
                                                <option className="dropdown-item" onClick={e => { e.stopPropagation(); setFilter({tag: 'la Date de creation', element: [null, null]}) }} >Date de Creation</option>
                                                <option className="dropdown-item" onClick={e => { e.stopPropagation(); setFilter({tag: 'la Date de revision', element: [null, null]}) }} disabled={node.type !== 'nonC'} >Date de Revision</option>
                                                <option className="dropdown-item" onClick={e => { e.stopPropagation(); setFilter({tag: 'le RA', element: ''}) }} disabled={!contain_audit} >RA</option>
                                        </div>
                                </li>
                        </ul>
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
                                return (
                                <FcFolder size={iconSize}  />
                                )
                        }
                        else
                        {
                                // <BsCardImage size={iconSize} />
                                switch(getTypeExt(data.ext)) {
                                        case "img":
                                                return <img onClick={e =>
                                                {
                                                        Global_State.modalManager.setContent(
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
                                                        Global_State.modalManager.open_modal("Apercu de l' image")
                                                }}  style={{  width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }} src = {data.url}   alt={''}/>
                                        case "vid":
                                                return <FcVideoFile onClick={e =>
                                                {
                                                        Global_State.modalManager.setContent(
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
                                                        Global_State.modalManager.open_modal("Apercu de l' image")
                                                }}  size = {iconSize}   />
                                        case "docx":
                                                return <RiFileWord2Fill color='#295394' size={iconSize} onClick = { e =>
                                                {
                                                        Global_State.modalManager.setContent(
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
                                                        Global_State.modalManager.open_modal("Apercu du fichier")
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
                                                                                console.log(data)
                                                                                Global_State.modalManager.setContent(
                                                                                <div style= {
                                                                                        {
                                                                                                display: 'flex',
                                                                                                justifyContent: 'center',
                                                                                                position: 'relative',
                                                                                                alignItems: 'center',
                                                                                        }
                                                                                } >
                                                                                        {Global_State.getNodeDataById(data.id).onEdit ? 'Pas encore telechargé' : <embed src = {data.url + "#toolbar=0&navpanes=0&scrollbar=0"} width={900} height= {400} type="application/pdf"  ></embed>}
                                                                                </div>)
                                                                                Global_State.modalManager.open_modal("Apercu du fichier")
                                                                        }
                                                                }
                                                        />
                                        case "xlsx":
                                                return <SiMicrosoftexcel color='#1f6e43' size={iconSize} />
                                        case "pptx":
                                                return <SiMicrosoftpowerpoint color='#ad0b00' size={iconSize} onClick = { e =>
                                                {
                                                        Global_State.modalManager.setContent(
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
                                                        Global_State.modalManager.open_modal("Apercu du fichier")
                                                }
                                                } />
                                        default:
                                                return <AiFillFileUnknown size={iconSize} />
                                }
                        }
                }

                const NameFormater = (props) => {
                        const div = useRef()

                        const nameComponent = (
                        <div id = {props.data.id} ref = {div} className='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%', zIndex: -1000, pointerEvents: "none" }} {...props} >
                                <TypeIcon iconSize={30} {...props} />
                                <span
                                style={
                                        {
                                                MozUserSelect: 'none',
                                                msUserSelect: 'none',
                                                WebkitUserSelect: 'none',
                                                userSelect: 'none',
                                                marginLeft: 10,
                                                fontSize: 15,
                                                fontWeight: 'bold'
                                        }}  >{props.data.name}</span>
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
                                console.log(level)
                                const node_data = Global_State.getNodeDataById(data.id)
                                const [id, lol] = Global_State.identifyNode(node_data)
                                // Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})

                                const query = new FormData;
                                query.append('id', id)
                                query.append('update_object', 'level')
                                query.append('new_value', nextNiv(level))
                                query.append('additional_info', JSON.stringify( {} ))

                                if(!Global_State.isEditorMode)
                                {
                                        const update = async () =>
                                        {

                                                await http.post('update_fnc', query)
                                                .then( res => {
                                                        console.log(res)
                                                } )
                                                .catch(err => { console.log(err); throw err })
                                        }

                                        // console.log(selectedRow[0].id.substring(2))
                                        toast.promise(
                                        update(),
                                        {
                                                loading: 'Loading...',
                                                success: 'Processus achevé',
                                                error: 'err'
                                        }

                                        )
                                }
                                else
                                {
                                        Global_State.editor.fnc.update(query)
                                }


                        }

                        return( <div className={class_name} onClick = {handleClick} >{level}</div> )
                }

                const ReviewDateComponent = ({data}) =>
                {
                        const value = data.review_date ? data.review_date : '____/__/__'

                        const handleClick = e =>
                        {
                                e.stopPropagation()
                                console.log("review date handle click")

                                const Date_input = ({data }) =>
                                {

                                        const CustomInput = forwardRef(
                                                ({ value, onClick }, ref) =>
                                                (
                                                        <Stack direction={'row'} sx={{ width: 'fit-content', backgroundColor: 'whitesmoke' }}>
                                                                <input ref={ref}
                                                                       className="form-control form-control-sm"
                                                                       style={{ height: 35, textAlign: 'center', border: 'none', borderRadius: 0 }}
                                                                       value={`${value}`}
                                                                       onChange={e => {e.preventDefault(); e.stopPropagation()}}
                                                                       onClick={onClick}
                                                                       readOnly
                                                                />

                                                                <div  style={{ width: 'fit-content', height: 'fit-content', padding: 5, backgroundColor: '#E9ECEFFF' }} onClick={ handleSubmit } >
                                                                        <HiSaveAs size={25} color={'blue'} />
                                                                </div>
                                                        </Stack>
                                                )
                                        );

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

                                        const [startDate, setStartDate] = useState(data.review_date !== null ? new Date(data.review_date) : new Date());

                                        const new_review_date = `${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`
                                        console.log('new_review_date', new_review_date, e)

                                        // let today = new Date()
                                        // today.setHours(0, 0, 0, 0)

                                        console.log('millesec dif', new Date(new_review_date).valueOf() - new Date().valueOf())

                                        const handleSubmit = e =>
                                        {
                                                e.stopPropagation()

                                                Global_State.setOverlay_props(t => (
                                                                {
                                                                        ...t,
                                                                        style:
                                                                        {
                                                                                ...t.style,
                                                                                display: 'none',
                                                                        },
                                                                }
                                                        )
                                                )

                                                console.log(new_review_date)
                                                const [id, model_type] = Global_State.identifyNode(data)

                                                const query = new FormData;
                                                query.append('id', id)
                                                query.append('update_object', 'review_date')
                                                query.append('new_value', new_review_date)
                                                query.append('additional_info', JSON.stringify(
                                                        {
                                                                remain_ms: `${new Date(new_review_date).valueOf() - new Date().valueOf()}`
                                                        }
                                                ))

                                                if(!Global_State.isEditorMode)
                                                {
                                                        const update = async () =>
                                                        {

                                                                await http.post('update_fnc', query)
                                                                .then( res => {
                                                                        console.log(res)
                                                                } )
                                                                .catch(err => { console.log(err); throw err })
                                                        }

                                                        // console.log(selectedRow[0].id.substring(2))
                                                        toast.promise(
                                                        update(),
                                                        {
                                                                loading: 'Loading...',
                                                                success: 'Processus achevé',
                                                                error: 'err'
                                                        }

                                                        )
                                                }
                                                else
                                                {
                                                        Global_State.editor.fnc.update(query)
                                                }
                                        }

                                        return (
                                                <div className={`d-flex justify-content-center align-items-center`}
                                                     style={{
                                                             backgroundColor: 'rgba(255,255,255,0)',
                                                             borderRadius: 10,
                                                             border: '1px solid blue',
                                                             overflow: "hidden"
                                                        }}
                                                >
                                                        <div className={`d-flex`} style={{ width: "fit-content" }} >
                                                                <DatePicker
                                                                        selected={startDate}
                                                                        popperClassName = 'reactDatePickerPopper'
                                                                        dateFormat="yyyy/MM/dd h:mm aa"
                                                                        onChange={(date) => setStartDate(date)}
                                                                        showYearDropdown
                                                                        scrollableYearDropdown
                                                                        showTimeInput
                                                                        customTimeInput={<CustomTimeInput />}
                                                                        yearDropdownItemNumber={20}
                                                                        minDate={new Date()}
                                                                        customInput ={ <CustomInput /> }
                                                                />
                                                        </div>
                                                </div>
                                        )
                                }


                                Global_State.setOverlay_props( t => (
                                {
                                        ...t,
                                        style:
                                        {
                                                ...t.style,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                        },
                                        children: (
                                        <div
                                                style=
                                                {{
                                                        width: "max-content",
                                                        marginTop: 15,
                                                        backgroundColor: 'rgba(255,255,255,0)' ,
                                                        translate: `${Math.abs( e.clientX - window.innerWidth/2 )}px ${Math.abs( e.clientY - window.innerHeight/2 )}px`
                                                }}
                                                onClick={ e => { e.stopPropagation() } }
                                        >
                                                <Date_input data={data} />
                                        </div>
                                        ),

                                }
                                ) )
                        }

                        return(
                                <span className={`${data.review_date ? 'text-primary' : ''}`} onClick={handleClick} >
                                        {value}
                                </span>
                        )
                }

                for(let child_node of node.children )
                {
                        // console.log('child_node.id', child_node)
                        const data = child_node // Global_State.getNodeDataById(child_node.id)
                        // if (data === null) continue
                        datas.push(
                                {
                                        id: data.id,
                                        value: data.name,
                                        level_value: data.level,
                                        name: <NameFormater data = {data} />,
                                        level: data.type === "fnc" ? <LevelComponent data={data} /> : undefined,
                                        created_at: data.created_at,
                                        isClosed: data.type === "fnc" ? data.isClosed ? <div className="badge bg-success-bright text-success">Clôturé</div> : <div className="badge bg-danger-bright text-danger">Non-Clôturé</div> : undefined ,
                                        RA:  node.type === "root" && data.type === 'audit' ? data.ra.name.substring(0, 1) + ". " +  data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " +  node.ra.second_name : undefined,
                                        size: data.global_type === 'file' ? Global_State.sizeFormater(data.taille) : undefined,
                                        type: data.type,
                                        global_type: data.global_type,
                                        section_id: data.section_id,
                                        isBeingEdited: data.onEdit,
                                        review_date: data.review_date === undefined ? '' : <ReviewDateComponent data={data} />,

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


        const columns = useMemo(() =>
        {
                let columns_of_the_type

                if (node.type === "root" && contain_audit) {
                        columns_of_the_type =
                        [
                                {
                                        name: 'NOM',
                                        selector: row => row.name,
                                        sortable: true,
                                        sortFunction: sortByName,
                                },
                                {
                                        name: 'CREE LE',
                                        selector: row => row.created_at,
                                        sortable: true,
                                        width: "30%"
                                },
                                {
                                        name: 'RA',
                                        selector: row => row.RA,
                                        sortable: true,
                                        width: "20%"
                                },

                        ]
                }
                else if (node.type === "audit") {
                        columns_of_the_type =
                        [
                                {
                                        name: 'NOM',
                                        selector: row => row.name,
                                        sortable: true,
                                        sortFunction: sortByName,
                                },
                                {
                                        name: 'RA',
                                        selector: row => row.RA,
                                        sortable: true,
                                },

                        ]
                }
                else if(node.type === "nonC") {
                        columns_of_the_type =
                        [
                                {
                                        name: 'NOM',
                                        selector: row => row.name,
                                        sortable: true,
                                        sortFunction: sortByName,
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
                                        width: "22%"
                                },
                                {
                                        name: 'STATUE',
                                        selector: row => row.isClosed,
                                        width: "16%"
                                },

                        ]
                }
                else columns_of_the_type =
                        [
                                {
                                        name: 'NOM',
                                        selector: row => row.name,
                                        sortable: true,
                                        sortFunction: sortByName,
                                },
                                {
                                        name: 'CREE LE',
                                        selector: row => row.created_at,
                                        sortable: true,
                                },
                                {
                                        name: 'TAILLE',
                                        selector: row => row.size,
                                        sortable: true,
                                },

                        ]

                return columns_of_the_type
        },
        [node]
        )

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


        const formattedDatas = useMemo(() => dataFormater(node), [node, selectedRow])

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
                Global_State.EventsManager.emit('clearSelected')
        },[node]
        )

        useEffect(
        () =>
        {
                dispatch({type: 'nodeUpdate', newDatas: initDatas})
        }, [formattedDatas]
        )




        // const [visibleData, setVisibleData] = useState(datas)


        // useEffect(
        //     () => {setVisibleData(datas)}, [datas]
        // )



        console.log('contentRender')

        const handleChange = ( selectedCount, selectedRows, update = false ) =>
        {
                // console.log(justChecking.current)
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

        const onRowDoubleClicked = (row, event) =>
        {
                Global_State.backend.setCurrentSelectedFolder(row.id)
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


        const SubHeaderComponent = useCallback(
                function SubHeaderComponent({set, filter, node})
                {

                        const FilterComponent = useCallback(
                                function FilterComponent({set, filter})
                                {
                                        switch (filter.tag)
                                        {
                                                case 'la Date de creation':
                                                {
                                                        const [startDate, endDate] = filter.element;
                                                        return (
                                                                <div style={{ maxWidth: 243 }} >
                                                                        <label>Chercher selon {filter.tag} :</label>
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
                                                                                showYearDropdown
                                                                                scrollableYearDropdown
                                                                                yearDropdownItemNumber={1000}
                                                                                minDate={new Date("2021/12/31")}
                                                                                customInput ={ <input className="form-control form-control-sm mr-15" value={`${startDate} - ${endDate}`}/> }

                                                                        />
                                                                </div>

                                                        );
                                                }
                                                case 'la Date de revision':
                                                {
                                                        const [startDate, endDate] = filter.element;
                                                        return (
                                                        <div style={{ maxWidth: 243 }} >
                                                                <label>Chercher selon {filter.tag} :</label>
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
                                                                showYearDropdown
                                                                scrollableYearDropdown
                                                                yearDropdownItemNumber={1000}
                                                                minDate={new Date("2021/12/31")}
                                                                customInput ={ <input className="form-control form-control-sm mr-15" value={`${startDate} - ${endDate}`}/> }

                                                                />
                                                        </div>

                                                        );
                                                }

                                                default:
                                                        return (
                                                                <div>
                                                                        <label>Chercher selon {filter.tag} :</label>
                                                                        <input onChange={(e) => {set( t => ({...t, element: e.target.value}) )}} value={filter.element} type="search" className="form-control form-control-sm" placeholder="" aria-controls="table-files"/>
                                                                </div>
                                                        )
                                        }
                                }, []
                        )

                        return (
                        <div className={'d-flex flex-row align-items-end'} >
                                <Paste_component />
                                <IconButton  style = {{ marginRight: 20, }}
                                             disabled={node.isRoot}
                                             onClick={ (e) => { e.preventDefault(); Global_State.backend.setCurrentSelectedFolder(previousSelected.pop()) } }
                                >
                                        {
                                                node.isRoot ?
                                                <IoArrowUndoOutline size={25} /> :
                                                <IoArrowUndoSharp size={25} color={"black"} />
                                        }
                                </IconButton>
                                <FilterComponent set={set} filter={filter} node={node} />
                        </div>
                        )
                }, [node, mc_state]
        )


        const filtered_datas = useMemo( () =>
                {
                        return datas.filter(
                                row =>
                                {
                                        switch (filter.tag)
                                        {
                                                case 'le Nom':
                                                        return row.value.indexOf(filter.element) !== -1
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

                                                        const data = Global_State.getNodeDataById(row.id)

                                                        const [debut, fin] = filter.element

                                                        if (debut === null && fin === null) return true
                                                        else if (data.review_date !== undefined )
                                                        {

                                                                const revision_string_date = data.review_date.substring(0, 10)
                                                                const formatted_revision_string_date = revision_string_date.split('-').join('/')

                                                                const revision_date = new Date(formatted_revision_string_date)

                                                                console.log('review_daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate', revision_date.toString() )
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

        console.log('dataaaaaaas', datas)


        return (
        <div className="col-xl-8">
                <div className="content-title mt-0">
                        <h4>{node.name}</h4>
                </div>
                <ActionsMenu />
                <DataTable
                columns={columns}
                data={filtered_datas}

                selectableRows
                selectableRowsVisibleOnly
                selectableRowsHighlight
                // selectableRowsComponent={Checkbox}
                // selectableRowsComponentProps={selectableRowsComponentProps}
                selectableRowSelected={ (row) => { justChecking.current = true; /* console.log('selectableRowSelected'); */ return row.isSelected }}
                onSelectedRowsChange={ ({selectedCount, selectedRows}) => { if(filtered_datas.length > 0)handleChange(selectedCount, selectedRows) } }
                clearSelectedRows={Global_State.toggleCleared}
                onRowDoubleClicked = { onRowDoubleClicked }
                onRowClicked = { handleClick }
                // onContextMenu={(event) => { console.log(event) }}

                paginationRowsPerPageOptions = {[15, 25, 50, 100, 200]}
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
                subHeader
                subHeaderComponent = { <SubHeaderComponent set = {setFilter} filter={filter} node = {node}  /> }
                noDataComponent = {<div style={{textAlign: "center", marginTop: 100}} > Vide 😢 </div>}
                sortIcon = {<FaSort size={10} />}
                defaultSortFieldId = {1}
                />
        </div>
        )
}


