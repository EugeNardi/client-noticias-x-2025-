import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <>
    <div className="footer"> 
 
    <div>
        <h1 className="footer-title">Noticias Destacadas</h1>
        <div className="footer-p">
        <a href="/post/6500fac9d7bb34a707496925">Cybertruck</a>
        <a href="/post/6500f3406a1e118750d8e417">YPF</a>
        <a href="/post/6500efa96a1e118750d8e3d1">Steam</a>
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