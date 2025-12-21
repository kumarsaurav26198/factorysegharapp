import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../../lib/supabase'
import { ActionTypes } from '../constants/actiontypes'
import store from '../store'
import { baseURL } from '../../services/apiEndPoints'

const axiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ============================
   REQUEST INTERCEPTOR
============================ */
axiosInstance.interceptors.request.use(
  async config => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken")

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    } catch (e) {
      console.log('❌ Error reading access token', e)
      return config
    }
  },
  error => Promise.reject(error)
)

/* ============================
   RESPONSE INTERCEPTOR
============================ */
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        // 🔁 Refresh session (Supabase uses refresh_token internally)
        const {
          data: { session },
          error: refreshError,
        } = await supabase.auth.refreshSession()

        if (refreshError || !session) {
          throw refreshError
        }

        // 💾 Save new tokens
        await AsyncStorage.multiSet([
          [
            STORAGE_KEYS.ACCESS_TOKEN,
            session.access_token,
          ],
          [
            STORAGE_KEYS.REFRESH_TOKEN,
            session.refresh_token,
          ],
        ])

        // // (optional) Update redux state
        // store.dispatch({
        //   type: ActionTypes.TOKEN_REFRESH_SUCCESS,
        //   payload: {
        //     accessToken: session.access_token,
        //     refreshToken: session.refresh_token,
        //   },
        // })

        // 🔁 Retry original request
        originalRequest.headers.Authorization = `Bearer ${session.access_token}`
        return axiosInstance(originalRequest)
      } catch (refreshErr) {
        // 🚪 Logout + clear storage
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.ACCESS_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
        ])

        // store.dispatch({ type: ActionTypes.LOGOUT })
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
