import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiForm, EuiFormRow, EuiFieldText, EuiCheckbox, EuiButton } from "@elastic/eui";
import { editProf } from "../mutations/profs";
import { Prof } from "ostseee-web-common";
import ProfEditor from "./ProfEditor";

const ProfNew = props => {
    
    const history=useHistory()

    return (
        <>
            <ProfEditor onComplete={()=>history.goBack()}></ProfEditor>
        </>
    )
    
}
export default ProfNew