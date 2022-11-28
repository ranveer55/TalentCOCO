import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_COMPANY_LOADING,
  payload
})


export const getCompanySuccess = (payload) => ({
  type: ActionTypes.FETCH_COMPANY_SUCCESS,
  payload
})
export const getCompaniesSuccess = (payload) => ({
  type: ActionTypes.FETCH_COMPANIES_SUCCESS,
  payload
})


export const deleteCompanies = (payload) => ({
  type: ActionTypes.DELETE_COMPANY_SUCCESS,
  payload
})


export function getCompanies() {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get('/companies');
      dispatch(getCompaniesSuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getCompany(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/companies/${id}`);
      dispatch(getCompanySuccess(response.data));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createCompany(payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/companies', payload);
      dispatch(setToast({severity:'success', message:'Company created', open:true}))
      cb();
      dispatch(getCompanySuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateCompany(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/companies/${id}`, payload);
      dispatch(setToast({severity:'success', message:'Company Updated', open:true}))
      cb();
      dispatch(getCompanySuccess(null));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteCompany(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/companies/${id}`);
      dispatch(deleteCompanies(response.data));
      dispatch(setToast({severity:'success', message:'Company Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}