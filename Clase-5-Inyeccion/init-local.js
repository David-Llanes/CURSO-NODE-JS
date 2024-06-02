import { createApp } from "./app"
import { MovieModel } from "./models/movie"

// Inicializamos la aplicacion con la inyeccion de dependencias y el MovieModel de eleccion.
createApp({ movieModel: MovieModel })

// * Lo bueno de este patron esque si queremos cambiar la base de datos o el modelo de datos, solo tenemos que cambiar el modelo y no tocar nada mas en la aplicacion.

// * Tambien es mas facil de testear, ya que podemos inyectar un modelo de datos falso para hacer pruebas sin tener que tocar la base de datos real.

// * Y se pueden tener varios archivos como este para poder tener diferentes configuraciones de la aplicacion.
