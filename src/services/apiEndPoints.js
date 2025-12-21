import {API_URL} from '@env';

// const baseURL=  "https://mlmtesting.loca.lt/";
// const baseURL=  "https://aryatkart.com/api/";
const baseURL = API_URL;
const apiUri = {
    auth: {
        emaillogin:'auth/login',
        userProfile:'getProfile',
        register:'auth/sign-in',
        otplogin: 'auth/send-otp',
        verifyotp: 'auth/verify-otp',
        sessioninfo: 'auth/customer/session',
        logout:'logout',
        update_user_details:'update_user_details',
    },
    aryatkart: {
        getAllItems:'api/getItems',
        placeOrder:'api/placeOrder',
        paymentVerification:'api/payment-verification',
        orderHistory:'api/orderHistory',
        getAddress:'api/getAddress',
        addAddress:'api/addAddress',
        addCart:'api/addCart',
        getCart:'api/getCart',
        getPrice:'api/getPrice',
        pagename:'pages/',
        getcontact:'api/contact-us',

    },
};
export { apiUri, baseURL };
