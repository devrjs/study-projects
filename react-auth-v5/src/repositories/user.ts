import { prismaDB } from '@/lib/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaDB.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prismaDB.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}
