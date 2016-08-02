import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi'

export default function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCoursess() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    })
  }
}
