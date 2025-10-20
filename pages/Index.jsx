import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";
import { supabase } from "../src/supabaseClient";

const Index = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al cargar noticias:', error);
      setAllPosts([]);
    } else {
      // Eliminar duplicados basándose en el ID
      const uniquePosts = data.filter((post, index, self) =>
        index === self.findIndex((p) => p.id === post.id)
      );
      setAllPosts(uniquePosts || []);
    }
    setLoading(false);
  };

  // Calcular posts de la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando noticias...</p>
      </div>
    );
  }

  return (
    <>
      <div className="index-container">
        <div className="index-content">
          {/* Header del archivo */}
          <div className="archive-header">
            <h1>Últimas Noticias</h1>
            <p className="archive-info">
              {allPosts.length > 0 
                ? `${allPosts.length} ${allPosts.length === 1 ? 'noticia' : 'noticias'} publicadas`
                : 'No hay noticias disponibles'}
            </p>
          </div>

          {/* Grid de noticias */}
          <main className="posts-grid">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Post key={post.id} {...post} />
              ))
            ) : (
              <div className="no-posts">
                <p>No hay noticias para mostrar</p>
                <p style={{fontSize: '0.9rem', color: '#999', marginTop: '10px'}}>
                  Ejecuta el script SQL para agregar noticias de ejemplo
                </p>
              </div>
            )}
          </main>

          {/* Paginación Simple y Elegante */}
          {totalPages > 1 && (
            <div className="pagination-simple">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn"
              >
                ← Anterior
              </button>

              <div className="page-info">
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar para anuncios */}
        <aside className="index-sidebar">
          <div className="ad-container-sidebar">
            <p style={{color: '#999', fontSize: '0.85rem', textAlign: 'center', marginBottom: '15px'}}>
              Publicidad
            </p>
            {/* Aquí irá el código de AdSense */}
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default Index;
