import React, { useState, ChangeEvent } from "react"
import { useRequest, useMutation } from "redux-query-react"
import { getCourseProfsByCourse } from "../selectors/courseprofs"
import { courseprofsByCourseGet } from "../query-configs/courseprofs";
import { useSelector } from "react-redux"
import { CourseProf, Prof, Tutor } from "ostseee-web-common";
import ProfDisplay from "./ProfDisplay";
import { EuiButton, EuiButtonIcon, EuiSuggest, EuiSuggestItemProps, EuiTitle, EuiPanel } from "@elastic/eui";
import { deleteCourseProf, newCourseProf } from "../mutations/courseprofs";
import { getProfs } from "../selectors/profs";
import { profsGet } from "../query-configs/profs";
import { tutorsByCourseGet } from "../query-configs/tutors";
import { getTutorsByCourse } from "../selectors/tutors";
import { deleteTutor, newTutor } from "../mutations/tutors";
import EuiCustomLink from "../EuiCustomLink";
import TutorEditor from "./TutorEditor";
import { useHistory } from "react-router";

const TutorsEditor = ({ courseId }) => {
    const [{ isPending }, reload] = useRequest(tutorsByCourseGet(courseId));
    const tutors: Array<Tutor> = useSelector(getTutorsByCourse(courseId))||[];
    //@ts-ignore
    const [{ isPending: is2 }, deleteTutorA] = useMutation(tutorId => {

        return deleteTutor(tutorId, courseId)
    }
    );
    //@ts-ignore
    const [{ isPending: is4 }, makeTutor] = useMutation((tutor:Tutor) => {
        //@ts-ignore
        return newTutor( courseId,tutor)
    }
    );
    const history = useHistory();
    if (isPending ) {
        return <>Loading</>
    }
    if(tutors?.length==0){
        return (<><>No Tutors</>
        <EuiPanel betaBadgeLabel={"Neuer Tutor"}>
        <TutorEditor courseId={courseId} onComplete={()=>{reload()}}></TutorEditor>
        </EuiPanel>
        </>
        )
    }
    return (<><ul>
        {tutors?.map((t => <li key={t.id}><EuiCustomLink to={`/courses/${courseId}/tutors/${t.id}`}>{t.name}</EuiCustomLink>
            <EuiButtonIcon onClick={(e) => {
                //@ts-ignore
                if (window.confirm("Remove?")) {
                    deleteTutorA(t.id)
                }
            }} iconType="cross" aria-label={`Remove Tutor`} color="danger"></EuiButtonIcon>
        </li>))}</ul>
        <EuiPanel betaBadgeLabel={"Neuer Tutor"}>
        <TutorEditor courseId={courseId} onComplete={()=>{reload()}}></TutorEditor>
        </EuiPanel>
        </>)
}
export default TutorsEditor