/* eslint-disable import/first */

import React, {useMemo, useState, useReducer, useEffect, useRef} from 'react';

import { backend } from "./files";
import {Global_State} from '../main';
import { http } from "../data";

import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import toast from "react-hot-toast";
import {useDropzone} from 'react-dropzone';
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
import * as yup from 'yup'
import { data, event } from 'jquery';


let previousSelected = []


  


const SearchComponent = ({set, tag, node}) => 
{
    
    return (
        <div>
            {node.isRoot ? <IoArrowUndoOutline size={25} style = {{ marginRight: 20, }} /> :
            <IoArrowUndoSharp onClick={ (e) => { e.preventDefault(); backend.setCurrentSelectedFolder(previousSelected.pop()) } }  size={25} style = {{ marginRight: 20, }}  />}
            <label>Chercher selon {tag} :
                <input onChange={(e) => {set(e.target.value)}} type="search" className="form-control form-control-sm" placeholder="" aria-controls="table-files"/>
            </label>
            
        </div>
    )
}

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

    const CustomDiv = ({children}) => 
    {
        const [html, setHtml] = useState(children[0])
        class ContentEditable extends React.Component
        {
            render()
            {
                return <div
                    onInput={this.emitChange}
                    onBlur={this.emitChange}
                    contentEditable
                    dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
            }
            shouldComponentUpdate(nextProps)
            {
                return nextProps.html !== this.getDOMNode().innerHTML;
            }
            emitChange()
            {
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
        };

        var handleChange = function(event){
            this.setHtml(event.target.value);
        }.bind(this);
        
        return (<ContentEditable html={html} onChange={handleChange} />);

    }

    const [filesObjects, set] = useState(acceptedFiles.map( file => { return {file, customName: file.name} } )) 

    useEffect( () => { set(acceptedFiles.map( file => { return {file, customName: file.name} } )) }, [acceptedFiles] )
    
    const files = filesObjects.map(fileObject => {
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
          <ul>{files}</ul>
        </aside>
      </div>
    );
  }

// let handleChange


export default function FileTable({set}) {

    let node = backend.selectedNode.model

    console.log('contentNooooooooooooode', node)

    let tag = "le Nom"

    // const [previousSelected, setPreviousSelected] = useState([0])

    previousSelected = useMemo( () => { previousSelected.push(node.parentId); return previousSelected }, [node] )

    const [filteringWord, setFilteringWord] = useState("")

    const [selectedRowNumber, setNumber] = useState(0)
    const [selectedRow, setSelectedRows] = useState([])
    const selectedRowsByClick = useRef([])
    const justChecking = useRef(false)

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

    useEffect(
        () =>
        {

            Global_State.EventsManager.on('clearSelected', () => { console.log('clearSelected'); setSelectedRows([]); setNumber(0) })
            Global_State.EventsManager.on('setSelectedNode', async (data) => { console.log(data); await Global_State.setSectionId(data.section_id); backend.setCurrentSelectedFolder(data.id) })
            return () => 
            {
                Global_State.EventsManager.off('clearSelected');
                Global_State.EventsManager.off('setSelectedNode');
            }
        },
        []
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
        const options = servicesList.map( (service) => { return {value: service.id, label: service.name } } )

        // composant de selection de service
        const SelectServices = ({updateMethod}) =>
        {
            // console.log(servicesList)
            // console.log(options)

            return(
                <Select
                    onChange = { updateMethod }
                    options = { options }
                    defaultValue = { options.slice(0, 1) }
                    isMulti = { true }
                    placeholder = { "Sélectionner au moins 1 service" }
                    closeMenuOnSelect = { false }
                    components = { makeAnimated() }
                    isDisabled = { options.length === 1 }
                    
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
                    submittedInfo.num_chrono = submittedInfo.num_chrono < 10 ? "0" + submittedInfo.num_chrono : submittedInfo.num_chrono.toString()
                    submittedInfo.annee = submittedInfo.annee < 10 ? "0" + submittedInfo.annee : submittedInfo.annee.toString()

                    let queryBody = new FormData()


                    const service =  submittedInfo.services[0].label 

                    queryBody.append("name", 
                    submittedInfo.type_audit + "-" + service + "-" + submittedInfo.annee + "-" + submittedInfo.num_chrono
                    )
                    queryBody.append("services", JSON.stringify(submittedInfo.services))
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
                            // console.log(res)
                            if(res.status === 201)
                            {
                                swal({
                                    title: "FIN!",
                                    text: "Audit ajouté avec success !",
                                    icon: "success",
                                });
                                Global_State.modalManager.close_modal()
                            }
                            else if(res.status === 200 && res.data === "existAlready")
                            {
                                swal({
                                    title: "FIN!",
                                    text: "Audit existant !",
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
                                Global_State.modalManager.setContent(<Audit_form/>)
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
                                Global_State.modalManager.setContent(<Audit_form/>)
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
                    services: yup.array().min(1).required('Au moins 1'),

                  });

                const formik = useFormik(
                    {
                        validationSchema: validationRules,
                        onSubmit: handleSubmit,
                        initialValues: 
                            {
                            type_audit: "AE",
                            num_chrono: "",
                            annee: '',
                            services: options.slice(0, 1)
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
                        <Form.Label>Service</Form.Label>
                        <SelectServices updateMethod= {(e) => {formik.setFieldValue("services", e)}} />
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
                                if(res.status === 201)
                                {
                                    swal({
                                        title: "FIN!",
                                        text: "Dossier ajouté avec success !",
                                        icon: "success",
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
                                    Global_State.modalManager.setContent(<Folder_form/>)
                                }
                                else if(res.status === 200 && res.data.msg === "storingError")
                                {
                                    swal({
                                        title: "ERROR!",
                                        text: res.data.value,
                                        icon: "error",
                                    });
                                    Global_State.modalManager.setContent(<Folder_form/>)
                                }
                                else if(res.data === "existAlready")
                                {
                                    swal({
                                        title: "FIN!",
                                        text: "Ce Dossier existe deja !",
                                        icon: "info",
                                    });
                                    Global_State.modalManager.close_modal()
                                }
                                else console.log(res)
                                // console.log(res)
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
                                services: options.slice(0, 1)
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
                        <SelectServices updateMethod= {(e) => {formik.setFieldValue("services", e)}} />
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
                    level: yup.number().required("Le champs doit être rempli").positive("la valeur doit être positive").integer("Les décimaux sont invalide").max(2, "Niveau invalide").min(1, "Niveau invalide"),
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
                            services: options.slice(0, 1)
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
                        <SelectServices updateMethod= {(e) => {formik.setFieldValue("services", e)}} />
                        <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services}</span>
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
                                // console.log(res)
                                if(res.status === 200 && res.data === "ok")
                                {
                                    // console.log("looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                                    swal({
                                        title: "FIN!",
                                        text: "Fichier(s) ajouté avec success !",
                                        icon: "success",
                                    });
                                    Global_State.modalManager.close_modal()
                                }
                                else if(res.status === 200 && res.data.msg === "duplicated")
                                {
                                    // console.log(res)
                                    swal({
                                        title: "FIN!",
                                        text: "Certains fichiers son existant ou possède le mm chemin, des copies ont été créées !\n" + JSON.stringify(res.data.value),
                                        icon: "info",
                                    });
                                    Global_State.modalManager.close_modal()
                                }
                                else if(res.status === 200 && res.data.msg === "existAlready")
                                {
                                    // console.log(res)
                                    swal({
                                        title: "FIN!",
                                        text: "Certains fichiers son existant ou possède le mm chemin !\n" + JSON.stringify(res.data.value),
                                        icon: "error",
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
                                    Global_State.modalManager.setContent(<Fs_form/>)
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
                                    console.log(res)
                                    swal({
                                        title: "ERREUR!",
                                        text: res.data.value.errorInfo[2],
                                        icon: "error",
                                    });
                                    // console.log(res)
                                    Global_State.modalManager.setContent(<Fs_form/>)
                                }
                                else
                                {
                                    console.log(res)
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

                const [min, setMin] = useState(1)
                const [enableEnd, setEndState] = useState(false)

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
                            services: options.slice(0, 1)
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
                        <SelectServices updateMethod = {(e) => {formik.setFieldValue("services", e)}} />
                        <span className='text-danger' style={{ fontSize: 11.2 }} >{formik.errors.services}</span>
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


    const ActionsMenu = () => 
    {
        // let label1 =  ?  : node.type === "audit" ? "Nouvelle Non-Conformité" : "Nouveau Fichier de preuve"
        let buttons = []

        // console.log("kkkkkkkkkkkkk", Global_State.getCurrentSection().name)

        
        const [ id, type ] = Global_State.identifyNode(node)

        if (node.global_type === "folder") buttons.push( [ <option key={"add_folder"} className="dropdown-item" onClick={() => {add("add_folder")}} >Nouveau Dossier</option>, <option key={"add_files"} className="dropdown-item" onClick={() => {add("add_files")}} >Ajouter des fichiers</option> ] )
        if (node.type === "root" && /^Audit(( \b\w*\b)|)$/.test(Global_State.getCurrentSection().name) ) buttons.push(<option key={"add_audit"} className="dropdown-item" onClick={() => {add("add_audit")}} >Nouvel Audit</option>)
        if (node.type === "nonC") buttons.push(<option key={"add_fncs"} className="dropdown-item" disabled = { false }  onClick={() => {add("add_fncs")}} >Générer des Non-Conformités</option>)
       
        return(
            <div className="d-md-flex justify-content-between mb-4">
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
                                <i className="dropdown-item">Partager</i>
                                <i className="dropdown-item">Télécharger</i>
                                <i className="dropdown-item">Copier vers</i>
                                <i className="dropdown-item">Déplacer vers</i>
                                {
                                    selectedRowNumber === 1 ?
                                    <i className="dropdown-item">Renommer</i> : null
                                }
                                <i className="dropdown-item" onClick = { e => 
                                {
                                    // http.delete("")

                                    const remove = async () => 
                                    {
                                        

                                        await Promise.all(selectedRow.map( 
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
                                                loading: 'Loading...',
                                                success: 'Processus achevé',
                                                error: 'err'
                                            }

                                        )
                                    }
                                    else localRemove()

                                } } >Supprimer</i>
                            </div>
                        </li>
                    }
                    <li className="list-inline-item mb-0">
                        <a className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown">
                            Tags
                        </a>
                        <div className="dropdown-menu">
                            <i className="dropdown-item">Nom</i>
                            <i className="dropdown-item">Date de Creation</i>
                            <i className="dropdown-item">Date de Revision</i>
                            <i className="dropdown-item">RA</i>
                        </div>
                    </li>
                </ul>
            </div>
        )
        
    }

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

    const dataFormater = (node) => {
        
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
                    }}  style={{  width: iconSize, height: iconSize, boxShadow: "1px 2px #888888" }} src = {data.url}  />
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
                  return <BsFillFileEarmarkPdfFill color='#ad0b00' size={iconSize} onClick = { e =>
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
                 }  />
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
                <div id = {props.data.id} ref = {div} className='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%' }} {...props} >
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
                const node = Global_State.getNodeDataById(data.id)
                const [id, lol] = Global_State.identifyNode(node)
                // Global_State.EventsManager.emit('nodeUpdate', {node_type: node.type, node: {...node, id, level: nextNiv(node.level)}})


                const update = async () => 
                {
                    
                    const query = new FormData;
                    query.append('id', id)
                    query.append('update_object', 'level')
                    query.append('new_value', nextNiv(level))

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

            return( <div className={class_name} onClick = {handleClick} >{level}</div> )
        }

        for(let data of node.children )
        {
            datas.push(
                {
                    id: data.id,
                    value: data.name,
                    level_value: data.level,
                    name: <NameFormater data = {data} onClick = { e => { console.log('nameClicked'); handleClick({id: data.id, name: data.name}, e) } } />,
                    level: data.type === "fnc" ? <LevelComponent data={data} /> : undefined,
                    created_at: data.created_at,
                    isClosed: data.type === "fnc" ? data.isClosed ? <div className="badge bg-success-bright text-success">Clôturé</div> : <div class="badge bg-danger-bright text-danger">Non-Clôturé</div> : undefined ,
                    RA:  node.type === "root" && data.type === 'audit' ? data.ra.name.substring(0, 1) + ". " +  data.ra.second_name : node.type === "audit" ? node.ra.name.substring(0, 1) + ". " +  node.ra.second_name : undefined,
                    size: data.global_type === 'file' ? Global_State.sizeFormater(data.taille) : undefined,
                    type: data.type,
                    global_type: data.global_type,
                    section_id: data.section_id,

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

        if (node.type === "root" && Global_State.getCurrentSection().name === 'Audit') {
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
                    name: 'CREE LE',
                    selector: row => row.created_at,
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
        backend.setCurrentSelectedFolder(row.id)
        // console.log('dbclick',row)
    }

    const handleClick = (row, event) => 
    { 
        // console.log(row.id, event); 
        if(event.ctrlKey || event.altKey || event.shiftKey) handleChange(1, [row], true)
        else handleChange(1, [row])
        // selectedRowsByClick.current = [row]
    }




    
    const isIndeterminate = (indeterminate) => indeterminate;
    const selectableRowsComponentProps = {  onclick: e => {console.log(e)} };

    console.log('dataaaaaaas', datas)


    return (
        <div className="col-xl-8">
            <div className="content-title mt-0">
                <h4>{node.name}</h4>
            </div>
            <ActionsMenu />
            <DataTable
                columns={columns}
                data={datas}

                selectableRows
                selectableRowsVisibleOnly
                selectableRowsHighlight
                // selectableRowsComponent={Checkbox}
                // selectableRowsComponentProps={selectableRowsComponentProps}
                selectableRowSelected={ (row) => { justChecking.current = true; /* console.log('selectableRowSelected'); */ return row.isSelected }}
                onSelectedRowsChange={ ({selectedCount, selectedRows}) => { if(datas.length > 0)handleChange(selectedCount, selectedRows) } }
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
                fixedHeader = {true}
                fixedHeaderScrollHeight = "100vh"
                pointerOnHover = {true}
                highlightOnHover = {true}
                persistTableHead = {true}
                noHeader
                subHeader
                subHeaderComponent = { <SearchComponent set = {setFilteringWord} tag = {tag} node = {node}  /> }
                noDataComponent = {<div style={{textAlign: "center", marginTop: 100}} > Vide 😢 </div>}
                sortIcon = {<FaSort size={10} />}
                defaultSortFieldId = {1}
            />
        </div>
    )
}


