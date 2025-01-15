import { ActionTypes } from "../constants/actiontypes";

export const loginRequest = (payload) => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload,
});

export const verifyReq = (payload) => ({
    type: ActionTypes.VERIFY_REQUEST,
    payload,
});

export const upadteTokenToStore = (payload) => ({
    type: ActionTypes.CHECK_SESSION,
    payload,
});

export const registerRequest = (payload) => ({
    type: ActionTypes.REGISTER_REQUEST,
    payload,
});
export const registerReset = () => ({
    type: ActionTypes.REGISTER_RESET_REQUEST,
});
export const logingReset = () => ({
    type: ActionTypes.LOGIN_REQUEST_RESTART,
});

export const logOut = () => ({
    type: ActionTypes.LOG_OUT_REQUEST,
});
export const fetchLoginUser = (payload) => ({
    type: ActionTypes.FETCH_LOGIN_USER_REQUEST,
    payload
});
export const fetchUserAddress = (payload) => ({
    type: ActionTypes.FETCH_USER_ADDRESS_REQUEST,
    payload
});
export const fetchUserHistoryOrder = (payload) => ({
    type: ActionTypes.FETCH_ORDERHISTORY_REQUEST,
    payload
});
export const updateLoginUser = (payload) => ({
    type: ActionTypes.UPDATE_LOGIN_USER_REQUEST,
    payload:payload
});

export const fetchPagebyNameDetails = (payload) => ({
    type: ActionTypes.FETCH_PAGEBYNAME_REQUEST,
    payload
});

export const fetchConstchUsDetails = () => ({
    type: ActionTypes.GET_CONTACT_US_REQUEST,
});

export const ContactUsRequest = (payload) => ({
    type: ActionTypes.CONTACT_US_REQUEST,
    payload,
  });




export const getAllProductRequest = (payload) => ({
    type: ActionTypes.GET_ALL_PRODUCT_REQUEST,
    payload,
  });

  export const addToCartRequest = (payload) => ({
    type: ActionTypes.ADD_TO_CART_SUCCESS,
    payload,
  });

  export const incrementQuantity = (payload) => ({
    type: ActionTypes.INCREMENT_QUANTITY,
    payload, 
});

export const decrementQuantity = (payload) => ({
    type: ActionTypes.DECREMENT_QUANTITY,
    payload, 
});
export const placeOderReq = (payload) => ({
    type: ActionTypes.PLACE_ORDER_REQUEST,
    payload, 
});