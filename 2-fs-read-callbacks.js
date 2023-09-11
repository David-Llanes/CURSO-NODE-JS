const fs = require('node:fs')

/* 
NOTAS 
- fs.readFileSync trabaja de manera sincrona. No pasará a la siguiente linea  hasta que haya terminado de leer el archivo.

  const fileText = fs.readFileSync('./file.txt', 'utf-8')
  console.log(fileText)
*/

// fs.readFile trabaja de manera asincrona, y cuando termina de leer ejecuta el callback.
/* READ FROM A FILE */
console.log('Leyendo el primer archivo...')
fs.readFile('./file.txt', 'utf-8', (err, text) => {
  console.log(text)
})

console.log('Hacer cosas mientras lee el archivo...')

/* READ FROM A SECOND FILE */
console.log('Leyendo el segundo archivo...')
fs.readFile('./file02.txt', 'utf-8', (err, text) => {
  console.log(text)
})

// NOTA: ESTO SE PUEDE HACER AHORA CON PROMESAS.
