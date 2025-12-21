import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActionTypes} from '../constants/actiontypes';
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const verifyReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.VERIFY_REQUEST:
      // console.warn("VERIFY_REQUEST Reducers", ActionTypes.VERIFY_REQUEST);
      // console.log("VERIFY_REQUEST Reducers action===>", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.VERIFY_REQUEST_SUCCESS:
      console.warn("VERIFY_REQUEST_SUCCESS Reducers", ActionTypes.VERIFY_REQUEST_SUCCESS);
      // console.warn("VERIFY_REQUEST_SUCCESS Reducers action===>",JSON.stringify( action?.data?.loginUserData?.user,null,2));
      const loginUserData =  action?.data?.loginUserData?.user; 
      const accessToken = action?.data?.accessToken; 
      const refresh_token = action?.data?.refresh_token; 
      if (accessToken) {
        AsyncStorage.setItem('accessToken', String(accessToken))
          .then(() => {
            console.log('Stored accessToken in AsyncStorage:', accessToken);
          })
          .catch(error => {
            console.error('Error storing accessToken in AsyncStorage:', error);
          });
      }
      if (refresh_token) {
        AsyncStorage.setItem('refresh_token', String(refresh_token))
          .then(() => {
            console.log('Stored refresh_token in AsyncStorage:', refresh_token);
          })
          .catch(error => {
            console.error('Error storing refresh_token in AsyncStorage:', error);
          });
      }
      return {
        ...state,
        data: loginUserData, // Update the Redux state with the mobile number
        loading: false,
      };
    case ActionTypes.VERIFY_REQUEST_FAILURE:
      // console.warn("VERIFY_REQUEST_FAILURE Reducers", ActionTypes.VERIFY_REQUEST_FAILURE);
      // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionTypes.RESTART_LOGIN_REQUEST:
      // console.warn("VERIFY_REQUEST_FAILURE Reducers", ActionTypes.VERIFY_REQUEST_FAILURE);
      // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action.error);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ActionTypes.UPDATE_TOKEN:
      // console.warn("UPDATE_TOKEN Reducers", ActionTypes.UPDATE_TOKEN);
      // console.log("UPDATE_TOKEN Reducers action===>", action);
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ActionTypes.LOG_OUT_REQUEST:
      // console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
      console.log('LOGIN_REQUEST_FAILURE Reducers action===>', action);
      AsyncStorage.removeItem('accessToken')
        .then(() => {
          console.log('Removed accessToken from AsyncStorage');
        })
        .catch(error => {
          console.error('Error removing accessToken from AsyncStorage:', error);
        });
      AsyncStorage.removeItem('refresh_token')
        .then(() => {
          console.log('Removed refresh_token from AsyncStorage');
        })
        .catch(error => {
          console.error('Error removing refresh_token from AsyncStorage:', error);
        });

      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
