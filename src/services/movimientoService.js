import api from './api';
const movimientoService = {
  getAll: () => api.get('/movimientos'),
  getById: (id) => api.get(`/movimientos/${id}`),
  create: (data) => api.post('/movimientos', data),
  delete: (id) => api.delete(`/movimientos/${id}`),
};
export default movimientoService;
