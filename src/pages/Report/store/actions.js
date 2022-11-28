import * as ActionTypes from './Types';
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import {  setToast } from '../../app/store/actions';


export const startLoading = (payload) => ({
  type: ActionTypes.FETCH_REPORT_LOADING,
  payload
})


export const getReportsSuccess = (payload) => ({
  type: ActionTypes.FETCH_REPORTS_SUCCESS,
  payload
})

export function getReports(url) {
  return async () => {
    dispatch(startLoading(true));
    try {
      const response = await axios.get(`/lectures/report?${url}`);
       dispatch(getReportsSuccess(response.data.results));
    } catch (error) {
      dispatch(setToast({severity:'error', message:error.message ? error.message :'Something went wrong', open:true}))
    }
  };
}

