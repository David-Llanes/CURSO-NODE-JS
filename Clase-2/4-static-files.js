const express = require('express')
const path = require('node:path')
const PORT = process.env.PORT ?? 3000

const app = express()

// Middleware para servir archivos estaticos
app.use(express.static('public'))
/* EJEMPLOS DE RUTAS:
http://localhost:3000/naruto.png
http://localhost:3000/zoro.jpg */

// Middleware para servir archivos estaticos bajo una ruta
app.use('/static', express.static('public2'))
// http://localhost:3000/static/sanji.jpg

// Middleware para servir archivos estaticos bajo una ruta
app.use('/images', express.static('public2'))
// http://localhost:3000/images/sanji.jpg

/* No obstante, la vía de acceso que proporciona a la función express.static es relativa al directorio desde donde inicia el proceso node. Si ejecuta la aplicación Express desde cualquier otro directorio, es más seguro utilizar la vía de acceso absoluta del directorio al que desea dar servicio: */
// En este caso __dirname es D:\Programacion\Node\CURSO-NODE-JS\Clase-2
app.use('/static', express.static(path.join(__dirname, 'public')))
// http://localhost:3000/static/sasuke.jpg

/* NOTA: SI NADAMAS VAMOS A SERVIR UN SOLO ARCHIVO PODEMOS UTILIZAR res.senFile(path, callaback(err)): */
// Imagen
app.get('/ejemplo/sasuke', (req, res) => {
  //throw new Error('Error')
  res.sendFile(__dirname + '/public/sasuke.jpg')
})
// Archivo de txt
app.get('/ejemplo/prueba', (req, res) => {
  //throw new Error('Error')
  res.sendFile(__dirname + '/public/prueba.txt')
})
// Documento excel
app.get('/ejemplo/excel', (req, res) => {
  //throw new Error('Error')
  res.sendFile(__dirname + '/public/pruebaExcel.xlsx', err => {
    if (err) {
      console.log('Ocurrio un error al enviar el archivo...')
    }
    console.log(
      'Me ejecuto cuando se envia el documento o cuando ocurre un error'
    )
  })
})
// Plantilla HTML
app.get('/ejemplo/plantilla', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// Manejar rutas que no existen
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})

// Manejar errores. Por ejemplo, si alguno de nuestros handlers usa Throw new error al cumplir cierta condicion
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Poner el servidor a escuchar
app.listen(PORT, () => {
  console.log(__dirname)
  console.log(`Escuchando en http://localhost:${PORT}`)
})
