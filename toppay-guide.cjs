const fs = require('fs');
const path = require('path');
const domain = 'https://top-payy.online';
const assets = '/toppay-guide-assets';
const templateFile = path.join(__dirname, 'templates/toppay-guide.html.inc');
const keywords = ['Toppay', 'Toppay login', 'Top pay', 'Top pay login', 'Toppay app download', 'Toppay USDT to INR', 'Toppay official app', 'Toppay official site'];
const screenshots = [
  ['home', 'Home dashboard', 'USDT ratio, bonus and account overview', 782, 1600],
  ['deposit', 'Deposit and INR tasks', 'Task amounts, income, quota and filters', 878, 1600],
  ['upi', 'UPI account tools', 'Receive Payment, Send Payment and account availability', 784, 1600],
  ['tutorials', 'TopPay tutorials', 'App access, promotions and payment tutorials', 784, 1600],
  ['team', 'Team dashboard', 'Commission, team recharge and invite tools', 784, 1600],
  ['history', 'Recharge history', 'USDT and INR recharge history example', 589, 1280],
  ['channel', 'Choose a UPI channel', 'PhonePe, Mobikwik, Paytm, Navi and PaytmBusiness', 589, 1280],
  ['channel-phone', 'UPI phone step', 'The phone step in the Bind UPI setup flow', 589, 1280],
  ['register', 'TopPay registration', 'Phone, OTP, password and invite fields', 589, 1280],
  ['mpin', 'MPIN entry', 'The PIN entry panel in the supplied UPI screen', 589, 1280],
  ['login', 'TopPay login', 'Phone number, password and Forget Password link', 589, 1280],
  ['forgot-password', 'Password recovery', 'Password reset screen with personal details concealed', 782, 1600],
  ['authenticator', 'Google Authentication', 'Authenticator setup screen with private QR and key concealed', 784, 1600],
].filter(([id]) => fs.existsSync(path.join(__dirname, 'public', assets, `toppay-${id}.jpeg`)));

const links = [
  ['toppay-guide.html', 'TopPay app guide'], ['toppay-app-download.html', 'TopPay app download'],
  ['toppay-registration.html', 'TopPay registration'], ['toppay-upi.html', 'TopPay UPI setup'],
  ['toppay-team.html', 'TopPay team'], ['toppay-security.html', 'TopPay security'],
  ['toppay-apk.html', 'TopPay APK guide'], ['toppay-usdt.html', 'TopPay USDT'],
  ['usdt-to-inr.html', 'TopPay USDT to INR'], ['how-to-deposit-toppay.html', 'TopPay deposit'],
  ['toppay-withdrawal.html', 'TopPay withdrawal'], ['toppay-password-help.html', 'Password help'],
  ['toppay-customer-care.html', 'Customer care'], ['toppay-hindi.html', 'हिंदी गाइड'],
];
function attr(value) { return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
function text(value) { return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replaceAll('&amp;', '&').trim(); }
function guideLinks() { return `<nav class="resource-links guide-links" aria-label="TopPay page links">${links.map(([url, label]) => `<a href="/${url}">${label}</a>`).join('')}</nav>`; }
function screenshotCards(ids, article = false) {
  const chosen = ids.map(id => screenshots.find(item => item[0] === id)).filter(Boolean);
  return `<div class="${article ? 'article-screens' : 'preview-grid'}">${chosen.map(([id, label, caption, width, height], index) => `<figure class="${article ? '' : 'preview-card'}"><div class="${article ? '' : 'preview-image'}"><a href="${assets}/toppay-${id}.jpeg" target="_blank" rel="noopener"><img src="${assets}/toppay-${id}.jpeg" width="${width}" height="${height}" alt="TopPay ${attr(label.toLowerCase())}: ${attr(caption)}" loading="lazy" decoding="async"></a></div><figcaption>${article ? '' : `<span class="preview-number">${String(index + 1).padStart(2, '0')}</span>`}<div>${article ? '' : `<h3>${label}</h3>`}<p>${caption}</p></div></figcaption></figure>`).join('')}</div>`;
}
function body(embedded = false) {
  let html = fs.readFileSync(templateFile, 'utf8').replace('{{GUIDE_LINKS}}', guideLinks());
  html = html.replace(/<div class="preview-grid">[\s\S]*?<\/div>\s*<p class="section-note">/, `${screenshotCards(['home', 'deposit', 'upi'])}<details class="screen-gallery-extra"><summary>View all ${screenshots.length} TopPay screenshots</summary>${screenshotCards(screenshots.slice(3).map(item => item[0]))}</details><p class="section-note">`);
  html = html.replaceAll('This independent guide explains those screens', 'This app guide explains those screens');
  html = html.replace('Explore the TopPay app, INR tasks and wallet tools.', 'Explore the TopPay official app, INR tasks and wallet tools.');
  html = html.replace('<summary>What is TopPay?</summary>', '<summary>What is TopPay (Top pay)?</summary>');
  html = html.replace('<summary>Is top-payy.online the TopPay official website?</summary>', '<summary>Where are the TopPay official site and Top pay login?</summary>');
  html = html.replace('This website provides TopPay login access and public app guides.', 'The TopPay official site links and Top pay login on this website use top-payy.online. This website provides login access and public app guides.');
  html = html.replace('The first step is TopPay registration.', 'The first step is TopPay registration.');
  html = html.replaceAll('The Me screen shows recharge history, token history, Bank Card, language selection, Google Authentication and Contact Us.', 'The supplied screens cover recharge history, team details, UPI account setup, MPIN entry and Google Authentication.');
  html = html.replaceAll('Task, More Earn and UPI tabs', 'INR, USDT, Task and VIP tabs');
  html = html.replace(/(<img[^>]*src="\/toppay-guide-assets\/toppay-home.jpeg"[^>]*alt=")[^"]*"/g, '$1TopPay home screenshot showing 1 USDT approximately 109.65 INR, a 2% USDT bonus and 4% INR bonus"');
  html = html.replaceAll('TopPay Homes', 'TopPay guide');
  html = html.replace(/<img[^>]*src="\/toppay-guide-assets\/toppay-([^"/]+)\.jpeg"[^>]*>/g, (tag, id) => {
    const shot = screenshots.find(item => item[0] === id);
    return shot ? tag.replace(/width="\d+"/, `width="${shot[3]}"`).replace(/height="\d+"/, `height="${shot[4]}"`) : tag;
  });
  html = html.replace(/(<a[^>]*class="[^"]*download-link[^"]*"[^>]*href=")[^"]*"/g, `$1${domain}/toppay-app-download.html"`);
  if (!embedded) html = html.replace('toppay-guide toppay-guide--embedded', 'toppay-guide').replace('<h2 class="guide-title" id="hero-title">', '<h1 class="guide-title" id="hero-title">').replace('</em>\n            </h2>', '</em>\n            </h1>');
  return html.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '');
}
function faqNodes(html, canonical) {
  const questions = [...html.matchAll(/<details(?: open)?>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)];
  return questions.length ? [{ '@type': 'FAQPage', '@id': `${canonical}#faq`, isPartOf: { '@id': `${canonical}#webpage` }, mainEntity: questions.map(([, question, answer]) => ({ '@type': 'Question', name: text(question), acceptedAnswer: { '@type': 'Answer', text: text(answer) } })) }] : [];
}
function imageNodes() {
  return screenshots.map(([id, label, caption, width, height]) => ({ '@type': 'ImageObject', '@id': `${domain}/toppay-guide.html#image-${id}`, contentUrl: `${domain}${assets}/toppay-${id}.jpeg`, name: `TopPay ${label}`, caption, width, height }));
}
function head(title, description, canonical, graph, language = 'en-IN') {
  return `<!doctype html><html lang="${language}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${attr(title)}</title><meta name="description" content="${attr(description)}" /><meta name="keywords" content="${attr(keywords.join(', '))}" /><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><link rel="alternate" hreflang="${language}" href="${canonical}" /><link rel="alternate" hreflang="x-default" href="${canonical}" /><link rel="icon" href="/toppay-logo.jpeg" /><link rel="manifest" href="/manifest.json" /><link rel="sitemap" type="application/xml" href="/sitemap.xml" /><meta property="og:type" content="website" /><meta property="og:site_name" content="TopPay" /><meta property="og:title" content="${attr(title)}" /><meta property="og:description" content="${attr(description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${domain}/toppay-og.png" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${attr(title)}" /><meta name="twitter:description" content="${attr(description)}" /><meta name="twitter:image" content="${domain}/toppay-og.png" /><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script><link rel="stylesheet" href="${assets}/guide.css" /><script defer src="${assets}/guide.js"></script></head>`;
}
function landing(websiteNode, organizationNode) {
  const canonical = `${domain}/toppay-guide.html`;
  const title = 'TopPay App Guide | Login, Download & USDT to INR';
  const description = 'Explore TopPay login, app download and registration guides, supplied app screenshots, UPI setup, INR task examples and a USDT to INR calculator.';
  const html = body(false);
  const graph = [websiteNode, organizationNode, { '@type': 'CollectionPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description, isPartOf: { '@id': `${domain}/#website` }, inLanguage: 'en-IN', dateModified: '2026-10-12' }, ...imageNodes(), ...faqNodes(html, canonical)];
  return `${head(title, description, canonical, graph)}<body class="toppay-guide-page">${html}</body></html>`;
}
function syncLogin() {
  const file = path.join(__dirname, 'user-app/pages/login.html');
  let html = fs.readFileSync(file, 'utf8');
  const guide = `<!-- TOPPAY GUIDE START -->\n${body(true)}\n<!-- TOPPAY GUIDE END -->\n\n    `;
  if (html.includes('<!-- TOPPAY GUIDE START -->')) html = html.replace(/<!-- TOPPAY GUIDE START -->[\s\S]*?<!-- TOPPAY GUIDE END -->\s*/, guide);
  else html = html.replace(/<section class="login-seo-content"[\s\S]*?(?=<!-- Limit Popup -->)/, guide);
  if (!html.includes(`${assets}/guide.css`)) html = html.replace('</head>', `<link rel="stylesheet" href="${assets}/guide.css" />\n    <script defer src="${assets}/guide.js"></script>\n  </head>`);
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
    const data = JSON.parse(json);
    data['@graph'] = data['@graph'].filter(node => !['FAQPage', 'ImageObject'].includes(node['@type']));
    data['@graph'].push(...imageNodes(), ...faqNodes(body(true), `${domain}/`));
    return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
  });
  if (html !== fs.readFileSync(file, 'utf8')) fs.writeFileSync(file, html);
}
function articleScreens(filename) {
  const mapping = {
    'toppay-app-download.html': ['home', 'tutorials'], 'toppay-apk.html': ['login', 'home'],
    'how-to-use-toppay.html': ['home', 'tutorials'], 'how-to-deposit-toppay.html': ['deposit', 'history'],
    'how-to-deposit-usdt-toppay.html': ['home', 'history'], 'toppay-usdt.html': ['home', 'history'],
    'usdt-to-inr.html': ['home', 'history'], 'toppay-password-help.html': ['login', 'forgot-password'],
    'toppay-registration.html': ['register', 'login'], 'toppay-upi.html': ['upi', 'channel', 'channel-phone'],
    'toppay-team.html': ['team'], 'toppay-security.html': ['mpin', 'authenticator'],
    'about-toppay.html': ['home', 'team'],
  };
  return screenshotCards(mapping[filename] || [], true);
}
function article(page, graph, quick, calculator, calculatorScript) {
  const canonical = `${domain}/${page.filename}`;
  let shell = body(false);
  let header = shell.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
  header = header.replace(/href="#/g, 'href="/toppay-guide.html#');
  let footer = shell.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)[0].replace(/href="#/g, 'href="/toppay-guide.html#');
  const visual = shell.match(/<div class="hero-visual"[\s\S]*?<p class="visual-caption">[\s\S]*?<\/p>\s*<\/div>/)[0];
  const heading = page.body.match(/<h1>(.*?)<\/h1>/)?.[1] || page.title;
  const copy = page.body.replace(/<h1>.*?<\/h1>/, '').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').trim();
  return `${head(page.title, page.description, canonical, [...graph, ...imageNodes()], page.lang === 'hi' ? 'hi-IN' : 'en-IN')}<body class="toppay-guide-page"><div class="toppay-guide" id="toppay-guide">${header}<main id="guide-main"><section class="hero"><div class="container hero-grid"><div><p class="eyebrow">TopPay app guides</p><h1 class="guide-title">${heading}</h1><p class="hero-description">${page.description}</p><div class="hero-actions"><a class="button button-dark" href="/">TopPay Login ↗</a><a class="button button-outline" href="/toppay-registration.html">Registration guide</a></div><p class="rate-note">Screenshot reference · 1 USDT ≈ ₹109.65</p></div>${visual}</div></section><section class="guide-article"><div class="container article-grid"><article class="article-copy">${copy}${articleScreens(page.filename)}${calculator}${quick}<p>Last updated: 12 October 2026 · <a href="/disclaimer.html">Read the disclaimer</a></p></article><aside class="article-aside"><p class="eyebrow">Explore TopPay</p>${links.map(([url, label]) => `<a href="/${url}">${label}</a>`).join('')}<p>Check current rates, fees and account details in your own signed-in account.</p></aside></div></section><section class="guide-nav-section"><div class="container"><h2>More TopPay guides</h2>${guideLinks()}</div></section></main>${footer}</div>${calculatorScript}</body></html>`;
}
module.exports = { body, landing, syncLogin, article, screenshots, keywords };
