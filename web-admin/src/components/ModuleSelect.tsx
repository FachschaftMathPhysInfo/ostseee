import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"
import React from "react"
import { profsGet } from "ostseee-web-common"
import { getModules } from "../selectors/modules"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { modulesGet } from "../query-configs/modules"

const ModuleSelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(modulesGet())
    const modules = useSelector(getModules)
    const options = modules.map(opt=>{return {
        value:opt.id,
        inputDisplay:opt.name
    }})
    if(isPending){
        return <>Loading</>
    }
    return (<><EuiSuperSelect
        options={options}
        valueOfSelected={props.id}
        onChange={value => onChange(value)}
        append={[<EuiButtonIcon iconType="refresh" onClick={()=>refresh()}></EuiButtonIcon>]}
        >

    </EuiSuperSelect></>)
}
export default ModuleSelect