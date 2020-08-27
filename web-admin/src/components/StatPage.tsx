import React from "react"
import { EuiFlexGroup, EuiFlexItem, EuiStat, EuiTitle, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiButton, EuiPageContentBody, EuiLoadingSpinner } from "@elastic/eui"
import { useRequest } from "redux-query-react"
import { StatusGet } from "../query-configs/status"
import {useSelector} from 'react-redux'
import { Status } from "ostseee-web-common"
const StatPage = props =>{
    useRequest(StatusGet())
    const status :Status = useSelector((state)=>state.entities.Status)
    if (status==undefined) {
      return <EuiLoadingSpinner></EuiLoadingSpinner>
    }
    return (
      <EuiPageContent >
      <EuiPageContentHeader>
          <EuiPageContentHeaderSection><EuiTitle><h1>Willkommen!</h1></EuiTitle></EuiPageContentHeaderSection>
          
      </EuiPageContentHeader>
      <EuiPageContentBody>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiStat title={status.counts?.terms||0} description="Terms" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.courses||0} description="Courses" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.courseprofs||0} description="CourseProfs" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.tutors||0} description="Tutors" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.options||0} description="Options" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.questionaires||0} description="Questionaires" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.invitations||0} description="Invitations" />
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiStat title={status.counts?.singleanswers||0} description="Data points" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
        <EuiStat title={status.sysstats.ram} description="RAM" /> </EuiFlexItem>
          <EuiFlexItem>
        <EuiStat title={status.sysstats.ram10} description="RAM(used)" />
        </EuiFlexItem>
      </EuiFlexGroup>
      </EuiPageContentBody>
  </EuiPageContent>
    )
}

export default StatPage