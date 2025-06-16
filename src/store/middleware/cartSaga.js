import { takeEvery, put } from 'redux-saga/effects';
import { ActionTypes } from '../constants/actiontypes';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* fetchAddressApiCall() {
    try {
      const mobile = yield AsyncStorage.getItem('mobile');
        // console.log("mobile received:", mobile);
        const fullUrl = `${baseURL}${apiUri.factoyHome.getCart}`;
        // console.log("Full URL for getAddress request: ", fullUrl);

        const response = yield axios({
          method: 'post',
          url: fullUrl,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {mobile},
        });

        // Extract and log the response
        const data = response?.data?.data;
        // console.log("Response received:", JSON.stringify(data, null, 2));
        yield put({ type: ActionTypes.GET_CART_SUCCESS, data });
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
        yield put({ type: ActionTypes.GET_CART_FAILURE, error: errorPayload });
    }
}


function* addToCartApiCall(action) {
    const { payload } = action
    
    try {
      const fullUrl = `${baseURL}${apiUri.factoyHome.addCart}`;
      // console.log("Full URL for addCart request: ", fullUrl);
      // console.log("Full payload for addCart request: ", JSON.stringify(payload,null,2));
      
      const response = yield axios.post(fullUrl, payload, {
        headers: {
          'Content-Type': 'application/json', // Explicitly set the content type
        },
      });
      
      const data = response?.data?.data;
      yield put({ type: ActionTypes.ADD_TO_CART_SUCCESS, data });
      yield put({ type: ActionTypes.GET_CART_REQUEST });
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
      console.log("errorPayload====>>", JSON.stringify(errorPayload,null,2));
  
      yield put({ type: ActionTypes.LOGIN_REQUEST_FAILURE, error: errorPayload });
    }
  }
function* cartSaga() {
    yield takeEvery(ActionTypes.ADD_TO_CART_REQUEST, addToCartApiCall);
    yield takeEvery(ActionTypes.GET_CART_REQUEST, fetchAddressApiCall);
}

export default cartSaga;
