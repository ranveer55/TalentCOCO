
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';
import { setToast } from '../../app/store/actions';

export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_LESSON_SUCCESS,
  payload
})
export const getLessonsSuccess = (payload) => ({
  type: ActionTypes.FETCH_LESSONS_SUCCESS,
  payload
})
export const getLessonSuccess = (payload) => ({
  type: ActionTypes.FETCH_LESSON_SUCCESS,
  payload
})
export const deleteLessons = (payload) => ({
  type: ActionTypes.DELETE_LESSON_SUCCESS,
  payload
})

export function getLessons(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lesson/lessonofCourse/${id}`);
      dispatch(getLessonsSuccess(response.data.results));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}


export function getLesson(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lesson/${id}`);
      dispatch(getLessonSuccess(response.data));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function createLesson(data, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const { status } = await axios.post('/lesson', data);
      dispatch(setToast({ severity: 'success', message: 'Lesson created', open: true }))
      cb();
      dispatch(getLessonSuccess(null));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function updateLesson(id, payload, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const { data, status } = await axios.patch(`/lesson/${id}`, payload);
      dispatch(setToast({ severity: 'success', message: 'Lesson created', open: true }))
      cb();
      dispatch(getLessonSuccess(null));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function deleteLesson(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/lesson/${id}`);
      dispatch(deleteLessons(response.data));
      dispatch(setToast({ severity: 'success', message: 'Lesson Deleted', open: true }))
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}

