import { FastifyInstance } from "fastify"
import { TagsController } from "../controllers/TagsController"
import { ensureAuthenticated } from "../plugins/ensureAuthenticated"

export async function tagsRoutes(app: FastifyInstance) {
  const tagsController = new TagsController()

  app.get("/tags", { onRequest: [ensureAuthenticated] }, tagsController.index)
}
