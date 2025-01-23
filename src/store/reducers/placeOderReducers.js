import {ActionTypes} from '../constants/actiontypes';
const initialState = {
  data: [],
  loading: false,
  error: null,
  paymentVerificationData: null, // To store data on successful payment verification
  paymentVerificationError: null, 
};

export const placeOderReducers = (state = initialState, action) => {
  switch (action.type) {
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
        data: action.currentUser,
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
    case ActionTypes.PAYMENT_VERIFICATION_SUCCESS:
      // console.warn("PAYMENT_VERIFICATION_SUCCESS Reducers", ActionTypes.PAYMENT_VERIFICATION_SUCCESS);
    //   console.warn('PAYMENT_VERIFICATION_SUCCESS Reducers action===>', action);
      return {
        ...state,
        paymentVerificationData: action, // Save the verification data
        paymentVerificationError: null, // Clear any previous error
        loading: false,
      };
    case ActionTypes.PAYMENT_VERIFICATION_FAILURE:
      // console.warn("PAYMENT_VERIFICATION_FAILURE Reducers", ActionTypes.PAYMENT_VERIFICATION_FAILURE);
      console.log('PAYMENT_VERIFICATION_FAILURE Reducers action===>', action.error);
      return {
        ...state,
        paymentVerificationData: null, // Clear any previous success data
        paymentVerificationError: action.error, // Store the error from verification failure
        loading: false,
      };

    default:
      return state;
  }
};
