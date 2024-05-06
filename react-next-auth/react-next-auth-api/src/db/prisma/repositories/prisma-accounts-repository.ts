import { prisma } from '@/lib/prisma'
import { AccountsRepository } from '@/repositories/accounts-repository'
import { Prisma } from '@prisma/client'

export class PrismaAccountsRepository implements AccountsRepository {
  async findByProviderAccountId(provider: string, providerAccountId: string) {
    const account = await prisma.account.findFirst({
      where: {
        provider,
        providerAccountId,
      },
    })

    return account
  }

  async linkAccount(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data,
    })

    return account
  }
}
