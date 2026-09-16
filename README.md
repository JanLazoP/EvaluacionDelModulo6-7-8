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

### POST /login

Ruta utilizada para autenticar al usuario y generar un token JWT.

El body debe contener las credenciales:

{
"usuario": "admin",
"password": "1234"
}

Una vez validada las credenciales, la API devuelve un token JWT con una duración de una hora la cual debera indicarse en el encabezado Authorization con el formato Authorization: Bearer Token. Esta autenticación sera necesaria para acceder a las rutas DELETE /usuarios/:id y DELETE /pedidos/:id

### GET /

Página principal de la aplicación.

### GET /status

Ruta utilizada para comprobar el estado del servidor. Devuelve una respuesta en formato JSON indicando que el servidor está funcionando correctamente.

### GET /usuarios

Ruta utilizada para consultar los usuarios.

### POST /usuarios

Ruta utilizada para agregar un usuario a la base de datos. El body debe contener los campos nombre y email.

### PUT /usuarios/:id

Ruta utilizada para actualizar un usuario mediante su id. El body de la solicitud debe contener los campos nombre y email.

### DELETE /usuarios/:id

Ruta utilizada para eliminar un usuario mediante su id. Requiere autenticación mediante JWT.

### GET /pedidos

Ruta utilizada para consultar los pedidos.

### POST /pedidos

Ruta utilizada para ingresar pedidos a la base de datos. El body de la solicitud debe contener los campos descripcion, monto y usuario_id

### PUT /pedidos/:id

Ruta utilizada para actualizar un pedido mediante su id. El body de la solicitud debe contener los campos descripcion y monto.

### DELETE /pedidos/:id

Ruta utilizada para eliminar un pedido mediante su id. Requiere autenticación mediante JWT.

### POST /upload

Ruta utilizada para subir archivos a la carpeta uploads. Solo se admiten archivos tipo .jpeg, .png, .pdf, .txt, .doc y .docx.

### POST /usuarios/con-pedido

Ruta utilizada para agregar un usuario y un pedido. El body debe contener los campos nombre, email, descripcion y monto.

### GET /usuarios-orm

Ruta utilizada para consultar los usuarios de la base de datos utilizando Sequelize como ORM.

### GET /usuarios-con-pedidos

Ruta que devuelve los usuarios con sus pedidos relacionados mediante una relación ORM.

## Justificaciones

### Módulo 6

- Se optó por elegir index.js porque es un nombre común en proyectos de Node.js y permite reconocer el archivo que inicia el servidor
- Para los scripts de ejecución tenemos start y dev. El script start permite iniciar el servidor en un entorno normal mediante node index.js, mientras que dev utiliza nodemon para reiniciar automáticamente el servidor cuando se realizan cambios en el archivo. Elegí estos nombres porque son ampliamente utilizados en proyectos de Node.js.

### Módulo 7

- Elegí el cliente pg porque es la herramienta que trabajamos a lo largo de varias clases y con lo que estoy más familiarizado. Además, resulta adecuado para trabajar con nuestra base de datos PostgreSQL.
- Los datos sensibles, como las credenciales para conectarse a la base de datos PostgreSQL, se almacenan en el archivo .env. Este archivo está incluido en .gitignore, por lo que no se sube al repositorio público y se evita exponer esta información.
- En la ruta de actualizar usuario decidi actualizar solo ciertos campos, como nombre y email, porque el id funciona como identificador único del registro y no debería ser modificado.
- Para evitar errores en la actualización y eliminación de usuarios, validé que primero el usuario indicado exista en la base de datos. Si el usuario no existe, la aplicación devuelve un mensaje de error y no realiza la operación.
- La ventaja que encontre usando ORM frente al cliente SQL como pg es que ORM permite trabajar con los datos mediante modelos y métodos de JavaScript, reduciendo la cantidad de consultas SQL que se deben escribir manualmente. Esto facilita la lectura y organización del código.

### Módulo 8

#### Paso 2

- Decidí separar rutas y controladores por entidad, Usuario y Pedido. Esto para lograr un código más modular y organizado.
- Las validaciones que realicé consistieron en comprobar que los datos ingresados no estuvieran vacíos, ya que esto podría generar conflictos con los atributos NOT NULL. También validé la existencia del usuario o pedido antes de modificar o eliminar.

#### Paso 4

- Decidí porteger las rutas DELETE /usuarios/:id y DELETE /pedidos/:id porque permiten eliminar información de la base de datos. Con el token estas operaciones requieren que el usuario se haya autenticado como administrador. De todas maneras protegí esas 2 a modo de prueba ya que depende mucho de la logica de negocio, por mi parte dejaria accesible solo consultar usuarios y pedidos, como hay algunos casos dondes protegeriamos todas las consultas y operaciones.
- El token es generado por el servidor al realizar el login con las credenciales correctas. El usuario posteriormente envía ese token en el encabezado Authorization de las solicitues protegidas, utilizando el formato Bearer token.
