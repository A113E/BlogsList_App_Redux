// config.js
// Exporta una URL usable en Vite (import.meta.env)
let BACKEND_URL;

if (typeof import.meta !== 'undefined' && import.meta.env) {
  BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
} else {
  BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3001'; // fallback para Jest
}

export { BACKEND_URL };
