import { prismaDB } from '@/lib/prisma'

export async function getAccountByUserId(userId: string) {
  try {
    const account = await prismaDB.account.findFirst({
      where: { userId },
    })

    return account
  } catch {
    return null
  }
}
