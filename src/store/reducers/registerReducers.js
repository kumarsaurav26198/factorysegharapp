import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const registerReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.REGISTER_REQUEST:
            // console.warn("REGISTER_REQUEST Reducers", ActionTypes.REGISTER_REQUEST);
            // console.log("REGISTER_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.REGISTER_RESET_REQUEST:
            // console.warn("REGISTER_RESET_REQUEST Reducers", ActionTypes.REGISTER_RESET_REQUEST);
            // console.log("REGISTER_RESET_REQUEST Reducers action===>", action.payload);
            return {
                data: [],
                loading: false,
                error: null,
            };
        case ActionTypes.REGISTER_REQUEST_SUCCESS:
            // console.warn("REGISTER_REQUEST_SUCCESS Reducers", ActionTypes.REGISTER_REQUEST_SUCCESS);
            // console.warn("REGISTER_REQUEST_SUCCESS Reducers action===>", action.currentUser);
            return {
                ...state,
                data:action.currentUser,
                loading: false,
            };
        case ActionTypes.REGISTER_REQUEST_FAILURE:
            // console.warn("REGISTER_REQUEST_FAILURE Reducers", ActionTypes.REGISTER_REQUEST_FAILURE);
            // console.log("REGISTER_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
      
        default:
            return state;
    }
};