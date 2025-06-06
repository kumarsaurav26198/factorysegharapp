import { takeEvery, put } from 'redux-saga/effects';
import { ActionTypes } from '../constants/actiontypes';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints';


function* fetchLoginUserApiCall(action) {
    try {
        const { payload } = action; // Extract payload from action
        // console.log("Payload received:", payload);

        const fullUrl = `${baseURL}${apiUri.auth.userProfile}`;
        // console.log("Full URL for login request: ", fullUrl);

        // Send payload as a JSON object in the POST request
        const response = yield axios.post(fullUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Extract and log the response
        const data = response?.data?.data;
        // console.log("Response received:", JSON.stringify(data, null, 2));

        // Dispatch success action
        yield put({ type: ActionTypes.FETCH_LOGIN_USER_SUCCESS, data });
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
        yield put({ type: ActionTypes.FETCH_LOGIN_USER_FAILURE, error: errorPayload });
    }
}


function* updateLoginUserApiCall(action) {
    const {driverName, password, email, driverProfilePicUrl, accountNumber,
        accountHolderName, bankName, ifscCode, checkbookPicUrl, carModelName,
        registrationNumber, carRcPicUrl, insurancePicUrl, pollutionPicUrl,
        fitnessPicUrl, address, gender
    } = action?.payload;

    const formData = new FormData();

    const appendField = (key, value) => {
        if (value) formData.append(key, value);
    };
    // Add fields conditionally
    appendField('driverName', driverName);
    appendField('email', email);
    appendField('password', password);
    appendField('address', address);
    appendField('gender', gender);
    appendField('accountNumber', accountNumber);
    appendField('accountHolderName', accountHolderName);
    appendField('bankName', bankName);
    appendField('ifscCode', ifscCode);
    appendField('carModelName', carModelName);
    appendField('registrationNumber', registrationNumber);
    // Helper to append image files conditionally
    const appendImage = (key, uri) => {
        if (uri) {
            formData.append(key, {
                uri,
                type: 'image/jpeg',
                name: `${key}.jpeg`,
            });
        }
    };

    // Append images conditionally
    appendImage('profilePicUrl', driverProfilePicUrl);
    appendImage('checkbookPicUrl', checkbookPicUrl);
    appendImage('carRcPicUrl', carRcPicUrl);
    appendImage('insurancePicUrl', insurancePicUrl);
    appendImage('pollutionPicUrl', pollutionPicUrl);
    appendImage('fitnessPicUrl', fitnessPicUrl);

    // Log the FormData to see what's being sent
    console.log('FormData being sent:', formData);

    try {
        console.log('Sending Request...');
        const response = yield axiosInstance.put('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response?.data?.data[0];
        console.log('Response received:', JSON.stringify(data, null, 2));
        yield put({ type: ActionTypes.UPDATE_LOGIN_USER_SUCCESS, data });
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
        // console.log('Error Payload:', JSON.stringify(errorPayload, null, 2));
        yield put({ type: ActionTypes.UPDATE_LOGIN_USER_FAILURE, error: errorPayload });
    }
}



function* getLoginUserSaga() {
    yield takeEvery(ActionTypes.FETCH_LOGIN_USER_REQUEST, fetchLoginUserApiCall);
    yield takeEvery(ActionTypes.UPDATE_LOGIN_USER_REQUEST, updateLoginUserApiCall);
}

export default getLoginUserSaga;
