import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    lectures: [],
    lecture: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_LECTURE_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_LECTURES_SUCCESS:
            return { ...state, isLoading: false, lectures: payload}
        case ActionTypes.FETCH_LECTURE_SUCCESS:

            return { ...state, isLoading: false, lecture: payload}
        case ActionTypes.DELETE_LECTURE_SUCCESS:

            return { ...state, isLoading: false, lectures: state.lectures.filter((item)=>item.id!==payload)}
                default:
            return state;
    }
}
export default  Reducer;