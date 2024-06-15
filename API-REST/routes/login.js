import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const loginRouter = Router()

// En un caso real, se debería guardar la contraseña encriptada en la base de datos.
const correctPassword = await bcrypt.hash("admin", 10)

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body
  let user = null

  // Buscar en la base de datos un usuario con username.
  if (username === "admin") {
    user = {
      id: 1,
      name: "David Llanes",
      username: "admin",
      passwordHash: correctPassword,
    }
  }

  // Verificar que el usuario y contraseña sean correctos en un caso real.
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({ error: "Invalid user or password" })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // Firmar el token JWT
  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  res.send({
    name: user.name,
    username: user.username,
    token,
  })
})

export default loginRouter
