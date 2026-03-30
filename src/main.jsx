/**
 * main.jsx - Punto de entrada de la aplicación InvexTrack.
 * Monta el componente raíz App en el elemento #root del DOM.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
