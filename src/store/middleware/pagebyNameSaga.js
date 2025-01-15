import { takeEvery, put, call } from 'redux-saga/effects';
import { ActionTypes } from '../constants/actiontypes';
// import axiosInstance from './axiosInstance';
import { apiUri } from '../../services/apiEndPoints';
import axios from 'axios';

function* pagebyNameSagaApiCall(action) {
    const { pagename } = action?.payload;

    const fullUrl = `${apiUri.jantaDrive.pagename}${pagename}`;
    console.log('Full API URL:', fullUrl);

    try {
        const response = yield call(axios.get, fullUrl);
        const data = response?.data?.data;
        yield put({ type: ActionTypes.FETCH_PAGEBYNAME_SUCCESS, data });
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
        yield put({ type: ActionTypes.FETCH_PAGEBYNAME_FAILURE, error: errorPayload });
    }
}

function* pagebyNameSaga() {
    yield takeEvery(ActionTypes.FETCH_PAGEBYNAME_REQUEST, pagebyNameSagaApiCall);
}

export default pagebyNameSaga;
