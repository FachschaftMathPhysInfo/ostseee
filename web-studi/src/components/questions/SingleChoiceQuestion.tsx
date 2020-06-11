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
import {useSelector, useDispatch} from 'react-redux'
import { getAnswer } from '../../selectors/answers';
import { changeAnswer } from '../../lib/store';
const SingleChoiceQuestion = props => {
  const question:Question = props.question
  const languageCode = useSelector(getLanguage)
  const options = question.options.map(opt=>{
    return {
      id:`${opt.value}`,
      label:opt.label[languageCode]
    }
  })
  const answer = useSelector(getAnswer(question.id,props.concerns))
  const dispatch = useDispatch()
  const setSelected= function(option){
    dispatch(changeAnswer(question.id,props.concerns,option))
  }
  const notApplicable = (notApp)=>{
    dispatch(changeAnswer(question.id,props.concerns,"",notApp))
  }
  const checked = answer.NotApplicable
  return (
    <>
     <EuiRadioGroup 
     disabled={checked}
      options={options}
      idSelected={answer.values}
      onChange={(option)=> setSelected(option)}
      name={question.id}
      
    />
    <EuiSpacer size="m"></EuiSpacer>{
      question.hasNotApplicableOption?
    <EuiCheckbox
        id={htmlIdGenerator()()}
        label={{"de":"keine Angabe","en":"n.a."}[languageCode]}
        checked={checked}
        //@ts-ignore
        onChange={e => {setChecked(e.target.checked);notApplicable(e.target.checked)}}
      />:<></>}
      </>
  );
};

export default SingleChoiceQuestion;