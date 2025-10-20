import { useState } from "react"
import { API_URL } from "../src/config"


const Register = () => {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");
  
  async function register(ev){
    ev.preventDefault();

      const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(response.status !== 200){
      alert("Registro fallido. Inténtalo de nuevo");
    }else{
        alert("¡Registro exitoso! Ahora puedes iniciar sesión");
        window.location.href="/login"
    }
  }    
  
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Crear Cuenta</h1>
          <p>Regístrate para comenzar</p>
        </div>
        
        <form className="auth-form" onSubmit={register}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input 
              id="username"
              type="text" 
              placeholder="Elige un nombre de usuario" 
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              required
              minLength={4}
            />
            <small>Mínimo 4 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="Crea una contraseña segura" 
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              required
              minLength={6}
            />
            <small>Mínimo 6 caracteres</small>
          </div>

          <button type="submit" className="auth-button">Registrarse</button>
          
          <div className="auth-footer">
            <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register