
import { useParams } from "react-router"
import React, { useState } from "react";
import { useRequest, useMutation } from "redux-query-react";
import { courseGet } from "../query-configs/courses";
import { useSelector } from 'react-redux'
import { Course } from "ostseee-web-common";
import { EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle, EuiPageContentBody, EuiText, EuiTextAlign, EuiDatePickerRange, EuiDatePicker, EuiButton, EuiCode, EuiFieldText, EuiFormRow } from "@elastic/eui";
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
const CourseDetail = props => {
    let { courseId } = useParams();
    const [{ isPending }] = useRequest(courseGet(courseId));
    const course: Course = useSelector(getCourse(courseId))
    //@ts-ignore
    const [{ isPending: isPending2, status }, getInvitations] = useMutation((begin, end) => { return invitationGet(courseId, begin, end) });
    const [beginDate,handleChangeBegin] = useState(moment());

    const [endDate,handleChangeEnd] = useState(moment().add(11,'d'));
    const invitations = useSelector(state=>(state.entities.InvitationById||{})[courseId])||[]
    //@ts-ignore
    var invs: InvitationList= {}
    const [baseUrl, setbaseUrl] = useState("https://eval.mathphys.info/questionaire/")
   
    if (isPending) {
        return (<>Loading</>)
    }
    if (course == undefined) {
        return <>course</>
    }
    invs.baseUrl = baseUrl
    invs.invitations = invitations.map(i=>i.id)
    invs.begin= beginDate.toISOString()
    invs.end = endDate.toISOString()
    invs.thirdPartyKey= course.thirdPartyKey
    return (
        <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                    <EuiTitle>
                        <h1><ModuleDisplay id={course.moduleId}></ModuleDisplay> im <code><TermDisplay termId={course.termId}></TermDisplay></code></h1>
                    </EuiTitle>
                    <EuiTitle >
                        <h2>bei <CourseProfsDisplay id={course.id}></CourseProfsDisplay></h2>
                    </EuiTitle>
                </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiTextAlign textAlign="left">
                    <b># Students:</b><code>{course.numberOfStudents}</code><br></br>
                    <b>Form:</b>
                    <EuiFormRow label="Zeitraum">
                    <EuiDatePickerRange
                        startDateControl={
                            <EuiDatePicker
                                selected={beginDate}
                                onChange={handleChangeBegin}
                                startDate={beginDate}
                                endDate={endDate}
                                isInvalid={beginDate > endDate}
                                aria-label="Start date"
                                showTimeSelect
                            />
                        }
                        endDateControl={
                            <EuiDatePicker
                                selected={endDate}
                                onChange={handleChangeEnd}
                                startDate={beginDate}
                                endDate={endDate}
                                isInvalid={beginDate >endDate}
                                aria-label="End date"
                                showTimeSelect
                            />
                        }
                    />
                    </EuiFormRow>
                    <EuiFormRow label="BaseURL">

                    <EuiFieldText type="url" value={baseUrl} onChange={(e)=>setbaseUrl(e.target.value)}></EuiFieldText>
                    </EuiFormRow>
                    <EuiButton onClick={(e)=>console.log(getInvitations(beginDate,endDate))}>Lade Invitations</EuiButton>
                    <EuiCode language="json">{JSON.stringify(invs)}</EuiCode>
                </EuiTextAlign></EuiPageContentBody>
        </EuiPageContent>
    )
}
//TODO(henrik): Add more details
export default CourseDetail