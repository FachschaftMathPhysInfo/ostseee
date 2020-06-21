import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';
export const editProf =(profId:string, title:string, firstname:string, lastname:string, email:string, censored:boolean, censoredDate:Date)=>{
    return t.profsProfIdPatch({
        profId:profId,
        prof:{title, firstname, lastname, email, censored, censoredDate}
    },{
        transform:(val: any)=>{
            return {Profs:[val]};
        },
        update: {
        Profs: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          if(prev){
            return prev.concat(next);
          }
          return next;
          
        }
      }
    });
}
