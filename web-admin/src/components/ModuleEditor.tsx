import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import './Prof.css';
import { EuiForm, 
    EuiButton, 
    EuiFormRow, 
    EuiFieldText, 
    EuiSelect
} from "@elastic/eui";
import { Module } from "ostseee-web-common";
import FacultySelect from "./FacultySelect"
import {editModule,newModule} from '../mutations/modules'

const ModuleEditor = props => {

    const module: Module = props.module;
    console.log(module)
    const [name, setName] = useState(module?.name||'');
    const [description, setDescription] = useState(module?.description||'');
    const [facultyId, setFacultyId] = useState(module?.facultyId||'');

    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation((name, description, facultyId)=>props.module?editModule(module.id, name, description, facultyId):newModule(name, description, facultyId))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" style={{padding: 30}}>
            <EuiFormRow label="Name">
                <EuiFieldText placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
            </EuiFormRow>
            <EuiFormRow label="Beschreibung">
                <EuiFieldText placeholder="Beschreibung" value={description} onChange={(e)=>setDescription(e.target.value)}></EuiFieldText>
            </EuiFormRow>
            <EuiFormRow label="Fakultät">
                <FacultySelect facultyId={facultyId} onChange={(e) => { console.log(e); setFacultyId(e) }}></FacultySelect>
            </EuiFormRow>
            
            <EuiButton fill onClick={()=> {submit(name, description, facultyId);}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default ModuleEditor