const http = require('node:http')
const cursos = require('./cursos')

const PORT = 3000

const server = http.createServer((req, res) => {
  const { url, method } = req

  switch (method) {
    case 'GET':
      return GET(req, res)
    case 'POST':
      return POST(req, res)
    default:
      res.statusCode = 501
      return res.end(
        `El metodo ${method} no puede ser manejado por el servidor...`
      )
  }
})

function GET(req, res) {
  const { url: path } = req

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(
      'Bienvenidos a mi primer servidor y API que maneja routing con Node.js'
    )
  } else if (path === '/cursos') {
    // res.statusCode = 200
    return res.end(JSON.stringify(cursos.infoCursos))
  } else if (path === '/cursos/programacion') {
    // res.statusCode = 200
    return res.end(JSON.stringify(cursos.infoCursos.programming))
  } else if (path === '/cursos/matematicas') {
    // res.statusCode = 200
    return res.end(JSON.stringify(cursos.infoCursos.math))
  }

  // Si accece a una ruta que no estamos controlando:
  res.statusCode = 404
  return res.end('El recurso solicitado no existe...')
}

function POST(req, res) {
  const { url: path } = req

  if (path === '/cursos/programacion') {
    let body = ''
    // Este evento es predeterminado. Cuando la req reciba datos del cliente.
    req.on('data', data => {
      body += data.toString()
    })

    // Cuando se termine de recibir la informacion
    req.on('end', () => {
      console.log(body)
      console.log(JSON.parse(body))
      console.log(typeof body)
      return res.end('Se ha hecho una solicitud POST')
    })

    // res.statusCode = 200
    // return res.end('Se ha hecho una solicitud POST')
  }
}

// server.listen(puerto, callback) --> El callback se ejecutara cuando el servidor se levante y comience a escuchar.
server.listen(PORT, () => {
  console.log(`Escuchando en el puerto http://localhost:${PORT}...`)
})
