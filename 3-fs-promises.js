/* Esto solo en los modulos nativos que no vienen con promeses (tipo node:fs y node:fs/promises)

const { promisify } = require('node:util')
const readFilePromise = promisify(fs.readFile)

Esto lo que hara es convertir el metodo que funciona con un callback a una promesa. */

const fs = require('node:fs/promises')

// UTILIZANDO promesas y .then

/* READ FROM A FILE */
console.log('Leyendo el primer archivo...')
fs.readFile('./file.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })
  .catch(err => console.log('Ha ocurrido un error', err))

console.log('Hacer cosas mientras lee el archivo...')

/* READ FROM A SECOND FILE */
console.log('Leyendo el segundo archivo...')
fs.readFile('./file02.txt', 'utf-8').then(text => {
  console.log(text)
})

// Con ASYNC-AWAIT
// const read = async () => {
//   const text = await fs.readFile('./file02.txt', 'utf-8')
//   console.log(text)
// }
// read()

// Con una funcion async autoinvocada IIFE
// ;(async () => {
//   const text = await fs.readFile('./file02.txt', 'utf-8')
//   console.log(text)
// })()

/*
 En CommonJS no es posible utilizar await asi:
    const text = await fs.readFile('./file02.txt', 'utf-8')
    console.log(text)
  porque no tienen soporte para utilizar await en el cuerpo del modulo. Tienen que estar dentro de una funcion async.

  Pero los ES Modules si tienen soporte para utilizar await en cualquier parte del cuerpo del modulo.

  Podemos usar tambien una funcion autoinvocada - IIFE inmediately invoked function expression
    ;(
      async ()=> {}
    )()
  Esta es una alternativa a utilizar una funcion async y despues llamarla nosotros mismos.

  SE NECESITA EL PUNTO Y COMA ANTES DEL PARENTESIS, PARA INDICARLE A NODE QUE ES UNA FUNCION AUTOINVOCADA
 */
