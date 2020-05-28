import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiCheckboxGroup } from '@elastic/eui';

const MultipleChoiceQuestion = props => {
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Beispielfrage</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
     <EuiCheckboxGroup 
      options={[
        {
          id: '7',
          label: 'Option one',
        },
        {
          id: '8',
          label: 'Option one',
        },
        {
          id: '9',
          label: 'Option one',
        },
        {
          id: '00',
          label: 'Option one',
        },
        {
          id: '11',
          label: 'Option one',
        },
      ]}
      idToSelectedMap={{ id: true }}
      onChange={(option)=> alert("clicked option "+option)}
      legend={{
        children: 'A ',
      }}
    />
  
  </EuiDescribedFormGroup>
  );
};

export default MultipleChoiceQuestion;