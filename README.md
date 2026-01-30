# Booking Management API 🚀

[Castellano](#castellano) | [English](#english)

---

## Castellano

Servicio Backend construido con **NestJS**, diseñado para la gestión de locales, recursos y reservas, con un fuerte enfoque en seguridad, escalabilidad e integridad de datos.

### Características Principales

- **Lógica de Reservas**: Algoritmo personalizado para detectar y prevenir el solapamiento de reservas en tiempo real.
- **Seguridad**: 
  - Autenticación basada en JWT con Passport.js.
  - Control de Acceso basado en Roles (RBAC) mediante decoradores y guards personalizados.
  - Hash de contraseñas con Bcrypt.
  - Seguridad en cabeceras HTTP mediante Helmet.
- **Gestión de Locales**: Creación de locales complejos con múltiples recursos anidados (pistas, salas, mesas) en una única transacción ACID.
- **Frontend Moderno**: Interfaz de usuario minimalista y elegante construida con Vanilla JS y CSS (Glassmorphism), totalmente integrada con la API.
- **Documentación Automática**: Interfaz Swagger interactiva para pruebas y exploración de la API.
- **Infraestructura**: Entorno dockerizado tanto para la API como para la base de datos PostgreSQL.
- **Integración CI/CD**: Flujos de trabajo automatizados mediante GitHub Actions (Linting, Build, Testing).

### Tecnologías

- **Core**: [NestJS](https://nestjs.com/) (TypeScript)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Documentación**: [Swagger / OpenAPI](https://swagger.io/)
- **DevOps**: [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions)
- **Seguridad**: [Passport.js](https://www.passportjs.org/), [JWT](https://jwt.io/), [Helmet](https://helmetjs.github.io/)

### Arquitectura

El proyecto sigue el patrón de **Arquitectura Modular** de NestJS:

- `src/auth`: Seguridad, estrategias JWT y Guards.
- `src/users`: Gestión de usuarios y roles.
- `src/venues`: Agrupación lógica de Locales y Recursos.
- `src/bookings`: Lógica de negocio principal y detección de colisiones.
- `src/common`: Filtros globales y utilidades compartidas.

### Primeros Pasos

#### Requisitos

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- Node.js v20+ (si se ejecuta localmente)

#### Opción 1: Inicio Rápido con Docker (Recomendado)

1. Clonar el repositorio.
2. Ejecutar el entorno:
   ```bash
   docker-compose up --build
   ```
3. La API estará disponible en `http://localhost:3000/api/v1`.

#### Opción 2: Desarrollo Local

1. Instalar dependencias: `npm install`
2. Configurar el archivo `.env`.
3. Ejecutar migraciones de Prisma: `npx prisma migrate dev`
4. Iniciar el servidor: `npm run start:dev`

### Documentación de la API

Una vez que el servidor esté funcionando, puedes acceder a la documentación interactiva en:
👉 **`http://localhost:3000/docs`**

---

## English

Backend service built with **NestJS**, designed to manage venues, resources, and bookings with a heavy focus on security, scalability, and data integrity.

### Key Features

- **Advanced Booking Logic**: Custom algorithm to detect and prevent overlapping bookings for the same resource in real-time.
- **Security**: 
  - JWT-based authentication with Passport.js.
  - Role-Based Access Control (RBAC) using custom decorators and guards.
  - Password hashing with Bcrypt.
  - HTTP Header security via Helmet.
- **Venue Management**: Create complex venues with multiple nested resources (courts, rooms, tables) in a single ACID transaction.
- **Modern Frontend**: Minimalist and elegant UI built with Vanilla JS and CSS (Glassmorphism), fully integrated with the API.
- **Auto-Generated Documentation**: Fully interactive Swagger UI for seamless API testing and exploration.
- **Infrastructure**: Dockerized environment for both the API and PostgreSQL database.
- **CI/CD Integration**: Automated quality gates using GitHub Actions (Linting, Build, Testing).

### Tech Stack

- **Core**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Documentation**: [Swagger / OpenAPI](https://swagger.io/)
- **DevOps**: [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions)
- **Security**: [Passport.js](https://www.passportjs.org/), [JWT](https://jwt.io/), [Helmet](https://helmetjs.github.io/)

### Architecture

The project follows the **Modular Architecture** pattern of NestJS:

- `src/auth`: Security, JWT strategies, and Guards.
- `src/users`: User management and role assignment.
- `src/venues`: Venue and Resource logical grouping.
- `src/bookings`: Core business logic including collision detection.
- `src/common`: Global filters and shared utilities.

### Getting Started

#### Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- Node.js v20+ (if running locally)

#### Option 1: Quick Start with Docker (Recommended)

1. Clone the repository.
2. Run the environment:
   ```bash
   docker-compose up --build
   ```
3. The API will be available at `http://localhost:3000/api/v1`.

#### Option 2: Local Development

1. Install dependencies: `npm install`
2. Configure your `.env` file.
3. Run Prisma migrations: `npx prisma migrate dev`
4. Start the server: `npm run start:dev`

### API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
👉 **`http://localhost:3000/docs`**