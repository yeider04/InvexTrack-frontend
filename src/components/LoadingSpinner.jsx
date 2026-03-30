/**
 * LoadingSpinner.jsx - Indicador de carga para InvexTrack.
 * Se muestra durante las peticiones HTTP a la API REST.
 * @param {String} mensaje - Texto opcional a mostrar bajo el spinner
 */
import React from 'react';

function LoadingSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.texto}>{mensaje}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px' },
  spinner: { width: '44px', height: '44px', border: '4px solid #e9ecef', borderTop: '4px solid #1B4F8A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '14px' },
  texto: { color: '#666', fontSize: '14px' },
};

export default LoadingSpinner;
