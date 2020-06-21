const emptyArray = [];
//plural
export const getTerms = state => {
  return state.entities.Terms || emptyArray;
};
//singular
//singular
export const getTerm =(itemId)=> (state) => {
  return (state.entities.TermsById||{})[itemId];
  //return (state.entities.itemsById || {})[itemId];
};