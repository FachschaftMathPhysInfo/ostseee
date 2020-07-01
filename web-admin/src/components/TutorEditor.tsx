import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton, EuiDatePicker, EuiSwitch } from "@elastic/eui";
import { editTutor, newTutor } from "../mutations/tutors";
import { Tutor } from "ostseee-web-common";
import moment from "moment";

const TutorEditor = props => {

    const tutor: Tutor = props.tutor;
    const courseId: string= props.courseId;
    console.log(tutor)
    const [name, setName] = useState(tutor?.name||'');
    const [email, setEmail] = useState(tutor?.email||'');
    const [censored, setCensored] = useState(tutor?.censored||false);
    const [censoredDate, setCensoredDate] = useState(moment(tutor?.censoredDate||Date()));
    const [thirdPartyKey, setThirdPartyKey] = useState(tutor?.thirdPartyKey||'');
    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation((tutor:Tutor)=>props.tutor?editTutor(courseId,tutor.id,tutor):newTutor(courseId,tutor))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" >
        
        <EuiFormRow label="Name">
            <EuiFieldText placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Email">
            <EuiFieldText placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Zensiert">
            <EuiSwitch id="censored" label="Zensiert" checked={censored} onChange={e => setCensored(e.target.checked)} />
        </EuiFormRow>
        <EuiFormRow label="Entscheidungsdatum">
        <EuiDatePicker
                                selected={censoredDate}
                                onChange={(d)=>setCensoredDate(d)}
                                aria-label="Entscheidungsdatum"
                            />
        </EuiFormRow>
        <EuiFormRow label="ThirdPartyKey">
            <EuiFieldText placeholder="ThirdPartyKey" value={thirdPartyKey} onChange={(e)=>setThirdPartyKey(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiButton fill onClick={()=> {submit( {thirdPartyKey, name, email, censored, censoredDate:censoredDate.toDate()});}} disabled={isPending}>{props.tutor==undefined?"Hinzufügen":"Aktualisieren"}</EuiButton>
        </EuiForm>
    </>
)
    
}
export default TutorEditor