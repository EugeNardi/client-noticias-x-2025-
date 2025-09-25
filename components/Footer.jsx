import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className="footer"> 

    <div>
        <h1 className="footer-title">Noticias Destacadas</h1>
        <div className="footer-p">
        <Link to="/post/6500fac9d7bb34a707496925">Cybertruck</Link>
        <Link to="/post/6500f3406a1e118750d8e417">YPF</Link>
        <Link to="/post/6500efa96a1e118750d8e3d1">Steam</Link>
        <Link to="/Cargar">Cargar</Link>

        
        </div>
    </div>
    <div>
        <h1 className="footer-title">Contacto</h1>
        <div className="footer-p">
        
        <a href="https://www.instagram.com/eugenio.nardii/" id='Icon-contacto'><InstagramIcon/></a>
        <a href="https://github.com/EugeNardi" id='Icon-contacto'><GitHubIcon/></a>
        <a href="https://twitter.com/Eugge2006" id='Icon-contacto'><TwitterIcon/></a>
        </div>
    </div>
    </div>
    <p className="copyrigth">Noticias-X-copyrigth© 2023 director general:Eugenio Nardi</p>
    </>
  )
}

export default Footer