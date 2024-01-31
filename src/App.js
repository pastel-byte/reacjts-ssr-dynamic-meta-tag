import logo from "./logo.svg";
import React from "react";
import "./App.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./Page";
import Article from "./Page/article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
  },
  {
    path: "/article",
    element: <Article />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
