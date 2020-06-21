import * as t from 'ostseee-web-common';
export const courseprofsByCourseGet=(id)=>{
    return t.courseprofsGet({courseId:id},{
      transform:(val: any)=>{
          return {CourseProfsByCourseId:val};
      },
      update: {
        CourseProfsByCourseId: (prev, next) => {
        if(prev==undefined){
          prev = {};
        }
        // Discard previous `response` value (we don't need it anymore).
        if(next.length>0){
        prev[next[0].courseId]= next
        }
        return prev;
      },
    },})
  }