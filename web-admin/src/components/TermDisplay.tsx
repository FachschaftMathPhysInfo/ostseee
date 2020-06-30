import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import { moduleGet } from '../query-configs/modules';
import { getModule } from '../selectors/modules';
import EuiCustomLink from '../EuiCustomLink';
import { Module } from 'ostseee-web-common';
import { getTerm } from '../selectors/terms';
import { termGet } from '../query-configs/terms';
const TermDisplay = ({termId})=>{
    const [data, second] = useRequest(termGet(termId));
    const term :Module= useSelector(getTerm(termId))
    if(data.isPending){
        return (<>Loading</>)
    }
    if(term==undefined){
        return <>No such term</>
    }
    return (
    <EuiCustomLink to={`/terms/${termId}`}>{term.name}</EuiCustomLink>
    )
}
export default TermDisplay