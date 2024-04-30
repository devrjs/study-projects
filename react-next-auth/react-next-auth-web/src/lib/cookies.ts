'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
  return cookies().set({
    name,
    value,
    path: '/',
  })
}
