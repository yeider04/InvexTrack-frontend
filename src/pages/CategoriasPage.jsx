/**
 * CategoriasPage.jsx - Página del módulo de Categorías.
 * Permite gestionar las categorías que clasifican los productos.
 */
import React, { useState, useEffect, useCallback } from 'react';
import categoriaService from '../services/categoriaService';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertMessage from '../components/AlertMessage';
import PageHeader from '../components/PageHeader';

const COLUMNAS = [
  { key: 'id',          label: 'ID' },
  { key: 'nombre',      label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
];
const FORM_INICIAL = { nombre: '', descripcion: '' };

function CategoriasPage() {
  const [categorias,        setCategorias]        = useState([]);
  const [loading,           setLoading]           = useState(true);
  const [modalAbierto,      setModalAbierto]      = useState(false);
  const [confirmAbierto,    setConfirmAbierto]    = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [categoriaElim,     setCategoriaElim]     = useState(null);
  const [alerta,            setAlerta]            = useState(null);
  const [form,              setForm]              = useState(FORM_INICIAL);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoriaService.getAll();
      setCategorias(res.data);
    } catch {
      setAlerta({ tipo: 'error', mensaje: 'Error al cargar las categorías.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  function handleNuevo() { setCategoriaEditando(null); setForm(FORM_INICIAL); setModalAbierto(true); }
  function handleEditar(cat) { setCategoriaEditando(cat); setForm({ nombre: cat.nombre, descripcion: cat.descripcion ?? '' }); setModalAbierto(true); }
  function handleEliminar(cat) { setCategoriaElim(cat); setConfirmAbierto(true); }
  function handleCampo(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function confirmarEliminar() {
    try {
      await categoriaService.delete(categoriaElim.id);
      setAlerta({ tipo: 'success', mensaje: 'Categoría eliminada correctamente.' });
      cargarDatos();
    } catch {
      setAlerta({ tipo: 'error', mensaje: 'Error al eliminar la categoría.' });
    } finally { setConfirmAbierto(false); setCategoriaElim(null); }
  }

  async function handleGuardar(e) {
    e.preventDefault();
    try {
      if (categoriaEditando) { await categoriaService.update(categoriaEditando.id, form); setAlerta({ tipo: 'success', mensaje: 'Categoría actualizada.' }); }
      else { await categoriaService.create(form); setAlerta({ tipo: 'success', mensaje: 'Categoría creada correctamente.' }); }
      setModalAbierto(false); cargarDatos();
    } catch { setAlerta({ tipo: 'error', mensaje: 'Error al guardar la categoría.' }); }
  }

  return (
    <div>
      <PageHeader titulo="Categorías" icono="🏷️" onNuevo={handleNuevo} labelBoton="Nueva Categoría" />
      {alerta && <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />}
      <DataTable columns={COLUMNAS} data={categorias} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title={categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}>
        <form onSubmit={handleGuardar} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {[{ name:'nombre', label:'Nombre', required:true }, { name:'descripcion', label:'Descripción' }].map(c => (
            <div key={c.name} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              <label style={{ fontSize:'13px', fontWeight:'600', color:'#444' }}>{c.label}{c.required && ' *'}</label>
              <input name={c.name} type="text" value={form[c.name]} onChange={handleCampo} required={c.required}
                style={{ padding:'9px 12px', border:'1px solid #ced4da', borderRadius:'6px', fontSize:'14px' }} />
            </div>
          ))}
          <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
            <button type="button" onClick={() => setModalAbierto(false)} style={{ padding:'9px 20px', background:'#6c757d', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding:'9px 20px', background:'#1B4F8A', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'600' }}>{categoriaEditando ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={confirmAbierto} mensaje={`¿Eliminar la categoría "${categoriaElim?.nombre}"?`} onConfirmar={confirmarEliminar} onCancelar={() => setConfirmAbierto(false)} />
    </div>
  );
}
export default CategoriasPage;
