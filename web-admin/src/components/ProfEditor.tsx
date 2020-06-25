import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton, EuiDatePicker } from "@elastic/eui";
import { editProf, newProf } from "../mutations/profs";
import { Prof } from "ostseee-web-common";
import moment from "moment";

const ProfEditor = props => {

    const prof: Prof = props.prof;
    console.log(prof)
    const [title, setTitle] = useState(prof?.title||'');
    const [firstname, setFirstname] = useState(prof?.firstname||'');
    const [lastname, setLastname] = useState(prof?.lastname||'');
    const [email, setEmail] = useState(prof?.email||'');
    const [censored, setCensored] = useState(prof?.censored||false);
    const [censoredDate, setCensoredDate] = useState(moment(prof?.censoredDate||Date()));

    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation(( title, firstname, lastname, email, censored, censoredDate)=>props.prof?editProf(prof.id, title, firstname, lastname, email, censored, censoredDate):newProf(title, firstname, lastname, email, censored, censoredDate))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" style={{padding: 30}}>
        <EuiFormRow label="Titel">
            <EuiFieldText placeholder="Titel" value={title} onChange={(e)=>setTitle(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Vorname">
            <EuiFieldText placeholder="Vorname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Nachname">
            <EuiFieldText placeholder="Nachname" value={lastname} onChange={(e)=>setLastname(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Email">
            <EuiFieldText placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Zensiert">
            <EuiCheckbox id="censored" label="Zensiert" checked={censored} onChange={e => setCensored(e.target.checked)} />
        </EuiFormRow>
        <EuiFormRow label="Entscheidungsdatum">
        <EuiDatePicker
                                selected={censoredDate}
                                onChange={(d)=>setCensoredDate(d)}
                                aria-label="Entscheidungsdatum"
                            />
        </EuiFormRow>
        <EuiButton fill onClick={()=> {submit( title, firstname, lastname, email, censored, censoredDate.toDate());}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default ProfEditor