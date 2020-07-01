import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';


export const editModule =(moduleId:string, name:string, description:string, facultyId:string)=>{
    return t.modulesModuleIdPatch({
        moduleId:moduleId,
        module:{name, description, facultyId}
    },{
        transform:(val: any)=>{
            return {Modules:[val],ModulesById:val};
        },
        update: {
        Modules: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          if(prev){
            return prev.concat(next);
          }
          return next;
          
        },
        ModulesById:(prev,next)=>{
          prev=prev || {[next.id]:next}
          prev[next.id]=next
          return prev
        }
      }
    });
}

export const newModule =(name:string, description:string, facultyId:string)=>{
  return t.modulesPost({
      module:{name, description, facultyId}
  },{
      transform:(val: any)=>{
          return {Modules:[val], ModulesById:val};
      },
      update: {
      Modules: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          return prev.concat(next);
        }
        return next;
        
      },
      ModulesById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}