import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as moduleQueryConfigs from '../query-configs/modules';
import * as moduleSelectors from '../selectors/modules';
import './Prof.css';
import { Module } from "ostseee-web-common";
import ModuleEditor from "./ModuleEditor";

const ModuleEdit = props => {
    
    let {moduleId} = useParams();
    const [{ isPending }] = useRequest(moduleQueryConfigs.moduleGet(moduleId));
    const module: Module = useSelector(moduleSelectors.getModule(moduleId));
    console.log(module)
    const history=useHistory()

    if (isPending) return (<>Lade</>)
    return (
        <>
        <ModuleEditor module={module||{}} onComplete={()=>history.goBack()}></ModuleEditor>
    </>
)
    
}
export default ModuleEdit