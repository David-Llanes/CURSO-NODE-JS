// Nos regresa una clase
const EventEmitter = require("node:events")

// Una instancia que nos permitira emitir eventos
const customEmitter = new EventEmitter()

// El callback puede recibir parametros, pero estos deben ser pasados desde el emit() como argumentos
customEmitter.on("compra", ({ producto, total }) => {
  console.log(`Se realizó una compra de ${producto} por un total de ${total}`)
})

// Esta linea dispara el evento para ser escuchado.
// Los emits siempre deberian ejecutarse despues de que el eventListener se haya creado.
customEmitter.emit("compra", { producto: "zapatos", total: 500 })

// Podemos pasar varios argumentos separados por comas, pero deben ir en orden.
// Tambien podemos pasar un objeto con todos los datos.
// Los datos seran pasados al manejador de eventos como parametros

// Eliminar un event listener. removeListener('event', callback). Es igual a customEmitter.off('event', callback)
customEmitter.removeListener("compra", ({ producto, total }) => {
  console.log(`Se realizó una compra de ${producto} por un total de ${total}`)
})
