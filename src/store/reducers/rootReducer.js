import {combineReducers} from 'redux'
import { loginReducers } from './loginReducers';
import { verifyReducers } from './verifyReducers';
import { userReducers } from './userReducers';
import { pagebyNameReducers } from './pagebyNameReducers';
import { contactUsReducer } from './contactUsReducer';
import { registerReducers } from './registerReducers';

import { cartReducers } from './cartReducers';
import { placeOderReducers } from './placeOderReducers';
import { orderHistoryReducers } from './orderReducers';
import { addressReducers } from './addressReducers';
import { getProductCategoryReducer } from './getProductCategoryReducer';
import { getPriceReducers } from './getPriceReducers';

export default combineReducers({
    loginReducers:loginReducers,
    registerReducers:registerReducers,
    verifyReducers:verifyReducers,
    userReducers:userReducers,
    getProductCategoryReducer:getProductCategoryReducer,
    pagebyNameReducers:pagebyNameReducers,
    contactUsReducer:contactUsReducer,
    cartReducers:cartReducers,
    placeOderReducers:placeOderReducers,
    orderHistoryReducers:orderHistoryReducers,
    addressReducers:addressReducers,
    getPriceReducers:getPriceReducers
})