import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_LECTURE_LOADING,
    payload
})


export const getLectureSuccess = (payload) => ({
    type: ActionTypes.FETCH_LECTURE_SUCCESS,
    payload
})
export const getLecturedetailSuccess = (payload) => ({
    type: ActionTypes.FETCH_LECTUREDETAIL_SUCCESS,
    payload
})
export const addLectureSuccess = (payload) => ({
    type: ActionTypes.ADD_LECTURE_SUCCESS,
    payload
})
export const updateLectureSuccess = (payload) => ({
    type: ActionTypes.UPDATE_LECTURE_SUCCESS,
    payload
})
export const deleteLectures = (payload) => ({
    type: ActionTypes.DELETE_LECTURE_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_LECTURE_ERROR,
    payload

})


export function getLecture() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/lecture');
        if(response.data.results){
        dispatch(getLectureSuccess(response.data.results));
      }
      else if(response.code>=400){
        dispatch(hasError(response.message)); 
      }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function getLecturedetail(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.get(`/lecture/${id}`);
        if(response.data){
        dispatch(getLecturedetailSuccess(response.data));
        }
        else if(response.code>=400){
          dispatch(hasError(response.message)); 
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function createLecture(data) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.post('/lecture', data);
         dispatch(addLectureSuccess(response.data));
        
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function updateLecture(id,payload) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.patch(`/lecture/${id}`, payload);
        if(response.data.results){
        dispatch(updateLectureSuccess(response.data));
        }
        else if(response.code>=400){
          dispatch(hasError(response.message)); 
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteLecture(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/lecture/${id}`);
        if(response.data.results){
        dispatch(deleteLectures(response.data));
        }
        else if(response.code>=400){
          dispatch(hasError(response.message)); 
        }
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
