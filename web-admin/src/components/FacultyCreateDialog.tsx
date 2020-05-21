import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from 'redux-query-react';

import * as formQueryConfigs from '../query-configs/forms';
import * as formsSelectors from '../selectors/forms';
import { Form } from 'ostseee-web-common';
import { createFaculty } from '../mutations/faculties';
import { EuiFieldText } from '@elastic/eui';
import { useState } from 'react';

const FacultyCreateDialog = props => {
    //@ts-ignore
const [{isPending},createFaculty2 ]= useMutation((name)=>{return createFaculty(name)});
const [name, setName] = useState('');
  const createFac= ()=>{
    
  }
  const Forms = useSelector(formsSelectors.getForms);
    console.log(Forms);
  return (
    <>
    <EuiFieldText placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
    <button onClick={()=>createFaculty2(name)}>Erstell mich</button>
    </>
  );
};

export default FacultyCreateDialog;