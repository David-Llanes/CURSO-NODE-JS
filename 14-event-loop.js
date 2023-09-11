/*
  --> EL EVENT LOOP GESTIONA LAS TAREAS Y LAS AÑADE A LA CALLSTACK segun su prioridad
*/

// Codigo sincronico de JS
console.log('Tarea 1')

// Se ejecuta lo mas pronto posible, ya que termina con todo lo demas.
setImmediate(() => console.log('SetImmediate'))

//
setTimeout(() => {
  console.log('TimeOut')
}, 3000)

// No son parte de JS - Tiene prioridad sobre los timeouts
Promise.resolve().then(() => console.log('Microtarea 1. Promise y then'))

// Codigo sincronico de JS
console.log('Tarea 2')

// No son parte de JS - Tiene prioridad sobre los timeouts
Promise.resolve().then(() => console.log('Microtarea 2. Promise y then'))

/* WEB APIS - NO SON PARTE DE JAVASCRIPT
  -setTimeOut
  -setInterval
  -fetch
  -Promises
  -Intersection Observer
*/

/* MICROTAREAS
  -Callbacks de promesas
  -async await
*/

/* PRIORIDAD DE EJECUCION DE TAREAS 
  1: Tareas de JS (se guardan en la callstack y se resuelven inmediatamente)
  2: Microtareas
  3: Tareas de la webAPI
*/
