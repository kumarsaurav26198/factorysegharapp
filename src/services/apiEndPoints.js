import {API_URL} from '@env';

const baseURL = API_URL
const apiUri = {
    auth: {
        //MVP
        emaillogin:"auth/login",
        userProfile:"auth/userProfile",
        
        
        register:"auth/sign-in",
        otplogin: 'auth/send-otp',
        verifyotp: 'auth/verify-otp',
        sessioninfo: 'session_info', 
        logout:"logout",
        update_user_details:"update_user_details",
    },
    jantaDrive: {
        pagename:"/pages?pagename=",
        contact:"/contact"
    },
    factoyHome: {
        getAllItems:"api/getAllItems",
        placeOrder:"api/placeOrder",
        orderHistory:"api/orderHistory",
        getAddress:"api/getAddress",
    },
  
};
export { apiUri, baseURL }