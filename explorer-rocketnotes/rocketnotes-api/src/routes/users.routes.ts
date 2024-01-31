import { FastifyInstance } from "fastify"
import { UsersAvatarController } from "../controllers/UsersAvatarController"
import { UsersControllers } from "../controllers/UsersControllers"
import { ensureAuthenticated } from "../plugins/ensureAuthenticated"

export async function usersRoutes(app: FastifyInstance) {
  const usersController = new UsersControllers()
  const usersAvatarController = new UsersAvatarController()

  app.post("/users", usersController.create)
  app.put("/users", { onRequest: [ensureAuthenticated] }, usersController.update)
  app.patch("/users/avatar", { onRequest: [ensureAuthenticated] }, usersAvatarController.update)
}
