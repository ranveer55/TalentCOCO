import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_LECTURE_LOADING,
  payload
})


export const getLectureSuccess = (payload) => ({
  type: ActionTypes.FETCH_LECTURE_SUCCESS,
  payload
})
export const getLecturesSuccess = (payload) => ({
  type: ActionTypes.FETCH_LECTURES_SUCCESS,
  payload
})


export const deleteLectures = (payload) => ({
  type: ActionTypes.DELETE_LECTURE_SUCCESS,
  payload
})


export function getLectures(lessonId) {
  return async () => {
    dispatch(getLecturesSuccess([]));
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lectures/lecturesofLesson/${lessonId}`);
      dispatch(getLecturesSuccess(response.data.results));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getLecture(id) {
  if(!id) return;
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lectures/${id}`);
      dispatch(getLectureSuccess(response.data));
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
      dispatch(getLectureSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateLecture(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/lectures/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Lecture Updated', open:true}))
      cb();
      dispatch(getLectureSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteLecture(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/lectures/${id}`);
      dispatch(deleteLectures(id));
      dispatch(setToast({severity:'success', message:'Lecture Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}