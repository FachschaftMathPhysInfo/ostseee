const emptyArray = [];
//plural
export const getModules = state => {
  return state.entities.Modules || emptyArray;
};
//singular
export const getModule = (state, itemId) => {
  return state.entities.Modules.filter(item=> item.id == itemId)[0];
  //return (state.entities.itemsById || {})[itemId];
};