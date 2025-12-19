import { takeEvery, put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/actiontypes'
import { navigate, reset } from '../../services/navigationService'
import { supabase } from '../../lib/supabase'
import { apiUri, baseURL } from '../../services/apiEndPoints'
import axios from 'axios'

function* verifyUser(action) {
  const { mobile, otp } = action.payload

  try {
    // 1️⃣ Verify OTP with Supabase
    const phone = mobile.startsWith('+') ? mobile : `+${mobile}`

    const { data, error } = yield call(
      [supabase.auth, supabase.auth.verifyOtp],
      {
        phone,
        token: otp,
        type: 'sms',
      }
    )

    if (error) throw error

    const { user, session } = data

    const accessToken = session.access_token
    console.log("accessToken",JSON.stringify(accessToken,null,2))

        if (!session) {
          throw error
    }
const fullUrl=`${baseURL}${apiUri.auth.sessioninfo}`
console.log("fullUrl==========>>",fullUrl)


const response = yield call(
  axios.post,
  fullUrl,
  {}, // ✅ empty body (or your payload)
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }
);



    console.log("response",JSON.stringify(response,null,2))

    // console.log("response",JSON.stringify(response,null,2))
    // const body = response.JSON()
    // console.log('bodybody', JSON.stringify(body, null, 2))

    // 3️⃣ (Optional) save to redux if needed
    // yield put({
    //   type: ActionTypes.VERIFY_REQUEST_SUCCESS,
    //   data: {
    //     user,
    //     session,
    //     backendUser: body,
    //   },
    // })

    // 4️⃣ Navigate
    // reset([{ name: 'BottomNavigator' }])

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

        console.error("Error Payload:", JSON.stringify(errorPayload, null, 2));
    yield put({
      type: ActionTypes.VERIFY_REQUEST_FAILURE,
      error: {
        message:
          error?.response?.data?.message ||
          error.message ||
          'OTP verification failed',
        status: error?.response?.status || error.status || null,
      },
    })
  }
}

function* verifySaga() {
  yield takeEvery(ActionTypes.VERIFY_REQUEST, verifyUser);
}

export default verifySaga;
