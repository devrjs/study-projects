import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/accounts', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  // authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
