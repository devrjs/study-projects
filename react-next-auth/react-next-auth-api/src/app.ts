import fastify from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(cors, {
  origin: env.CLIENT_URL,
  credentials: true,
})

app.register(fastifyJwt, {
  secret: {
    private: Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
    public: Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    algorithm: 'RS256',
    expiresIn: '10m',
  },
  verify: {
    algorithms: ['RS256'],
  },
})
app.register(fastifyCookie)

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // should log to an external
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
