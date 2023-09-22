import axios, { AxiosError, AxiosResponse } from "axios"
import { parseCookies, setCookie } from "nookies"
import { signOut } from "../context/AuthContext"
import { AuthTokenError } from "./errors/AuthTokenError"

interface ErrorProps extends AxiosError {
  response: AxiosResponse
}

let isRefreshing = false
let faliedRequestsQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: ErrorProps) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx)

          const { "nextauth.refreshToken": refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post("/refresh", {
                refreshToken,
              })
              .then(response => {
                const { token } = response.data

                setCookie(ctx, "nextauth.token", token, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                })
                setCookie(ctx, "nextauth.refreshToken", response.data.refreshToken, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                })

                api.defaults.headers["Authorization"] = `Bearer ${token}`

                faliedRequestsQueue.forEach(request => request.onSuccess(token))
                faliedRequestsQueue = []
              })
              .catch(err => {
                faliedRequestsQueue.forEach(request => request.onFailure(err))
                faliedRequestsQueue = []

                if (!(typeof window === "undefined")) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            faliedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (!(typeof window === "undefined")) {
            signOut()
          } else {
            return Promise.reject()
          }
        }
      }

      return Promise.reject(new AuthTokenError())
    }
  )

  return api
}
