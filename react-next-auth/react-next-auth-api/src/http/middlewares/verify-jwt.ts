import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await request.jwtVerify<{ tokenType: string }>()

    if (decoded.tokenType !== 'access') {
      throw new Error()
    }
  } catch (error) {
    return reply
      .status(401)
      .send({ message: 'Unauthorized.', code: 'token.expired' })
  }
}
