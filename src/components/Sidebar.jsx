/**
 * Sidebar.jsx - Panel lateral de navegación de InvexTrack.
 * Muestra los módulos disponibles y resalta el activo según la ruta.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/** Definición de los módulos del sistema con su ruta e ícono */
const modulos = [
  { ruta: '/productos',   icono: '🛒', nombre: 'Productos' },
  { ruta: '/categorias',  icono: '🏷️',  nombre: 'Categorías' },
  { ruta: '/proveedores', icono: '🏭', nombre: 'Proveedores' },
  { ruta: '/usuarios',    icono: '👥', nombre: 'Usuarios' },
  { ruta: '/movimientos', icono: '📊', nombre: 'Movimientos' },
];

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <nav>
        {modulos.map((modulo) => (
          <NavLink
            key={modulo.ruta}
            to={modulo.ruta}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.linkActive : {}),
            })}
          >
            <span style={styles.icono}>{modulo.icono}</span>
            <span>{modulo.nombre}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: 'fixed', top: '60px', left: 0, bottom: 0,
    width: '240px', backgroundColor: '#14375F',
    paddingTop: '16px', overflowY: 'auto',
  },
  link: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '14px 20px', color: '#B8D4F0',
    textDecoration: 'none', fontSize: '15px',
    transition: 'all 0.2s', borderLeft: '4px solid transparent',
  },
  linkActive: {
    backgroundColor: '#1B4F8A', color: '#fff',
    borderLeft: '4px solid #4DA3FF',
  },
  icono: { fontSize: '20px' },
};

export default Sidebar;
