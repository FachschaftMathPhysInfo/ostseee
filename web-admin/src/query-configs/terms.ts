//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const termsGet =()=>{
    return t.termsGet({
        transform:(val: any)=>{
            return {Terms:val};
        },
        update: {
        Terms: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}