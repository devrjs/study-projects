import { MultipartFile } from "@fastify/multipart"
import { randomUUID } from "crypto"
import { FastifyError } from "fastify"
import { createWriteStream } from "node:fs"
import { stat, unlink } from "node:fs/promises"
import { resolve } from "node:path"
import { pipeline } from "stream"
import { promisify } from "util"

const pump = promisify(pipeline)

export class DiskStorage {
  async saveFile(file: MultipartFile, folderLocation: string) {
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFileFormat) {
      const error = Error("Formato de arquivo inválido.") as FastifyError
      error.statusCode = 400
      throw error
    }

    const fileName = `${randomUUID()}.png`
    const uploadDestination = resolve(folderLocation, fileName)

    await pump(file.file, createWriteStream(uploadDestination))

    return fileName
  }

  async deleteFile(file: string, folderLocation: string) {
    const filePath = resolve(folderLocation, file)

    try {
      await stat(filePath)
    } catch {
      return
    }

    await unlink(filePath)
  }
}
