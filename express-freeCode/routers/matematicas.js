const express = require('express')
const { math } = require('../datos/cursos.json')

const routerMatematicas = express.Router()

routerMatematicas.get('/', (req, res) => {
  res.send(JSON.stringify(math))
})

module.exports = { routerMatematicas }
