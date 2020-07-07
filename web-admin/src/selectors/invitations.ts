export const getInvitationsByCourseId=(courseId)=> state=>{
    return (state.entities.InvitationSendSettingsByCourseId|| {})[courseId]
}