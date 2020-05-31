//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const profsGet =()=>{
    return t.profsGet({
        transform:(val: any)=>{
            return {Profs:val};
        },
        update: {
        Profs: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}