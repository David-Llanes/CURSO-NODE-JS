import jwt from "jsonwebtoken"

export default function (req, res, next) {
  // Extraer el header de autorización.
  const authorization = req.get("authorization")
  let token = ""

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" })
  }

  // Agregar el id del usuario al request.
  req.userId = decodedToken.id
  next()
}

// Este middleware se encargara de validar que el usuario esta autenticado y que el token es valido.
// Si el token no es valido o no esta presente, regresara un 401.
// Si el token es valido, agregara el id del usuario al request y llamara al siguiente middleware.
