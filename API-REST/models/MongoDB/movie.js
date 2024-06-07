import mongoose, { Schema, model } from "mongoose"
import "dotenv/config"

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: Number,
    director: String,
    duration: Number,
    poster: String,
    genre: [String],
    rate: Number,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const Movie = model("Movie", movieSchema)

// Connect to MongoDB
const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI

try {
  await mongoose.connect(connectionString)
  console.log(`Connected to MongoDB via ${connectionString}`)
} catch (error) {
  console.error(error)
}
// mongoose
//   .connect(connectionString)
//   .then(() => {
//     console.log(`Connected to MongoDB via ${connectionString}`)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

export class MovieModel {
  static getAll = async ({ genre, title }) => {
    if (title) {
      return await Movie.find({
        title: { $regex: title, $options: "i" },
      }).exec()
    }

    if (genre) {
      return await Movie.find({
        genre: { $elemMatch: { $regex: new RegExp(`^${genre}$`, "i") } },
      }).exec()
    }

    return await Movie.find().exec()
  }

  static async getById({ id }) {
    const movie = await Movie.findById(id).exec()
    return movie
  }

  static async create({ input }) {
    const newMovie = new Movie(input)
    return await newMovie.save()
  }

  static async delete({ id }) {
    const deletedMovie = await Movie.findByIdAndDelete(id).exec()
    if (!deletedMovie) return false
    return true
  }

  static async update({ id, input }) {
    const modifiedMovie = await Movie.findOneAndUpdate({ _id: id }, input, {
      new: true,
    }).exec()
    if (!modifiedMovie) return false
    return modifiedMovie
  }
}
