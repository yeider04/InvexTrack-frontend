/**
 * ProveedoresPage.jsx - Página del módulo de Proveedores.
 * Permite gestionar los proveedores de los productos del inventario.
 */
import React, { useState, useEffect, useCallback } from 'react';
import proveedorService from '../services/proveedorService';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertMessage from '../components/AlertMessage';
import PageHeader from '../components/PageHeader';

const COLUMNAS = [
  { key: 'id',        label: 'ID' },
  { key: 'nombre',    label: 'Nombre' },
  { key: 'contacto',  label: 'Contacto' },
  { key: 'direccion', label: 'Dirección' },
];
const FORM_INICIAL = { nombre: '', contacto: '', direccion: '' };

function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try { const res = await proveedorService.getAll(); setProveedores(res.data); }
    catch { setAlerta({ tipo: 'error', mensaje: 'Error al cargar los proveedores.' }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  function handleNuevo() { setEditando(null); setForm(FORM_INICIAL); setModalAbierto(true); }
  function handleEditar(p) { setEditando(p); setForm({ nombre: p.nombre, contacto: p.contacto ?? '', direccion: p.direccion ?? '' }); setModalAbierto(true); }
  function handleEliminar(p) { setEliminando(p); setConfirmAbierto(true); }
  function handleCampo(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function confirmarEliminar() {
    try { await proveedorService.delete(eliminando.id); setAlerta({ tipo: 'success', mensaje: 'Proveedor eliminado.' }); cargarDatos(); }
    catch { setAlerta({ tipo: 'error', mensaje: 'Error al eliminar.' }); }
    finally { setConfirmAbierto(false); setEliminando(null); }
  }

  async function handleGuardar(e) {
    e.preventDefault();
    try {
      if (editando) { await proveedorService.update(editando.id, form); setAlerta({ tipo: 'success', mensaje: 'Proveedor actualizado.' }); }
      else { await proveedorService.create(form); setAlerta({ tipo: 'success', mensaje: 'Proveedor creado.' }); }
      setModalAbierto(false); cargarDatos();
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al guardar el proveedor.' }); }
  }

  const campos = [{ name:'nombre', label:'Nombre', required:true }, { name:'contacto', label:'Contacto' }, { name:'direccion', label:'Dirección' }];

  return (
    <div>
      <PageHeader titulo="Proveedores" icono="🏭" onNuevo={handleNuevo} labelBoton="Nuevo Proveedor" />
      {alerta && <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />}
      <DataTable columns={COLUMNAS} data={proveedores} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title={editando ? 'Editar Proveedor' : 'Nuevo Proveedor'}>
        <form onSubmit={handleGuardar} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {campos.map(c => (
            <div key={c.name} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>{c.label}{c.required && ' *'}</label>
              <input name={c.name} type="text" value={form[c.name]} onChange={handleCampo} required={c.required}
                style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }} />
            </div>
          ))}
          <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
            <button type="button" onClick={() => setModalAbierto(false)} style={{ padding:'9px 20px', background:'#6c757d', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding:'9px 20px', background:'#1B4F8A', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'600' }}>{editando ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={confirmAbierto} mensaje={`¿Eliminar el proveedor "${eliminando?.nombre}"?`} onConfirmar={confirmarEliminar} onCancelar={() => setConfirmAbierto(false)} />
    </div>
  );
}
export default ProveedoresPage;
