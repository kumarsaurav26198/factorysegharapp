


import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
  };

export const getAllProductReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.GET_ALL_PRODUCT_REQUEST:
            // console.warn("GET_ALL_PRODUCT_REQUEST Reducers", ActionTypes.GET_ALL_PRODUCT_REQUEST);
            // console.log("GET_ALL_PRODUCT_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.GET_ALL_PRODUCT__SUCCESS:
            // console.warn("GET_ALL_PRODUCT_SUCCESS Reducers", ActionTypes.GET_ALL_PRODUCT_SUCCESS);
            // console.log("GET_ALL_PRODUCT_SUCCESS Reducers action===>", JSON.stringify(action?.data,null,2));
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.GET_ALL_PRODUCT_FAILURE:
            // console.warn("GET_ALL_PRODUCT_FAILURE Reducers", ActionTypes.GET_ALL_PRODUCT_FAILURE);
            // console.log("GET_ALL_PRODUCT_FAILURE Reducers action===>", action?.error?.message);
            return {
                ...state,
                loading: false,
                error:  action?.error,
            };
        default:
            return state;
    }
};
