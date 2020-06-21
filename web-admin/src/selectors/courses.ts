const emptyArray = [];
//plural
export const getCourses = state => {
  return state.entities.Courses || emptyArray;
};
//singular
export const getCourse = (state, itemId) => {
  return state.entities.Courses.filter(item=> item.id == itemId)[0];
  //return (state.entities.itemsById || {})[itemId];
};