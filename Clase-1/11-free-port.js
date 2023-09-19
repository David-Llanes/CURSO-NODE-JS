// conexiones con el protocolo HTTP.
const { error } = require('node:console')
const http = require('node:http')
// conexiones con el protocolo TCP. Es mas rapido porque no tiene que enviar tantas cabeceras.
const net = require('node:net')

function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()

      // El callback se ejecutara cuando ocurra el evento close
      server.close(() => {
        // Llegará aqui si ha podido levantar el puerto deseado
        resolve(port)
      })
    })

    // Escuchamos el evento 'error'. En caso de que no pueda levantar el puerto deseado. Si el puerto ya esta ocupado nos lanzará un error, el cual escucharemos y ejecutaremos un callback para resolver el puerto a 0, dando un puerto que SI ESTE DISPONIBLE.
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }

/* ES IMPORTANTE ENTENDER QUE NODEJS ESTA GESTIONADO CON EVENTOS */
