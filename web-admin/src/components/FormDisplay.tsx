import {useRequest} from 'redux-query-react'
import {useSelector} from 'react-redux'
import * as React from 'react';
import EuiCustomLink from '../EuiCustomLink';
import {  Form } from 'ostseee-web-common';
import { formGet } from '../query-configs/forms';
import { getForm } from '../selectors/forms';

const FormDisplay = ({formId})=>{
    const [data, second] = useRequest(formGet(formId));
    const form :Form= useSelector(getForm(formId))
    if(data.isPending||form==undefined){
        return (<>Loading</>)
    }
    return (
    <EuiCustomLink to={`/forms/${formId}`}>{form.name}</EuiCustomLink>
    )
}
export default FormDisplay