import React, { Fragment } from "react";
import { EuiSelectable } from "@elastic/eui";
import { getEmptyForm } from "../../selectors/emptyform";
import {useSelector, useDispatch} from 'react-redux'
import { EmptyForm } from "ostseee-web-common";
import { getTutorId } from "../../selectors/answers";
import { changeTutor, changeAnswer } from "../../lib/store";

const TutorSelect = props=>{
    const emptyForm:EmptyForm = useSelector(getEmptyForm)
    const tutorId = useSelector(getTutorId)
    const options = emptyForm.tutors.map(tut=>{return (tut.id===tutorId)?{
        label:tut.name,
        id: tut.id,
        checked:"on"
    }:{
        label:tut.name,
        id: tut.id,
        checked:null
    }})
    const  dispatch = useDispatch()
    const setOptions=(opts)=>{opts.forEach(opt => {
        if(opt.checked=="on") {
            console.log(opt)
            dispatch(changeTutor(opt.id))
            dispatch(changeAnswer(props.sectionId,props.question.id,emptyForm.course.id,[opts.id],false))
        }
    });}
    return (
        <Fragment>
          <EuiSelectable
            searchable
            searchProps={{
              'data-test-subj': 'selectableSearchHere',
            }}
            singleSelection={true}
            //@ts-ignore
            options={options}
            listProps={{bordered:true}}
            onChange={newOptions => setOptions(newOptions)}>
            {(list, search) => (
              <Fragment>
                {search}
                {list}
              </Fragment>
            )}
          </EuiSelectable>
        </Fragment>
      );
}
export default TutorSelect