import { Account, Prisma } from '@prisma/client'

export interface AccountsRepository {
  findByProviderAccountId(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null>
  linkAccount(data: Prisma.AccountCreateInput): Promise<Account>
}
