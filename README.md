# Restaurants Manager

## Description

Colecciones: usuarios, restaurantes, platos.
Incluye endpoints para crear, leer, modificar y borrar todas las colecciones (CRUD) en función de los permisos del rol de usuario.

## EndPoints

### Colección Usuarios (Users)

Método: GET
URL: /users
Descripción: carga a todos los usuarios de la BBDD.
Permisos: administrador

Método: POST
URL: /register
Descripción: Registrarse en la BBDD.
Permisos: cualquier usuario.

Método: POST
URL: /login
Descripción: Acceder a la BBDD con nombre de usuario y contraseña, previo registro.
Permisos: usuario registrado.

Método: PUT
URL: /users/:id
Descripción: actualiza los datos registrados de un usuario.
Permisos: usuario registrado y administrador.

Método: DELETE
URL: /users/:id
Descripción: borra un usuario de la BBDD.
Permisos: usuario registrado y administrador.

---

### Colección Restaurantes (Restaurants)

Método: GET
URL: /restaurants
Descripción: carga todos los restaurantes de la BBDD.
Permisos: cualquier usuario.

Método: GET
URL: /restaurants/not-verified
Descripción: carga los restaurantes que los usuarios registrados hayan guardado en la BBDD (no visibles hasta que el administrador verifique que son correctos).
Permisos: usuario registrado y administrador.

Método: POST
URL: /restaurants
Descripción: guarda un nuevo restaurante en la BBDD. Si lo hace un usuario registrado quedará como pendiente hasta que el adminitrador verifique que es correcto y lo haga visible. Si lo hace el administrador es visible automáticamente.
Permisos: usuario registrado y administrador.

Método: PUT
URL: /restaurants/:id
Descripción: actualiza los datos de un restaurante.
Permisos: administrador.

Método: DELETE
URL: /restaurants/:id
Descripción: borra un restaurante de la BBDD.
Permisos: administrador.

---

### Colección Platos (Dishes)

Método: GET
URL: /dishes
Descripción: carga todos los platos de la BBDD.
Permisos: cualquier usuario.

Método: GET
URL: /dishes/not-verified
Descripción: carga los platos que los usuarios registrados hayan guardado en la BBDD (no visibles hasta que el administrador verifique que son correctos).
Permisos: usuario registrado y administrador.

Método: POST
URL: /dishes
Descripción: guarda un nuevo plato en la BBDD. Si lo hace un usuario registrado quedará como pendiente hasta que el adminitrador verifique que es correcto y lo haga visible. Si lo hace el administrador es visible automáticamente.
Permisos: usuario registrado y administrador.

Método: PUT
URL: /dishes/:id
Descripción: actualiza los datos de un plato.
Permisos: administrador.

Método: DELETE
URL: /dishes/:id
Descripción: borra un plato de la BBDD.
Permisos: administrador.

---

## Aviso Legal

### Proyecto Práctico

Este proyecto es una práctica personal y no representa un producto comercial. Está destinado a la demostración de habilidades técnicas y el aprendizaje.
