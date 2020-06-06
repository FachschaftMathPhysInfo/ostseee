import { useParams } from "react-router"
import React from "react";

const ProfDetail = props => {
    let {profId} = useParams();
    return (
        <h1>
        {profId}
        </h1>
    )
}
export default ProfDetail