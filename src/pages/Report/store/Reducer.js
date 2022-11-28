import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    reports: [],
    report: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_REPORT_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_REPORTS_SUCCESS:
            return { ...state, isLoading: false, reports: payload}
             default:
            return state;
    }
}
export default  Reducer;