
import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const addressReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_USER_ADDRESS_REQUEST:
            // console.warn("FETCH_USER_ADDRESS_REQUEST Reducers", ActionTypes.FETCH_USER_ADDRESS_REQUEST);
            // console.log("FETCH_USER_ADDRESS_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_USER_ADDRESS_SUCCESS:
            // console.warn("FETCH_USER_ADDRESS_SUCCESS Reducers", ActionTypes.FETCH_USER_ADDRESS_SUCCESS);
            // console.warn("FETCH_USER_ADDRESS_SUCCESS Reducers action===>", action?.data);
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.FETCH_USER_ADDRESS_FAILURE:
            // console.warn("FETCH_USER_ADDRESS_FAILURE Reducers", ActionTypes.FETCH_USER_ADDRESS_FAILURE);
            // console.log("FETCH_USER_ADDRESS_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionTypes.UPDATE_USER_ADDRESS_REQUEST:
            // console.warn("UPDATE_USER_ADDRESS_REQUEST Reducers", ActionTypes.UPDATE_USER_ADDRESS_REQUEST);
            // console.log("UPDATE_USER_ADDRESS_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS:
            // console.warn("UPDATE_USER_ADDRESS_SUCCESS Reducers", ActionTypes.UPDATE_USER_ADDRESS_SUCCESS);
            // console.warn("UPDATE_USER_ADDRESS_SUCCESS Reducers action===>", JSON.stringify(action));
            return {
                ...state,
                data: action,
                loading: false,
            };
        case ActionTypes.UPDATE_USER_ADDRESS_FAILURE:
            // console.warn("UPDATE_USER_ADDRESS_FAILURE Reducers", ActionTypes.UPDATE_USER_ADDRESS_FAILURE);
            // console.log("UPDATE_USER_ADDRESS_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};