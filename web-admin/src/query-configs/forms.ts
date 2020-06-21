import * as t from 'ostseee-web-common/dist/modules/es2017/index';
export const formsGet =()=>{
    return t.formsGet({
        transform:(val: any)=>{
            console.log(val);
            return {Forms:val};
        },
        update: {
        Forms: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}

export const formGet=(formId)=>{
  return t.formsFormIdGet({formId},{
    transform:(val: any)=>{
        return {FormsById:val};
    },
    update: {
    FormsById: (prev, next) => {
      if(prev==undefined){
        prev = {};
      }
      // Discard previous `response` value (we don't need it anymore).
      prev[next.id]= next
      return prev;
    },
  },})
}