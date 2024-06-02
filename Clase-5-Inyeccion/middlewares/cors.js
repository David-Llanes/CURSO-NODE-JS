import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS...'))
    },
  })

/* 
  IMPORTANTE
    Es buena idea que corsMiddleware sea una funcion que regresa la funcion que devuelve cors(), para poder personalizarlo si queremos desde fuera.
    En este caso la estamos personalizando con ACCEPTED_ORIGINS

    NOTA:
    con { acceptedOrigins = ACCEPTED_ORIGINS } = {}
    estamos diciendo que corsMiddleware acepta un objeto, que por default esta vacio {}, pero nosotros le estamos asignando un valor en acceptedOrigins = ACCEPTED_ORIGINS
*/
