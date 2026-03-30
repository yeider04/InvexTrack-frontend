/**
 * UsuariosPage.jsx - Página del módulo de Usuarios.
 * Gestiona el personal con acceso al sistema InvexTrack.
 */
import React, { useState, useEffect, useCallback } from 'react';
import usuarioService from '../services/usuarioService';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertMessage from '../components/AlertMessage';
import PageHeader from '../components/PageHeader';

const COLUMNAS = [
  { key: 'id',     label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'correo', label: 'Correo' },
  { key: 'rol',    label: 'Rol', render: (row) => (
    <span style={{ padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:'600',
      backgroundColor: row.rol === 'ADMINISTRADOR' ? '#e3f2fd' : '#e8f5e9',
      color: row.rol === 'ADMINISTRADOR' ? '#1565c0' : '#2e7d32' }}>
      {row.rol}
    </span>
  )},
];
const FORM_INICIAL = { nombre: '', correo: '', contrasena: '', rol: 'OPERARIO' };

function UsuariosPage() {
  const [usuarios,   setUsuarios]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [editando,   setEditando]   = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [alerta,     setAlerta]     = useState(null);
  const [form,       setForm]       = useState(FORM_INICIAL);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await usuarioService.getAll();
      /* La API retorna { data: [...] } o directamente el array */
      setUsuarios(res.data?.data ?? res.data);
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al cargar los usuarios.' }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  function handleNuevo() { setEditando(null); setForm(FORM_INICIAL); setModalAbierto(true); }
  function handleEditar(u) { setEditando(u); setForm({ nombre: u.nombre, correo: u.correo, contrasena: '', rol: u.rol }); setModalAbierto(true); }
  function handleEliminar(u) { setEliminando(u); setConfirmAbierto(true); }
  function handleCampo(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function confirmarEliminar() {
    try { await usuarioService.delete(eliminando.id); setAlerta({ tipo: 'success', mensaje: 'Usuario eliminado.' }); cargarDatos(); }
    catch { setAlerta({ tipo: 'error', mensaje: 'Error al eliminar el usuario.' }); }
    finally { setConfirmAbierto(false); setEliminando(null); }
  }

  async function handleGuardar(e) {
    e.preventDefault();
    try {
      if (editando) { await usuarioService.update(editando.id, form); setAlerta({ tipo: 'success', mensaje: 'Usuario actualizado.' }); }
      else { await usuarioService.create(form); setAlerta({ tipo: 'success', mensaje: 'Usuario registrado.' }); }
      setModalAbierto(false); cargarDatos();
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al guardar el usuario.' }); }
  }

  return (
    <div>
      <PageHeader titulo="Usuarios" icono="👥" onNuevo={handleNuevo} labelBoton="Nuevo Usuario" />
      {alerta && <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />}
      <DataTable columns={COLUMNAS} data={usuarios} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title={editando ? 'Editar Usuario' : 'Nuevo Usuario'}>
        <form onSubmit={handleGuardar} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {[
            { name:'nombre',    label:'Nombre',   type:'text',     required:true },
            { name:'correo',    label:'Correo',   type:'email',    required:true },
            { name:'contrasena',label:'Contraseña',type:'password',required:!editando },
          ].map(c => (
            <div key={c.name} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>{c.label}{c.required && ' *'}</label>
              <input name={c.name} type={c.type} value={form[c.name]} onChange={handleCampo} required={c.required}
                placeholder={c.name === 'contrasena' && editando ? 'Dejar vacío para no cambiar' : ''}
                style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }} />
            </div>
          ))}
          <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>Rol *</label>
            <select name="rol" value={form.rol} onChange={handleCampo} required style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }}>
              <option value="OPERARIO">OPERARIO</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            </select>
          </div>
          <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
            <button type="button" onClick={() => setModalAbierto(false)} style={{ padding:'9px 20px', background:'#6c757d', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding:'9px 20px', background:'#1B4F8A', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'600' }}>{editando ? 'Actualizar' : 'Registrar'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={confirmAbierto} mensaje={`¿Eliminar el usuario "${eliminando?.nombre}"?`} onConfirmar={confirmarEliminar} onCancelar={() => setConfirmAbierto(false)} />
    </div>
  );
}
export default UsuariosPage;
