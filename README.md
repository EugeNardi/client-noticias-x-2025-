# 📰 Noticias X - Fullstack Application

Aplicación fullstack de noticias con React, Netlify Functions y Supabase PostgreSQL.

## 🚀 Características

- ✅ **Frontend**: React + Vite + Material-UI
- ✅ **Backend**: Netlify Functions (Express serverless)
- ✅ **Base de Datos**: Supabase PostgreSQL
- ✅ **Storage**: Supabase Storage para imágenes
- ✅ **Autenticación**: JWT + bcrypt
- ✅ **Sin CORS**: Frontend y backend en el mismo dominio
- ✅ **Multi-dominio**: Funciona con `.netlify.app` y dominio personalizado

## 📁 Estructura

```
├── netlify/functions/api.js    ← Backend (Express + Supabase)
├── src/                        ← Frontend (React)
├── public/
├── netlify.toml               ← Configuración Netlify
└── package.json               ← Dependencias
```

## 🛠️ Instalación

```bash
npm install
```

## 🚀 Desarrollo Local

```bash
# Con Netlify Dev (recomendado)
netlify dev

# Solo frontend
npm run dev
```

## 📦 Despliegue

```bash
# Build
npm run build

# Deploy a producción
netlify deploy --prod
```

## 📖 Documentación

- **[DESPLIEGUE_COMPLETO.md](./DESPLIEGUE_COMPLETO.md)** - Guía completa de despliegue
- **[CONFIGURACION_DONWEB.md](./CONFIGURACION_DONWEB.md)** - Configuración de dominio

## 🌐 URLs

- **Producción**: https://noticias-x.com
- **Netlify**: https://noticias-x.netlify.app
- **API**: https://noticias-x.com/api

## 🔧 Tecnologías

**Frontend:**
- React 18
- Vite
- Material-UI
- React Router
- React Quill

**Backend:**
- Express
- Netlify Functions
- Supabase (PostgreSQL)
- JWT + bcrypt
- Multer (file uploads)

## 📝 Licencia

MIT
"# client-noticias-x-2025-" 
