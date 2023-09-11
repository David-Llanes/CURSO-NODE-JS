// Automaticamente al importarlo JS lo convierte en objeto con JSON.parse() ----> DE STRING A OBJETO
const json = require('./ejemplo.json')

console.log(typeof json) // object
console.log(json.autor) // { edad: 50, nombre: 'Pepito' }

// Para convertir un objeto a JSON ----> JSON.stringify()
const persona = {
  edad: 25,
  nombre: 'Sasuke',
  ocupaciones: ['Ninja', 'Emo'],
  conVida: true,
  pareja: {
    nombre: 'Sakura',
    edad: 25,
  },
}

console.log(typeof persona) // object
// JSON.stringify() ----> DE OBJETO A STRING
const personaJSON = JSON.stringify(persona)

console.log(typeof personaJSON) // string
console.log(personaJSON)
/* OUTPUT:
  {"edad":25,"nombre":"Sasuke","ocupaciones":["Ninja","Emo"],"conVida":true,"pareja":{"nombre":"Sakura","edad":25}} 
*/

// JSON.parse() ----> DE STRING A OBJETO
const objeto = JSON.parse(personaJSON)
console.log(typeof objeto) //object
console.log(objeto)
