import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';

const CommentQuestion = props => {
  return (
    <EuiDescribedFormGroup fullWidth
    title={<h3>Zusätzliche Anmerkungen zum Seminar (bitte in Stichworten):</h3>}
    description={
      <Fragment>
        Bitte keine persönlichen Angaben, die ein Rückschluss auf dich zu lassen.
      </Fragment>
    }
  >
    <EuiFormRow
      fullWidth
    >
      <EuiTextArea fullWidth/>
    </EuiFormRow>
  </EuiDescribedFormGroup>
  );
};

export default CommentQuestion;