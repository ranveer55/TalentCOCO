import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    users: [],
    user: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_USER_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, isLoading: false, users: payload}
        case ActionTypes.FETCH_USER_SUCCESS:

            return { ...state, isLoading: false, user: payload}
        case ActionTypes.DELETE_USER_SUCCESS:

            return { ...state, isLoading: false, users: payload}
                default:
            return state;
    }
}
export default  Reducer;