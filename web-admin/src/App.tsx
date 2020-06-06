import React, { useState, useRef, Fragment } from 'react';
import mathphysinfoLogo from './images/logos/mathphysinfo.svg';
import {
  EuiButton,
  EuiIcon,
  EuiImage,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,  
  //@ts-ignore
  EuiNavDrawerGroup,
    //@ts-ignore
  EuiNavDrawer,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiTabbedContent,
} from "@elastic/eui";
import './App.css';
import store from './lib/store';

//@ts-ignore
import FormsOverview from './components/FormsOverview';
import ProfOverview from './components/ProfOverview';
import ModulesOverview from './components/ModulesOverview';
import TermsOverview from './components/TermsOverview';
import { EuiCollapsibleNavGroup } from '@elastic/eui';
import { EuiCollapsibleNav } from '@elastic/eui';
import EuiCustomLink from './EuiCustomLink';
import { Route, Switch, useHistory } from 'react-router';
import ProfDetail from './components/ProfDetail';
import TutorsOverview from './components/TutorsOverview';


function App({store}) {
  
  const navDrawerRef = useRef(null);
  const history = useHistory();

  const termLink = [
    {
      label: 'Semester',
      iconType: 'calendar',
      onClick: ()=>{history.push("/terms")}
    },
  ]

  const moduleLink = [
    {
      label: 'Veranstaltungen',
      iconType: 'managementApp',
      onClick: ()=>{history.push("/modules")}
    },
  ]
  const profLink = [
    {
      label: 'Professoren',
      iconType: 'user',
      onClick:()=>{history.push("/profs")}
    },
  ];

  const tutorLink = [
    {
      label: 'Tutoren',
      iconType: 'training',
      onClick: ()=>{history.push("/tutors")}
    },
  ];

  const formLink = [
    {
      label: 'Bögen',
      iconType: 'reportingApp',
      onClick: ()=>{history.push("/forms")}
    },
  ];

  const reportLink = [
    {
      label: 'Berichte',
      iconType: 'notebookApp',
      onClick: ()=>{history.push("/reports")}
    },
  ];

  const hitmeLink = [
    {
      label: 'HitMe',
      iconType: 'pencil',
      onClick: ()=>{history.push("/hitme")}
    },
  ];

  const [navIsOpen,setNavIsOpen] = useState(false);
  const navbar = (<EuiCollapsibleNav isOpen={navIsOpen}  
    onClose={() => setNavIsOpen(false)}
    isDocked={true}
    button={
      <EuiHeaderSectionItemButton
        aria-label="Toggle main navigation"
        onClick={() => setNavIsOpen(!navIsOpen)}>
        <EuiIcon type={'menu'} size="m" aria-hidden="true" />
      </EuiHeaderSectionItemButton>
    }>
    <EuiCollapsibleNavGroup >
      <EuiNavDrawerGroup listItems={termLink} />
      <EuiNavDrawerGroup listItems={moduleLink} />
      <EuiNavDrawerGroup listItems={profLink} />
      <EuiNavDrawerGroup listItems={tutorLink} />
      <EuiNavDrawerGroup listItems={formLink} />
      <EuiNavDrawerGroup listItems={reportLink} />
      <EuiNavDrawerGroup listItems={hitmeLink} />
    </EuiCollapsibleNavGroup>
    </EuiCollapsibleNav>)
  const leftbar=[navbar,(<EuiHeaderLogo iconType={mathphysinfoLogo}></EuiHeaderLogo>)]

  return (
    <div className="App">
      <EuiHeader sections={[
              {
                items: leftbar,
                borders: 'none',
              },]}>
        
      </EuiHeader>

      <Switch>
        <Route path="/about">
          About
        </Route>
        <Route path="/modules">
          <ModulesOverview/>
        </Route>
        <Route path="/terms">
          <TermsOverview/>
        </Route>
        <Route path="/forms">
          <FormsOverview/>
        </Route>
        <Route path="/tutors">
        </Route>
        <Route path="/profs">
          <ProfOverview/>
        </Route>
        <Route path="/reports">
        </Route>
        <Route path="/hitme">
          HitMe
        </Route>
        <Route path="/profs/:profId">
          <ProfDetail></ProfDetail>
        </Route>
        {/* default */}
        <Route path="/">
          willkommen
          <EuiCustomLink to={`/profs/${32}`}>Hier</EuiCustomLink>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
