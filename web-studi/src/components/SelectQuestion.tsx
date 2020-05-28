import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment, useState } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { EuiText } from '@elastic/eui';

const SelectQuestion = props => {
  let options = [{
    value: 'Bachelro',
    inputDisplay: (<EuiText>Bachelor</EuiText>),
  },
  {
    value: 'Lehramt',
    inputDisplay: (<EuiText>Staatsexamen (Lehramt)</EuiText>),
  },
  {
    value: 'Master',
    inputDisplay: (<EuiText>Master</EuiText>),
  },
  {
    value: 'Sonstiges',
    inputDisplay: (<EuiText>Sonstiges</EuiText>),
  }]
  let [seleted, setSelected] = useState(null);

  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Beispielfrage</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
     <EuiSuperSelect fullWidth
      options={options}
      valueOfSelected={seleted}
      onChange={(option)=>setSelected(option)}
    />
  
  </EuiDescribedFormGroup>
  );
};

export default SelectQuestion;