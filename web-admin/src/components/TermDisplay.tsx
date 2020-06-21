import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import { moduleGet } from '../query-configs/modules';
import { getModule } from '../selectors/modules';
import EuiCustomLink from '../EuiCustomLink';
import { Module } from 'ostseee-web-common';
import { getTerm } from '../selectors/terms';
import { termGet } from '../query-configs/terms';
const TermDisplay = ({id})=>{
    const [data, second] = useRequest(termGet(id));
    const term :Module= useSelector(getTerm(id))
    if(data.isPending||term==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/terms/${id}`}>{term.name}</EuiCustomLink>
    )
}
export default TermDisplay