# 📰 Cómo Agregar Noticias de Ejemplo

## 🚀 Opción 1: Ejecutar Script SQL (Más Rápido)

### Paso 1: Ir a Supabase
1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Click en **"SQL Editor"** en el menú lateral

### Paso 2: Ejecutar el Script
1. Click en **"New query"**
2. Abre el archivo: `seed-noticias.sql`
3. **Copia TODO el contenido**
4. Pégalo en el editor SQL de Supabase
5. Click en **"Run"** o presiona `Ctrl + Enter`

✅ **¡Listo!** Ahora tienes 12 noticias de ejemplo:
- 3 de Tecnología
- 3 de Ciencia
- 3 de Finanzas
- 3 de Campo

### Paso 3: Verificar
1. Ve a **"Table Editor"** → **"posts"**
2. Deberías ver 12 noticias con imágenes

---

## 🖼️ Opción 2: Subir Tus Propias Imágenes

Si quieres usar las imágenes de la carpeta `uploads` del backend antiguo:

### Paso 1: Subir Imágenes a Supabase Storage

1. Ve a Supabase Dashboard
2. Click en **"Storage"** en el menú lateral
3. Click en el bucket **"covers"**
4. Click en **"Upload"**
5. Selecciona las imágenes de:
   ```
   c:\Users\sebas\OneDrive\Escritorio\back-blog-main\uploads
   ```
6. Sube las que quieras usar

### Paso 2: Obtener URLs

1. Después de subir, click en cada imagen
2. Click en **"Get URL"** o **"Copy URL"**
3. Copia la URL pública

### Paso 3: Actualizar las Noticias

Ejecuta este SQL reemplazando las URLs:

```sql
-- Ejemplo: Actualizar la imagen de una noticia
UPDATE posts 
SET cover = 'https://xtzwrzlwodswvuyoufgt.supabase.co/storage/v1/object/public/covers/nombre-imagen.jpg'
WHERE title = 'Título de la noticia';
```

---

## 📝 Opción 3: Crear Noticias Manualmente desde el Frontend

1. Inicia sesión como admin en tu sitio
2. Ve a la página de crear noticia
3. Llena el formulario:
   - Título
   - Resumen
   - Contenido
   - Imagen
   - Categoría
4. Click en "Publicar"

---

## 🎨 Las Noticias Incluyen:

### Tecnología:
- ✅ IA en medicina
- ✅ Smartphone plegable
- ✅ Computación cuántica

### Ciencia:
- ✅ Dinosaurio en Patagonia
- ✅ Telescopio James Webb
- ✅ Reversión del envejecimiento

### Finanzas:
- ✅ Bitcoin récord
- ✅ Mercados emergentes
- ✅ Monedas digitales

### Campo:
- ✅ Drones en agricultura
- ✅ Ganadería sostenible
- ✅ Cultivos verticales

---

## 🔍 Verificar que las Noticias Están Visibles

1. Abre tu sitio: `https://tu-sitio.netlify.app`
2. Deberías ver las 12 noticias en la página principal
3. Click en cualquiera para ver el contenido completo
4. Las imágenes deberían cargarse correctamente

---

## ⚠️ Notas Importantes

### Sobre las Imágenes:
- Las imágenes del script usan **Unsplash** (servicio gratuito)
- Son URLs públicas que siempre funcionarán
- Si prefieres usar tus propias imágenes, sigue la Opción 2

### Sobre el Contenido:
- El contenido está en formato HTML
- Puedes editarlo desde Supabase Table Editor
- O crear nuevas noticias desde el frontend

### Sobre las Categorías:
- Tecnología
- Ciencia
- Finanzas
- Campo

Asegúrate de usar exactamente estos nombres para que las noticias aparezcan en las páginas correctas.

---

## 🛠️ Comandos SQL Útiles

### Ver todas las noticias:
```sql
SELECT id, title, category, author, created_at 
FROM posts 
ORDER BY created_at DESC;
```

### Ver noticias por categoría:
```sql
SELECT title, author, created_at 
FROM posts 
WHERE category = 'Tecnología'
ORDER BY created_at DESC;
```

### Eliminar todas las noticias (si quieres empezar de nuevo):
```sql
DELETE FROM posts;
```

### Contar noticias por categoría:
```sql
SELECT category, COUNT(*) as total 
FROM posts 
GROUP BY category;
```

---

## ✅ Checklist

- [ ] Script SQL ejecutado en Supabase
- [ ] 12 noticias visibles en Table Editor
- [ ] Noticias aparecen en el sitio web
- [ ] Imágenes se cargan correctamente
- [ ] Puedes hacer click y ver el contenido completo
- [ ] Las categorías funcionan correctamente

---

**🎉 ¡Listo! Tu sitio ahora tiene contenido de ejemplo para mostrar.**
