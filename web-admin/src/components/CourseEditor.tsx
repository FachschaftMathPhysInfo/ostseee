import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton, EuiDatePicker } from "@elastic/eui";
import { editCourse, newCourse, CourseProgressEnum } from "../mutations/courses";
import { Course } from "ostseee-web-common";
import moment from "moment";

const CourseEditor = props => {

    const course: Course = props.course;
    console.log(course)
    const [moduleId, setModuleId] = useState(course?.moduleId||'');
    const [formId, setFormId] = useState(course?.formId||'');
    const [termId, setTermId] = useState(course?.termId||'');
    const [location, setLocation] = useState(course?.location||'');
    const [numberOfStudents, setNumberOfStudents] = useState(course?.numberOfStudents||0);
    const [language, setLanguage] = useState(course?.language||'');
    const [progress, setProgress] = useState(course?.progress||CourseProgressEnum.created);
    const [clearance, setClearance] = useState(course?.clearance||'');

    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{isPending,isFinished,status},submit]=useMutation((moduleId, formId, termId, location, numberOfStudents, language, progress, clearance)=>props.course?editCourse(moduleId, formId, termId, location, numberOfStudents, language, progress, clearance):newCourse(moduleId, formId, termId, location, numberOfStudents, language, progress, clearance))
    
    if (isFinished&&status==200){
        props.onComplete()
    }
    return (
        <>
        <EuiForm component="form" style={{padding: 30}}>
        <EuiFormRow label="Modul">
            <EuiFieldText placeholder="Titel" value={moduleId} onChange={(e)=>setModuleId(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Vorname">
            <EuiFieldText placeholder="Vorname" value={formId} onChange={(e)=>setFormId(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Nachname">
            <EuiFieldText placeholder="Nachname" value={termId} onChange={(e)=>setTermId(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Email">
            <EuiFieldText placeholder="Email" value={location} onChange={(e)=>setLocation(e.target.value)}></EuiFieldText>
        </EuiFormRow>
        <EuiFormRow label="Zensiert">
            <EuiFieldText placeholder="Zensiert" value={numberOfStudents} onChange={e => setNumberOfStudents(parseInt(e.target.value, 10))} />
        </EuiFormRow>
        <EuiFormRow label="Zensiert">
            <EuiFieldText placeholder="Zensiert" value={language} onChange={e => setLanguage(e.target.value)} />
        </EuiFormRow>        
        <EuiFormRow label="Zensiert">
            <EuiFieldText placeholder="Zensiert" value={progress} onChange={e => setProgress(CourseProgressEnum.created)} />
            {/* Enum Input hard coded
            Replace by selection if necessary */}
        </EuiFormRow>        <EuiFormRow label="Zensiert">
            <EuiFieldText placeholder="Zensiert" value={clearance} onChange={e => setClearance(e.target.value)} />
        </EuiFormRow>
        <EuiButton fill onClick={()=> {submit(moduleId, formId, termId, location, numberOfStudents, language, progress, clearance);}} disabled={isPending}>Aktualisieren</EuiButton>
        </EuiForm>
    </>
)
    
}
export default CourseEditor