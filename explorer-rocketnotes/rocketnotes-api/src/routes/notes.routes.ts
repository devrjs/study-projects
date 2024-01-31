import { FastifyInstance } from "fastify"
import { NotesController } from "../controllers/NotesController"
import { ensureAuthenticated } from "../plugins/ensureAuthenticated"

export async function notesRoutes(app: FastifyInstance) {
  const notesController = new NotesController()

  app.get("/notes", { onRequest: [ensureAuthenticated] }, notesController.index)
  app.post("/notes", { onRequest: [ensureAuthenticated] }, notesController.create)
  app.get("/notes/:id", { onRequest: [ensureAuthenticated] }, notesController.show)
  app.delete("/notes/:id", { onRequest: [ensureAuthenticated] }, notesController.delete)
}
