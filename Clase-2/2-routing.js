const http = require('node:http')
const dittoJSON = require('./dito.json')
const PORT = process.env.PORT ?? 3000

// Creamos el servidor
const server = http.createServer((req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/html; charset=utf-8')
          return res.end('<h1>404 NOT FOUND</h1>')
        }
      }
    }
    case 'POST': {
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento 'data': Cuando llegue informacion en el body de la request
          req.on('data', chunk => {
            body += chunk.toString() // chunk es un buffer porque va recibiendo los datos binarios que va leyendo del cuerpo de la request
          })
          // Cuando haya terminado de juntar todos los chunks...
          req.on('end', () => {
            const data = JSON.parse(body) // Convertimos body en un objeto para poder trabajar con el
            console.log(data)
            //res.statusCode = 201
            //res.setHeader('Content-Type', 'application/html; charset=utf-8')
            res.writeHead(201, {
              'Content-Type': 'application/html; charset=utf-8',
            })
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/html; charset=utf-8')
          return res.end('<h1>404 NOT FOUND</h1>')
        }
      }
      break
    }
    default: {
      res.statusCode = 501
      res.setHeader('Content-Type', 'application/html; charset=utf-8')
      return res.end('<h1>501 Method not implemented</h1>')
    }
  }
})

// Hacemos que el servidor escuche
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

/* NOTA
LET Y CONST FUNCIONAN EN UN AMBITO DE BLOQUE, Y LOS BLOQUES ESTAN DEFINIDOS POR { } 
SI DENTRO DE UN CASE DE SWITCH DECLARAMOS UNA CONSTANTE:
  - const body = ''
Y DENTRO DE OTRO CASE DECLARAMOS LO MISMO, NOS MARCARA UN ERROR PORQUE NO HEMOS SEPARADO LOS CASE CON { }

ES BUENA PRACTICA SEPARAR LOS CASE CON { }
*/
