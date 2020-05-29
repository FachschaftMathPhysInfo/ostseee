import * as React from 'react';
import Section from '../components/Section';
import { EuiPanel } from '@elastic/eui';
import styles from './Form.module.css';
import { EuiSpacer } from '@elastic/eui';

const Form = props => {
  return (
      <div id="abschnitt">
          <EuiSpacer size="xl"></EuiSpacer>
          <EuiSpacer size="xl"></EuiSpacer>
        <Section/>
    </div>
  );
};

export default Form;