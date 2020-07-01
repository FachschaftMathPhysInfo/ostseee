import { courseprofsCourseProfIdDelete, courseprofsPost } from "ostseee-web-common"

export const deleteCourseProf = (courseProfId, courseId) => {
  return courseprofsCourseProfIdDelete({ courseProfId }, {
    transform: (val: any) => {
      return { CourseProfsByCourseId: val };
    },
    update: {
      CourseProfsByCourseId: (prev, next) => {
        if (prev == undefined) {
          prev = {};
        }
        // Discard previous `response` value (we don't need it anymore).

        delete prev[courseId][prev[courseId].findIndex(cp => cp.id == courseProfId)]

        return prev;
      },
    },
  })

}
export const newCourseProf = (profId, courseId) => {
  return courseprofsPost({ courseProf: { profId, courseId } }, {
    transform: (val: any) => {
      return { CourseProfsByCourseId: val };
    },
    update: {
      CourseProfsByCourseId: (prev, next) => {
        if (prev == undefined) {
          prev = {};
        }
        // Discard previous `response` value (we don't need it anymore).
        prev[courseId] = prev[courseId] || []
        prev[courseId].push(next)

        return prev;
      },
    },
  })
}