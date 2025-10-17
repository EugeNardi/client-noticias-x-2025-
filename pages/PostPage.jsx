import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { formatISO9075 } from "date-fns";
import { API_URL } from "../src/config";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo));
  }, [id]);

  useEffect(() => {
    // Forzar render de Google Ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Adsense error:", e);
    }
  }, [postInfo]);

  if (!postInfo) return "";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
          padding: "5px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Contenido principal */}
        <article style={{ flex: 4, fontSize: "1.15rem", lineHeight: "1.7" }}>
          <h1 className="title">{postInfo.title}</h1>
          <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="author">Por {postInfo.author}</div>
          <div className="image">
            <img src={`${API_URL}/${postInfo.cover}`} alt="" />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </article>

        {/* Sidebar anuncio */}
        <aside
          style={{
            flex: 1,
            maxWidth: "220px",
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "200px", height: "600px" }}
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

export default PostPage;


/*
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer";
import { formatISO9075 } from "date-fns";
//import { Response } from "express";
 

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);

    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })

    },[])

    if(!postInfo) return "";

  return (
   <>
   
    <div className="post-page">
      <h1 className="title">{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">Por {postInfo.author}</div>
      <div className="image">
      <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="content">

      <div  dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default PostPage
*/