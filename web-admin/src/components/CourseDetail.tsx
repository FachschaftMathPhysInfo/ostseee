
import { useParams } from "react-router"
import React from "react";
import { useRequest } from "redux-query-react";
import { courseGet } from "../query-configs/courses";
import { useSelector } from 'react-redux'
import { Course } from "ostseee-web-common";
import { EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle, EuiPageContentBody, EuiText, EuiTextAlign } from "@elastic/eui";
import ModuleDisplay from "./ModuleDisplay";
import TermDisplay from "./TermDisplay";
import CourseProfsDisplay from "./CourseProfsDisplay";
import FormDisplay from "./FormDisplay";
const CourseDetail = props => {
    let { courseId } = useParams();
    const [{ isPending }] = useRequest(courseGet(courseId));
    const course: Course = useSelector(state => state.entities.Course)
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
                        <h1><ModuleDisplay id={course.moduleId}></ModuleDisplay> im <code><TermDisplay id={course.termId}></TermDisplay></code></h1>
                    </EuiTitle>
                    <EuiTitle >
                        <h2>bei <CourseProfsDisplay id={course.id}></CourseProfsDisplay></h2>
                    </EuiTitle>
                </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiTextAlign textAlign="left">
                    <b># Students:</b><code>{course.numberOfStudents}</code><br></br>
                    <b>Form:</b><FormDisplay id={course.formId}></FormDisplay>
                    
                    </EuiTextAlign></EuiPageContentBody>
        </EuiPageContent>
    )
}
//TODO(henrik): Add more details
export default CourseDetail