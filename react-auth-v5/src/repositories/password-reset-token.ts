import { prismaDB } from '@/lib/prisma'

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = await prismaDB.passwordResetToken.findUnique({
      where: { token },
    })

    return passwordResetToken
  } catch {
    return null
  }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordResetToken = await prismaDB.passwordResetToken.findFirst({
      where: { email },
    })

    return passwordResetToken
  } catch {
    return null
  }
}
