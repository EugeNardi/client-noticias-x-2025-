import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";
import { API_URL } from "../src/config";

const Ciencia = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/post`)
      .then((response) => response.json())
      .then((posts) => {
        const categoryPosts = posts.filter(
          (post) => post.category === "Ciencia"
        );
        setPosts(categoryPosts);
      });
  }, []);

  useEffect(() => {
    // Render forzar de AdSense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Adsense error:", e);
    }
  }, [posts]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          padding: "5px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Contenido principal: más protagonista */}
        <main
          style={{
            flex: 4,
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          {posts.length > 0 &&
            posts.map((post) => <Post {...post} key={post._id} />)}
        </main>

        {/* Sidebar reducido con anuncio */}
        <aside
          style={{
            flex: 1,
            maxWidth: "140px",
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "120px", height: "600px" }}
            data-ad-client="ca-pub-5989955917823198"
            data-ad-slot="8016027017"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default Ciencia;


/*
import { useEffect, useState } from "react"
import Post from "../components/Post"
import Footer from "../components/Footer"


const Ciencia = () => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
     fetch("http://localhost:4000/post").then(response => {
         response.json().then(posts =>{
            const categoryPosts = posts.filter((post) => post.category === "Ciencia");
            setPosts(categoryPosts);
         });
     });
  }, [])


  return (
    <>
    <main>
        {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id}/>
       ))}
       

    </main>
    <Footer/>
    </>
  )
}

export default Ciencia

*/
