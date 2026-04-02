// src/pages/LoginPage.jsx
// Página de inicio de sesión de InvexTrack.
// Coloca este archivo en: src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [correo, setCorreo]       = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError]         = useState('');
  const [cargando, setCargando]   = useState(false);
  const [verPass, setVerPass]     = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!correo || !contrasena) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      await login(correo, contrasena);
      navigate('/productos');
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('Error al conectar con el servidor. Verifica que el backend esté activo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Fondo con patrón de cuadrícula */}
      <div style={styles.gridOverlay} />

      {/* Tarjeta de login */}
      <div style={styles.card}>

        {/* Logo / Encabezado */}
        <div style={styles.header}>
          <div style={styles.logoBox}>
            <span style={styles.logoIcon}>📦</span>
          </div>
          <h1 style={styles.title}>InvexTrack</h1>
          <p style={styles.subtitle}>Sistema de Gestión de Inventarios</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Campo Correo */}
          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="usuario@correo.com"
                style={styles.input}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={verPass ? 'text' : 'password'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                style={{ ...styles.input, paddingRight: '48px' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setVerPass(!verPass)}
                style={styles.eyeBtn}
                title={verPass ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {verPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={styles.errorBox}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={cargando}
            style={cargando ? { ...styles.submitBtn, ...styles.submitBtnDisabled } : styles.submitBtn}
          >
            {cargando ? (
              <span style={styles.loadingRow}>
                <span style={styles.spinner} />
                Verificando...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <p style={styles.footer}>
          © 2026 InvexTrack · Acceso restringido a usuarios autorizados
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus {
          outline: none !important;
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important;
        }
        button[type="submit"]:hover:not(:disabled) {
          background: #1d4ed8 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.4) !important;
        }
      `}</style>
    </div>
  );
}

// ── Estilos inline ────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
    animation: 'fadeIn 0.4s ease',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  logoBox: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
  },
  logoIcon: {
    fontSize: '28px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '26px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    letterSpacing: '0.3px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '16px',
    pointerEvents: 'none',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '12px 14px 12px 44px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#1e293b',
    background: '#f8fafc',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    lineHeight: 1,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#b91c1c',
  },
  submitBtn: {
    padding: '13px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
    marginTop: '4px',
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  loadingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  footer: {
    marginTop: '28px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#94a3b8',
  },
};

export default LoginPage;
