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
import translate from '../../lib/translate';
import { EuiRadio } from '@elastic/eui';
const SingleChoiceQuestion = props => {
  const question:Question = props.question
  const languageCode = useSelector(getLanguage)
  const options = question.options.map(opt=>{
    return {
      id:`${opt.id}:${props.concerns}`,
      label:translate(opt.label,languageCode)
    }
  })
  const [isOtherVisible, setIsOtherVisible] = useState(false);
  const answerid = useSelector(getAnswer(question.id,props.concerns))
  const answer = `${question.options.filter(o=>`${o.value}`==answerid.values[0])[0]?.id}:${props.concerns}`
  console.log(answer)
  const dispatch = useDispatch()
  const setSelected=(qid,concerns)=>(option:string)=>{
    console.log(qid,concerns,option)
    const val = question.options.filter((opt)=>opt.id==option.split(':')[0])[0].value
    setIsOtherVisible(val === question.options.length-1 && question.hasOtherOption) //shows extra text field if other option was selected and hides it if its unselected 
    dispatch(changeAnswer(props.sectionId,qid,concerns,[`${val}`]))
  }
  const notApplicable = (notApp)=>{
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,[""],notApp))
  }
  const checked = answerid?.notApplicable
  const prof = props.prof
  const onChange = other => {
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,[other]))
  };

  return (
    <>
    <h3><b>{prof?.lastname}</b></h3>
    {prof!=null?<EuiSpacer size="s"></EuiSpacer>:<></>}
     <EuiRadioGroup 
     disabled={checked}
      options={options}
      idSelected={answer}
      onChange={setSelected(question.id,props.concerns)}
      name={`${question.id}:${props.concerns}`}
      
    />

    {question.hasOtherOption && <>
    <EuiSpacer size="m"></EuiSpacer>
    <EuiRadio onChange={e=>onChange(translate({"de":"sonstiges","en":"other"},languageCode))} checked={(answer==`undefined:${props.concerns}`&&answerid.values!="")||false}
    label={(<EuiFieldText 
      id={`${question.id}:${props.concerns}other`}
      placeholder={translate({"de": "Bitte Sonstiges spezifizieren","en": "Please specify other option"},languageCode)}
      onChange={e=>onChange(e.target.value)}
      value={answer==`undefined:${props.concerns}`?(answerid.values[0]||""):""}
    />)}
    >
      </EuiRadio></>}

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

export default SingleChoiceQuestion;