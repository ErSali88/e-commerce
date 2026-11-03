# 📱 E-commerce de móviles

API REST para una tienda online especializada en la venta de teléfonos móviles, desarrollada con **Node.js, Express y MongoDB**. Incluye gestión de productos (CRUD), registro y login de usuarios con contraseñas cifradas y autenticación mediante **JWT**.

Proyecto académico del ciclo de Desarrollo de Aplicaciones Web (DAW), módulo de Desarrollo Web Full Stack. Se desarrolla de forma progresiva a lo largo de siete sesiones (ver [Desarrollo por sesiones](#desarrollo-por-sesiones)).

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Endpoints de la API](#endpoints-de-la-api)
- [Seguridad](#seguridad)
- [Pruebas](#pruebas)
- [Desarrollo por sesiones](#desarrollo-por-sesiones)
- [Autor](#autor)

---

## Funcionalidades

- CRUD completo de productos (crear, consultar, modificar y eliminar).
- Registro de usuarios con contraseña cifrada (bcrypt).
- Inicio de sesión con generación de token JWT.
- Arquitectura por capas: rutas, controladores, servicios y modelos.
- Base de datos MongoDB en contenedor Docker, con Mongo Express para administrarla desde el navegador.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **Node.js** | Entorno de ejecución de JavaScript |
| **Express** | Framework para desarrollar la API REST |
| **MongoDB** | Base de datos NoSQL |
| **Mongoose** | Modelado de datos y conexión entre Node.js y MongoDB |
| **Docker y Docker Compose** | Configuración y ejecución del entorno de base de datos |
| **Mongo Express** | Interfaz web para consultar y administrar MongoDB |
| **dotenv** | Gestión de variables de entorno |
| **Nodemon** | Reinicio automático del servidor durante el desarrollo |
| **bcrypt** | Cifrado de contraseñas |
| **JSON Web Token (JWT)** | Generación de tokens para la autenticación |
| **Postman / Thunder Client** | Pruebas de los endpoints de la API |

---

## Estructura del proyecto

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
│   │   │   └── usuario.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
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

La API sigue una arquitectura por capas para separar responsabilidades:

| Capa | Responsabilidad |
|---|---|
| **Routes** | Definición de las rutas de la API |
| **Controllers** | Gestión de las peticiones HTTP y las respuestas |
| **Services** | Lógica de negocio y operaciones sobre los datos |
| **Models** | Definición de los modelos de MongoDB con Mongoose |

---

## Instalación y ejecución

### Requisitos

- Node.js y npm
- Docker Desktop
- Git
- Un cliente HTTP para probar la API (Postman, Thunder Client…)

### 1. Clonar el repositorio

```bash
git clone https://github.com/ErSali88/e-commerce.git
cd e-commerce
```

### 2. Arrancar MongoDB

Desde la raíz del proyecto, donde está `docker-compose.yml`:

```bash
docker compose up -d
```

Comprobar que los contenedores están activos:

```bash
docker ps
```

### 3. Instalar las dependencias de la API

```bash
cd api
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `api` con este contenido:

```env
MONGO_URI=mongodb://<usuario>:<contraseña>@localhost:<puerto>/ecommerce?authSource=admin
PORT=3000
JWT_SECRET=<secreto_jwt>
```

Los valores de `MONGO_URI` deben coincidir con los configurados en `docker-compose.yml`.

> ⚠️ **No subas el archivo `.env` a GitHub**: contiene credenciales y secretos.

### 5. Iniciar el servidor

```bash
npm run dev
```

La API queda disponible en el puerto configurado, normalmente en:

```text
http://localhost:3000
```

---

## Endpoints de la API

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/products` | Obtener los productos |
| POST | `/api/products` | Crear un producto |
| PUT | `/api/products/:id` | Modificar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

### Usuarios

Las rutas de usuarios cuelgan del prefijo `/api/users` e incluyen la gestión de usuarios, el registro y el inicio de sesión.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/users/login` | Iniciar sesión y obtener un JWT |

Ejemplo de cuerpo de la petición de login:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu_contraseña"
}
```

---

## Seguridad

- Las contraseñas se almacenan cifradas con bcrypt; nunca se guarda la contraseña original, solo el campo `passwordHash`.
- El campo `passwordHash` no se incluye por defecto en las consultas.
- La autenticación se realiza mediante JWT, firmado con una clave definida en las variables de entorno.
- Las claves y credenciales se configuran con variables de entorno.
- El archivo `.env` y la carpeta `node_modules` están excluidos de Git.

---

## Pruebas

Las funcionalidades de la API se comprueban mediante peticiones HTTP, y permiten verificar:

- La conexión con MongoDB.
- La creación, consulta, modificación y eliminación de productos.
- El registro de usuarios y el hash de las contraseñas.
- El inicio de sesión y la generación del JWT.

---

## Desarrollo por sesiones

| Sesión | Tema | Qué se trabaja |
|---|---|---|
| 1 | Introducción y configuración inicial | Temática del e-commerce, entorno de desarrollo, estructura inicial y tecnologías |
| 2 | MongoDB con Docker | Servicio MongoDB y Mongo Express con Docker Compose, puertos, credenciales y conexión con MongoDB Compass |
| 3 | Conexión de la API con MongoDB | Conexión con Mongoose y configuración mediante variables de entorno (`.env`) |
| 4 | Modelos de datos | Modelos `Producto` y `Usuario` con sus campos y validaciones |
| 5 | Arquitectura por capas y CRUD de productos | Separación en routes, controllers, services y models; endpoints de productos |
| 6 | Gestión de usuarios | Modelo de usuario (`nombre`, `email`, `passwordHash`, `rol`, `activo`), servicios y controladores |
| 7 | Registro, login y autenticación | Hash de contraseñas con bcrypt, login y generación de JWT |

### Flujo de login (sesión 7)

1. Se reciben el email y la contraseña.
2. Se busca el usuario en MongoDB.
3. Se obtiene el hash de la contraseña.
4. Se compara la contraseña recibida con el hash mediante bcrypt.
5. Se comprueba que el usuario puede iniciar sesión.
6. Se genera un JWT firmado con `JWT_SECRET`, que puede incluir el identificador del usuario y su rol.

---

## Autor

**Salis Alvarez**

Proyecto académico del ciclo de Desarrollo de Aplicaciones Web (DAW).
