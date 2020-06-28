import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';

export const editFaculty =(facultyId:string, name:string)=>{
  return t.facultiesFacultyIdPatch({
      facultyId:facultyId,
      faculty:{name}
  },{
      transform:(val: any)=>{
          return {Faculties:[val],FacultiesById:val};
      },
      update: {
        Faculties: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          return prev.concat(next);
        }
        return next;
        
      },
      FacultiesById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}

export const newFaculty =(name:string)=>{
    return t.facultiesPost({
        faculty:{name}
    },{
        transform:(val: any)=>{
            return {Faculties:[val], FacultiesById:val};
        },
        update: {
        Faculties: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          if(prev){
            return prev.concat(next);
          }
          return next;
          
        }, 
        FacultiesById:(prev,next)=>{
          prev=prev || {[next.id]:next}
          prev[next.id]=next
          return prev
        }
      }
    });
}
