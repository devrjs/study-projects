import nextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'
import { z } from 'zod'
import dayjs from 'dayjs'

interface AccessToken {
  tokenType: string
  name: string
  email: string
  image: string
  refresh_token: string
  sub: string
  iat: number
  exp: number
}
const signInSchema = z.object({
  accessToken: z.string(),
})

export const { handlers, auth } = nextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        accessToken: {},
      },

      async authorize(credentials) {
        const { accessToken } = await signInSchema.parseAsync(credentials)

        const data = jwtDecode<AccessToken>(accessToken)

        if (!data) {
          return null
        }

        const user = {
          id: data.sub,
          user: {
            id: data.sub,
            name: data.name,
            email: data.email,
            image: data.image,
          },
          backendTokens: {
            access_token: accessToken,
            refresh_token: data.refresh_token,
            expiresIn: new Date(data.exp * 1000),
          },
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }

      if (dayjs().isBefore(token.backendTokens.expiresIn)) return token

      return await refreshToken(token)
    },

    async session({ token, session }) {
      session.user = token.user
      session.backendTokens = token.backendTokens

      return session
    },
  },
})

// ================= REFRESH_TOKEN =================
async function refreshToken(token: JWT): Promise<JWT> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/token/refresh`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${token.backendTokens.refresh_token}`,
      },
      body: JSON.stringify({}),
    },
  )

  const newToken = await response.json()

  const { cookies: serverCookies } = await import('next/headers')
  serverCookies().set('accessToken', newToken.access_token)

  const data = jwtDecode<AccessToken>(newToken.access_token)

  return {
    ...token,
    user: {
      ...token.user,
      name: data.name,
      email: data.email,
      image: data.image,
    },
    backendTokens: {
      ...token.backendTokens,
      access_token: newToken.access_token,
      expiresIn: new Date(data.exp * 1000),
    },
  }
}
