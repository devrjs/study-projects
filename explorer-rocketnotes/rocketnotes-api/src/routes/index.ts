import { FastifyInstance } from "fastify"
import { notesRoutes } from "./notes.routes"
import { sessionsRoutes } from "./sessions.routes"
import { tagsRoutes } from "./tags.routes"
import { usersRoutes } from "./users.routes"

export async function routes(app: FastifyInstance) {
  app.register(sessionsRoutes)
  app.register(usersRoutes)
  app.register(notesRoutes)
  app.register(tagsRoutes)
}
