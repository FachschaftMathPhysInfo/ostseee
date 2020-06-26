import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import './Prof.css';
import { EuiForm, 
    EuiFormRow, 
    EuiFieldText, 
    EuiButton, 
    EuiDatePicker
} from "@elastic/eui";
import { editTerm, newTerm } from "../mutations/terms";
import { Term } from "ostseee-web-common";
import moment from "moment";

const TermEditor = props => {

    const term: Term = props.term;
    console.log(term)
    const [name, setName] = useState(term?.name||'');
    const [begin, setBegin] = useState(moment(term?.begin));
    const [end, setEnd] = useState(moment(term?.end));

    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation((name, begin, end)=>props.term?editTerm(term.id, name, begin, end):newTerm(name, begin, end))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" style={{padding: 30}}>
            <EuiFormRow label="Name">
                <EuiFieldText placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
            </EuiFormRow>
            <EuiFormRow label="Anfangsdatum">
                <EuiDatePicker
                    selected={begin}
                    onChange={(d)=>setBegin(d)}
                    aria-label="Anfangsdatum"
                />
            </EuiFormRow>
            <EuiFormRow label="Enddatum">
                <EuiDatePicker
                        selected={end}
                        onChange={(d)=>setEnd(d)}
                        aria-label="Enddatum"
                    />
            </EuiFormRow>
            
            <EuiButton fill onClick={()=> {submit(name, begin.toDate(), end.toDate());}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default TermEditor