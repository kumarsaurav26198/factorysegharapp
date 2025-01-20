import { ActionTypes } from '../constants/actiontypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART_REQUEST:
      // console.log("ADD_TO_CART_REQUEST Reducers action===>", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionTypes.ADD_TO_CART_SUCCESS:
      console.log("ADD_TO_CART_SUCCESS Reducers action===>", action);
      return {
        ...state,
        data: action.payload, // Corrected spelling of payload
        loading: false,
      };

    case ActionTypes.GET_CART_REQUEST:
      // console.log("GET_CART_REQUEST Reducers action===>", action.error);
      return {
        ...state,
        loading: true, // Corrected to true for loading state during request
        error: null, // Reset error during request
      };

    case ActionTypes.GET_CART_SUCCESS:
    //   console.log("GET_CART_SUCCESS Reducers action===>", action.data);
      return {
        ...state,
        data: action.data, // Corrected spelling of payload
        loading: false,
      };

    case ActionTypes.GET_CART_FAILURE:
      // console.log("GET_CART_FAILURE Reducers action===>", action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
