import 'next-auth'
import 'next-auth/jwt'
import { type DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}
