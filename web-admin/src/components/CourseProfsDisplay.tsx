import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import EuiCustomLink from '../EuiCustomLink';
import { Module, CourseProf } from 'ostseee-web-common';
import { courseprofsByCourseGet } from '../query-configs/courseprofs';
import { getCourseProfsByCourse } from '../selectors/courseprofs';
import ProfDisplay from './ProfDisplay';
const CourseProfsDisplay = ({id})=>{
    const [data, second] = useRequest(courseprofsByCourseGet(id));
    const CourseProfs :Array<CourseProf>= useSelector(getCourseProfsByCourse(id))
    if(data.isPending||CourseProfs==undefined){
        return (<></>)
    }
    return (
       <> {CourseProfs.map(cp=><><ProfDisplay key={cp.id} id={cp.profId}></ProfDisplay> </>)}
    
    </>)
}
export default CourseProfsDisplay