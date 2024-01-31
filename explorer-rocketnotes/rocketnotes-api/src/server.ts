import fastifyCors from "@fastify/cors"
import jwt from "@fastify/jwt"
import fastifyMultipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import fastify from "fastify"
import { AVATARS_FOLDER } from "./config/upload"
import { migrationsRun } from "./database/sqlite/migrations"
import { routes } from "./routes"

migrationsRun()
const app = fastify()

// adiciona suporte para analisar o conteúdo do tipo multipart
app.register(fastifyMultipart)

// torna pastas publicas, é usado para servir arquivos com o mínimo de sobrecarga.
app.register(fastifyStatic, {
  root: AVATARS_FOLDER,
  prefix: "/avatars",
})

app.register(fastifyCors, {
  origin: "*",
})

app.register(jwt, {
  secret: "1234",
})

app.register(routes)

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server Runnig!")
})
