import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';
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
          if(prev){
            return prev.concat(next);
          }
          return next;
          
        }
      }
    });
}
