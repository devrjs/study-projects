import { compare } from "bcryptjs"
import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { knexConnection } from "../database/knex"

export class SessionsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string }

    const user = await knexConnection("users").where({ email }).first()

    if (!user) {
      const error = Error("E-mail e/ou senha incorreta.") as FastifyError
      error.statusCode = 401
      throw error
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      const error = Error("E-mail e/ou senha incorreta.") as FastifyError
      error.statusCode = 401
      throw error
    }

    const token = await reply.jwtSign({ sub: user.id }, { expiresIn: "1d" })

    return reply.send({ user, token })
  }
}
