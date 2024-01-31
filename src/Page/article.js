import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Article() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const navigateTo = (e, link) => {
    e.preventDefault();
    navigate(link);
  };

  const getData = async () => {
    const response = await fetch(`${process.env.REACT_API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status == "ok") {
      setArticle(result.articles[0]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Article Page</title>
        <meta name="description" content={article?.description} />
        <meta name="keywords" content={article?.description} />
        <meta property="og:title" content={article?.title} />
        <meta property="og:url" content={article?.url} />
        <meta property="og:description" content={article?.description} />
        <meta property="twitter:title" content={article?.title} />
        <meta property="twitter:url" content={article?.url} />
        <meta property="twitter:description" content={article?.description} />
      </Helmet>
      <div style={{ padding: "20px" }}>
        <div>
          <p>
            <b>SSR NAVIGATION</b>
          </p>
          <a href="/">Home</a> | <a href="/article">Article</a>{" "}
        </div>
        <div>
          <p>
            <b>SPA NAVIGATION</b>
          </p>
          <a href="#" onClick={(e) => navigateTo(e, "/")}>
            Home
          </a>{" "}
          |{" "}
          <a href="#" onClick={(e) => navigateTo(e, "/article")}>
            Article
          </a>{" "}
        </div>
        <h1>Page Article</h1>
      </div>
    </>
  );
}

export default Article;
