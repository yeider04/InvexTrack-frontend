// src/services/api.js
// REEMPLAZA el contenido actual de este archivo con este código.
// Agrega automáticamente el token JWT a cada petición HTTP.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// ── Interceptor de SOLICITUD: adjunta el token JWT en cada petición ──────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Interceptor de RESPUESTA: redirige al login si el token expiró ───────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido → limpia sesión y redirige al login
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
