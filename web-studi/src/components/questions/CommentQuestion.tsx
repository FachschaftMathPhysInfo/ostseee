import * as React from 'react';
import { EuiDescribedFormGroup } from '@elastic/eui';
import { EuiFormRow } from '@elastic/eui';
import { EuiFieldText } from '@elastic/eui';
import { Fragment } from 'react';
import { EuiTextArea } from '@elastic/eui';

const CommentQuestion = props => {
  return (
    
    <EuiFormRow
      fullWidth
    >
      <EuiTextArea fullWidth/>
    </EuiFormRow>
  );
};

export default CommentQuestion;