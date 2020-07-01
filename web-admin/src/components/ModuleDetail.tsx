import { useParams, useHistory } from "react-router"
import React from "react";
import { useRequest } from "redux-query-react";
import {useSelector} from "react-redux";
import { getModule } from "../selectors/modules";
import { moduleGet } from "../query-configs/modules";
import { Module } from "ostseee-web-common";
import FacultyDisplay from "./FacultyDisplay";
import { EuiButton } from "@elastic/eui";

const ModuleDetail = props => {

    let {moduleId} = useParams();
    const [{ isPending }] = useRequest(moduleGet(moduleId));
    const module : Module = useSelector(getModule(moduleId));
    const history= useHistory();
    if(isPending) return (<>Loading</>)
    if(module==undefined) return (<>Form not found</>)
    return (
        <>
            <table style={{textAlign:'left', margin:50}}>
                <tr>
                    <td><b>Modul: </b></td>
                    <td>{module.name}</td>
                </tr>
                <tr>
                    <td><b>Beschreibung: </b></td>
                    <td>{module.description}</td>
                </tr>
                <tr>
                    <td><b>Fakultät: </b></td>
                    <td><FacultyDisplay id={module.facultyId}></FacultyDisplay></td>
                </tr>
            </table>
            <EuiButton iconType="pencil" onClick={()=>history.push(`/modules/${module.id}/edit`)}>Bearbeiten</EuiButton>
        </>
    )
}
export default ModuleDetail