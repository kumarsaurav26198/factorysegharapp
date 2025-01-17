import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { ActionTypes } from '../constants/actiontypes';
import { navigate, reset } from '../../services/navigationService';
import { apiUri, baseURL } from '../../services/apiEndPoints';

function* verifyUser(action) {
  const { mobile, otp } = action?.payload;

  const fullUrl = `${ baseURL }${ apiUri.auth.verifyotp }`;

  try
  {
    const response = yield axios({
      method: 'post',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        mobile: mobile,
        otp: otp,
      },
    });
    
    
    // Uncomment and use these lines if needed
    const data = response?.data;
    // console.log("data====>>", JSON.stringify(data,null,2));

 

    yield put({ type: ActionTypes.VERIFY_REQUEST_SUCCESS, data });
    if(data?.firstLogin){
      navigate("Register", { mobile });
      console.log("Register",mobile)

    }else{
         reset([ { name: 'DrawerNavigation' } ]);
    }

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
    yield put({ type: ActionTypes.VERIFY_REQUEST_FAILURE, error: errorPayload });
  }
}

function* verifySaga() {
  yield takeEvery(ActionTypes.VERIFY_REQUEST, verifyUser);
}

export default verifySaga;
