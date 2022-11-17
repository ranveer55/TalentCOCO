
import axios from '../../../utils/axios';
import { dispatch } from '../../../redux/store';
import * as ActionTypes from './Types';

export const setToast = (payload) => ({
    type: ActionTypes.SET_TOAST,
    payload
})

export const setMasterdata = (payload) => ({
    type: ActionTypes.SET_MASTERDATA,
    payload
})
export const setLoading = (payload) => ({
    type: ActionTypes.LOADING,
    payload
})
export const setBackdrop = (payload) => ({
    type: ActionTypes.BACKDROP,
    payload
})
export const logout = () => ({
    type: ActionTypes.LOGOUT
})
export const setSignUpError = (payload) => ({
    type: ActionTypes.SIGN_UP_FAILED,
    payload
})

export const setSignUpSuccess = (payload) => ({
    type: ActionTypes.SIGN_UP_SUCCESS
})



export const setLoginSuccess = (payload) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload
})
export function getMasterData() {
    return async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get('/users/masterdata');
            dispatch(setMasterdata(response.data));
        } catch (error) {
            // dispatch(hasError(error));
        }
    };
}