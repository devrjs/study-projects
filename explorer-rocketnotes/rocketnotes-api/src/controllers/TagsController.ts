import { FastifyReply, FastifyRequest } from "fastify"
import { knexConnection } from "../database/knex"

export class TagsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.user_id

    const tags = await knexConnection("tags").where({ user_id }).groupBy("name")

    return reply.send(tags)
  }
}
