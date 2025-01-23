import {takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import {ActionTypes} from '../constants/actiontypes';
import {navigate} from '../../services/navigationService';
import {apiUri, baseURL} from '../../services/apiEndPoints';
import Images from '../../utils/Images';

function* placeOrderApi(action) {
  const {payload} = action;
  try {
    // console.log('placeOrderApi: Sending place order request with payload:', JSON.stringify(payload, null, 2));

    const fullUrl = `${baseURL}${apiUri.factoyHome.placeOrder}`;
    const response = yield axios.post(fullUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const placeOrderApires = response?.data;
    // console.log(
    //   'placeOrderApires (Order Created):',
    //   JSON.stringify(placeOrderApires, null, 2),
    // );

    // Proceed to Razorpay Checkout with the response
    yield call(handleRazorpayCheckout, placeOrderApires);
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
    console.log(
      'placeOrderApi: Error in place order API:',
      JSON.stringify(errorPayload, null, 2),
    );

    yield put({type: ActionTypes.PLACE_ORDER_FAILURE, error: errorPayload});
  }
}

function* handleRazorpayCheckout(orderDetails) {
  try {
    // console.log(
    //   'handleRazorpayCheckout: Initializing Razorpay Checkout with order details:',
    //   JSON.stringify(orderDetails, null, 2),
    // );

    const options = {
      description: 'Credits towards consultation',
      image: Images.banner,
      currency: 'INR',
      key: 'rzp_test_xC0HuBfFYisteo', // Replace with your Razorpay API Key
      amount: orderDetails.amount, // Amount in paise (e.g., 1000 for ₹10)
      name: 'Factory Se Ghar',
      order_id: orderDetails.razorpayOrderId, // Razorpay Order ID from placeOrder API
      prefill: {
        email: 'user@example.com', // Replace with actual user data
        contact: '916202142166', // Replace with actual user data
        name: 'Saurav KUmar', // Replace with actual user data
      },
      theme: {color: 'red'},
    };

    // console.log(
    //   'handleRazorpayCheckout: Calling RazorpayCheckout.open with options:',
    //   JSON.stringify(options, null, 2),
    // );

    // Open Razorpay Checkout
    const data = yield RazorpayCheckout.open(options);

    console.log(
      'handleRazorpayCheckout: Payment Success:',
      JSON.stringify(data, null, 2),
    );

    // Verify Payment with received data
    yield call(verifyPaymentApi, {
      razorpayPaymentId: data.razorpay_payment_id,
      razorpayOrderId: orderDetails.razorpayOrderId,
      orderId: orderDetails.orderId,
    });

    // Navigate to success screen
    yield put({type: ActionTypes.PLACE_ORDER_SUCCESS, data});
    console.log(
      'handleRazorpayCheckout: Payment verified and order placed. Navigating to BottomNavigator',
    );
    navigate('BottomNavigator');
  } catch (error) {
    // Enhance error logging
    if (error && error.message) {
      console.log(
        'handleRazorpayCheckout: Payment Error Message:',
        error.message,
      );
    }
    if (error && error.response) {
      console.log(
        'handleRazorpayCheckout: Razorpay Error Response:',
        JSON.stringify(error.response, null, 2),
      );
    }
    if (error && error.code) {
      console.log('handleRazorpayCheckout: Razorpay Error Code:', error.code);
    }
    if (error && error.data) {
      console.log(
        'handleRazorpayCheckout: Razorpay Error Data:',
        JSON.stringify(error.data, null, 2),
      );
    }

    // Provide a fallback error message if no detailed error is available
    console.log(
      'handleRazorpayCheckout: Payment Error:',
      JSON.stringify(error, null, 2),
    );

    yield put({
      type: ActionTypes.PLACE_ORDER_FAILURE,
      error: {message: 'Payment Failed', ...error},
    });
  }
}

function* verifyPaymentApi(paymentData) {
  try {
    console.log(
      'verifyPaymentApi: Sending payment verification request with data:',
      JSON.stringify(paymentData, null, 2),
    );

    const fullUrl = `${baseURL}${apiUri.factoyHome.paymentVerification}`;
    const response = yield axios.post(fullUrl, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(
      'verifyPaymentApi: Payment Verification Success:',
      JSON.stringify(response.data, null, 2),
    );
    yield put({
      type: ActionTypes.PAYMENT_VERIFICATION_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    console.log(
      'verifyPaymentApi: Payment Verification Failed:',
      JSON.stringify(error, null, 2),
    );
    // yield put({type: ActionTypes.PAYMENT_VERIFICATION_FAILURE, error});
  }
}

function* placeOrderSaga() {
  console.log('placeOrderSaga: Watching for PLACE_ORDER_REQUEST action...');
  yield takeEvery(ActionTypes.PLACE_ORDER_REQUEST, placeOrderApi);
}

export default placeOrderSaga;
