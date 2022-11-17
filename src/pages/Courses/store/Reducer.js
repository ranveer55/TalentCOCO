import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    error: null,
    courses: [],
    course: null,
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
      
        case ActionTypes.FETCH_COURSE_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.FETCH_COURSEDETAIL_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.ADD_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.UPDATE_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.DELETE_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.FETCH_COURSE_ERROR:
            return { ...state, isLoading: false, error: payload }
                default:
            return state;
    }
}
export default  Reducer;