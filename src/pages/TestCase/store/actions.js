import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_TESTCASE_LOADING,
  payload
})


export const getTestcaseSuccess = (payload) => ({
  type: ActionTypes.FETCH_TESTCASE_SUCCESS,
  payload
})
export const getTestcasesSuccess = (payload) => ({
  type: ActionTypes.FETCH_TESTCASES_SUCCESS,
  payload
})


export const deleteTestcases = (payload) => ({
  type: ActionTypes.DELETE_TESTCASE_SUCCESS,
  payload
})


export function getTestCases(lectureId) {
   return async () => {
    dispatch(getTestcaseSuccess(null));
    dispatch(startLoading(true));
    try {
      const {status, data} = await axios.get(`/test-cases/testcasesofLecture/${lectureId}`);
      dispatch(getTestcaseSuccess(data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getTestCase(id) {
  if(!id) return;
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/test-cases/${id}`);
      dispatch(getTestcaseSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createTestCase(payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/test-cases', payload);
      dispatch(setToast({severity:'success', message:'Test Case created', open:true}))
      cb();
      dispatch(getTestcaseSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateTestCase(id, payload,cb) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const {data, status} = await axios.patch(`/test-cases/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Test Case Updated', open:true}))
      cb();
      dispatch(startLoading(false));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteTestCase(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/test-cases/${id}`);
      dispatch(deleteTestcases(id));
      dispatch(setToast({severity:'success', message:'Test Case Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}