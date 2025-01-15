import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./middleware/rootSaga";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["loginReducers" ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
        },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;