const express = require('express')
const cursos = require('./datos/cursos.json')
// Extraemos los routers y sus manejadores de rutas y despues los importamos
const { routerProgramacion } = require('./routers/programacion.js')
const { routerMatematicas } = require('./routers/matematicas.js')

const PORT = process.env.PORT ?? 3000

// Creamos una aplicacion Express
const app = express()

// Usamos los routers que creamos
app.use('/api/cursos/programacion', routerProgramacion)
app.use('/api/cursos/matematicas', routerMatematicas)

/* ROUTING */
app.get('/', (req, res) => {
  res.send('Mi primer servidor con Express...')
})

app.get('/api/cursos', (req, res) => {
  //res.send(cursos)
  res.send('<button type="button">Hola</button>')
})

// Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

/* NOTAS IMPORTANTES
res.send() es inteligente. Puede reibir un Buffer, un objeto, un array, un string y va a configurar el TIPO DE CONTENIDO AUTOMATICAMENTE... EJEMPLOS:
- res.send('<button type="button">Hola</button>') : envia un boton real de html, convierte el string a un elemento de html

- res.send({some: 'example}) : envia un objeto de javascript como texto plano, en formato JSON. Asi que no es necesario usar res.send(JSON.stringify(cursos)), puede ser simplemente res.send(cursos)

- res.status(404).send('Sorry') : envia texto plano


SI QUEREMOS ENVIAR JSON ES MAS PROBABLE QUE VAYAMOS A TRABAJAR CON 
res.json() en lugar de res.send()
- Detras de esenas llama JSON.srtringify() para cualquier argumento que reciba 


SI QUEREMOS TERMINAR LA RESPUESTA Y ENVIARLA VACIA PODEMOS USAR
res.end()
- Sirve por ejemplo para controlar situaciones donde la ruta que se solicta no existe. 


*/
