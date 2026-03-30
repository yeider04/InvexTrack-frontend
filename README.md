#  InvexTrack Frontend

> Frontend del Sistema de Gestión de Inventarios **InvexTrack**, desarrollado con React JS + Vite.  
> Consume la API REST de InvexTrack (Spring Boot) para gestionar productos, categorías, proveedores, usuarios y movimientos de almacén.

---

##  Descripción del Proyecto

InvexTrack Frontend es la interfaz web del sistema de gestión de inventarios InvexTrack. Permite a los usuarios gestionar de forma visual e intuitiva todos los recursos del sistema: productos, categorías, proveedores, usuarios y movimientos de inventario.

La interfaz consume directamente la API REST del backend desarrollado en Java con Spring Boot, usando Axios para las peticiones HTTP. Toda la navegación es del tipo SPA (Single Page Application), lo que significa que no hay recargas de página al cambiar de módulo.

**Características principales:**
- CRUD completo para todos los módulos (Crear, Leer, Actualizar, Eliminar)
- Navegación entre módulos sin recargar la página
- Formularios con validación de campos requeridos
- Confirmación antes de eliminar cualquier registro
- Mensajes de retroalimentación en cada operación
- Indicador de carga mientras se consulta la API
- Diseño limpio y responsivo

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React JS | 18+ | Biblioteca principal para construcción de la interfaz |
| Vite | 5+ | Herramienta de construcción y servidor de desarrollo |
| React Router DOM | 6+ | Manejo de rutas y navegación SPA |
| Axios | 1.6+ | Cliente HTTP para consumir la API REST |
| CSS (inline styles) | Nativo | Estilos encapsulados por componente |

---

##  Requisitos Previos

Antes de instalar el frontend, asegúrate de tener lo siguiente:

- **Node.js** versión 18 o superior  
  Verifica con: `node --version`

- **npm** versión 9 o superior (viene con Node.js)  
  Verifica con: `npm --version`

- **API InvexTrack** (backend) corriendo en `http://localhost:8080`  
  El frontend no funcionará si el backend no está activo.  
  Repositorio del backend: [InvexTrack API](https://github.com/yeider04/InvexTrack)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/yeider04/InvexTrack-Frontend.git
cd InvexTrack-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando descarga todas las librerías necesarias definidas en `package.json` dentro de la carpeta `node_modules/`.

### 3. Verificar la URL de la API

La URL base de la API está configurada en `src/services/api.js`. Por defecto apunta a:

```
http://localhost:8080/api/v1
```

Si tu backend corre en un puerto diferente, edita ese archivo:

```js
// src/services/api.js
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambia aquí si es necesario
});
```

### 4. Verificar CORS en el backend

Para que el frontend pueda comunicarse con el backend, el proyecto Spring Boot debe tener configurado CORS. Verifica que exista el archivo `CorsConfig.java` en el backend que permita el origen `http://localhost:5173`.

---

##  Cómo Ejecutar el Proyecto

### Paso 1 — Inicia el backend primero

Desde la carpeta del proyecto InvexTrack (Spring Boot):

```bash
./mvnw spring-boot:run
```

Espera a ver el mensaje `Started ApiApplication` en la consola.

### Paso 2 — Inicia el frontend

Desde la carpeta del proyecto InvexTrack-Frontend:

```bash
npm run dev
```

### Paso 3 — Abre el navegador

```
http://localhost:5173
```

El sistema te redirige automáticamente al módulo de Productos.

---

##  Estructura del Proyecto

```
InvexTrack-Frontend/
├── index.html                  → Archivo HTML principal
├── vite.config.js              → Configuración de Vite
├── package.json                → Dependencias y scripts del proyecto
├── .gitignore                  → Archivos excluidos de Git
├── README.md                   → Documentación del proyecto
├── Repositorio.txt             → Enlace al repositorio
└── src/
    ├── main.jsx                → Punto de entrada de React
    ├── App.jsx                 → Enrutador principal con todas las rutas
    ├── index.css               → Estilos globales y variables CSS
    │
    ├── components/             → Componentes reutilizables
    │   ├── Navbar.jsx          → Barra de navegación superior
    │   ├── Sidebar.jsx         → Panel lateral con módulos
    │   ├── Layout.jsx          → Estructura general de todas las páginas
    │   ├── DataTable.jsx       → Tabla de datos genérica y reutilizable
    │   ├── Modal.jsx           → Ventana modal para formularios
    │   ├── ConfirmDialog.jsx   → Diálogo de confirmación antes de eliminar
    │   ├── LoadingSpinner.jsx  → Indicador de carga durante peticiones HTTP
    │   ├── AlertMessage.jsx    → Mensajes de éxito, error o advertencia
    │   └── PageHeader.jsx      → Encabezado de página con título y botón
    │
    ├── pages/                  → Páginas principales por módulo
    │   ├── ProductosPage.jsx   → Gestión completa de productos
    │   ├── CategoriasPage.jsx  → Gestión de categorías
    │   ├── ProveedoresPage.jsx → Gestión de proveedores
    │   ├── UsuariosPage.jsx    → Gestión de usuarios del sistema
    │   └── MovimientosPage.jsx → Registro de movimientos de inventario
    │
    └── services/               → Capa de conexión con la API REST
        ├── api.js              → Configuración base de Axios
        ├── productoService.js  → Peticiones HTTP del módulo Productos
        ├── categoriaService.js → Peticiones HTTP del módulo Categorías
        ├── proveedorService.js → Peticiones HTTP del módulo Proveedores
        ├── usuarioService.js   → Peticiones HTTP del módulo Usuarios
        └── movimientoService.js→ Peticiones HTTP del módulo Movimientos
```

---

##  Módulos del Sistema

###  Productos
Módulo principal del sistema. Permite registrar todos los productos del inventario con su categoría, proveedor, stock y precios.

| Operación | Descripción |
|---|---|
| Listar | Muestra todos los productos con categoría y proveedor |
| Crear | Formulario con nombre, SKU, cantidad, precios, categoría y proveedor |
| Editar | Modifica cualquier campo del producto seleccionado |
| Eliminar | Elimina el producto previa confirmación |

###  Categorías
Datos maestros para clasificar los productos. Se deben crear antes de registrar productos.

| Operación | Descripción |
|---|---|
| Listar | Muestra todas las categorías disponibles |
| Crear | Registra una nueva categoría con nombre y descripción |
| Editar | Modifica el nombre o descripción de una categoría |
| Eliminar | Elimina la categoría (los productos quedan sin categoría) |

###  Proveedores
Gestión de los proveedores que suministran los productos del inventario.

| Operación | Descripción |
|---|---|
| Listar | Muestra todos los proveedores con contacto y dirección |
| Crear | Registra un nuevo proveedor |
| Editar | Modifica los datos de contacto del proveedor |
| Eliminar | Elimina el proveedor del sistema |

###  Usuarios
Gestión del personal con acceso al sistema. Cada usuario tiene un rol asignado.

| Operación | Descripción |
|---|---|
| Listar | Muestra todos los usuarios con su rol |
| Crear | Registra un usuario con correo, contraseña y rol (ADMINISTRADOR u OPERARIO) |
| Editar | Modifica los datos del usuario |
| Eliminar | Elimina el usuario del sistema |

###  Movimientos de Inventario
Registro histórico de entradas y salidas de productos del almacén.

| Operación | Descripción |
|---|---|
| Listar | Muestra el historial completo con tipo, cantidad, producto y fecha |
| Registrar | Crea un movimiento de tipo ENTRADA o SALIDA |
| Eliminar | Elimina un registro del historial |

> **Nota:** Los movimientos no se pueden editar. Si se cometió un error, se elimina y se registra nuevamente.

---

##  Componentes Principales

### DataTable.jsx
Tabla genérica y reutilizable que se usa en todos los módulos. Recibe las columnas y los datos como props, lo que permite adaptarla a cualquier módulo sin duplicar código.

```jsx
<DataTable
  columns={COLUMNAS}   // Definición de columnas
  data={productos}     // Array de datos a mostrar
  loading={loading}    // Muestra spinner si es true
  onEdit={handleEditar}
  onDelete={handleEliminar}
/>
```

### Modal.jsx
Ventana superpuesta para mostrar formularios de creación y edición sin abandonar la página actual.

```jsx
<Modal
  isOpen={modalAbierto}
  onClose={() => setModalAbierto(false)}
  title="Nuevo Producto"
>
  {/* Formulario aquí */}
</Modal>
```

### AlertMessage.jsx
Muestra mensajes de retroalimentación que desaparecen automáticamente después de 4 segundos.

```jsx
<AlertMessage
  tipo="success"              // success | error | warning
  mensaje="Producto creado."
  onClose={() => setAlerta(null)}
/>
```

---

##  Conexión con la API

Todos los módulos se comunican con el backend a través de la capa de servicios en `src/services/`. Cada servicio encapsula las llamadas HTTP de su módulo usando Axios.

**Ejemplo — productoService.js:**

```js
const productoService = {
  getAll:  ()           => api.get('/productos'),
  getById: (id)         => api.get(`/productos/${id}`),
  create:  (data)       => api.post('/productos', data),
  update:  (id, data)   => api.put(`/productos/${id}`, data),
  delete:  (id)         => api.delete(`/productos/${id}`),
};
```

**Endpoints consumidos:**

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/productos` | Listar productos |
| POST | `/api/v1/productos` | Crear producto |
| PUT | `/api/v1/productos/{id}` | Actualizar producto |
| DELETE | `/api/v1/productos/{id}` | Eliminar producto |
| GET | `/api/v1/categorias` | Listar categorías |
| POST | `/api/v1/categorias` | Crear categoría |
| PUT | `/api/v1/categorias/{id}` | Actualizar categoría |
| DELETE | `/api/v1/categorias/{id}` | Eliminar categoría |
| GET | `/api/v1/proveedores` | Listar proveedores |
| POST | `/api/v1/proveedores` | Crear proveedor |
| PUT | `/api/v1/proveedores/{id}` | Actualizar proveedor |
| DELETE | `/api/v1/proveedores/{id}` | Eliminar proveedor |
| GET | `/api/v1/usuarios` | Listar usuarios |
| POST | `/api/v1/usuarios` | Registrar usuario |
| PUT | `/api/v1/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/v1/usuarios/{id}` | Eliminar usuario |
| GET | `/api/v1/movimientos` | Listar movimientos |
| POST | `/api/v1/movimientos` | Registrar movimiento |
| DELETE | `/api/v1/movimientos/{id}` | Eliminar movimiento |

---

##  Estándares de Codificación

El proyecto sigue las convenciones estándar de React y JavaScript:

- **Componentes:** `PascalCase` → `ProductosPage`, `DataTable`, `ConfirmDialog`
- **Variables y funciones:** `camelCase` → `cargarDatos()`, `handleEditar()`, `modalAbierto`
- **Archivos de componentes:** `PascalCase.jsx` → `Modal.jsx`, `Sidebar.jsx`
- **Archivos de servicios:** `camelCase` → `productoService.js`, `api.js`
- **Constantes:** `UPPER_SNAKE_CASE` → `COLUMNAS`, `FORM_INICIAL`
- **Comentarios:** Todos los componentes tienen JSDoc al inicio describiendo su propósito y props

---

##  Repositorio del Backend

El backend de InvexTrack está desarrollado en Java con Spring Boot y expone la API REST que consume este frontend.

**Repositorio:** https://github.com/yeider04/InvexTrack

**Requisitos del backend para que el frontend funcione:**
1. MySQL corriendo con la base de datos `invextrack_db`
2. Spring Boot levantado en el puerto `8080`
3. Clase `CorsConfig.java` configurada para permitir `http://localhost:5173`