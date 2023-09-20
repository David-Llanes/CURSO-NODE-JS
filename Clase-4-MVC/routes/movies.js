import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

/* ---------------------- Creando router ----------------------- */
export const moviesRouter = Router()

/* ------------------ MIDDLEWARES Y ENDPOINTS ------------------ */
// OBTENER LAS PELICULAS
moviesRouter.get('/', MovieController.getAll)

// CREAR UNA NUEVA PELICULA
moviesRouter.post('/', MovieController.create)

// OBTENER UNA PELICULA SEGUN SU ID
moviesRouter.get('/:id', MovieController.getById)

// ACTUALIZAR UNA PELICULA SEGUN SU ID
moviesRouter.patch('/:id', MovieController.update)

// BORRAR UNA PELICULA SEGUN SU ID
moviesRouter.delete('/:id', MovieController.delete)
