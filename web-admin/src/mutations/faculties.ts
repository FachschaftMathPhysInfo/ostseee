import * as t from 'ostseee-web-common';
export const createFaculty =(name:string)=>{
    return t.facultiesPost({
        faculty:{name}
    },{
        transform:(val: any)=>{
            return {Faculties:[val]};
        },
        update: {
        Faculties: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return prev.concat(next);
        }
      }
    });
}
