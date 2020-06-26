import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as courseQueryConfigs from '../query-configs/courses';
import * as courseSelectors from '../selectors/courses';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton } from "@elastic/eui";
import { newCourse } from "../mutations/courses";
import { Course } from "ostseee-web-common";
import CourseEditor from "./CourseEditor";

const CourseEdit = props => {
    
    let {courseId} = useParams();
    const [{ isPending }] = useRequest(courseQueryConfigs.courseGet(courseId));
    const course: Course = useSelector(courseSelectors.getCourse(courseId));
    const history=useHistory()

    if (isPending||course===undefined) return (<>Lade</>)

    return (
        <>
            <CourseEditor course={course} onComplete={()=>history.goBack()}></CourseEditor>
        </>
    )
    
}
export default CourseEdit