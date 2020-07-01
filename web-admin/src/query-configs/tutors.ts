import { coursesCourseIdTutorsGet } from "ostseee-web-common";

export const tutorsByCourseGet =(courseId)=>{
  //@ts-ignore
    return coursesCourseIdTutorsGet({courseId},{
        transform:(val: any)=>{
            return {TutorsByCourseId:val};
        },
        update: {
          TutorsByCourseId: (prev, next) => {
            if (prev == undefined) {
              prev = {};
            }
            prev[courseId]= next
          return prev;
        },
      },});
}