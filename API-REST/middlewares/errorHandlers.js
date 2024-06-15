const ERROR_HANDLERS = {
  CastError: (res) =>
    res.status(400).send({ error: "El ID proporcionado no es válido." }),
  JsonWebTokenError: (res) => res.status(401).json({ error: "Token invalido" }),
  TokenExpiredError: (res) => res.status(401).json({ error: "Token expirado" }),
  defaultError: (res) => res.status(500).end(),
}

export function notFound(req, res, next) {
  res.status(404).send("La ruta a la que intentas acceder no existe.")
}

export function serverError(err, req, res, next) {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError

  handler(res)
}
