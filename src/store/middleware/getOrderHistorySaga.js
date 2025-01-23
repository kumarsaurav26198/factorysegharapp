import {takeEvery, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
import axios from 'axios';
import {apiUri, baseURL} from '../../services/apiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* fetchOrderHistoryApiCall() {
  try {
    const mobile = yield AsyncStorage.getItem('mobile');

    // console.log('Payload received:', payload);

    const fullUrl = `${baseURL}${apiUri.factoyHome.orderHistory}`;
    console.log('Full URL for orderHistory request: ', fullUrl);

    const response = yield axios({
      method: 'post',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {mobile},
    });

    const data = response?.data?.data;
    // console.log("Response received:", JSON.stringify(data, null, 2));

    // Dispatch success action
    yield put({type: ActionTypes.FETCH_ORDERHISTORY_SUCCESS, data});
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
      type: ActionTypes.FETCH_ORDERHISTORY_FAILURE,
      error: errorPayload,
    });
  }
}
function* getOrderHistorySaga() {
  yield takeEvery(
    ActionTypes.FETCH_ORDERHISTORY_REQUEST,
    fetchOrderHistoryApiCall,
  );
}
export default getOrderHistorySaga;
