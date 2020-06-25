import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import './Prof.css';
import { EuiButton } from "@elastic/eui";


const ProfDetail = props => {
    
    let {profId} = useParams();
    const [data, second] = useRequest(profQueryConfigs.profGet(profId));
    const Prof = useSelector(profSelectors.getProf(profId))
    const history = useHistory()
    if(Prof){
        return (
            <>
                <table style={{textAlign:'left', margin:50}}>
                    <tr>
                        <td><b>Titel: </b></td>
                        <td>{Prof.title}</td>
                    </tr>
                    <tr>
                        <td><b>Vorname: </b></td>
                        <td>{Prof.firstname}</td>
                    </tr>
                    <tr>
                        <td><b>Nachname: </b></td>
                        <td>{Prof.lastname}</td>
                    </tr>
                    <tr>
                        <td><b>Email: </b></td>
                        <td><a href={"mailto:"+Prof.email}>{Prof.email}</a></td>
                    </tr>
                    <tr>
                        <td><b>Zensiert: </b></td>
                        <td>{Prof.censored ? 'Ja': 'Nein'}</td>
                    </tr>
                    <tr>
                        <td><b>Datum der Veröffentlichungsbestätigung: </b></td>
                        <td>{Prof.censoredDate.toLocaleDateString()}</td>
                    </tr>
                </table>
                <EuiButton iconType="pencil" onClick={()=>history.push(`/profs/${Prof.id}/edit`)}>Bearbeiten</EuiButton>
            </>
        )
    }
    else{
        return (
            <p>Dieser Prof wurde nicht gefunden.</p>
        )
    }
    
}
export default ProfDetail