import { useContext, useState } from "react"
import {Navigate} from "react-router-dom"
import { UserContext } from "../src/UserContext";
import { API_URL } from "../src/config";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const {setUserInfo} = useContext(UserContext)



  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include", 
      body: JSON.stringify({
        username,
        password
      }),
    });

    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
      setRedirect(true);
    }else{
      alert("Usuario o contraseña incorrecta")
    }
    
    
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

          <button type="submit" className="auth-button">Ingresar</button>
          
          <div className="auth-footer">
            <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login