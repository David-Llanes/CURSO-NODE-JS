import { describe, test, expect } from "@jest/globals"

import { Movie, MovieModel } from "../models/MongoDB/movie.js"
import { createApp } from "../app.js"
import request from "supertest"
import mongoose from "mongoose"

import { validateMovie } from "../schemas/movies.js"
const movies = require("../DBmock.json")

const { app, server } = createApp({ movieModel: MovieModel })
const api = request(app)

// Añadiendo documentos a la BD
beforeEach(async () => {
  await Movie.deleteMany({})
  await Movie.insertMany(movies)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

describe("GET /movies", () => {
  test("movies are returned as JSON", async () => {
    const response = await api
      .get("/movies")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body).toHaveLength(movies.length)
  })

  test("given a genre should return an ARRAY with the movies of that genre as JSON", async () => {
    const options = { genre: "action" }
    const response = await api
      .get("/movies")
      .query(options)
      .expect(200)
      .expect("Content-Type", /json/)

    const result = response.body.every((movie) => {
      return movie.genre.some(
        (genre) => genre.toLowerCase() === options.genre.toLowerCase()
      )
    })

    expect(result).toBe(true)
  })

  test("given an invalid genre should return a 404 and a message as JSON", async () => {
    const options = { genre: "xdxd" }
    await api
      .get("/movies")
      .query(options)
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({ message: "No se encotró ninguna película." })
  })

  test("given a title should return an ARRAY with the movies with that title as JSON", async () => {
    const options = { title: "dark" }
    const response = await api
      .get("/movies")
      .query(options)
      .expect(200)
      .expect("Content-Type", /json/)

    response.body.forEach((movie) => {
      expect(movie.title).toMatch(new RegExp(options.title, "i"))
    })
  })

  test("given an invalid title should return a 404 and a message as JSON", async () => {
    const options = { title: "xdxd" }
    await api
      .get("/movies")
      .query(options)
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({ message: "No se encotró ninguna película." })
  })
})

describe("GET /movies/:id", () => {
  test("given a valid ID should return the movie as JSON", async () => {
    const moviesInDB = await Movie.find({})
    const movieToCompare = moviesInDB[0].toJSON()
    const movieID = movieToCompare.id

    const response = await api
      .get(`/movies/${movieID}`)
      .expect(200)
      .expect("Content-Type", /json/)

    expect(response.body.id).toEqual(movieID.toString())
  })

  test("given an invalid ID should return a 404 and a message", async () => {
    const movieID = undefined // or a non-existing ID
    await api
      .get(`/movies/${movieID}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({ message: "No se encontró una pelicula con esa ID." })
  })
})

describe("POST /movies", () => {
  test("given an object containing the new movie info, it should create a new document in the DB and send it back with 200", async () => {
    const newMovie = {
      title: "Test",
      year: 2002,
      director: "David Llanes",
      duration: 98,
      poster: "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
      genre: ["Action", "Romance"],
      rate: 6.5,
    }

    const result = validateMovie(newMovie)

    if (result.success) {
      const response = await api
        .post("/movies")
        .send(newMovie)
        .expect(201)
        .expect("Content-Type", /json/)

      expect(response.body).toMatchObject(result.data)
      expect(response.body.id).toBeDefined()
    }
  })

  test("given an invalid object should return a 422 and a message", async () => {
    const newMovie = {
      title: "Test",
      year: "2002",
      director: "David Llanes",
      duration: 98,
      poster: "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
      genre: ["Action", "Romance"],
      rate: 6.5,
    }

    const result = validateMovie(newMovie)

    if (!result.success) {
      const formattedErrors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0]
        acc[field] = err.message
        return acc
      }, {})

      await api
        .post("/movies")
        .send(newMovie)
        .expect(422)
        .expect("Content-Type", /json/)
        .expect({ error: formattedErrors })
    }
  })
})

describe("PATCH /movies/:id", () => {
  test("given an ID and an object with the new movie info should update the movie in the DB and return it with a 200", async () => {
    const initialMovies = await Movie.find({})
    const movieToUpdate = initialMovies[0].toJSON()
    const movieID = movieToUpdate.id

    const updatedMovie = {
      title: "Updated",
      year: 2002,
      director: "David Llanes",
      duration: 98,
      poster: "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
      genre: ["Action", "Romance"],
      rate: 6.5,
    }

    const result = validateMovie(updatedMovie)

    if (result.success) {
      const response = await api
        .patch(`/movies/${movieID}`)
        .send(updatedMovie)
        .expect(200)
        .expect("Content-Type", /json/)

      expect(response.body).toMatchObject(result.data)
      expect(response.body.id).toBeDefined()
    }
  })

  test("given an invalid ID should return a 404 and a message", async () => {
    const movieID = undefined // or a non-existing ID
    const updatedMovie = {
      title: "Updated",
      year: 2002,
      director: "David Llanes",
      duration: 98,
      poster: "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
      genre: ["Action", "Romance"],
      rate: 6.5,
    }

    await api
      .patch(`/movies/${movieID}`)
      .expect(404)
      .send(updatedMovie)
      .expect("Content-Type", /json/)
      .expect({ message: "No se encontró una pelicula con esa ID." })
  })
})

describe("DELETE /movies/:id", () => {
  test("given an ID should delete the movie from the DB an return a 200 and a message.", async () => {
    const initialMovies = await Movie.find({})
    const movieToDelete = initialMovies[0].toJSON()
    const movieID = movieToDelete.id

    await api
      .delete(`/movies/${movieID}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({ message: "Película eliminada." })

    const moviesAfterDelete = await Movie.find({})
    expect(moviesAfterDelete).toHaveLength(initialMovies.length - 1)
  })

  test("given an invalid ID should return a 404 and a message.", async () => {
    const movieID = undefined // or a non-existing ID
    await api
      .delete(`/movies/${movieID}`)
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({
        message: "No se encontró una pelicula con esa ID para eliminar.",
      })
  })
})

// Faltan mas corner cases como:
// - Enviar un objeto vacio en el POST
// - Enviar un objeto con campos invalidos en el PATCH
// - Hacer que las INVALID ID no regresen un 404, sino que lo cache el middleware de error handling
// y mas cosas.
