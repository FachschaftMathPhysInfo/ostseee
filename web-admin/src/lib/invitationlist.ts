

export default interface InvitationList{
    baseUrl:String,//contains the baseURL with ending URL
    thirdPartyKey:String,
    begin:String,
    end:String,
    invitations: Array<String>
}