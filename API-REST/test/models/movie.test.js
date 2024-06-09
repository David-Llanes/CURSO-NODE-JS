import { afterAll, beforeEach, describe, expect, test } from "@jest/globals"
import { Movie, MovieModel } from "../../models/MongoDB/movie.js"
import { require } from "../../utils/utils.js"
import mongoose from "mongoose"
const movies = require("../DBmock.json")

describe("MovieModel works as expected", () => {
  beforeEach(async () => {
    await Movie.deleteMany({})
    await Movie.insertMany(movies)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  describe("GET /movies", () => {
    // getAll
    test("movies are returned as an ARRAY", async () => {
      const response = await MovieModel.getAll({})
      expect(response).toBeInstanceOf(Array)
      expect(response).toHaveLength(movies.length)
    })

    // getAll with genre
    test("given a genre should return an ARRAY with the movies of that genre", async () => {
      const options = { genre: "action" }
      const response = await MovieModel.getAll(options)
      expect(response).toBeInstanceOf(Array)

      const result = response.every((movie) => {
        return movie.genre.some(
          (genre) => genre.toLowerCase() === options.genre.toLowerCase()
        )
      })

      expect(result).toBe(true)
    })

    // getAll with title
    test("given a title should return an ARRAY with the movies with that title", async () => {
      const options = { title: "dark" }
      const response = await MovieModel.getAll(options)
      expect(response).toBeInstanceOf(Array)

      response.forEach((movie) => {
        expect(movie.title.toLowerCase()).toContain(options.title.toLowerCase())
      })
    })

    // getById
    test("given an ID should return the movie with that ID", async () => {
      const moviesInDB = await Movie.find({})
      const movieToFind = moviesInDB[0]
      const idToFind = movieToFind._id

      const response = await MovieModel.getById(idToFind)
      expect(response._id).toEqual(idToFind)
      expect(response).toEqual(movieToFind)
    })

    // create
    test("given a movie object should create a movie and return it", async () => {
      const newMovie = {
        title: "Haikyuu!!: La batalla del basurero.",
        year: 2024,
        director: "David Llanes",
        duration: 82,
        poster: "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
        genre: ["Action", "Drama"],
        rate: 9.5,
      }

      const response = await MovieModel.create({ input: newMovie })
      expect(response).toMatchObject(newMovie)
      expect(response._id).toBeDefined()
    })

    // update
    test("given an ID and a parcial or full movie object, it should update the movie and return the new version", async () => {
      const moviesInDB = await Movie.find({})
      const movieToUpdate = moviesInDB[0]
      const idToUpdate = movieToUpdate._id

      const dataToUpdate = {
        year: 2020,
        director: "Kageyama",
        rate: 9.0,
      }

      const response = await MovieModel.update({
        id: idToUpdate,
        input: dataToUpdate,
      })

      expect(response).toMatchObject(dataToUpdate)
      expect(response._id).toEqual(idToUpdate)
    })

    // delete
    test("given an ID should delete the movie with that ID", async () => {
      const moviesInDB = await Movie.find({})
      const movieToDelete = moviesInDB[0]
      const idToDelete = movieToDelete._id

      await MovieModel.delete({ id: idToDelete })
      const response = await MovieModel.getById({ id: idToDelete })

      expect(response).toBeNull()
    })
  })
})
