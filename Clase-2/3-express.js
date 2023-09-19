const express = require('express')

const PORT = process.env.PORT ?? 3000
const app = express()
// Desabilitar la cabecera 'x-powered-by' por temas de seguridad
app.disable('x-powered-by')

// Middleware. Ejemplo de implementacion de app.use(express.json())
app.use((req, res, next) => {
  console.log('Ejecutando Middleware')
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Solo llegan req que sean POST con el header application/json
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // No vamos a responder ...
    // res.status(201).json(body)
    // --> Vamos a mutar la req y meter la informacion en req.body
    console.log('ja')
    req.body = data
    next()
  })
})
// Acabamos de crear un Middleware que hace lo mismo que:
// app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello world')
})

app.post('/pokemon', (req, res) => {
  // req.body sera la propiedad que agregamos en el Middleware
  const body = req.body
  console.log(body)
  // Conectarse y añadir un nuevo registro a la BD ...
  res.status(201).json(body)
})

// 404 global - Debe ir al final de todas las rutas
/* 
En Express, las respuestas 404 no son el resultado de un error, por lo que el middleware de manejador de errores no las capturará. Este comportamiento se debe a que una respuesta 404 simplemente indica la ausencia de trabajo adicional pendiente; es decir, Express ha ejecutado todas las rutas y funciones de middleware, y ha comprobado que ninguna de ellas responde. Lo único que debe hacer es añadir una función de middleware al final de la pila (debajo de las demás funciones) para manejar una respuesta 404:
*/
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})
// app.use significa que funciona para TODAS LAS ACCIONES (get, put...)
app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`)
})
