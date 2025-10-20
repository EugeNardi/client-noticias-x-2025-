# 🚀 Guía Completa - Desplegar en Netlify

## 📋 Resumen

Esta guía te llevará paso a paso para desplegar tu aplicación fullstack en Netlify con:
- ✅ Frontend y Backend en el mismo dominio
- ✅ Base de datos Supabase con seguridad
- ✅ Solo tú puedes crear/editar noticias (admin)
- ✅ Los usuarios pueden ver las noticias
- ✅ Funciona con noticias-x.com y noticias-x.netlify.app

---

## 🗄️ PASO 1: Configurar Supabase (10 minutos)

### 1.1 Crear Bucket para Imágenes

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Click en **"Storage"** en el menú lateral
4. Click en **"New bucket"**
5. Configuración:
   - **Name**: `covers`
   - **Public bucket**: ✅ **ACTIVADO** (muy importante)
   - **File size limit**: 50MB
6. Click en **"Create bucket"**

### 1.2 Crear Tablas y Políticas de Seguridad

1. Click en **"SQL Editor"** en el menú lateral
2. Click en **"New query"**
3. Abre el archivo: `supabase-setup.sql`
4. **Copia TODO el contenido** del archivo
5. Pégalo en el editor SQL de Supabase
6. Click en **"Run"** o presiona `Ctrl + Enter`

✅ Esto creará:
- Tabla `users` con campo `role` (admin/user)
- Tabla `posts` para las noticias
- Políticas de seguridad (RLS)
- Índices para mejor rendimiento
- Triggers automáticos

### 1.3 Verificar que se Crearon las Tablas

1. Click en **"Table Editor"** en el menú lateral
2. Deberías ver:
   - ✅ `users`
   - ✅ `posts`

---

## 📦 PASO 2: Instalar Dependencias (2 minutos)

Abre PowerShell y ejecuta:

```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
npm install
```

Esto instalará todas las dependencias del frontend y backend.

---

## 🌐 PASO 3: Desplegar en Netlify

### Opción A: Deploy Manual (Más Rápido)

#### 1. Build del Proyecto

```bash
npm run build
```

#### 2. Desplegar

```bash
netlify deploy --prod
```

O usa el script automático:

```bash
.\deploy.ps1
```

#### 3. Seguir las Instrucciones

Netlify te preguntará:
- **Create & configure a new site**: Sí
- **Team**: Selecciona tu equipo
- **Site name**: `noticias-x` (o el que prefieras)

### Opción B: Deploy con Git (Recomendado para Largo Plazo)

#### 1. Inicializar Git

```bash
git init
git add .
git commit -m "Proyecto fullstack con Netlify Functions y Supabase"
```

#### 2. Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name**: `noticias-x-fullstack`
3. **Public** o **Private**
4. **NO** marques opciones de inicialización
5. Click en **"Create repository"**

#### 3. Subir a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/noticias-x-fullstack.git
git branch -M main
git push -u origin main
```

#### 4. Conectar Netlify con GitHub

1. Ve a: https://app.netlify.com
2. Click en **"Add new site"** → **"Import an existing project"**
3. Click en **"GitHub"**
4. Busca y selecciona: `noticias-x-fullstack`
5. Netlify detectará automáticamente `netlify.toml`
6. Click en **"Deploy site"**

---

## ⚙️ PASO 4: Configurar Variables de Entorno en Netlify

### 4.1 Acceder a Variables de Entorno

1. En Netlify Dashboard, selecciona tu sitio
2. Ve a **"Site configuration"** → **"Environment variables"**
3. Click en **"Add a variable"**

### 4.2 Agregar las 3 Variables

**Variable 1:**
```
Key: SUPABASE_URL
Value: https://xtzwrzlwodswvuyoufgt.supabase.co
Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
```

**Variable 2:**
```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0endyemx3b2Rzd3Z1eW91Zmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTM2MzIsImV4cCI6MjA3NjQ2OTYzMn0.VCMC9Y7qt6xAqc2kqm9l1zZbqDeNCPycxtc_argv6s8
Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
```

**Variable 3:**
```
Key: JWT_SECRET
Value: asdfe45we45w345wegw345werjktjwertkjasbfoafnqwojfbqwijfm13rboj12ren1oinoqwndipw
Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
```

### 4.3 Redesplegar

Después de agregar las variables:

1. Ve a **"Deploys"**
2. Click en **"Trigger deploy"** → **"Deploy site"**

---

## 👤 PASO 5: Crear tu Usuario Administrador

### 5.1 Registrarte en la Aplicación

1. Abre tu sitio: `https://tu-sitio.netlify.app`
2. Ve a la página de registro
3. Crea tu cuenta con:
   - **Username**: El que quieras (ej: `admin`)
   - **Password**: Una contraseña segura

### 5.2 Hacerte Administrador

1. Ve a Supabase Dashboard
2. Click en **"Table Editor"**
3. Click en la tabla **"users"**
4. Busca tu usuario
5. Click en el botón de editar (lápiz)
6. Cambia el campo **"role"** de `user` a `admin`
7. Click en **"Save"**

**O ejecuta este SQL:**

```sql
UPDATE users 
SET role = 'admin' 
WHERE username = 'TU_USERNAME';
```

✅ ¡Ahora eres administrador y puedes crear noticias!

---

## 🌐 PASO 6: Configurar Dominio Personalizado (Opcional)

### 6.1 En Netlify

1. Ve a **"Domain management"**
2. Click en **"Add custom domain"**
3. Ingresa: `noticias-x.com`
4. Click en **"Verify"**
5. Netlify te mostrará opciones de configuración DNS

### 6.2 Opción A: Usar Netlify DNS (Más Fácil)

1. Click en **"Use Netlify DNS"**
2. Netlify te dará 4 nameservers:
   ```
   dns1.p03.nsone.net
   dns2.p03.nsone.net
   dns3.p03.nsone.net
   dns4.p03.nsone.net
   ```
3. Copia estos nameservers

### 6.3 En DonWeb

1. Ve a: https://www.donweb.com
2. Inicia sesión
3. **Mis Servicios** → **Dominios** → `noticias-x.com`
4. Busca **"Servidores DNS"** o **"Nameservers"**
5. Reemplaza los nameservers actuales con los de Netlify
6. Guarda los cambios

### 6.4 Esperar Propagación

⏱️ Tiempo de espera: 2-4 horas (puede ser hasta 48 horas)

Para verificar:
```bash
nslookup noticias-x.com
```

---

## ✅ PASO 7: Verificar que Todo Funciona

### 7.1 Verificar la API

Abre en tu navegador:
```
https://tu-sitio.netlify.app/api
```

Deberías ver:
```json
{
  "message": "API funcionando con Supabase en Netlify",
  "status": "ok",
  "timestamp": "..."
}
```

### 7.2 Verificar el Frontend

1. Abre: `https://tu-sitio.netlify.app`
2. Regístrate con un usuario
3. Inicia sesión

### 7.3 Verificar Permisos de Admin

1. Inicia sesión con tu usuario admin
2. Ve a la página de crear noticia
3. Intenta crear una noticia
4. ✅ Debería funcionar

### 7.4 Verificar Permisos de Usuario Normal

1. Cierra sesión
2. Regístrate con otro usuario (no admin)
3. Intenta crear una noticia
4. ❌ Debería mostrar error: "Acceso denegado"
5. ✅ Pero sí debería poder ver las noticias

---

## 🔍 Verificar en Netlify

### Ver Logs de las Funciones

1. En Netlify Dashboard, ve a **"Functions"**
2. Click en **"api"**
3. Aquí verás:
   - Invocaciones
   - Duración
   - Logs en tiempo real

### Ver Logs en Tiempo Real

```bash
netlify functions:log api
```

---

## 🛠️ Solución de Problemas

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

### Error: "Acceso denegado" al crear noticia (siendo admin)

**Solución:**
1. Ve a Supabase → Table Editor → users
2. Verifica que tu usuario tenga `role = 'admin'`
3. Si no, ejecuta:
   ```sql
   UPDATE users SET role = 'admin' WHERE username = 'TU_USERNAME';
   ```

### Los usuarios normales pueden crear noticias

**Solución:**
1. Verifica que ejecutaste el script SQL completo
2. Ve a Supabase → Authentication → Policies
3. Verifica que RLS esté habilitado en la tabla `posts`

### Error al subir imágenes

**Solución:**
1. Verifica que el bucket `covers` exista
2. Verifica que sea **público**
3. Ve a Storage → covers → Settings → Make public

---

## 📊 Arquitectura Final

```
┌─────────────────────────────────────────────────────┐
│              Netlify (noticias-x.com)               │
│  ┌──────────────────┐    ┌─────────────────────┐   │
│  │    Frontend      │    │  Netlify Functions  │   │
│  │  React + Vite    │◄──►│   Express + API     │   │
│  │                  │    │  (Verifica Admin)   │   │
│  └──────────────────┘    └─────────────────────┘   │
│           ↓                        ↓                │
│      Usuarios Ven              Admin Crea           │
└─────────────────────────────────────────────────────┘
                         ↓
              ┌──────────────────────┐
              │  Supabase PostgreSQL │
              │  ┌────────┐ ┌──────┐ │
              │  │ users  │ │posts │ │
              │  │ (RLS)  │ │(RLS) │ │
              │  └────────┘ └──────┘ │
              │                      │
              │  Storage (covers)    │
              └──────────────────────┘
```

---

## 🎯 Permisos Configurados

| Acción | Usuario Normal | Admin |
|--------|----------------|-------|
| **Ver noticias** | ✅ Sí | ✅ Sí |
| **Crear noticias** | ❌ No | ✅ Sí |
| **Editar noticias** | ❌ No | ✅ Sí |
| **Eliminar noticias** | ❌ No | ✅ Sí |
| **Registrarse** | ✅ Sí | ✅ Sí |
| **Ver su perfil** | ✅ Sí | ✅ Sí |

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

# Abrir el sitio en el navegador
netlify open
```

---

## ✅ Checklist Final

- [ ] Bucket `covers` creado en Supabase (público)
- [ ] Script SQL ejecutado en Supabase
- [ ] Tablas `users` y `posts` creadas
- [ ] RLS habilitado en ambas tablas
- [ ] Dependencias instaladas (`npm install`)
- [ ] Variables de entorno configuradas en Netlify
- [ ] Sitio desplegado en Netlify
- [ ] API funcionando (`/api` responde)
- [ ] Usuario admin creado
- [ ] Rol admin asignado en Supabase
- [ ] Puedes crear noticias como admin
- [ ] Usuarios normales NO pueden crear noticias
- [ ] Usuarios normales SÍ pueden ver noticias
- [ ] Dominio personalizado configurado (opcional)

---

## 🎉 ¡Listo!

Tu aplicación está completamente funcional con:
- ✅ Frontend y Backend en el mismo dominio
- ✅ Base de datos PostgreSQL con Supabase
- ✅ Seguridad con RLS (Row Level Security)
- ✅ Solo tú (admin) puedes crear/editar noticias
- ✅ Los usuarios pueden ver las noticias
- ✅ Funciona con noticias-x.com y noticias-x.netlify.app

**URLs Finales:**
- **Sitio**: https://noticias-x.netlify.app
- **API**: https://noticias-x.netlify.app/api
- **Dominio**: https://noticias-x.com (cuando configure DNS)
