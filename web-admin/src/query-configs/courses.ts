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
export const courseGet =(courseId)=>{
  return t.coursesCourseIdGet({courseId},{
      transform:(val: any)=>{
          return {Course:val};
      },
      update: {
      Course: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        return next;
      },
    },});
}