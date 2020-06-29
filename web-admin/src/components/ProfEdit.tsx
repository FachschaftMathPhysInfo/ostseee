import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { Prof } from "ostseee-web-common";
import ProfEditor from "./ProfEditor";

const ProfEdit = props => {
    
    let {profId} = useParams();
    const [{ isPending }] = useRequest(profQueryConfigs.profGet(profId));
    const prof: Prof = useSelector(profSelectors.getProf(profId));
    console.log(prof)
    const history=useHistory()

    if (isPending) return (<>Lade</>)
    return (
        <>
        <ProfEditor prof={prof||{}} onComplete={()=>history.goBack()}></ProfEditor>
    </>
)
    
}
export default ProfEdit