// Common JS module export. Los archivos .js en NODEJS por default utilizan CommonJS.

function sum(a, b) {
  return a + b
}

/* 
module.export es un objeto vacio por default: {}
Como es un objeto, funciona la notacion de punto:
----> module.exports.sum = sum
Pero tambien podemos asignarlo de esta manera:
----> module.exports = { sum }
*/

// Con la linea de abajo estamos reemplazando {} por una funcion. Al importanto o hacer el require() lo unico que obtendremos sera esa funcion.
module.exports = sum
