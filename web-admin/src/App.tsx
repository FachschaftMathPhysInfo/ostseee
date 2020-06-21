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
  EuiCollapsibleNav,
  EuiListGroupItem,
} from "@elastic/eui";
import './App.css';
import store from './lib/store';

//@ts-ignore
import FormsOverview from './components/FormsOverView';
import ProfOverview from './components/ProfOverview';
import ModulesOverview from './components/ModulesOverview';
import TermsOverview from './components/TermsOverview';
import { EuiCollapsibleNavGroup } from '@elastic/eui';
import EuiCustomLink from './EuiCustomLink';
import { Route, Switch, useHistory } from 'react-router';
import ProfDetail from './components/ProfDetail';
import TutorsOverview from './components/TutorsOverview';
import CoursesOverview from './components/CoursesOverview';
import FacultiesOverview from './components/FacultiesOverView';
import FacultyCreateDialog from './components/FacultyCreateDialog';

import ProfEdit from './components/ProfEdit';
import CourseDetail from './components/CourseDetail';

function App({store}) {
  
  const navDrawerRef = useRef(null);
  const history = useHistory();


  let links = [
    {
      label: 'Fakultäten',
      iconType: 'node',
      isActive:false,
      onClick: (e)=>{history.push("/faculties"); setActiveItem(0)},
    },
    {
      label: 'Semester',
      iconType: 'calendar',
      onClick: ()=>{history.push("/terms"); setActiveItem(1)},
    },
    {
      label: 'Module',
      iconType: 'managementApp',
      onClick: ()=>{history.push("/modules"); setActiveItem(2)}
    },
    {
      label: 'Veranstaltungen',
      iconType: 'folderOpen',
      onClick: ()=>{history.push("/courses"); setActiveItem(3)}
    },
    {
      label: 'Professoren',
      iconType: 'user',
      onClick:()=>{history.push("/profs"); setActiveItem(4)},
    },
    {
      label: 'Tutoren',
      iconType: 'training',
      onClick: ()=>{history.push("/tutors"); setActiveItem(5)}
    },
    {
      label: 'Bögen',
      iconType: 'reportingApp',
      onClick: ()=>{history.push("/forms"); setActiveItem(6)}
    },
    {
      label: 'Berichte',
      iconType: 'notebookApp',
      onClick: ()=>{history.push("/reports"); setActiveItem(7)}
    },
    {
      label: 'HitMe',
      iconType: 'pencil',
      onClick: ()=>{history.push("/hitme"); setActiveItem(8)}
    },
  ];

  const [navIsOpen,setNavIsOpen] = useState(true);

  const [navLinks,setNavLinks] = useState(links);

  const setActiveItem = (selectedItemNumber) =>{
    let linksCopy = [...links];
    linksCopy.forEach((item) => item.isActive=false);
    linksCopy[selectedItemNumber].isActive=true;
    setNavLinks(linksCopy);
  }
  
  const navbar = (<EuiCollapsibleNav isOpen={navIsOpen}  
    onClose={() => setNavIsOpen(false)} 
    isDocked={navIsOpen}
    hideButtonIfDocked={false}
    
    button={
      <EuiHeaderSectionItemButton
        aria-label="Toggle main navigation"
        onClick={() => setNavIsOpen(!navIsOpen)}>
        <EuiIcon type={'menu'} size="m" aria-hidden="true" />
      </EuiHeaderSectionItemButton>
    }>
    <EuiCollapsibleNavGroup>
      <EuiNavDrawerGroup listItems={navLinks} gutterSize="m" showToolTips/>
    </EuiCollapsibleNavGroup>
    </EuiCollapsibleNav>)
    
  const leftbar=[navbar,(<EuiHeaderLogo iconType={mathphysinfoLogo}></EuiHeaderLogo>)]

  return (
    <div className="App">
      <EuiPage>
      <EuiHeader position="fixed" sections={[
              {
                items: leftbar,
                borders: 'none',
              },]}>
        
      </EuiHeader>
<EuiPageBody component="div">
      <Switch>
        <Route path="/about">
          About
        </Route>
        <Route path="/faculties/new">
          <FacultyCreateDialog/>
        </Route>
        <Route path="/faculties">
          <FacultiesOverview/>
        </Route>
        <Route path="/modules">
          <ModulesOverview/>
        </Route>
        <Route path="/courses/:courseId">
          <CourseDetail></CourseDetail>
        </Route>
        <Route path="/courses">
          <CoursesOverview/>
        </Route>
        
        <Route path="/terms">
          <TermsOverview/>
        </Route>
        <Route path="/forms">
          <FormsOverview/>
        </Route>
        <Route path="/tutors">
        </Route>
        <Route path="/profs/:profId/edit">
          <ProfEdit></ProfEdit>
        </Route>
        <Route path="/profs/:profId">
          <ProfDetail></ProfDetail>
        </Route>
        <Route path="/profs">
          <ProfOverview/>
        </Route>
        <Route path="/reports">
        </Route>
        <Route path="/hitme">
          HitMe
        </Route>
        {/* default */}
        <Route path="/">
          willkommen
          <EuiCustomLink to={`/profs/${32}`}>Hier</EuiCustomLink>
        </Route>
      </Switch>
      </EuiPageBody>
      </EuiPage>
    </div>
  );
}

export default App;
