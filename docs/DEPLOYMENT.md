# Deployment

## Build

```sh
npm ci
npm run test:seo
npm run build
```

Publish the contents of `dist/` to a static host.

## Routing

| URL | File |
| --- | --- |
| `/` | `/user-app/pages/login.html` |
| `/home` | `/user-app/pages/home.html` |
| `/admin` | `/admin-app/pages/login.html` |

Redirect `/login`, `/index.html` and `/portal.html` to `/`.
Public guide aliases redirect to their corresponding `.html` URLs.

`wrangler.jsonc`, `worker.js`, `_redirects` and `_headers` contain the complete route, rewrite, redirect, and security header configuration for Cloudflare Workers (with Static Assets) and Cloudflare Pages.
- **Cloudflare Workers Builds:** Uses `wrangler.jsonc` and `worker.js` with assets directory `./dist` and build command `npm run build`.
- **Cloudflare Pages:** Uses build command `npm run build` and build output directory `dist`. Route rewrites and headers are handled via `_redirects`, `_headers` and `_worker.js`.

## Domain and database

Before publishing on a different domain, update the domain references in the content source and login page, regenerate the public pages, and check the sitemap and canonical URLs. Review database configuration separately as described in [database notes](SUPABASE.md).
