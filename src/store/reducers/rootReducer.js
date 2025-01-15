import {combineReducers} from 'redux'
import { loginReducers } from './loginReducers';
import { verifyReducers } from './verifyReducers';
import { userReducers } from './userReducers';
import { pagebyNameReducers } from './pagebyNameReducers';
import { contactUsReducer } from './contactUsReducer';
import { registerReducers } from './registerReducers';
import { getAllProductReducer } from './getAllProductReducer';
import { cartReducers } from './cartReducers';
import { placeOderReducers } from './placeOderReducers';
import { orderHistoryReducers } from './orderReducers';
import { addressReducers } from './addressReducers';

export default combineReducers({
    loginReducers:loginReducers,
    registerReducers:registerReducers,
    verifyReducers:verifyReducers,
    userReducers:userReducers,
    pagebyNameReducers:pagebyNameReducers,
    contactUsReducer:contactUsReducer,
    getAllProductReducer:getAllProductReducer,
    cartReducers:cartReducers,
    placeOderReducers:placeOderReducers,
    orderHistoryReducers:orderHistoryReducers,
    addressReducers:addressReducers
})