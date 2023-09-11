function saludo1(nombre) {
  console.log('Hola ', nombre)
}

function saludo2(nombre1, nombre2) {
  console.log(`Hola ${nombre1} y ${nombre2}.`)
}

module.exports = { saludo1, saludo2 }
