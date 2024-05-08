import axios from 'axios'
import { auth } from './auth'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
})

api.interceptors.request.use(
  async (request) => {
    let token

    if (typeof window === 'undefined') {
      // server side
      const session = await auth()
      token = session?.backendTokens.access_token
    } else {
      // client side
      const { default: clientCookies } = await import('js-cookie')
      token = clientCookies.get('accessToken')
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  },
  (error) => Promise.reject(error),
)
