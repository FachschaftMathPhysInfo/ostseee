const emptyArray = [];
//plural
export const getFaculties = state => {
  return state.entities.Faculties || emptyArray;
};
//singular
export const getFaculty = (state, itemId) => {
  return state.entities.Faculties.filter(item=> item.id == itemId)[0];
  //return (state.entities.itemsById || {})[itemId];
};