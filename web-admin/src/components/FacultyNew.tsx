// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import { useRequest, useMutation } from 'redux-query-react';

// import * as formQueryConfigs from '../query-configs/forms';
// import * as formsSelectors from '../selectors/forms';
// import { Faculty } from 'ostseee-web-common';
// import { createFaculty } from '../mutations/faculties';
// import { EuiFieldText, EuiButton, EuiForm, EuiFormRow } from '@elastic/eui';
// import { useState } from 'react';
// import { useHistory } from 'react-router';

// const FacultyNew = props => {
//     //@ts-ignore
// const [{isPending, status},createFaculty2 ]= useMutation((name)=>{return createFaculty(name)});
// const [name, setName] = useState('');
  
// const history = useHistory();
// if(status === 200 || status === 204){
//   history.push("/faculties");
// }
// //TODO: fehlerfälle müssen noch abgefangen werden und dem User mitgeteilt werden.

//   return (
//     <>
//     <EuiForm component="form" style={{padding: 30}}>
//       <EuiFormRow label="Offizieller Fakultätsname">
//         <EuiFieldText placeholder="Fakultätsname" value={name} onChange={(e)=>setName(e.target.value)}></EuiFieldText>
//       </EuiFormRow>
//         <EuiButton fill onClick={()=> {createFaculty2(name);}} disabled={isPending}>Erstellen</EuiButton>
//       </EuiForm>
//     </>
//   );
// };

// export default FacultyNew;

import { useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest, useMutation } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import FacultyEditor from "./FacultyEditor";

const FacultyNew = props => {
    
    const history=useHistory()

    return (
        <>
            <FacultyEditor onComplete={()=>history.goBack()}></FacultyEditor>
        </>
    )
    
}
export default FacultyNew