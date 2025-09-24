import  { useEffect, useState } from "react";
//import Index from "../pages/Index";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [posts, setPosts] = useState([]);
 // const [resultados, setResultados] = useState([]);



  useEffect(() => {
    // Realiza la solicitud inicial para obtener todas las publicaciones
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        //setResultados(data);
    
      });
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrar(busqueda);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = posts.filter((post) =>
      post.title.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      post.summary.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
 setResultados(resultadoBusqueda);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
         
        />
        <button type="submit">Buscar</button>
      </form>
    
    </>
  );
};

export default Buscador;

  //<Index searchResults={resultados}/>
  