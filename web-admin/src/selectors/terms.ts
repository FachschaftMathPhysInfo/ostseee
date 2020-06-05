const emptyArray = [];
//plural
export const getTerms = state => {
  return state.entities.Terms || emptyArray;
};
//singular
export const getTerm = (state, itemId) => {
  return state.entities.Terms.filter(item=> item.id == itemId)[0];
  //return (state.entities.itemsById || {})[itemId];
};