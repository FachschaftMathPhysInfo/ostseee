import React, { useState } from 'react';
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
  return (
    <div className="App">
      <EuiHeader>
      <EuiHeaderLogo iconType="logoKibana"></EuiHeaderLogo>
        
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
                  <h2>Content title</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                Content abilities
          </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>Content body</EuiPageContentBody>
          </EuiPageContent>
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
      <div id="landingpage">
        <h1>Willkommen</h1>
      </div>
      {/* <FacultiesOverView
       store={store}></FacultiesOverView> */}
       {flyoutPrivacy}
       {flyoutLegal}
    </div>
  );
}

export default App;
