import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_COURSE_LOADING,
    payload
})


export const getCourseSuccess = (payload) => ({
    type: ActionTypes.FETCH_COURSE_SUCCESS,
    payload
})
export const getCoursedetailSuccess = (payload) => ({
    type: ActionTypes.FETCH_COURSEDETAIL_SUCCESS,
    payload
})
export const addCourseSuccess = (payload) => ({
    type: ActionTypes.ADD_COURSE_SUCCESS,
    payload
})
export const updateCourseSuccess = (payload) => ({
    type: ActionTypes.UPDATE_COURSE_SUCCESS,
    payload
})
export const deleteCourses = (payload) => ({
    type: ActionTypes.DELETE_COURSE_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_COURSE_ERROR,
    payload

})


export function getCourse() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/course');
        if (response){
        dispatch(getCourseSuccess(response.data.results));
        }
        else{
          dispatch(hasError(response.data));
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
export function getCourseDetail(id) {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get(`/course/${id}`);
        if (response){
        dispatch(getCoursedetailSuccess(response.data));
        }
        else{
          dispatch(hasError(response.data));
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function createCourse(data) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.post('/course', data);
         if (response){
        dispatch(addCourseSuccess(response.data));
        }
        else{
          dispatch(hasError(response.data));
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function updateCourse(id,payload) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.patch(`/course/${id}`, payload);
        if (response && response.status==='304'){
        dispatch(updateCourseSuccess(response.data));
        }
        else{
          dispatch(hasError(response.data));
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteCourse(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/course/${id}`);
        dispatch(deleteCourses(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
