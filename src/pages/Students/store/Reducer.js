import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    students: [],
    student: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_STUDENT_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_STUDENTS_SUCCESS:
            return { ...state, isLoading: false, students: payload}
        case ActionTypes.FETCH_STUDENT_SUCCESS:

            return { ...state, isLoading: false, student: payload}
        case ActionTypes.DELETE_STUDENT_SUCCESS:

            return { ...state, isLoading: false, students: payload}
                default:
            return state;
    }
}
export default  Reducer;