import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prismaDB } from './prisma'
import { getUserById } from '@/repositories/user'
import { getTwoFactorConfirmationByUserId } from '@/repositories/two-factor-confirmation'
import { getAccountByUserId } from '@/repositories/account'

export const {
  signIn,
  signOut,
  auth,
  handlers,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prismaDB),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prismaDB.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },

    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      if (!user.id) {
        return false
      }

      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        )

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await prismaDB.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email ?? ''
        session.user.isOAuth = token.isOAuth
      }

      return session
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
