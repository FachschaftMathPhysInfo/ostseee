import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton } from "@elastic/eui";
import { newCourse } from "../mutations/courses";
import { Course } from "ostseee-web-common";
import CourseEditor from "./CourseEditor";

const CourseNew = props => {
    
    const history=useHistory()

    return (
        <>
            <CourseEditor onComplete={()=>history.goBack()}></CourseEditor>
        </>
    )
    
}
export default CourseNew