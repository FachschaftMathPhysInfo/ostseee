import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { getLanguage } from '../../selectors/language';
import {useDispatch,useSelector} from 'react-redux'
import { Question } from 'ostseee-web-common';
import { getAnswer } from '../../selectors/answers';
import { changeAnswer } from '../../lib/store';
import { EuiSpacer } from '@elastic/eui';
const CommentQuestion = props => {
  const question : Question = props.question
  const languageCode = useSelector(getLanguage)
  const answer = useSelector(getAnswer(question.id,props.concerns))||{values:[""]}
  const val = answer.values[0]
  const dispatch = useDispatch()
  const onChange = text => {
    dispatch(changeAnswer(props.sectionId,question.id,props.concerns,[text]))
  };
  const prof = props.prof
  return (
    <>
    <h3><b>{prof?.lastname}</b></h3>
    {prof!=null?<EuiSpacer size="s"></EuiSpacer>:<></>}
    <EuiFormRow
      fullWidth
    >
      <EuiTextArea fullWidth value={val} onChange={e=>onChange(e.target.value)}/>
    </EuiFormRow>
    </>
  );
};

export default CommentQuestion;