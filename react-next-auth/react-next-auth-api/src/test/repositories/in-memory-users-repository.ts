import { UsersRepository } from '@/repositories/users-repository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID().toString(),
      name: data.name ?? null,
      email: data.email,
      password: data.password ?? null,
      emailVerified:
        data.emailVerified instanceof Date ? data.emailVerified : null,
      image: data.image ?? null,
      createdAt: new Date(),
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt : null,
    }

    this.items.push(user)

    return user
  }
}
