/**
 * AlertMessage.jsx - Componente de mensajes de retroalimentación.
 * Muestra al usuario el resultado de operaciones CRUD.
 * @param {String} tipo - Tipo de alerta: 'success', 'error', 'warning'
 * @param {String} mensaje - Texto del mensaje
 * @param {Function} onClose - Callback para cerrar la alerta
 */
import React, { useEffect } from 'react';

const configs = {
  success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb', icono: '✅' },
  error:   { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb', icono: '❌' },
  warning: { bg: '#fff3cd', color: '#856404', border: '#ffeeba', icono: '⚠️' },
};

function AlertMessage({ tipo = 'success', mensaje, onClose }) {
  /* Cierra automáticamente la alerta después de 4 segundos */
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = configs[tipo] || configs.success;

  return (
    <div style={{ ...styles.alerta, backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}>
      <span>{config.icono} {mensaje}</span>
      <button onClick={onClose} style={{ ...styles.btnClose, color: config.color }}>✕</button>
    </div>
  );
}

const styles = {
  alerta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: '500' },
  btnClose: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '12px' },
};

export default AlertMessage;
