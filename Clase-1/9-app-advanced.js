const fs = require('node:fs/promises')
const path = require('node:path')

async function ls(folder) {
  let files

  try {
    // Intentamos obtener los ficheros dentro del directorio
    files = await fs.readdir(folder)
  } catch (err) {
    // Si hay un error lo imprimimos y cancelamos todo
    console.log(`No se pudo leer el directorio ${folder}.`)
    process.exit(1)
  }

  // Se obtuvo files. Hacemos un map para obtener un array de promesas. Será un array de promesas proque el codigo que se ejecutada dentro del callback es async
  const filesPromises = files.map(async file => {
    // Creamos el filePath de cada fichero uniendo el directorio y file
    const filePath = path.join(folder, file)
    let stats

    // Probando que map hace todo en paralelo
    console.log('----')

    // Intentamos recuperar la informacion del archivo
    try {
      stats = await fs.stat(filePath)
      // Probando que map hace todo en paralelo
      console.log('stats')
    } catch (err) {
      console.log(`No se pudo leer el archivo ${file}.`)
      process.exit(1)
    }

    // Se pudo obtener la informacion del archivo
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    // Retornamos un string con la informacion a mostrar
    return `${fileType} ${file.padEnd(35)} ${fileSize
      .toString()
      .padStart(10)} ${fileModified}`
  })

  // Resolvemos todas las promesas del array filesPromises que mapeamos. NOTA: Promise.all(--array de promesas--)
  const filesInfo = await Promise.all(filesPromises)

  // filesInfo es un array de strings.
  filesInfo.forEach(file => console.log(file))
}

// Hacemos la llamada a la funcion asincrona ls()
const folder = process.argv[2] ?? '.'
ls(folder)

/* IMPORTANTISIMO 
.map(async()=>{}) LO HACE TODO EN PARALELO. No esta esperando que se resuelva un await para seguir con el siguiente. 

EL MAPEO OCURRE EN PARALELO. NO MAPEA UNO Y ESPERA EL ASYNC AWAIT. VA EJECUTANDO TODOS AL MISMO TIEMPO

SI QUISIERAMOS QUE FUERA SECUENCIAL, DEBEMOS UTILIZAR EL CICLO FOR OF...


ESTO ES PORQUE FOR OF itera sobre cada uno de los elementos, uno por uno y MAP crea un array a partir de otro array y lo mapea todo a la vez, es decir, hasta no haber recorrido ya el array entero no regresa nada. 
*/
