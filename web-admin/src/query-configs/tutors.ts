import { coursesCourseIdTutorsGet, coursesCourseIdTutorsTutorIdGet, Tutor } from "ostseee-web-common";

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

export const tutorGet= (courseId,tutorId)=>{
  return coursesCourseIdTutorsTutorIdGet({courseId,tutorId},{
    transform:(val:Tutor)=>{
      return {TutorsById:val}
    },
    update:{
      TutorsById:(prev:any,next)=>{
        if(prev==undefined){
          prev={}
        }
        prev[next.id]= next
        return prev
      }
    }
  })
}