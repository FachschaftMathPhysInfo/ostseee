import * as React from 'react';
import Section from './SectionComponent';
import { EuiPanel } from '@elastic/eui';
import styles from './Form.module.css';
import { EuiSpacer } from '@elastic/eui';
import { EmptyForm, Answer, QuestionRegardsEnum, Questionaire } from 'ostseee-web-common';
import SectionComponent from './SectionComponent';
import { EuiButton } from '@elastic/eui';
import { getAnswers, getTutorId } from '../selectors/answers';
import { useSelector } from 'react-redux'
import { useMutation } from 'redux-query-react';
import { submitQuestionaire } from '../mutations/questionaire';
import { EuiCallOut } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { getLanguage } from '../selectors/language';
import translate from '../lib/translate';
import translation from '../data/translation.json';
import { lang } from 'moment';
const Form = (props) => {
  let emptyForm: EmptyForm = props.emptyForm
  const languageCode = useSelector(getLanguage)
  let answersInStore = useSelector(getAnswers)
  const tutorId = useSelector(getTutorId)
  const [data, submitQuest] = useMutation((questionaire:Questionaire,invitationId) =>
    submitQuestionaire(questionaire,invitationId),
  );
  const {isFinished, isPending,status} = data

  const unanswered = emptyForm.abstractForm.pages.flatMap((page) => {
    return page.sections.flatMap(sec => sec.questions.flatMap(q => {
      let concernsId = emptyForm.course.id
      switch (q.regards) {
        case QuestionRegardsEnum.Course:

          break;
        case QuestionRegardsEnum.Lecturer:
          // return different
          return emptyForm.profs.flatMap(prof => {
            return answersInStore[`${q.id}:${prof.id}`]===undefined ?{link:`${q.id}:${prof.id}`,question:q}:undefined 
          })
        case QuestionRegardsEnum.Tutor:
          concernsId = tutorId
        default:
          break;
      }
      return answersInStore[`${q.id}:${concernsId}`]===undefined ?{link:`${q.id}:${concernsId}`,question:q}:undefined 
    }))
  }).filter((val)=>val!=undefined)
  const submitForm = () => {

    const answers: Answer[] = emptyForm.abstractForm.pages.flatMap((page) => {
      return page.sections.flatMap(sec => sec.questions.flatMap(q => {
        let concernsId = emptyForm.course.id
        switch (q.regards) {
          case QuestionRegardsEnum.Course:

            break;
          case QuestionRegardsEnum.Lecturer:
            // return different
            return emptyForm.profs.flatMap(prof => {
              if(answersInStore[`${q.id}:${prof.id}`]===undefined){
                return undefined
              }
              return {
                questionaireId: emptyForm.id,questionId:q.id, ...answersInStore[`${q.id}:${prof.id}`]
              }
            })
          case QuestionRegardsEnum.Tutor:
            concernsId = tutorId
          default:
            break;
        }
        if(concernsId ===undefined || answersInStore[`${q.id}:${concernsId}`]===undefined){
          return undefined
        }
        return { questionaireId: emptyForm.id,questionId:q.id, ...answersInStore[`${q.id}:${concernsId}`] }
      }))
    }).filter(q=>q!==undefined)
    console.log(answers)
    const questionaire:Questionaire = {answers}
    submitQuest(questionaire,emptyForm.id)
  }
  return (
    <div id="abschnitt">
      {
        !(isFinished&&status ==204)?emptyForm.abstractForm.pages.map(page => page.sections.map(sec => (
          <div key={sec.id} id={sec.id}>
            <EuiSpacer size="xl"></EuiSpacer>
            <EuiSpacer size="xl"></EuiSpacer>
            <SectionComponent section={sec}  />
        </div>))):<><h1>{translate(translation["eval.send.success"],languageCode)}</h1></>
      }
      
      {!(isFinished&&status ==204)?
      <><EuiSpacer size="xl"></EuiSpacer>
      {unanswered.length!=0&&<><EuiCallOut title={translate(translation["eval.not.all.questions.answered.title"],languageCode)} color="warning" iconType="alert">
      <> <EuiText>{translate(translation["eval.not.all.questions.answered.intro"],languageCode)}</EuiText>
        
        <ul>
    {unanswered.map(q=>(<li key={q.link}><a href={`#${q.link}`}>{translate(q.question.title,languageCode)}</a></li>))}
        </ul></>
        </EuiCallOut>
        <EuiSpacer size="xl"></EuiSpacer></>
        }
      <EuiButton fill iconType="exit" onClick={e => submitForm()} disabled={isPending}>
        {translate(translation["eval.submit"],languageCode)}
  </EuiButton></>:<></>}
    </div>
  );
};

export default Form;