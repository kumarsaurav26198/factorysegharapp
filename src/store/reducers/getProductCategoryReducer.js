


import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
  };

export const getProductCategoryReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.GET_PRODUCT_CATOG_REQUEST:
            // console.warn("GET_PRODUCT_CATOG_REQUEST Reducers", ActionTypes.GET_PRODUCT_CATOG_REQUEST);
            // console.log("GET_PRODUCT_CATOG_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.GET_PRODUCT_CATOG__SUCCESS:
            // console.warn("GET_PRODUCT_CATOG_SUCCESS Reducers", ActionTypes.GET_PRODUCT_CATOG_SUCCESS);
            // console.log("GET_PRODUCT_CATOG_SUCCESS Reducers action===>", JSON.stringify(action?.data?.items,null,2));
            return {
                ...state,
                data: action?.data,
                loading: false,
            };
        case ActionTypes.GET_PRODUCT_CATOG_FAILURE:
            // console.warn("GET_PRODUCT_CATOG_FAILURE Reducers", ActionTypes.GET_PRODUCT_CATOG_FAILURE);
            // console.log("GET_PRODUCT_CATOG_FAILURE Reducers action===>", action?.error?.message);
            return {
                ...state,
                loading: false,
                error:  action?.error,
            };
        default:
            return state;
    }
};
