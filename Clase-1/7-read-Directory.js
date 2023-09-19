// Con promesas
// const fs = require('node:fs/promises')
// fs.readdir('.')
//   .then(files => {
//     files.forEach(file => {
//       console.log(file)
//     })
//   })
//   .catch(err => {
//     console.log('Error al leer el directorio: ', err)
//     return
//   })

// Con Callback. Es el default. No todos los modulos nativos de Node han mudado a promesas
const fs = require('node:fs')
fs.readdir('.', (err, files) => {
  if (err) {
    console.log('Error al leer el directorio: ', err)
    return
  }

  files.forEach(file => {
    console.log(file)
  })
})
