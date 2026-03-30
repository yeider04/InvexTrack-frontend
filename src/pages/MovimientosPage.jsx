/**
 * MovimientosPage.jsx - Página del módulo de Movimientos de Inventario.
 * Registra y consulta entradas y salidas de productos del almacén.
 */
import React, { useState, useEffect, useCallback } from 'react';
import movimientoService from '../services/movimientoService';
import productoService from '../services/productoService';
import usuarioService from '../services/usuarioService';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertMessage from '../components/AlertMessage';
import PageHeader from '../components/PageHeader';

const COLUMNAS = [
  { key: 'id',       label: 'ID' },
  { key: 'tipo',     label: 'Tipo', render: (row) => (
    <span style={{ padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:'600',
      backgroundColor: row.tipo === 'ENTRADA' ? '#e8f5e9' : '#fce4ec',
      color: row.tipo === 'ENTRADA' ? '#2e7d32' : '#c62828' }}>
      {row.tipo}
    </span>
  )},
  { key: 'cantidad', label: 'Cantidad' },
  { key: 'fecha',    label: 'Fecha' },
  { key: 'producto', label: 'Producto',  render: (row) => row.producto?.nombre  ?? '—' },
  { key: 'usuario',  label: 'Registrado por', render: (row) => row.usuario?.nombre ?? '—' },
];
const FORM_INICIAL = { tipo: 'ENTRADA', cantidad: '', idProducto: '', idUsuario: '' };

function MovimientosPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos,   setProductos]   = useState([]);
  const [usuarios,    setUsuarios]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [eliminando,  setEliminando]  = useState(null);
  const [alerta,      setAlerta]      = useState(null);
  const [form,        setForm]        = useState(FORM_INICIAL);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const [resM, resP, resU] = await Promise.all([
        movimientoService.getAll(),
        productoService.getAll(),
        usuarioService.getAll(),
      ]);
      setMovimientos(resM.data);
      setProductos(resP.data);
      setUsuarios(resU.data?.data ?? resU.data);
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al cargar los movimientos.' }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  function handleNuevo() { setForm(FORM_INICIAL); setModalAbierto(true); }
  function handleEliminar(m) { setEliminando(m); setConfirmAbierto(true); }
  function handleCampo(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  /* Los movimientos no se editan, solo se crean o eliminan */
  function handleEditar(m) {
    setAlerta({ tipo: 'warning', mensaje: 'Los movimientos de inventario no se pueden editar.' });
  }

  async function confirmarEliminar() {
    try { await movimientoService.delete(eliminando.id); setAlerta({ tipo: 'success', mensaje: 'Movimiento eliminado.' }); cargarDatos(); }
    catch { setAlerta({ tipo: 'error', mensaje: 'Error al eliminar el movimiento.' }); }
    finally { setConfirmAbierto(false); setEliminando(null); }
  }

  async function handleGuardar(e) {
    e.preventDefault();
    const payload = { ...form, cantidad: Number(form.cantidad), idProducto: Number(form.idProducto), idUsuario: Number(form.idUsuario) };
    try {
      await movimientoService.create(payload);
      setAlerta({ tipo: 'success', mensaje: 'Movimiento registrado correctamente.' });
      setModalAbierto(false); cargarDatos();
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al registrar el movimiento.' }); }
  }

  return (
    <div>
      <PageHeader titulo="Movimientos de Inventario" icono="📊" onNuevo={handleNuevo} labelBoton="Registrar Movimiento" />
      {alerta && <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />}
      <DataTable columns={COLUMNAS} data={movimientos} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title="Registrar Movimiento">
        <form onSubmit={handleGuardar} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>Tipo *</label>
            <select name="tipo" value={form.tipo} onChange={handleCampo} required style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }}>
              <option value="ENTRADA">ENTRADA</option>
              <option value="SALIDA">SALIDA</option>
            </select>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>Cantidad *</label>
            <input name="cantidad" type="number" min="1" value={form.cantidad} onChange={handleCampo} required style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>Producto *</label>
            <select name="idProducto" value={form.idProducto} onChange={handleCampo} required style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }}>
              <option value="">-- Seleccionar producto --</option>
              {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.cantidad})</option>)}
            </select>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>Usuario *</label>
            <select name="idUsuario" value={form.idUsuario} onChange={handleCampo} required style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }}>
              <option value="">-- Seleccionar usuario --</option>
              {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre} ({u.rol})</option>)}
            </select>
          </div>
          <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
            <button type="button" onClick={() => setModalAbierto(false)} style={{ padding:'9px 20px', background:'#6c757d', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding:'9px 20px', background:'#1B4F8A', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'600' }}>Registrar</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={confirmAbierto} mensaje={`¿Eliminar el movimiento #${eliminando?.id}?`} onConfirmar={confirmarEliminar} onCancelar={() => setConfirmAbierto(false)} />
    </div>
  );
}
export default MovimientosPage;
