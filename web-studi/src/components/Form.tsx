import * as React from 'react';
import Section from './SectionComponent';
import { EuiPanel } from '@elastic/eui';
import styles from './Form.module.css';
import { EuiSpacer } from '@elastic/eui';
import { EmptyForm } from 'ostseee-web-common';
import SectionComponent from './SectionComponent';

const Form = (props) => {
  let emptyForm:EmptyForm = props.emptyForm

  return (
      <div id="abschnitt">
        {
          emptyForm.abstractForm.pages.map(page =>page.sections.map(sec=>(
            <div key={sec.id} id={sec.id}>
          <EuiSpacer size="xl"></EuiSpacer>
          <EuiSpacer size="xl"></EuiSpacer>
        <SectionComponent section={sec}/>
        </div>)))
}
    </div>
  );
};

export default Form;