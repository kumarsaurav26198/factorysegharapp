
import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const orderHistoryReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_ORDERHISTORY_REQUEST:
            // console.warn("FETCH_ORDERHISTORY_REQUEST Reducers", ActionTypes.FETCH_ORDERHISTORY_REQUEST);
            // console.log("FETCH_ORDERHISTORY_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_ORDERHISTORY_SUCCESS:
            // console.warn("FETCH_ORDERHISTORY_SUCCESS Reducers", ActionTypes.FETCH_ORDERHISTORY_SUCCESS);
            // console.warn("FETCH_ORDERHISTORY_SUCCESS Reducers action===>", action?.data);
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.FETCH_ORDERHISTORY_FAILURE:
            // console.warn("FETCH_ORDERHISTORY_FAILURE Reducers", ActionTypes.FETCH_ORDERHISTORY_FAILURE);
            // console.log("FETCH_ORDERHISTORY_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};