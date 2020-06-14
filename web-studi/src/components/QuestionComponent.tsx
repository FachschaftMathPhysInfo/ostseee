import { Question, EmptyForm, QuestionVisualizerEnum, QuestionRegardsEnum } from "ostseee-web-common"
import CommentQuestion from "./questions/CommentQuestion"
import React, { Fragment } from "react"
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion"
import SelectQuestion from "./questions/SelectQuestion"
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion"
import { EuiDescribedFormGroup } from "@elastic/eui"
import { getLanguage } from "../selectors/language"
import {useSelector} from "react-redux"
import { getEmptyForm } from "../selectors/emptyform"
import { getTutorId } from "../selectors/answers"
import { EuiSpacer } from "@elastic/eui"
import TutorSelect from "./questions/TutorSelect"
const QuestionComponent= props=>{
    const question:Question= props.question
    //check for concerns/regards
    const emptyForm: EmptyForm = useSelector(getEmptyForm)
    let concerns = useSelector(getTutorId)
    
    if (question.regards=="course"){
        concerns= emptyForm.course.id
    }
    if(question.regards == QuestionRegardsEnum.Lecturer){
        concerns = emptyForm.profs[0]?.id
    }
   // console.log(props.sectionId)
    let comp=(concernsId,prof)=>( <SingleChoiceQuestion sectionId={props.sectionId} question={question} prof={prof} concerns={concernsId}></SingleChoiceQuestion>)
    //@ts-ignore
    if(question.visualizer=="tutor_overview"){
        comp=(concernsId,prof)=>( <TutorSelect sectionId={props.sectionId} question={question} prof={prof} concerns={concernsId}></TutorSelect>)
    }
    if(question.isComment){
        comp= (concernsId,prof)=>(<CommentQuestion sectionId={props.sectionId} question={question} prof={prof} concerns={concernsId}></CommentQuestion>)
    }
    if(question.isMulti){
        comp=(concernsId,prof)=> (<MultipleChoiceQuestion sectionId={props.sectionId} question={question} prof={prof} concerns={concernsId}></MultipleChoiceQuestion>)
    }
    if(question.hasOtherOption){
        comp= (concernsId,prof)=>(<SelectQuestion sectionId={props.sectionId} question={question} prof={prof} concerns={concernsId}></SelectQuestion>)
    }
    let comps = [<div  key={`${question.id}:${concerns}`} id={`${question.id}:${concerns}`}>{comp(concerns,null)}</div>]
    if(question.regards == "lecturer"){
        concerns = emptyForm.profs[0]?.id
        comps =emptyForm.profs.map(prof=>(<div  key={`${question.id}:${prof.id}`} id={`${question.id}:${prof.id}`}>{comp(prof.id,prof)}<EuiSpacer size="l"></EuiSpacer></div>))
    }
    const languageCode = useSelector(getLanguage)

    return (<EuiDescribedFormGroup fullWidth gutterSize="xl"
    title={<h3>{question.title[languageCode]} </h3>}
    description={concerns!=""?(question.isMulti&&(<Fragment>
        Mehrfachauswahl möglich
      </Fragment>)):<>Kein Tutor ausgewählt.</>}
  >{concerns!=""&&comps
   }</EuiDescribedFormGroup>
    )
}

export default QuestionComponent