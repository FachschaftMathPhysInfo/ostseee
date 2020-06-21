const emptyArray = [];
//plural
export const getProfs = state => {
  return state.entities.Profs || emptyArray;
};
//singular

export const getProf =(itemId)=> (state) => {
  return (state.entities.ProfsById||{})[itemId];
  //return (state.entities.itemsById || {})[itemId];
};