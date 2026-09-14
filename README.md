# Evaluacion final curso JavaScript modulo 6, 7 y 8

## Descripción

Proyecto aplicación web con Node.js y Express

## Tecnologías

- Node.js
- Express
- JavaScript
- npm

## Instalación

npm install

## Ejecución

npm start

## Desarrollo

npm run dev

## Rutas

## GET /

Página principal de la aplicación.

### GET /status

Ruta utilizada para comprobar el estado del servidor. Devuelve una respuesta en formato JSON indicando que el servidor está funcionando correctamente.

## Justificación

### Módulo 6

- Se optó por elegir index.js porque es un nombre común en proyectos de Node.js y permite reconocer el archivo que inicia el servidor
- Para los scripts de ejecución tenemos start y dev. El script start permite iniciar el servidor en un entorno normal mediante node index.js, mientras que dev utiliza nodemon para reiniciar automáticamente el servidor cuando se realizan cambios en el archivo. Elegí estos nombres porque son ampliamente utilizados en proyectos de Node.js.

### Módulo 7

- Elegí el cliente pg porque es la herramienta que trabajamos a lo largo de varias clases y con lo que estoy más familiarizado. Además, resulta adecuado para trabajar con nuestra base de datos PostgreSQL.
- Los datos sensibles, como las credenciales para conectarse a la base de datos PostgreSQL, se almacenan en el archivo .env. Este archivo está incluido en .gitignore, por lo que no se sube al repositorio público y se evita exponer esta información.
- En la ruta de actualizar usuario decidi actualizar solo ciertos campos, como nombre y email, porque el id funciona como identificador único del registro y no debería ser modificado.
- Para evitar errores en la actualización y eliminación de usuarios, validé que primero el usuario indicado exista en la base de datos. Si el usuario no existe, la aplicación devuelve un mensaje de error y no realiza la operación.
