import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { pipeline } from "node:stream"
import { promisify } from "node:util"
import { AVATARS_FOLDER } from "../config/upload"
import { knexConnection } from "../database/knex"
import { DiskStorage } from "../providers/DiskStorage"

const pump = promisify(pipeline)

export class UsersAvatarController {
  async update(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.user_id
    const avatarUpload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!avatarUpload) {
      const error = Error("Avatar não informado.") as FastifyError
      error.statusCode = 400
      throw error
    }

    const user = await knexConnection("users").where({ id: user_id }).first()

    if (!user) {
      const error = Error("Somente usários autenticados podem mudar o avatar.") as FastifyError
      error.statusCode = 401
      throw error
    }

    const diskStorage = new DiskStorage()

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar, AVATARS_FOLDER)
    }

    const fileName = await diskStorage.saveFile(avatarUpload, AVATARS_FOLDER)

    user.avatar = fileName
    await knexConnection("users").update(user).where({ id: user_id })

    return reply.send(user)
  }
}
