import { prismaDB } from '@/lib/prisma'

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    const twoFactorConfirmation =
      await prismaDB.twoFactorConfirmation.findUnique({
        where: { userId },
      })

    return twoFactorConfirmation
  } catch {
    return null
  }
}
