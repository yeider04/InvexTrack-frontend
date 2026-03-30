/**
 * Navbar.jsx - Barra de navegación superior de InvexTrack.
 * Muestra el nombre del sistema y el módulo activo.
 */
import React from 'react';

function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>📦</span>
        <span style={styles.logoText}>InvexTrack</span>
      </div>
      <span style={styles.subtitle}>Sistema de Gestión de Inventarios</span>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
    backgroundColor: '#1B4F8A', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 24px', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: { fontSize: '24px' },
  logoText: { fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' },
  subtitle: { fontSize: '14px', color: '#B8D4F0', fontStyle: 'italic' },
};

export default Navbar;
