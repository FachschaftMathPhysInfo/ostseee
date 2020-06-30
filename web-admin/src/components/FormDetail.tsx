import { useParams, useHistory } from "react-router"
import React from "react";
import { formGet } from "../query-configs/forms";
import { useRequest } from "redux-query-react";
import {useSelector} from "react-redux";
import { getForm } from "../selectors/forms";
import { Form } from "ostseee-web-common";
import TermDisplay from "./TermDisplay";
import { EuiButton } from "@elastic/eui";
const FormDetail = props => {
    let {formId} = useParams();
    const [{ isPending }] = useRequest(formGet(formId));
    const form :Form = useSelector(getForm(formId));
    const history= useHistory();
    if(isPending) return (<>Loading</>)
    if(form==undefined) return (<>Form not found</>)
    return (
        <>
        <>
                <table style={{textAlign:'left', margin:50}}>
                    <tr>
                        <td><b>Form: </b></td>
                        <td>{form.name}</td>
                    </tr>
                    <tr>
                        <td><b>Semester: </b></td>
                        <td><TermDisplay termId={form.termId}></TermDisplay></td>
                    </tr>
                </table>
                <EuiButton iconType="pencil" onClick={()=>history.push(`/forms/${form.id}/edit`)}>Bearbeiten</EuiButton>
            </>
        </>
    )
}
export default FormDetail