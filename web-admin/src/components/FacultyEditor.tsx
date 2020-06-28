import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from 'redux-query-react';

import { Faculty } from 'ostseee-web-common';
import { editFaculty, newFaculty } from '../mutations/faculties';
import { EuiFieldText, EuiButton, EuiForm, EuiFormRow } from '@elastic/eui';
import { useState } from 'react';

const FacultyEditor = props => {
    //@ts-ignore
  const faculty: Faculty = props.faculty;
  console.log(faculty);
  const [name, setName] = useState(faculty?.name||'');
  //@ts-ignore
  const [{isPending,isFinished,status},submit]=useMutation((name)=>props.faculty?editFaculty(faculty.id, name):newFaculty(name))
    
  if (isFinished&&status==200){
    props.onComplete()
}
//TODO: fehlerfälle müssen noch abgefangen werden und dem User mitgeteilt werden.

  return (
    <>
    <EuiForm component="form" style={{padding: 30}}>
      <EuiFormRow label="Offizieller Fakultätsname">
        <EuiFieldText placeholder="Fakultätsname" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
      </EuiFormRow>
      <EuiButton fill onClick={()=> {submit(name);}} disabled={isPending}>Aktualisieren</EuiButton>
      </EuiForm>
    </>
  );
};

export default FacultyEditor;