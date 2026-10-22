# Project notes

## Active application

The application uses HTML, CSS and browser JavaScript. Vite builds the HTML entry points and copies public assets into `dist/`.

- `user-app/pages/login.html`: user login.
- `user-app/pages/home.html`: user home.
- `admin-app/pages/login.html`: administrator login.
- `admin-app/pages/`: administrator views.
- `user-app/js/config/supabase.js`: shared browser database client.

The development server maps `/`, `/login`, `/home` and `/admin` to their HTML pages.

## Public content

Edit guide content in `seo-content.cjs` and templates in `seo-generator.cjs`.
The build regenerates the public HTML pages, robots.txt and sitemap.xml.
Keep canonical URLs consistent with deployment redirects.

## Additional source

`app/`, `components/`, `lib/`, `src/`, `server.ts` and the Next.js configuration contain earlier implementations. They are retained for reference and are not the active Vite application. The `app/api/` handlers do not run in the static build.

## Administrator sessions

Administrator sessions use the `admin_sessions` table. The browser guard checks the saved session token, and password changes invalidate existing sessions.
