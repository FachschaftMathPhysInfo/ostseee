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
import {useSelector, useDispatch} from "react-redux"
import { getLanguage } from '../../selectors/language';
import { EuiSpacer } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { EuiCheckbox } from '@elastic/eui';
import { changeAnswer } from '../../lib/store';
import { getAnswer } from '../../selectors/answers';
import translate from '../../lib/translate';
const SelectQuestion = props => {
  const question : Question = props.question
  const languageCode = useSelector(getLanguage)
  let options = question.options.map(option=>{
    return {
      value: `${option.value}`,
    inputDisplay: (<EuiText>{translate(option.label,languageCode)}</EuiText>),
    }
  })
  
  const dispatch = useDispatch()
  const setSelected=(qid,concerns)=>(option:string)=>{
    console.log(qid,concerns,option)
    const val = option
    dispatch(changeAnswer(props.sectionId, qid,concerns,[val]))
  }
  const answer = useSelector(getAnswer(question.id,props.concerns))
  const selected = answer.values[0]
  const checked = answer.notApplicable
  const notApplicable = (notApp)=>{
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,[],notApp))
  }
  const prof = props.prof
  return (
   <>
   <h3><b>{prof?.lastname}</b></h3>
    {prof!=null?<EuiSpacer size="s"></EuiSpacer>:<></>}
     <EuiSuperSelect fullWidth
      options={options}
      valueOfSelected={selected}
      onChange={setSelected(question.id,props.concerns)}
      disabled={checked}
    />
    <EuiSpacer size="m"></EuiSpacer>{
      question.hasNotApplicableOption?
    <EuiCheckbox
        id={htmlIdGenerator()()}
        label={translate({"de":"keine Angabe","en":"n.a."},languageCode)}
        checked={checked}
        //@ts-ignore
        onChange={e => {notApplicable(e.target.checked)}}
      />:<></>}
    </>
  );
};

export default SelectQuestion;