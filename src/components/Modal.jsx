/**
 * Modal.jsx - Ventana modal reutilizable de InvexTrack.
 * Muestra contenido superpuesto para formularios de creación y edición.
 * @param {Boolean} isOpen - Controla la visibilidad del modal
 * @param {Function} onClose - Callback al cerrar el modal
 * @param {String} title - Título del modal
 * @param {ReactNode} children - Contenido interno del modal
 */
import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.btnClose}>✕</button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modal: { backgroundColor: '#fff', borderRadius: '10px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', backgroundColor: '#1B4F8A', borderRadius: '10px 10px 0 0' },
  title: { color: '#fff', fontSize: '18px', fontWeight: '600', margin: 0 },
  btnClose: { background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', lineHeight: 1 },
  body: { padding: '24px' },
};

export default Modal;
