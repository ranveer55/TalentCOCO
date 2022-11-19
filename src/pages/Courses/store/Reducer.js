import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
     courses: [],
    course: null,
   }
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_COURSE_LOADING:
            return {  ...state,isLoading: true}
        case ActionTypes.FETCH_COURSES_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
        case ActionTypes.FETCH_COURSE_SUCCESS:
            return { ...state, isLoading: false, course: payload}
        case ActionTypes.DELETE_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload}
             default:
            return state;
    }
}
export default  Reducer;