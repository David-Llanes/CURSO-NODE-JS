import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export class MovieController {
  static async getAll(req, res) {
    try {
      const { title, genre } = req.query
      const movies = await MovieModel.getAll({ genre, title })
      if (movies.length === 0) {
        return res.status(404).json({ message: 'We could not find any movie!' })
      }
      res.json(movies)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found...' })
  }

  static async create(req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    try {
      const newMovie = await MovieModel.create({ input: result.data })

      res.status(201).json(newMovie)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({ message: 'Movie not found...' })
    }

    return res.json(updatedMovie)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
