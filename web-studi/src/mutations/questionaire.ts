import { questionaireInvitationIdPost, Questionaire } from "ostseee-web-common"

export const submitQuestionaire =(questionaire:Questionaire, invitationId)=>{
    return questionaireInvitationIdPost({questionaire:questionaire,invitationId})
}