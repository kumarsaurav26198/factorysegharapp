import {takeEvery, call, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
import {apiUri, baseURL} from '../../services/apiEndPoints';
import axios from 'axios';

function* getProductByCategoryApiCall(action) {
  const {payload} = action;

  try {
    const fullUrl = `${baseURL}${apiUri.factoyHome.getAllItems}`;
    // console.log("Full URL for getAllItems request: ", fullUrl);

    const response = yield axios({
      method: 'post',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        category: payload,
      },
    });

    // Extract data from response
    const data = response?.data?.data;
    // console.log(
    //   'getProductByCategoryApiCall Response received:',
    //   JSON.stringify(data, null, 2),
    // );

    yield put({type: ActionTypes.GET_PRODUCT_CATOG__SUCCESS, data});
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
      type: ActionTypes.GET_PRODUCT_CATOG_FAILURE,
      error: errorPayload,
    });
  }
}

// Watcher Saga
function* getProductByCategorySaga() {
  yield takeEvery(
    ActionTypes.GET_PRODUCT_CATOG_REQUEST,
    getProductByCategoryApiCall,
  );
}

export default getProductByCategorySaga;
