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


export const getCourseSuccess = (payload) => ({
    type: ActionTypes.FETCH_FILE_SUCCESS,
    payload
})
export const addCourseSuccess = (payload) => ({
    type: ActionTypes.ADD_FILE_SUCCESS,
    payload
})
export const updateCourseSuccess = (payload) => ({
    type: ActionTypes.UPDATE_FILE_SUCCESS,
    payload
})
export const deleteCourses = (payload) => ({
    type: ActionTypes.DELETE_FILE_SUCCESS,
    payload
})
export const hasError=(payload) =>({
    type: ActionTypes.FETCH_FILE_ERROR,
    payload

})


export function getCourse() {
    return async () => {
      dispatch(startLoading(true));
      try {
        const response = await axios.get('/course');
        dispatch(getCourseSuccess(response.data.results));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function createCourse(data) {
    console.log("data",data)
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.post('/course', data);
        dispatch(addCourseSuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function updateCourse(id,payload) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.patch(`/users/${id}`, payload);
        dispatch(updateCourseSuccess(response.data));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
  export function deleteCourse(id) {
    return async () => {
      dispatch(startLoading());
      try {
        const response = await axios.delete(`/users/${id}`);
        dispatch(deleteCourses(response.data));
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