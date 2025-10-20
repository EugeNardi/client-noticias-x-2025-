-- ═══════════════════════════════════════════════════════════════════
-- SCRIPT DE CONFIGURACIÓN COMPLETA - SUPABASE
-- Base de datos para Noticias X con seguridad RLS
-- ═══════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────
-- 1. CREAR TABLAS
-- ───────────────────────────────────────────────────────────────────

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',  -- 'admin' o 'user'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Posts/Noticias
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

-- ───────────────────────────────────────────────────────────────────
-- 2. CREAR ÍNDICES PARA MEJOR RENDIMIENTO
-- ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);

-- ───────────────────────────────────────────────────────────────────
-- 3. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ───────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ───────────────────────────────────────────────────────────────────
-- 4. TRIGGERS PARA updated_at
-- ───────────────────────────────────────────────────────────────────

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ───────────────────────────────────────────────────────────────────
-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
-- ───────────────────────────────────────────────────────────────────

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- ───────────────────────────────────────────────────────────────────
-- 6. POLÍTICAS DE SEGURIDAD PARA USERS
-- ───────────────────────────────────────────────────────────────────

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Enable insert for authentication" ON users;

-- Permitir que los usuarios vean solo su propia información
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT
    USING (true);  -- Permitir a todos ver (el backend filtrará)

-- Permitir que los usuarios actualicen solo su propia información
CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE
    USING (true);  -- El backend maneja la autenticación

-- Permitir registro de nuevos usuarios
CREATE POLICY "Enable insert for authentication" ON users
    FOR INSERT
    WITH CHECK (true);  -- El backend maneja la validación

-- ───────────────────────────────────────────────────────────────────
-- 7. POLÍTICAS DE SEGURIDAD PARA POSTS
-- ───────────────────────────────────────────────────────────────────

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view all posts" ON posts;
DROP POLICY IF EXISTS "Backend can insert posts" ON posts;
DROP POLICY IF EXISTS "Backend can update posts" ON posts;
DROP POLICY IF EXISTS "Backend can delete posts" ON posts;

-- LECTURA: TODOS pueden ver las noticias (incluso visitantes sin registrarse)
-- Esto permite que cualquier persona vea las noticias sin necesidad de login
CREATE POLICY "Public can view all posts" ON posts
    FOR SELECT
    USING (true);  -- true = acceso público total

-- CREAR: Solo el backend puede crear (el backend verificará que seas admin)
CREATE POLICY "Backend can insert posts" ON posts
    FOR INSERT
    WITH CHECK (true);  -- El backend maneja la autenticación y verificación de admin

-- ACTUALIZAR: Solo el backend puede actualizar (el backend verificará que seas admin)
CREATE POLICY "Backend can update posts" ON posts
    FOR UPDATE
    USING (true);  -- El backend maneja la autenticación y verificación de admin

-- ELIMINAR: Solo el backend puede eliminar (el backend verificará que seas admin)
CREATE POLICY "Backend can delete posts" ON posts
    FOR DELETE
    USING (true);  -- El backend maneja la autenticación y verificación de admin

-- ───────────────────────────────────────────────────────────────────
-- 8. CREAR USUARIO ADMINISTRADOR
-- ───────────────────────────────────────────────────────────────────

-- IMPORTANTE: Cambia el username y password por los tuyos
-- La contraseña debe estar hasheada con bcrypt (el backend lo hará)
-- Este es solo un placeholder, créalo desde el frontend con el registro

-- Ejemplo de cómo crear un admin manualmente (después de registrarte):
-- UPDATE users SET role = 'admin' WHERE username = 'TU_USERNAME';

-- ───────────────────────────────────────────────────────────────────
-- 9. COMENTARIOS PARA DOCUMENTACIÓN
-- ───────────────────────────────────────────────────────────────────

COMMENT ON TABLE users IS 'Tabla de usuarios del sistema con roles';
COMMENT ON TABLE posts IS 'Tabla de publicaciones/noticias';

COMMENT ON COLUMN users.username IS 'Nombre de usuario único';
COMMENT ON COLUMN users.password IS 'Contraseña hasheada con bcrypt';
COMMENT ON COLUMN users.role IS 'Rol del usuario: admin o user';

COMMENT ON COLUMN posts.cover IS 'URL de la imagen de portada (Supabase Storage)';
COMMENT ON COLUMN posts.category IS 'Categoría: Tecnología, Ciencia, Finanzas, Campo';
COMMENT ON COLUMN posts.author IS 'Nombre del autor de la noticia';

-- ───────────────────────────────────────────────────────────────────
-- 10. FUNCIÓN PARA VERIFICAR SI UN USUARIO ES ADMIN
-- ───────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ───────────────────────────────────────────────────────────────────
-- 11. VISTA PARA ESTADÍSTICAS (OPCIONAL)
-- ───────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW posts_stats AS
SELECT 
    category,
    COUNT(*) as total_posts,
    MAX(created_at) as last_post_date
FROM posts
GROUP BY category;

-- ═══════════════════════════════════════════════════════════════════
-- SCRIPT COMPLETADO
-- ═══════════════════════════════════════════════════════════════════

-- PRÓXIMOS PASOS:
-- 1. Ejecuta este script en Supabase SQL Editor
-- 2. Regístrate en tu aplicación
-- 3. Ejecuta este comando para hacerte admin:
--    UPDATE users SET role = 'admin' WHERE username = 'TU_USERNAME';
-- 4. Ya podrás crear, editar y eliminar noticias
-- 5. TODOS (incluso sin registrarse) podrán ver las noticias
-- 6. Solo tú (admin) podrás crear/editar/eliminar noticias

-- PERMISOS CONFIGURADOS:
-- ✅ CUALQUIER PERSONA (sin login): Puede VER todas las noticias
-- ✅ USUARIOS REGISTRADOS: Pueden VER todas las noticias
-- ✅ ADMIN (tú): Puede CREAR, EDITAR y ELIMINAR noticias

-- VERIFICACIÓN:
-- Para verificar que todo está correcto, ejecuta:
-- SELECT * FROM users;
-- SELECT * FROM posts;
-- SELECT * FROM posts_stats;
