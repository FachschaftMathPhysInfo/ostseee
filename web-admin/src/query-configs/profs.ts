//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const profsGet =()=>{
    return t.profsGet({
        transform:(val: any)=>{
          console.log(val);
            return {Profs:val};
        },
        update: {
        Profs: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}


export const profGet=(id)=>{
  return t.profsProfIdGet({profId:id},{
    transform:(val: any)=>{
        return {ProfsById:val};
    },
    update: {
      ProfsById: (prev, next) => {
      if(prev==undefined){
        prev = {};
      }
      // Discard previous `response` value (we don't need it anymore).
      prev[next.id]= next
      return prev;
    },
  },})
}
