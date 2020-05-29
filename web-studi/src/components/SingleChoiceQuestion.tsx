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

const SingleChoiceQuestion = props => {
  const [selected, setSelected]= useState('');
  const [checked, setChecked]= useState(false);
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3> Falls Leistungspunkte (LP) vergeben werden: Verglichen mit den  vergebenen Leistungspunkten ist mein tatsächlicher Arbeitsaufwand für diese Lehrveranstaltung (1 LP = 30 Stunden Arbeitsaufwand):</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
     <EuiRadioGroup 
     disabled={checked}
      options={[
        {
          id: '1',
          label: 'sehr hoch',
        },
        {
          id: '2',
          label: 'hoch',
        },
        {
          id: '3',
          label: 'angemessen',
        },
        {
          id: '4',
          label: 'niedrig',
        },
        {
          id: '5',
          label: 'sehr niedrig',
        },
      ]}
      idSelected={selected}
      onChange={(option)=> setSelected(option)}
      name="radio group"
      
    />
    <EuiSpacer size="m"></EuiSpacer>
    <EuiCheckbox
        id={htmlIdGenerator()()}
        label="keine Angabe"
        checked={checked}
        //@ts-ignore
        onChange={e => {setChecked(e.target.checked);setSelected('')}}
      />
  </EuiDescribedFormGroup>
  );
};

export default SingleChoiceQuestion;