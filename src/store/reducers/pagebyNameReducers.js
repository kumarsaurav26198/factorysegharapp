
import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const pagebyNameReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_PAGEBYNAME_REQUEST:
            // console.warn("FETCH_PAGEBYNAME_REQUEST Reducers", ActionTypes.FETCH_PAGEBYNAME_REQUEST);
            // console.log("FETCH_PAGEBYNAME_REQUEST Reducers action===>", action?.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_PAGEBYNAME_SUCCESS:
            // console.warn("FETCH_PAGEBYNAME_SUCCESS Reducers", ActionTypes.FETCH_PAGEBYNAME_SUCCESS);
            // console.log("FETCH_PAGEBYNAME_SUCCESS Reducers action===>", action);
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.FETCH_PAGEBYNAME_FAILURE:
            // console.warn("FETCH_PAGEBYNAME_FAILURE Reducers", ActionTypes.FETCH_PAGEBYNAME_FAILURE);
            // console.log("FETCH_PAGEBYNAME_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};