import puppeteer from "@cloudflare/puppeteer";

export default {
  async fetch(request, env) {
    try {
      const { url } = await request.json();
      const response = await env.MYBROWSER.fetch(url, {
        contentType: "text/html",
        waitUntil: "networkidle0",
      });
      const html = await response.text();
      const match = html.match(/<title>(.*?)<\/title>/i);
      return new Response(
        JSON.stringify({
          title: match ? match[1] : "No title found",
          htmlSnippet: html.slice(0, 500),
        }),
        {
          headers: { "content-type": "application/json" },
        },
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  },
};
