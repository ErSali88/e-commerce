# E-commerce de teléfonos móviles

**Proyecto académico de Desarrollo Web Full Stack (React, Node.js y MongoDB)**

- **Curso:** 2026-2027
- **Autor:** Salis Alvarez
- **Repositorio:** [ErSali88/e-commerce](https://github.com/ErSali88/e-commerce)

API REST para una tienda online de teléfonos móviles, desarrollada con Node.js, Express y MongoDB. Este repositorio contiene el backend del proyecto.

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura y estructura](#arquitectura-y-estructura)
- [Modelo de datos](#modelo-de-datos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Endpoints de la API](#endpoints-de-la-api)
- [Códigos HTTP](#códigos-http)
- [Seguridad y buenas prácticas](#seguridad-y-buenas-prácticas)
- [Pruebas](#pruebas)
- [Desarrollo por sesiones](#desarrollo-por-sesiones)
- [Decisiones de arquitectura](#decisiones-de-arquitectura)
- [Conceptos clave y preguntas frecuentes](#conceptos-clave-y-preguntas-frecuentes)
- [Conclusión](#conclusión)
- [Autor](#autor)

---

## Descripción del proyecto

Este proyecto consiste en desarrollar una API para una tienda online de teléfonos móviles. La API permite gestionar la información de los productos, las categorías y los usuarios, y sirve como parte del sistema que posteriormente podrá utilizar una aplicación web para mostrar móviles, registrar clientes y permitir que estos inicien sesión.

Incorpora registro e inicio de sesión con contraseñas protegidas mediante bcrypt y autenticación con JSON Web Tokens (JWT).

El proyecto se desarrolla con Node.js, Express, MongoDB y Mongoose. El código se organiza en capas para separar las responsabilidades: las rutas reciben las peticiones, los controladores gestionan la petición y la respuesta, los servicios contienen la lógica de negocio y los modelos definen cómo se almacenan los datos. El entorno de base de datos se ejecuta con Docker Compose.

El proyecto se ha desarrollado de forma progresiva a lo largo de siete sesiones, desde la configuración del entorno hasta la autenticación. El objetivo no es únicamente conseguir que la API funcione, sino también comprender cómo se conectan sus componentes.

### Funcionalidades principales

- CRUD de productos, categorías y usuarios.
- Relación entre productos y categorías mediante referencias de Mongoose.
- Validación de datos con esquemas de Mongoose.
- Listados con filtros, ordenación y paginación.
- Gestión centralizada de errores mediante middleware.
- Registro de usuarios con hash de contraseñas (bcrypt).
- Login y generación de tokens JWT.
- Baja lógica de usuarios.
- Entorno de base de datos reproducible con Docker Compose (MongoDB y Mongo Express).
- Arquitectura por capas: rutas, controladores, servicios y modelos.

---

## Tecnologías utilizadas

### Node.js

Permite ejecutar JavaScript fuera del navegador. En este proyecto se utiliza para ejecutar el servidor de la API.

Por ejemplo, cuando se inicia el proyecto con `npm run dev`, Node.js ejecuta el archivo de entrada del servidor y, a partir de ese momento, el servidor puede recibir peticiones HTTP.

### Express

Framework de Node.js que facilita la creación de servidores y APIs. Se utiliza para:

- Crear el servidor HTTP.
- Definir las rutas de la API.
- Recibir peticiones de clientes.
- Leer datos enviados en el cuerpo de una petición.
- Devolver respuestas con códigos HTTP y datos JSON.

Sin Express habría que gestionar manualmente muchas de estas operaciones.

### MongoDB

Base de datos utilizada para guardar la información del proyecto. A diferencia de una base de datos relacional tradicional, MongoDB almacena la información en documentos con una estructura similar a JSON, que se agrupan en colecciones. En este proyecto, los productos, las categorías y los usuarios se almacenan como documentos.

### Mongoose

Biblioteca que permite trabajar con MongoDB desde Node.js de una forma organizada. Se utiliza para:

- Definir esquemas de datos.
- Crear modelos a partir de esos esquemas.
- Validar los datos antes de guardarlos.
- Consultar documentos.
- Crear, modificar y eliminar registros.
- Definir índices para mejorar la integridad y las consultas.

### Docker y Docker Compose

Docker permite ejecutar MongoDB dentro de un contenedor sin tener que instalar el servidor de base de datos directamente en el sistema operativo. El archivo `docker-compose.yml` describe los servicios necesarios (MongoDB y Mongo Express) y permite arrancarlos conjuntamente.

### Mongo Express y MongoDB Compass

**Mongo Express** proporciona una interfaz web para consultar visualmente las bases de datos y sus colecciones. **MongoDB Compass** es una aplicación de escritorio que permite conectarse a MongoDB y revisar los documentos almacenados.

### dotenv

Carga las variables de entorno desde el archivo `.env`, de modo que la configuración sensible quede fuera del código fuente.

### Nodemon

Reinicia automáticamente el servidor durante el desarrollo cuando detecta cambios en los archivos.

### bcrypt

Protege las contraseñas de los usuarios. En lugar de guardar la contraseña original, se genera un hash. Cuando el usuario inicia sesión, se compara la contraseña que introduce con el hash almacenado.

### JSON Web Token (JWT)

Permite generar un token que representa una sesión autenticada. Después de iniciar sesión correctamente, el servidor devuelve un token al cliente, que podrá enviarlo en futuras peticiones para demostrar que ha iniciado sesión. En el proyecto se utiliza la biblioteca `jsonwebtoken`.

### Git y GitHub

Git controla las versiones del código mediante commits y GitHub aloja el repositorio remoto del proyecto.

### Postman y Thunder Client

Herramientas para probar los endpoints de la API mediante peticiones HTTP. Thunder Client se utiliza desde Visual Studio Code.

---

## Arquitectura y estructura

La API sigue una arquitectura por capas. Cada petición recorre este flujo:

```text
Cliente HTTP → Express → Routes → Controllers → Services → Models (Mongoose) → MongoDB
```

| Capa | Responsabilidad |
|---|---|
| Routes | Definen los endpoints y los asocian a su controlador |
| Controllers | Reciben la petición HTTP, llaman al servicio y construyen la respuesta |
| Services | Contienen la lógica de negocio y trabajan con los modelos |
| Models | Definen la estructura y las validaciones de los documentos |

### Estructura del proyecto

```text
e-commerce/
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   ├── Categoria.js
│   │   │   └── usuario.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── services/
│   │   │   ├── productService.js
│   │   │   └── userService.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── docker-compose.yml
└── README.md
```

### `api/src/config/`

Contiene la configuración que necesita la aplicación. El archivo `db.js` establece la conexión entre Node.js y MongoDB, de manera que la lógica de conexión no se mezcla con el código que gestiona productos, categorías o usuarios.

### `api/src/models/`

Contiene los modelos de Mongoose. Un modelo representa un tipo de documento de la base de datos: define qué campos puede tener y qué condiciones deben cumplir sus datos.

### `api/src/routes/`

Contiene las rutas de la API, un archivo por entidad. Las rutas determinan qué función se ejecuta cuando llega una petición a una dirección concreta y con un método HTTP determinado. Por ejemplo, una petición `GET` a la ruta de productos está asociada a la función que obtiene todos los productos.

### `api/src/controllers/`

Los controladores reciben la petición, llaman al servicio correspondiente y devuelven la respuesta. Su función principal es coordinar la comunicación entre la ruta, la lógica de negocio y el cliente: recibir parámetros y datos del cuerpo, devolver el código de estado HTTP y gestionar los errores.

### `api/src/services/`

Los servicios contienen la lógica de negocio. Por ejemplo, el servicio de productos busca un producto en MongoDB, crea uno nuevo o lo elimina. En el caso de usuarios, también contiene las operaciones con bcrypt y JWT. Separar esta lógica mantiene los controladores sencillos y facilita reutilizar el código.

### `api/src/index.js`

Es el punto de entrada de la API. Carga las variables de entorno, crea la aplicación Express, configura el middleware para recibir JSON, conecta con MongoDB, registra las rutas bajo sus prefijos e inicia el servidor.

### `api/package.json`

Describe el proyecto Node.js: nombre y versión, archivo principal, dependencias, dependencias de desarrollo y scripts (por ejemplo, `npm run dev`).

### `docker-compose.yml`

Define los servicios `mongo` y `mongo-express`, con sus puertos, credenciales y dependencias de ejecución.

### `api/.env`

Contiene las variables de entorno (URI de MongoDB, puerto y clave del JWT). No se sube a GitHub.

---

## Modelo de datos

| Entidad | Descripción |
|---|---|
| **Usuario** | Persona que utiliza la aplicación. Campos: `nombre`, `email` (único), `passwordHash`, `rol` y `activo` |
| **Producto** | Teléfono móvil disponible en la tienda. Hace referencia a su categoría |
| **Categoria** | Clasificación de los productos. Incluye un `slug` único |
| **Pedido** | Contemplado en el modelado del dominio (un usuario tiene varios pedidos y un pedido contiene varios productos); todavía no está implementado |

Relaciones principales:

- Un usuario puede tener varios pedidos.
- Un pedido puede contener varios productos.
- Una categoría puede estar asociada a varios productos.
- Un producto hace referencia a una categoría. Mongoose resuelve la referencia con `populate()`.

En MongoDB las relaciones se representan mediante referencias entre documentos. En el diagrama de dominio se indican las entidades, sus atributos, las relaciones y las cardinalidades: `1..1` (uno a uno), `1..N` (uno a muchos) y `N..M` (muchos a muchos).

---

## Instalación y ejecución

### Requisitos

- Node.js y npm
- Docker Desktop
- Git
- Visual Studio Code u otro editor de código
- Postman o Thunder Client
- MongoDB Compass (opcional)

### 1. Clonar el repositorio

```bash
git clone https://github.com/ErSali88/e-commerce.git
cd e-commerce
```

### 2. Iniciar MongoDB

Desde la raíz del proyecto, donde está `docker-compose.yml`:

```bash
docker compose up -d
```

El parámetro `-d` ejecuta los contenedores en segundo plano. Para comprobar que están activos:

```bash
docker ps
```

Para detener los servicios:

```bash
docker compose down
```

### 3. Instalar las dependencias

```bash
cd api
npm install
```

Este comando lee `package.json` e instala los paquetes necesarios en la carpeta `node_modules`, que no se sube a Git porque puede reconstruirse con este mismo comando.

### 4. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `api`:

```env
MONGO_URI=mongodb://<usuario>:<contraseña>@localhost:<puerto>/ecommerce?authSource=admin
PORT=3000
JWT_SECRET=<secreto_jwt>
```

Los valores de `MONGO_URI` deben coincidir con la configuración de `docker-compose.yml`. El puerto es el publicado en el ordenador, que puede ser distinto del puerto interno del contenedor (por ejemplo, `27017` dentro del contenedor publicado como `27018`).

> ⚠️ **No subas el archivo `.env` a GitHub**: contiene credenciales y secretos.

### 5. Ejecutar el servidor

```bash
npm run dev
```

Este comando ejecuta el script `dev` definido en `package.json`. Con Nodemon, el servidor se reinicia automáticamente cuando se modifican los archivos. Si la configuración es correcta, el servidor se inicia y se conecta a MongoDB. La API queda disponible en el puerto configurado, normalmente en `http://localhost:3000`.

---

## Endpoints de la API

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/products` | Obtener el listado de productos |
| `GET` | `/api/products/:id` | Obtener un producto por su ID |
| `POST` | `/api/products` | Crear un producto |
| `PUT` | `/api/products/:id` | Modificar un producto |
| `DELETE` | `/api/products/:id` | Eliminar un producto |

### Categorías

CRUD completo de categorías, definido en `api/src/routes/categoryRoutes.js`. Cada categoría tiene un `slug` único.

### Usuarios

Las rutas de usuarios cuelgan del prefijo `/api/users` y están definidas en `api/src/routes/userRoutes.js`. Incluyen el registro, la gestión de usuarios (con baja lógica mediante `activo = false`) y el login.

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/users/login` | Iniciar sesión y obtener un JWT |

Ejemplo de cuerpo de la petición de login:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu_contraseña"
}
```

### Filtros, ordenación y paginación

Los listados admiten filtros por `activo` y `nombre`, ordenación con `sort` y paginación con `page` y `limit`. El límite máximo es de 50 resultados por página.

### Autenticación

Tras un login correcto, el servidor devuelve un JWT firmado con `JWT_SECRET`, que puede incluir el identificador del usuario, su rol y la fecha de expiración. El cliente lo envía en las siguientes peticiones mediante la cabecera:

```http
Authorization: Bearer <token>
```

---

## Códigos HTTP

El middleware global de errores mantiene un formato de respuesta coherente en toda la API.

| Código | Uso |
|---|---|
| `200 OK` | Consulta o modificación completada correctamente |
| `201 Created` | Recurso creado |
| `204 No Content` | Operación completada sin contenido en la respuesta |
| `400 Bad Request` | La petición contiene datos incorrectos |
| `404 Not Found` | El recurso solicitado no existe |
| `409 Conflict` | Conflicto con los datos, como un valor único duplicado |
| `422 Unprocessable Entity` | Los datos no cumplen las validaciones |
| `500 Internal Server Error` | Error interno del servidor |

---

## Seguridad y buenas prácticas

### No publicar secretos

El archivo `.env` se mantiene fuera del repositorio, igual que `node_modules`. También deben protegerse:

- Contraseñas de MongoDB.
- Claves secretas de JWT.
- Tokens de acceso.
- Credenciales de servicios externos.

### Contraseñas

Se almacenan con bcrypt; nunca se guarda la contraseña original, solo `passwordHash`. El sistema compara la contraseña introducida con el hash almacenado, no recupera la contraseña original. El campo `passwordHash` no se incluye por defecto en las consultas de Mongoose ni en las respuestas normales.

### JWT

La clave de firma se configura mediante una variable de entorno y no se publica en el repositorio. El token no debe contener la contraseña ni su hash.

### Validar los datos en el servidor

Aunque el cliente compruebe los datos antes de enviarlos, el servidor vuelve a validarlos, porque el cliente puede ser modificado o pueden enviarse peticiones directamente a la API. Las validaciones del modelo ayudan a mantener la integridad de los documentos.

### Roles y baja lógica

- El rol se establece desde el servidor, de modo que el cliente no puede asignarse un rol privilegiado al registrarse.
- Los usuarios se marcan como inactivos (`activo = false`) en lugar de eliminarse.

### Separar responsabilidades

Mantener rutas, controladores, servicios y modelos separados facilita comprender el código y detectar errores.

---

## Pruebas

Las pruebas permiten comprobar que las operaciones funcionan y que los datos se gestionan correctamente. Se realizan con Postman y Thunder Client (colección `Ecommerce API`, con seis pruebas automáticas) y los datos se comprueban en MongoDB Compass.

### Productos

| Prueba | Qué se comprueba |
|---|---|
| Obtener productos | La API devuelve los productos existentes |
| Obtener un producto | La API devuelve el documento solicitado |
| Crear un producto válido | El producto se guarda correctamente |
| Crear un producto inválido | Las validaciones rechazan los datos |
| Modificar un producto | Los cambios quedan guardados |
| Eliminar un producto | El documento deja de estar disponible |

### Categorías

| Prueba | Qué se comprueba |
|---|---|
| CRUD de categorías | Crear, consultar, modificar y eliminar categorías |
| Slug repetido | No se permite duplicar el `slug` |
| Referencia de un producto | `populate()` devuelve la categoría asociada |

### Usuarios y autenticación

| Prueba | Qué se comprueba |
|---|---|
| Registrar usuario | Se crea el usuario |
| Registrar email repetido | No se permite duplicar el email |
| Revisar contraseña almacenada | Se almacena el hash, no el texto original |
| Respuestas de la API | `passwordHash` no se expone |
| Login con contraseña correcta | Se genera el token JWT |
| Login con contraseña incorrecta | Se rechaza la autenticación |

### Listados

| Prueba | Qué se comprueba |
|---|---|
| Filtros | Filtrar por estado `activo` y por nombre |
| Ordenación | Ordenar los resultados con `sort` |
| Paginación | Consultar distintas páginas y comprobar el límite máximo de 50 elementos |

---

## Desarrollo por sesiones

### Sesión 1. Introducción y configuración inicial del entorno

#### ¿Qué se pretende conseguir?

Definir qué aplicación se va a desarrollar y qué problema resolverá: una tienda online de móviles. Para que funcione, necesita almacenar información sobre los productos y gestionar los datos de los usuarios. Antes de programar, es importante identificar las entidades principales y las operaciones que necesitará la aplicación.

Se preparan además las herramientas de desarrollo: Node.js y npm (con nvm para gestionar versiones), Visual Studio Code con extensiones (ESLint, Prettier, GitLens, Docker y MongoDB for VSCode) y Git y GitHub para el control de versiones.

```bash
node -v
npm -v
```

```bash
git add .
git commit -m "chore: initial setup"
git push origin main
```

#### ¿Qué significa trabajar con una API?

Una API permite que dos aplicaciones se comuniquen entre ellas. El servidor no es necesariamente la página que ve el usuario: ofrece direcciones a las que una aplicación cliente puede enviar peticiones. Por ejemplo:

1. Una aplicación cliente quiere mostrar los móviles disponibles.
2. Envía una petición HTTP al servidor.
3. El servidor recibe la petición.
4. La API consulta los datos almacenados.
5. El servidor devuelve una respuesta en formato JSON.
6. La aplicación cliente utiliza esos datos para mostrar los productos.

Esta separación permite que el servidor pueda utilizarse desde diferentes clientes, como una página web o una aplicación móvil.

#### Conceptos importantes

- **Cliente:** aplicación que solicita información al servidor.
- **Servidor:** programa que recibe las peticiones y genera respuestas.
- **API:** conjunto de rutas y operaciones que permiten la comunicación.
- **Base de datos:** lugar donde se almacena la información.
- **JSON:** formato de texto utilizado habitualmente para intercambiar datos.

### Sesión 2. Docker, MongoDB y Mongo Express

#### Docker y Docker Compose

Docker permite ejecutar servicios dentro de contenedores, evitando instalar y configurar cada servicio directamente en el sistema operativo. Se comprueba la instalación con:

```bash
docker --version
docker compose version
docker run hello-world
```

Docker Compose permite definir varios servicios en `docker-compose.yml` y ejecutarlos conjuntamente. En el proyecto se utilizan dos:

- `mongo`: servidor de base de datos MongoDB.
- `mongo-express`: interfaz web para administrar MongoDB.

Esto permite que el entorno sea fácil de reproducir en otro ordenador.

#### Base de datos, colección y documento

MongoDB permite guardar los datos de la tienda para que no se pierdan cuando se detiene el servidor. En una tienda de móviles, los datos pueden incluir el nombre del producto, la marca, el precio, la descripción, el stock disponible y la información de los usuarios.

- Una **base de datos** agrupa la información de una aplicación.
- Una **colección** agrupa documentos de una misma categoría. Por ejemplo, una colección puede almacenar productos.
- Un **documento** es un registro individual. Un móvil concreto es un documento dentro de la colección de productos.

```text
MongoDB
└── ecommerce
    ├── colección de productos
    │   ├── documento de móvil 1
    │   └── documento de móvil 2
    ├── colección de categorías
    └── colección de usuarios
        └── documento de usuario
```

#### Puertos y red de Docker

Cuando se publica un puerto del contenedor, una aplicación que se ejecuta en el ordenador puede conectarse al servicio utilizando ese puerto. Es importante distinguir:

- El puerto interno del contenedor.
- El puerto publicado en el ordenador.
- El nombre del servicio dentro de la red de Docker.

Por ejemplo, si Docker publica el puerto interno `27017` como `27018` en el ordenador, una aplicación ejecutada directamente en Windows puede conectarse a `localhost:27018`. Si la API se ejecutara dentro de la misma red de Docker, normalmente utilizaría el nombre del servicio de MongoDB y su puerto interno.

#### Mongo Express y MongoDB Compass

Mongo Express permite comprobar visualmente si los datos enviados desde la API se han almacenado correctamente. MongoDB Compass permite conectarse desde una aplicación de escritorio, comprobar la conexión y visualizar los documentos.

Comandos habituales:

```bash
docker compose up -d
docker ps
docker compose down
```

### Sesión 3. Modelado del dominio y decisiones de arquitectura

Se identifican las entidades principales del e-commerce, sus atributos y las relaciones entre ellas (ver [Modelo de datos](#modelo-de-datos)): usuario, producto, categoría y pedido. Se plantea un diagrama conceptual del dominio, con sus entidades, atributos, relaciones y cardinalidades, para documentarlo antes de implementar las funcionalidades.

También se documentan las decisiones de arquitectura mediante **Architecture Decision Records (ADR)**, documentos con esta estructura:

1. **Título:** identifica la decisión.
2. **Contexto:** explica el problema o necesidad.
3. **Decisión:** describe la solución escogida.
4. **Consecuencias:** recoge ventajas y posibles inconvenientes.

Las decisiones registradas son la elección de MongoDB como base de datos y la estructura del repositorio.

### Sesión 4. Backend con Node.js, Express y Mongoose

#### Inicialización del backend

Se crea la carpeta `api` y se inicializa el proyecto Node.js:

```bash
cd api
npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
```

`package.json` describe el proyecto y sus dependencias, que son bibliotecas que añaden funcionalidades sin tener que programarlas desde cero: Express facilita la creación de rutas y Mongoose facilita el trabajo con MongoDB. El script `dev` utiliza Nodemon para reiniciar el servidor automáticamente cuando se detectan cambios.

#### Conexión con MongoDB y variables de entorno

La conexión se configura en `api/src/config/db.js`, que utiliza la URI almacenada en la variable de entorno `MONGO_URI`:

```js
mongoose.connect(process.env.MONGO_URI);
```

El archivo `.env` contiene los valores de configuración que pueden cambiar entre entornos (`MONGO_URI`, `PORT` y `JWT_SECRET`) y se carga mediante `dotenv`. No debe publicarse en GitHub.

#### Esquemas y modelos

Un **esquema** de Mongoose define la estructura que deben tener los documentos: qué campos existen, qué tipo de dato tiene cada uno, cuáles son obligatorios, qué valores están permitidos, qué límites deben respetarse y qué reglas adicionales deben cumplir. Por ejemplo, un esquema permite comprobar que el precio de un producto sea un número y que no sea negativo, evitando guardar información sin sentido para la aplicación.

El **modelo** se crea a partir del esquema y permite crear, consultar, modificar y eliminar los documentos de la colección:

- El esquema es la definición de cómo deben ser los datos.
- El modelo es la herramienta que permite trabajar con esos datos.

#### Validaciones de Mongoose

Las validaciones comprueban que los datos cumplen las condiciones definidas antes de guardarlos. Los siguientes ejemplos ilustran cada una.

##### `required`

Indica que un campo es obligatorio. Si se intenta guardar un documento sin ese campo, Mongoose genera un error de validación. Evita que existan productos sin nombre o usuarios sin los datos esenciales.

```js
nombre: {
  type: String,
  required: true
}
```

##### `unique`

Indica que un valor debe ser único dentro de la colección. En el caso del email, evita que dos usuarios tengan la misma dirección de correo.

```js
email: {
  type: String,
  unique: true
}
```

**Importante:** `unique` no es una validación normal de Mongoose. Es una opción que crea un índice único en MongoDB. Si se intenta insertar un email que ya existe, MongoDB devuelve un error de clave duplicada. Por eso depende también del índice creado en la base de datos.

##### `enum`

Limita un campo a una lista concreta de valores. Se utiliza cuando un dato tiene un conjunto limitado de opciones, como el rol de un usuario.

```js
rol: {
  type: String,
  enum: ['usuario', 'admin']
}
```

##### `match`

Comprueba que una cadena cumple una expresión regular. En este ejemplo se busca una estructura básica de email. Sirve para comprobar el formato, pero una expresión regular sencilla no garantiza que una dirección de correo exista realmente.

```js
email: {
  type: String,
  match: /.+@.+\..+/
}
```

##### `min` y `max`

Establecen límites numéricos: `min` el valor mínimo y `max` el máximo. Evitan cantidades fuera del rango que se considera válido para el campo.

```js
precio: {
  type: Number,
  min: 0,
  max: 10000
}
```

##### `minlength` y `maxlength`

Establecen la longitud mínima y máxima de una cadena. Ayudan a evitar nombres demasiado cortos o textos excesivamente largos.

```js
nombre: {
  type: String,
  minlength: 3,
  maxlength: 80
}
```

##### Validaciones personalizadas

Permiten definir una regla que no se puede expresar con las opciones anteriores. En este ejemplo, Mongoose recibe el valor del campo `codigo`, ejecuta la función `validator` y, si la condición no se cumple, genera el mensaje de error indicado.

```js
codigo: {
  type: String,
  validate: {
    validator: function (valor) {
      return valor.startsWith('MOB-');
    },
    message: 'El código debe comenzar por MOB-'
  }
}
```

#### Índices

Un índice es una estructura que MongoDB utiliza para localizar documentos de forma más eficiente o para imponer determinadas reglas. Puede mejorar el rendimiento de una consulta, aunque también ocupa espacio y añade trabajo cuando se insertan o modifican documentos. El índice único del email tiene una función especialmente importante: impedir que se almacenen dos usuarios con el mismo email.

#### ¿Por qué se valida en el modelo?

Validar en el modelo permite que las reglas se apliquen en todas las operaciones que utilicen Mongoose. Si un producto debe tener un precio positivo, esa regla no puede depender únicamente de que el formulario de la página web esté bien construido: el servidor también debe comprobar los datos, porque una petición podría enviarse sin utilizar el formulario.

### Sesión 5. Arquitectura por capas y CRUD de productos

#### ¿Qué significa CRUD?

| Operación | Significado | Método HTTP habitual |
|---|---|---|
| Create | Crear un documento | `POST` |
| Read | Consultar documentos | `GET` |
| Update | Modificar un documento | `PUT` o `PATCH` |
| Delete | Eliminar un documento | `DELETE` |

#### ¿Por qué se separan rutas, controladores y servicios?

La separación permite que cada parte tenga una responsabilidad concreta. Una petición para crear un producto sigue este recorrido:

1. El cliente envía una petición `POST`.
2. Express recibe la petición.
3. La ruta identifica qué controlador debe ejecutarse.
4. El controlador obtiene los datos enviados por el cliente.
5. El controlador llama al servicio de productos.
6. El servicio utiliza el modelo de Mongoose para guardar el producto.
7. MongoDB almacena el documento.
8. El servicio devuelve el resultado al controlador.
9. El controlador responde al cliente.

Esta organización evita que toda la lógica se concentre en un único archivo.

#### Rutas de productos

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/products` | Obtener la lista de productos |
| `GET` | `/api/products/:id` | Obtener un producto concreto |
| `POST` | `/api/products` | Crear un producto |
| `PUT` | `/api/products/:id` | Modificar un producto |
| `DELETE` | `/api/products/:id` | Eliminar un producto |

El parámetro `:id` representa el identificador del producto que se quiere consultar, modificar o eliminar.

#### Operaciones

- **Obtener todos los productos:** la ruta dirige la petición `GET` al controlador, que llama al servicio. El servicio consulta los documentos y el controlador responde con los datos. Permite que la aplicación cliente muestre el catálogo.
- **Obtener un producto por identificador:** el identificador se recibe en la URL y el servicio busca el documento correspondiente. Si el producto existe, se devuelve su información; si no, la API responde indicando que no se ha encontrado.
- **Crear un producto:** el cliente envía los datos en el cuerpo de una petición `POST`. Mongoose aplica las reglas del esquema: si los datos son válidos, se guarda el producto; si no, se produce un error de validación.
- **Modificar un producto:** la petición incluye el identificador en la URL y los nuevos datos en el cuerpo. El servicio localiza el documento y aplica los cambios, que deben seguir cumpliendo las reglas del modelo.
- **Eliminar un producto:** el cliente envía una petición `DELETE` con el identificador. El servicio busca y elimina el documento, y la respuesta indica si la operación se ha realizado correctamente.

#### Refactorización de `index.js`

El archivo principal deja de contener toda la lógica de las rutas. En su lugar, registra los módulos de rutas y monta los endpoints bajo sus prefijos, lo que permite que el proyecto crezca sin concentrar todas las funcionalidades en un único archivo.

#### ¿Qué aporta esta arquitectura?

- Mantener cada archivo más sencillo.
- Evitar repetir lógica.
- Facilitar la depuración.
- Separar la lógica de negocio de las respuestas HTTP.
- Modificar una parte del sistema sin reescribir todas las demás.

### Sesión 6. Categorías, usuarios, validaciones y paginación

#### Categorías

Se incorpora el modelo `Categoria` y un CRUD completo para gestionarlas. Cada categoría tiene un `slug` único: una versión de texto que identifica la categoría de forma legible, normalmente sin espacios. Los productos incorporan una referencia a su categoría, que Mongoose resuelve con `populate()` para obtener la información del documento relacionado en lugar de limitarse a mostrar su identificador.

#### Usuarios

Se implementa el CRUD de usuarios. El modelo contempla `nombre`, `email`, `passwordHash`, `rol` y `activo`, y se aplican estas medidas:

- Las contraseñas se guardan como hash mediante bcrypt.
- El campo `passwordHash` no se expone en las respuestas normales.
- El rol se establece desde el servidor.
- La baja de usuarios es lógica: se marca `activo = false` en lugar de eliminar el documento, lo que conserva el registro y permite distinguir usuarios activos de inactivos.

#### Middleware global de errores

Mantiene un formato de respuesta coherente cuando se produce un error y evita que cada endpoint construya respuestas de error diferentes (ver [Códigos HTTP](#códigos-http)).

#### Filtros, ordenación y paginación

- **Filtros** por estado `activo` y por nombre.
- **Ordenación** mediante `sort`, por ejemplo por nombre.
- **Paginación** con `page` (página que se consulta) y `limit` (resultados por página), con un máximo de 50. Evita devolver todos los documentos de una colección en una sola petición.

#### Pruebas

Se revisan los cinco endpoints de productos y se prepara la colección `Ecommerce API` en Thunder Client, con seis pruebas automáticas y comprobaciones en MongoDB Compass (ver [Pruebas](#pruebas)).

### Sesión 7. Registro, login, bcrypt y JWT

#### ¿Por qué no se guardan las contraseñas directamente?

Guardar contraseñas en texto plano significa que cualquier persona que consiga acceder a la base de datos podría leerlas. Por eso se utiliza hashing: un hash es el resultado de aplicar una función que transforma la contraseña en una cadena de la que no se puede recuperar directamente el texto original. En el proyecto se utiliza `bcrypt`.

#### Registro de usuarios

El flujo general del registro es:

1. El cliente envía los datos del usuario (nombre, email y contraseña).
2. El servidor recibe los datos.
3. Se comprueba que los datos necesarios estén presentes.
4. Se comprueba si el email ya está registrado.
5. `bcrypt` genera el hash de la contraseña.
6. Se guarda el usuario en MongoDB utilizando el modelo.
7. La base de datos almacena el hash, no la contraseña original.
8. El servidor devuelve una respuesta al cliente, sin incluir el hash.

#### Salt y campo `passwordHash`

bcrypt incorpora un valor aleatorio llamado **salt** durante el hashing. Por eso dos contraseñas iguales no tienen necesariamente el mismo hash almacenado, y se dificulta el uso de tablas precalculadas para atacar contraseñas. Además, el cálculo es deliberadamente costoso, lo que complica los ataques de fuerza bruta.

El campo `passwordHash` almacena el resultado del hashing; su nombre deja claro que se trata de una contraseña transformada y protegida. Se configura para no incluirse por defecto en las consultas de Mongoose, lo que evita que aparezca accidentalmente en las respuestas de la API.

#### Autenticación y login

La autenticación es el proceso mediante el cual el sistema comprueba quién es el usuario. En este proyecto, el usuario demuestra su identidad mediante el email y la contraseña. El flujo de login es:

1. El cliente envía el email y la contraseña.
2. El servidor busca el usuario por su email.
3. Se obtiene el hash de la contraseña almacenada.
4. `bcrypt` compara la contraseña introducida con el hash.
5. Si la comparación falla, el inicio de sesión se rechaza.
6. Si es correcta, el servidor genera un JWT.
7. El token se devuelve al cliente.

La contraseña no se compara mediante una igualdad directa con `passwordHash`, porque el hash no es el texto original.

```text
Cliente
  |
  | Email + contraseña
  v
Ruta de login
  |
  v
Controlador de usuario
  |
  v
Servicio de usuario
  |
  | Buscar usuario
  | Comparar contraseña con bcrypt
  | Generar JWT si es correcta
  v
MongoDB / bcrypt / JWT
  |
  v
Respuesta con el token
  |
  v
Cliente autenticado
```

#### JSON Web Token (JWT)

Después de iniciar sesión, el servidor necesita una forma de reconocer al usuario en peticiones posteriores. El JWT representa esa autenticación mediante un token firmado: el cliente puede enviarlo en futuras peticiones y el servidor puede verificar su firma y comprobar que es válido. Esto permite trabajar sin mantener una sesión tradicional en el servidor, aunque el token no es una contraseña ni debe compartirse públicamente.

**Información que puede contener (claims):**

- El identificador del usuario.
- El rol del usuario.
- La fecha de emisión.
- La fecha de expiración.

No se debe incluir la contraseña ni su hash dentro del token.

**Firma.** Permite comprobar que el token no ha sido modificado. El servidor lo firma con una clave secreta (`JWT_SECRET`) y, al recibirlo, verifica la firma. La clave debe guardarse en una variable de entorno y no publicarse en el repositorio.

**Expiración.** Un token puede tener una duración limitada. Cuando la supera, deja de ser válido y el usuario debe obtener uno nuevo. La expiración reduce el tiempo durante el cual un token comprometido podría utilizarse.

#### Autenticación y autorización

- **Autenticación:** comprobar quién es el usuario.
- **Autorización:** comprobar qué acciones puede realizar ese usuario.

Iniciar sesión identifica al usuario; decidir si puede eliminar productos o administrar otros usuarios es una cuestión de autorización.

---

## Decisiones de arquitectura

- **MongoDB:** su modelo de documentos permite almacenar información flexible y se integra bien con Node.js y Mongoose.
- **Arquitectura por capas:** reparte las responsabilidades y evita concentrar la lógica en un único archivo.
- **Docker Compose:** mantiene un entorno de base de datos reproducible.
- **Variables de entorno:** mantienen la configuración sensible fuera del código fuente.

---

## Conceptos clave y preguntas frecuentes

#### ¿Qué es Mongoose?

Es una biblioteca que permite trabajar con MongoDB desde Node.js mediante esquemas y modelos. También permite definir validaciones y realizar operaciones sobre los documentos.

#### ¿Qué diferencia hay entre un esquema y un modelo?

El esquema define la estructura y las reglas de los datos. El modelo utiliza ese esquema para crear, consultar, modificar y eliminar documentos.

#### ¿Para qué sirve `required`?

Para indicar que un campo es obligatorio y que no se debe guardar el documento sin un valor válido en ese campo.

#### ¿Para qué sirve `unique`?

Para crear un índice único que evita que existan documentos con el mismo valor en ese campo. No es una validación normal de Mongoose, sino una regla aplicada por MongoDB mediante un índice.

#### ¿Qué diferencia hay entre `min` y `minlength`?

`min` establece el valor numérico mínimo de un campo. `minlength` establece el número mínimo de caracteres de una cadena.

#### ¿Para qué sirve `enum`?

Para limitar un campo a una lista concreta de valores permitidos.

#### ¿Qué es una validación personalizada?

Es una función definida por el desarrollador que comprueba una condición específica que no se puede expresar directamente con las validaciones habituales.

#### ¿Qué significa CRUD?

Son las operaciones de crear, consultar, modificar y eliminar datos.

#### ¿Por qué se separan las rutas, los controladores y los servicios?

Porque cada parte tiene una responsabilidad diferente. Las rutas identifican la operación, los controladores gestionan la petición y la respuesta, y los servicios contienen la lógica de negocio.

#### ¿Por qué se utiliza bcrypt?

Para guardar contraseñas de forma protegida mediante hashing, evitando almacenar el texto original.

#### ¿Qué diferencia hay entre hash y cifrado?

El hashing está diseñado para ser un proceso de una sola dirección: no se recupera directamente el texto original. El cifrado, en cambio, está diseñado para que el contenido pueda recuperarse mediante una clave adecuada.

#### ¿Qué es un JWT?

Es un token firmado que puede contener información sobre la autenticación del usuario. Permite que el cliente lo envíe en futuras peticiones para que el servidor compruebe su validez.

#### ¿Qué diferencia hay entre autenticación y autorización?

La autenticación comprueba quién es el usuario. La autorización determina qué operaciones puede realizar.

---

## Conclusión

El proyecto permite comprender cómo se construye una API para una tienda online utilizando Node.js, Express y MongoDB.

A través de los modelos se define la estructura de los datos y sus validaciones. Mediante las rutas, los controladores y los servicios se organizan las operaciones de la API. Las funciones CRUD permiten gestionar los productos y las categorías, y el sistema de usuarios incorpora mecanismos para proteger las contraseñas y generar tokens de autenticación.

La separación de responsabilidades facilita el mantenimiento del código y permite ampliar el proyecto en futuras sesiones con nuevas entidades y funcionalidades.

---

## Autor

**Salis Alvarez**

Proyecto académico de Desarrollo Web Full Stack (React, Node.js y MongoDB), curso 2026-2027.

Repositorio: [https://github.com/ErSali88/e-commerce](https://github.com/ErSali88/e-commerce)
