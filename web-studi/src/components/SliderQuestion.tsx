import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment, useState } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { EuiRange } from '@elastic/eui';
import { EuiCheckbox } from '@elastic/eui';

const SliderQuestion = props => {
  let [selected, setSelected] = useState('3') 
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Beispielfrage</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
    <EuiRange fullWidth
    value={selected}
  showTicks
  min = {1}
  max = {5}
  ticks={[
    { label: 'sehr schlecht', value: 1 },
    { label: 'schlecht', value: 2 },
    { label: 'b', value: 3 },
    { label: '.', value: 4 },
    { label: 'sehr gut', value: 5 }
  ]}
  //@ts-ignore
  onChange = {(e) => setSelected(e.target.value)}
  //@ts-ignore
  //append={(<EuiCheckbox label="kA" onChange={(e) => alert(e)} checked={false}>keine Angabe</EuiCheckbox>)}
  append={(<EuiText>tedt</EuiText>)}
/>
  
  </EuiDescribedFormGroup>
  );
};

export default SliderQuestion;