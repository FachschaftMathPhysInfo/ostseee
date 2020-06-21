export const getCourseProfsByCourse =(courseId)=> (state) => {
    return (state.entities.CourseProfsByCourseId||{})[courseId];
    //return (state.entities.itemsById || {})[itemId];
  };