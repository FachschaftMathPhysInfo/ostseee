const emptyArray = [];
//plural
export const getTutors = state => {
  return state.entities.Tutors || emptyArray;
};
//singular
export const getTutor = (state, itemId) => {
  return state.entities.Tutors.filter(item=> item.id == itemId)[0];
  //return (state.entities.itemsById || {})[itemId];
};
export const getTutorsByCourse =(courseId)=> (state) => {
  return (state.entities.TutorsByCourseId||{})[courseId];
  //return (state.entities.itemsById || {})[itemId];
};