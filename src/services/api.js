/**
 * api.js - Configuración base de Axios para InvexTrack.
 * Define la URL base de la API REST y los headers por defecto.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
