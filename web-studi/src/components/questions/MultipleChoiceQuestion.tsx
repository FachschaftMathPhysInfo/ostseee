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
import {useSelector} from 'react-redux'
const MultipleChoiceQuestion = props => {
  const question : Question = props.question
  const languageCode = useSelector(getLanguage)
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = React.useState({
   // [`${idPrefix}1`]: true,
  });
  const options = question.options.map(opt=>{return {
    label: opt.label[languageCode],
    id:   opt.id
  }})
  const onChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };
  return (
   
     <EuiCheckboxGroup 
      options={options
      }
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={(option)=> onChange(option)}
    />
  
  );
};

export default MultipleChoiceQuestion;