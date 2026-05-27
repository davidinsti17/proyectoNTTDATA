# Reto Proyecto NULLPOINTER - Biblioteca

Este proyecto implementa una aplicación web Full Stack utilizando **Angular** para el frontend y **Spring Boot (Java 8)** para el backend, cumpliendo con todos los requisitos del reto.

La temática elegida es **Biblioteca (Autor 1:M Libros)**.

## Requisitos Cumplidos
### Frontend
- **Angular**: Última versión con Standalone Components.
- **Signals**: Uso de Signals en `AuthorListComponent` y `AuthorDetailComponent` para la gestión de estado (`loading`, `authors`, etc.).
- **Formularios Reactivos**: Uso de `FormGroup`, `FormControl` y validaciones en la creación de Autores y Libros.
- **Servicios Angular y Observables**: Un `ApiService` que conecta con el backend.
- **Rutas**: Navegación implementada con Angular Router.
- **Estética Avanzada**: Diseño moderno con "glassmorphism", paleta de colores vibrantes y dark mode nativo (CSS).

### Backend
- **Spring Boot (Java 8)**: Versión 2.7.x compatible con Java 8.
- **API REST**: Expuesta y funcional (Autores y Libros).
- **H2 y JPA**: Base de datos en memoria y persistencia de datos.
- **Relación 1:M**: Un Autor tiene muchos Libros.
- **Datos de Ejemplo**: Script `data.sql` ejecutado al inicio para cargar datos.

## Instrucciones de Arranque

### 1. Arrancar el Backend (Spring Boot)
1. Navega a la carpeta del backend:
   ```bash
   cd backend 
   ```
2. Ejecuta la aplicación usando Maven:
   ```bash
   mvn spring-boot:run
   ```
3. El servidor backend se iniciará en `http://localhost:8080`.
4. La consola H2 está disponible en `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`, User: `sa`, sin contraseña).

### 2. Arrancar el Frontend (Angular)
1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm start
   ```
4. Accede a la aplicación en `http://localhost:4200`.

## Diseño de la API
- `GET /api/authors` - Obtiene todos los autores.
- `GET /api/authors/{id}` - Obtiene un autor y sus libros.
- `POST /api/authors` - Crea un nuevo autor.
- `GET /api/books` - Obtiene todos los libros.
- `POST /api/books` - Crea un libro asignado a un autor.
- `DELETE /api/books/{id}` - Elimina un libro.
