import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const routes = fs.readFileSync(path.join(root, '_redirects'), 'utf8').split(/\r?\n/)
  .map(line => line.trim()).filter(line => line && !line.startsWith('#'))
  .map(line => line.split(/\s+/)).filter(parts => parts.length === 3);
const headers = [];
let current;
for (const line of fs.readFileSync(path.join(root, '_headers'), 'utf8').split(/\r?\n/)) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  if (!/^\s/.test(line)) { current = { pattern: line.trim(), values: {} }; headers.push(current); }
  else {
    const split = line.indexOf(':');
    if (current && split > 0) current.values[line.slice(0, split).trim()] = line.slice(split + 1).trim();
  }
}
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2' };

const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  let url, pathname;
  try { url = new URL(req.url, 'http://localhost'); pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); res.end(); return; }
  for (const group of headers) {
    if (group.pattern === pathname || (group.pattern.endsWith('*') && pathname.startsWith(group.pattern.slice(0, -1)))) {
      for (const [key, value] of Object.entries(group.values)) res.setHeader(key, value);
    }
  }
  if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').some(part => part.startsWith('.')) || ['/_headers', '/_redirects', '/_worker.js'].includes(pathname)) {
    res.writeHead(404); res.end(); return;
  }
  const route = routes.find(([source]) => source === pathname);
  if (route && Number(route[2]) !== 200) {
    res.writeHead(Number(route[2]), { Location: route[1] + url.search }); res.end(); return;
  }
  let file = path.resolve(root, '.' + (route ? route[1] : pathname));
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(404); res.end(); return; }
  let status = 200;
  try {
    if ((await fs.promises.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    await fs.promises.access(file, fs.constants.R_OK);
  } catch { file = path.join(root, '404.html'); status = 404; }
  try {
    const stat = await fs.promises.stat(file);
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);
    res.writeHead(status);
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch { res.writeHead(500); res.end(); }
});
server.listen(Number(process.env.PORT || 3180), '0.0.0.0', () => console.log('TopPay static site ready'));
