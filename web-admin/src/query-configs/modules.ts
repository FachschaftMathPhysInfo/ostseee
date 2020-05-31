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