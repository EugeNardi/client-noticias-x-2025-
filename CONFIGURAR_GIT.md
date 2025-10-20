# 🔧 Configurar Git y GitHub

## 📋 Opción 1: Deploy Automático con Git (Recomendado)

Esta opción te permite que cada vez que hagas `git push`, Netlify automáticamente despliegue tu sitio.

### Paso 1: Inicializar Git

```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
git init
```

### Paso 2: Agregar Archivos

```bash
git add .
git commit -m "Proyecto fullstack con Netlify Functions y Supabase"
```

### Paso 3: Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name**: `noticias-x-fullstack`
3. **Description**: `Aplicación de noticias con React, Netlify Functions y Supabase`
4. **Public** o **Private** (tu elección)
5. **NO** marques ninguna opción de inicialización
6. Click en **"Create repository"**

### Paso 4: Conectar con GitHub

GitHub te mostrará comandos. Usa estos:

```bash
git remote add origin https://github.com/TU-USUARIO/noticias-x-fullstack.git
git branch -M main
git push -u origin main
```

**Reemplaza `TU-USUARIO`** con tu nombre de usuario de GitHub.

### Paso 5: Conectar Netlify con GitHub

1. Ve a: https://app.netlify.com
2. Click en **"Add new site"** → **"Import an existing project"**
3. Click en **"GitHub"**
4. Autoriza a Netlify si es necesario
5. Busca y selecciona: `noticias-x-fullstack`
6. Netlify detectará automáticamente `netlify.toml`
7. Click en **"Deploy site"**

### Paso 6: Configurar Variables de Entorno

1. En Netlify, ve a **"Site configuration"** → **"Environment variables"**
2. Agrega las 3 variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `JWT_SECRET`

### Paso 7: Redesplegar

1. En Netlify, ve a **"Deploys"**
2. Click en **"Trigger deploy"** → **"Deploy site"**

---

## 📋 Opción 2: Deploy Manual (Sin Git)

Si prefieres no usar Git, puedes desplegar manualmente:

### Método A: Con Netlify CLI

```bash
cd c:\Users\sebas\OneDrive\Escritorio\Noticias-X-main\client
npm install
npm run build
netlify deploy --prod
```

### Método B: Drag & Drop

1. Ejecuta el build:
   ```bash
   npm run build
   ```

2. Ve a: https://app.netlify.com
3. Arrastra la carpeta `dist` completa
4. Configura las variables de entorno
5. Listo!

---

## 🔄 Flujo de Trabajo con Git

Una vez configurado Git + GitHub + Netlify:

### Para hacer cambios:

```bash
# 1. Hacer cambios en el código
# 2. Guardar archivos

# 3. Agregar cambios
git add .

# 4. Commit
git commit -m "Descripción de los cambios"

# 5. Push (esto despliega automáticamente!)
git push
```

**¡Eso es todo!** Netlify detectará el push y desplegará automáticamente.

---

## 🌿 Ramas (Opcional)

Para trabajar con ramas de desarrollo:

### Crear rama de desarrollo:

```bash
git checkout -b desarrollo
```

### Hacer cambios y push:

```bash
git add .
git commit -m "Nuevas funcionalidades"
git push -u origin desarrollo
```

### Mergear a main cuando esté listo:

```bash
git checkout main
git merge desarrollo
git push
```

---

## 📝 Comandos Git Útiles

```bash
# Ver estado
git status

# Ver historial
git log --oneline

# Ver diferencias
git diff

# Deshacer cambios (antes de commit)
git checkout -- archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver ramas
git branch

# Cambiar de rama
git checkout nombre-rama

# Crear y cambiar a nueva rama
git checkout -b nueva-rama
```

---

## 🔒 Archivo .gitignore

Ya está configurado para ignorar:

```
node_modules/
dist/
.env
.env.local
.env.production
.env.development
uploads/
*.log
.DS_Store
.vscode/
.idea/
```

---

## ⚠️ Importante

### **NUNCA subas a Git:**
- ❌ Archivos `.env` (ya están en .gitignore)
- ❌ `node_modules/` (ya está en .gitignore)
- ❌ Credenciales o API keys
- ❌ Archivos de configuración local

### **Siempre sube a Git:**
- ✅ Código fuente (`src/`, `netlify/functions/`)
- ✅ Archivos de configuración (`netlify.toml`, `package.json`)
- ✅ `.env.example` (sin valores reales)
- ✅ Documentación (README.md, etc.)

---

## 🎯 Ventajas de Usar Git + GitHub + Netlify

1. **Deploy Automático**: Un `git push` despliega todo
2. **Historial**: Puedes ver y revertir cambios
3. **Colaboración**: Otros pueden contribuir
4. **Backup**: Tu código está seguro en GitHub
5. **Ramas**: Puedes probar cambios sin afectar producción
6. **CI/CD**: Netlify construye y despliega automáticamente

---

## 📞 Ayuda

### Si tienes problemas con Git:

```bash
# Verificar configuración
git config --list

# Configurar nombre y email (si no lo has hecho)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Si el push falla:

```bash
# Pull primero (si hay cambios remotos)
git pull origin main

# Luego push
git push
```

---

## ✅ Checklist

- [ ] Git instalado (`git --version`)
- [ ] Repositorio inicializado (`git init`)
- [ ] Primer commit hecho
- [ ] Repositorio creado en GitHub
- [ ] Conectado con GitHub (`git remote add origin`)
- [ ] Push inicial hecho (`git push -u origin main`)
- [ ] Netlify conectado con GitHub
- [ ] Variables de entorno configuradas en Netlify
- [ ] Deploy automático funcionando

---

**🎉 ¡Listo! Ahora cada `git push` desplegará tu sitio automáticamente.**
