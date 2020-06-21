import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import { getProf } from '../selectors/profs';
import EuiCustomLink from '../EuiCustomLink';
import { Prof } from 'ostseee-web-common';
import { profGet } from '../query-configs/profs';
const ProfDisplay = ({id})=>{
    const [data, second] = useRequest(profGet(id));
    const prof :Prof= useSelector(getProf(id))
    if(data.isPending||prof==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/profs/${id}`}>{prof.lastname}</EuiCustomLink>
    )
}
export default ProfDisplay