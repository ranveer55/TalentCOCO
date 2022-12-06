import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_STUDENT_LOADING,
  payload
})


export const getStudentSuccess = (payload) => ({
  type: ActionTypes.FETCH_STUDENT_SUCCESS,
  payload
})
export const getStudentsSuccess = (payload) => ({
  type: ActionTypes.FETCH_STUDENTS_SUCCESS,
  payload
})


export const deleteStudents = (payload) => ({
  type: ActionTypes.DELETE_STUDENT_SUCCESS,
  payload
})


export function getStudents() {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get('/users');
       dispatch(getStudentsSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getStudent(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch(getStudentSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createStudent(payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/users', payload);
      dispatch(setToast({severity:'success', message:'Student created', open:true}))
      cb();
      dispatch(getStudentSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateStudent(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/users/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Student Updated', open:true}))
      cb();
      dispatch(getStudentSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteStudent(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch(deleteStudents(response.data));
      dispatch(setToast({severity:'success', message:'Student Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}