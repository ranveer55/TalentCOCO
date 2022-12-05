import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';

export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_COURSE_LOADING,
    payload
})
export const getCoursesSuccess = (payload) => ({
    type: ActionTypes.FETCH_COURSES_SUCCESS,
    payload
})
export const getLectureSuccess = (payload) => ({
  type: ActionTypes.FETCH_LECTURE_SUCCESS,
  payload
})
export const getCodingExerciseSuccess = (payload) => ({
  type: ActionTypes.FETCH_CODINGEXERCISE_SUCCESS,
  payload
})
export const getQuizSuccess = (payload) => ({
  type: ActionTypes.FETCH_QUIZ_SUCCESS,
  payload
})

export const getCourseSuccess = (payload) => ({
    type: ActionTypes.FETCH_COURSE_SUCCESS,
    payload
})
export const deleteCourses = (payload) => ({
    type: ActionTypes.DELETE_COURSE_SUCCESS,
    payload
})
// SECTION
export const getSectionsSuccess = (payload) => ({
  type: ActionTypes.FETCH_SECTIONS_SUCCESS,
  payload
})
export const getSectionSuccess = (payload) => ({
  type: ActionTypes.FETCH_SECTION_SUCCESS,
  payload
})


export function getCourses() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/course');
         dispatch(getCoursesSuccess(response.data));
        } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
export function getCourse(id) {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get(`/course/${id}`);
        dispatch(getCourseSuccess(response.data));
        } catch (error) {
          dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function createLecture(payload,cb) {
    return async () => {
      dispatch(startLoading());
      try {
        const {data, status} = await axios.post('/lectures', payload);
        dispatch(setToast({severity:'success', message:'Lecture created', open:true}))
        cb();
        dispatch(getLectureSuccess(data));
      } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function createCourse(data,cb) {
     return async () => {
      dispatch(startLoading());
      try {
        const res = await axios.post('/course', data);
        dispatch(setToast({severity:'success', message:'Course created', open:true}))
          cb();
          dispatch(getCourseSuccess(res.data));
         } catch (error) {
          dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function createCodingExercise(data,cb) {
     return async () => {
      dispatch(startLoading());
      try {
        const res = await axios.post('/test-cases', data);
        dispatch(setToast({severity:'success', message:'Course created', open:true}))
          cb();
          dispatch(getCodingExerciseSuccess(res.data));
         } catch (error) {
          dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function updateCodingExercise(id, payload,cb) {
    return async () => {
      dispatch(startLoading(true));
      try {
        const res = await axios.patch(`/test-cases/${id}`, payload);
        dispatch(setToast({severity:'success', message:'Test Case Updated', open:true}))
        cb();
        dispatch(getCodingExerciseSuccess(res.data));
        dispatch(startLoading(false));
      } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  
  export function deleteCodingExercise(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/test-cases/${id}`);
        dispatch(getCodingExerciseSuccess(null));
        dispatch(setToast({severity:'success', message:'Test Case Deleted', open:true}))
      } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function createQuiz(payload,onSave) {
    return async () => {
      dispatch(startLoading());
      try {
        const {data, status} = await axios.post('/mcqs', payload);
        dispatch(setToast({severity:'success', message:'Mcq created', open:true}))
        onSave();
          dispatch(getQuizSuccess(null));
      } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  
  export function updateCourse(id,payload,cb) {
    return async () => {
      dispatch(startLoading());
      try {
        const {data, status} = await axios.patch(`/course/${id}`, payload);
        dispatch(setToast({severity:'success', message:'Course created', open:true}))
        cb();
        dispatch(getCourseSuccess(null));
       } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  export function deleteCourse(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/course/${id}`);
        dispatch(deleteCourses(response.data));
        dispatch(setToast({severity:'success', message:'Course Deleted', open:true}))
      } catch (error) {
        dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
      }
    };
  }
  
// SECTION

export function getSections(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lesson/lessonofCourse/${id}`);
       dispatch(getSectionsSuccess(response.data));
      } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}
export function createSection(data, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const res = await axios.post('/lesson', data);
      dispatch(setToast({ severity: 'success', message: 'Section created', open: true }))
      cb();
      dispatch(getSectionSuccess(res.data));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function updateSection(id, payload, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const res = await axios.patch(`/lesson/${id}`, payload);
      dispatch(setToast({ severity: 'success', message: 'Lesson created', open: true }))
      cb();
      dispatch(getSectionSuccess(res.data));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function deleteSection(id, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/lesson/${id}`);
      cb()
      dispatch(getSectionSuccess(null));
      dispatch(setToast({ severity: 'success', message: 'Lesson Deleted', open: true }))
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
