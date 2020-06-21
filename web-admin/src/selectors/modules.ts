const emptyArray = [];
//plural
export const getModules = state => {
  return state.entities.Modules || emptyArray;
};
//singular
export const getModule =(itemId)=> (state) => {
  return (state.entities.ModulesById||{})[itemId];
  //return (state.entities.itemsById || {})[itemId];
};