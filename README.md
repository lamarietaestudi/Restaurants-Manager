# Restaurants Manager

## Description

Restaurants Manager es una aplicación de backend para gestionar restaurantes, permitiendo a los usuarios consultar la carta de platos de dichos restaurantes, sus ingredientes (incluidos los alérgenos), y su ubicación.

## Tecnologías utilizadas

Backend: Node.js, Express.
BBDD: MongoDB.
Dependencias: bcrypt, dotenv, express, jsonwebtoken, mongoose.
Dev Dependencias: nodemon.

## Instalación
Para clonar y ejecutar esta aplicación se necesita Git y Node.js (que incluye npm) instalados en tu dispositivo.
- Clonar el repositorio: git clone https://github.com/lamarietaestudi/Restaurants-Manager.git
- Acceder al directorio del proyecto: cd Restaurants-Manager
- Instalar dependencias: npm install
- Ejecutar la aplicación: npm run start

## Uso
Una vez que la aplicación esté ejecutándose, se accede a ella mediante `http://localhost:3000`

## Scripts disponibles
- npm run start: inicia la aplicación.
- npm run dev: inicia la aplicación en modo desarrollo con nodemon.
- npm run dishesSeed: carga en la BBDD datos de platos.
- npm run usersSeed: carga en la BBDD datos de usuarios.
- npm run restaurantsSeed: carga en la BBDD datos de restaurantes.

## EndPoints

### Colección Usuarios (Users)


| Método  | URL         | Descripción | Permisos |
|---------|------------|-------------|----------|
| **GET**  | `/users` | Carga a todos los usuarios de la BBDD | Administrador |
| **POST** | `/register` | Registrarse en la BBDD | Cualquier usuario |
| **POST** | `/login` | Acceder a la BBDD con usuario y contraseña | Usuario registrado |
| **PUT**  | `/users/:id` | Actualiza los datos de un usuario | Usuario registrado y administrador |
| **DELETE** | `/users/:id` | Borra un usuario de la BBDD | Usuario registrado y administrador |

### Colección Restaurantes (Restaurants)

| Método  | URL                         | Descripción | Permisos |
|---------|-----------------------------|-------------|----------|
| **GET**  | `/restaurants` | Carga todos los restaurantes de la BBDD | Cualquier usuario |
| **GET**  | `/restaurants/not-verified` | Carga los restaurantes pendientes de verificación | Usuario registrado y administrador |
| **POST** | `/restaurants` | Guarda un nuevo restaurante en la BBDD | Usuario registrado y administrador |
| **PUT**  | `/restaurants/:id` | Actualiza los datos de un restaurante | Administrador |
| **DELETE** | `/restaurants/:id` | Borra un restaurante de la BBDD | Administrador |

### Colección Platos (Dishes)
| Método  | URL                      | Descripción | Permisos |
|---------|--------------------------|-------------|----------|
| **GET**  | `/dishes` | Carga todos los platos de la BBDD | Cualquier usuario |
| **GET**  | `/dishes/not-verified` | Carga los platos pendientes de verificación | Usuario registrado y administrador |
| **POST** | `/dishes` | Guarda un nuevo plato en la BBDD | Usuario registrado y administrador |
| **PUT**  | `/dishes/:id` | Actualiza los datos de un plato | Administrador |
| **DELETE** | `/dishes/:id` | Borra un plato de la BBDD | Administrador |

## Aviso Legal

### Proyecto Práctico

Este proyecto es una práctica personal y no representa un producto comercial. Está destinado a la demostración de habilidades técnicas y el aprendizaje.
