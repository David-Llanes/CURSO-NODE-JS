import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

/* ------------------ INICIALIZANDO APLICACION ----------------- */
const app = express()
app.disable('x-powered-by') // Header x-powered-by: Express

/* -------------------- MIDDLEWARE Y RUTAS -------------------- */
// Para arreglar los problemas de CORS
app.use(corsMiddleware())

// Para poder trabajar con req.body como un objeto
app.use(express.json())

// Se ejecutara en cada peticion
app.use((req, res, next) => {
  console.log('A request has been received...')
  next()
})

// Se ejecutara para cualquier metodo en '/'
app.all('/', (req, res, next) => {
  console.log('A request has been received at /')
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

// Cuando accedemos a '/movies' vamos a cargar todas las rutas de moviesRouter
app.use('/movies', moviesRouter)

/* -------------------- MANEJO DE ERRORES ---------------------- */
// Manejar rutas que no existen
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})

// Manejar errores.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

/* ------------------- LEVANTANDO SERVIDOR --------------------- */
const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
