import { useParams, useHistory } from "react-router"
import React from "react";
import { useSelector } from 'react-redux';
import { useRequest } from "redux-query-react";
import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import './Prof.css';
import { EuiButton } from "@elastic/eui";


const TermDetail = props => {
    
    let {termId} = useParams();
    const [data, second] = useRequest(termQueryConfigs.termGet(termId));
    const Term = useSelector(termSelectors.getTerm(termId))
    const history = useHistory()
    if (Term) {
        return (
            <>
                <table style={{textAlign:'left', margin:50}}>
                    <tr>
                        <td><b>Semester: </b></td>
                        <td>{Term.name}</td>
                    </tr>
                    <tr>
                        <td><b>Anfangsdatum: </b></td>
                        <td>{Term.begin.toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><b>Enddatum: </b></td>
                        <td>{Term.end.toLocaleDateString()}</td>
                    </tr>
                </table>
                <EuiButton iconType="pencil" onClick={()=>history.push(`/terms/${Term.id}/edit`)}>Bearbeiten</EuiButton>
            </>
        )
    }
    else{
        return (
            <p>Das gesuchte Semester wurde nicht gefunden.</p>
        )
    }
    
}
export default TermDetail