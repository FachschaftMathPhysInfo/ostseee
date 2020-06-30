import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import './Prof.css';
import { EuiForm, 
    EuiFormRow, 
    EuiFieldText, 
    EuiButton, 
    EuiDatePicker,
    EuiCodeEditor
} from "@elastic/eui";
import {  newForm } from "../mutations/forms";
import { Term, Form } from "ostseee-web-common";
import moment from "moment";
import TermSelect from "./TermSelect";

const FormEditor = props => {

    const form: Form = props.form;

    const [name, setName] = useState(form?.name||'');
    const [abstractForm, setAbstractForm] = useState(JSON.stringify(form?.abstractForm)||'');
    const [termId, setTermId] = useState(form?.termId||'');

    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation((name, termId,abstractForm)=>props.term?0:newForm(name, termId, abstractForm))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" style={{padding: 30}}>
            <EuiFormRow label="Name">
                <EuiFieldText placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
            </EuiFormRow>
            <EuiFormRow label="Term">
                <TermSelect termId={termId} onChange={(e)=>setTermId(e)}></TermSelect>
            </EuiFormRow>
            <EuiFormRow label="AbstractForm">
                <EuiCodeEditor
                        value={abstractForm}
                        onChange={(d)=>setAbstractForm(d)}
                        mode="javascript"
                        aria-label="AbstractForm"
                    />
            </EuiFormRow>
            
            <EuiButton fill onClick={()=> {submit(name, termId, JSON.parse(abstractForm));}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default FormEditor