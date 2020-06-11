import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment, useState } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { Question } from 'ostseee-web-common';
import {useSelector} from "react-redux"
import { getLanguage } from '../../selectors/language';
import { EuiSpacer } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { EuiCheckbox } from '@elastic/eui';
const SelectQuestion = props => {
  const question : Question = props.question
  const languageCode = useSelector(getLanguage)
  let options = question.options.map(option=>{
    return {
      value: option.value,
    inputDisplay: (<EuiText>{option.label[languageCode]}</EuiText>),
    }
  })
  let [seleted, setSelected] = useState(null);

  const [checked, setChecked]= useState(false);
  return (
   <>
     <EuiSuperSelect fullWidth
      options={options}
      valueOfSelected={seleted}
      onChange={(option)=>setSelected(option)}
      disabled={checked}
    />
    <EuiSpacer size="m"></EuiSpacer>{
      question.hasNotApplicableOption?
    <EuiCheckbox
        id={htmlIdGenerator()()}
        label={{"de":"keine Angabe","en":"n.a."}[languageCode]}
        checked={checked}
        //@ts-ignore
        onChange={e => {setChecked(e.target.checked);setSelected('')}}
      />:<></>}
    </>
  );
};

export default SelectQuestion;