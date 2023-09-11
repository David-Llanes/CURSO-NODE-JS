const flag = false

const miPromesa = new Promise((resolve, reject) => {
  // Simulamos un evento asincrono
  setTimeout(() => {
    if (flag) {
      resolve('Promesa cumplida')
    } else {
      reject('Ocurrio un error...')
    }
  }, 3000)
})

// Ejecutamos la promesa.
miPromesa
  .then(resultado => console.log(resultado))
  .catch(err => console.log(err))

/* 
Si todo fue bien y pudimos resolver la promesa:
--> entrara al .then()
Pero si no se pudo resolver la promesa y se rechazó: 
--> entrara al .catch() */

// .then() puede recibir 2 callbacks, el primero seria onFullfilled y el segundo onRejected.
// De esta manera no ocupariamos el .catch()
