# Todo App Backend - Clean Architecture

Una aplicación de tareas (Todo App) desarrollada con **Clean Architecture**, **Firebase Functions**, **Express.js** y **TypeScript**.

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Clean Architecture** organizado en capas:

- **Domain Layer**: Entidades y casos de uso de negocio
- **Infrastructure Layer**: Implementaciones de datos, repositorios y servicios externos
- **API Layer**: Controladores, rutas y middlewares

## 🚀 Tecnologías

- **Firebase Functions** - Serverless backend
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Firestore** - Base de datos NoSQL
- **Joi** - Validación de esquemas
- **Jest** - Testing framework

## 📋 Instalación

```bash
# Clonar el repositorio
git clone <https://github.com/Andresoto/todoapp-backend>
cd todoapp-backend/functions

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run serve

# Desplegar a Firebase
npm run deploy
```

## 🧪 Testing

```bash
# Ejecutar pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar en modo watch
npm run test:watch
```

## 📡 API Documentation

### Base URL
```
https://api-bwdmdhdcyq-uc.a.run.app
```

### Headers Requeridos
```
Content-Type: application/json
user-id: <user-id>  // Requerido para endpoints de tareas
```

---

## 🔐 Authentication Endpoints

### POST /auth/login

Iniciar sesión con email existente.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Responses:**

✅ **200 OK** - Usuario encontrado
```json
{
  "id": "user-id-123",
  "email": "user@example.com",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

❌ **404 Not Found** - Usuario no existe
```json
{
  "message": "User not found"
}
```

❌ **400 Bad Request** - Email inválido
```json
{
  "message": "Invalid email format"
}
```

---

### POST /auth/register

Registrar un nuevo usuario.

**Request:**
```json
{
  "email": "newuser@example.com"
}
```

**Responses:**

✅ **201 Created** - Usuario creado exitosamente
```json
{
  "id": "user-id-456",
  "email": "newuser@example.com",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

❌ **400 Bad Request** - Usuario ya existe
```json
{
  "message": "User already exists"
}
```

❌ **400 Bad Request** - Email inválido
```json
{
  "message": "Invalid email format"
}
```

---

## 📝 Tasks Endpoints

### GET /tasks

Obtener todas las tareas del usuario autenticado.

**Headers:**
```
user-id: <user-id>
```

**Responses:**

✅ **200 OK** - Lista de tareas
```json
[
  {
    "id": "task-id-123",
    "userId": "user-id-123",
    "title": "Completar documentación",
    "description": "Escribir la documentación de la API",
    "completed": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": "task-id-456",
    "userId": "user-id-123",
    "title": "Revisar código",
    "description": "Hacer code review del proyecto",
    "completed": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
]
```

❌ **400 Bad Request** - User ID requerido
```json
{
  "message": "User ID is required"
}
```

---

### POST /tasks

Crear una nueva tarea.

**Headers:**
```
user-id: <user-id>
```

**Request:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea (opcional)",
  "completed": false
}
```

**Validation Rules:**
- `title`: **Requerido**, string de 3-100 caracteres
- `description`: **Opcional**, string máximo 500 caracteres
- `completed`: **Opcional**, boolean (default: false)

**Responses:**

✅ **201 Created** - Tarea creada exitosamente
```json
{
  "id": "task-id-789",
  "userId": "user-id-123",
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

❌ **400 Bad Request** - Datos de validación
```json
{
  "message": "Validation failed: \"title\" is required"
}
```

---

### PATCH /tasks/:id

Actualizar una tarea existente.

**Headers:**
```
user-id: <user-id>
```

**Request:**
```json
{
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "completed": true
}
```

**Validation Rules:**
- `title`: **Opcional**, string de 3-100 caracteres
- `description`: **Opcional**, string máximo 500 caracteres
- `completed`: **Opcional**, boolean

**Responses:**

✅ **200 OK** - Tarea actualizada exitosamente
```json
{
  "id": "task-id-123",
  "userId": "user-id-123",
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "completed": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

❌ **400 Bad Request** - Tarea no encontrada
```json
{
  "message": "Task not found"
}
```

❌ **400 Bad Request** - ID requerido
```json
{
  "message": "Invalid request id is required"
}
```

---

### DELETE /tasks/:id

Eliminar una tarea.

**Responses:**

✅ **200 OK** - Tarea eliminada exitosamente
```json
{
  "message": "Task deleted successfully"
}
```

❌ **400 Bad Request** - Tarea no encontrada
```json
{
  "message": "Task not found"
}
```

❌ **400 Bad Request** - ID requerido
```json
{
  "message": "Task ID is required"
}
```

---

## 📊 Error Responses

### Errores Comunes

**400 Bad Request**
```json
{
  "message": "Validation failed: [campo] is required"
}
```

**404 Not Found**
```json
{
  "message": "Route not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```


---

## 🗂️ Estructura del Proyecto

```
functions/src/
├── api/                          # Capa de API
│   ├── controllers/              # Controladores HTTP
│   │   ├── auth.controller.ts
│   │   └── tasks.controller.ts
│   ├── middlewares/              # Middlewares
│   │   ├── error.handler.ts
│   │   └── validator.handler.ts
│   ├── routes/                   # Definición de rutas
│   │   ├── auth.router.ts
│   │   └── tasks.router.ts
│   └── schemas/                  # Esquemas de validación
│       ├── auth.schema.ts
│       └── task.schema.ts
├── domain/                       # Capa de Dominio
│   ├── entities/                 # Entidades de negocio
│   │   ├── task.ts
│   │   └── user.ts
│   ├── repositories/             # Interfaces de repositorios
│   │   ├── task.repository.ts
│   │   └── user.repository.ts
│   └── usecases/                 # Casos de uso
│       ├── auth/
│       │   ├── login.usecase.ts
│       │   └── register.usecase.ts
│       └── tasks/
│           ├── create-task.usecase.ts
│           ├── delete-task.usecase.ts
│           ├── get-tasks.usecase.ts
│           └── update-task.usecase.ts
├── infrastructure/               # Capa de Infraestructura
│   ├── config/                   # Configuraciones
│   │   └── firebase.ts
│   ├── container/                # Inyección de dependencias
│   │   └── dependencies.ts
│   ├── datasources/              # Fuentes de datos
│   │   ├── firebase-task.datasource.ts
│   │   ├── firebase-user.datasource.ts
│   │   ├── task.datasource.ts
│   │   └── user.datasource.ts
│   ├── repositories/             # Implementaciones de repositorios
│   │   ├── task.repository.impl.ts
│   │   └── user.repository.impl.ts
│   └── validators/               # Validadores
│       └── joiRequest.validator.ts
├── shared/                       # Utilidades compartidas
│   ├── errors/                   # Clases de error
│   │   ├── bad-request.ts
│   │   └── http-error.ts
│   ├── helpers/                  # Funciones utilitarias
│   │   ├── date.helper.ts
│   │   └── firestore.helper.ts
│   └── interfaces/               # Interfaces compartidas
│       └── request.validator.ts
└── __tests__/                    # Pruebas unitarias
    ├── domain/usecases/          # Tests de casos de uso
    ├── helpers/                  # Utilidades de testing
    └── mocks/                    # Mocks para testing
```

---

## ⚙️ Scripts Disponibles

```bash
npm run build          # Compilar TypeScript
npm run build:watch    # Compilar en modo watch
npm run serve          # Ejecutar emulador local
npm run deploy         # Desplegar a Firebase
npm run test           # Ejecutar pruebas
npm run test:coverage  # Ejecutar pruebas con cobertura
npm run test:watch     # Ejecutar pruebas en modo watch
```

---

## 🔒 Consideraciones de Seguridad

- Validación de entrada en todos los endpoints
- Manejo de errores centralizado
- Headers de user-id requeridos para operaciones de tareas
- Validación de formato de email

---
