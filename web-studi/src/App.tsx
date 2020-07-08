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
import { getEmptyForm } from './selectors/emptyform';
import {useSelector} from 'react-redux'
import { getAnswersCount, getLastSectionAnswered } from './selectors/answers';
import { EmptyForm } from 'ostseee-web-common';
import translate from './lib/translate';
import LicensePage from './components/LicensePage';
function App() {

  
  
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
   const emptyForm:EmptyForm= useSelector(getEmptyForm)
   const total = emptyForm?.abstractForm.pages.map(p=>p.sections.map(s=>s.questions.map(q=>q.regards=="lecturer"?emptyForm.profs?.length:1).reduce((pv,cv)=>pv+cv,0)).reduce((pv,cv)=>pv+cv,0)).reduce((pv,cv)=>pv+cv,0)
   const answersCount = useSelector(getAnswersCount)
   const sections = emptyForm==null?[]:emptyForm.abstractForm.pages.flatMap(p=>p.sections.map(section=>{
     return  {
        value: section.id,
        inputDisplay: translate(section.title,languageSelected),
        dropdownDisplay: (
          <Fragment>
            <strong>{translate(section.title,languageSelected)}</strong>
          </Fragment>
        ),
      }
    }))
    const section =useSelector(getLastSectionAnswered)
    const onChangeSection = value => {
      document.getElementById(value).scrollIntoView()
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
    /><EuiProgress size="s" max={total} value={answersCount} color="primary" position="absolute" /></div>
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
         <Route path="/licenses/:bibliothek">
          <LicensePage ></LicensePage>
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
