import { ThirdPartySendSettings, coursesCourseIdInvitationsSendPost } from "ostseee-web-common";

export const InvSend=(courseId,thirdPartySendSettings: ThirdPartySendSettings)=>{
    return coursesCourseIdInvitationsSendPost({courseId,thirdPartySendSettings},{
        transform:(val:any)=>{
            return {InvitationSendSettingsByCourseId:val}
        }
        ,update:{
            InvitationSendSettingsByCourseId:(prev,next)=>{
                if (prev == undefined) {
                    prev = {};
                  }
                  prev[courseId] = next
          
                  return prev;
            }
        }
    })
}