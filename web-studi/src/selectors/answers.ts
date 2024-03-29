export const getAnswer = (questionId,concerns)=>(state) => {
    return state.answers.answers[`${questionId}:${concerns}`]||{notApplicable:false,values:""}
  };
export const getAnswers=(state)=>{
    return state.answers.answers
}
export const getTutorId=(state)=>{
    return state.answers.tutorId;
}
export const getAnswersCount=(state)=>{
    return Object.keys(state.answers.answers).length
}

export const getLastSectionAnswered=(state)=>{
    //console.log(state.answers.section)
    return state.answers.section
}