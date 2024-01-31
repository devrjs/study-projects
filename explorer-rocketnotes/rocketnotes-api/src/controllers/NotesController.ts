import { FastifyReply, FastifyRequest } from "fastify"
import { knexConnection } from "../database/knex"

interface NotesProps {
  title: string
  description: string
  tags: Array<string>
  links: Array<string>
}

export class NotesController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, tags, links } = request.body as NotesProps
    const user_id = request.user_id

    const [note_id] = await knexConnection("notes").insert({
      title: title,
      description: description,
      user_id: user_id,
    })

    const linksInsert = links.map((link: string) => {
      return {
        note_id: note_id,
        url: link,
      }
    })

    await knexConnection("links").insert(linksInsert)

    const tagsInsert = tags.map((name: string) => {
      return {
        note_id: note_id,
        name: name,
        user_id: user_id,
      }
    })

    await knexConnection("tags").insert(tagsInsert)

    return reply.send()
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const note = await knexConnection("notes").where({ id }).first()
    const tags = await knexConnection("tags").where({ note_id: id }).orderBy("name")
    const links = await knexConnection("links").where({ note_id: id }).orderBy("created_at")

    return reply.send({
      ...note,
      tags,
      links,
    })
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    await knexConnection("notes").where({ id }).delete()

    return reply.send()
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const { title, tags } = request.query as { title: string; tags: string }
    const user_id = request.user_id
    let notes

    if (tags) {
      const filterTags = tags.split(",").map(tag => tag.trim())

      notes = await knexConnection("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title")
    } else {
      notes = await knexConnection("notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title")
    }

    const userTags = await knexConnection("tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return reply.send(notesWithTags)
  }
}
