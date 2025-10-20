// Configuración centralizada de la API
// Ahora usa Netlify Functions - la API está en el mismo dominio
export const API_URL = import.meta.env.VITE_API_URL || '/api';

// La API ahora está integrada en Netlify:
// - Desarrollo: http://localhost:8888/api
// - Producción: https://noticias-x.com/api o https://noticias-x.netlify.app/api
// Esto elimina problemas de CORS porque frontend y backend están en el mismo dominio
