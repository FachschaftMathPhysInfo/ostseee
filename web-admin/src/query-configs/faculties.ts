//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const facultiesGet =()=>{
    return t.facultiesGet({
        transform:(val: any)=>{
            return {Faculties:val};
        },
        update: {
        Faculties: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}