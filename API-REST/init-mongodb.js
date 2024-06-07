import { createApp } from "./app.js"
import { MovieModel } from "./models/MongoDB/movie.js"

createApp({ movieModel: MovieModel })
