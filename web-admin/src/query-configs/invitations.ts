import * as t from 'ostseee-web-common';

export const invitationGet=(courseId,begin,end)=>{
  return t.coursesCourseIdInvitationsGet({courseId,begin,end},{
    transform:(val: any)=>{
        return {InvitationById:val};
    },
    update: {
    InvitationById: (prev, next) => {
      if(prev==undefined){
        prev = {};
      }
      // Discard previous `response` value (we don't need it anymore).
      prev[courseId]= next
      return prev;
    },
  },})
}