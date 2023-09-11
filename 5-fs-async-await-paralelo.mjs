import { readFile } from 'node:fs/promises'

/* ASYNC-AWAIT SECUENCIAL */
// console.log('Leyendo el primer archivo...')
// const text1 = await readFile('./file.txt', 'utf-8')
// console.log(text1)
// console.log('Hacer cosas mientras lee el archivo...')

// console.log('Leyendo el segundo archivo...')
// const text2 = await readFile('./file02.txt', 'utf-8')
// console.log(text2)

// Con la SECUENCIAL estamos leyendo primero un archivo de manera asincrona y luego leemos el siguiente. NOTA: QUE SEA SECUENCIAL NO QUIERE DECIR QUE SEA SINCRONO, ES DECIR, NO SE BLOQUEAN LOS PROCESOS, pero igual estamos esperando a que termine para seguir.

/* ASYNC-AWAIT PARALELO */
Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file02.txt', 'utf-8'),
]).then(([text1, text2]) => {
  console.log(text1)
  console.log(text2)
})
// Ventajas de usar el metodo PARALELO: esto será mas rapido. Estamos haciendo dos trabajos en paralelo. Nos esperamos a que terminemos de leer los 2 archivos y despues continiamos.
