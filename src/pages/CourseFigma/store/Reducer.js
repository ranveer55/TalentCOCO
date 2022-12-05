import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    courses: [],
    sections: [],
    course: null,
    section: null,
    lecture: null,
    quiz: null,
    codingexercise:null,
}
const Reducer = (state = initialState, { type, payload } = {}) => {
     switch (type) {

        case ActionTypes.FETCH_COURSE_LOADING:
            return { ...state, isLoading: true }
        case ActionTypes.FETCH_COURSES_SUCCESS:
            return { ...state, isLoading: false, courses: payload }
        case ActionTypes.FETCH_COURSE_SUCCESS:
            return { ...state, isLoading: false, course: payload }
        case ActionTypes.FETCH_SECTION_SUCCESS:
            return { ...state, isLoading: false, section: payload }
        case ActionTypes.FETCH_SECTIONS_SUCCESS:
            return { ...state, isLoading: false, sections: payload }
        case ActionTypes.FETCH_LECTURE_SUCCESS:
            return { ...state, isLoading: false, lecture: payload }
        case ActionTypes.FETCH_CODINGEXERCISE_SUCCESS:
            return { ...state, isLoading: false, codingexercise: payload }
        case ActionTypes.FETCH_QUIZ_SUCCESS:
            return { ...state, isLoading: false, quiz: payload }
        case ActionTypes.DELETE_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: payload }
        default:
            return state;
    }
}
export default Reducer;