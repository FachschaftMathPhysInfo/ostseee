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


function App({store}) {

  const navDrawerRef = useRef(null);

  const termLink = [
    {
      label: 'Semester',
      iconType: 'calendar',
      flyoutMenu: {
        title: 'Semester',
        listItems: [
          {
            label: 'Nature Plugin (image as icon)',
            href: '#/layout/nav-drawer',
            icon: (
              <EuiImage
                size="s"
                alt="Random nature image"
                url="https://source.unsplash.com/300x300/?Nature"
              />
            ),
          },
        ],
      },
    },
  ]

  const moduleLink = [
    {
      label: 'Veranstaltungen',
      iconType: 'managementApp',
      flyoutMenu: {
        title: 'Veranstaltungen',
        listItems: [
          {
            label: 'Liste aller Veranstaltungen',
            href: '#/components/ModulesOverview',
            icon: (
              <EuiImage
                size="s"
                alt="Random nature image"
                url="https://source.unsplash.com/300x300/?Nature"
              />
            ),
          },
        ],
      },
    },
  ]

  const profLink = [
    {
      label: 'Professoren',
      iconType: 'user',
      flyoutMenu: {
        title: 'Professoren',
        listItems: [
          {
            label: 'Nature Plugin (image as icon)',
            href: '#/layout/nav-drawer',
            icon: (
              <EuiImage
                size="s"
                alt="Random nature image"
                url="https://source.unsplash.com/300x300/?Nature"
              />
            ),
          },
        ],
      },
    },
  ];

  const tutorLink = [
    {
      label: 'Tutoren',
      iconType: 'training',
      flyoutMenu: {
        title: 'Tutoren',
        listItems: [
          {
            label: 'Discover',
            href: '#/layout/nav-drawer',
            iconType: 'discoverApp',
            extraAction: {
              color: 'subdued',
              iconType: 'starEmpty',
              iconSize: 's',
              'aria-label': 'Add Discover to favorites',
            },
          },
        ],
      },
    },
  ];

  const formLink = [
    {
      label: 'Bögen',
      iconType: 'reportingApp',
      flyoutMenu: {
        title: 'Bögen',
        listItems: [
          {
            label: 'SIEM',
            href: '#/layout/nav-drawer',
            iconType: 'securityApp',
          },
          {
            label: 'Endpoints',
            href: '#/layout/nav-drawer',
            iconType: 'securityAnalyticsApp',
            extraAction: {
              color: 'subdued',
              iconType: 'starEmpty',
              iconSize: 's',
              'aria-label': 'Add SIEM to favorites',
            },
          },
        ],
      },
    },
  ];

  const reportLink = [
    {
      label: 'Berichte',
      iconType: 'notebookApp',
      flyoutMenu: {
        title: 'Berichte',
        listItems: [
          {
            label: 'Site search',
            href: '#/layout/nav-drawer',
            iconType: 'searchProfilerApp',
            extraAction: {
              color: 'subdued',
              iconType: 'starEmpty',
              iconSize: 's',
              'aria-label': 'Add Enterprise search to favorites',
            },
          },
        ],
      },
    },
  ];

  const hitmeLink = [
    {
      label: 'HitMe',
      iconType: 'pencil',
      flyoutMenu: {
        title: 'HitMe',
        listItems: [
          {
            label: 'Logs',
            href: '#/layout/nav-drawer',
            iconType: 'logsApp',
            extraAction: {
              color: 'subdued',
              iconType: 'starEmpty',
              iconSize: 's',
              'aria-label': 'Add Logs to favorites',
            },
          },
        ],
      },
    },
  ];

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

      {/* Tab View */}
      {/* <EuiPage>
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
      </EuiPage> */}

      <EuiNavDrawer ref={navDrawerRef}>
        <EuiNavDrawerGroup listItems={termLink} />
        <EuiNavDrawerGroup listItems={moduleLink} />
        <EuiNavDrawerGroup listItems={profLink} />
        <EuiNavDrawerGroup listItems={tutorLink} />
        <EuiNavDrawerGroup listItems={formLink} />
        <EuiNavDrawerGroup listItems={reportLink} />
        <EuiNavDrawerGroup listItems={hitmeLink} />
      </EuiNavDrawer>
      <EuiPage className="euiNavDrawerPage">
        <EuiPageBody className="euiNavDrawerPage__pageBody">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Page title</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Content title</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              {/* Tables to show */}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>  
    </div>
  );
}

export default App;
