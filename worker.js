const canonicalHost = 'top-payy.online';
const duplicates = new Set(['/index.html', '/home-page', '/home-page/', '/home-page.html', '/home-', '/clean-index.html']);
const aliases = { '/': '/index.html', '/home': '/home.html', '/home/': '/home.html', '/admin': '/admin.html', '/admin/': '/admin.html', '/admin-app': '/admin-app.html', '/admin-app/': '/admin-app.html' };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('This demo does not accept form submissions.', { status: 405, headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' } });
    }
    if (url.protocol === 'http:' || url.hostname === `www.${canonicalHost}`) {
      url.protocol = 'https:';
      if (url.hostname === `www.${canonicalHost}`) url.hostname = canonicalHost;
      return Response.redirect(url.href, 301);
    }
    let path;
    try { path = decodeURIComponent(url.pathname); } catch { return new Response('Invalid URL', { status: 400 }); }
    if (path.includes('\\') || path.includes('\0') || path.split('/').some(part => part.startsWith('.'))) {
      return new Response('Not found', { status: 404 });
    }
    if (duplicates.has(path)) {
      url.pathname = '/';
      return Response.redirect(url.href, 301);
    }
    if (path === '/healthz') return new Response(request.method === 'HEAD' ? null : 'ok', { headers: { 'Cache-Control': 'no-store' } });
    if (path.startsWith('/api/')) {
      return new Response(request.method === 'HEAD' ? null : JSON.stringify({ error: 'Account API disabled. No credentials are collected.' }), { status: 410, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }
    const privatePage = /^\/(home(?:[/.]|$)|admin)/.test(path);
    url.pathname = aliases[path] || (path.startsWith('/admin/') ? '/admin.html' : path);
    const asset = await env.ASSETS.fetch(new Request(url, request));
    const response = new Response(request.method === 'HEAD' ? null : asset.body, asset);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Frame-Options', 'DENY');
    if (privatePage || response.status >= 400 || url.hostname !== canonicalHost) response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    if (response.headers.get('Content-Type')?.includes('text/html')) response.headers.set('Cache-Control', 'no-cache');
    return response;
  }
};
