'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Authenticate() {
  const router = useRouter()

  const accessToken = Cookies.get('accessToken')

  signIn('credentials', {
    accessToken,
    redirect: false,
  }).then((res) => {
    if (res) {
      router.push('/dashboard')
    }
  })

  return <span>Carregando...</span>
}
