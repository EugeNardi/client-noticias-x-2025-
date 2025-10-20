import { useContext, useState } from "react"
import {Navigate} from "react-router-dom"
import { UserContext } from "../src/UserContext";
import { supabase } from "../src/supabaseClient";
import bcrypt from "bcryptjs";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(false);



  async function login(ev) {
    ev.preventDefault();
    setLoading(true);

    try {
      // Buscar usuario en Supabase
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !user) {
        alert("Usuario o contraseña incorrecta");
        setLoading(false);
        return;
      }

      // Verificar contraseña (Supabase guarda hash de bcrypt)
      const passOk = bcrypt.compareSync(password, user.password);

      if (passOk) {
        const userInfo = {
          id: user.id,
          username: user.username,
          role: user.role
        };
        
        // Guardar en contexto y localStorage
        setUserInfo(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        setRedirect(true);
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert("Error al iniciar sesión");
    }
    
    setLoading(false);
  }

  if(redirect){
    return  <Navigate to={"/"}/>
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Bienvenido</h1>
          <p>Ingresa a tu cuenta</p>
        </div>
        
        <form className="auth-form" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input 
              id="username"
              type="text" 
              placeholder="Ingresa tu nombre de usuario" 
              value={username} 
              onChange={ev => setUsername(ev.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="Ingresa tu contraseña" 
              value={password} 
              onChange={ev => setPassword(ev.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          
          <div className="auth-footer">
            <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login