import { Question } from "ostseee-web-common"
import CommentQuestion from "./questions/CommentQuestion"
import React, { Fragment } from "react"
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion"
import SelectQuestion from "./questions/SelectQuestion"
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion"
import { EuiDescribedFormGroup } from "@elastic/eui"
import { getLanguage } from "../selectors/language"
import {useSelector} from "react-redux"
const QuestionComponent= props=>{
    const question:Question= props.question
    const languageCode = useSelector(getLanguage)
    let comp=( <SingleChoiceQuestion question={question}></SingleChoiceQuestion>)
    if(question.isComment){
        comp= (<CommentQuestion question={question}></CommentQuestion>)
    }
    if(question.isMulti){
        comp= (<MultipleChoiceQuestion question={question}></MultipleChoiceQuestion>)
    }
    if(question.hasOtherOption){
        comp= (<SelectQuestion question={question}></SelectQuestion>)
    }
    

    return (<EuiDescribedFormGroup fullWidth gutterSize="xl"
    title={<h3>{question.title[languageCode]} </h3>}
    description={question.isMulti?(<Fragment>
        Mehrfachauswahl möglich
      </Fragment>):<></>}
  >{comp
   }</EuiDescribedFormGroup>
    )
}

export default QuestionComponent