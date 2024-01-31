import { resolve } from "node:path"
import { open } from "sqlite"
import sqlite3 from "sqlite3"

export async function sqliteConnection() {
  const database = await open({
    driver: sqlite3.Database,
    filename: resolve(__dirname, "../database.db"),
  })

  return database
}
