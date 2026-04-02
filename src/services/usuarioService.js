// src/services/usuarioService.js
// REEMPLAZA tu usuarioService.js actual con este.
//
// Cambio clave en update(): si el campo contraseña está vacío,
// lo elimina del objeto antes de enviar el PUT, para que el backend
// conserve la contraseña existente sin sobreescribirla.

import api from './api';

const usuarioService = {
  getAll: () =>
    api.get('/usuarios'),

  getById: (id) =>
    api.get(`/usuarios/${id}`),

  create: (data) =>
    api.post('/usuarios', data),

  update: (id, data) => {
    // Si la contraseña viene vacía, no la enviamos para no pisar la actual
    const payload = { ...data };
    if (!payload.contrasena || payload.contrasena.trim() === '') {
      delete payload.contrasena;
    }
    return api.put(`/usuarios/${id}`, payload);
  },

  delete: (id) =>
    api.delete(`/usuarios/${id}`),
};

export default usuarioService;
