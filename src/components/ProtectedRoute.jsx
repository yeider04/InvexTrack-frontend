// src/components/ProtectedRoute.jsx
// Componente que protege las rutas privadas.
// Si el usuario NO está autenticado, lo redirige al /login.
// Úsalo en App.jsx envolviendo las rutas que requieren autenticación.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Ruta protegida: solo accesible si hay sesión activa.
 * @param {React.ReactNode} children - Componente hijo a renderizar
 * @param {string} [rolRequerido] - Opcional: 'ADMINISTRADOR' o 'OPERARIO'
 */
function ProtectedRoute({ children, rolRequerido }) {
  const { usuario, estaAutenticado } = useAuth();

  // 1. Si no está autenticado → redirige al login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si se requiere un rol específico y el usuario no lo tiene → acceso denegado
  if (rolRequerido && usuario?.rol !== rolRequerido) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif'
      }}>
        <h2 style={{ color: '#e74c3c' }}>Acceso Denegado</h2>
        <p>No tienes permisos para ver esta sección.</p>
      </div>
    );
  }

  // 3. Todo OK → renderiza la página
  return children;
}

export default ProtectedRoute;
