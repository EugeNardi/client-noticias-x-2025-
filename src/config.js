// Configuración centralizada de la API
// Usa variables de entorno de Vite (VITE_API_URL)
// Si no existe, usa la URL de producción por defecto
export const API_URL = import.meta.env.VITE_API_URL || 'https://back-blog-beta.vercel.app';

// Para desarrollo local: http://localhost:4000
// Para producción: https://back-blog-beta.vercel.app
