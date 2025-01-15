import {takeEvery, call, put} from 'redux-saga/effects';
import {ActionTypes} from '../constants/actiontypes';
// import axiosInstance from './axiosInstance';
import {apiUri} from '../../services/apiEndPoints';
import { goBack } from '../../services/navigationService';


function* contactusApiCalls(action) {
  const { payload } = action;
  const fullUrl = `${apiUri.jantauser.contact}`;
  // console.log('contactusApiCalls Full URL===>: ', fullUrl);
  // console.log('contactusApiCalls payload: ', payload);
 

  // try {
  //   const response = yield call(axiosInstance.post, fullUrl, payload);
  //   const data = response.data;
  //   yield put({ type: ActionTypes.CONTACT_US_SUCCESS, data });
  //   goBack()
  // } catch (error) {
  //   const errorPayload = {
  //     message: error?.response?.data?.message || error.message || 'Something went wrong!',
  //     status: error?.response?.status || null,
  //     response: error?.response ? {
  //       status: error.response.status,
  //       data: error.response.data,
  //       config: {
  //         method: error.response.config?.method,
  //         url: error.response.config?.url,
  //       },
  //     } : null,
  //   };

  //   yield put({ type: ActionTypes.CONTACT_US_FAILURE, error: errorPayload });
  // }
}

function* getContactDetailsApiCall() {
  try {
    const fullUrl = `${apiUri.jantaDrive.contact}`;
    const response = yield axiosInstance.get(fullUrl);
    const data = response?.data?.data;
    // console.log(" getContactDetailsApiCall Response received:", JSON.stringify(data,null,2));
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
    // console.log("Error Payload:", JSON.stringify(errorPayload,null,2));
    yield put({type: ActionTypes.GET_CONTACT_US_FAILURE, error: errorPayload});
  }
}

function* contactUsSaga() {
  yield takeEvery(ActionTypes.GET_CONTACT_US_REQUEST, getContactDetailsApiCall);
  yield takeEvery(ActionTypes.CONTACT_US_REQUEST, contactusApiCalls);
}

export default contactUsSaga;
