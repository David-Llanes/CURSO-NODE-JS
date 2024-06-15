import express from "express"
import { createMoviesRouter } from "./routes/movies.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { notFound, serverError } from "./middlewares/errorHandlers.js"
import loginRouter from "./routes/login.js"

export const createApp = ({ movieModel }) => {
  const app = express()
  app.disable("x-powered-by")
  app.use(corsMiddleware())
  app.use(express.json())

  app.get("/", (req, res) => {
    res.json({ message: "Movies API" })
  })

  app.use("/login", loginRouter)
  app.use("/movies", createMoviesRouter({ movieModel }))

  /* -------------------- MANEJO DE ERRORES ---------------------- */
  app.use(notFound)
  app.use(serverError)

  const PORT = process.env.PORT ?? 1234
  const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
  })

  return { app, server }
}
