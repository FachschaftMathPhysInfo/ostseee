import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton } from "@elastic/eui";
import { newModule } from "../mutations/modules";
import { Module } from "ostseee-web-common";
import ModuleEditor from "./ModuleEditor";

const ModuleNew = props => {
    
    const history=useHistory()

    return (
        <>
            <ModuleEditor onComplete={()=>history.goBack()}></ModuleEditor>
        </>
    )
    
}
export default ModuleNew