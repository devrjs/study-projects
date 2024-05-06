import { PrismaUsersRepository } from '@/db/prisma/repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await request.jwtVerify<{ tokenType: string }>({
      onlyCookie: true,
    })

    if (decoded.tokenType !== 'refresh') {
      throw new Error()
    }

    const usersRepository = new PrismaUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    })

    const access_token = await reply.jwtSign(
      {
        tokenType: 'access',
        name: user.name,
        email: user.email,
        image: user.image,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: 15,
        },
      },
    )

    return reply.status(200).send({
      access_token,
    })
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
