// server/index.js
require("dotenv").config();

const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.REACT_APP_PORT;
const indexPath = path.resolve(__dirname, "../build/index.html");

app.use(express.static(path.join(__dirname, "../build")));

app.get("/article", async (req, res) => {
  let article = null;
  const response = await fetch(
    `${process.env.REACT_API_URL}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  if (result.status == "ok") {
    article = result.articles[0];
  }
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    // inject meta tags
    htmlData = htmlData
      .replace("<title>Pastelbyte</title>", `<title>${article?.title}</title>`)
      .replace(
        '<meta name="description" content="Pastelbyte Description" />',
        `<meta name="description" content="${article?.description}" />`
      )
      .replace(
        '<meta name="keywords" content="Pastelbyte Keywords" />',
        `<meta name="keywords" content="${article?.description}" />`
      )
      .replace(
        '<meta property="og:title" content="Pastelbyte">',
        `<meta property="og:title" content="${article?.title}">`
      )
      .replace(
        '<meta property="og:url" content="https://pastelbyte.com/">',
        `<meta property="og:url" content="${article?.url}">`
      )
      .replace(
        '<meta property="og:description" content="Pastelbyte Description">',
        `<meta property="og:description" content="${article?.description}">`
      )
      .replace(
        '<meta property="twitter:title" content="Pastelbyte">',
        `<meta property="twitter:title" content="${article?.title}">`
      )
      .replace(
        '<meta property="twitter:url" content="https://pastelbyte.com/">',
        `<meta property="twitter:url" content="${article?.url}">`
      )
      .replace(
        '<meta property="twitter:description" content="Pastelbyte Description">',
        `<meta property="twitter:description" content="${article?.description}">`
      )
    return res.send(htmlData);
  });
});
app.get("/*", async (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    return res.send(htmlData);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
