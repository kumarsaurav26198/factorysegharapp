import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import verifySaga from './verifySaga';
import getLoginUserSaga from './getLoginUserSaga';
import pagebyNameSaga from './pagebyNameSaga';
import contactUsSaga from './contactUsSaga';
import registerSaga from './registerSaga';
import getProductByCategorySaga from './getProductByCategorySaga';
import placeOrderSaga from './placeOrderSaga';
import getOrderHistorySaga from './getOrderHistorySaga';
import addressSaga from './addressSaga';

function* rootSaga() {
    yield all([
        loginSaga(),
        registerSaga(),
        verifySaga(),
        getLoginUserSaga(),
        pagebyNameSaga(),
        contactUsSaga(),
        getProductByCategorySaga(),
        placeOrderSaga(),
        getOrderHistorySaga(),
        addressSaga(),
    ]);
}
export default rootSaga;
