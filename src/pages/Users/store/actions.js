import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_USER_LOADING,
  payload
})


export const getUserSuccess = (payload) => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  payload
})
export const getUsersSuccess = (payload) => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload
})


export const deleteUsers = (payload) => ({
  type: ActionTypes.DELETE_USER_SUCCESS,
  payload
})
export const hasError = (payload) => ({
  type: ActionTypes.FETCH_USER_ERROR,
  payload

})


export function getUsers() {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get('/users');
      dispatch(getUsersSuccess(response.data.results));
    } catch (error) {
      dispatch(hasError(error));
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function getUser(id) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error));
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function createUser(payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.post('/users', payload);
      dispatch(setToast({severity:'success', message:'User created', open:true}))
      cb();
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function updateUser(id, payload,cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const {data, status} = await axios.patch(`/users/${id}`, payload);
      dispatch(setToast({severity:'success', message:'User Updated', open:true}))
      cb();
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

export function deleteUser(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch(deleteUsers(response.data));
      dispatch(setToast({severity:'success', message:'User Deleted', open:true}))
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}