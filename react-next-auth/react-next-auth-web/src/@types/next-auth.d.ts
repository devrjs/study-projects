import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified: Date
    }

    backendTokens: {
      access_token: string
      refresh_token: string
      expiresIn: number
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      name: string
      email: string
      emailVerified: Date
    }

    backendTokens: {
      access_token: string
      refresh_token: string
      expiresIn: number
    }
  }
}
