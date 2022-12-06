import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';
import { getLecture } from '../storeLecture/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_MCQ_LOADING,
  payload
})


export const getMcqSuccess = (payload) => ({
  type: ActionTypes.FETCH_MCQ_SUCCESS,
  payload
})
export const getMcqsSuccess = (payload) => ({
  type: ActionTypes.FETCH_MCQS_SUCCESS,
  payload
})


export const deleteMcqs = (payload) => ({
  type: ActionTypes.DELETE_MCQ_SUCCESS,
  payload
})


export function getMcqs(lessonId) {
  return async () => {
    dispatch(getMcqsSuccess([]));
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/mcqs/mcqsofLesson/${lessonId}`);
      dispatch(getMcqsSuccess(response.data.results));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getMcq(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/mcqs/${id}`);
      dispatch(getMcqSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createMcq(payload,onSave) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/mcqs', payload);
      dispatch(setToast({severity:'success', message:'Mcq created', open:true}))
      onSave();
      dispatch(getLecture(payload.lectureId))
      dispatch(getMcqSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateMcq(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/mcqs/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Mcq Updated', open:true}))
      cb();
      dispatch(getMcqSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteMcq(id, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/mcqs/${id}`);
      cb()
      dispatch(setToast({severity:'success', message:'Mcq Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}