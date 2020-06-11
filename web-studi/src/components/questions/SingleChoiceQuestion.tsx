import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment, useState } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiCheckbox } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { Question } from 'ostseee-web-common';
import { getLanguage } from '../../selectors/language';
import {useSelector} from 'react-redux'
const SingleChoiceQuestion = props => {
  const question:Question = props.question
  const languageCode = useSelector(getLanguage)
  const options = question.options.map(opt=>{
    return {
      id:`${opt.value}`,
      label:opt.label[languageCode]
    }
  })
  const [selected, setSelected]= useState('');
  const [checked, setChecked]= useState(false);
  return (
    <>
     <EuiRadioGroup 
     disabled={checked}
      options={options}
      idSelected={selected}
      onChange={(option)=> setSelected(option)}
      name="radio group"
      
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

export default SingleChoiceQuestion;