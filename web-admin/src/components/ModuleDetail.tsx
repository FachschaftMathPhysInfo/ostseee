import { useParams, useHistory } from "react-router"
import React from "react";
import { useRequest } from "redux-query-react";
import { useSelector } from "react-redux";
import { getModule } from "../selectors/modules";
import { moduleGet } from "../query-configs/modules";
import { Module } from "ostseee-web-common";
import FacultyDisplay from "./FacultyDisplay";
import { EuiButton, EuiDescriptionList, EuiPageContent, EuiPageContentBody, EuiPageContentHeader, EuiPageContentHeaderSection } from "@elastic/eui";

const ModuleDetail = props => {

    let { moduleId } = useParams();
    const [{ isPending }] = useRequest(moduleGet(moduleId));
    const module: Module = useSelector(getModule(moduleId));
    const history = useHistory();
    if (isPending) return (<>Loading</>)
    if (module == undefined) return (<>Module not found</>)
    const moduleAsList = [{ title: "Name", description: module.name },    , { title: "Description", description: module.description }
    ,{
        title: "Faculty", description: (<FacultyDisplay facultyId={module.facultyId}></FacultyDisplay>)
    }
     ]
    return (
        <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>Modul</EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection> <EuiButton iconType="pencil" onClick={() => history.push(`/modules/${module.id}/edit`)}>Bearbeiten</EuiButton>
           </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
            <EuiDescriptionList textStyle="reverse" listItems={moduleAsList} />
            </EuiPageContentBody>
        </EuiPageContent>
    )
}
export default ModuleDetail