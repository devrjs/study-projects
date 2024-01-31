import { sqliteConnection } from "../database/sqlite"

export interface IUserCreate {
  name: string
  email: string
  password: string
}

export class UserRepository {
  async findByEmail(email: string) {
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    return user
  }

  async create({ name, email, password }: IUserCreate) {
    const database = await sqliteConnection()

    const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ])

    return { id: userId }
  }
}
