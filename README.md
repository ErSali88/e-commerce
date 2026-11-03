# E-commerce de teléfonos móviles

**Proyecto académico de Desarrollo Web Full Stack (React, Node.js y MongoDB)**

- **Curso:** 2026-2027
- **Autor:** Salis Alvarez
- **Repositorio:** [ErSali88/e-commerce](https://github.com/ErSali88/e-commerce)

API REST para un comercio electrónico especializado en teléfonos móviles, desarrollada con Node.js, Express y MongoDB. Este repositorio contiene el backend del proyecto.

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
- [Autor](#autor)

---

## Descripción del proyecto

La aplicación permite gestionar los productos de la tienda, organizarlos por categorías y administrar usuarios. Incorpora registro e inicio de sesión con contraseñas protegidas mediante bcrypt y autenticación con JSON Web Tokens (JWT).

El backend utiliza Node.js y Express; los datos se almacenan en MongoDB y se gestionan con Mongoose. El entorno de base de datos se ejecuta con Docker Compose. El proyecto se ha desarrollado de forma progresiva a lo largo de siete sesiones, desde la configuración del entorno hasta la autenticación.

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

| Tecnología | Función dentro del proyecto |
|---|---|
| Node.js | Ejecutar JavaScript en el servidor |
| Express | Crear el servidor HTTP y definir los endpoints |
| MongoDB | Almacenar productos, categorías y usuarios |
| Mongoose | Definir esquemas, modelos, validaciones y consultas |
| Docker y Docker Compose | Arrancar MongoDB y Mongo Express en contenedores |
| Mongo Express | Consultar y administrar la base de datos desde el navegador |
| MongoDB Compass | Revisar los documentos almacenados desde una aplicación de escritorio |
| dotenv | Cargar las variables de entorno desde `.env` |
| Nodemon | Reiniciar el servidor automáticamente durante el desarrollo |
| bcrypt | Generar y verificar hashes de contraseñas |
| jsonwebtoken | Crear y verificar tokens JWT |
| Git y GitHub | Control de versiones y repositorio remoto |
| Postman y Thunder Client | Probar los endpoints de la API |

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

### Archivos principales

| Ruta | Función |
|---|---|
| `api/src/config/db.js` | Conexión con MongoDB mediante Mongoose, con la URI leída de `MONGO_URI` |
| `api/src/models/` | Modelos de Mongoose de cada entidad |
| `api/src/routes/` | Rutas de la API, un archivo por entidad |
| `api/src/controllers/` | Controladores que gestionan las peticiones y las respuestas |
| `api/src/services/` | Lógica de negocio; en usuarios, también bcrypt y JWT |
| `api/src/index.js` | Punto de entrada: carga las variables de entorno, crea la aplicación Express, conecta con MongoDB, registra las rutas e inicia el servidor |
| `api/package.json` | Dependencias y scripts (por ejemplo, `npm run dev`) |
| `docker-compose.yml` | Servicios `mongo` y `mongo-express`, con sus puertos y credenciales |

---

## Modelo de datos

| Entidad | Descripción |
|---|---|
| **Usuario** | Persona que utiliza la aplicación. Campos: `nombre`, `email` (único), `passwordHash`, `rol` y `activo` |
| **Producto** | Teléfono móvil disponible en la tienda. Hace referencia a su categoría |
| **Categoria** | Clasificación de los productos. Incluye un `slug` único |
| **Pedido** | Contemplado en el modelado del dominio (un usuario tiene varios pedidos y un pedido contiene varios productos); todavía no está implementado |

Relaciones principales:

- Una categoría puede estar asociada a varios productos.
- Un producto hace referencia a una categoría. Mongoose resuelve la referencia con `populate()`.

---

## Instalación y ejecución

### Requisitos

- Node.js y npm
- Docker Desktop
- Git
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

Comprobar que los contenedores están activos:

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

### 4. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `api`:

```env
MONGO_URI=<uri_de_conexion>
PORT=3000
JWT_SECRET=<secreto_jwt>
```

Los valores de `MONGO_URI` deben coincidir con la configuración de `docker-compose.yml`.

> ⚠️ **No subas el archivo `.env` a GitHub**: contiene credenciales y secretos.

### 5. Ejecutar el servidor

```bash
npm run dev
```

La API queda disponible en el puerto configurado, normalmente en `http://localhost:3000`.

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

- **Contraseñas:** se almacenan con bcrypt; nunca se guarda la contraseña original, solo `passwordHash`.
- **`passwordHash`:** no se incluye por defecto en las consultas de Mongoose ni en las respuestas normales.
- **JWT:** la clave de firma se configura mediante una variable de entorno y no se publica en el repositorio.
- **Variables de entorno:** las credenciales de MongoDB y los secretos se mantienen en `.env`, que está excluido de Git junto con `node_modules`.
- **Roles:** el rol se establece desde el servidor, de modo que el cliente no puede asignarse un rol privilegiado al registrarse.
- **Baja lógica:** los usuarios se marcan como inactivos (`activo = false`) en lugar de eliminarse.
- **Validaciones:** los datos se validan antes de almacenarse.
- **Separación de responsabilidades:** rutas, controladores, servicios y modelos tienen funciones diferenciadas.

---

## Pruebas

Las pruebas se realizan con Postman y Thunder Client (colección `Ecommerce API`, con seis pruebas automáticas), y los datos se comprueban en MongoDB Compass.

**Productos y categorías**

- Crear, consultar, modificar y eliminar productos y categorías.
- Comprobar la unicidad del `slug`.
- Verificar la referencia de un producto a su categoría con `populate()`.
- Comprobar los cambios en MongoDB.

**Usuarios y autenticación**

- Registrar un usuario y comprobar que la contraseña se almacena como hash.
- Comprobar que `passwordHash` no se expone en las respuestas.
- Verificar el login correcto y la generación del JWT.
- Verificar que un login incorrecto se rechaza.

**Listados**

- Filtrar por estado `activo` y por nombre.
- Ordenar resultados y consultar distintas páginas.
- Comprobar el límite máximo de 50 elementos.

---

## Desarrollo por sesiones

### Sesión 1. Configuración inicial del entorno

Preparación de las herramientas de desarrollo: Node.js y npm (con nvm para gestionar versiones), Visual Studio Code con extensiones (ESLint, Prettier, GitLens, Docker y MongoDB for VSCode), y Git y GitHub para el control de versiones. Se inicia la documentación del proyecto con un README.

```bash
node -v
npm -v
```

### Sesión 2. Docker, MongoDB y Mongo Express

Creación de un entorno de base de datos contenido y reproducible. Con Docker Compose se definen los servicios `mongo` (MongoDB, base de datos NoSQL orientada a documentos) y `mongo-express` (interfaz web para consultar colecciones y documentos). La conexión también se comprueba con MongoDB Compass.

### Sesión 3. Modelado del dominio

Identificación de las entidades del e-commerce (usuario, producto, categoría y pedido), sus atributos y sus relaciones, que en MongoDB se representan mediante referencias entre documentos. Se documentan las decisiones de arquitectura mediante ADR (título, contexto, decisión y consecuencias).

### Sesión 4. Backend con Node.js, Express y Mongoose

Se crea la carpeta `api`, se inicializa el proyecto y se instalan las dependencias:

```bash
cd api
npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
```

La conexión con MongoDB se separa en `api/src/config/db.js` y utiliza la variable `MONGO_URI`:

```js
mongoose.connect(process.env.MONGO_URI);
```

Los esquemas de Mongoose definen la estructura de los documentos y sus validaciones: `required`, `unique`, `enum`, `match`, `min` y `max`, `minlength` y `maxlength`, y validaciones personalizadas. También se crean índices, como el índice único sobre el email.

### Sesión 5. Arquitectura por capas y CRUD de productos

Se separan las responsabilidades en rutas, controladores, servicios y modelos, y se implementa el CRUD de productos (consulta de listado y por ID, creación, modificación y eliminación). El archivo `api/src/index.js` deja de contener la lógica de las rutas y se limita a registrar los módulos de rutas bajo sus prefijos.

### Sesión 6. Categorías, usuarios, validaciones y paginación

- CRUD de categorías con `slug` único y relación con los productos mediante `populate()`.
- CRUD de usuarios con contraseñas en hash, rol establecido desde el servidor y baja lógica.
- Middleware global de errores con códigos HTTP coherentes.
- Listados con filtros, ordenación (`sort`) y paginación (`page` y `limit`, máximo 50).
- Colección de pruebas `Ecommerce API` en Thunder Client.

### Sesión 7. Registro, login, bcrypt y JWT

El registro guarda en `passwordHash` el hash generado con bcrypt, nunca la contraseña original. bcrypt incorpora una sal y un cálculo costoso, lo que dificulta los ataques de fuerza bruta.

Flujo de login:

1. Se reciben el email y la contraseña.
2. Se busca el usuario en MongoDB.
3. Se obtiene el hash almacenado.
4. bcrypt compara la contraseña recibida con el hash.
5. Si las credenciales son correctas, se genera un JWT.
6. El servidor devuelve el resultado del login y el token.

---

## Decisiones de arquitectura

- **MongoDB:** su modelo de documentos permite almacenar información flexible y se integra bien con Node.js y Mongoose.
- **Arquitectura por capas:** reparte las responsabilidades y evita concentrar la lógica en un único archivo.
- **Docker Compose:** mantiene un entorno de base de datos reproducible.
- **Variables de entorno:** mantienen la configuración sensible fuera del código fuente.

---

## Autor

**Salis Alvarez**

Proyecto académico de Desarrollo Web Full Stack (React, Node.js y MongoDB), curso 2026-2027.

Repositorio: [https://github.com/ErSali88/e-commerce](https://github.com/ErSali88/e-commerce)
