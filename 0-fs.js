const fs = require('node:fs')

/* 
Por defecto todas las operaciones de fs se hacen de manera async.
Si quisieramos que se ejecutaran de manera sync deberiamos utilizar las funciones con terminacion Sync. 
Por ejemplo: readFile() -> readFileSync()

Como son asincronicas, algunas reciben un callback como parametro.
El callback se ejecutará cuando se termine el proceso.
*/

/* STATS */
const stats = fs.statSync('./file.txt')
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)

/* RENAME --> fs.rename(archivo, nuevo_nombre, callback) */
// fs.rename('.//index.html', 'renombrado.html', err => {
//   if (err) {
//     throw err
//   }
//   console.log('Se ha cambiado el nombre.')
// })

/* Leer un archivo --> fs.readFile */
fs.readFile('./index.html', 'utf-8', (err, text) => {
  if (err) {
    throw err
  }
  console.log(text)
})

/* Agregar contenido al final de un archivo --> fs.appendFile */
fs.appendFile('./index.html', '<p>Hola</p>', err => {
  if (err) {
    throw err
  }
  console.log('Archivo actualizado')
})

/* Reemplazar el contenido de un archivo --> fs.writeFile */
fs.writeFile('./index.html', '<h1>Reemplazado</h1>', err => {
  if (err) {
    throw err
  }
  console.log('Archivo con contenido reemplazado')
})

/* Eliminar archivo --> fs.unlink */
// fs.unlink('./test.txt', err => {
//   if (err) {
//     throw err
//   }
//   console.log('Archivo eliminado...')
// })
