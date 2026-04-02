// src/context/AuthContext.jsx
// Contexto global que maneja el estado de autenticación en toda la app.
// Envuelve tu <App /> con <AuthProvider> para que todos los componentes
// puedan saber si el usuario está logueado.

import { createContext, useContext, useState } from 'react';
import authService from '../services/authService';

// ── Crear el contexto ────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Proveedor del contexto ────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(authService.getUsuario());

  /**
   * Llama al backend, guarda el token y actualiza el estado global.
   */
  const login = async (correo, contrasena) => {
    const response = await authService.login(correo, contrasena);
    authService.guardarSesion(response.data);
    setUsuario(authService.getUsuario());
    return response.data;
  };

  /**
   * Limpia la sesión del localStorage y del estado global.
   */
  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, estaAutenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook personalizado para usar el contexto fácilmente ──────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
