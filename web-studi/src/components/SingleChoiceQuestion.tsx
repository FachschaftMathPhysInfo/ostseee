import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';

const SingleChoiceQuestion = props => {
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Beispielfrage</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
     <EuiRadioGroup 
      options={[
        {
          id: '1',
          label: 'Option one',
        },
        {
          id: '2',
          label: 'Option one',
        },
        {
          id: '3',
          label: 'Option one',
        },
        {
          id: '4',
          label: 'Option one',
        },
        {
          id: '5',
          label: 'Option one',
        },
      ]}
      idSelected={'1'}
      onChange={(option)=> alert("clicked option "+option)}
      name="radio group"
      legend={{
        children: 'A legend',
      }}
    />
  
  </EuiDescribedFormGroup>
  );
};

export default SingleChoiceQuestion;