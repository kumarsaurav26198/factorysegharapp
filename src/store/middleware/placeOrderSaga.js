import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { ActionTypes } from '../constants/actiontypes';
import { navigate, reset } from '../../services/navigationService';
import { apiUri, baseURL } from '../../services/apiEndPoints';

function* placeOrderApi(action) {
  const { payload } = action;
  try
  {
    const fullUrl = `${ baseURL }${ apiUri.factoyHome.placeOrder }`;
    console.log("Full URL for placeOrder request: ", fullUrl);
    console.log("Full URL for payload request: ", payload);

    const response = yield axios.post(fullUrl, payload, {
      headers: {
        'Content-Type': 'application/json', // Explicitly set the content type
      },
    });


    const placeOrderApires = response?.data;
    console.log("placeOrderApires===>", JSON.stringify(placeOrderApires, null, 2));

    // const extractedOtp = currentUser?.data?.otp;
    // console.log("extractedOtp====>>", extractedOtp);
    // Alert.alert(extractedOtp);

    // navigate("SignMobile");

    // Dispatch success actions

    yield put({ type: ActionTypes.CLEAR_CART_REQUEST });
    // yield put({ type: ActionTypes.PLACE_ORDER_SUCCESS, currentUser });

  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null,
      response: error?.response
        ? {
          status: error.response.status,
          data: error.response.data,
          config: {
            method: error.response.config?.method,
            url: error.response.config?.url,
          },
        }
        : null,
    };
    console.log("errorPayload===>", JSON.stringify(errorPayload, null, 2));

    yield put({ type: ActionTypes.REGISTER_REQUEST_FAILURE, error: errorPayload });
  }
}

function* placeOrderSaga() {
  yield takeEvery(ActionTypes.PLACE_ORDER_REQUEST, placeOrderApi);
}

export default placeOrderSaga;
