
import * as t from 'ostseee-web-common';
export const StatusGet=()=>{
    return t.statusGet({
        transform:(val: any)=>{
            return {Status:val};
        },
        update: {
          Status: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },})
}