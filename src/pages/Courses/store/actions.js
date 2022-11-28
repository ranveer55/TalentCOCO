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
export const getCourseSuccess = (payload) => ({
    type: ActionTypes.FETCH_COURSE_SUCCESS,
    payload
})
export const deleteCourses = (payload) => ({
    type: ActionTypes.DELETE_COURSE_SUCCESS,
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
  export function createCourse(data,cb) {
    return async () => {
      dispatch(startLoading());
      try {
        const {status} = await axios.post('/course', data);
        dispatch(setToast({severity:'success', message:'Course created', open:true}))
          cb();
          dispatch(getCourseSuccess(null));
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
  
