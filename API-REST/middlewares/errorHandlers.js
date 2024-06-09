export function notFound(req, res, next) {
  res.status(404).send("Esta ruta no existe xD...")
}

export function serverError(err, req, res, next) {
  if (err.name === "CastError") {
    res.status(400).send("El ID proporcionado no es válido.")
  }
  res.status(500).send(`Error en el servidor: ${err}`)
}
