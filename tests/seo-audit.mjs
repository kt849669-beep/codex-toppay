/**
 * TopPay SEO audit.
 *
 * Run with npm run test:seo after generating the public pages.
 * Checks canonical URLs, redirects, sitemap entries, metadata and content.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const DOMAIN = 'https://top-payy.online';
const MIN_WORDS = 600;

const failures = [];
const notes = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

/* ---------------------------------------------------------------- *
 * 1. Config-level checks
 * ---------------------------------------------------------------- */

const redirectsContent = read(path.join(publicDir, '_redirects'));
const redirectSources = new Set();
const rewriteSources = new Set();
for (const line of redirectsContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 3) {
    const [src, dest, status] = parts;
    if (status === '200') {
      rewriteSources.add(src);
    } else if (['301', '302', '307', '308'].includes(status)) {
      redirectSources.add(src);
    }
  }
}

const homePage = read(path.join(root, 'user-app', 'pages', 'login.html'));
check(homePage.includes(`<link rel="canonical" href="${DOMAIN}/"`), 'home page: canonical host is incorrect');
check(homePage.includes('href="/toppay-logo.jpeg"'), 'home page: TopPay favicon link missing');
check(fs.existsSync(path.join(publicDir, 'toppay-logo.jpeg')), 'favicon file: toppay-logo.jpeg is missing');

/* ---------------------------------------------------------------- *
 * 2. robots.txt & sitemap.xml
 * ---------------------------------------------------------------- */

const robots = read(path.join(publicDir, 'robots.txt'));
check(robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`), 'robots.txt: sitemap line missing or wrong host');
check(robots.includes('Disallow: /admin'), 'robots.txt: /admin not disallowed');
check(robots.includes('Disallow: /user-app/'), 'robots.txt: /user-app/ not disallowed (duplicate of /)');

const sitemap = read(path.join(publicDir, 'sitemap.xml'));
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
check(sitemapUrls.length > 0, 'sitemap.xml: no URLs');

for (const url of sitemapUrls) {
  check(url.startsWith(`${DOMAIN}/`), `sitemap.xml: URL is not on the canonical host: ${url}`);
  const pathname = url.replace(DOMAIN, '') || '/';
  check(
    !redirectSources.has(pathname),
    `sitemap.xml: contains a URL that vercel.json redirects (${pathname}) -- Google will mark it "Page with redirect"`,
  );
}
check(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap.xml: duplicate URLs');

/* ---------------------------------------------------------------- *
 * 3. manifest.json
 * ---------------------------------------------------------------- */

const manifestRaw = read(path.join(publicDir, 'manifest.json'));
check(manifestRaw.trim().length > 0, 'manifest.json is empty (referenced by <link rel="manifest">)');
let manifest = {};
try {
  manifest = JSON.parse(manifestRaw);
} catch (error) {
  failures.push(`manifest.json: invalid JSON (${error.message})`);
}
check(Boolean(manifest.name && manifest.start_url && (manifest.icons || []).length), 'manifest.json: missing name, start_url or icons');

/* ---------------------------------------------------------------- *
 * 4. Open Graph image asset
 * ---------------------------------------------------------------- */

check(fs.existsSync(path.join(publicDir, 'toppay-og.png')), 'public/toppay-og.png missing (SVG og:image does not render on social platforms)');

/* ---------------------------------------------------------------- *
 * 5. Per-page checks
 * ---------------------------------------------------------------- */

const htmlFiles = fs
  .readdirSync(publicDir)
  .filter((file) => file.endsWith('.html') && !['404.html', 'offline.html'].includes(file));

check(htmlFiles.length >= 15, `public/: expected at least 15 SEO pages, found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const html = read(path.join(publicDir, file));
  const label = `public/${file}`;
  const one = (re) => html.match(re)?.[1]?.trim();

  /* -- head essentials -- */
  const title = one(/<title>(.*?)<\/title>/s);
  check(Boolean(title), `${label}: missing <title>`);
  if (title) check(title.length <= 75, `${label}: title too long (${title.length} chars)`);

  const description = one(/<meta name="description" content="(.*?)"/s);
  check(Boolean(description), `${label}: missing meta description`);
  if (description) {
    check(description.length >= 70 && description.length <= 175, `${label}: meta description length ${description.length} (want 70-175)`);
  }

  check(Boolean(one(/<meta name="keywords" content="(.*?)"/s)), `${label}: missing meta keywords`);

  /* -- canonical must be on the canonical host AND must not redirect -- */
  const canonical = one(/<link rel="canonical" href="(.*?)"/);
  check(Boolean(canonical), `${label}: missing canonical`);
  if (canonical) {
    check(canonical === `${DOMAIN}/${file}`, `${label}: canonical should be ${DOMAIN}/${file}, found ${canonical}`);
    const canonicalPath = canonical.replace(DOMAIN, '');
    check(
      !redirectSources.has(canonicalPath),
      `${label}: canonical points at a URL that vercel.json redirects (${canonicalPath})`,
    );
    check(
      !rewriteSources.has(canonicalPath),
      `${label}: canonical points at a rewrite source (${canonicalPath})`,
    );
    check(sitemapUrls.includes(canonical), `${label}: canonical URL is not listed in sitemap.xml`);
  }

  /* -- hreflang -- */
  check(html.includes('hreflang="x-default"'), `${label}: missing hreflang x-default`);

  /* -- social -- */
  check(html.includes(`${DOMAIN}/toppay-og.png`), `${label}: og:image is not the 1200x630 PNG`);
  check(html.includes('twitter:card'), `${label}: missing twitter:card`);

  /* -- no dead www-host references anywhere in the document -- */
  const wwwReferences = (html.match(/https:\/\/www\.toppay-offical\.website/g) || []).length;
  check(wwwReferences === 0, `${label}: ${wwwReferences} dead www-host reference(s) found -- must use ${DOMAIN}`);

  /* -- headings -- */
  const h1s = html.match(/<h1[^>]*>/g) || [];
  check(h1s.length === 1, `${label}: expected exactly 1 <h1>, found ${h1s.length}`);

  /* -- images have alt -- */
  const imgs = html.match(/<img[^>]*>/g) || [];
  const missingAlt = imgs.filter((tag) => !/\salt=/.test(tag));
  check(missingAlt.length === 0, `${label}: ${missingAlt.length} <img> without alt`);

  /* -- JSON-LD: valid, single @graph, at most one FAQPage -- */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(blocks.length >= 1, `${label}: no JSON-LD found`);
  let faqCount = 0;
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw);
      const nodes = parsed['@graph'] || [parsed];
      faqCount += nodes.filter((node) => node['@type'] === 'FAQPage').length;
      for (const node of nodes) {
        const ids = JSON.stringify(node).match(/https:\/\/www\.toppay-offical\.website/g) || [];
        check(ids.length === 0, `${label}: JSON-LD contains a dead www-host @id/url`);
      }
    } catch (error) {
      failures.push(`${label}: invalid JSON-LD (${error.message})`);
    }
  }
  check(faqCount <= 1, `${label}: ${faqCount} FAQPage blocks on one page (only 1 allowed)`);

  /* -- content depth -- */
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  check(words >= MIN_WORDS, `${label}: only ${words} words (minimum ${MIN_WORDS})`);
  notes.push(`${file.padEnd(34)} ${String(words).padStart(5)} words`);
}

/* ---------------------------------------------------------------- *
 * 6. Homepage (login page) checks
 * ---------------------------------------------------------------- */

const loginPath = path.join(root, 'user-app', 'pages', 'login.html');
const login = read(loginPath);
check(login.includes(`<link rel="canonical" href="${DOMAIN}/" />`), 'login.html: canonical must use the live apex homepage');
check((login.match(/https:\/\/www\.toppay-offical\.website/g) || []).length === 0, 'login.html: dead www-host reference found');
check(login.includes('hreflang="x-default"'), 'login.html: missing hreflang x-default');
check(login.includes(`${DOMAIN}/toppay-og.png`), 'login.html: og:image is not the 1200x630 PNG');
const loginLd = [...login.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
check(loginLd.length === 1, `login.html: expected 1 JSON-LD block, found ${loginLd.length}`);
for (const [, raw] of loginLd) {
  try {
    JSON.parse(raw);
  } catch (error) {
    failures.push(`login.html: invalid JSON-LD (${error.message})`);
  }
}

/* ---------------------------------------------------------------- *
 * 7. portal.html must not compete with the homepage
 * ---------------------------------------------------------------- */

const portalPath = path.join(root, 'portal.html');
if (fs.existsSync(portalPath)) {
  const portal = read(portalPath);
  check(/<meta name="robots" content="noindex/.test(portal), 'portal.html: must be noindex (duplicate homepage)');
}

/* ---------------------------------------------------------------- *
 * Report
 * ---------------------------------------------------------------- */

console.log('\nWord count per page');
console.log('-------------------');
notes.sort().forEach((line) => console.log('  ' + line));

if (failures.length) {
  console.error(`\nSEO audit FAILED with ${failures.length} issue(s):\n`);
  failures.forEach((message) => console.error('  x ' + message));
  process.exit(1);
}

console.log(`\nSEO audit passed: ${htmlFiles.length} pages, ${sitemapUrls.length} sitemap URLs, 0 issues.\n`);
