const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const multipart = require('parse-multipart-data');

// Configuración
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'asdfe45we45w345wegw345werjktjwertkjasbfoafnqwojfbqwijfm13rboj12ren1oinoqwndipw';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper para parsear cookies
const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  return cookie.parse(cookieHeader);
};

// Helper para respuestas
const response = (statusCode, body, cookies = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };
  
  if (cookies) {
    headers['Set-Cookie'] = cookies;
  }
  
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;
  
  try {
    // ==================== RUTAS ====================
    
    // GET / - Status
    if (path === '' || path === '/') {
      return response(200, {
        message: "API funcionando con Supabase en Netlify",
        status: "ok",
        timestamp: new Date().toISOString()
      });
    }
    
    // POST /register
    if (path === '/register' && method === 'POST') {
      const { username, password } = JSON.parse(event.body);
      
      // Verificar si existe
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();
      
      if (existingUser) {
        return response(400, { error: 'El usuario ya existe' });
      }
      
      // Crear usuario
      const hashedPassword = bcrypt.hashSync(password, salt);
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword }])
        .select()
        .single();
      
      if (error) {
        return response(400, { error: error.message });
      }
      
      return response(200, { id: data.id, username: data.username });
    }
    
    // POST /login
    if (path === '/login' && method === 'POST') {
      const { username, password } = JSON.parse(event.body);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error || !user) {
        return response(400, { error: 'Usuario o contraseña incorrecta' });
      }
      
      const passOk = bcrypt.compareSync(password, user.password);
      
      if (passOk) {
        const token = jwt.sign({ username, id: user.id }, secret);
        const cookieValue = cookie.serialize('token', token, {
          secure: true,
          httpOnly: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60,
          path: '/'
        });
        
        return response(200, { id: user.id, username }, cookieValue);
      } else {
        return response(400, { error: 'Usuario o contraseña incorrecta' });
      }
    }
    
    // GET /profile
    if (path === '/profile' && method === 'GET') {
      const cookies = parseCookies(event.headers.cookie);
      const token = cookies.token;
      
      if (!token) {
        return response(401, { error: 'Token no proporcionado' });
      }
      
      try {
        const info = jwt.verify(token, secret);
        return response(200, info);
      } catch (err) {
        return response(401, { error: 'Token inválido o expirado' });
      }
    }
    
    // POST /logout
    if (path === '/logout' && method === 'POST') {
      const cookieValue = cookie.serialize('token', '', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 0,
        path: '/'
      });
      
      return response(200, 'ok', cookieValue);
    }
    
    // GET /post - Obtener todos los posts
    if (path === '/post' && method === 'GET') {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        return response(500, { error: error.message });
      }
      
      return response(200, data || []);
    }
    
    // GET /post/:id - Obtener post por ID
    if (path.startsWith('/post/') && method === 'GET') {
      const id = path.split('/')[2];
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return response(404, { error: 'Post no encontrado' });
      }
      
      return response(200, data);
    }
    
    // POST /post - Crear post (solo admin)
    if (path === '/post' && method === 'POST') {
      const cookies = parseCookies(event.headers.cookie);
      const token = cookies.token;
      
      if (!token) {
        return response(401, { error: 'No autorizado - Token requerido' });
      }
      
      let userInfo;
      try {
        userInfo = jwt.verify(token, secret);
      } catch (err) {
        return response(401, { error: 'Token inválido' });
      }
      
      // Verificar que sea admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userInfo.id)
        .single();
      
      if (userError || !user || user.role !== 'admin') {
        return response(403, { error: 'Acceso denegado - Solo administradores' });
      }
      
      // Parsear multipart form data si hay archivo
      let coverUrl = null;
      let formData = {};
      
      const contentType = event.headers['content-type'] || event.headers['Content-Type'];
      
      if (contentType && contentType.includes('multipart/form-data')) {
        const boundary = contentType.split('boundary=')[1];
        const parts = multipart.parse(Buffer.from(event.body, 'base64'), boundary);
        
        for (const part of parts) {
          if (part.filename) {
            // Es un archivo
            const fileName = `${Date.now()}-${part.filename}`;
            const { error: uploadError } = await supabase.storage
              .from('covers')
              .upload(fileName, part.data, {
                contentType: part.type
              });
            
            if (!uploadError) {
              const { data: { publicUrl } } = supabase.storage
                .from('covers')
                .getPublicUrl(fileName);
              coverUrl = publicUrl;
            }
          } else {
            // Es un campo de texto
            formData[part.name] = part.data.toString();
          }
        }
      } else {
        formData = JSON.parse(event.body);
      }
      
      const { title, summary, content, author, category } = formData;
      
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title,
          summary,
          content,
          cover: coverUrl,
          author,
          category
        }])
        .select()
        .single();
      
      if (error) {
        return response(500, { error: error.message });
      }
      
      return response(200, data);
    }
    
    // Ruta no encontrada
    return response(404, { error: 'Ruta no encontrada' });
    
  } catch (error) {
    console.error('Error:', error);
    return response(500, { error: 'Error interno del servidor', details: error.message });
  }
};
