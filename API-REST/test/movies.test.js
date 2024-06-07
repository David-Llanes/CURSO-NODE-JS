import { MovieModel } from "../models/MongoDB/movie.js"
import { createApp } from "../app.js"
import supertest from "supertest"
import mongoose from "mongoose"

const { app, server } = createApp({ movieModel: MovieModel })
const api = supertest(app)

test("GET /movies", async () => {
  await api
    .get("/movies")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
