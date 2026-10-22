/**
 * TopPay SEO page generator.
 *
 * Content ke liye seo-content.cjs, visual styles ke liye seo-styles.cjs.
 * Ye file sirf HTML template + head tags + schema banata hai.
 *
 * Run: npm run generate:seo   (build se pehle automatically chalta hai)
 */

const fs = require('fs');
const path = require('path');

const { domain, websiteNode, organizationNode, pages, legalPages } = require('./seo-content.cjs');
const { styles } = require('./seo-styles.cjs');
const guide = require('./toppay-guide.cjs');

const publicDir = path.join(__dirname, 'public');
const socialImage = `${domain}/toppay-og.png`;
const registerUrl = `${domain}/toppay-registration.html`;
const telegramUrl = 'https://t.me/toppayofficial00';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') === content) {
    return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function attr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const today = new Date().toISOString().slice(0, 10);
const allPages = [...pages, ...legalPages];

/* ------------------------------------------------------------------ *
 *  Shared blocks
 * ------------------------------------------------------------------ */

const guideNavigation = `
      <nav class="guide-nav" id="guide-list" aria-label="TopPay guide navigation">
        <p class="eyebrow">Explore TopPay</p>
        <h2>Related TopPay guides</h2>
        <div class="link-grid">
          <a href="/toppay-guide.html">All Toppay Guides</a>
          <a href="/about-toppay.html">About Toppay</a>
          <a href="/toppay-real-or-fake.html">Toppay Real or Fake</a>
          <a href="/toppay-app-download.html">Toppay App Download</a>
          <a href="/toppay-apk.html">Toppay APK Guide</a>
          <a href="/toppay-usdt.html">Toppay USDT</a>
          <a href="/usdt-to-inr.html">USDT to INR</a>
          <a href="/how-to-use-toppay.html">How to Use Toppay</a>
          <a href="/how-to-deposit-toppay.html">Toppay Deposit Guide</a>
          <a href="/how-to-deposit-usdt-toppay.html">USDT Deposit Guide</a>
          <a href="/toppay-withdrawal.html">Toppay Withdrawal</a>
          <a href="/toppay-password-help.html">Password Help</a>
          <a href="/toppay-support.html">Toppay Support</a>
          <a href="/toppay-customer-care.html">Customer Care</a>
          <a href="/toppay-hindi.html">हिंदी गाइड</a>
        </div>
      </nav>`;

const siteFooter = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <strong>TopPay</strong><br />
          Official Toppay login, app access and USDT guides for top-payy.online.
        </div>
        <div>
          <a href="/toppay-guide.html">Guides</a> &middot;
          <a href="/about-toppay.html">About</a> &middot;
          <a href="/toppay-customer-care.html">Contact</a> &middot;
          <a href="/toppay-support.html">Support</a> &middot;
          <a href="/">Login</a>
          <br />
          <a href="/privacy-policy.html">Privacy Policy</a> &middot;
          <a href="/terms-and-conditions.html">Terms</a> &middot;
          <a href="/refund-policy.html">Refund Policy</a> &middot;
          <a href="/disclaimer.html">Disclaimer</a>
        </div>
      </div>
    </footer>`;

/* calculator markup + behaviour (unchanged design) */
function calculatorHtml(page) {
  if (!page.calculator) return '';
  return `
      <section class="calculator-card" aria-labelledby="usdt-calculator-title">
        <div class="calc-head">
          <div><p class="eyebrow">USDT estimate</p><h2 id="usdt-calculator-title">USDT to INR Calculator</h2></div>
          <span class="rate-badge" id="rateBadge">&#8377;109.65 / USDT</span>
        </div>
        <div class="calc-boxes">
          <div class="calc-box"><label for="usdtAmount">You enter (USDT)</label><input id="usdtAmount" type="number" min="1" step="1" value="1000" inputmode="decimal" /></div>
          <span class="calc-arrow" aria-hidden="true">&darr;</span>
          <div class="calc-box"><span>Estimated INR</span><output class="calc-output" id="inrOutput" for="usdtAmount inrRate">&#8377;1,09,650</output></div>
        </div>
        <div class="range-row">
          <input id="usdtRange" type="range" min="1" max="5000" step="1" value="1000" aria-label="USDT amount" />
          <label class="rate-field" for="inrRate">&#8377; <input id="inrRate" type="number" min="0.01" step="0.01" value="109.65" inputmode="decimal" /> rate</label>
        </div>
        <p class="calc-note">यह केवल अनुमान है। Transaction से पहले अपने signed-in TopPay dashboard में दिख रहे current rate, fees और final amount को verify करें।</p>
      </section>`;
}

const calculatorScript = `
    <script>
      (() => {
        const amount = document.getElementById('usdtAmount');
        if (!amount) return;
        const range = document.getElementById('usdtRange');
        const rate = document.getElementById('inrRate');
        const output = document.getElementById('inrOutput');
        const badge = document.getElementById('rateBadge');
        const formatInr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
        const update = (source) => {
          if (source === range) amount.value = range.value;
          if (source === amount) range.value = Math.min(5000, Math.max(1, Number(amount.value) || 1));
          const total = Math.max(0, Number(amount.value) || 0) * Math.max(0, Number(rate.value) || 0);
          output.value = formatInr.format(total);
          output.textContent = formatInr.format(total);
          badge.textContent = '\\u20B9' + (Number(rate.value) || 0).toLocaleString('en-IN') + ' / USDT';
        };
        [amount, range, rate].forEach((control) => control.addEventListener('input', () => update(control)));
        update(amount);
      })();
    </script>`;

function quickBlockHtml(page) {
  const item = page.quick;
  if (!item || page.noQuick) return '';
  const heading = page.body.match(/<h1>(.*?)<\/h1>/)?.[1] || page.title;
  return `
      <section class="answer-card" aria-labelledby="quick-answer">
        <p class="eyebrow">Quick answer</p>
        <h2 id="quick-answer">${heading}</h2>
        <p>${item.summary}</p>
      </section>
      <section>
        <h2>Who is this guide for?</h2>
        <p>${item.audience}</p>
        <div class="topic-box" aria-labelledby="topics-covered">
          <h2 id="topics-covered">Search topics covered</h2>
          <p>This guide directly covers these related Toppay searches:</p>
          <ul class="topic-list">${item.queries.map((query) => `<li>${query}</li>`).join('')}</ul>
        </div>
        <h2>Key checks</h2>
        <ul>${item.keyPoints.map((point) => `<li>${point}</li>`).join('')}</ul>
      </section>
      <section class="faq" aria-labelledby="common-questions">
        <h2 id="common-questions">Common questions</h2>
        ${item.questions.map(([question, answer]) => `<h3>${question}</h3><p>${answer}</p>`).join('')}
      </section>`;
}

/* ------------------------------------------------------------------ *
 *  Page renderer
 * ------------------------------------------------------------------ */

function renderPage(page) {
  const canonical = `${domain}/${page.filename}`;
  const lang = page.lang || 'en';
  const heading = page.body.match(/<h1>(.*?)<\/h1>/)?.[1] || page.title.split('|')[0].trim();
  const bodyWithoutH1 = page.body.replace(/<h1>.*?<\/h1>/, '').trim();
  const shortTitle = page.title.split('|')[0].trim();

  /* ---- JSON-LD: one @graph, one FAQPage max, consistent @id domain ---- */
  const graph = [
    websiteNode,
    organizationNode,
    {
      '@type': page.schemaType === 'FAQPage' ? 'WebPage' : page.schemaType || 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: shortTitle,
      headline: heading,
      description: page.description,
      inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      publisher: { '@id': `${domain}/#organization` },
      primaryImageOfPage: { '@id': `${domain}/#logo` },
      datePublished: '2026-08-01',
      dateModified: today,
      keywords: (page.keywords || []).join(', '),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Toppay Login', item: `${domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Toppay Guides', item: `${domain}/toppay-guide.html` },
        { '@type': 'ListItem', position: 3, name: shortTitle, item: canonical },
      ],
    },
  ];

  // Exactly one FAQPage per page (duplicate FAQPage blocks were invalid before).
  const questions = page.quick?.questions || [];
  if (questions.length && !page.noQuick) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
      isPartOf: { '@id': `${canonical}#webpage` },
      mainEntity: questions.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  if (page.filename === 'toppay-guide.html') return guide.landing(websiteNode, organizationNode);
  return guide.article(page, graph, quickBlockHtml(page), calculatorHtml(page), page.calculator ? calculatorScript : '');
}

/* ------------------------------------------------------------------ *
 *  Write everything
 * ------------------------------------------------------------------ */

guide.syncLogin();

let written = 0;
for (const page of allPages) {
  if (writeIfChanged(path.join(publicDir, page.filename), renderPage(page))) written += 1;
}

/* robots.txt --------------------------------------------------------- */
const robots = `# https://top-payy.online/robots.txt
User-agent: *
Allow: /

# Account and administrator pages
Disallow: /admin
Disallow: /admin-app/
Disallow: /user-app/

# Allow crawling of redirects and error pages so crawlers can process
# their redirect responses and noindex metadata.

# Media and asset crawling is allowed
Allow: /assets/
Allow: /toppay-logo.jpeg
Allow: /toppay-og.png

Sitemap: ${domain}/sitemap.xml
`;
writeIfChanged(path.join(publicDir, 'robots.txt'), robots);

/* manifest.json ------------------------------------------------------ */
const manifest = {
  name: 'TopPay — Toppay Official Login & App',
  short_name: 'TopPay',
  description: 'Official Toppay login, Toppay app access and Toppay USDT guides.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#ffffff',
  theme_color: '#1f2d7a',
  lang: 'en-IN',
  dir: 'ltr',
  categories: ['finance', 'business'],
  icons: [
    { src: '/toppay-logo.jpeg', sizes: '640x640', type: 'image/jpeg', purpose: 'any maskable' },
  ],
};
writeIfChanged(path.join(publicDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

/* 404.html — real 404 page instead of the old soft-404 stub ----------- */
const notFound = `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found (404) | TopPay</title>
    <meta name="description" content="This Toppay page could not be found. Use the links below to reach the Toppay login, the guide hub or Toppay customer care." />
    <meta name="robots" content="noindex, follow" />
    <link rel="icon" type="image/svg+xml" href="/toppay-logo.svg" />
    <style>${styles}</style>
  </head>
  <body>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="/toppay-guide.html" aria-label="Toppay Guides"><img class="brand-mark" src="/toppay-logo.svg" width="38" height="38" alt="Toppay logo" /><span>TopPay</span></a>
        <div class="header-actions"><a class="button login-link" href="/">Toppay Login</a></div>
      </div>
    </header>
    <main>
      <div class="content-grid">
        <article class="content-panel">
          <h1>Page not found (404)</h1>
          <p>The page you were looking for does not exist on <strong>top-payy.online</strong>. It may have been moved, or the address may contain a typing error.</p>
          <h2>Where to go next</h2>
          <ul>
            <li><a href="/">Toppay login</a></li>
            <li><a href="/toppay-guide.html">All Toppay guides</a></li>
            <li><a href="/toppay-app-download.html">Toppay app download</a></li>
            <li><a href="/toppay-usdt.html">Toppay USDT guide</a></li>
            <li><a href="/toppay-customer-care.html">Toppay customer care</a></li>
          </ul>
          <p>If you arrived here from a link someone sent you, verify the full address before entering any account details.</p>
        </article>
      </div>
    </main>
${siteFooter}
  </body>
</html>
`;
writeIfChanged(path.join(publicDir, '404.html'), notFound);

require('./generate-sitemap.cjs');

console.log(`SEO generator: ${allPages.length} pages rendered (${written} changed), robots.txt, manifest.json, 404.html and sitemap.xml written.`);
