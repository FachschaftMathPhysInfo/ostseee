import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"
import React, { useState } from "react"
import { profsGet } from "ostseee-web-common"
import { getModules } from "../selectors/modules"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { modulesGet } from "../query-configs/modules"

const ModuleSelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(modulesGet())
    const [id, setid] = useState(props.id)
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
        valueOfSelected={id}
        onChange={value =>{ setid(value);onChange(value)}}
        append={[<EuiButtonIcon iconType="refresh" aria-label="Refresh" onClick={()=>refresh()}></EuiButtonIcon>]}
        >

    </EuiSuperSelect></>)
}
export default ModuleSelect