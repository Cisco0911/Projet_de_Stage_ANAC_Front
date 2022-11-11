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
                setFilterTag('Audit')
        }

        return(
        <div onClick={ e => { e.stopPropagation() } }  >
                <Form id={'global_research'} className ={`${display} container-fluid`} style={{ width: (window.innerWidth > 576 ? 500 : 'unset') }} >
                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                Global_research
                        </Form.Label>
                        <InputGroup className="me-2">
                                <InputGroup.Text> <div onClick={handleFilterTagClick} > {filterTag} </div> </InputGroup.Text>
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={value}
                                onChange={handleChange}
                                />
                        </InputGroup>
                </Form>

                <Card id={'global_research_result'} className={`${value === '' ? 'd-none' : 'd-flex'} mt-1 p-1`} sx={{ maxHeight: 3*window.innerHeight/4, maxWidth: 9*window.innerWidth/10 }} >
                        <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                        <TableBody>
                                                {
                                                        Global_State.dataToUse.filter(
                                                                node =>
                                                                {
                                                                        if (value === '') return false
                                                                        else if (filterTag === 'All') return node.name.indexOf(value) !== -1
                                                                        else if (filterTag === 'Audit') return (node.type === 'audit' && node.name.indexOf(value) !== -1)
                                                                        else if (filterTag === 'FNC') return (node.type === 'fnc' && node.name.indexOf(value) !== -1)
                                                                        else if (filterTag === 'Folder') return (node.type === 'ds' && node.name.indexOf(value) !== -1)
                                                                        else if (filterTag === 'File') return (node.type === 'f' && node.name.indexOf(value) !== -1)
                                                                }
                                                        ).map((node) => (
                                                        <TableRow
                                                        key={node.id}
                                                        className={'m-1'}
                                                        sx={{ margin: 5 }}
                                                        >
                                                                <TableCell className={'d-none d-sm-block'} component="th" scope="row" sx={{ minWidth: 'max-content' }}>
                                                                        {`${node.name}   ${node.path}`}
                                                                </TableCell>
                                                                <TableCell className={'d-block d-sm-none'} component="th" scope="row" sx={{ minWidth: 'max-content' }}>
                                                                        {node.name}
                                                                </TableCell>
                                                        </TableRow>
                                                        )
                                                        )
                                                }
                                        </TableBody>
                                </Table>
                        </TableContainer>
                </Card>

        </div>
        )
}