import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    mcqs: [],
    mcq: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_MCQ_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_MCQS_SUCCESS:
            return { ...state, isLoading: false, mcqs: payload}
        case ActionTypes.FETCH_MCQ_SUCCESS:

            return { ...state, isLoading: false, mcq: payload}
        case ActionTypes.DELETE_MCQ_SUCCESS:

            return { ...state, isLoading: false, mcqs: state.mcqs.filter((item)=>item.id!==payload)}
                default:
            return state;
    }
}
export default  Reducer;