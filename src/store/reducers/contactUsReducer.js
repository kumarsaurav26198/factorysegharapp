


import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
    
  };

export const contactUsReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.GET_CONTACT_US_REQUEST:
            // console.warn("GET_CONTACT_US_REQUEST Reducers", ActionTypes.GET_CONTACT_US_REQUEST);
            // console.log("CONTACT_US_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.GET_CONTACT_US_SUCCESS:
            // console.warn("GET_CONTACT_US_SUCCESS Reducers", ActionTypes.GET_CONTACT_US_SUCCESS);
            // console.log("GET_CONTACT_US_SUCCESS Reducers action===>", action);
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.GET_CONTACT_US_FAILURE:
            // console.warn("GET_CONTACT_US_FAILURE Reducers", ActionTypes.GET_CONTACT_US_FAILURE);
            // console.log("GET_CONTACT_US_FAILURE Reducers action===>", action?.error);
            return {
                ...state,
                loading: false,
                error: action?.error,
            };
        // case ActionTypes.CONTACT_US_REQUEST:
        //     // console.warn("CONTACT_US_REQUEST Reducers", ActionTypes.CONTACT_US_REQUEST);
        //     // console.log("CONTACT_US_REQUEST Reducers action===>", action);
        //     return {
        //         ...state,
        //         sendloading: true,
        //         senderror: null,
        //     };
        // case ActionTypes.CONTACT_US_SUCCESS:
        //     // console.warn("CONTACT_US_SUCCESS Reducers", ActionTypes.CONTACT_US_SUCCESS);
        //     // console.log("CONTACT_US_SUCCESS Reducers action===>", action.data);
        //     return {
        //         ...state,
        //         sendData: action?.data,
        //         sendloading: false,
        //     };
        // case ActionTypes.CONTACT_US_FAILURE:
        //     // console.warn("CONTACT_US_FAILURE Reducers", ActionTypes.CONTACT_US_FAILURE);
        //     // console.log("CONTACT_US_FAILURE Reducers action===>", action.payload);
        //     return {
        //         ...state,
        //         sendloading: false,
        //         senderror: action.payload,
        //     };
        // case ActionTypes.CONTACT_US_RESET:
        //     // console.warn("CONTACT_US_RESET Reducers", ActionTypes.CONTACT_US_RESET);
        //     // console.log("CONTACT_US_RESET Reducers action===>", action.payload);
        //     return {
        //         ...state,
        //         sendloading: false,
        //         senderror: action.payload,
        //     };
        default:
            return state;
    }
};
