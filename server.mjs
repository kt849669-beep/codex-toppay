import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('./dist/', import.meta.url));
const canonicalHost = 'top-payy.online';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const aliases = { '/': 'index.html', '/home': 'home.html', '/home/': 'home.html', '/admin': 'admin.html', '/admin/': 'admin.html', '/admin-app': 'admin-app.html', '/admin-app/': 'admin-app.html' };

export const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const host = String(req.headers.host || '').split(':')[0].toLowerCase();
    if (host === `www.${canonicalHost}` || ['toppaay.com', 'www.toppaay.com'].includes(host)) {
      res.writeHead(301, { Location: `https://${canonicalHost}${url.pathname}${url.search}` });
      return res.end();
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' });
      return res.end('This demo does not accept form submissions.');
    }
    if (['/index.html', '/home-page', '/home-page/', '/home-page.html', '/home-', '/clean-index.html'].includes(pathname)) {
      res.writeHead(301, { Location: `/${url.search}` });
      return res.end();
    }
    if (pathname === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
      return res.end(req.method === 'HEAD' ? '' : 'ok');
    }
    if (pathname.startsWith('/api/')) {
      res.writeHead(410, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' });
      return res.end(req.method === 'HEAD' ? '' : JSON.stringify({ error: 'Account API disabled. No credentials are collected.' }));
    }
    if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(part => part.startsWith('.'))) {
      res.writeHead(404); return res.end('Not found');
    }
    const relativePath = aliases[pathname] || (pathname.startsWith('/admin/') ? 'admin.html' : pathname.slice(1));
    const file = resolve(directory, relativePath);
    if (!file.startsWith(resolve(directory) + sep) || !(await stat(file)).isFile()) {
      res.writeHead(404); return res.end('Not found');
    }
    const extension = extname(file);
    res.setHeader('Content-Type', types[extension] || 'application/octet-stream');
    res.setHeader('Cache-Control', extension === '.html' ? 'no-cache' : /-[\w-]{8}\./.test(relativePath) ? 'public, max-age=31536000, immutable' : 'public, max-age=300');
    if (/^\/(home(?:[/.]|$)|admin)/.test(pathname)) res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.writeHead(200);
    return res.end(req.method === 'HEAD' ? undefined : await readFile(file));
  } catch (error) {
    if (!res.headersSent) res.writeHead(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 400);
    res.end('Page unavailable');
  }
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 8080);
  server.listen(port, '0.0.0.0', () => console.log(`TopPay listening on http://localhost:${port}`));
}
