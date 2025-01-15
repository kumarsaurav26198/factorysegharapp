import { ActionTypes } from '../constants/actiontypes';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const loginReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.LOGIN_REQUEST_RESTART:
            // console.warn("LOGIN_REQUEST_RESTART Reducers", ActionTypes.LOGIN_REQUEST_RESTART);
            console.log("LOGIN_REQUEST_RESTART Reducers action===>", );
            return {
                data: [],
                loading: false,
                error: null,
            };
        case ActionTypes.LOGIN_REQUEST:
            // console.warn("LOGIN_REQUEST Reducers", ActionTypes.LOGIN_REQUEST);
            // console.log("LOGIN_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.LOGIN_REQUEST_SUCCESS:
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers", ActionTypes.LOGIN_REQUEST_SUCCESS);
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers action===>");

            // console.warn("LOGIN_REQUEST_SUCCESS Reducers action===>", JSON.stringify(action.currentUser, null, 2));
            // if (action.currentUser && action.currentUser._id) {
            //     AsyncStorage.setItem('_id', action.currentUser._id)
            //         .then(() => {
            //             console.log("Stored _id in AsyncStorage:", action.currentUser._id);
            //         })
            //         .catch((error) => {
            //             console.error("Error storing _id in AsyncStorage:", error);
            //         });
            // }
            return {
                ...state,
                data: action.currentUser,
                loading: false,
            };
        case ActionTypes.LOGIN_REQUEST_FAILURE:
            // console.warn("LOGIN_REQUEST_FAILURE Reducers", ActionTypes.LOGIN_REQUEST_FAILURE);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionTypes.LOG_OUT_REQUEST:
            console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action);
            // AsyncStorage.removeItem('_id')
            // .then(() => {
            //     console.log("Removed _id from AsyncStorage");
            // })
            // .catch((error) => {
            //     console.error("Error removing _id from AsyncStorage:", error);
            // });
            // return {
            //     ...state,
            //     data: null,
            //     loading: false,
            //     error: action.payload,
            // };

        default:
            return state;
    }
};