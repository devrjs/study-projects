import { compare, hash } from "bcryptjs"
import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { sqliteConnection } from "../database/sqlite"
import { UserRepository } from "../repositories/UserRepository"
import { UserCreateService } from "../services/UserCreateService"

type UsersProps = {
  name: string
  email: string
  password: string
  old_password: string
}

export class UsersControllers {
  // =============== CREATE USER ====================
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as UsersProps

    const userRepository = new UserRepository()
    console.log(userRepository)

    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })

    return reply.status(201).send()
  }

  // =============== UPDATE USER ====================
  async update(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, old_password } = request.body as UsersProps
    const id = request.user_id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if (!user) {
      const error = Error("Usuário não encontrado.") as FastifyError
      error.statusCode = 404
      throw error
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      const error = Error("Este e-mail já esta em uso.") as FastifyError
      error.statusCode = 401
      throw error
    }

    if (password && !old_password) {
      const error = Error("Você precisa informar a senha antiga para definir a nova senha.") as FastifyError
      error.statusCode = 401
      throw error
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        const error = Error("A senha antiga não confere.") as FastifyError
        error.statusCode = 401
        throw error
      }

      user.password = await hash(password, 8)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    await database.run(
      "UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?",
      [user.name, user.email, user.password, id]
    )

    return reply.status(200).send(user)
  }
}
