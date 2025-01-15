// selectors.js
export const getToken = (state) => state?.verifyReducers.data?.data?.access_token;
export const getRefreshToken = (state) => state?.verifyReducers.data?.data?.refresh_token;
