// src/App.jsx
// REEMPLAZA tu App.jsx actual con este contenido.
// Agrega las rutas de login y protege todas las demás con ProtectedRoute.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

// ── Importa tus páginas existentes ───────────────────────────────────────────
import Layout from './components/Layout';
import ProductosPage from './pages/ProductosPage';
import CategoriasPage from './pages/CategoriasPage';
import ProveedoresPage from './pages/ProveedoresPage';
import UsuariosPage from './pages/UsuariosPage';
import MovimientosPage from './pages/MovimientosPage';

function App() {
  return (
    // AuthProvider envuelve TODO para que el contexto esté disponible en toda la app
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Ruta pública: Login ───────────────────────────────────────── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Rutas protegidas: requieren autenticación JWT ─────────────── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Redirige la raíz "/" a "/productos" automáticamente */}
            <Route index element={<Navigate to="/productos" replace />} />
            <Route path="productos"    element={<ProductosPage />} />
            <Route path="categorias"   element={<CategoriasPage />} />
            <Route path="proveedores"  element={<ProveedoresPage />} />
            <Route path="movimientos"  element={<MovimientosPage />} />

            {/* Solo ADMINISTRADOR puede gestionar usuarios */}
            <Route
              path="usuarios"
              element={
                <ProtectedRoute rolRequerido="ADMINISTRADOR">
                  <UsuariosPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Cualquier ruta no encontrada redirige al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
