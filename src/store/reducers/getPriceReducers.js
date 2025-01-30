
import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
    openModal:null
};

export const getPriceReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.GET_CART_REQUEST:
            console.log("GET_CART_REQUEST Reducers action===>", action);
            return {
              ...state,
              openModal:false
            //   loading: true, // Corrected to true for loading state during request
            //   error: null, // Reset error during request
            };
        case ActionTypes.FETCH_PRICE_DISCOUNT_REQUEST:
            // console.warn("FETCH_PRICE_DISCOUNT_REQUEST Reducers", ActionTypes.FETCH_PRICE_DISCOUNT_REQUEST);
            // console.log('FETCH_PRICE_DISCOUNT_REQUEST Reducers action===>',);
            return {
                ...state,
                loading: true,
                error: null,
                openModal:false
            };
        case ActionTypes.FETCH_PRICE_DISCOUNT_SUCCESS:
            // console.warn("FETCH_PRICE_DISCOUNT_SUCCESS Reducers", ActionTypes.FETCH_PRICE_DISCOUNT_SUCCESS);
            console.warn('FETCH_PRICE_DISCOUNT_SUCCESS Reducers action===>', action?.data);
            return {
                ...state,
                data: action?.data,
                loading: false,
                openModal:true
            };
        case ActionTypes.FETCH_PRICE_DISCOUNT_FAILURE:
            // console.warn("FETCH_PRICE_DISCOUNT_FAILURE Reducers", ActionTypes.FETCH_PRICE_DISCOUNT_FAILURE);
            // console.log("FETCH_PRICE_DISCOUNT_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
                openModal:false
            };
  
        default:
            return state;
    }
};
