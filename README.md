# E-commerce Full Stack

Proyecto de desarrollo de una tienda online de teléfonos móviles, realizado con tecnologías Full Stack. La aplicación utiliza React para la parte visual, Node.js y Express para la API y MongoDB como base de datos.

**Autor:** Salis Alvarez

## 1. Tecnologías utilizadas

### Backend
- Node.js: entorno de ejecución de JavaScript.
- Express: creación y gestión de rutas de la API REST.
- MongoDB: base de datos NoSQL.
- Mongoose: modelado de datos y conexión con MongoDB.
- bcrypt: protección de contraseñas mediante hash.
- JSON Web Token (JWT): autenticación mediante Access Tokens y Refresh Tokens.
- dotenv: gestión de variables de entorno.
- CORS: permite la comunicación entre el frontend y el backend.

### Frontend
- React: desarrollo de la interfaz de usuario.
- Vite: creación y ejecución del proyecto React.
- React Router DOM: navegación entre las diferentes páginas.
- Bootstrap: diseño y estilos de la aplicación.
- Fetch API: comunicación con el backend mediante peticiones HTTP.

### Herramientas
- Visual Studio Code.
- Git y GitHub.
- Docker Desktop.
- MongoDB.
- Thunder Client.
- Mongo Express.

## 2. Estructura del proyecto

El proyecto está dividido en dos partes principales para separar la lógica del servidor de la interfaz visual.

```text
e-commerce/
│
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── userController.js
│   │   │   └── authController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   ├── Categoria.js
│   │   │   ├── usuario.js
│   │   │   └── Tokens.js
│   │   │
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── authRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── productService.js
│   │   │   ├── categoryService.js
│   │   │   ├── userService.js
│   │   │   └── token/
│   │   │       └── tokenService.js
│   │   │
│   │   ├── utils/
│   │   └── index.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend-react/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 3. Desarrollo del proyecto por sesiones

### Sesiones 1-4. Preparación del entorno y comienzo del proyecto

- Instalación y configuración de Node.js y npm.
- Preparación de Visual Studio Code y extensiones.
- Configuración de Git y GitHub.
- Inicio de la estructura del proyecto E-commerce.
- Preparación del entorno de desarrollo y las herramientas necesarias.

### Sesión 5. Arquitectura por capas y CRUD de productos

Se organiza el backend utilizando una arquitectura por capas para separar las responsabilidades de la aplicación.

- Creación de rutas, controladores y servicios.
- Implementación del CRUD de productos.
- Operaciones GET, POST, PUT y DELETE.
- Separación de la lógica de negocio y la gestión de peticiones HTTP.

El flujo de funcionamiento es:

```text
Petición HTTP
     |
     v
   RUTA
     |
     v
CONTROLADOR
     |
     v
  SERVICIO
     |
     v
   MODELO
     |
     v
  MongoDB
```

### Sesión 6. CRUD de categorías y usuarios

Se amplía la API con nuevas entidades y funcionalidades.

**Categorías:**
- Creación del modelo Categoria.
- Implementación del CRUD.
- Validación de slug único.
- Relación entre productos y categorías mediante referencias de Mongoose.
- Utilización de populate() para obtener los datos relacionados.

**Usuarios:**
- Creación del modelo Usuario.
- Implementación de operaciones CRUD.
- Protección de contraseñas mediante bcrypt.
- Ocultación del campo passwordHash en las respuestas.
- Asignación del rol desde el servidor.
- Baja lógica de usuarios mediante el campo activo.

**Validaciones y errores:**
- Validaciones de datos mediante Mongoose.
- Middleware global para gestionar errores.
- Respuestas HTTP coherentes.
- Filtros, ordenación y paginación en los listados.

### Sesión 7. CRUD y comprobaciones de productos

Se trabaja en la revisión de las operaciones CRUD de productos y en la comprobación de su funcionamiento.

- Creación de productos.
- Consulta de productos.
- Modificación de productos.
- Eliminación de productos.
- Comprobación de las operaciones mediante Thunder Client y MongoDB.

### Sesión 8. Autenticación con JWT y Refresh Tokens

Se implementa un sistema de autenticación para gestionar las sesiones de los usuarios.

**Access Token:**
- Se genera al iniciar sesión.
- Tiene una duración corta.
- Permite acceder a las rutas protegidas.

**Refresh Token:**
- Tiene una duración superior.
- Permite renovar los tokens de acceso.
- Se almacena en MongoDB mediante su hash.

**Rotación segura:**
- Cada renovación genera un nuevo Refresh Token.
- El token anterior queda revocado.
- Se controla la reutilización de tokens antiguos.
- Se permite cerrar sesiones mediante la revocación de tokens.

**Middleware de autenticación:**
- Comprueba la existencia del Bearer Token.
- Verifica su firma y caducidad.
- Permite controlar el acceso a rutas protegidas.

### Sesión 9. Creación del frontend con React y Vite

Se crea la parte visual de la tienda, separada del backend.

- Creación del proyecto mediante Vite.
- Instalación de React Router DOM.
- Configuración de la navegación.
- Creación de las páginas Home, Login y Register.
- Instalación de Bootstrap para los estilos.

Se establecen las siguientes rutas:

| Ruta | Página |
|---|---|
| `/` | Página principal |
| `/login` | Inicio de sesión |
| `/register` | Registro |

### Sesión 10. Diseño y conexión del frontend con el backend

Se mejora la interfaz visual de la tienda y se conectan los formularios con la API.

**Página principal:**
- Diseño de la página de inicio.
- Banner principal de la tienda.
- Sección de productos destacados.
- Tarjetas de productos con imágenes y precios.
- Navegación y pie de página.

**Registro de usuarios:**
- Formulario con nombre, email y contraseña.
- Envío de los datos al backend mediante una petición POST.
- Creación del usuario en MongoDB.
- Gestión de mensajes de éxito y error.

**Inicio de sesión:**
- Formulario de autenticación.
- Envío de credenciales al backend.
- Comprobación de email y contraseña.
- Recepción del Access Token y Refresh Token.
- Almacenamiento de los tokens en Local Storage.
- Gestión de credenciales incorrectas mediante mensajes de error.

**Comunicación entre frontend y backend:**
- Configuración de CORS.
- Creación del servicio `api.js`.
- Utilización de Fetch API para realizar peticiones HTTP.

## 4. API REST: principales endpoints

### Productos

Base: `/api/products`

| Método | Operación |
|---|---|
| GET | Consultar productos |
| GET | Consultar un producto |
| POST | Crear un producto |
| PUT | Modificar un producto |
| DELETE | Eliminar un producto |

### Categorías

Base: `/api/categories`

| Método | Operación |
|---|---|
| GET | Consultar categorías |
| GET | Consultar una categoría |
| POST | Crear una categoría |
| PUT | Modificar una categoría |
| DELETE | Eliminar una categoría |

### Usuarios

Base: `/api/users`

| Método | Operación |
|---|---|
| GET | Consultar usuarios |
| GET | Consultar un usuario |
| POST | Registrar un usuario |
| PUT | Modificar un usuario |
| DELETE | Desactivar un usuario |

### Autenticación

Base: `/api/auth`

| Método | Endpoint | Función |
|---|---|---|
| POST | `/login` | Iniciar sesión |
| POST | `/refresh` | Renovar los tokens |
| POST | `/logout` | Cerrar sesión |
| GET | `/profile` | Consultar perfil mediante autenticación |

## 5. Instalación y ejecución del proyecto

### Requisitos previos

- Node.js y npm instalados.
- Docker Desktop.
- Visual Studio Code.
- Git.

### 5.1. Iniciar MongoDB con Docker

Desde la carpeta principal del proyecto:

```bash
docker compose up -d
```

El archivo docker-compose configura MongoDB y Mongo Express.

Puertos utilizados:

| Servicio | Puerto |
|---|---|
| MongoDB | 27018 |
| Mongo Express | 8082 |

### 5.2. Configurar el backend

Entrar en la carpeta de la API:

```bash
cd api
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` con las variables necesarias:

```env
MONGO_URI=mongodb://localhost:27018/ecommerce
PORT=3000

JWT_ACCESS_SECRET=tu_clave_secreta_access
JWT_REFRESH_SECRET=tu_clave_secreta_refresh
```

Las claves JWT deben sustituirse por valores largos, aleatorios y diferentes. No se deben subir al repositorio.

Iniciar el servidor:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

### 5.3. Configurar el frontend

Abrir una segunda terminal y entrar en:

```bash
cd frontend-react
```

Instalar las dependencias:

```bash
npm install
```

Iniciar React:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## 6. Pruebas realizadas

Las pruebas del backend se realizan mediante Thunder Client y las comprobaciones de los datos mediante MongoDB.

Se comprueban:

- Operaciones CRUD de productos, categorías y usuarios.
- Validaciones de los modelos.
- Registro de usuarios.
- Protección de contraseñas mediante bcrypt.
- Inicio de sesión con credenciales correctas e incorrectas.
- Generación de Access Tokens y Refresh Tokens.
- Acceso a rutas protegidas.
- Renovación de tokens.
- Rechazo de Refresh Tokens antiguos.
- Cierre de sesión y revocación de tokens.
- Registro de usuarios y autenticación desde React.

## 7. Herramientas de administración

**Thunder Client:** permite enviar peticiones HTTP a la API y comprobar las respuestas de los endpoints.

**MongoDB / Mongo Express:** permite revisar las colecciones y comprobar que los datos se guardan correctamente.

**Docker Desktop:** permite ejecutar los servicios de MongoDB y Mongo Express mediante contenedores.

## 8. Seguridad y configuración

Los archivos y datos sensibles no deben publicarse en GitHub.

Se deben excluir, como mínimo:

```gitignore
node_modules/
dist/
.env
```

Las contraseñas se almacenan mediante bcrypt y los Refresh Tokens se guardan mediante hashes. Las claves JWT deben mantenerse en variables de entorno.

## 9. Autor y repositorio

**Autor:** Salis Alvarez

**Repositorio GitHub:** https://github.com/ErSali88/e-commerce/

**Proyecto:** E-commerce Full Stack - Tienda online de teléfonos móviles.
