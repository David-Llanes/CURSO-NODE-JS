const http = require('node:http')
const fs = require('node:fs')

const PORT = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  const { url } = req
  console.log('Request received...')

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi página...')
  } else if (url === '/imagen.png') {
    fs.readFile('./naruto.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Server internal console.error();')
      } else {
        res.setHeader('Content-Type', 'imagen/png')
        res.statusCode = 200
        res.end(data)
      }
    })
  } else if (url === '/excel') {
    fs.readFile('./excel.xlsx', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Server internal console.error();')
      } else {
        // Tipos MIME: https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types
        res.setHeader('Content-Type', 'application/vnd.ms-excel')
        res.statusCode = 200
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(PORT, () => {
  console.log(`Server listenig on port http://localhost:${PORT}`)
})
