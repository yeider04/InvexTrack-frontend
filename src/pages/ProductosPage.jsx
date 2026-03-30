/**
 * ProductosPage.jsx - Página principal del módulo de Productos.
 * Gestiona el estado de productos y orquesta las operaciones CRUD
 * comunicándose con la API a través de productoService.
 */
import React, { useState, useEffect, useCallback } from 'react';
import productoService from '../services/productoService';
import categoriaService from '../services/categoriaService';
import proveedorService from '../services/proveedorService';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertMessage from '../components/AlertMessage';
import PageHeader from '../components/PageHeader';

/** Columnas de la tabla de productos */
const COLUMNAS = [
  { key: 'id',            label: 'ID' },
  { key: 'nombre',        label: 'Nombre' },
  { key: 'sku',           label: 'SKU' },
  { key: 'cantidad',      label: 'Stock' },
  { key: 'precio',        label: 'Precio Venta', render: (row) => `$${row.precio?.toLocaleString()}` },
  { key: 'categoria',     label: 'Categoría', render: (row) => row.categoria?.nombre ?? '—' },
  { key: 'proveedor',     label: 'Proveedor',  render: (row) => row.proveedor?.nombre  ?? '—' },
];

/** Estado inicial del formulario de producto */
const FORM_INICIAL = { nombre: '', descripcion: '', sku: '', cantidad: '', precioUnitario: '', precio: '', idCategoria: '', idProveedor: '' };

function ProductosPage() {
  const [productos,   setProductos]   = useState([]);
  const [categorias,  setCategorias]  = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminando, setProductoEliminando] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);

  /** Carga inicial de datos */
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const [resProductos, resCategorias, resProveedores] = await Promise.all([
        productoService.getAll(),
        categoriaService.getAll(),
        proveedorService.getAll(),
      ]);
      setProductos(resProductos.data);
      setCategorias(resCategorias.data);
      setProveedores(resProveedores.data);
    } catch {
      mostrarAlerta('error', 'Error al cargar los datos de la API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  function mostrarAlerta(tipo, mensaje) {
    setAlerta({ tipo, mensaje });
  }

  /** Abre el modal para crear un nuevo producto */
  function handleNuevo() {
    setProductoEditando(null);
    setForm(FORM_INICIAL);
    setModalAbierto(true);
  }

  /** Abre el modal para editar un producto existente */
  function handleEditar(producto) {
    setProductoEditando(producto);
    setForm({
      nombre:         producto.nombre,
      descripcion:    producto.descripcion ?? '',
      sku:            producto.sku,
      cantidad:       producto.cantidad,
      precioUnitario: producto.precioUnitario,
      precio:         producto.precio,
      idCategoria:    producto.categoria?.id ?? '',
      idProveedor:    producto.proveedor?.id  ?? '',
    });
    setModalAbierto(true);
  }

  /** Muestra el diálogo de confirmación antes de eliminar */
  function handleEliminar(producto) {
    setProductoEliminando(producto);
    setConfirmAbierto(true);
  }

  /** Confirma y ejecuta la eliminación del producto */
  async function confirmarEliminar() {
    try {
      await productoService.delete(productoEliminando.id);
      mostrarAlerta('success', 'Producto eliminado correctamente.');
      cargarDatos();
    } catch {
      mostrarAlerta('error', 'Error al eliminar el producto.');
    } finally {
      setConfirmAbierto(false);
      setProductoEliminando(null);
    }
  }

  /** Actualiza el estado del formulario al cambiar un campo */
  function handleCampo(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /** Envía el formulario para crear o actualizar un producto */
  async function handleGuardar(e) {
    e.preventDefault();
    const payload = {
      ...form,
      cantidad:       Number(form.cantidad),
      precioUnitario: Number(form.precioUnitario),
      precio:         Number(form.precio),
      idCategoria:    Number(form.idCategoria),
      idProveedor:    Number(form.idProveedor),
    };
    try {
      if (productoEditando) {
        await productoService.update(productoEditando.id, payload);
        mostrarAlerta('success', 'Producto actualizado correctamente.');
      } else {
        await productoService.create(payload);
        mostrarAlerta('success', 'Producto creado correctamente.');
      }
      setModalAbierto(false);
      cargarDatos();
    } catch {
      mostrarAlerta('error', 'Error al guardar el producto. Verifica los datos.');
    }
  }

  return (
    <div>
      <PageHeader titulo="Productos" icono="🛒" onNuevo={handleNuevo} labelBoton="Nuevo Producto" />

      {alerta && (
        <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} onClose={() => setAlerta(null)} />
      )}

      <DataTable columns={COLUMNAS} data={productos} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />

      {/* Modal de creación / edición */}
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}
        title={productoEditando ? 'Editar Producto' : 'Nuevo Producto'}>
        <form onSubmit={handleGuardar} style={estilosForm.form}>
          {[
            { name: 'nombre',         label: 'Nombre',         type: 'text',   required: true },
            { name: 'sku',            label: 'SKU',            type: 'text',   required: true },
            { name: 'descripcion',    label: 'Descripción',    type: 'text' },
            { name: 'cantidad',       label: 'Cantidad',       type: 'number', required: true },
            { name: 'precioUnitario', label: 'Precio Costo',   type: 'number', required: true },
            { name: 'precio',         label: 'Precio Venta',   type: 'number', required: true },
          ].map(campo => (
            <div key={campo.name} style={estilosForm.grupo}>
              <label style={estilosForm.label}>{campo.label}{campo.required && ' *'}</label>
              <input name={campo.name} type={campo.type} value={form[campo.name]} onChange={handleCampo}
                required={campo.required} style={estilosForm.input} />
            </div>
          ))}

          <div style={estilosForm.grupo}>
            <label style={estilosForm.label}>Categoría *</label>
            <select name="idCategoria" value={form.idCategoria} onChange={handleCampo} required style={estilosForm.input}>
              <option value="">-- Seleccionar --</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div style={estilosForm.grupo}>
            <label style={estilosForm.label}>Proveedor *</label>
            <select name="idProveedor" value={form.idProveedor} onChange={handleCampo} required style={estilosForm.input}>
              <option value="">-- Seleccionar --</option>
              {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>

          <div style={estilosForm.botones}>
            <button type="button" onClick={() => setModalAbierto(false)} style={estilosForm.btnCancelar}>Cancelar</button>
            <button type="submit" style={estilosForm.btnGuardar}>
              {productoEditando ? 'Actualizar' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Diálogo de confirmación de eliminación */}
      <ConfirmDialog isOpen={confirmAbierto}
        mensaje={`¿Estás seguro de que deseas eliminar el producto "${productoEliminando?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setConfirmAbierto(false)} />
    </div>
  );
}

const estilosForm = {
  form:       { display: 'flex', flexDirection: 'column', gap: '14px' },
  grupo:      { display: 'flex', flexDirection: 'column', gap: '5px' },
  label:      { fontSize: '13px', fontWeight: '600', color: '#444' },
  input:      { padding: '9px 12px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '14px', outline: 'none' },
  botones:    { display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' },
  btnCancelar:{ padding: '9px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnGuardar: { padding: '9px 20px', backgroundColor: '#1B4F8A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
};

export default ProductosPage;
