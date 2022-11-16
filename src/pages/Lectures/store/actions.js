import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';


export const startLoading = (payload) => ({
    type: ActionTypes.FETCH_FILE_LOADING,
    payload
})


export const getLectureSuccess = (payload) => ({
    type: ActionTypes.FETCH_FILE_SUCCESS,
    payload
})
export const addLectureSuccess = (payload) => ({
    type: ActionTypes.ADD_FILE_SUCCESS,
    payload
})
export const updateLectureSuccess = (payload) => ({
    type: ActionTypes.UPDATE_FILE_SUCCESS,
    payload
})
export const deleteLectures = (payload) => ({
    type: ActionTypes.DELETE_FILE_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_FILE_ERROR,
    payload

})


export function getLecture() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/lecture');
        dispatch(getLectureSuccess(response.data.results));
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
        dispatch(updateLectureSuccess(response.data));
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
        dispatch(deleteLectures(response.data));
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