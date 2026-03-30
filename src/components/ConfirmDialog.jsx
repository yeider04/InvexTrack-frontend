/**
 * ConfirmDialog.jsx - Diálogo de confirmación para acciones destructivas.
 * Se muestra antes de eliminar cualquier registro del sistema.
 * @param {Boolean} isOpen - Controla la visibilidad del diálogo
 * @param {String} mensaje - Texto de la pregunta de confirmación
 * @param {Function} onConfirmar - Callback al confirmar la acción
 * @param {Function} onCancelar - Callback al cancelar la acción
 */
import React from 'react';

function ConfirmDialog({ isOpen, mensaje, onConfirmar, onCancelar }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>⚠️</span>
        </div>
        <h3 style={styles.title}>Confirmar eliminación</h3>
        <p style={styles.mensaje}>{mensaje}</p>
        <div style={styles.botones}>
          <button onClick={onCancelar} style={styles.btnCancelar}>Cancelar</button>
          <button onClick={onConfirmar} style={styles.btnConfirmar}>Sí, eliminar</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 },
  dialog: { backgroundColor: '#fff', borderRadius: '10px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' },
  iconWrapper: { marginBottom: '12px' },
  icon: { fontSize: '48px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '10px' },
  mensaje: { color: '#666', marginBottom: '24px', lineHeight: '1.5' },
  botones: { display: 'flex', gap: '12px', justifyContent: 'center' },
  btnCancelar: { padding: '10px 24px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  btnConfirmar: { padding: '10px 24px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
};

export default ConfirmDialog;
