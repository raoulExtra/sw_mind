const http = require('http');
const url = require('url');

const PORT = 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'POST' && parsedUrl.pathname === '/kilo') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      console.log('Received from Firefox:', {
        url: data.url,
        title: data.title,
        viewport: data.viewport
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    });
    return;
  }
  
  if (req.method === 'GET' && parsedUrl.pathname === '/cmd') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ cmd: 'extract' }));
    return;
  }
  
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Kilo server running at http://localhost:${PORT}`);
});