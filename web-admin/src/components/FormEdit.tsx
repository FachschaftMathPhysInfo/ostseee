import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import './Prof.css';
import { Term } from "ostseee-web-common";

const FormEdit = props => {
    
    let {formId} = useParams();
    const history=useHistory()

    return (
        <>
        Forms can't be edited.
    </>
)
    
}
export default FormEdit