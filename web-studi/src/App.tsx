import React, { useState, Fragment } from 'react';
import logo from './logo.svg';
import {EuiHeader} from '@elastic/eui';
import './App.css';
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
} from "@elastic/eui";
import { EuiHeaderLogo } from '@elastic/eui';
import store from './lib/store';
import { EuiFlyoutHeader } from '@elastic/eui';
import { EuiFlyoutBody } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { EuiFlyout } from '@elastic/eui';
import { EuiButton } from '@elastic/eui';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import Form from './components/Form';
import { EuiSpacer } from '@elastic/eui';

import mathphysinfoLogo from "./images/logos/mathphysinfo.svg";
import logoDe from "./images/logos/de-de.svg";
import logoEn from "./images/logos/en-en.svg";
import { EuiButtonIcon } from '@elastic/eui';
import { EuiCallOut } from '@elastic/eui';
import { EuiTabbedContent } from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';
import { EuiCard } from '@elastic/eui';
import { EuiProgress } from '@elastic/eui';
import { EuiPortal } from '@elastic/eui';
import { EuiSuperSelect } from '@elastic/eui';
import { EuiHeaderSection } from '@elastic/eui';
function App() {
  const [isFlyoutPrivacyVisible, setIsFlyoutPrivacyVisible] = useState(false);

  const closeFlyoutPrivacy = () => setIsFlyoutPrivacyVisible(false);

  const showFlyoutPrivacy = () => setIsFlyoutPrivacyVisible(true);
  let flyoutPrivacy;
  if (isFlyoutPrivacyVisible) {
    flyoutPrivacy = (
      <EuiFlyout
        onClose={closeFlyoutPrivacy}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle >
            <h2 id="flyoutSmallTitle">Datenschutz</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              Hier kommt beschreibender Text hin.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  const [isFlyoutLegalVisible, setIsFlyoutLegalVisible] = useState(false);

  const closeFlyoutLegal = () => setIsFlyoutLegalVisible(false);

  const showFlyoutLegal = () => setIsFlyoutLegalVisible(true);
  let flyoutLegal;
  if (isFlyoutLegalVisible) {
    flyoutLegal = (
      <EuiFlyout
        onClose={closeFlyoutLegal}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle >
            <h2 id="flyoutSmallTitle">Impressum</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              Hier kommt beschreibender Text hin.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  const sections = [
    {
      value: 'section_1',
      inputDisplay: 'Einführung',
      dropdownDisplay: (
        <Fragment>
          <strong> Einführung</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
             Infotext
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Allgemeines',
      dropdownDisplay: (
        <Fragment>
          <strong>Allgemeine Fragen</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Allgemeine Fragen 
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Tutor*in',
      dropdownDisplay: (
        <Fragment>
          <strong>Tutor*in</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Fragen zum Tutorium
            </p>
          </EuiText>
        </Fragment>
      ),
    }
  ];

  const [section, setSection] = useState('section_1');
  const onChangeSection = value => {
    setSection(value);
  };
  const Headersections = [
    {
      items: [
        <EuiHeaderLogo
          iconType={mathphysinfoLogo}
        />,
      ],
    },{
      items: [<div style={{display:"flex", flexDirection:"column",width:"60vw"}} >
        
        <EuiSuperSelect
      options={sections}
      valueOfSelected={section}
      onChange={value => onChangeSection(value)}
      itemLayoutAlign="top"
      hasDividers
      fullWidth={true}
    /><EuiProgress size="s" max={100} value={10} color="primary" position="absolute" /></div>
      ],
      //@ts-ignore
      borders:"none",
      width:"1000px"
    },
    {
      items: [
        <div style={{ padding: 16 }}>
          <EuiButtonIcon iconType={logoDe} iconSize="l" disabled={true}></EuiButtonIcon>
          <EuiButtonIcon iconType={logoEn} disabled={false}></EuiButtonIcon>
        </div>,
      ],
    },
  ];
  const tabs = [
    {
      id: 'anonym--id',
      name: 'Anonymität',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Anonymität</h3>
          </EuiTitle>
          <EuiText>
           Es ist uns wichtig, dass deine Angaben anonymisiert nur an die Dozenten weitergegeben werden.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'sicherheit--id',
      name: 'Sicherheit',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Sicherheit</h3>
          </EuiTitle>
          <EuiText>
            Die Übertragung der Daten erfolgt verschlüsselt.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'integritaet--id',
      name:"Integrität",
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Integrität</h3>
          </EuiTitle>
          <EuiText>
            Die Teilnahme an dieser Umfrage ist nur über anonymisierte TANs möglich.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'verlaesslichkeit--id',
      name: 'Verlässlichkeit',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Verlässlichkeit</h3>
          </EuiTitle>
          <EuiText>
            Auch bei schlechter Internetverbindung hast du die Möglichkeit, dein Feedback rückzumelden.
          </EuiText>
        </Fragment>
      ),
    },
  ];

  return (
    <div className="App">
      //@ts-ignore
      <EuiHeader position="fixed" style={{display:"flex"}} sections={Headersections}>
      
      </EuiHeader>
      
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Evaluation im Sommersemester</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
            <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
              <EuiButton onClick={showFlyoutPrivacy}>Datenschutz</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
            <EuiButton onClick={showFlyoutLegal}>Impressum</EuiButton>
            </EuiFlexItem>
            </EuiFlexGroup>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Willkommen!</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody><p style={{textAlign:"left", lineHeight:"1.75"}}>
              Diese Evaluation wird von der Studienkommission in Zusammenarbeit mit der Fachschaft MathPhysInfo durchgeführt.
              Sie soll helfen, die Lehre zu verbessern bzw.  Lehrveranstaltungen guter Qualität zu erhalten. Bitte lese die Fragen sorgfältig durch und beantworte sie anschließend.
              </p>
              <p style={{textAlign:"left", lineHeight:"1.75"}}> Diese Umfrage betrifft folgende Veranstaltung: <b>Physik I</b> bei <b>Frau Mustermann</b></p>
                <br></br>
                <EuiCard
        layout="vertical"
        title={'Prinzipien der Evaluation'}
        description=""
        href="#"
      >
     <EuiTabbedContent
      tabs={tabs}
      initialSelectedTab={tabs[0]}
      autoFocus="selected"
      color="success"
      onTabClick={tab => {
        console.log('clicked tab', tab);
      }}
    /></EuiCard>
                </EuiPageContentBody>
          </EuiPageContent>
          <EuiSpacer size="xl" />
          <Form/>
        </EuiPageBody>

      </EuiPage>
      {/* <FacultiesOverView
       store={store}></FacultiesOverView> */}
      {/* header */}
      {/* landing page */}

      {/* sprachauswahl */}
      {/* Datenschutz, Verantwortliche */}
      {/* unauffällige links zu impressum, legal, license */}

      {/* FRAGEBOGEN */}

      {/* sections */}
      {/* question */}
      {/* antwortmöglichkeit */}
      {/* question */}
      {/* antwortmöglichkeit */}
      
       {flyoutPrivacy}
       {flyoutLegal}
    </div>
  );
}

export default App;
