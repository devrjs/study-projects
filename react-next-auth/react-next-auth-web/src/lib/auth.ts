import nextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { setCookie } from './cookies'

export const { handlers, auth } = nextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await fetch(`${process.env.BACKEND_URL}/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        const user = await response.json()

        setCookie('accessToken', user.backendTokens.access_token)

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }

      if (new Date().getTime() < token.backendTokens.expiresIn) return token

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
  const response = await fetch(`${process.env.BACKEND_URL}/token/refresh`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${token.backendTokens.refresh_token}`,
    },
    body: JSON.stringify({}),
  })

  const newToken = await response.json()

  setCookie('accessToken', newToken.access_token)

  return {
    ...token,
    backendTokens: {
      access_token: newToken.access_token,
      refresh_token: token.backendTokens.refresh_token,
      expiresIn: newToken.expiresIn,
    },
  }
}
