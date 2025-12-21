import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { ActionTypes } from '../constants/actiontypes';
import { navigate, reset } from '../../services/navigationService';
import { apiUri, baseURL } from '../../services/apiEndPoints';
import { supabase } from '../../lib/supabase';
import axiosInstance from './axiosInstance';


function* registerSellerApi() {

  console.log("SELLER_REQUEST")
  try {

    const response = yield call(
      axiosInstance.post,
      'auth/seller/session'
    )
    const responseData=response.data
     yield put({ type: ActionTypes.SELLER_REQUEST_SUCCESS,kycData:responseData });
    navigate("BecomeSeller",);

    // const fullUrl = `${baseURL}${apiUri.auth.otplogin}`;
    // console.log("Full URL for login request: ", fullUrl);
    // console.log("Full payload for login request: ", payload);

    // const response = yield axios.post(fullUrl, payload, {
    //   headers: {
    //     'Content-Type': 'application/json', // Explicitly set the content type
    //   },
    // });

    // const currentUser = response?.data;
    // const extractedOtp = currentUser?.data?.otp;
    // console.log("currentUser====>>", JSON.stringify(currentUser,null,2));

    // // Alert.alert(extractedOtp);

    // navigate("OtpScreen", { mobile :payload?.mobile});

    // Dispatch success actions
    // yield put({ type: ActionTypes.RESTART_LOGIN_REQUEST });
    // yield put({ type: ActionTypes.LOGIN_REQUEST_SUCCESS, currentUser });

  } catch (error) {
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
    console.log("errorPayload====>>", JSON.stringify(errorPayload, null, 2));

    yield put({ type: ActionTypes.SELLER_REQUEST_FAILURE, error: errorPayload });
  }
}

function* registerSellerSaga() {
  yield takeEvery(ActionTypes.SELLER_REQUEST, registerSellerApi);
}

export default registerSellerSaga;
