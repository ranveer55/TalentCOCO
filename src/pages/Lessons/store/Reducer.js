import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    lessons: [],
    lesson: null,
}
const Reducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {

        case ActionTypes.FETCH_LESSON_LOADING:
            return { ...state, isLoading: true }
        case ActionTypes.FETCH_LESSONS_SUCCESS:
            return { ...state, isLoading: false, lessons: payload }
        case ActionTypes.FETCH_LESSON_SUCCESS:
            return { ...state, isLoading: false, lesson: payload }
        case ActionTypes.DELETE_LESSON_SUCCESS:
            return { ...state, isLoading: false, lessons: payload }
        default:
            return state;
    }
}
export default Reducer;