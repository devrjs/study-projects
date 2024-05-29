import { prismaDB } from '@/lib/prisma'

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prismaDB.verificationToken.findUnique({
      where: { token },
    })

    return verificationToken
  } catch {
    return null
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await prismaDB.verificationToken.findFirst({
      where: { email },
    })

    return verificationToken
  } catch {
    return null
  }
}
