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
import store, { changeLanguage } from './lib/store';
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
import { EuiButtonGroup } from '@elastic/eui';

import { Route, Switch, useHistory } from 'react-router';
import Questionaire from './components/QuestionairePage';
function App() {

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
      value: 'option_three',
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
  const languageOptions = [
    {
      id: `de`,
      label: 'de',
      iconType: logoDe,
    },
    {
      id: `en`,
      label: 'en',
      iconType: logoEn,
    },
  ];
  const [languageSelected, setSelectedLanguageId] = useState('de');
  const [idToSelectedLanguageMap, setIdToSelectedLanguageMap] = useState({'de':true});
  const onChangeLanguage = (languageId:string) => {
    //@ts-ignore
    store.dispatch(changeLanguage(languageId))
    setSelectedLanguageId(languageId);
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
        // <div style={{ padding: 16 }}>
          // <EuiButtonIcon iconType={logoDe} iconSize="l" disabled={true}></EuiButtonIcon>
          // <EuiButtonIcon iconType={logoEn} disabled={false}></EuiButtonIcon>
        // </div>,
        <div style={{ padding: 16 }}>
          <EuiButtonGroup buttonSize="m"
            legend="select language"
            options={languageOptions}
            idSelected={languageSelected}
            idToSelectedMap={idToSelectedLanguageMap}
            onChange={id => onChangeLanguage(id)}
            type="single"
            isIconOnly
          />
        </div>
      ],
    },
  ];
  

  return (
    <div className="App">
      //@ts-ignore
      <EuiHeader position="fixed" style={{display:"flex"}} sections={Headersections}>
      
      </EuiHeader>
      <Switch>
        <Route path="/questionaire/:questionaireId">
          <Questionaire lang={"de"}></Questionaire>
         </Route>
      </Switch>
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
      
  
    </div>
  );
}

export default App;
