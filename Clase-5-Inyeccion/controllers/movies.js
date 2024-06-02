import { validateMovie, validatePartialMovie } from "../schemas/movies.js"
// import { MovieModel } from "../models/movie.js"

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    try {
      const { title, genre } = req.query
      const movies = await this.movieModel.getAll({ genre, title })
      if (movies.length === 0) {
        return res.status(404).json({ message: "We could not find any movie!" })
      }
      res.json(movies)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: "Movie not found..." })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    try {
      const newMovie = await this.movieModel.create({ input: result.data })

      res.status(201).json(newMovie)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data,
    })

    if (updatedMovie === false) {
      return res.status(404).json({ message: "Movie not found..." })
    }

    return res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })

    if (!result) {
      return res.status(404).json({ message: "Movie not found" })
    }

    return res.json({ message: "Movie deleted" })
  }
}

/* 

IMPORTANTE:
Los metodos definidos dentro de la clase deben usar la sitaxis de arrow function para que THIS haga referencia a la instancia de la clase y no al objeto global.

EJEMPLO

class MyClass {
  constructor() {
    this.name = 'MyClass';
  }

  myMethod() {
    console.log(this.name); // 'MyClass' si se llama como myInstance.myMethod()
  }
}

const myInstance = new MyClass();
myInstance.myMethod(); // 'MyClass'

const myMethod = myInstance.myMethod;
myMethod(); // undefined, porque 'this' ahora es el objeto global o undefined en modo estricto.

Esto es porque THIS tambien depende de como se invoca la funcion. Si se invoca como metodo (myInstance.myMethod()), THIS hara referencia a la instancia de la clase. Si se invoca como funcion (myMethod()), THIS hara referencia al objeto global o undefined en modo estricto.


? IMPORTANTE:

En cambio, si utilizamos la sintaxis de arrow function, THIS hara referencia a la instancia de la clase sin importar como se invoque el metodo.
Las funciones flecha no tienen su propio this. En su lugar, este valor se toma del contexto en el que se definió la función.

Aun cuando las funciones flecha no se definan explícitamente dentro del constructor, su contexto léxico se establece en el momento en que la instancia de la clase es creada, lo que incluye el constructor. Aquí está la explicación detallada:

Las funciones flecha capturan el valor de this del contexto en el que fueron creadas, que en el caso de los métodos de clase definidos como funciones flecha, es la instancia de la clase misma. Por lo tanto, this en un método de clase definido como función flecha se refiere a la instancia de la clase.
*/
