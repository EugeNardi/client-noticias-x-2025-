import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";
import { supabase } from "../src/supabaseClient";

const Index = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    setLoading(true);
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al cargar noticias:', error);
    } else {
      setAllPosts(data || []);
      setTotalPages(Math.ceil((count || data.length) / postsPerPage));
    }
    setLoading(false);
  };

  // Calcular posts de la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generar números de página
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
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
          {/* Header de archivo */}
          <div className="archive-header">
            <h1>Todas las Noticias</h1>
            <p className="archive-info">
              Mostrando {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, allPosts.length)} de {allPosts.length} noticias
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
                <p>No hay noticias disponibles</p>
              </div>
            )}
          </main>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Botón Anterior */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn pagination-prev"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Anterior
              </button>

              {/* Números de página */}
              <div className="pagination-numbers">
                {getPageNumbers().map((number, index) => (
                  number === '...' ? (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                    >
                      {number}
                    </button>
                  )
                ))}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn pagination-next"
              >
                Siguiente
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar para anuncios */}
        <aside className="index-sidebar">
          <div className="ad-container-sidebar">
            <p style={{color: '#999', fontSize: '0.85rem', textAlign: 'center'}}>Publicidad</p>
            {/* Aquí irá el código de AdSense */}
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default Index;
