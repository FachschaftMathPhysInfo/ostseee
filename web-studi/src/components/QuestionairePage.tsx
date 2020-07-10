import { EuiPage, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiPageContentBody, EuiText, EuiSpacer, EuiCard, EuiTabbedContent, EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React, { useState, Fragment } from "react";
import Form from "./Form";
import { EuiFlyout, EuiFlyoutHeader, EuiFlyoutBody } from "@elastic/eui";
import { useParams } from 'react-router';
import { useRequest } from "redux-query-react";
import { emptyFormGet } from "../query-configs/emptyform";
import { getEmptyForm } from "../selectors/emptyform"
import { useSelector } from "react-redux";
import { EmptyForm } from "ostseee-web-common";
import { EuiLoadingContent } from "@elastic/eui";
import { getLanguage } from "../selectors/language";
import { EuiPortal } from "@elastic/eui";
import { EuiCallOut } from "@elastic/eui";
import translate from "../lib/translate";
import translation from "../data/translation.json";
import EuiCustomLink from "./EuiCustomLink";
const Questionaire = props => {
  const languageCode = useSelector(getLanguage)
  const { questionaireId } = useParams();
  const [{ isPending, status }] = useRequest(emptyFormGet(questionaireId));
  const emptyForm: EmptyForm = useSelector(getEmptyForm);
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
      name: "Integrität",
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

  if (isPending) {
    return (
      <div>
        <EuiPage>
          <EuiPageContent><EuiPageHeader><h1>{translate(translation["eval.loading"], languageCode)}</h1></EuiPageHeader>
            <EuiLoadingContent lines={3} />
          </EuiPageContent>
        </EuiPage>
      </div>
    )
  }
  if (status != 200) {
    return (
      <div>
        <EuiPage>
          <EuiPageContent>
            <EuiCallOut title={translate(translation["eval.error.loading"], languageCode)} iconType="alert" color="warning">{translate(translation["eval.error.loading.intro"], languageCode)}<ul>
              <li>{translate(translation["eval.error.invalid.token"], languageCode)}</li>
              <li>{translate(translation["eval.error.ended.survey"], languageCode)}</li>
              <li>{translate(translation["eval.error.difficulties"], languageCode)}</li>
            </ul>
              {translate(translation["eval.error.outro"], languageCode)}
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
            <h1>{translate(translation["eval.title"], languageCode)}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>

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
          <EuiText style={{ textAlign: "left" }}>
            {translate(translation["eval.introduction"], languageCode)}
          </EuiText>
          <EuiText style={{ textAlign: "left" }}>{translate(translation["eval.concerns"], languageCode)} </EuiText>
          <EuiSpacer size="l" />
          <EuiText><b>{emptyForm.moduleName}</b> {translate(translation["eval.by"], languageCode)} <b>{emptyForm.profs.map(p => p.lastname).join(", ")}</b></EuiText>
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
          <div style={{textAlign:"center"}} >
          <a href="#abschnitt"><EuiButton fill iconType="arrowDown">
            {translate(translation["eval.begin"], languageCode)}

          </EuiButton></a></div>
          <EuiSpacer size="xl" />
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton onClick={toggleFlyoutPrivacy}>{translate(translation["eval.privacy"], languageCode)}</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={toggleFlyoutLegal}>{translate(translation["eval.legal"], languageCode)}</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
      <EuiSpacer size="xl" />
      <Form emptyForm={emptyForm} />
    </EuiPageBody>
    <EuiPortal>
      <div style={{ zIndex: 0 }}>
        {flyoutPrivacy}
        {flyoutLegal}
      </div>
    </EuiPortal>
  </EuiPage>
  )
}
export default Questionaire;