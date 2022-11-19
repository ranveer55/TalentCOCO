import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_LESSON_LOADING,
    payload
})


export const getLessonSuccess = (payload) => ({
    type: ActionTypes.FETCH_LESSON_SUCCESS,
    payload
})
export const getLessonDetailSuccess = (payload) => ({
    type: ActionTypes.FETCH_LESSONDETAIL_SUCCESS,
    payload
})
export const addLessonSuccess = (payload) => ({
    type: ActionTypes.ADD_LESSON_SUCCESS,
    payload
})
export const updateLessonSuccess = (payload) => ({
    type: ActionTypes.UPDATE_LESSON_SUCCESS,
    payload
})
export const deleteLessons = (payload) => ({
    type: ActionTypes.DELETE_LESSON_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_LESSON_ERROR,
    payload

})


export function getLesson(id) {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get(`/lesson/lessonofCourse/${id}`);
        dispatch(getLessonSuccess(response.data.results));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function getLessonDetail(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.get(`/lesson/${id}`);
        dispatch(getLessonDetailSuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
  export function createLesson(data) {
      return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.post('/lesson', data);
        dispatch(addLessonSuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function updateLesson(id,payload) {
   return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.patch(`/lesson/${id}`, payload);
        if(response.data){
        dispatch(updateLessonSuccess(response.data));
        }
        else if(response.code>=400){
          dispatch(hasError(response.message)); 
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteLesson(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/lesson/${id}`);
        dispatch(deleteLessons(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
