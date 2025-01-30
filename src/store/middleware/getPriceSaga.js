import {takeEvery, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
import axios from 'axios';
import {apiUri, baseURL} from '../../services/apiEndPoints';

function* getPriceApiCall(action) {
  const {payload}=action
  // console.log("payload===>",JSON.stringify(payload,null,2))
  try {

    const fullUrl = `${baseURL}${apiUri.factoyHome.getPrice}`;
    // console.log('Full URL for login request: ', fullUrl);

    const response = yield axios({
      method: 'post',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    });

    // Extract and log the response
    const data = response?.data;
    // console.log('Response received:', JSON.stringify(data, null, 2));

    // Dispatch success action
    yield put({type: ActionTypes.FETCH_PRICE_DISCOUNT_SUCCESS, data});
  } catch (error) {
    const errorPayload = {
      message:
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong!',
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

    console.error('Error Payload:', JSON.stringify(errorPayload, null, 2));
    yield put({
      type: ActionTypes.FETCH_PRICE_DISCOUNT_FAILURE,
      error: errorPayload,
    });
  }
}

function* getPriceSaga() {
  yield takeEvery(ActionTypes.FETCH_PRICE_DISCOUNT_REQUEST, getPriceApiCall);

}

export default getPriceSaga;
