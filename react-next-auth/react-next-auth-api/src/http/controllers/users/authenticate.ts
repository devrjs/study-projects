import { PrismaAccountsRepository } from '@/db/prisma/repositories/prisma-accounts-repository'
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
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    provider: z.enum(['credentials', 'google', 'github']),
    code: z.string().optional(),
  })

  const { email, password, provider, code } = authenticateBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const accountsRepository = new PrismaAccountsRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(
      usersRepository,
      accountsRepository,
    )

    const { user } = await authenticateUseCase.execute({
      email,
      password,
      provider,
      code,
    })

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

    const access_token = await reply.jwtSign(
      {
        tokenType: 'access',
        name: user.name,
        email: user.email,
        image: user.image,
        refresh_token: refreshToken,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: 15,
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
        access_token,
        refreshToken,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
