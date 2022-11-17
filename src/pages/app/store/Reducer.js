import * as ActionTypes from './Types';

const initialState = {
    masterdata:null,
    authenticated: false,
    backdrop:false,
    user: null,
    toast: {
        severity: null,
        open: false,
        message: ''
    }

}

export default (state = initialState, { type, payload }={}) => {
    switch (type) {
        case ActionTypes.SET_MASTERDATA:
            return { ...state, masterdata: payload }
        case ActionTypes.LOGOUT:
            return initialState;
        case ActionTypes.BACKDROP:
            return { ...state, backdrop: payload }
        case ActionTypes.SET_TOAST:
            return { ...state, toast: payload }
        case ActionTypes.LOADING:
            return { ...state, loading: payload, error: null }

        case ActionTypes.LOGIN_FAILED:
            return { ...state, loading: false, error: payload }

        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('tapUser',JSON.stringify(payload))
            return { ...state, loading: false, authenticated: true, user: payload }

        case ActionTypes.SIGN_UP_FAILED:
            return { ...state, loading: false, error: payload }
        case ActionTypes.SIGN_UP_SUCCESS:
            localStorage.setItem('tapUser',JSON.stringify(payload))
            return { ...state, loading: false, authenticated: true, user: payload }
        default:
            return state;
    }
}
