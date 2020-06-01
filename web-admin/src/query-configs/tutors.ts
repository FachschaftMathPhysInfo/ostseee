//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const tutorsGet =()=>{
  //@ts-ignore
    return t.tutorsGet({
        transform:(val: any)=>{
            return {Tutors:val};
        },
        update: {
        Tutors: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}