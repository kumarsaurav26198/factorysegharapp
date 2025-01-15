import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const verifyReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.VERIFY_REQUEST:
            // console.warn("VERIFY_REQUEST Reducers", ActionTypes.VERIFY_REQUEST);
            // console.log("VERIFY_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.VERIFY_REQUEST_SUCCESS:
            // console.warn("VERIFY_REQUEST_SUCCESS Reducers", ActionTypes.VERIFY_REQUEST_SUCCESS);
            // console.warn("VERIFY_REQUEST_SUCCESS Reducers action===>", action);
            return {
                ...state,
                data: action,
                loading: false,
            };
        case ActionTypes.VERIFY_REQUEST_FAILURE:
            // console.warn("VERIFY_REQUEST_FAILURE Reducers", ActionTypes.VERIFY_REQUEST_FAILURE);
            // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionTypes.RESTART_LOGIN_REQUEST:
            // console.warn("VERIFY_REQUEST_FAILURE Reducers", ActionTypes.VERIFY_REQUEST_FAILURE);
            // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: null,
            };
        case ActionTypes.UPDATE_TOKEN:
            // console.warn("UPDATE_TOKEN Reducers", ActionTypes.UPDATE_TOKEN);
            // console.log("UPDATE_TOKEN Reducers action===>", action);
            return {
                ...state,
                data: action.payload, 
                loading: false,
            };
            case ActionTypes.LOG_OUT_REQUEST:
                console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
                // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action);
                return {
                    ...state,
                    data:null,
                    loading: false,
                    error: action.payload,
                };
        default:
            return state;
    }
};