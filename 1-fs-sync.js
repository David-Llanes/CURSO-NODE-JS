const fs = require('node:fs')

/* LEYENDO DE MANERA SINCRONA... NO PASARA A LA SIGUIENTE LINEA HASTA TERMINAR CON LO QUE ESTA HACIENDO */

/* READ FROM A FILE */
console.log('Leyendo el primer archivo...')
const fileText = fs.readFileSync('./file.txt', 'utf-8')
console.log(fileText)

console.log('Hacer cosas mientras lee el archivo...')

/* READ FROM A SECOND FILE */
console.log('Leyendo el segundo archivo...')
const fileText2 = fs.readFileSync('./file2.txt', 'utf-8')
console.log(fileText2)
