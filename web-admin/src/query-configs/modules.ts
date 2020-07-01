//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';

export const modulesGet =()=>{
    return t.modulesGet({
        transform:(val: any)=>{
            return {Modules:val};
        },
        update: {
        Modules: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}
export const moduleGet=(id)=>{
  return t.modulesModuleIdGet({moduleId:id},{
    transform:(val: any)=>{
        return {ModulesById:val};
    },
    update: {
    ModulesById: (prev, next) => {
      if(prev==undefined){
        prev = {};
      }
      // Discard previous `response` value (we don't need it anymore).
      prev[next.id]= next
      return prev;
    },
  },})
}