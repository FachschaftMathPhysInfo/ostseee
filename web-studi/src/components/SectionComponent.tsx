import * as React from 'react';
import { EuiPanel } from '@elastic/eui';
import styles from "./Form.module.css"
import { EuiSpacer } from '@elastic/eui';
import { Section } from 'ostseee-web-common';
import { getLanguage } from '../selectors/language';
import {useSelector} from "react-redux";
import QuestionComponent from './QuestionComponent';
import translate from '../lib/translate';
const SectionComponent = props => {
  const section:Section = props.section
  const languageCode =  useSelector(getLanguage)
  //console.log(section.id)
  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiPanel className={styles.form} betaBadgeLabel={translate(section.title,languageCode)}>
      {section.questions.map(question=>(
        <QuestionComponent key={question.id} question={question} sectionId={section.id}></QuestionComponent>
      ))}
      </EuiPanel>
    </div>
    
  );
};

export default SectionComponent;