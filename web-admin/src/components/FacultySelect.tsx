import { EuiSuperSelect, EuiButtonIcon } from "@elastic/eui"
import React, { useState } from "react"
import { profsGet } from "ostseee-web-common"
import { getFaculties } from "../selectors/faculties"
import {useSelector} from "react-redux"
import { useRequest } from "redux-query-react"
import { facultiesGet } from "../query-configs/faculties"

const FacultySelect = props =>{
    const onChange =props.onChange||((e)=>{console.log(e);})
    const  [{ isPending, status }, refresh] = useRequest(facultiesGet())
    const facultys = useSelector(getFaculties)
    const [id, setid] = useState(props.facultyId)
    const options = facultys.map(opt=>{return {
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
export default FacultySelect