import React from "react"
import { profsGet } from "ostseee-web-common"
import { getForms } from "../selectors/forms"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { formsGet } from "../query-configs/forms"
import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"

const FormSelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(formsGet())
    const forms = useSelector(getForms)
    const options = forms.map(opt=>{return {
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
export default FormSelect