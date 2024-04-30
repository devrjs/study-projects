import { PrismaUsersRepository } from '@/db/prisma/repositories/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate-user'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({ email, password })

    const access_token = await reply.jwtSign(
      {
        tokenType: 'access',
      },
      {
        sign: {
          sub: user.id,
          expiresIn: 15,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        tokenType: 'refresh',
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        expires: dayjs().add(7, 'day').toDate(),
        sameSite: true,
        httpOnly: true,
        secure: true, // true for https
      })
      .status(200)
      .send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        },
        backendTokens: {
          access_token,
          refresh_token: refreshToken,
          expiresIn: dayjs().add(15, 'seconds').toDate(),
        },
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
