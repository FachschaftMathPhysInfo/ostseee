import { coursesCourseIdTutorsTutorIdDelete, Tutor, coursesCourseIdTutorsPost, coursesCourseIdTutorsTutorIdPatch } from "ostseee-web-common"

export const deleteTutor = (tutorId, courseId) => {
  return coursesCourseIdTutorsTutorIdDelete({ tutorId,courseId }, {
    transform: (val: any) => {
      return { TutorsByCourseId: val };
    },
    update: {
      TutorsByCourseId: (prev, next) => {
        if (prev == undefined) {
          prev = {};
        }
        // Discard previous `response` value (we don't need it anymore).

        delete prev[courseId][prev[courseId].findIndex(tut => tut.id == tutorId)]

        return prev;
      },
    },
  })

}
export const newTutor= ( courseId, tutor:Tutor) => {
  return coursesCourseIdTutorsPost({ courseId,tutor }, {
    transform: (val: any) => {
      return { TutorsByCourseId: val };
    },
    update: {
        TutorsByCourseId: (prev, next) => {
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

export const editTutor= ( courseId,tutorId, tutor:Tutor) => {
    return coursesCourseIdTutorsTutorIdPatch({ courseId,tutorId,tutor }, {
      transform: (val: any) => {
        return { TutorsByCourseId: val };
      },
      update: {
          TutorsByCourseId: (prev, next) => {
          if (prev == undefined) {
            prev = {};
          }
          // Discard previous `response` value (we don't need it anymore).
          prev[courseId] = prev[courseId] || []
          prev[courseId][prev[courseId].findIndex((obj:Tutor)=>obj.id==tutorId)]=next
  
          return prev;
        },
      },
    })
  }