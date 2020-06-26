import { useParams, useHistory } from "react-router"
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import './Prof.css';
import { editTerm } from "../mutations/terms";
import { Term } from "ostseee-web-common";
import TermEditor from "./TermEditor";

const TermEdit = props => {
    
    let {termId} = useParams();
    const [{ isPending }] = useRequest(termQueryConfigs.termGet(termId));
    const term: Term = useSelector(termSelectors.getTerm(termId));
    console.log(term)
    const history=useHistory()

    if (isPending) return (<>Lade</>)
    return (
        <>
        <TermEditor term={term||{}} onComplete={()=>history.goBack()}></TermEditor>
    </>
)
    
}
export default TermEdit