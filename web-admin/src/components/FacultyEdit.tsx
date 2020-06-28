import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as facultyQueryConfigs from '../query-configs/faculties';
import * as facultySelectors from '../selectors/faculties';
import './Prof.css';
import { Faculty } from "ostseee-web-common";
import FacultyEditor from "./FacultyEditor";

const FacultyEdit = props => {
    
    let {facultyId} = useParams();
    const [{ isPending }] = useRequest(facultyQueryConfigs.facultyGet(facultyId));
    const faculty: Faculty = useSelector(facultySelectors.getFaculty(facultyId));
    const history=useHistory()

    if (isPending) return (<>Lade</>)
    return (
        <>
        <FacultyEditor faculty={faculty||{}} onComplete={()=>history.goBack()}></FacultyEditor>
    </>
)
    
}
export default FacultyEdit