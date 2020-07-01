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

export const facultyGet=(id)=>{
  return t.facultiesFacultyIdGet({facultyId:id},{
    transform:(val: any)=>{
        return {FacultiesById:val};
    },
    update: {
      FacultiesById: (prev, next) => {
      if(prev==undefined){
        prev = {};
      }
      // Discard previous `response` value (we don't need it anymore).
      prev[next.id]= next
      return prev;
    },
  },})
}