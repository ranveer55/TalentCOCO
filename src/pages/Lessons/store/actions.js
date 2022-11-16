import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_FILE_LOADING,
    payload
})


export const getLessonSuccess = (payload) => ({
    type: ActionTypes.FETCH_FILE_SUCCESS,
    payload
})
export const addLessonSuccess = (payload) => ({
    type: ActionTypes.ADD_FILE_SUCCESS,
    payload
})
export const updateLessonSuccess = (payload) => ({
    type: ActionTypes.UPDATE_FILE_SUCCESS,
    payload
})
export const deleteLessons = (payload) => ({
    type: ActionTypes.DELETE_FILE_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_FILE_ERROR,
    payload

})


export function getLesson() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/lesson');
        dispatch(getLessonSuccess(response.data.results));
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
        const response = await axios.patch(`/users/${id}`, payload);
        dispatch(updateLessonSuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteLesson(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/users/${id}`);
        dispatch(deleteLessons(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
