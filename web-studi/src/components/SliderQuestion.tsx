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
import { EuiFlexGroup } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';

const SliderQuestion = props => {
  let [selected, setSelected] = useState('3') 

  const [checked, setChecked]= useState(false);
  return (
    
    <EuiDescribedFormGroup fullWidth
    title={<h3>Durch das Umstellen auf das digitale Format hat sich mein Arbeitsaufwand folgendermaßen verändert:</h3>}
    description={
      <Fragment>
        
      </Fragment>
    }
  >
    <EuiFlexGroup>
    <EuiFlexItem>
    <EuiRange fullWidth
    value={selected}
  showTicks
  min = {1}
  max = {5}
  ticks={[
    { label: 'deutlich erhöht', value: 1 },
    { label: 'leicht erhöht', value: 2 },
    { label: 'unverändert', value: 3 },
    { label: 'leicht reduziert', value: 4 },
    { label: 'deutlich reduziert', value: 5 }
  ]}
  //@ts-ignore
  onChange = {(e) => setSelected(e.target.value)}
  //@ts-ignore
  //append={(<EuiCheckbox label="kA" onChange={(e) => alert(e)} checked={false}>keine Angabe</EuiCheckbox>)}
  append={(<EuiText>tedt</EuiText>)}
  disabled={checked}
/>
</EuiFlexItem>
<EuiFlexItem grow={false}>
    <EuiCheckbox
        id={htmlIdGenerator()()}
        label="k.A."
        checked={checked}
        //@ts-ignore
        onChange={e => {setChecked(e.target.checked);setSelected('')}}
      />
      </EuiFlexItem>
  </EuiFlexGroup>
  </EuiDescribedFormGroup>
  );
};

export default SliderQuestion;