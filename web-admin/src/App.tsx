import React, { useState, Fragment } from 'react';
import mathphysinfoLogo from './images/logos/mathphysinfo.svg';
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
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


function App({store}) {

  const tabs = [
    {
      id: 'lecture--id',
      name: 'Veranstaltungen',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Evaluierte Veranstaltungen</h3>
          </EuiTitle>
          <EuiText>
            Hier kannst du die Liste aller zu evaluierenden Veranstaltungen sehen und sie bearbeiten.
            <ModulesOverview store={store}/>

          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'term--id',
      name: 'Semester',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Semester</h3>
          </EuiTitle>
          <EuiText>
            Hier können alle vergangenen Semester ausgewählt werden.
            <TermsOverview store={store}/>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'prof--id',
      name:"ProfessorInnen",
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>ProfessorInnen</h3>
          </EuiTitle>
          <EuiText>
            Eine Liste aller zu evaluierenden ProfessorInnen.
            <ProfOverview store={store}/>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'tutor--id',
      name: 'TutorInnen',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>TutorInnen</h3>
          </EuiTitle>
          <EuiText>
            Eine Liste aller zu evaluierenden TutorInnen.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'form--id',
      name: 'Bögen',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Ausgefüllte Bögen</h3>
          </EuiTitle>
          <EuiText>
            Hier erscheinen die fertig asugefüllten Bögen zu allen Veranstaltungen.
            <FormsOverview store={store}/>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'report--id',
      name: 'Berichte',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Berichte</h3>
          </EuiTitle>
          <EuiText>
            Beschreibung
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'hitme--id',
      name: 'Hitmes',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Hitmes</h3>
          </EuiTitle>
          <EuiText>
            Freitextkommentare sollen hier sortiert werden
          </EuiText>
        </Fragment>
      ),
    },
  ];

  return (
    <div className="App">
      <EuiHeader>
        <EuiHeaderLogo iconType={mathphysinfoLogo}></EuiHeaderLogo>
      </EuiHeader>

      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Ostseee (Was heißt das eigentlich?)</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>Ausgewähltes Semester <br/> Sommer 2020</EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
            <EuiTabbedContent
              expand={true}
              tabs={tabs}
              initialSelectedTab={tabs[0]}
              autoFocus="selected"
              color="success"
              onTabClick={tab => {console.log('clicked tab', tab);}}
            />

            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}

export default App;
