import { useState } from "react"


const Register = () => {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");
  
  async function register(ev){
    ev.preventDefault();

      const response = await fetch("https://back-blog-beta.vercel.app/register", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(response.status !== 200){
      alert("Registro fallido. Intentalo de Nuevo");
    }else{
        alert("Registro Exitoso");
        window.location.href="http://localhost:5173/login"
    }
  }    
  
  
  return (
    <>
   
      
        <form className="register"  onSubmit={register}>
        <input type="checkbox" id="check"/>
          <h1>Regristrate</h1>
          <input 
          type="text" 
          placeholder="Nombre de Usuario" 
          value={username}
          onChange={ev => setUsername(ev.target.value)} 
          />

          <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          />
          <button  className="register">Registrarse</button>

        </form>
   
       
    </>
  )
}

export default Register