import React from "react"
import { useRequest, useMutation } from "redux-query-react"
import { getCourseProfsByCourse } from "../selectors/courseprofs"
import { courseprofsByCourseGet } from "../query-configs/courseprofs";
import { useSelector } from "react-redux"
import { CourseProf, Prof } from "ostseee-web-common";
import ProfDisplay from "./ProfDisplay";
import { EuiButton, EuiButtonIcon, EuiSuggest, EuiSuggestItemProps } from "@elastic/eui";
import { deleteCourseProf, newCourseProf } from "../mutations/courseprofs";
import { getProfs } from "../selectors/profs";
import { profsGet } from "../query-configs/profs";

const CourseProfsEditor = ({ courseId }) => {
    const [{ isPending }, reload] = useRequest(courseprofsByCourseGet(courseId));
    const courseProfs: Array<CourseProf> = useSelector(getCourseProfsByCourse(courseId));
    //@ts-ignore
    const [{ isPending: is2 }, deleteCourseProfA] = useMutation(courseProfId => {

        return deleteCourseProf(courseProfId, courseId)
    }
    );
    //@ts-ignore
    const [{ isPending: is4 }, makeCourseProf] = useMutation(profId => {
        //@ts-ignore
        return newCourseProf(profId, courseId)
    }
    );
    const onItemClick = (item) => {
        console.log(item)
        if (window.confirm("Add?")) {
            makeCourseProf(item.id)
        }
    }
    const [{ isPending: is3 }, reloadProfs] = useRequest(profsGet())
    const profs: Array<EuiSuggestItemProps> = useSelector(getProfs)?.map((prof: Prof) => {
        return {
            label: `${prof.lastname}, ${prof.firstname}`,
            description: "Prof",
            type: { iconType: "user", color: "tint1" },
            id: prof.id
        }
    })

    if (isPending || is3) {
        return <>Loading</>
    }
    console.log(profs)
    return (<><ul>
        {courseProfs?.map((cp => <li key={cp.id}><ProfDisplay id={cp.profId}></ProfDisplay>
            <EuiButtonIcon onClick={(e) => {
                //@ts-ignore
                if (window.confirm("Remove?")) {
                    deleteCourseProfA(cp.id)
                }
            }} iconType="cross" aria-label={`Remove Prof`} color="danger"></EuiButtonIcon>
        </li>))}</ul>
        <EuiSuggest
            status={"loading"}
            onInputChange={() => { }}
            onItemClick={onItemClick}
            suggestions={profs}
        /></>)
}
export default CourseProfsEditor