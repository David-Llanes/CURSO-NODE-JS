export function notFound(req, res, next) {
  res.status(404).send("Sorry cant find that!")
}

export function serverError(err, req, res, next) {
  res.status(500).send("Something broke!", err.message)
}
