import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle, EuiPageContentBody, EuiForm, EuiFieldPassword, EuiFormRow, EuiFieldText, EuiButton } from "@elastic/eui"
import React, { useState } from "react"
import { login, getSession } from "../lib/session"
import { Redirect, useParams, useHistory } from "react-router"

export const LoginPage = props =>{
    const {redirect} = useParams()
    const [password, setpassword] = useState('')
    const [userName, setuserName] = useState('')
    const [loged, setlogin] = useState(false)
    const history =useHistory()
    const log = ()=>{
        login(userName,password).then(()=>history.push(props.loc))
    }
    return ( <EuiPage>
        <EuiPageBody component="div">
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Login</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiForm>
                <EuiFormRow label="Username"> 
                    <EuiFieldText value={userName} onChange={e=>setuserName(e.target.value)}></EuiFieldText>
                </EuiFormRow>
                <EuiFormRow label="Passwort"> 
                    <EuiFieldPassword value={password} onChange={e=>setpassword(e.target.value)}></EuiFieldPassword>
                </EuiFormRow>
                <EuiButton fullWidth fill iconType="lockOpen" onClick={()=>log()}>Login</EuiButton>
                </EuiForm>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>)
}