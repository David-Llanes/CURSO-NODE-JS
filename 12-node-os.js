// Lo recomendable es utilizar el prefijo node: para importar modulos nativos que vienen con NODE.JS
const os = require('node:os')

console.log('Informacion del sistema operativo')
console.log('Nombre del SO', os.platform())
console.log('Version del SO', os.release())
console.log('Memoria total', os.totalmem())
console.log('Arqutectura', os.arch())
console.log('CPUs', os.cpus())
