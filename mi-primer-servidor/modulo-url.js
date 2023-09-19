//const url = require('node:url')
/* Muchos de los metodos se encuentran disponibles globalmente */

const { serialize } = require('v8')

const miURL = new URL('http://localhost:3000/xd/prueba?ordenar=vistas&nivel=1')

console.log(miURL.href) // http://localhost:3000/xd/prueba?ordenar=vistas&nivel=1
console.log(miURL.protocol) // http:
console.log(miURL.origin) // http://localhost:3000
console.log(miURL.host) // localhost:3000
console.log(miURL.hostname) // localhost
console.log(miURL.port) // 3000
console.log(miURL.pathname) // /xd/prueba
console.log(miURL.search) // ?ordenar=vistas&nivel=1
console.log(miURL.searchParams) // URLSearchParams { 'ordenar' => 'vistas', 'nivel' => '1' }

console.log('')

// Comprobando que miURL.searchParams es un objeto
console.log(typeof miURL.searchParams) // object
console.log(miURL.searchParams.get('ordenar')) // vistas
console.log(miURL.searchParams.get('nivel')) // 1
