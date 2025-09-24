import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://back-blog-beta.vercel.app/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts.slice(0, 10));
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
        {/* Contenido principal: ahora más ancho */}
        <main
          style={{
            flex: 4,
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </main>

        {/* Sidebar reducido */}
        <aside
          style={{
            flex: 1,
            maxWidth: "140px", // más angosto
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

export default Index;



/*
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";

const Index = () => {
  const [posts, setPosts] = useState([]);
   
  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => {
        response.json().then((posts) => {
          setPosts(posts.slice(0, 10));
        });
      });
  }, []);

  return (
    <>
      <main>
        {posts.map((post) => (
          <Post  {...post} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Index;*/
