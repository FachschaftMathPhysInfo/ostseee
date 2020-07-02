import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiButton, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiPageContentBody, EuiDescriptionList } from "@elastic/eui";
import { Prof } from "ostseee-web-common";


const ProfDetail = props => {
    
    let {profId} = useParams();
    const [{isPending}, second] = useRequest(profQueryConfigs.profGet(profId));
    const Prof:Prof = useSelector(profSelectors.getProf(profId))
    const history = useHistory()
    if (isPending) return (<>Loading</>)
    if (Prof == undefined) return (<>Prof not found</>)
    const AsList = [{ title: "Titel", description: Prof.title },
         { title: "Vorname", description: Prof.firstname },
         { title: "Nachname", description: Prof.lastname },
         { title: "Email", description: (<a href={"mailto:"+Prof.email}>{Prof.email}</a>) },
         { title: "Zensiert", description: Prof.censored ? 'Ja': 'Nein' },
         {title:"Datum der Zensierentscheidung", description: Prof.censoredDate.toLocaleDateString()}
     ]
    if(Prof){
        return (
            <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>Prof</EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection> 
                <EuiButton iconType="pencil" onClick={()=>history.push(`/profs/${Prof.id}/edit`)}>Bearbeiten</EuiButton>
           </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
            <EuiDescriptionList textStyle="reverse" listItems={AsList} />
            </EuiPageContentBody>
        </EuiPageContent>
        )
    }
    else{
        return (
            <p>Dieser Prof wurde nicht gefunden.</p>
        )
    }
    
}
export default ProfDetail