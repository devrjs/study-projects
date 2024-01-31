import type { Knex } from "knex"

exports.up = async (knex: Knex) =>
  knex.schema.createTable("links", table => {
    table.increments("id")
    table.text("url").notNullable()
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })

exports.down = async (knex: Knex) => knex.schema.dropTable("links")

