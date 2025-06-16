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

      case ActionTypes.ADD_TO_CART_SUCCESS: {
      console.log("ADD_TO_CART_SUCCESS Reducers action===>", JSON.stringify(action?.data,null,2));

        const newItem = action.data.cartItems[0]; // Extract the first cart item
        
        // Ensure `state.data` is always an array
        const existingCart = Array.isArray(state.data) ? state.data : [];
  
        // Find if item already exists
        const existingCartItemIndex = existingCart.findIndex(
          (item) => item._id === newItem._id
        );
  
        let updatedCart;
        
        if (existingCartItemIndex !== -1) {
          // Update quantity if item already exists
          updatedCart = existingCart.map((item, index) =>
            index === existingCartItemIndex
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          // Add new item to cart
          updatedCart = [...existingCart, newItem];
        }}

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
