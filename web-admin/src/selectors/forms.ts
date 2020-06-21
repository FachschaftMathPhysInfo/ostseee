const emptyArray = [];

export const getForms = state => {
  return state.entities.Forms || emptyArray;
};

//singular
export const getForm =(itemId)=> (state) => {
  return (state.entities.FormsById||{})[itemId];
  //return (state.entities.itemsById || {})[itemId];
};