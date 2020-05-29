import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';
import { EuiRadioGroup } from '@elastic/eui';
import { EuiCheckboxGroup } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui';
const idPrefix = htmlIdGenerator()();
const MultipleChoiceQuestion = props => {
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = React.useState({
    [`${idPrefix}1`]: true,
  });
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
    <EuiDescribedFormGroup fullWidth
    title={<h3>Welche Probleme treten während der Veranstaltung auf?</h3>}
    description={
      <Fragment>
        Mehrfachauswahl möglich
      </Fragment>
    }
  >
     <EuiCheckboxGroup 
      options={[
        {
          id: `${idPrefix}1`,
          label: 'Schrift unleserlich',
        },
        {
          id: `${idPrefix}2`,
          label: 'Darstellung wirr',
        },
        {
          id: `${idPrefix}3`,
          label: 'mangelnde Gliederung',
        },
        {
          id: `${idPrefix}4`,
          label: 'schlechte Bildqualität',
        },
        {
          id: `${idPrefix}5`,
          label: 'Schlechte Audioqualität',
        },
      ]}
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={(option)=> onChange(option)}
    />
  
  </EuiDescribedFormGroup>
  );
};

export default MultipleChoiceQuestion;