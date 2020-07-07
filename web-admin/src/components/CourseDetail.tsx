
import { useParams, useHistory } from "react-router"
import React, { useState } from "react";
import { useRequest, useMutation } from "redux-query-react";
import { courseGet } from "../query-configs/courses";
import { useSelector } from 'react-redux'
import { Course } from "ostseee-web-common";
import { EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle, EuiPageContentBody, EuiText, EuiTextAlign, EuiDatePickerRange, EuiDatePicker, EuiButton, EuiCode, EuiFieldText, EuiFormRow, EuiForm, EuiSpacer } from "@elastic/eui";
import ModuleDisplay from "./ModuleDisplay";
import TermDisplay from "./TermDisplay";
import CourseProfsDisplay from "./CourseProfsDisplay";
import FormDisplay from "./FormDisplay";
import { invitationGet } from "../query-configs/invitations";
import moment from "moment";
import InvitationList from "../lib/invitationlist";
import ModuleSelect from "./ModuleSelect";
import TermSelect from "./TermSelect";
import { getCourse } from "../selectors/courses";
import CourseProfsEditor from "./CourseProfsEditor";
import TutorsEditor from "./TutorsEditor";
import InvitationsManager from "./InvitationsManager";
const CourseDetail = props => {
    let { courseId } = useParams();
    const [{ isPending }] = useRequest(courseGet(courseId));
    const course: Course = useSelector(getCourse(courseId))
    //@ts-ignore
    const [{ isPending: isPending2, status }, getInvitations] = useMutation((begin, end) => { return invitationGet(courseId, begin, end) });
    const history= useHistory()
    if (isPending) {
        return (<>Loading</>)
    }
    if (course == undefined) {
        return <>course</>
    }
    return (
        <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                    <EuiTitle>
                        <h1><ModuleDisplay id={course.moduleId}></ModuleDisplay> im <code><TermDisplay termId={course.termId}></TermDisplay></code></h1>
                    </EuiTitle>         
                </EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection>
                <EuiButton iconType="pencil" onClick={() => history.push(`/courses/${course.id}/edit`)}>Bearbeiten</EuiButton>
                </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiForm>
                    <b># Students:</b><code>{course.numberOfStudents}</code><br></br>
                    <b>Form:<FormDisplay formId={course.formId}></FormDisplay></b>
                    <EuiFormRow label="Profs">
                    <CourseProfsEditor courseId={courseId}></CourseProfsEditor>
                    </EuiFormRow>
                    <EuiFormRow label="Tutors">
                <TutorsEditor courseId={courseId}></TutorsEditor>
                </EuiFormRow>
                <EuiSpacer size="l"></EuiSpacer>
                </EuiForm>
                    <InvitationsManager courseId={courseId} thirdPartyKey={course.thirdPartyKey}></InvitationsManager>
                </EuiPageContentBody>
        </EuiPageContent>
    )
}
//TODO(henrik): Add more details
export default CourseDetail