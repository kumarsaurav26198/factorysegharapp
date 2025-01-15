import {takeEvery, call, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
// import axiosInstance from './axiosInstance';
import {apiUri, baseURL} from '../../services/apiEndPoints';
import axios from 'axios';



function* getContactDetailsApiCall() {
  // console.log("GET_ALL_PRODUCT_REQUEST Reducers action===>",);
  
  try {
    const fullUrl = `${baseURL}${apiUri.factoyHome.getAllItems}`;
    // console.log("Full URL for getAllItems request: ", fullUrl);

    const response = yield axios.get(fullUrl);
    const data = response?.data?.data;
    // console.log(" getContactDetailsApiCall Response received:", JSON.stringify(data,null,2));
    yield put({type: ActionTypes.GET_ALL_PRODUCT__SUCCESS, data});
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
    // console.log("Error Payload:", JSON.stringify(errorPayload,null,2));
    yield put({type: ActionTypes.GET_ALL_PRODUCT_FAILURE, error: errorPayload});
  }
}

function* getAllProductSaga() {
  yield takeEvery(ActionTypes.GET_ALL_PRODUCT_REQUEST, getContactDetailsApiCall);
}
export default getAllProductSaga;
