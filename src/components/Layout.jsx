/**
 * Layout.jsx - Componente de estructura principal de InvexTrack.
 * Envuelve todas las páginas con Navbar y Sidebar.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  main: {
    marginLeft: '240px',
    marginTop: '60px',
    padding: '28px',
    minHeight: 'calc(100vh - 60px)',
  },
};

export default Layout;
