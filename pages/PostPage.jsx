import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { supabase } from "../src/supabaseClient";
import Footer from "../components/Footer";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error al cargar noticia:', error);
      } else {
        setPostInfo(data);
        
        // Cargar noticias relacionadas de la misma categoría
        if (data.category) {
          const { data: related } = await supabase
            .from('posts')
            .select('*')
            .eq('category', data.category)
            .neq('id', id)
            .limit(3);
          
          setRelatedPosts(related || []);
        }
      }
    };
    
    fetchPost();
  }, [id]);

  useEffect(() => {
    // Scroll to top cuando cambia el post
    window.scrollTo(0, 0);
  }, [id]);

  if (!postInfo) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando noticia...</p>
      </div>
    );
  }

  return (
    <>
      <div className="post-page-container">
        <div className="post-page-content">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span> / </span>
            <Link to={`/${postInfo.category?.toLowerCase()}`}>{postInfo.category}</Link>
            <span> / </span>
            <span>{postInfo.title}</span>
          </nav>

          {/* Categoría */}
          <div className="post-category-badge">
            {postInfo.category}
          </div>

          {/* Título */}
          <h1 className="post-title">{postInfo.title}</h1>

          {/* Metadata */}
          <div className="post-metadata">
            <div className="post-author">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Por {postInfo.author}</span>
            </div>
            <div className="post-date">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <time>{postInfo.created_at ? formatISO9075(new Date(postInfo.created_at)) : ''}</time>
            </div>
          </div>

          {/* Resumen */}
          {postInfo.summary && (
            <div className="post-summary">
              {postInfo.summary}
            </div>
          )}

          {/* Imagen principal */}
          {postInfo.cover && (
            <div className="post-image-container">
              <img src={postInfo.cover} alt={postInfo.title} className="post-image" />
            </div>
          )}

          {/* Contenido */}
          <article className="post-content">
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </article>

          {/* Compartir en redes sociales */}
          <div className="post-share">
            <h3>Compartir esta noticia:</h3>
            <div className="share-buttons">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postInfo.title)}&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
                Twitter
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
                Facebook
              </a>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(postInfo.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Noticias relacionadas */}
          {relatedPosts.length > 0 && (
            <div className="related-posts">
              <h2>Noticias Relacionadas</h2>
              <div className="related-posts-grid">
                {relatedPosts.map(post => (
                  <Link to={`/post/${post.id}`} key={post.id} className="related-post-card">
                    {post.cover && (
                      <img src={post.cover} alt={post.title} />
                    )}
                    <div className="related-post-content">
                      <span className="related-post-category">{post.category}</span>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar para anuncios */}
        <aside className="post-sidebar">
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

export default PostPage;
