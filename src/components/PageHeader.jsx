/**
 * PageHeader.jsx - Encabezado reutilizable para las páginas de módulos.
 * Muestra el título del módulo y un botón para crear nuevo registro.
 * @param {String} titulo - Nombre del módulo
 * @param {String} icono - Emoji representativo del módulo
 * @param {Function} onNuevo - Callback al presionar el botón "Nuevo"
 * @param {String} labelBoton - Texto del botón de acción
 */
import React from 'react';

function PageHeader({ titulo, icono, onNuevo, labelBoton }) {
  return (
    <div style={styles.header}>
      <div style={styles.titulo}>
        <span style={styles.icono}>{icono}</span>
        <h1 style={styles.texto}>{titulo}</h1>
      </div>
      <button onClick={onNuevo} style={styles.btnNuevo}>
        + {labelBoton || `Nuevo ${titulo}`}
      </button>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  titulo: { display: 'flex', alignItems: 'center', gap: '12px' },
  icono: { fontSize: '32px' },
  texto: { fontSize: '26px', fontWeight: '700', color: '#1B4F8A', margin: 0 },
  btnNuevo: { padding: '10px 22px', backgroundColor: '#1B4F8A', color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' },
};

export default PageHeader;
