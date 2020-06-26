import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"
import React, { useState } from "react"
import { profsGet } from "ostseee-web-common"
import { getTerms } from "../selectors/terms"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { termsGet } from "../query-configs/terms"

const TermSelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(termsGet())
    const terms = useSelector(getTerms)
    const [id, setid] = useState(props.id)
    const options = terms.map(opt=>{return {
        value:opt.id,
        inputDisplay:opt.name
    }})
    if(isPending){
        return <>Loading</>
    }
    return (<><EuiSuperSelect
        options={options}
        valueOfSelected={id}
        onChange={value => {setid(value);onChange(value)}}
        append={[<EuiButtonIcon iconType="refresh" onClick={()=>refresh()}></EuiButtonIcon>]}
        >

    </EuiSuperSelect></>)
}
export default TermSelect