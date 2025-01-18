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
            // console.log("ADD_TO_CART_SUCCESS Reducers action===>", action.payload);
            const data = Array.isArray(state.data) ? state.data : []; // Ensure `data` is an array
            const existingCartItemIndex = data.findIndex(
                item => item.itemId === action.payload.itemId
            );

            let updatedCartData;
            if (existingCartItemIndex !== -1) {
                // Update quantity if item exists
                updatedCartData = data.map((item, index) =>
                    index === existingCartItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                // Add new item to the cart
                updatedCartData = [...data, action.payload];
            }

            return {
                ...state,
                data: updatedCartData,
                loading: false,
            };

        case ActionTypes.ADD_TO_CART_FAILURE:
            // console.log("ADD_TO_CART_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case ActionTypes.INCREMENT_QUANTITY:
            // console.log("INCREMENT_QUANTITY Reducers action===>", action.payload);
            return {
                ...state,
                data: state.data.map(item =>
                    item.itemId === action.payload.itemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case ActionTypes.DECREMENT_QUANTITY:
            // console.log("DECREMENT_QUANTITY Reducers action===>", action.payload);
            return {
                ...state,
                data: state.data
                    .map(item =>
                        item.itemId === action.payload.itemId
                            ? { ...item, quantity: item.quantity - 1 } // Decrement quantity
                            : item
                    )
                    .filter(item => item.quantity > 0), // Remove items with quantity <= 0
            };
        case ActionTypes.RESTART_LOGIN_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case ActionTypes.UPDATE_TOKEN:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        case ActionTypes.LOG_OUT_REQUEST:
            // console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
            };
        case ActionTypes.CLEAR_CART_REQUEST:
            // console.warn("CLEAR_CART_REQUEST Reducers", ActionTypes.CLEAR_CART_REQUEST);
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
