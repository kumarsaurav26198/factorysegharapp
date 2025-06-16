import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { ActionTypes } from '../constants/actiontypes';
import { navigate, reset } from '../../services/navigationService';
import { apiUri, baseURL } from '../../services/apiEndPoints';

function* registerUser(action) {
  const { payload } = action;
  try
  {
    const fullUrl = `${ baseURL }${ apiUri.auth.register }`;
    // console.log("Full URL for login request: ", fullUrl);
    console.log("Full payload for login request: ", payload);

    const response = yield axios.post(fullUrl, payload, {
      headers: {
        'Content-Type': 'application/json', // Explicitly set the content type
      },
    });


    const currentUser = response?.data;
    reset([ { name: 'BottomNavigator' } ]);
    // console.log("registerUser===>", JSON.stringify(currentUser, null, 2));

    // const extractedOtp = currentUser?.data?.otp;
    // console.log("extractedOtp====>>", extractedOtp);
    // Alert.alert(extractedOtp);

    // navigate("OtpScreen");

    // Dispatch success actions
    // yield put({ type: ActionTypes.RESTART_REGISTER_REQUEST });
    yield put({ type: ActionTypes.REGISTER_REQUEST_SUCCESS, currentUser });

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

function* registerSaga() {
  yield takeEvery(ActionTypes.REGISTER_REQUEST, registerUser);
}

export default registerSaga;
