import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import EuiCustomLink from '../EuiCustomLink';
import { Faculty } from 'ostseee-web-common';
import { facultyGet } from '../query-configs/faculties';
import { getFaculty } from '../selectors/faculties';

const FacultyDisplay = ({id})=>{
    const [data, second] = useRequest(facultyGet(id));
    const faculty : Faculty= useSelector(getFaculty(id))
    if(data.isPending||faculty==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/faculties/${id}`}>{faculty.name}</EuiCustomLink>
    )
}
export default FacultyDisplay