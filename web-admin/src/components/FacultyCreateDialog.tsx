import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from 'redux-query-react';

import * as formQueryConfigs from '../query-configs/forms';
import * as formsSelectors from '../selectors/forms';
import { Form } from 'ostseee-web-common';
import { createFaculty } from '../mutations/faculties';
import { EuiFieldText, EuiButton, EuiForm, EuiFormRow } from '@elastic/eui';
import { useState } from 'react';
import { useHistory } from 'react-router';

const FacultyCreateDialog = props => {
    //@ts-ignore
const [{isPending},createFaculty2 ]= useMutation((name)=>{return createFaculty(name)});
const [name, setName] = useState('');
  
const history = useHistory();

  return (
    <>
    <EuiForm component="form" style={{padding: 30}}>
      {isPending}
      <EuiFormRow label="Offizieller Fakultätsname">
        <EuiFieldText placeholder="Fakultätsname" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
      </EuiFormRow>
        <EuiButton fill onClick={()=> {createFaculty2(name); history.push("/faculties");}} disabled={isPending}>Erstellen</EuiButton>
      </EuiForm>
    </>
  );
};

export default FacultyCreateDialog;