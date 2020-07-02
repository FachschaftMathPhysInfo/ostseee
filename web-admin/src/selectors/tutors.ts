const emptyArray = [];
//plural
export const getTutors = state => {
  return state.entities.Tutors || emptyArray;
};
//singular
export const getTutor =(itemId)=> (state) => {
  return (state.entities.TutorsById || {})[itemId];
};
export const getTutorsByCourse =(courseId)=> (state) => {
  return (state.entities.TutorsByCourseId||{})[courseId];
  //return (state.entities.itemsById || {})[itemId];
};