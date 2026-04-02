// src/components/Navbar.jsx
// REEMPLAZA tu Navbar.jsx actual con este contenido.
// Agrega el nombre del usuario logueado y el botón de cerrar sesión.

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.brand}>
        <span style={styles.brandIcon}>📦</span>
        <span style={styles.brandName}>InvexTrack</span>
      </div>

      {/* Info del usuario + botón logout */}
      <div style={styles.userArea}>
        {usuario && (
          <>
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {usuario.nombre?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div style={styles.userText}>
                <span style={styles.userName}>{usuario.nombre}</span>
                <span style={styles.userRol}>{usuario.rol}</span>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn} title="Cerrar sesión">
              🚪 Salir
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: '60px',
    background: '#0f172a',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  brandIcon: { fontSize: '22px' },
  brandName: {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
  },
  userText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.3,
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600',
  },
  userRol: {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  logoutBtn: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
};

export default Navbar;
