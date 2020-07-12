import { getLanguage } from "../selectors/language"
import { useSelector } from 'react-redux'
import React, { useState } from "react"
import { EuiPage } from "@elastic/eui"
import { EuiPageContent } from "@elastic/eui"
import { EuiPageContentBody } from "@elastic/eui"
import { EuiPanel } from "@elastic/eui"
import translate from "../lib/translate"
import translation from "../data/translation.json"
import { EuiCard } from "@elastic/eui"
import { EuiFlexItem } from "@elastic/eui"
import { EuiFlexGrid } from "@elastic/eui"
import { EuiIcon } from "@elastic/eui"
import { EuiFlexGroup } from "@elastic/eui"
import EuiCustomLink from "./EuiCustomLink"
import { EuiSpacer } from "@elastic/eui"
import { EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle } from "@elastic/eui"
import { EuiPageBody, EuiPageHeader, EuiPageHeaderSection } from "@elastic/eui"
import { EuiFlyout } from "@elastic/eui"
import { useRequest } from "redux-query-react"
import { emptyFormGet } from "../query-configs/emptyform"
import { EmptyForm } from "ostseee-web-common"
import { getEmptyForm } from "../selectors/emptyform"
import { EuiFlyoutHeader, EuiFlyoutBody, EuiText } from "@elastic/eui"
import { EuiButton, EuiPortal } from "@elastic/eui"
const LandingPage = props => {
    const languageCode = useSelector(getLanguage)
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
            <h2 id="verantwortliche-stelle" >Verantwortliche Stelle</h2>
            <p>Für die Datenverarbeitung auf dieser Website ist die folgende Stelle verantwortlich:<br />
              <br />
Evaluationsteam der Fachschaft MathPhysInfo<br />
Im Auftrag der Fakultät für Physik und Astronomie<br />
Im Neuenheimer Feld 205<br />
Mathematikon, Raum 01.301<br />
69120 Heidelberg<br />
              <br />
Bei Fragen bezüglich des Datenschutzes kann das Evaluationsteam über die Emailadresse evaluation@mathphys.stura.uni-heidelberg.de kontaktiert werden.</p>
            <h2 id="zweck-der-datenerhebung" >Zweck der Datenerhebung</h2>
            <p>Mit der Evaluation wird den Dozierenden ein Mittel geboten, mit dem sie anonym Feedback zu ihren Lehrveranstaltungen erhalten können. Sie wird also verwendet zur Qualtitätssicherung von Veranstaltungen, die von der Fakultät für Physik und Astronomie der Universität Heidelberg angeboten werden.</p>
            <h2 id="rechtliche-grundlage" >Rechtliche Grundlage</h2>
            <p>Die Datenschutzvorgaben einer digitalen Evaluation werden im Besonderen Teil der Evaluationsordnung der Universität Heidelberg festgelegt. Außerdem orientiert sich das Evaluationsteam an den Datenschutzrichtlinien der Zentrale Datenschutzstelle der baden-württembergischen Universitäten (ZENDAS).</p>
            <h2 id="zugriff-auf-die-daten" >Zugriff auf die Daten</h2>
            <p>Die Umfrageergebnisse und organisatorischen Daten werden an der Fakultät durch zur Verschwiegenheit verpflichtete Hilfskräfte verarbeitet. Nur dieser Personenkreis hat Zugriff auf den Evaluationsserver.</p>
            <h2 id="art-der-erhobenen-daten" >Art der erhobenen Daten</h2>
            <p>Die Evaluationssoftware erhebt keine personenbezogenen Daten. Sie verarbeitet ausschließlich die von den Studierenden anonym zur Verfügung gestellten Evaluationsbögen.<br />
Das bedeutet insbesondere, dass der Server keine IP-Adressen oder Zeitstempel protokolliert, wie es auch in §6 (5) des Besonderen Teils der Evaluationsordnung vorgeschrieben wird.</p>
            <h2 id="dauer-der-datenspeicherung" >Dauer der Datenspeicherung</h2>
            <p>Die Umfrageergebnisse werden auf einem externen Medium geschützt gespeichert, um sie bis zur Vernichtung spätestens sieben Jahre nach Ende des Semesters vorliegen zu haben, wie es §10 (2) besonderer Teil der Evaluationsordnung festlegt.</p>
            <h2 id="hinweis-zum-recht-auf-auskunft-datenubertragbarkeit-und-loschung-der-daten" >Hinweis zum Recht auf Auskunft, Datenübertragbarkeit und Löschung der Daten</h2>
            <p>Die Evaluationsergebnisse können vom Evaluationsteam im Nachhinein keiner individuellen Person zugeordnet werden. Es besteht folglich seitens des Nutzers kein Auskunft-, Datenübertragungs- oder Löschungsrecht bezüglich der von ihm ausgefüllte Umfrage.</p>
            <h2 id="hinweis-zur-beschwerde-bei-einer-aufsichtsbehorde" >Hinweis zur Beschwerde bei einer Aufsichtsbehörde</h2>
            <p>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.<br />
              <br />
Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.</p>
            <h2 id="weitergabe-der-daten-an-dritte" >Weitergabe der Daten an Dritte</h2>
            <p>In der Evaluationsordnung der Universität Heidelberg wird festgelegt, dass alle in der Evaluation erhobenen Rohdaten  HeiQUALITY, dem zentrale Büro für Qualitätssicherung der Universität Heidelberg, zur Verfügung gestellt werden müssen.<br />
Außerdem erhält jeder Dozierende bzw. Tutor einen aggregierten Bericht zu der für ihn relevanten Veranstaltung. Der Studiendekan erhält einen Bericht über alle Veranstaltungen seines Lehrbereichs.</p>
            <h2 id="allgemeiner-hinweis-auf-cookies-und-analysetools" >Allgemeiner Hinweis auf Cookies und Analysetools</h2>
            <p>Die Evaluationswebsite verwendet weder Cookies noch Analysetools, sodass keine Auswertung von Nutzerdaten möglich ist.</p>
            <h2 id="ubermittlung-in-drittlander" >Übermittlung in Drittländer</h2>
            <p>Die Daten werden vom Evaluationsteam nicht auf Server übertragen, die sich im Ausland der Bundesrepublik Deutschland befinden.</p>
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
              <br />
Evaluationsteam der Fachschaft MathPhysInfo<br />
Im Auftrag der Fakultät für Physik und Astronomie<br />
Im Neuenheimer Feld 205<br />
Mathematikon, Raum 01.301<br />
69120 Heidelberg<br />
              <br />
              <EuiCustomLink to="/licenses/all">Rechliche Hinweise zu den verwendeten Bibliotheken</EuiCustomLink>
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
    return (<EuiPage>
        <EuiPageBody component="div">
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{translate(translation["eval.title"], languageCode)}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <EuiTitle size="m">
            <h2>{translate(translation["eval.date"], languageCode)}</h2>
          </EuiTitle>
        </EuiPageHeaderSection>
        </EuiPageHeader>
        
        <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{translate(translation["eval.welcome"], languageCode)}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
            <EuiPageContentBody>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiCard icon={<EuiIcon size="xxl" type="reporter"></EuiIcon>} title={translate(translation["landingpage.anonymity.header"], languageCode)} description={translate(translation["landingpage.anonymity.body"], languageCode)}></EuiCard>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiCard icon={<EuiIcon size="xxl" type="lock"></EuiIcon>} title={translate(translation["landingpage.security.header"], languageCode)} description={translate(translation["landingpage.security.body"], languageCode)}></EuiCard>
                    </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiCard icon={<EuiIcon size="xxl" type="inspect"></EuiIcon>} title={translate(translation["landingpage.integrity.header"], languageCode)} description={translate(translation["landingpage.integrity.body"], languageCode)}></EuiCard>
                    </EuiFlexItem>

                    <EuiFlexItem>
                        <EuiCard icon={<EuiIcon size="xxl" type="visGauge"></EuiIcon>} title={translate(translation["landingpage.reliability.header"], languageCode)} description={translate(translation["landingpage.reliability.body"], languageCode)}></EuiCard>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="l"></EuiSpacer>
                <div style={{textAlign:"center"}}>
                <EuiFlexGroup gutterSize="s" alignItems="center">
                <EuiFlexItem grow={true}></EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={toggleFlyoutPrivacy}>{translate(translation["eval.privacy"], languageCode)}</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={toggleFlyoutLegal}>{translate(translation["eval.legal"], languageCode)}</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={true}></EuiFlexItem>
          </EuiFlexGroup></div>
                <EuiSpacer size="l"></EuiSpacer>
                <div style={{textAlign:"center"}}><EuiCustomLink to="/licenses/all">{translate(translation["landingpage.usedlibraries"], languageCode)}</EuiCustomLink></div>
            </EuiPageContentBody>
        </EuiPageContent>
        </EuiPageBody>
        <EuiPortal>
      <div style={{ zIndex: 10001 }}>
        {flyoutPrivacy}
        {flyoutLegal}
      </div>
    </EuiPortal>
    </EuiPage>)
}
export default LandingPage