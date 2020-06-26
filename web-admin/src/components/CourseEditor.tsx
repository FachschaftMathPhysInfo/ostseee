import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton, EuiDatePicker, EuiSelect } from "@elastic/eui";
import { editCourse, newCourse } from "../mutations/courses";
import { Course, CourseProgressEnum } from "ostseee-web-common";
import moment from "moment";
import ModuleSelect from "./ModuleSelect";
import FormSelect from "./FormSelect";
import TermSelect from "./TermSelect";

const CourseEditor = props => {

    const course: Course = props.course;
    console.log(course)
    const [moduleId, setModuleId] = useState(course?.moduleId || '');
    const [formId, setFormId] = useState(course?.formId || '');
    const [termId, setTermId] = useState(course?.termId || '');
    const [location, setLocation] = useState(course?.location || '');
    const [numberOfStudents, setNumberOfStudents] = useState(course?.numberOfStudents || 0);
    const [language, setLanguage] = useState(course?.language || '');
    const [progress, setProgress] = useState(course?.progress || CourseProgressEnum.Created);
    const [clearance, setClearance] = useState(course?.clearance || '');
    const [thirdPartyKey, setThirdPartyKey] = useState(course?.thirdPartyKey || '');
    const options = Object.keys(CourseProgressEnum).map(progress => {
        return {
            value: CourseProgressEnum[progress],
            text: CourseProgressEnum[progress]
        }
    })
    console.log(moduleId)
    //TODO: bug, anscheinend wird die Seite ständig neu geladen und die Werte im Form sind nicht änderbar
    //Es fehlt noch der Patch Request über eine mutation, sodass die Sachen auch im backend geupdated werden.
    //@ts-ignore
    const [{ isPending, isFinished, status }, submit] = useMutation((moduleId, formId, termId, location, numberOfStudents, language, progress, clearance,thirdPartyKey) => props.course ? editCourse(course.id,moduleId, formId, termId, location, numberOfStudents, language, progress, clearance,thirdPartyKey) : newCourse(moduleId, formId, termId, location, numberOfStudents, language, progress, clearance,thirdPartyKey))

    if (isFinished && status == 200) {
        props.onComplete()
    }
    return (
        <>
            <EuiForm component="form" style={{ padding: 30 }}>
                <EuiFormRow label="Modul">
                    <ModuleSelect moduleId={moduleId} onChange={(e) => { console.log(e); setModuleId(e) }}></ModuleSelect>
                </EuiFormRow>
                <EuiFormRow label="Form">
                    <FormSelect formId={formId} onChange={(e) => setFormId(e)}></FormSelect>
                </EuiFormRow>
                <EuiFormRow label="Term">
                    <TermSelect termId={termId} onChange={(e) => setTermId(e)}></TermSelect>
                </EuiFormRow>
                <EuiFormRow label="Ort">
                    <EuiFieldText placeholder="Ort" value={location} onChange={(e) => setLocation(e.target.value)}></EuiFieldText>
                </EuiFormRow>
                <EuiFormRow label="# Students">
                    <EuiFieldText placeholder="# Students" value={numberOfStudents} onChange={e => setNumberOfStudents(parseInt(e.target.value, 10))} />
                </EuiFormRow>
                <EuiFormRow label="Sprache (Kürzel)">
                    <EuiFieldText placeholder="Sprache" value={language} onChange={e => setLanguage(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="Fortschritt">
                    <EuiSelect options={options} value={progress} onChange={(e) => setProgress(e.target.value as CourseProgressEnum)}></EuiSelect>

                </EuiFormRow>
                <EuiFormRow label="Freigabe">
                    <EuiFieldText placeholder="Freigabe" value={clearance} onChange={e => setClearance(e.target.value)} />
                </EuiFormRow>
                <EuiFormRow label="3rdPartyKey">
                    <EuiFieldText placeholder="3rdPartyKey" value={thirdPartyKey} onChange={e => setThirdPartyKey(e.target.value)} />
                </EuiFormRow>
                <EuiButton fill onClick={() => { submit(moduleId, formId, termId, location, numberOfStudents, language, progress, clearance,thirdPartyKey); }} disabled={isPending}>Aktualisieren</EuiButton>
            </EuiForm>
        </>
    )

}
export default CourseEditor