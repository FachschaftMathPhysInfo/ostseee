import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiCheckboxGroup } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { Question } from 'ostseee-web-common';
import { getLanguage } from '../../selectors/language';
import {useSelector, useDispatch} from 'react-redux'
import { getAnswer } from '../../selectors/answers';
import { changeAnswer } from '../../lib/store';
import { EuiSpacer } from '@elastic/eui';
import translate from '../../lib/translate';
const MultipleChoiceQuestion = props => {
  const question : Question = props.question
  const languageCode = useSelector(getLanguage)
  const options = question.options.map(opt=>{return {
    label: translate(opt.label,languageCode),
    id:  `${opt.id}:${props.concerns}`
  }})
  const answer = useSelector(getAnswer(question.id,props.concerns))||{values:[]}
  let checkboxIdToSelectedMap={}
  question.options.forEach(option=>{
    checkboxIdToSelectedMap[`${option.id}:${props.concerns}`] = answer.values.includes(`${option.value}`)
  })
  const dispatch = useDispatch()
  const onChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    let newValue =[]
    question.options.forEach((opt)=>{if(newCheckboxIdToSelectedMap[`${opt.id}:${props.concerns}`]){
      newValue.push(`${opt.value}`)
    }})
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,newValue))
  };
  const prof = props.prof
  return (
   <>
   <h3><b>{prof?.lastname}</b></h3>
    {prof!=null?<EuiSpacer size="s"></EuiSpacer>:<></>}
     <EuiCheckboxGroup 
      options={options
      }
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={(option)=> onChange(option)}
    />
  </>
  );
};

export default MultipleChoiceQuestion;