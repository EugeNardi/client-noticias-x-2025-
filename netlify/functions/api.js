const express = require('express');
const serverless = require('serverless-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

// Crear app de Express
const app = express();
const router = express.Router();

// Configuración
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'asdfe45we45w345wegw345werjktjwertkjasbfoafnqwojfbqwijfm13rboj12ren1oinoqwndipw';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configuración de multer para uploads (en memoria para serverless)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// ==================== RUTAS ====================

// Ruta raíz
router.get('/', (req, res) => {
  res.json({ 
    message: "API funcionando con Supabase en Netlify", 
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// 📝 REGISTRO
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();
    
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    
    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // Crear el usuario
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }])
      .select()
      .single();
    
    if (error) {
      console.error('Error al crear usuario:', error);
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ id: data.id, username: data.username });
  } catch (e) {
    console.error('Error en registro:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error || !user) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrecta' });
    }
    
    const passOk = bcrypt.compareSync(password, user.password);
    
    if (passOk) {
      jwt.sign({ username, id: user.id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { 
          secure: true, 
          httpOnly: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000
        }).json({ id: user.id, username });
      });
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrecta' });
    }
  } catch (e) {
    console.error('Error en login:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 👤 PERFIL
router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    } 
    res.json(info);
  });
});

// 🚪 LOGOUT
router.post('/logout', (req, res) => { 
  res.cookie('token', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 0
  }).json('ok');
});

// 📰 CREAR POST (Solo Admin)
router.post('/post', upload.single('file'), async (req, res) => {
  try {
    // Verificar autenticación
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'No autorizado - Token requerido' });
    }

    // Verificar token y obtener usuario
    let userInfo;
    try {
      userInfo = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Verificar que el usuario sea admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userInfo.id)
      .single();

    if (userError || !user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado - Solo administradores pueden crear noticias' });
    }

    let coverUrl = null;

    // Si hay archivo, subirlo a Supabase Storage
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const { data: uploadData, error: uploadError} = await supabase.storage
        .from('covers')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        });

      if (uploadError) {
        console.error('Error al subir imagen:', uploadError);
      } else {
        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('covers')
          .getPublicUrl(fileName);
        coverUrl = publicUrl;
      }
    }

    const { title, summary, content, author, category } = req.body;

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title,
        summary,
        content,
        cover: coverUrl,
        author,
        category,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error al crear post:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Error en POST /post:', err);
    res.status(500).json({ error: 'Error al crear la noticia' });
  }
});

// 📋 OBTENER TODOS LOS POSTS
router.get("/post", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error('Error al obtener posts:', error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json(data);
  } catch (err) {
    console.error('Error en GET /post:', err);
    res.status(500).json({ error: 'Error al obtener las noticias' });
  }
});

// 📄 OBTENER POST POR ID
router.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error al obtener post:', error);
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(data);
  } catch (err) {
    console.error('Error en GET /post/:id:', err);
    res.status(500).json({ error: 'Error al obtener la noticia' });
  }
});

// Montar el router
app.use('/.netlify/functions/api', router);

// Exportar como función serverless
module.exports.handler = serverless(app);
