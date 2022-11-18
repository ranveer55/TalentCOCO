import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    error: null,
    lessons: [],
    lesson: null,
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
      
        case ActionTypes.FETCH_LESSON_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_LESSON_SUCCESS:
            return { ...state, isLoading: false, lessons: payload}
        case ActionTypes.FETCH_LESSONDETAIL_SUCCESS:
            return { ...state, isLoading: false, lessons: payload}
        case ActionTypes.ADD_LESSON_SUCCESS:
            return { ...state, isLoading: false, lessons: payload}
        case ActionTypes.UPDATE_LESSON_SUCCESS:
            return { ...state, isLoading: false, lessons: payload}
        case ActionTypes.DELETE_LESSON_SUCCESS:
            return { ...state, isLoading: false, lessons: payload}
        case ActionTypes.FETCH_LESSON_ERROR:
            return { ...state, isLoading: false, error: payload }
                default:
            return state;
    }
}
export default  Reducer;