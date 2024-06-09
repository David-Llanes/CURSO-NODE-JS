import { createRequire } from "node:module"

export const require = createRequire(import.meta.url)

export const formatErrors = (error) => {
  return error.errors.reduce((acc, err) => {
    const field = err.path[0]
    acc[field] = err.message
    return acc
  }, {})
}

// TODO: Como en ES6 no se pueden importar JSON de forma nativa, hice esta funcion para importarlos.
// TODO se usa asi: const movies = require("../DBmock.json")
