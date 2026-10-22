const canonicalHost = 'top-payy.online';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect HTTP to HTTPS and www to non-www
    if (url.protocol === 'http:' || url.hostname === `www.${canonicalHost}`) {
      url.protocol = 'https:';
      if (url.hostname === `www.${canonicalHost}`) url.hostname = canonicalHost;
      return Response.redirect(url.href, 301);
    }

    // Health check
    if (url.pathname === '/healthz') {
      return new Response(request.method === 'HEAD' ? null : 'ok', {
        headers: { 'Cache-Control': 'no-store' }
      });
    }

    // Block non-GET/HEAD methods
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' }
      });
    }

    // Validate path
    let path;
    try { path = decodeURIComponent(url.pathname); } catch {
      return new Response('Invalid URL', { status: 400 });
    }
    if (path.includes('\\') || path.includes('\0') || path.split('/').some(p => p.startsWith('.'))) {
      return new Response('Not found', { status: 404 });
    }

    // Try to serve the exact static asset first (JS, CSS, images, fonts, etc.)
    try {
      const assetResponse = await env.ASSETS.fetch(new Request(url.href, request));
      if (assetResponse.status === 200) {
        const response = new Response(request.method === 'HEAD' ? null : assetResponse.body, assetResponse);
        addSecurityHeaders(response);
        // Cache immutable assets (hashed filenames) for 1 year
        const ext = path.split('.').pop()?.toLowerCase();
        if (['js', 'css', 'woff', 'woff2', 'ttf', 'otf', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'ico'].includes(ext)) {
          // Only cache if filename looks like it has a hash (e.g., index-Dv9wD1iP.js)
          if (/[-_.][a-zA-Z0-9]{8,}\./.test(path)) {
            response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            response.headers.set('Cache-Control', 'public, max-age=3600');
          }
        }
        return response;
      }
    } catch (_) { /* fall through to SPA */ }

    // SPA fallback: serve index.html for all non-asset routes (React Router handles routing)
    const indexUrl = new URL(url.href);
    indexUrl.pathname = '/index.html';
    const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.href, request));
    const response = new Response(request.method === 'HEAD' ? null : indexResponse.body, indexResponse);
    addSecurityHeaders(response);
    // Never cache the shell HTML — React app needs fresh deploys to take effect
    response.headers.set('Cache-Control', 'no-cache');
    return response;
  }
};

function addSecurityHeaders(response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
}
