
import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const userReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_LOGIN_USER_REQUEST:
            // console.warn("FETCH_LOGIN_USER_REQUEST Reducers", ActionTypes.FETCH_LOGIN_USER_REQUEST);
            // console.log('FETCH_LOGIN_USER_REQUEST Reducers action===>',);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_LOGIN_USER_SUCCESS:
            // console.warn("FETCH_LOGIN_USER_SUCCESS Reducers", ActionTypes.FETCH_LOGIN_USER_SUCCESS);
            // console.warn('FETCH_LOGIN_USER_SUCCESS Reducers action===>', action?.data);
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.FETCH_LOGIN_USER_FAILURE:
            // console.warn("FETCH_LOGIN_USER_FAILURE Reducers", ActionTypes.FETCH_LOGIN_USER_FAILURE);
            // console.log("FETCH_LOGIN_USER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionTypes.UPDATE_LOGIN_USER_REQUEST:
            // console.warn("UPDATE_LOGIN_USER_REQUEST Reducers", ActionTypes.UPDATE_LOGIN_USER_REQUEST);
            // console.log("UPDATE_LOGIN_USER_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.UPDATE_LOGIN_USER_SUCCESS:
            // console.warn("UPDATE_LOGIN_USER_SUCCESS Reducers", ActionTypes.UPDATE_LOGIN_USER_SUCCESS);
            // console.warn("UPDATE_LOGIN_USER_SUCCESS Reducers action===>", JSON.stringify(action));
            return {
                ...state,
                data: action,
                loading: false,
            };
        case ActionTypes.UPDATE_LOGIN_USER_FAILURE:
            // console.warn("UPDATE_LOGIN_USER_FAILURE Reducers", ActionTypes.UPDATE_LOGIN_USER_FAILURE);
            // console.log("UPDATE_LOGIN_USER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
