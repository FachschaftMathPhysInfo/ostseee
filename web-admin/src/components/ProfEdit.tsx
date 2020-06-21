import { useParams } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton } from "@elastic/eui";
import { editProf } from "../mutations/profs";
import { Prof } from "ostseee-web-common";

const ProfEdit = props => {
    
    let {profId} = useParams();
    const [{ isPending }] = useRequest(profQueryConfigs.profGet(profId));
    const prof: Prof = useSelector(profSelectors.getProf)[0];

    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [censored, setCensored] = useState(false);
    const [censoredDate, setCensoredDate] = useState(null);

    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    useEffect(()=>{
        if(prof){
            setTitle(prof.title);
            setFirstname(prof.firstname);
            setLastname(prof.lastname);
            setEmail(prof.email);
            setCensored(prof.censored);
            setCensoredDate(prof.censoredDate)
        }
    });

    
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
        <EuiButton fill onClick={()=> {editProf(prof.id, title, firstname, lastname, email, censored, prof.censoredDate);}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default ProfEdit