import axios from 'axios'
import { auth } from './auth'
import { getCookie } from 'cookies-next'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

apiClient.interceptors.request.use(async (request) => {
  request.headers.Authorization = `Bearer ${getCookie('accessToken')}`

  return request
})

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

api.interceptors.request.use(async (request) => {
  const session = await auth()

  if (session) {
    request.headers.Authorization = `Bearer ${session?.backendTokens.access_token}`
  }

  return request
})
