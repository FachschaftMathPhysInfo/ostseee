import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import EuiCustomLink from '../EuiCustomLink';
import {  Form } from 'ostseee-web-common';
import { formGet } from '../query-configs/forms';
import { getForm } from '../selectors/forms';
const FormDisplay = ({id})=>{
    const [data, second] = useRequest(formGet(id));
    const form :Form= useSelector(getForm(id))
    if(data.isPending||form==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/forms/${id}`}>{form.name}</EuiCustomLink>
    )
}
export default FormDisplay