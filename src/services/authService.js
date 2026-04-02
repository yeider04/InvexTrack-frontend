// src/services/authService.js
// Capa de comunicación con el endpoint de autenticación del backend.

import api from './api';

const authService = {

  /**
   * Envía las credenciales al backend y recibe el token JWT.
   * @param {string} correo
   * @param {string} contrasena
   * @returns {Promise} LoginResponse con token, nombre, rol, etc.
   */
  login: (correo, contrasena) =>
    api.post('/auth/login', { correo, contrasena }),

  /**
   * Elimina el token del localStorage (cierra sesión en el cliente).
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  /**
   * Guarda los datos del usuario autenticado en localStorage.
   * @param {object} loginResponse - Respuesta del backend tras el login
   */
  guardarSesion: (loginResponse) => {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('usuario', JSON.stringify({
      id: loginResponse.id,
      nombre: loginResponse.nombre,
      correo: loginResponse.correo,
      rol: loginResponse.rol,
    }));
  },

  /**
   * Recupera el usuario guardado en localStorage.
   * @returns {object|null} Datos del usuario o null si no hay sesión
   */
  getUsuario: () => {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  },

  /**
   * Verifica si hay una sesión activa (token en localStorage).
   * @returns {boolean}
   */
  estaAutenticado: () => !!localStorage.getItem('token'),
};

export default authService;
