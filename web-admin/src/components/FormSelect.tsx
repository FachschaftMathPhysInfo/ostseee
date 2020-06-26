import React, { useState } from "react"
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
    const [id, setid] = useState(props.formId)
    const options = forms.map(opt=>{return {
        value:opt.id,
        inputDisplay:opt.name
    }})
    if(isPending||id===undefined){
        return <>Loading</>
    }
    return (<><EuiSuperSelect
        options={options}
        valueOfSelected={id}
        onChange={value => {setid(value);onChange(value)}}
        append={[<EuiButtonIcon iconType="refresh" onClick={()=>refresh()} aria-label="Refresh"></EuiButtonIcon>]}
        >

    </EuiSuperSelect></>)
}
export default FormSelect