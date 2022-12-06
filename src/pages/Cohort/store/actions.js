import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_COHORT_LOADING,
  payload
})


export const getCohortSuccess = (payload) => ({
  type: ActionTypes.FETCH_COHORT_SUCCESS,
  payload
})
export const getCohortsSuccess = (payload) => ({
  type: ActionTypes.FETCH_COHORTS_SUCCESS,
  payload
})


export const deleteCohorts = (payload) => ({
  type: ActionTypes.DELETE_COHORT_SUCCESS,
  payload
})


export function getCohorts() {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get('/users');
       dispatch(getCohortsSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getCohort(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch(getCohortSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createCohort(payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/users', payload);
      dispatch(setToast({severity:'success', message:'Cohort created', open:true}))
      cb();
      dispatch(getCohortSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateCohort(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/users/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Cohort Updated', open:true}))
      cb();
      dispatch(getCohortSuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteCohort(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch(deleteCohorts(response.data));
      dispatch(setToast({severity:'success', message:'Cohort Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}