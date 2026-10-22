# TopPay

Canonical site: **https://top-payy.online/**

This project is a clearly labelled local demonstration. The login screen, six-tap PIN screen and home preview do not authenticate financial accounts or process payments. Passwords, phone numbers and PIN values are not sent to any service. Only a non-personal demo-session flag is kept in session storage.

The admin preview retains Dashboard, Users, Slides, Banner, Trash, Telegram, Media and Profile. Settings apply to the current browser only. User password and MPIN columns show “Not collected”; exports do not contain those values. Legacy local user metadata is sanitized. Previous remote database records are not accessed or erased by this code.

## Cloudflare hosting

- GitHub source: `kt849669-beep/codex-toppay`, branch `main`.
- New Worker: `top-payy-online`, configured in `wrangler.jsonc`.
- Install and build: `npm ci` then `npm run build` (Node.js 20 or newer).
- Verify: `npm test`.
- Deploy: `npm run deploy` using the authorized Cloudflare account.
- Custom domains: connect `top-payy.online` and `www.top-payy.online` in this Worker's Settings → Domains & Routes. Domain bindings are managed in Cloudflare, not hardcoded into the deploy command.
- Health endpoint: `/healthz`. No database credentials or API secrets are required.

`worker.js` runs before static assets to enforce HTTPS/www redirects, clean account URLs, duplicate-page redirects, noindex headers for account/admin and preview hosts, and proper 404 responses. It does not accept login form posts. `server.mjs` is an optional local Node.js preview (`npm start`).

## Domain and search setup

1. Deploy and verify the new Worker before disconnecting the old `codex-toppay` application's domains.
2. Add `top-payy.online` to Cloudflare and preserve unrelated DNS records. Set the assigned Cloudflare nameservers at GoDaddy, then connect the custom domains to the new Worker.
3. Confirm HTTPS, homepage, original logo, demo screens, admin preview, robots.txt and sitemap.xml.
4. Verify the new Google Search Console property and submit `https://top-payy.online/sitemap.xml`.
5. The supplied 640×640 TopPay JPEG is used directly for the site icon, apple touch icon, social images and website image metadata. Google must recrawl the homepage before search appearance can change; favicon display and ranking are not guaranteed.

The files in `migration/` are an optional old-domain redirect plan. They are not deployed by `npm run deploy`. The user's current request is to disconnect the old project's domains after the new site is working. Search Console Change of Address requires working redirects; it cannot be completed while the old domain is disconnected.
