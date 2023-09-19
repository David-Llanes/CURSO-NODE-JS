const express = require('express')
const cursos = require('../datos/cursos.json')

const routerProgramacion = express.Router()
// Nos permitira procesar el cuerpo de la solicitud en formato JSON y poder trabajar con el cuerpo de la solicutud con req.body como un objeto de javascript
routerProgramacion.use(express.json()) // Middleware, se ejecuta despues de recibir una solicitud pero antes de enviar una respuesta

/* Los objetos tienen acceso al objeto de la solicitud y de la respuesta y a next(), una funcion que se llama para ejecutar el siguiente middleware */

routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(cursos.programming))
})

routerProgramacion.get('/:lenguaje', (req, res) => {
  const { lenguaje } = req.params
  // req.query regresa un objeto con las claves y valores de los parametros query o searchParams en la url
  const { a } = req.query
  console.log(a) // Si no hay regresa undefined

  const cursosFiltrados = cursos.programming.filter(
    curso =>
      curso.lenguage === lenguaje.charAt(0).toUpperCase() + lenguaje.slice(1)
  )
  if (cursosFiltrados.length === 0) {
    return res.status(404).send('No se encontraron cursos...')
  }

  res.send(JSON.stringify(cursosFiltrados))
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const { lenguaje, nivel } = req.params
  const cursosFiltrados = cursos.programming.filter(
    curso =>
      curso.lenguage === lenguaje.charAt(0).toUpperCase() + lenguaje.slice(1) &&
      curso.lvl === nivel.charAt(0).toUpperCase() + nivel.slice(1)
  )
  if (cursosFiltrados.length === 0) {
    //return res.status(404).send('No se encontraron cursos...')
    return res.status(404).end() // Envia una respuesta vacia
  }

  res.send(JSON.stringify(cursosFiltrados))
})

// Solicitud POST
routerProgramacion.post('/', (req, res) => {
  const newCourse = req.body
  cursos.programming.push(newCourse)
  console.log(newCourse)
  res.send(JSON.stringify(newCourse))
})

// Solicitud PUT
routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body
  const { id } = req.params // Simpre regresa strings
  console.log(typeof id, typeof cursoActualizado.id) // string number

  // Usamos 2 == porque uno es string y el otro es number
  const index = cursos.programming.findIndex(curso => curso.id == id)
  if (index >= 0) {
    cursos.programming[index] = cursoActualizado
    console.log(cursos.programming)
    return res.json(cursoActualizado)
  }

  res.status(404).send(`No se encontro ningun curso con el id: ${id}`)
})

// Solicitud PATCH
routerProgramacion.patch('/:id', (req, res) => {
  const campoActualizado = req.body
  console.log(campoActualizado)
  const { id } = req.params // Simpre regresa strings

  // Usamos 2 == porque uno es string y el otro es number
  const index = cursos.programming.findIndex(curso => curso.id == id)

  if (index >= 0) {
    const cursoAModificar = cursos.programming[index]
    // Metodo que nos permite modficar solo algunas propiedades de un objeto
    Object.assign(cursoAModificar, campoActualizado)
    return res.json(cursoAModificar)
  }

  res.status(404).send(`No se encontro ningun curso con el id: ${id}`)
})

// Solicitud DELETE
routerProgramacion.delete('/:id', (req, res) => {
  const { id } = req.params // Simpre regresa strings

  // Usamos 2 == porque uno es string y el otro es number
  const index = cursos.programming.findIndex(curso => curso.id == id)

  if (index >= 0) {
    // Empezamos en el indice del elemento y eliminamos 1
    cursos.programming.splice(index, 1)
    return res.json(cursos.programming)
  }

  res.status(404).end()
})

module.exports = { routerProgramacion }
