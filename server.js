import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000
const DIST = path.join(__dirname, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.json': 'application/json',
}

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0]
  const filePath = path.join(DIST, urlPath)

  function serveFile(p) {
    fs.readFile(p, (err, data) => {
      if (err) {
        // SPA fallback — serve index.html for all unknown paths
        fs.readFile(path.join(DIST, 'index.html'), (e2, d2) => {
          if (e2) { res.writeHead(404); res.end('Not found'); return }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' })
          res.end(d2)
        })
        return
      }
      const ext = path.extname(p)
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
      })
      res.end(data)
    })
  }

  // If no extension, treat as SPA route
  if (!path.extname(urlPath)) {
    fs.readFile(path.join(DIST, 'index.html'), (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' })
      res.end(data)
    })
  } else {
    serveFile(filePath)
  }
}).listen(PORT, () => console.log(`Webb Studio serving on port ${PORT}`))
