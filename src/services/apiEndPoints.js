import {API_URL} from '@env';

const baseURL = API_URL;
const apiUri = {
    auth: {
        emaillogin:'auth/login',
        userProfile:'api/getProfile',
        register:'auth/sign-in',
        otplogin: 'auth/send-otp',
        verifyotp: 'auth/verify-otp',
        sessioninfo: 'session_info',
        logout:'logout',
        update_user_details:'update_user_details',
    },
    factoyHome: {
        getAllItems:'api/getItems',
        placeOrder:'api/placeOrder',
        orderHistory:'api/orderHistory',
        getAddress:'api/getAddress',
        addCart:'api/addCart',
        pagename:'/pages?pagename=',
        contact:'/contact',

    },
};
export { apiUri, baseURL };
