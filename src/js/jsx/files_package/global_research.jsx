/* eslint-disable import/first */



import React, {useState} from "react";

import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {Global_State} from "../main";
import {createPortal} from "react-dom";
import Stack from "@mui/material/Stack";






export default function Global_research({display})
{

        const [value, setValue] = useState('')
        const [filterTag, setFilterTag] = useState('All')
        // const [result_display, setDiaplay] = useState('d-none')

        const handleChange = (e) =>
        {
                e.stopPropagation()
                setValue(e.target.value)
                // if (e.target.value.length > 0) setDiaplay('d-flex')
                // else setDiaplay('d-none')
        }

        const handleFilterTagClick = (e) =>
        {
                e.stopPropagation()

                switch (filterTag)
                {
                        case 'All':
                                setFilterTag('Folder')
                                break
                        case 'Folder':
                                setFilterTag('File')
                                break
                        case 'File':
                                setFilterTag('Audit')
                                break
                        case 'Audit':
                                setFilterTag('FNC')
                                break
                        default:
                                setFilterTag('All')
                                break

                }
        }

        return(
        <div onClick={e => { e.preventDefault(); e.stopPropagation() }} >
                <Form id={'global_research'} className ={`${display} container-fluid`} style={{ width: (window.innerWidth > 576 ? 500 : 'unset') }} >
                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                Global_research
                        </Form.Label>
                        <InputGroup className="me-2">
                                <InputGroup.Text> <div onClick={handleFilterTagClick} style={{ cursor: 'pointer' }} > {filterTag} </div> </InputGroup.Text>
                                <Form.Control
                                id={'global_research_input'}
                                style={{ backgroundColor: 'whitesmoke' }}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={value}
                                onChange={handleChange}
                                autoFocus
                                />
                        </InputGroup>
                </Form>

                <div className="d-flex justify-content-center"
                style={{
                        width: "100%"
                }}
                >
                        <Card id={'global_research_result'} className={`${value === '' ? 'd-none' : 'd-flex flex-column'} mt-1 p-1`}
                              sx =
                              {{
                                      maxHeight: 3*window.innerHeight/4,
                                      maxWidth: 9*window.innerWidth/10,
                                      backgroundColor: '#0062ff7a',
                                      border: 'solid blue 1px',
                                      overflowY: 'scroll',
                                      zIndex: 1900,
                                      position: "fixed"
                              }}
                        >
                                {
                                        window.Global_State.dataToUse.filter(
                                        node =>
                                        {
                                                if ( (value === '') || node.isRoot ) return false
                                                else if (node.type === 'checkList' || node.type === 'dp' || node.type === 'nc') return false
                                                else if (filterTag === 'All') return node.name.indexOf(value) !== -1
                                                else if (filterTag === 'Audit') return (node.type === 'audit' && node.name.indexOf(value) !== -1)
                                                else if (filterTag === 'FNC') return (node.type === 'fnc' && node.name.indexOf(value) !== -1)
                                                else if (filterTag === 'Folder') return (node.type === 'ds' && node.name.indexOf(value) !== -1)
                                                else if (filterTag === 'File') return (node.type === 'f' && node.name.indexOf(value) !== -1)
                                        }
                                        ).map(
                                        node =>
                                        {
                                                const Research_name_component = ({name, researched_word}) =>
                                                {
                                                        const idx = name.indexOf(researched_word)

                                                        const [prev, current, next] = [ name.substring(0, idx), name.substring(idx, idx + researched_word.length), name.substring(idx + researched_word.length, name.length)  ]

                                                        return (
                                                        <span className={'d-block align-items-center'} title={name}
                                                              style={{
                                                                      width: "-webkit-fit-content",
                                                                      overflow: 'hidden',
                                                                      textOverflow: "ellipsis",
                                                                      maxWidth: window.innerWidth > 576 ? '45%' : '100%',
                                                                      flex: "0 0 auto",
                                                              }}
                                                        >
                                                                {prev}
                                                                <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: 2, padding: 2 }} >{current}</span>
                                                                {next}
                                                        </span>

                                                        )
                                                }

                                                const handleClick = e =>
                                                {
                                                        e.stopPropagation()

                                                        if ( window.innerWidth > 576 ) window.Global_State.absolutePopover.close()
                                                        else setValue('')
                                                        window.Global_State.EventsManager.emit("show_on_screen", node)
                                                }

                                                return (
                                                        <Card
                                                                key={node.id}
                                                                className={'m-1 d-flex align-items-center'}
                                                                sx =
                                                                {{
                                                                        minHeight: 35,
                                                                        margin: 5,
                                                                        padding: 2,
                                                                        overflowX: 'scroll',
                                                                        cursor: 'pointer'
                                                                }}
                                                                onClick={handleClick}
                                                        >
                                                                <Stack direction={"row"} spacing={1} className="d-none d-sm-flex flex-sm-row align-items-center"  style={{ width: '100%', whiteSpace: "nowrap"}}>
                                                                        <Research_name_component name={node.name} researched_word={value}  />
                                                                        <span title={`${node.path}`}
                                                                                style={{
                                                                                        height: "fit-content",
                                                                                        color: "#00000075",
                                                                                        fontSize: 13,
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis",
                                                                                        flex: 1
                                                                                }}
                                                                        > {`${node.path}`} </span>
                                                                </Stack>
                                                                <div title={node.path} className={'d-block d-sm-none'}  style={{ width: '100%' }}>
                                                                        <Research_name_component name={node.name} researched_word={value}  />
                                                                </div>
                                                        </Card>
                                                )
                                        }
                                        )
                                }
                        </Card>
                </div>

        </div>
        )

}