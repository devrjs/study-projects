import type { Knex } from "knex"

exports.up = async (knex: Knex) =>
  knex.schema.createTable("tags", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users")
  })

exports.down = async (knex: Knex) => knex.schema.dropTable("tags")

