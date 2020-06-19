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
import { EuiCallOut } from "@elastic/eui";
import translate from "../lib/translate";
import translation from "../data/translation.json";
const Questionaire = props => {
    const languageCode =   useSelector(getLanguage )
    const {questionaireId} = useParams();
    const [{isPending,status}]=useRequest(emptyFormGet(questionaireId));
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
      
      if(isPending){
        return (
          <div>
            <EuiPage>
              <EuiPageContent><EuiPageHeader><h1>{translate(translation["eval.loading"],languageCode)}</h1></EuiPageHeader>
    <EuiLoadingContent lines={3} />
    </EuiPageContent>
    </EuiPage>
  </div>
        )
      }
      if(status!=200){
        return (
          <div>
            <EuiPage>
        <EuiPageContent>
          <EuiCallOut title={translate(translation["eval.error.loading"],languageCode)} iconType="alert" color="warning">{translate(translation["eval.error.loading.intro"],languageCode)}<ul>
            <li>{translate(translation["eval.error.invalid.token"],languageCode)}</li>
            <li>{translate(translation["eval.error.ended.survey"],languageCode)}</li>
            <li>{translate(translation["eval.error.difficulties"],languageCode)}</li>
            </ul>
            {translate(translation["eval.error.outro"],languageCode)}
            </EuiCallOut>
    </EuiPageContent>
    </EuiPage>
  </div>
        )
      }
    return (<EuiPage>
        <EuiPageBody component="div">
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle size="l">
                        <h1>{translate(translation["eval.title"],languageCode)}</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
                <EuiPageHeaderSection>

                </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>
                <EuiPageContentHeader>
                    <EuiPageContentHeaderSection>
                        <EuiTitle>
                            <h2>{translate(translation["eval.welcome"],languageCode)}</h2>
                        </EuiTitle>
                    </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                    <EuiText style={{ textAlign: "left" }}>
                      {translate(translation["eval.introduction"],languageCode)}
                      </EuiText>
                    <EuiText style={{ textAlign: "left" }}>{translate(translation["eval.concerns"],languageCode)} </EuiText>
                    <EuiSpacer size="l" />
                    <EuiText><b>{emptyForm.moduleName}</b> {translate(translation["eval.by"],languageCode)} <b>{emptyForm.profs.map(p=>p.lastname).join(", ")}</b></EuiText>
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
                    {translate(translation["eval.begin"],languageCode)}
                        
  </EuiButton></a>
                    <EuiSpacer size="xl" />
                    <EuiFlexGroup gutterSize="s" alignItems="center">
                        <EuiFlexItem grow={false}>
                          <EuiButton onClick={toggleFlyoutPrivacy}>{translate(translation["eval.privacy"],languageCode)}</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={toggleFlyoutLegal}>{translate(translation["eval.legal"],languageCode)}</EuiButton>
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