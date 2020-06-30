import * as t from 'ostseee-web-common';
import { prettyInterval } from '@elastic/eui/src/components/date_picker/super_date_picker/pretty_interval';


export const editTerm =(termId: string, name:string, begin: Date, end: Date)=>{
  return t.termsTermIdPatch({
      termId:termId,
      term:{name, begin, end}
  },{
      transform:(val: any)=>{
          return {Terms:[val],TermById:val};
      },
      update: {
      Terms: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          if(prev.findIndex((v=>v.id==next[0].id))>=0)
          prev[prev.findIndex((v=>v.id==next[0].id))]= next[0];
          else return prev.concat(next)
          return prev;
        }
        return next;
        
      },
      TermById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}

export const newTerm =(name: string, begin: Date, end: Date)=>{
  
  return t.termsPost({
      term:{name, begin, end}
  },{
      transform:(val: any)=>{
          return {Terms:[val],TermById:val};
      },
      update: {
      Terms: (prev, next) => {
        // Discard previous `response` value (we don't need it anymore).
        if(prev){
          return prev.concat(next);
        }
        return next;
        
      },
      TermById:(prev,next)=>{
        prev=prev || {[next.id]:next}
        prev[next.id]=next
        return prev
      }
    }
  });
}
