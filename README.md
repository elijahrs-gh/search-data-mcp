# search-data-mcp

**Default port is 3000. You can change this in server.js**


### Features:

**search_engine:** Search DuckDuckGo for any query (handles typos and spacing issues)

**get_page_previews:** Return a short preview snippet of a page

**get_page_content_range:** Return a specific range of page content

**grep_page_content:** Search for a regex/pattern in page content

### Installation

Clone the repository:

```git clone [<your-repo-url>](https://github.com/elijahrs-gh/search-data-mcp.git)```

```cd search-data-mcp```


Install dependencies:

```npm install```

Start the server:

```node server.js```


Server by default runs at: http://localhost:3000

___

Examples

Test endpoints using curl:

```
curl -X POST http://localhost:3000/search_engine \
     -H "Content-Type: application/json" \
     -d '{"query":"OpenAI GPT-4"}'
```

```
curl -X POST http://localhost:3000/get_page_previews \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com"}'
```

```
curl -X POST http://localhost:3000/get_page_content_range \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com","start":0,"end":100}'
```

```
curl -X POST http://localhost:3000/grep_page_content \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com","pattern":"Example"}'
```
