/**
 * DataTable.jsx - Tabla de datos reutilizable para InvexTrack.
 * Muestra registros con columnas configurables y botones de acción.
 * @param {Array} columns - Definición de columnas: [{key, label}]
 * @param {Array} data - Array de objetos a mostrar
 * @param {Function} onEdit - Callback al presionar editar
 * @param {Function} onDelete - Callback al presionar eliminar
 * @param {Boolean} loading - Indica si los datos están cargando
 */
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function DataTable({ columns, data, onEdit, onDelete, loading }) {
  if (loading) return <LoadingSpinner mensaje="Cargando datos..." />;

  if (!data || data.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={styles.emptyIcon}>📭</span>
        <p>No hay registros disponibles.</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={styles.th}>{col.label}</th>
            ))}
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila, idx) => (
            <tr key={fila.id ?? idx} style={idx % 2 === 0 ? styles.trEven : styles.trOdd}>
              {columns.map((col) => (
                <td key={col.key} style={styles.td}>
                  {/* Renderiza el valor o un campo anidado como categoria.nombre */}
                  {col.render
                    ? col.render(fila)
                    : col.key.includes('.')
                      ? col.key.split('.').reduce((obj, k) => obj?.[k], fila) ?? '—'
                      : fila[col.key] ?? '—'}
                </td>
              ))}
              <td style={styles.tdAcciones}>
                <button onClick={() => onEdit(fila)} style={styles.btnEditar}>✏️ Editar</button>
                <button onClick={() => onDelete(fila)} style={styles.btnEliminar}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: { overflowX: 'auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' },
  th: { backgroundColor: '#1B4F8A', color: '#fff', padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600' },
  td: { padding: '11px 16px', fontSize: '14px', borderBottom: '1px solid #e9ecef', color: '#444' },
  tdAcciones: { padding: '8px 16px', borderBottom: '1px solid #e9ecef', whiteSpace: 'nowrap' },
  trEven: { backgroundColor: '#fff' },
  trOdd: { backgroundColor: '#f8fafc' },
  btnEditar: { padding: '5px 12px', marginRight: '6px', backgroundColor: '#2E75B6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' },
  btnEliminar: { padding: '5px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', backgroundColor: '#fff', borderRadius: '8px' },
  emptyIcon: { fontSize: '48px', display: 'block', marginBottom: '12px' },
};

export default DataTable;
