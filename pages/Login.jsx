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
    <>
    
      
    <form className="login" onSubmit={login}>
      <h1>Ingresa</h1>
      <input type="text" placeholder="Nombre de Usuario" value={username} onChange={ev => setUsername(ev.target.value)}/>
      <input type="password" placeholder="Contraseña" value={password} onChange={ev => setPassword(ev.target.value)}/>
      <button>Ingresar</button>
    </form>

  
    </>
  )
}

export default Login