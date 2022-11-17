import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    error: null,
    userError:null,
    users: [],
    user: null,
    sortBy: null,
    filters: {
      gender: [],
      category: 'All',
      colors: [],
      priceRange: '',
      rating: '',
    },
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_USER_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.USER_ERROR:
            return {  ...state,userError: payload}

        case ActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, isLoading: false, users: payload}
        case ActionTypes.FETCH_USER_SUCCESS:
            return { ...state, isLoading: false, user: payload}
        case ActionTypes.ADD_USER_SUCCESS:
            return { ...state, isLoading: false, users: payload}
        case ActionTypes.UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, users: payload}
        case ActionTypes.DELETE_USER_SUCCESS:
            return { ...state, isLoading: false, users: payload}
        case ActionTypes.FETCH_USER_ERROR:
            return { ...state, isLoading: false, error: payload }
                default:
            return state;
    }
}
export default  Reducer;