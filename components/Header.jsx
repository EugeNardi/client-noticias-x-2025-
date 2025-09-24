import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../src/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("https://back-blog-beta.vercel.app/profile", {
      credentials: "include",
      method: "GET",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("https://back-blog-beta.vercel.app/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <>
      <header>
        

        <Link to={"/"} className="logo">
          Noticias-X
        </Link>
      
        

        <input type="checkbox" id="check"/>
        <label className="icons" htmlFor="check">
          <MenuIcon id="menu-icon"></MenuIcon>
          <CloseIcon id="close-icon"></CloseIcon>
        </label>  
        
          <nav className="navbar">

          <Link to="/Finanzas" className="buscador">
            Finanzas
          </Link>
          <Link to="/Campo" className="buscador">
            Campo
          </Link>
          <Link to="/Tecnología" className="buscador">
            Tecnología
          </Link>
          <Link to="/Ciencia"className="buscador">
            Ciencia
          </Link>
                
          {username && (
            <>
           
           
              
              <Link onClick={logout} className="login">
                Salir

              </Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" className="login">
                Ingresar
              </Link>
              <Link to="/register" className="login">
                Registrarse
              </Link>
            </>
          )}
        </nav>
        
      </header>
    </>
  );
};

export default Header;


/*
   <Link to={"/create"} className="login">
                NuevaNoticia
              </Link>
              */ 


              /*
                 /*
          <form action="
          ">
          <input type="text" />
          <button>Buscar</button>

          </form>*/ 