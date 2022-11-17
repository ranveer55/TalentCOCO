import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    companies: [],
    company: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_COMPANY_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_COMPANIES_SUCCESS:
            return { ...state, isLoading: false, companies: payload}
        case ActionTypes.FETCH_COMPANY_SUCCESS:

            return { ...state, isLoading: false, company: payload}
        case ActionTypes.DELETE_COMPANY_SUCCESS:

            return { ...state, isLoading: false, companies: payload}
                default:
            return state;
    }
}
export default  Reducer;