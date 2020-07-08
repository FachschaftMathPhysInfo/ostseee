
import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from '@elastic/eui';
import { useParams } from 'react-router';
import licenseInfos from '../data/licenseInfos.json'
import EuiCustomLink from './EuiCustomLink';
import { EuiCode } from '@elastic/eui';
export default () =>{ 
    const {bibliothek}=useParams()
    console.log(bibliothek)
    //@ts-ignore
    const licenses = Object.keys(licenseInfos).map((s:String)=>s.replaceAll("/","-sl-"))
    const license = licenseInfos[bibliothek.replaceAll("-sl-","/")]
    let licenseText = license?.licenseText.split('\n').map ((item, i) => <p key={i}>{item}</p>);
    return (
  <EuiPage>
    <EuiPageSideBar><h3>Bibliotheken</h3><ul>{licenses.map(software=>(<li key={software}><EuiCustomLink to={`/licenses/${software}`}>{software}</EuiCustomLink></li>))}</ul></EuiPageSideBar>
    <EuiPageBody component="div">
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Verwendete Drittbibliotheken</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>Lizenzinformationen</EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
    <h2>{license?.name}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            {license?.version}
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody><code>{licenseText}</code></EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);}
