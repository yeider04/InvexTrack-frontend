/**
 * App.jsx - Componente raíz de InvexTrack.
 * Configura el enrutador principal y define todas las rutas del sistema.
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProductosPage from './pages/ProductosPage';
import CategoriasPage from './pages/CategoriasPage';
import ProveedoresPage from './pages/ProveedoresPage';
import UsuariosPage from './pages/UsuariosPage';
import MovimientosPage from './pages/MovimientosPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirige la raíz al módulo de productos */}
          <Route index element={<Navigate to="/productos" replace />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="proveedores" element={<ProveedoresPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="movimientos" element={<MovimientosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
