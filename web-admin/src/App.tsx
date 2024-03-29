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
  EuiNavDrawerGroup,
  EuiNavDrawer,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiTabbedContent,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiListGroupItem,
  EuiButtonIcon,
} from "@elastic/eui";
import './App.css';
import store from './lib/store';
import { Route, Switch, useHistory } from 'react-router';

import CoursesOverview from './components/CoursesOverview';
import FacultiesOverview from './components/FacultiesOverview';
import FormsOverview from './components/FormsOverview';
import ModulesOverview from './components/ModulesOverview';
import ProfOverview from './components/ProfOverview';
import TermsOverview from './components/TermsOverview';
import EuiCustomLink from './EuiCustomLink';
import TutorsOverview from './components/TutorsOverview';

import ProfEdit from './components/ProfEdit';
import ProfNew from './components/ProfNew';
import ProfDetail from './components/ProfDetail';
import CourseEdit from './components/CourseEdit';
import CourseDetail from './components/CourseDetail';
import CourseNew from './components/CourseNew';
import ModuleEdit from './components/ModuleEdit';
import ModuleNew from './components/ModuleNew';
import ModuleDetail from './components/ModuleDetail';
import TermEdit from './components/TermEdit';
import TermNew from './components/TermNew';
import TermDetail from './components/TermDetail';


import FacultyEdit from './components/FacultyEdit';
import FacultyNew from './components/FacultyNew';
import FacultyDetail from './components/FacultyDetail';
import FormDetail from './components/FormDetail';
import FormEdit from './components/FormEdit';
import FormNew from './components/FormNew';
import TutorDetail from './components/TutorDetail';
import TutorEdit from './components/TutorEdit';
import { logOut } from './lib/session';
import StatPage from './components/StatPage';


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
    <div className="body-tag">
      <EuiPage className="body-tag">
      <EuiHeader position="fixed" sections={[
              {
                items: leftbar,
                borders: 'none',
              },
              {
                items: [(<EuiButtonIcon iconType="lock" onClick={()=>{logOut(); history.push("/")}}></EuiButtonIcon>)]
              }]}>
        
      </EuiHeader>
<EuiPageBody component="div" className="body-tag">
      <Switch>
        <Route path="/about">
          About
        </Route>
        <Route path="/faculties/new">
          <FacultyNew/>
        </Route>
        <Route path="/faculties/:facultyId/edit">
          <FacultyEdit/>
        </Route>
        <Route path="/faculties/:facultyId">
          <FacultyDetail/>
        </Route>
        <Route path="/faculties">
          <FacultiesOverview/>
        </Route>
        <Route path="/modules/new">
          <ModuleNew/>
        </Route>
        <Route path="/modules/:moduleId/edit">
          <ModuleEdit/>
        </Route>
        <Route path="/modules/:moduleId">
          <ModuleDetail/>
        </Route>
        <Route path="/modules">
          <ModulesOverview/>
        </Route>
        <Route path="/courses/new">
          <CourseNew/>
        </Route>
        <Route path="/courses/:courseId/tutors/:tutorId/edit">
          <TutorEdit></TutorEdit>
        </Route>
        <Route path="/courses/:courseId/tutors/:tutorId">
          <TutorDetail></TutorDetail>
        </Route>
        <Route path="/courses/:courseId/edit">
          <CourseEdit></CourseEdit>
        </Route>
        <Route path="/courses/:courseId">
          <CourseDetail></CourseDetail>
        </Route>
        <Route path="/courses">
          <CoursesOverview/>
        </Route>
        <Route path="/terms/new">
          <TermNew></TermNew>
        </Route>
        <Route path="/terms/:termId/edit">
          <TermEdit></TermEdit>
        </Route>
        <Route path="/terms/:termId">
          <TermDetail></TermDetail>
        </Route>
        <Route path="/terms">
          <TermsOverview/>
        </Route>
        <Route path="/forms/new">
          <FormNew/>
        </Route>
        <Route path="/forms/:forms/edit">
          <FormEdit/>
        </Route>
        <Route path="/forms/:formId">
          <FormDetail/>
        </Route>
        <Route path="/forms">
          <FormsOverview/>
        </Route>
        <Route path="/tutors">
        </Route>
        <Route path="/profs/new">
          <ProfNew></ProfNew>
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
          <StatPage></StatPage>
        </Route>
      </Switch>
      </EuiPageBody>
      </EuiPage>
    </div>
  );
}

export default App;
