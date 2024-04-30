import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

export function makeUser(override: Partial<User> = {}) {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  }

  return user
}
