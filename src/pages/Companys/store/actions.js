import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_COMPANY_LOADING,
    payload
})


export const getCompanySuccess = (payload) => ({
    type: ActionTypes.FETCH_COMPANY_SUCCESS,
    payload
})
export const addCompanySuccess = (payload) => ({
    type: ActionTypes.ADD_COMPANY_SUCCESS,
    payload
})
export const updateCompanySuccess = (payload) => ({
    type: ActionTypes.UPDATE_COMPANY_SUCCESS,
    payload
})
export const deleteCompanys = (payload) => ({
    type: ActionTypes.DELETE_COMPANY_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_COMPANY_ERROR,
    payload

})


export function getCompany() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/company');
        dispatch(getCompanySuccess(response.data.results));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function createCompany(data) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.post('/company', data);
        dispatch(addCompanySuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function updateCompany(id,payload) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.patch(`/users/${id}`, payload);
        dispatch(updateCompanySuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteCompany(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/users/${id}`);
        dispatch(deleteCompanys(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  
/* export const getTestCases =  (id) => {
    return async (dispatch) => {
        const data = await axios.get(`checktestcases/problem/${id}`)
        if (data && data.status==true) {
            dispatch(setProblemTestCaseSuccess(data.data))
        } 
    }
}

export const submitProblem =  (p) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        dispatch(setBackdrop(true))
        const data = await axios.post(`challenge/submit`,p)
        dispatch(setLoading(false))
        dispatch(setBackdrop(false))
        if (data && data.status ===false) {
            if(data.refresh){
                dispatch(setToast({severity:'warning', message:'Some Test Case pending', open:true}))
                setTimeout(()=>{
                    window.location.reload()
                },1000)
               
            } else if(data.completed){
                dispatch(setToast({severity:'success', message:'Assessment completed successfully', open:true}))
                setTimeout(()=>{
                    window.location.href='/challenges'
                },1000)
               
            } else {
                dispatch(setToast({severity:'error', message:data.data, open:true}))
            }
            
        }  else if (data && data.status==true) {
            dispatch(setProblemSuccess(data.data))
        } 
        else {
            dispatch(setToast({severity:'error', message:'Something went wrong', open:true}))
        }
    }
}
export const executeTestCase =  (testcase, code) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        const data = await axios.post(`challenge/test`,{id:testcase.id,code})
        dispatch(setLoading(false))
        if (data && data.status ===false) {
            dispatch(setToast({severity:'error', message:data.data, open:true}))
        }  else if (data && data.status==true) {
            // dispatch(setProblemSuccess(data.data))
        } 
        else {
            dispatch(setToast({severity:'error', message:'Something went wrong', open:true}))
        }
    }
} */