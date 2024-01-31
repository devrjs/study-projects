import { FastifyInstance } from "fastify"
import { SessionsController } from "../controllers/SessionsController"

export async function sessionsRoutes(app: FastifyInstance) {
  const sessionsController = new SessionsController()

  app.post("/sessions", sessionsController.create)
}
