import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';


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
export const addUserSuccess = (payload) => ({
  type: ActionTypes.ADD_USER_SUCCESS,
  payload
})
export const updateUserSuccess = (payload) => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
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
    }
  };
}

export function createUser(data) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.post('/users', data);
      dispatch(addUserSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateUser(id, payload) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.patch(`/users/${id}`, payload);
      dispatch(updateUserSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function deleteUser(id) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch(deleteUsers(response.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}