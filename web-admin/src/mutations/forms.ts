import { AbstractForm, formsPost } from "ostseee-web-common";

export const newForm =(name: string, termId: string, abstractForm:AbstractForm)=>{
  
    return formsPost({
        form:{name, termId, abstractForm}
    },{
        transform:(val: any)=>{
            return {Forms:[val],FormsById:val};
        },
        update: {
        Forms: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          if(prev){
            return prev.concat(next);
          }
          return next;
          
        },
        FormsById:(prev,next)=>{
          prev=prev || {[next.id]:next}
          prev[next.id]=next
          return prev
        }
      }
    });
  }