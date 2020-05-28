import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';

const CommentQuestion = props => {
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Beispielfrage</h3>}
    description={
      <Fragment>
        Erläuterung zu der Beispielfrage
      </Fragment>
    }
  >
    <EuiFormRow
      label="Möglicher Beschreibungstext"
      fullWidth
    >
      <EuiTextArea fullWidth/>
    </EuiFormRow>
  </EuiDescribedFormGroup>
  );
};

export default CommentQuestion;