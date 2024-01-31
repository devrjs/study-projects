import { IUserCreate } from "./UserRepository"

export class UserRepositoryInMemory {
  users: IUserCreate[] = []

  async create({ name, email, password }: IUserCreate) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      name,
      password,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email)
  }
}
