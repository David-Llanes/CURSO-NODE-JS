const path = require('node:path')

// Saber la barra separadora de carpetas segun el S.O
console.log(path.sep)

// Unir ritas con path.join para que funcione en cualquier S.O
const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath) // content/subfolder/text.txt -> la / cambiaria con cad S.O

// Obtener el nombre del fichero a partir de una ruta
const base = path.basename('/cjs/index.js')
console.log(base) // index.js
const base2 = path.basename('/cjs/index.js', '.js')
console.log(base2) // index -> de esta manera le quita el sufijo .js

// Obtener la extension de un fichero
const extension = path.extname('image.jpg')
console.log(extension) // .jpg
