import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    cohorts: [],
    cohort: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_COHORT_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_COHORTS_SUCCESS:
            return { ...state, isLoading: false, cohorts: payload}
        case ActionTypes.FETCH_COHORT_SUCCESS:

            return { ...state, isLoading: false, cohort: payload}
        case ActionTypes.DELETE_COHORT_SUCCESS:

            return { ...state, isLoading: false, cohorts: payload}
                default:
            return state;
    }
}
export default  Reducer;