import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import { getModule } from '../selectors/modules';
import EuiCustomLink from '../EuiCustomLink';
import { Module } from 'ostseee-web-common';
import { termGet } from '../query-configs/terms';
import { moduleGet } from '../query-configs/modules';
const ModuleDisplay = ({id})=>{
    const [data, second] = useRequest(moduleGet(id));
    const module :Module= useSelector(getModule(id))
    if(data.isPending||module==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/modules/${id}`}>{module.name}</EuiCustomLink>
    )
}
export default ModuleDisplay