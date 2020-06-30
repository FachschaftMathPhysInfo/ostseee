import * as React from 'react';
import { useState } from 'react';
import { EuiRange } from '@elastic/eui';
import { EuiCheckbox } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { Question } from 'ostseee-web-common';
import translate from '../../lib/translate';
import {useSelector, useDispatch} from 'react-redux'
import { getLanguage } from '../../selectors/language';
import { getAnswer } from '../../selectors/answers';
import { changeAnswer } from '../../lib/store';
import { EuiRangeTick } from '@elastic/eui/src/components/form/range/range_ticks';
import { EuiIcon } from '@elastic/eui';
import { EuiIconTip } from '@elastic/eui';

const SliderQuestion = props => {
  
  const question:Question = props.question
  const languageCode = useSelector(getLanguage)
  const options: EuiRangeTick[] = question.options.map((opt,index)=>{
    return {
      id:`${opt.id}:${props.concerns}`,
      label:translate(opt.label,languageCode),
      value: opt.value,
    }
  }).sort((a,b) => {return a.value - b.value})
  let min: number,max=0
  if(options.length>0)
   {
     min = options[0].value
     max = options[options.length-1].value
   }
  const answerid = useSelector(getAnswer(question.id,props.concerns))
  //console.log(answerid)
  const dispatch = useDispatch()
  const setSelected=(qid,concerns)=>(event)=>{
    console.log(qid,concerns,event.target.value)
    dispatch(changeAnswer(props.sectionId,qid,concerns,[`${event.target.value}`])) 
  }
  const notApplicable = (notApp)=>{
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,[""],notApp))
  }
  const checked = answerid?.notApplicable
  const prof = props.prof
  console.log(answerid)
  return (
    <>
    <h3><b>{prof?.lastname}</b></h3>
    {prof!=null?<EuiSpacer size="s"></EuiSpacer>:<></>}
   <EuiRange fullWidth value={parseInt(answerid.values[0]||0)} isInvalid={answerid.values==""} showTicks  disabled={checked} 
        min={min} 
        max={max}
        ticks={options}
        onChange={setSelected(question.id,props.concerns)}
    />
    <>{answerid.values===""&&<EuiIconTip
        type="alert"
        size="xl"
        color="warning"
          content={translate({"de":"Bitte Wert auswählen","en":"Please select a value"},languageCode)}
          position="bottom"
  />}</>
    <EuiSpacer size="m"></EuiSpacer>{
      question.hasNotApplicableOption?
      <EuiCheckbox
          id={htmlIdGenerator()()}
          label={translate({"de":"keine Angabe","en":"n.a."},languageCode)}
          checked={checked}
          //@ts-ignore
          onChange={e => {notApplicable(e.target.checked)}}
        />:<></>}
  </>);
};

export default SliderQuestion;