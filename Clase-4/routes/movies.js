import { Router } from 'express'
import crypto from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies.json')

/* ---------------------- Creando router ----------------------- */
export const moviesRouter = Router()

/* ------------------ MIDDLEWARES Y ENDPOINTS ------------------ */
moviesRouter.get('/', (req, res) => {
  const { title, genre } = req.query

  if (title) {
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    )
    if (filteredMovies) return res.json(filteredMovies)
  }

  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    if (filteredMovies) return res.json(filteredMovies)
  }

  res.json(movies)
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  // Aqui solo llegará si se validaron correctamente los datos
  const newMovie = {
    id: crypto.randomUUID,
    ...result.data,
  }

  // Agregar a la BD
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    return res.json(movie)
  }
  res.status(404).json({ message: 'Movie not found...' })
})

moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found...' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204).json({ message: 'Movie deleted' })
})
