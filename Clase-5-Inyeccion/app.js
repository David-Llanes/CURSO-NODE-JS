import express from "express"
import { createMoviesRouter } from "./routes/movies.js"
import { corsMiddleware } from "./middlewares/cors.js"

// ? ESTO ESTA BIEN, pero la inyeccion de dependencias se puede hacer de una mejor manera. Esto sirve para poder testear la aplicacion de mejor manera.
// import { MovieModel } from "./models/movie.js"
// /* ------------------ INICIALIZANDO APLICACION ----------------- */
// const app = express()
// app.disable("x-powered-by") // Header x-powered-by: Express

// /* -------------------- MIDDLEWARE Y RUTAS -------------------- */
// // Para arreglar los problemas de CORS
// app.use(corsMiddleware())
// // Para poder trabajar con req.body como un objeto
// app.use(express.json())

// // Middleware que se ejecutara en cada peticion
// app.use((req, res, next) => {
//   console.log("A request has been received...")
//   next()
// })

// app.get("/", (req, res) => {
//   res.json({ message: "Hola mundo" })
// })

// // Cuando accedemos a '/movies' se redirecciona a moviesRouter
// app.use("/movies", createMoviesRouter({ movieModel: MovieModel }))

// /* -------------------- MANEJO DE ERRORES ---------------------- */
// // Manejar rutas que no existen
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry cant find that!")
// })

// // Manejar errores.
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send("Something broke!")
// })

// /* ------------------- LEVANTANDO SERVIDOR --------------------- */
// const PORT = process.env.PORT ?? 1234
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`)
// })

// * INYECCION DE DEPENDENCIAS
export const createApp = ({ movieModel }) => {
  const app = express()
  app.disable("x-powered-by")
  app.use(corsMiddleware())
  app.use(express.json())

  app.use((req, res, next) => {
    console.log("A request has been received...")
    next()
  })

  app.get("/", (req, res) => {
    res.json({ message: "Hola mundo" })
  })

  app.use("/movies", createMoviesRouter({ movieModel }))

  /* -------------------- MANEJO DE ERRORES ---------------------- */
  app.use(function (req, res, next) {
    res.status(404).send("Sorry cant find that!")
  })

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
  })

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
  })
}
