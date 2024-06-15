import { Router } from "express"
import { MovieController } from "../controllers/movies.js"
import userExtractor from "../middlewares/userExtractor.js"

export const createMoviesRouter = ({ movieModel }) => {
  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel })

  moviesRouter.get("/", movieController.getAll)
  moviesRouter.post("/", userExtractor, movieController.create)

  moviesRouter.get("/:id", movieController.getById)
  moviesRouter.patch("/:id", movieController.update)
  moviesRouter.delete("/:id", movieController.delete)

  return moviesRouter
}
