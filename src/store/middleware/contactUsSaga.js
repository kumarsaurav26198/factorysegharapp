import {takeEvery, call, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
import {apiUri, baseURL} from '../../services/apiEndPoints';
import axios from 'axios';

function* getContactDetailsApiCall() {
  try {
    const fullUrl = `${baseURL}${apiUri.factoyHome.getcontact}`;
    const response = yield call(axios.get, fullUrl);

    const data = response?.data?.data;
    yield put({type: ActionTypes.GET_CONTACT_US_SUCCESS, data});
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
    // console.log('Error Payload:', JSON.stringify(errorPayload, null, 2));
    yield put({type: ActionTypes.GET_CONTACT_US_FAILURE, error: errorPayload});
  }
}

function* contactUsSaga() {
  yield takeEvery(ActionTypes.GET_CONTACT_US_REQUEST, getContactDetailsApiCall);
}

export default contactUsSaga;
