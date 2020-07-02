import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiButton, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiPageContentBody, EuiDescriptionList } from "@elastic/eui";
import { Prof, Tutor } from "ostseee-web-common";
import { tutorGet } from "../query-configs/tutors";
import { getTutor } from "../selectors/tutors";


const TutorDetail = props => {
    
    let {courseId,tutorId} = useParams();
    const [{isPending}, second] = useRequest(tutorGet(courseId,tutorId));
    const tutor:Tutor = useSelector(getTutor(tutorId))
    const history = useHistory()
    if (isPending) return (<>Loading</>)
    if (tutor == undefined) return (<>Tutor not found</>)
    const moduleAsList = [
         { title: "Name", description: tutor.name },
         { title: "3rdPartyKey", description: tutor.thirdPartyKey },
         { title: "Email", description: (<a href={"mailto:"+tutor.email}>{tutor.email}</a>) },
         { title: "Zensiert", description: tutor.censored ? 'Ja': 'Nein' },
         {title:"Datum der Zensierentscheidung", description: tutor.censoredDate.toLocaleDateString()}
     ]
        return (
            <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>Tutor</EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection> 
                <EuiButton iconType="pencil" onClick={()=>history.push(`/courses/${courseId}/tutors/${tutor.id}/edit`)}>Bearbeiten</EuiButton>
           </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
            <EuiDescriptionList textStyle="reverse" listItems={moduleAsList} />
            </EuiPageContentBody>
        </EuiPageContent>
        )
    
}
export default TutorDetail