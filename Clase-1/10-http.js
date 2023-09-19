const http = require('node:http')
const { findAvailablePort } = require('./11-free-port')

// Creamos un servidor para poder recibir requests.
// Un servidor puede hacer unicamente dos cosas. Recibir una peticion y regresar una respuesta.
const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hola mundo...')
})

// Definimos dónde tiene que escuchar el servidor. El puerto.
// server.listen(port, callback) -> El callback se ejecutará cuando el servidor comience a escuchar.
server.listen(3000, () => {
  console.log(
    `Server listenig on port http://localhost:${server.address().port}`
  ) // No se vera en la consola del navegador
})
// --> Podemos recuperar el puerto por el que está escuchando el servidor con server.address().port

// UTILIZANDO LA FUNCION QUE CREAMOS NOSOTROS
const desiredPort = process.env.PORT ?? 0
const server2 = http.createServer((req, res) => {
  console.log('Request received 2')
  res.end('Hola mundo 2...')
})
findAvailablePort(desiredPort).then(port => {
  server2.listen(port, () => {
    console.log(`Server listenig on port http://localhost:${port}`)
  })
})
