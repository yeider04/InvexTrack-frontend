# InvexTrack Frontend

Sistema de Gestión de Inventarios - **Módulo Frontend**

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-6+-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com)

##  Descripción

Frontend del proyecto **InvexTrack**.

Este módulo consume la API REST desarrollada en Spring Boot y proporciona una interfaz moderna, responsive y fácil de usar para la gestión de:
- Productos
- Categorías
- Proveedores
- Usuarios
- Movimientos de inventario

##  Tecnologías y Herramientas

| Tecnología          | Versión | Justificación |
|---------------------|---------|---------------|
| React JS            | 18+     | Biblioteca principal para componentes reutilizables |
| Vite                | 5+      | Herramienta de construcción rápida y moderna |
| React Router DOM    | 6+      | Manejo de rutas y navegación SPA |
| Axios               | 1.6+    | Cliente HTTP para consumo de la API REST |
| CSS Modules         | Nativo  | Estilos encapsulados por componente |

## Estructura del Proyecto

```bash
invextrack-frontend/
├── src/
│   ├── components/     # Componentes globales y reutilizables
│   ├── pages/          # Páginas por módulo (Productos, Categorías, etc.)
│   ├── services/       # Servicios de conexión con la API (Axios)
│   ├── hooks/          # Hooks personalizados
│   ├── context/        # Contexto global de la aplicación
│   ├── App.jsx         # Componente raíz con rutas
│   └── main.jsx        # Punto de entrada
├── public/
└── package.json
```