import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const placeOderReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.PLACE_ORDER_REQUEST:
            // console.warn("PLACE_ORDER_REQUEST Reducers", ActionTypes.PLACE_ORDER_REQUEST);
            // console.log("PLACE_ORDER_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.PLACE_ORDER_SUCCESS:
            // console.warn("PLACE_ORDER_SUCCESS Reducers", ActionTypes.PLACE_ORDER_SUCCESS);
            // console.warn("PLACE_ORDER_SUCCESS Reducers action===>", action.currentUser);
            return {
                ...state,
                data:action.currentUser,
                loading: false,
            };
        case ActionTypes.PLACE_ORDER_FAILURE:
            // console.warn("PLACE_ORDER_FAILURE Reducers", ActionTypes.PLACE_ORDER_FAILURE);
            // console.log("PLACE_ORDER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
      
        default:
            return state;
    }
};