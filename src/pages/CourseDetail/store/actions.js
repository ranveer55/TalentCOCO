
import * as ActionTypes from './Types';
// utils
import axios from '../../../utils/axios';
//
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';

export const startLoading = (payload) => ({
    type: ActionTypes.SET_SECTION_LOADING,
    payload
})
export const getSectionSuccess = (payload) => ({
  type: ActionTypes.FETCH_SECTION_SUCCESS,
  payload
})




export function createSection(data, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const res = await axios.post('/lesson', data);
      dispatch(setToast({ severity: 'success', message: 'Section created', open: true }))
      cb();
      dispatch(getSectionSuccess(res.data));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function updateSection(id, payload, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const res = await axios.patch(`/lesson/${id}`, payload);
      dispatch(setToast({ severity: 'success', message: 'Section updated', open: true }))
      cb();
      dispatch(getSectionSuccess(res.data));
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
export function deleteSection(id, cb) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`/lesson/${id}`);
      cb()
      dispatch(getSectionSuccess(null));
      dispatch(setToast({ severity: 'success', message: 'Section Deleted', open: true }))
    } catch (error) {
      dispatch(setToast({ severity: 'error', message: error.message ? error.message : 'Something went wrong', open: true }))
    }
  };
}
