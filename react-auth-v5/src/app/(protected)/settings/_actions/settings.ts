'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { SettingsSchema } from '@/schemas'
import { generateVerificationToken } from '@/lib/tokens'
import { currentUser } from '@/lib/currentUser'
import { getUserByEmail, getUserById } from '@/repositories/user'
import { sendVerificationEmail } from '@/lib/resend'
import { prismaDB } from '@/lib/prisma'
import { update } from '@/lib/auth'

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser()

  if (!user || !user.id) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    )

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  const updatedUser = await prismaDB.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  })

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  })

  return { success: 'Settings Updated!' }
}
