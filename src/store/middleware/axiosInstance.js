import axios from 'axios';
import { baseURL } from '../../services/apiEndPoints';
import { getRefreshToken, getToken } from '../selectors/selectors';
import store from '../store';
import { reset } from '../../services/navigationService';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000, 
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = getTokenFromStore(); 

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Request failed, attempting token refresh...");

                const refreshToken = getRefreshTokenFromStore();
                if (!refreshToken) {
                    console.warn('No refresh token found, redirecting to login...');
                    reset([{ name: 'SignMobile' }]);
                    return Promise.reject(error);
                }

                const refreshTokenData = { refreshToken: refreshToken };
                const refreshUrl = `${baseURL}/refresh-token`;

                const response = await axios({
                    method: 'post',
                    url: refreshUrl,
                    data: refreshTokenData,  
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const newToken = response?.data?.data;
                console.log("New access token:", JSON.stringify(newToken, null, 2));

                if (newToken) {
                    
                    // Update the token in the store (uncomment and adjust once Redux action is ready)
                    store.dispatch({
                        type: 'UPDATE_TOKEN', 
                        data: newToken,
                    });

                    originalRequest.headers['Authorization'] = `Bearer ${newToken?.access_token}`;
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken?.access_token}`;

                    return axiosInstance(originalRequest);
                }

            } catch (refreshError) {
                const errorPayload = {
                    message: refreshError?.response?.data?.message || error.message || 'Something went wrong!',
                    status: refreshError?.response?.status || null,
                    response: refreshError?.response
                        ? {
                            status: refreshError.response.status,
                            data: refreshError.response.data,
                            config: {
                                method: refreshError.response.config?.method,
                                url: refreshError.response.config?.url,
                            },
                        }
                        : null,
                };

                console.error("Refresh token failed:", JSON.stringify(errorPayload, null, 2));
                reset([{ name: 'SignMobile' }]);
            }
        }

        return Promise.reject(error);
    }
);

const getTokenFromStore = () => {
    const state = store.getState(); 
    return getToken(state);
};
const getRefreshTokenFromStore = () => {
    const state = store.getState(); 
    return getRefreshToken(state);
};

export default axiosInstance;
