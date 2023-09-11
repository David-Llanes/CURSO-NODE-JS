--> ¿Como instalo un paquete?

- npm install express

--> ¿Como desinstalo un paquete?

- npm uninstall express

--> ¿Cómo instalo una version específica?

- Con @: npm install express@4.15.1

--> ¿Cómo instalo todas las dependencias indicadas en package.json?

- npm install

---

** ¿Qué contiene este directorio? **

--> node_modules:

- Contiene todos los paquetes que se instalaron para poder instalar express. Este directorio tiene todos loa paquetes y modulos que podremos importar.

--> package-lock.json:

- Se genera automaticamente cuando npm modifica el arbol de node_modules o package.json.
- Tiene informacion sobre el paquete (mi-paquete-2) y ademas los cambios y modificaciones que se le han hecho a este paquete.
- Describe el arbol de dependencias generado para que futuras instalaciones tengan exactamente el mismo arbol, es decir, para que otros desarrolladores puedan instalar exactamente las mismas dependencias que nosotros.

--> package.json

- Es el archivo que creamos con 'npm init', contiene informacion sobre nuestro paquete (mi-paquete-2) y sus dependencias que instalamos directamente.
- Por ejemplo, podemos ver que en package.json se agrego esto al instalar express:
  "dependencies": {
  "express": "^4.18.2"
  }
- Esto quiere decir que ahora express es una dependencia de nuestro paquete (mi-paquete-2)
- Si alguien mas instala nuestro paquete, tambien estaria instalando express ya que esta marcada como dependencia de nuestro paquete.
