import { prismaDB } from '@/lib/prisma'

export async function getTwoFactorTokenByToken(token: string) {
  try {
    const twoFactorToken = await prismaDB.twoFactorToken.findUnique({
      where: { token },
    })

    return twoFactorToken
  } catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prismaDB.twoFactorToken.findFirst({
      where: { email },
    })

    return twoFactorToken
  } catch {
    return null
  }
}
