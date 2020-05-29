import * as React from 'react';
import CommentQuestion from './CommentQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import { EuiPanel } from '@elastic/eui';
import styles from "./Form.module.css"
import { EuiSpacer } from '@elastic/eui';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SelectQuestion from './SelectQuestion';
import SliderQuestion from './SliderQuestion';

const Section = props => {
  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiPanel className={styles.form} betaBadgeLabel={"Abschnittsname"}>
      <SelectQuestion/>
        <SliderQuestion/>
        
        <SingleChoiceQuestion/>
        <MultipleChoiceQuestion/>
        <CommentQuestion/>
      </EuiPanel>
    </div>
    
  );
};

export default Section;