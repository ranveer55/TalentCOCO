import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    testcases: [],
    testcase: null,
}
const Reducer = (state = initialState, {type, payload} = {}) => {
       switch (type) {
      
        case ActionTypes.FETCH_TESTCASE_LOADING:
            return {  ...state,isLoading: true}

        case ActionTypes.FETCH_TESTCASES_SUCCESS:
            return { ...state, isLoading: false, testcases: payload}
        case ActionTypes.FETCH_TESTCASE_SUCCESS:

            return { ...state, isLoading: false, testcase: payload}
        case ActionTypes.DELETE_TESTCASE_SUCCESS:

            return { ...state, isLoading: false, testcases: state.testcases.filter((item)=>item.id!==payload)}
                default:
            return state;
    }
}
export default  Reducer;