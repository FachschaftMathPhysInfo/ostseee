import React, { useState } from "react"
import moment from "moment"
import { EuiButton, EuiPanel, EuiFormRow, EuiDatePickerRange, EuiDatePicker, EuiForm, EuiFieldText, EuiSwitch, EuiCode, EuiFlexGroup, EuiFlexItem } from "@elastic/eui"
import { ThirdPartySendStatus, ThirdPartySendSettings } from "ostseee-web-common"
import { getInvitationsByCourseId } from "../selectors/invitations"
import { useSelector} from "react-redux"
import { useRequest, useMutation } from "redux-query-react"
import { InvSend } from "../mutations/invitations"

const InvitationsManager = ({courseId,thirdPartyKey}) =>{
    const [begin, setbegin] = useState(moment())
    const [end, setend] = useState(moment().add(11,'d'))
    const [plattformUrl, setplattformUrl] = useState('https://')
    const [baseUrl, setbaseUrl] = useState('https://')
    const [force, setforce] = useState(0)
    //@ts-ignore
    const [{ isPending: isPending2, status }, getInvitations] = useMutation((begin, end) => { return invitationGet(courseId, begin, end) });
    //@ts-ignore
    const [{isPending}, makeNewRequest]= useMutation((settings:ThirdPartySendSettings)=>InvSend(courseId,settings))
    const response :ThirdPartySendStatus= useSelector(getInvitationsByCourseId(courseId))
    const invitations = useSelector(state=>(state.entities.InvitationById||{})[courseId])||[]
    if (isPending||isPending2) return <>Übermittle Daten</>
     //@ts-ignore
     var invs: InvitationList= {}
     invs.baseUrl = baseUrl
    invs.invitations = invitations.map(i=>i.id)
    invs.begin= begin.toISOString()
    invs.end = end.toISOString()
    invs.thirdPartyKey= thirdPartyKey
    return (<><EuiPanel betaBadgeLabel="Invitations">
        <EuiForm>
        <EuiFormRow label="Zeitraum">
                    <EuiDatePickerRange
                        startDateControl={
                            <EuiDatePicker
                                selected={begin}
                                onChange={setbegin}
                                startDate={begin}
                                endDate={end}
                                isInvalid={begin > end}
                                aria-label="Start date"
                                showTimeSelect
                            />
                        }
                        endDateControl={
                            <EuiDatePicker
                                selected={end}
                                onChange={setend}
                                startDate={begin}
                                endDate={end}
                                isInvalid={begin >end}
                                aria-label="End date"
                                showTimeSelect
                            />
                        }
                    />
                    </EuiFormRow>
                    <EuiFormRow label="PlattformUrl">
                        <EuiFieldText value={plattformUrl} onChange={(e)=>setplattformUrl(e.target.value)}></EuiFieldText>
                    </EuiFormRow>
                    <EuiFormRow label="BaseUrl (unser System, mit / enden)">
                        <EuiFieldText value={baseUrl} onChange={(e)=>setbaseUrl(e.target.value)}></EuiFieldText>
                    </EuiFormRow>
                    <EuiFormRow>
                        <EuiSwitch checked={force !=0} onChange={
                            (e)=>setforce(e.target.checked?1:0)
                        } label="Force?"></EuiSwitch>
                    </EuiFormRow>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                    <EuiButton onClick={(e)=>console.log(getInvitations(begin,end))}>Lade Invitations</EuiButton></EuiFlexItem>
                    <EuiFlexItem>
                    <EuiButton iconType="package" onClick={()=>makeNewRequest({begin,end,plattformUrl,baseUrl,force})}>Übermitteln</EuiButton>
                   </EuiFlexItem></EuiFlexGroup> </EuiForm>
    
    </EuiPanel>
    {invs.invitations.length>0&&<EuiCode language="json">{JSON.stringify(invs)}</EuiCode>}
                    {response!==undefined&&<EuiCode language="json">{JSON.stringify(response)}</EuiCode>}
    </>)
}
export default InvitationsManager