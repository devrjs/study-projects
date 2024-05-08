'use client'

import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const useAxiosAuth = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (request) => {
        if (!request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${session?.backendTokens.access_token}`
        }
        return request
      },
      (error) => Promise.reject(error),
    )

    return () => {
      api.interceptors.request.eject(requestIntercept)
    }
  }, [session])

  return api
}

export default useAxiosAuth
