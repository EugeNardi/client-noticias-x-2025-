import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../src/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { supabase } from "../src/supabaseClient";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    // Verificar si hay sesión guardada en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserInfo(user);
      
      // Verificar si es admin en Supabase
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('username', user.username)
        .single();
      
      if (data && data.role === 'admin') {
        setIsAdmin(true);
      }
    }
  };

  function logout() {
    localStorage.removeItem('user');
    setUserInfo(null);
    setIsAdmin(false);
    window.location.href = '/';
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Noticias-X
      </Link>

      <input type="checkbox" id="check" />
      <label className="icons" htmlFor="check">
        <MenuIcon id="menu-icon" />
        <CloseIcon id="close-icon" />
      </label>

      <nav className="navbar">
        <Link to="/Tecnología" className="nav-link">
          Tecnología
        </Link>
        <Link to="/Ciencia" className="nav-link">
          Ciencia
        </Link>
        <Link to="/Finanzas" className="nav-link">
          Finanzas
        </Link>
        <Link to="/Campo" className="nav-link">
          Campo
        </Link>

        {/* Botón Crear Noticia - SOLO PARA ADMIN */}
        {username && isAdmin && (
          <Link to="/create" className="crear-noticia-btn">
            <AddCircleOutlineIcon style={{ fontSize: '1.1rem', marginRight: '5px' }} />
            Crear Noticia
          </Link>
        )}

        {/* Opciones de usuario */}
        {username ? (
          <>
            <span className="username-display">
              Hola, {username}
            </span>
            <Link onClick={logout} className="login-btn">
              Salir
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Ingresar
            </Link>
            <Link to="/register" className="login-btn">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
