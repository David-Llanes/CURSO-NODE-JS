import { Router } from "express"
import { MovieController } from "../controllers/movies.js"

// ? ESTO TAMBIEN SE PUEDE HACER AQUI, PERO SE PUEDE HACER
// ? DE UNA MEJOR MANERA LA INYECCION.

// import { MovieModel } from "../models/movie.js"
/* ---------------------- Creando router ----------------------- */
// export const moviesRouter = Router()

/* -------------------- Creando controller --------------------- */
// const movieController = new MovieController({ movieModel: MovieModel })

/* ------------------ MIDDLEWARES Y ENDPOINTS ------------------ */
// moviesRouter.get("/", movieController.getAll)
// moviesRouter.post("/", movieController.create)

// moviesRouter.get("/:id", movieController.getById)
// moviesRouter.patch("/:id", movieController.update)
// moviesRouter.delete("/:id", movieController.delete)

// * INYECCION DE DEPENDENCIAS desde el punto de entrada de la aplicacion
export const createMoviesRouter = ({ movieModel }) => {
  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel })

  moviesRouter.get("/", movieController.getAll)
  moviesRouter.post("/", movieController.create)

  moviesRouter.get("/:id", movieController.getById)
  moviesRouter.patch("/:id", movieController.update)
  moviesRouter.delete("/:id", movieController.delete)

  return moviesRouter
}
