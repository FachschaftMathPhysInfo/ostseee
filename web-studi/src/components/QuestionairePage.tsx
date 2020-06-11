import { EuiPage, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiPageContentBody, EuiText, EuiSpacer, EuiCard, EuiTabbedContent, EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React, { useState, Fragment } from "react";
import Form from "./Form";
import { EuiFlyout, EuiFlyoutHeader, EuiFlyoutBody } from "@elastic/eui";
import {useParams} from 'react-router';
import { useRequest } from "redux-query-react";
import {emptyFormGet} from "../query-configs/emptyform";
import {getEmptyForm} from "../selectors/emptyform"
import {useSelector} from "react-redux";
import { EmptyForm } from "ostseee-web-common";
import { EuiLoadingContent } from "@elastic/eui";
import { getLanguage } from "../selectors/language";
import { EuiPortal } from "@elastic/eui";
const Questionaire = props => {
    const languageCode =   useSelector(getLanguage )
    const {questionaireId} = useParams();
    useRequest(emptyFormGet(questionaireId));
    const emptyForm : EmptyForm = useSelector(getEmptyForm);
    const [isFlyoutPrivacyVisible, setIsFlyoutPrivacyVisible] = useState(false);

    const closeFlyoutPrivacy = () => setIsFlyoutPrivacyVisible(false);
  
    const showFlyoutPrivacy = () => setIsFlyoutPrivacyVisible(true);
    const toggleFlyoutPrivacy = () => setIsFlyoutPrivacyVisible(!isFlyoutPrivacyVisible);
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
    const toggleFlyoutLegal = () => setIsFlyoutLegalVisible(!isFlyoutLegalVisible);
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
      
      if(emptyForm=== undefined){
        return (
          <div>
    <EuiLoadingContent lines={3} />
  </div>
        )
      }
    return (<EuiPage>
        <EuiPageBody component="div">
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle size="l">
                        <h1>Evaluation im Sommersemester</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
                <EuiPageHeaderSection>

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
                <EuiPageContentBody>
                    <EuiText style={{ textAlign: "left" }}>
                        Diese Evaluation wird von der Studienkommission in Zusammenarbeit mit der Fachschaft MathPhysInfo durchgeführt.
                        Sie soll helfen, die Lehre zu verbessern bzw.  Lehrveranstaltungen guter Qualität zu erhalten. Bitte lese die Fragen sorgfältig durch und beantworte sie anschließend.
          </EuiText>
                    <EuiText style={{ textAlign: "left" }}> Diese Umfrage betrifft folgende Veranstaltung: </EuiText>
                    <EuiSpacer size="l" />
                    <EuiText><b>Physik I</b> bei <b>{emptyForm.profs.map(p=>p.lastname).join(", ")}</b></EuiText>
                    <br></br>
                    <EuiCard
                        layout="vertical"
                        title={'Prinzipien der Evaluation'}
                        description=""
                    // href="#"
                    >
                        <EuiTabbedContent
                            expand={true}
                            tabs={tabs}
                            initialSelectedTab={tabs[0]}
                            autoFocus="selected"
                            color="success"
                            onTabClick={tab => {
                                console.log('clicked tab', tab);
                            }}
                        /></EuiCard>

                    <EuiSpacer size="xl" />
                    <a href="#abschnitt"><EuiButton fill iconType="arrowDown">
                        Evaluation beginnen
  </EuiButton></a>
                    <EuiSpacer size="xl" />
                    <EuiFlexGroup gutterSize="s" alignItems="center">
                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={toggleFlyoutPrivacy}>Datenschutz</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={toggleFlyoutLegal}>Impressum</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPageContentBody>
            </EuiPageContent>
            <EuiSpacer size="xl" />
            <Form  emptyForm={emptyForm}/>
        </EuiPageBody>
        <EuiPortal>
          <div style={{zIndex:0}}>
        {flyoutPrivacy}
       {flyoutLegal}
       </div>
       </EuiPortal>
    </EuiPage>
    )
}
export default Questionaire;