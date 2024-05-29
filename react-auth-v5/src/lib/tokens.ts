import { getVerificationTokenByEmail } from '@/repositories/verificiation-token'
import { randomUUID } from 'node:crypto'
import { prismaDB } from './prisma'

export const generateVerificationToken = async (email: string) => {
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
