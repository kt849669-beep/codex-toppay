/**
 * Cloudflare Worker for TopPay 3.0
 * Handles rewrites, redirects, static asset delivery and security headers.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Permanent Canonical Redirects
    if (
      pathname === '/login' ||
      pathname === '/index.html' ||
      pathname === '/portal.html' ||
      pathname === '/user-app/pages/login' ||
      pathname === '/user-app/pages/login.html'
    ) {
      return Response.redirect(`${url.origin}/`, 301);
    }

    // Clean SEO aliases (without .html redirect to .html)
    const seoAliases = [
      '/toppay-guide',
      '/toppay-real-or-fake',
      '/toppay-app-download',
      '/toppay-withdrawal',
      '/usdt-to-inr',
      '/toppay-customer-care',
      '/toppay-hindi',
      '/toppay-apk',
      '/toppay-usdt',
      '/about-toppay',
      '/how-to-use-toppay',
      '/how-to-deposit-toppay',
      '/how-to-deposit-usdt-toppay',
      '/toppay-password-help',
      '/toppay-support',
      '/privacy-policy',
      '/terms-and-conditions',
      '/refund-policy',
      '/disclaimer'
    ];

    if (seoAliases.includes(pathname)) {
      return Response.redirect(`${url.origin}${pathname}.html`, 301);
    }

    // 2. URL Rewrites
    // For root /, dist/index.html is the built login app (copied by postbuild.cjs).
    // Serving /index.html directly ensures a clean 200 OK response with no 307 temporary redirect.
    let assetUrl = new URL(request.url);
    if (pathname === '/') {
      assetUrl.pathname = '/index.html';
    } else if (pathname === '/home') {
      assetUrl.pathname = '/user-app/pages/home.html';
    } else if (pathname === '/admin') {
      assetUrl.pathname = '/admin-app/pages/login.html';
    }

    // 3. Fetch from Static Assets
    let response;
    try {
      if (env && env.ASSETS) {
        response = await env.ASSETS.fetch(new Request(assetUrl, request));
        // Safety guard: If ASSETS returned an internal redirect (e.g. 307/308 to strip .html or slash),
        // resolve it internally so Googlebot and browsers always receive a direct 200 OK.
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('Location');
          if (location && (pathname === '/' || pathname === '/home' || pathname === '/admin' || pathname.endsWith('.html'))) {
            const redirectUrl = new URL(location, request.url);
            const followed = await env.ASSETS.fetch(new Request(redirectUrl, request));
            if (followed && followed.status === 200) {
              response = followed;
            }
          }
        }
      } else {
        response = await fetch(new Request(assetUrl, request));
      }
    } catch (err) {
      return new Response(`Server Error: ${err.message}`, { status: 500 });
    }

    // Fallback to 404.html if asset not found
    if (response.status === 404) {
      try {
        const notFoundUrl = new URL('/404.html', request.url);
        if (env && env.ASSETS) {
          const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl, request));
          if (notFoundResponse && notFoundResponse.status === 200) {
            response = notFoundResponse;
          }
        }
      } catch (e) {
        // keep original response
      }
    }

    // 4. Attach Security & Cache Headers
    const headers = new Headers(response.headers);
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://kxsgjfvtfmbruddeolbt.supabase.co https://*.supabase.co; media-src 'self' https:; frame-ancestors 'none';"
    );

    if (pathname.startsWith('/assets/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (pathname === '/sitemap.xml') {
      headers.set('Content-Type', 'application/xml; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
    } else if (pathname === '/robots.txt') {
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
