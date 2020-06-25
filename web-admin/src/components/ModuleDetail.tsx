import { useParams } from "react-router"
import React from "react";

const ModuleDetail = props => {
    let {moduleId} = useParams();
    return (
        <h1>
        {moduleId}
        </h1>
    )
}
export default ModuleDetail