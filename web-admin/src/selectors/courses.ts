const emptyArray = [];
//plural
export const getCourses = state => {
  return state.entities.Courses || emptyArray;
};
//singular
export const getCourse = itemId=>(state) => {
  return (state.entities.CoursesById||{})[itemId];
};