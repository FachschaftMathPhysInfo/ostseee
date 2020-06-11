export const getAnswer = (questionId,concerns)=>(state) => {
    return state.answers.answers[`${questionId}:${concerns}`]||{notApplicable:false,values:""}
  };