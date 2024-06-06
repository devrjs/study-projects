import { getVerificationTokenByEmail } from '@/repositories/verificiation-token'
import { randomInt, randomUUID } from 'node:crypto'
import { prismaDB } from './prisma'
import { getPasswordResetTokenByEmail } from '@/repositories/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/repositories/two-factor-token'

export async function generateVerificationToken(email: string) {
  const token = randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prismaDB.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await prismaDB.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await prismaDB.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await prismaDB.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await prismaDB.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const twoFactorToken = await prismaDB.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}
