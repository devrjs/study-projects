import { FastifyReply, FastifyRequest } from "fastify"

export async function ensureAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = await request.jwtVerify<{ sub: string }>()
  // console.log(sub)

  request.user_id = sub
}
