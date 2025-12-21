import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../../lib/supabase'
import { baseURL } from '../../services/apiEndPoints'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refresh_token'

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
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      // ✅ FULL URL
      const fullUrl = `${config.baseURL}${config.url}`
      console.log('➡️ Method:', config.method?.toUpperCase())
      console.log('➡️ URL:', fullUrl)
      // console.log("token",accessToken)
      // console.log('➡️ Headers:', JSON.stringify(config.headers, null, 2))
      // console.log('➡️ Body:', config.data || '—')

      return config
    } catch (error) {
      console.log('❌ Error reading access token', error)
      return config
    }
  },
  error => Promise.reject(error)
)

/* ============================
   RESPONSE INTERCEPTOR
============================ */
axiosInstance.interceptors.response.use(
  response => {
    console.log('⬅️ Status:', response.status)
    console.log('⬅️ URL:',`${response.config.baseURL}${response.config.url}`)
    console.log('⬅️ Data:', JSON.stringify(response.data, null, 2))

    return response
  },
  async error => {
    const originalRequest = error.config

    console.log('❌ API ERROR')
    console.log(
      '❌ URL:',
      `${originalRequest?.baseURL}${originalRequest?.url}`
    )
    console.log('❌ Status:', error.response?.status)
    console.log(
      '❌ Response:',
      JSON.stringify(error.response?.data, null, 2)
    )

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const {
          data: { session },
          error: refreshError,
        } = await supabase.auth.refreshSession()

        if (refreshError || !session) {
          throw refreshError
        }

        await AsyncStorage.multiSet([
          [ACCESS_TOKEN_KEY, session.access_token],
          [REFRESH_TOKEN_KEY, session.refresh_token],
        ])

        originalRequest.headers.Authorization =
          `Bearer ${session.access_token}`

        console.log('🔁 Retrying request with refreshed token')

        return axiosInstance(originalRequest)
      } catch (refreshErr) {
        await AsyncStorage.multiRemove([
          ACCESS_TOKEN_KEY,
          REFRESH_TOKEN_KEY,
        ])

        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
