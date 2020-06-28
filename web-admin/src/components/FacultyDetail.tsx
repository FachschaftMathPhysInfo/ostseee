import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as facultyQueryConfigs from '../query-configs/faculties';
import * as facultySelectors from '../selectors/faculties';
import './Prof.css';
import { EuiButton } from "@elastic/eui";

const FacultyDetail = props => {
    
    let {facultyId} = useParams();
    const [data, second] = useRequest(facultyQueryConfigs.facultyGet(facultyId));
    const Faculty = useSelector(facultySelectors.getFaculty(facultyId))
    console.log(Faculty); 
    const history = useHistory()
    if(Faculty){
        return (
            <>
                <table style={{textAlign:'left', margin:50}}>
                    <tr>
                        <td><b>Fakultätsname: </b></td>
                        <td>{Faculty.name}</td>
                    </tr>
                </table>
                <EuiButton iconType="pencil" onClick={()=>history.push(`/faculties/${Faculty.id}/edit`)}>Bearbeiten</EuiButton>
            </>
        )
    }
    else{
        return (
            <p>Diese Fakultät wurde nicht gefunden.</p>
        )
    }
    
}
export default FacultyDetail