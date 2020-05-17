const emptyArray = [];

export const getForms = state => {
  return state.entities.Forms || emptyArray;
};

export const getItem = (state, itemId) => {
  return (state.entities.itemsById || {})[itemId];
};