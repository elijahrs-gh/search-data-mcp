const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.json());

// Change this if you want:
const PORT = 3000;

// Search Engine
app.post("/search_engine", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.get("https://duckduckgo.com/html/", {
      params: { q: query },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MCPServer/1.0)",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $(".result").each((i, el) => {
      const snippet = $(el)
        .find(".result__snippet")
        .text()
        .replace(/\s+/g, " ")
        .trim();
      const link = $(el).find(".result__a").attr("href") || null;

      if (snippet) {
        results.push({ text: snippet, url: link });
      }
    });

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Page Previews
app.post("/get_page_previews", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const match = html.match(/<title>(.*?)<\/title>/i);
    const title = match
      ? match[1].replace(/\s+/g, " ").trim()
      : "No title found";
    res.json({ preview: title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// The content range of the pages or whatever
app.post("/get_page_content_range", async (req, res) => {
  const { url, start, end } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const text = cheerio.load(html).text().replace(/\s+/g, " ").trim();
    res.json({ content: text.slice(start, end) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Page content thingy
app.post("/grep_page_content", async (req, res) => {
  const { url, pattern } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const text = cheerio.load(html).text();
    const matches = text.match(new RegExp(pattern, "g")) || [];
    res.json({ matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`MCP server running on Port: ${PORT}`);
});
