import { takeEvery, put, call } from 'redux-saga/effects';
import { ActionTypes } from '../constants/actiontypes';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints';

function* pagebyNameSagaApiCall(action) {

    const { pagename } = action?.payload || {};
    // console.log('Extracted pagename:', pagename);

    // if (!pagename) {
    //     console.error('Pagename is undefined!');
    //     yield put({
    //         type: ActionTypes.FETCH_PAGEBYNAME_FAILURE,
    //         error: { message: 'Pagename is required but not provided.' },
    //     });
    //     return; // Exit early if pagename is undefined
    // }

    // Constructing the full API URL
    const fullUrl = `${baseURL}${apiUri.factoyHome.pagename}${pagename}`;
    console.log('Full API URL:', fullUrl);

    try {
        // Making the API call
        const response = yield call(axios.get, fullUrl);
        // console.log('API Response:', response?.data);

        const data = response?.data;
        yield put({ type: ActionTypes.FETCH_PAGEBYNAME_SUCCESS, data:data });
     
    } catch (error) {
        const errorPayload = {
            message: error?.response?.data?.message || error.message || 'Something went wrong!',
            status: error?.response?.status || null,
            response: error?.response
              ? {
                  status: error.response.status,
                  data: error.response.data,
                  config: {
                    // method: error.response.config?.method,
                    url: error.response.config?.url,
                  },
                }
              : null,
          };
        //   console.log("errorPayload====>>", JSON.stringify(errorPayload,null,2));

        yield put({ type: ActionTypes.FETCH_PAGEBYNAME_FAILURE, error: errorPayload });
    }
}

function* pagebyNameSaga() {
    yield takeEvery(ActionTypes.FETCH_PAGEBYNAME_REQUEST, pagebyNameSagaApiCall);
}

export default pagebyNameSaga;
