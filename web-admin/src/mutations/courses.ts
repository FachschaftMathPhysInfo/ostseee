import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';

export enum CourseProgressEnum {
  "created",
  "announced",
  "inEval",
  "processing",
  "published"
}

export const editCourse =(moduleId: string, formId: string, termId: string, location: string, numberOfStudents: number, language:string, progress: CourseProgressEnum, clearance: string)=>{
  return t.coursesCourseIdPatch({
      moduleId:moduleId,
      course:{moduleId, formId, termId, location, numberOfStudents, language, progress, clearance}
  },{
      transform:(val: any)=>{
          return {Courses:[val],CourseById:val};
      },
      update: {
      Courses: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          return prev.concat(next);
        }
        return next;
        
      },
      CourseById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}

export const newCourse =(moduleId: string, formId: string, termId: string, location: string, numberOfStudents: number, language:string, progress: CourseProgressEnum, clearance: string)=>{
  
  return t.coursesPost({
      course:{moduleId, formId, termId, location, numberOfStudents, language, progress, clearance}
  },{
      transform:(val: any)=>{
          return {Courses:[val],CourseById:val};
      },
      update: {
      Courses: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          return prev.concat(next);
        }
        return next;
        
      },
      CourseById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}