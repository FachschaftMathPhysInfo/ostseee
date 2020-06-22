import * as t from "ostseee-web-common";

export const emptyFormGet= (invitationId:string)=>{
    return t.questionaireInvitationIdGet({invitationId},{
        transform:(val: any)=>{
            console.log(val);
            return {EmptyForm:val};
        },
        update: {
        EmptyForm: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      }})
}