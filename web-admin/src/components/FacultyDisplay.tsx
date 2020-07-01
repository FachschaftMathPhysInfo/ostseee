import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import EuiCustomLink from '../EuiCustomLink';
import { Faculty } from 'ostseee-web-common';
import { facultyGet } from '../query-configs/faculties';
import { getFaculty } from '../selectors/faculties';

const FacultyDisplay = ({facultyId})=>{
    const [data, second] = useRequest(facultyGet(facultyId));
    const faculty : Faculty= useSelector(getFaculty(facultyId))
    if(data.isPending){
        return (<>Loading</>)
    }
    if(faculty==undefined){
        return (<>Faculty error</>)
    }
    return (
    <EuiCustomLink to={`/faculties/${facultyId}`}>{faculty.name}</EuiCustomLink>
    )
}
export default FacultyDisplay