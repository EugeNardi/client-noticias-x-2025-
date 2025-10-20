# 🚀 Guía de Despliegue Completo - Noticias X (Fullstack)

## ✨ Nueva Arquitectura: Todo en Uno

Ahora tu proyecto está **completamente integrado**:
- ✅ Frontend y Backend en el **mismo repositorio**
- ✅ Backend como **Netlify Functions** (serverless)
- ✅ **Sin problemas de CORS** (mismo dominio)
- ✅ Funciona con **noticias-x.com** y **noticias-x.netlify.app**
- ✅ Base de datos **Supabase PostgreSQL**
- ✅ Un solo `git push` despliega todo

---

## 📁 Estructura del Proyecto

```
client/
├── netlify/
│   └── functions/
│       └── api.js          ← Backend completo (Express + Supabase)
├── src/                    ← Frontend (React)
├── public/
├── dist/                   ← Build del frontend
├── netlify.toml           ← Configuración de Netlify
├── package.json           ← Dependencias (frontend + backend)
└── .env.production        ← Variables de entorno
```

---

## 🔧 Paso 1: Crear Tablas en Supabase

### 1.1 Crear Bucket para Imágenes

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. Click en **"New bucket"**
5. Nombre: `covers`
6. **Public bucket**: ✅ Activado
7. Click en **"Create bucket"**

### 1.2 Crear Tablas

1. Ve a **SQL Editor**
2. Click en **"New query"**
3. Pega este código:

```sql
-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Posts
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    cover TEXT,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Deshabilitar RLS para permitir acceso desde el backend
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

4. Click en **"Run"**

---

## 📦 Paso 2: Instalar Dependencias

```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
npm install
```

Esto instalará:
- Frontend: React, Material-UI, etc.
- Backend: Express, Supabase, bcrypt, JWT, etc.
- Netlify: serverless-http

---

## ⚙️ Paso 3: Configurar Variables de Entorno en Netlify

### 3.1 Acceder a Netlify

1. Ve a: https://app.netlify.com
2. Selecciona tu sitio
3. Ve a **"Site configuration"** → **"Environment variables"**

### 3.2 Agregar Variables

Agrega estas 3 variables:

```
SUPABASE_URL
https://xtzwrzlwodswvuyoufgt.supabase.co

SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0endyemx3b2Rzd3Z1eW91Zmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTM2MzIsImV4cCI6MjA3NjQ2OTYzMn0.VCMC9Y7qt6xAqc2kqm9l1zZbqDeNCPycxtc_argv6s8

JWT_SECRET
asdfe45we45w345wegw345werjktjwertkjasbfoafnqwojfbqwijfm13rboj12ren1oinoqwndipw
```

---

## 🚀 Paso 4: Desplegar en Netlify

### Opción A: Deploy Manual (Rápido)

```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
npm run build
netlify deploy --prod
```

### Opción B: Deploy con Git (Recomendado)

1. **Inicializar Git (si no lo has hecho)**:
```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
git init
git add .
git commit -m "Fullstack con Netlify Functions y Supabase"
```

2. **Crear repositorio en GitHub**:
   - Ve a: https://github.com/new
   - Nombre: `noticias-x-fullstack`
   - Click en "Create repository"

3. **Subir a GitHub**:
```bash
git remote add origin https://github.com/TU-USUARIO/noticias-x-fullstack.git
git branch -M main
git push -u origin main
```

4. **Conectar con Netlify**:
   - En Netlify Dashboard, click en **"Add new site"** → **"Import an existing project"**
   - Selecciona **GitHub**
   - Busca y selecciona: `noticias-x-fullstack`
   - Netlify detectará automáticamente la configuración de `netlify.toml`
   - Click en **"Deploy site"**

---

## 🌐 Paso 5: Configurar Dominio Personalizado

### 5.1 En Netlify

1. Ve a **"Domain management"**
2. Click en **"Add custom domain"**
3. Ingresa: `noticias-x.com`
4. Sigue las instrucciones para configurar DNS

### 5.2 En DonWeb

Sigue los pasos de `CONFIGURACION_DONWEB.md` para configurar los nameservers.

---

## ✅ Paso 6: Verificar que Todo Funciona

### 6.1 Verificar la API

Abre en tu navegador:
```
https://noticias-x.netlify.app/api
```

Deberías ver:
```json
{
  "message": "API funcionando con Supabase en Netlify",
  "status": "ok",
  "timestamp": "2025-10-19T..."
}
```

### 6.2 Verificar el Frontend

1. Abre: `https://noticias-x.netlify.app`
2. Intenta registrarte
3. Intenta hacer login
4. Crea una noticia

### 6.3 Verificar con Dominio Personalizado

Una vez configurado el DNS:
```
https://noticias-x.com
https://www.noticias-x.com
```

---

## 🔍 Endpoints de la API

Todos los endpoints están en el mismo dominio:

```
GET  /api                  → Estado de la API
POST /api/register         → Registrar usuario
POST /api/login            → Iniciar sesión
GET  /api/profile          → Obtener perfil
POST /api/logout           → Cerrar sesión
POST /api/post             → Crear noticia (con imagen)
GET  /api/post             → Obtener todas las noticias
GET  /api/post/:id         → Obtener noticia por ID
```

---

## 🛠️ Desarrollo Local

### Opción 1: Con Netlify Dev (Recomendado)

```bash
npm install -g netlify-cli
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
netlify dev
```

Esto iniciará:
- Frontend en: `http://localhost:8888`
- API en: `http://localhost:8888/api`

### Opción 2: Solo Frontend

```bash
npm run dev
```

Frontend en: `http://localhost:5173`

---

## 📊 Ventajas de Esta Arquitectura

| Característica | Antes | Ahora |
|----------------|-------|-------|
| **Repositorios** | 2 separados | 1 unificado |
| **Despliegue** | Frontend y Backend por separado | Un solo deploy |
| **CORS** | Problemas constantes | ✅ Sin problemas |
| **Dominios** | Backend en Vercel, Frontend en Netlify | Todo en Netlify |
| **Mantenimiento** | Complejo | Simple |
| **Costo** | 2 servicios | 1 servicio (gratis) |

---

## 🔧 Solución de Problemas

### Error: "Function not found"

**Solución:**
1. Verifica que `netlify/functions/api.js` exista
2. Verifica que `netlify.toml` tenga `functions = "netlify/functions"`
3. Redespliega: `netlify deploy --prod`

### Error: "SUPABASE_URL is not defined"

**Solución:**
1. Ve a Netlify → Site configuration → Environment variables
2. Verifica que las 3 variables estén configuradas
3. Redespliega el sitio

### Error al subir imágenes

**Solución:**
1. Verifica que el bucket `covers` exista en Supabase Storage
2. Verifica que sea **público**
3. Ve a Storage → covers → Settings → Make public

### La API no responde

**Solución:**
1. Ve a Netlify → Functions
2. Verifica que `api` aparezca en la lista
3. Click en `api` para ver los logs
4. Busca errores en los logs

---

## 📝 Comandos Útiles

```bash
# Desarrollo local
netlify dev

# Build
npm run build

# Deploy a producción
netlify deploy --prod

# Ver logs de funciones
netlify functions:log api

# Ver estado del sitio
netlify status
```

---

## 🎯 URLs Finales

Una vez desplegado, tu aplicación estará disponible en:

- **Netlify**: `https://noticias-x.netlify.app`
- **Dominio personalizado**: `https://noticias-x.com`
- **API**: `https://noticias-x.com/api` (mismo dominio, sin CORS!)

---

## 📋 Checklist de Despliegue

- [ ] Bucket `covers` creado en Supabase Storage (público)
- [ ] Tablas creadas en Supabase (users, posts)
- [ ] RLS deshabilitado en las tablas
- [ ] Dependencias instaladas (`npm install`)
- [ ] Variables de entorno configuradas en Netlify
- [ ] Código subido a GitHub (opcional)
- [ ] Sitio desplegado en Netlify
- [ ] API funcionando (`/api` responde)
- [ ] Frontend funcionando
- [ ] Registro/Login funciona
- [ ] Crear posts funciona
- [ ] Subir imágenes funciona
- [ ] Dominio personalizado configurado (opcional)

---

## 🎉 ¡Listo!

Ahora tienes una aplicación fullstack completamente funcional:
- ✅ Frontend y Backend en el mismo proyecto
- ✅ Sin problemas de CORS
- ✅ Base de datos PostgreSQL con Supabase
- ✅ Storage para imágenes
- ✅ Funciona con múltiples dominios
- ✅ Un solo `git push` despliega todo

**Siguiente paso:** Ejecuta `npm install` y luego `netlify deploy --prod`
