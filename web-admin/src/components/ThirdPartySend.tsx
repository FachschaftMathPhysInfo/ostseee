import React, { useState } from "react"
import moment from "moment"
import { EuiButton, EuiPanel, EuiFormRow, EuiDatePickerRange, EuiDatePicker, EuiForm, EuiFieldText, EuiSwitch, EuiCode } from "@elastic/eui"
import { ThirdPartySendStatus, ThirdPartySendSettings } from "ostseee-web-common"
import { getInvitationsByCourseId } from "../selectors/invitations"
import { useSelector} from "react-redux"
import { useRequest, useMutation } from "redux-query-react"
import { InvSend } from "../mutations/invitations"

const ThirdPartySend = ({courseId}) =>{
    const [begin, setbegin] = useState(moment())
    const [end, setend] = useState(moment().add(11,'d'))
    const [plattformUrl, setplattformUrl] = useState('https://')
    const [baseUrl, setbaseUrl] = useState('https://')
    const [force, setforce] = useState(0)
    //@ts-ignore
    const [{isPending}, makeNewRequest]= useMutation((settings:ThirdPartySendSettings)=>InvSend(courseId,settings))
    const response :ThirdPartySendStatus= useSelector(getInvitationsByCourseId(courseId))
    if (isPending) return <>Übermittle Daten</>
    
    return (<><EuiPanel betaBadgeLabel="3rd-Party">
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
                    <EuiButton iconType="package" onClick={()=>makeNewRequest({begin,end,plattformUrl,baseUrl,force})}>Übermitteln</EuiButton>
                    </EuiForm>
    
    </EuiPanel>
                    {response!==undefined&&<EuiCode language="json">{JSON.stringify(response)}</EuiCode>}
    </>)
}
export default ThirdPartySend