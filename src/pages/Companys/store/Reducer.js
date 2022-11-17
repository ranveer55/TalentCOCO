import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    error: null,
    companys: [],
    company: null,
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
      
        case ActionTypes.FETCH_COMPANY_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_COMPANY_SUCCESS:
            return { ...state, isLoading: false, companys: payload}
        case ActionTypes.ADD_COMPANY_SUCCESS:
            return { ...state, isLoading: false, companys: payload}
        case ActionTypes.UPDATE_COMPANY_SUCCESS:
            return { ...state, isLoading: false, companys: payload}
        case ActionTypes.DELETE_COMPANY_SUCCESS:
            return { ...state, isLoading: false, companys: payload}
        case ActionTypes.FETCH_COMPANY_ERROR:
            return { ...state, isLoading: false, error: payload }
                default:
            return state;
    }
}
export default  Reducer;