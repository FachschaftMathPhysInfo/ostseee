import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"
import React from "react"
import { profsGet } from "ostseee-web-common"
import { getTerms } from "../selectors/terms"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { termsGet } from "../query-configs/terms"

const TermSelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(termsGet())
    const terms = useSelector(getTerms)
    const options = terms.map(opt=>{return {
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
export default TermSelect