import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    error: null,
    lectures: [],
    lecture: null,
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
      
        case ActionTypes.FETCH_LECTURE_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_LECTURE_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.FETCH_LECTUREDETAIL_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.ADD_LECTURE_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.UPDATE_LECTURE_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.DELETE_LECTURE_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.FETCH_LECTURE_ERROR:
            return { ...state, isLoading: false, error: payload }
                default:
            return state;
    }
}
export default  Reducer;