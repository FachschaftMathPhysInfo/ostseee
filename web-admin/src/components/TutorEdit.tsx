import { Tutor } from "ostseee-web-common";
import TutorEditor from "./TutorEditor";
import { tutorGet } from "../query-configs/tutors";
import { useRequest } from "redux-query-react";
import { useParams, useHistory } from "react-router";
import {useSelector} from 'react-redux';
import { getTutor } from "../selectors/tutors";
import React from "react";
import { EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiPageContentBody, EuiTitle } from "@elastic/eui";
const TutorEdit = props => {
    
    let {tutorId,courseId} = useParams();
    const [{ isPending }] = useRequest(tutorGet(courseId,tutorId));
    const tutor: Tutor = useSelector(getTutor(tutorId));
    console.log(tutor)
    const history=useHistory()

    if (isPending) return (<>Lade</>)
    return (
        <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection><EuiTitle><h3>Tutor bearbeiten</h3></EuiTitle></EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
        <TutorEditor courseId={courseId} tutor={tutor||{}} onComplete={()=>history.goBack()}></TutorEditor></EuiPageContentBody>
    </EuiPageContent>
)
    
}
export default TutorEdit