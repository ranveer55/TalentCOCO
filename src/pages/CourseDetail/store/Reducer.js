import * as ActionTypes from './Types';

const initialState = {
    isLoading: false,
    section: null
}
const Reducer = (state = initialState, { type, payload } = {}) => {
     switch (type) {

        case ActionTypes.SET_SECTION_LOADING:
            return { ...state, isLoading: true }
        case ActionTypes.FETCH_SECTION_SUCCESS:
            return { ...state, isLoading: false, section: payload }
       
        default:
            return state;
    }
}
export default Reducer;