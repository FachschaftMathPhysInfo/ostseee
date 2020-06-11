import * as React from 'react';
import { EuiPanel } from '@elastic/eui';
import styles from "./Form.module.css"
import { EuiSpacer } from '@elastic/eui';
import { Section } from 'ostseee-web-common';
import { getLanguage } from '../selectors/language';
import {useSelector} from "react-redux";
import QuestionComponent from './QuestionComponent';
const SectionComponent = props => {
  const section:Section = props.section
  const languageCode =  useSelector(getLanguage)
  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiPanel className={styles.form} betaBadgeLabel={section.title[languageCode]}>
      {section.questions.map(question=>(
        <QuestionComponent question={question}></QuestionComponent>
      ))}
      </EuiPanel>
    </div>
    
  );
};

export default SectionComponent;