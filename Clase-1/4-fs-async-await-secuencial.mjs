import { readFile } from 'node:fs/promises'

// Al usar Async Await de esta manera, estamos usandolo de manera secuencial.

/* READ FROM A FILE */
console.log('Leyendo el primer archivo...')
const text1 = await readFile('./file.txt', 'utf-8')
console.log(text1)

console.log('Hacer cosas mientras lee el archivo...')

/* READ FROM A SECOND FILE */
console.log('Leyendo el segundo archivo...')
const text2 = await readFile('./file02.txt', 'utf-8')
console.log(text2)

// En los archivos con extension mjs (ES MODULES) ya podemos utilizar await sin que tenga que estar forzozamente dentro de una funcion async.

// ESTO YA NO ES NECESARIO
// const read = async () => {
//   const text = await readFile('./file02.txt', 'utf-8')
//   console.log(text)
// }
// read()
