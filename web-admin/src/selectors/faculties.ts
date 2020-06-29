const emptyArray = [];
//plural
export const getFaculties = state => {
  return state.entities.Faculties || emptyArray;
};
//singular
export const getFaculty =(itemId)=> (state) => {
  return (state.entities.FacultiesById||{})[itemId];
  //return (state.entities.itemsById || {})[itemId];
};