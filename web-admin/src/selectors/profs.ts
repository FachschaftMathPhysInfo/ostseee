const emptyArray = [];
//plural
export const getProfs = state => {
  return state.entities.Profs || emptyArray;
};
//singular
// export const getProf = (state, itemId) => {
//   return state.entities.Profs.filter(item=> item.id == itemId)[0];
//   //return (state.entities.itemsById || {})[itemId];
// };

export const getProf = (state) => {
  //array of just one element
  console.log(state.entities.Prof)
  return [state.entities.Prof] || emptyArray;
};