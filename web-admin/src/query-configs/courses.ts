//import * as t from 'ostseee-web-common/dist/modules/es2017/index';
import * as t from 'ostseee-web-common';
export const coursesGet =()=>{
    return t.coursesGet({
        transform:(val: any)=>{
            return {Courses:val};
        },
        update: {
        Courses: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}