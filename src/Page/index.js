import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function Page() {
  const navigate = useNavigate();
  const navigateTo = (e, link) => {
    e.preventDefault();
    navigate(link);
  };
  return (
    <>
      <Helmet>
        <title>Index Page</title>
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
        <h1>Page</h1>
      </div>
    </>
  );
}

export default Page;
