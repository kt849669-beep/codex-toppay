/**
 * TopPay SEO content source.
 * Har page ka title, description, keywords, schema aur body content yahan hai.
 * Ise seo-generator.cjs use karta hai. Design/UI template generator me hai --
 * yahan sirf content hai.
 */

const domain = 'https://top-payy.online';

// Global brand keyword set (title/description/body me natural rup se use hota hai)
const brandKeywords = [
  'Toppay',
  'Toppay login',
  'Top pay',
  'Toppay official',
  'Toppay usdt',
  'Toppay apk',
  'Toppay app',
  'Toppay apk download',
  'Toppay app download',
  'Top pay login',
  'Toppay official website',
  'Toppay login page',
  'Toppay real or fake',
  'Toppay USDT to INR',
  'Toppay official app',
  'Toppay official site',
];

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${domain}/#website`,
  url: `${domain}/`,
  name: 'TopPay',
  alternateName: [
    'Toppay',
    'Top pay',
    'Toppay official',
    'Toppay login',
    'Toppay app',
    'Toppay apk',
    'Toppay usdt',
    'Toppay apk download',
    'Toppay app download',
    'Toppay official website',
    'Top pay login',
  ],
  inLanguage: 'en-IN',
  publisher: { '@id': `${domain}/#organization` },
};

const organizationNode = {
  '@type': 'Organization',
  '@id': `${domain}/#organization`,
  name: 'TopPay',
  alternateName: ['Toppay', 'Top pay', 'Toppay official', 'Toppay official website'],
  url: `${domain}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': `${domain}/#logo`,
    url: `${domain}/toppay-logo.jpeg`,
    width: 640,
    height: 640,
  },
  image: { '@id': `${domain}/#logo` },
  description:
    'TopPay (Toppay) is the official mobile-friendly web platform for TopPay account login, Toppay app, Toppay APK download access and Toppay USDT payment guides.',
  areaServed: 'IN',
  sameAs: ['https://t.me/toppayofficial00', 'https://t.me/bolintoppay1'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${domain}/toppay-customer-care.html`,
      availableLanguage: ['en', 'hi'],
      areaServed: 'IN',
    },
  ],
};

/* ------------------------------------------------------------------ *
 *  PAGES
 * ------------------------------------------------------------------ */

const pages = [
  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-guide.html',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Toppay Guides | Toppay Login, Toppay App, APK & USDT Help',
    description:
      'Official Toppay guide hub: Toppay login help, Toppay app and APK access, Toppay USDT deposit and withdrawal checks, password recovery and customer care.',
    keywords: ['Toppay', 'Toppay guide', 'Toppay login', 'Toppay app', 'Toppay apk', 'Toppay usdt', 'Top pay', 'Toppay official'],
    heroEyebrow: 'TopPay · Official guide hub',
    schemaType: 'CollectionPage',
    body: `
      <h1>Toppay Guides</h1>
      <p><strong>Toppay</strong> (also written as <strong>Top pay</strong> or TopPay) is a mobile-friendly payment account platform. This page is the central guide hub for everything on the official <strong>Toppay</strong> website at <strong>top-payy.online</strong> &mdash; the <strong>Toppay login</strong>, the <strong>Toppay app</strong> and <strong>Toppay APK</strong> question, <strong>Toppay USDT</strong> deposits and withdrawals, password recovery, and the honest answer to the common search <strong>&ldquo;Toppay real or fake&rdquo;</strong>.</p>
      <p>If you are not sure which page you need, start here. Every guide below is written for one specific task, so you can go straight to the answer instead of reading everything.</p>

      <h2>Start with the Toppay login</h2>
      <p>The account entry point for this platform is the <a href="/">Toppay login page</a> on this same domain. Before you type a phone number or password, check that your browser address bar shows exactly <strong>top-payy.online</strong>. Payment brands are commonly copied by look-alike domains, and the address bar is the single most reliable check available to you.</p>
      <p>The login itself only needs two things: the registered phone number and the account password. If either one does not work, do not keep retrying &mdash; go to the <a href="/toppay-password-help.html">Toppay password help guide</a> instead.</p>

      <h2>Toppay app and Toppay APK</h2>
      <p>One of the most searched phrases around this brand is <strong>Toppay app download</strong> and <strong>Toppay APK</strong>. The short answer: the <strong>Toppay app</strong> experience on this domain is delivered as a responsive web application, so it opens directly in any modern mobile browser and you can add it to your home screen without installing anything.</p>
      <p>Read the full explanation, including why unverified APK files are risky, in the <a href="/toppay-apk.html">Toppay APK and app access guide</a> and the <a href="/toppay-app-download.html">Toppay app download guide</a>.</p>

      <h2>Toppay USDT: deposits, withdrawals and networks</h2>
      <p><strong>Toppay USDT</strong> is the second-largest search cluster for this brand. USDT transfers are irreversible, so a single wrong network selection or a mistyped wallet address can result in permanent loss. Before any transfer, read:</p>
      <ul>
        <li><a href="/toppay-usdt.html">Toppay USDT guide</a> &mdash; network selection, address checks, confirmations</li>
        <li><a href="/how-to-deposit-usdt-toppay.html">How to deposit USDT on Toppay</a> &mdash; step-by-step deposit checklist</li>
        <li><a href="/toppay-withdrawal.html">Toppay withdrawal guide</a> &mdash; what to verify before you withdraw</li>
        <li><a href="/usdt-to-inr.html">USDT to INR converter</a> &mdash; estimate the INR value before you commit</li>
      </ul>

      <h2>Account and app access</h2>
      <p>Use these guides for day-to-day account questions.</p>
      <ul>
        <li><a href="/how-to-use-toppay.html">How to use Toppay</a> &mdash; a first-time orientation to login and dashboard</li>
        <li><a href="/about-toppay.html">About Toppay</a> &mdash; what the platform is and what it is not</li>
        <li><a href="/toppay-password-help.html">Toppay password help</a> &mdash; reset and recovery, safely</li>
        <li><a href="/toppay-customer-care.html">Toppay customer care</a> &mdash; the official support channels</li>
      </ul>

      <h2>Deposit and payment guides</h2>
      <ul>
        <li><a href="/how-to-deposit-toppay.html">How to deposit on Toppay</a> &mdash; the general deposit checklist</li>
        <li><a href="/how-to-deposit-usdt-toppay.html">How to deposit USDT on Toppay</a> &mdash; crypto-specific checks</li>
      </ul>

      <h2>Is Toppay real or fake?</h2>
      <p>Because the name &ldquo;Toppay&rdquo; is used by several unrelated apps and websites worldwide, a lot of people search <strong>Toppay real or fake</strong> before they sign up. That question deserves a direct, evidence-based answer rather than marketing copy, so it has its own page: <a href="/toppay-real-or-fake.html">Toppay real or fake &mdash; safety and verification checks</a>.</p>

      <h2>Hindi guide</h2>
      <p>अगर आप हिंदी में पढ़ना चाहते हैं, तो <a href="/toppay-hindi.html">Toppay क्या है &mdash; पूरी हिंदी गाइड</a> देखें। उसमें login, app, USDT और safety checks सब हिंदी में समझाए गए हैं।</p>

      <h2>How to use this guide hub</h2>
      <p>Every page on this site follows the same structure: a direct answer at the top, the steps or checks in the middle, and frequently asked questions at the bottom. Nothing on these public pages ever asks for your password, OTP or MPIN &mdash; if any page claiming to be Toppay asks for those outside the signed-in login form, close it immediately.</p>
      <p>These guides describe general checks and safe practice. The current source of truth for your own balance, rates, fees and available features is always the screen inside your own signed-in account.</p>
    `,
    quick: {
      queries: ['Toppay', 'Toppay login', 'Toppay app', 'Toppay apk', 'Toppay usdt', 'Top pay', 'Toppay official', 'Toppay real or fake'],
      summary:
        'This is the official Toppay guide hub on top-payy.online. Pick the guide that matches your task: Toppay login, Toppay app and APK, Toppay USDT deposits and withdrawals, password recovery, or the Toppay real-or-fake safety check.',
      audience: 'Anyone looking for a single directory of official Toppay help pages for login, app, APK, USDT and account support.',
      keyPoints: [
        'The official Toppay login for this platform is at top-payy.online.',
        'Toppay, Top pay and TopPay are spelling variants of the same brand on this site.',
        'The Toppay app runs in the mobile browser, so no APK download is required from this site.',
        'USDT transfers cannot be reversed, so read the USDT guide before your first transaction.',
      ],
      questions: [
        ['Which Toppay guide should I read first?', 'Start with the guide that matches your immediate task. For first-time users, "How to use Toppay" and the Toppay login page are the right starting point.'],
        ['Is this the official Toppay website?', 'This guide hub is published on top-payy.online, which is the domain hosting this Toppay login and account platform. Always confirm the full address in your browser before signing in.'],
        ['Do these pages ask for my password?', 'No. These are public guide pages. They never collect a password, OTP or MPIN.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'about-toppay.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Toppay Kya Hai? About Toppay Official App & Login Platform',
    description:
      'What is Toppay? A clear explanation of the Toppay official platform, the Toppay login at top-payy.online, how the Toppay app works and what the platform does not do.',
    keywords: ['Toppay', 'Toppay official', 'about Toppay', 'Toppay kya hai', 'Top pay', 'Toppay app', 'Toppay login'],
    heroEyebrow: 'TopPay · About the platform',
    schemaType: 'AboutPage',
    body: `
      <h1>About Toppay</h1>
      <p><strong>Toppay</strong> &mdash; frequently typed as <strong>Top pay</strong> or TopPay &mdash; is a mobile-first payment account platform. The <strong>Toppay official</strong> access point for this platform is the login page on <strong>top-payy.online</strong>. This page explains what the platform actually is, what you can do after signing in, and just as importantly, what it does not do.</p>

      <h2>What is Toppay?</h2>
      <p>Toppay is a web-based account platform where a registered user signs in with a phone number and password to reach a personal dashboard. Inside that dashboard the user can see the balance, transaction history and payment tools that have been enabled for their specific account.</p>
      <p>The important nuance: Toppay is not a single fixed product for every user. Available features can differ from one account to another and can change over time. That is why every guide on this site tells you the same thing &mdash; the current, authoritative information for your account is whatever is displayed on your own signed-in screen, not a screenshot, a forwarded message, or an old blog post.</p>

      <h2>Is the Toppay app different from the website?</h2>
      <p>No. The <strong>Toppay app</strong> experience on this domain is delivered through a responsive web application. The same interface that loads on a desktop browser adapts to a phone screen. There is no separate installation step required to use it, and this site does not publish a <strong>Toppay APK</strong> file.</p>
      <p>On Android, you can open top-payy.online in Chrome and use the browser menu to &ldquo;Add to Home screen&rdquo;. On iPhone, use Safari&rsquo;s Share menu and &ldquo;Add to Home Screen&rdquo;. This creates an icon that opens the platform full-screen, which is how most users get an app-like experience without downloading anything. The details are in the <a href="/toppay-app-download.html">Toppay app download guide</a>.</p>

      <h2>Toppay login</h2>
      <p>The <strong>Toppay login</strong> asks for two pieces of information: your registered mobile number and your password. Some accounts additionally use an MPIN for transaction confirmation.</p>
      <p>Three rules that apply every single time:</p>
      <ul>
        <li>Check the full domain in the address bar reads <strong>top-payy.online</strong> before typing anything.</li>
        <li>Never share your password, OTP or MPIN with anyone, including someone claiming to be support staff.</li>
        <li>If login fails repeatedly, stop and use <a href="/toppay-password-help.html">password recovery</a> rather than guessing.</li>
      </ul>

      <h2>Toppay and USDT</h2>
      <p>A large share of activity on this platform involves <strong>Toppay USDT</strong> &mdash; the Tether stablecoin. USDT exists on multiple blockchain networks (TRC20, ERC20, BEP20 and others), and those networks are not interchangeable. Sending USDT on the wrong network to an address created for a different network usually means the funds are unrecoverable.</p>
      <p>Because of that risk, the USDT material on this site is separated into its own guides: <a href="/toppay-usdt.html">Toppay USDT guide</a>, <a href="/how-to-deposit-usdt-toppay.html">USDT deposit steps</a>, and the <a href="/usdt-to-inr.html">USDT to INR converter</a> for estimating value in rupees before you act.</p>

      <h2>What Toppay is not</h2>
      <p>Being direct about limits is part of being a trustworthy source, so:</p>
      <ul>
        <li>This site is <strong>not</strong> a distributor of APK files. Any page offering a &ldquo;Toppay APK download&rdquo; is not this site.</li>
        <li>This site does <strong>not</strong> guarantee returns, profits or earnings. Any message promising fixed daily returns in the Toppay name should be treated as a red flag.</li>
        <li>Support will <strong>never</strong> ask for your password, OTP or MPIN. There is no legitimate reason for anyone to request them.</li>
        <li>These public guide pages do not collect account credentials or personal data.</li>
      </ul>

      <h2>Why people search &ldquo;Toppay real or fake&rdquo;</h2>
      <p>The word &ldquo;Toppay&rdquo; is used by several completely unrelated companies and apps around the world &mdash; there are different Toppay-branded apps on app stores, and separate Toppay domains registered in other countries. So when someone searches <strong>Toppay real or fake</strong>, they are often comparing several different products without realising it.</p>
      <p>The practical answer is to verify the specific domain you are on rather than the brand name. We wrote a full verification checklist for exactly this on the <a href="/toppay-real-or-fake.html">Toppay real or fake</a> page.</p>

      <h2>Getting help</h2>
      <p>If something is not working, the <a href="/toppay-support.html">Toppay support guide</a> explains what to check before contacting anyone, and <a href="/toppay-customer-care.html">Toppay customer care</a> lists the official contact channels. For any specific task, the <a href="/toppay-guide.html">full guide index</a> has a dedicated page.</p>
    `,
    quick: {
      queries: ['Toppay', 'Toppay official', 'Top pay', 'Toppay kya hai', 'Toppay login'],
      summary:
        'Toppay is a mobile-friendly payment account platform. The Toppay official login for this platform is at top-payy.online, the app runs in your browser rather than as an APK, and the signed-in dashboard is always the current source of truth for your account.',
      audience: 'New or returning users who want to confirm what Toppay is, where the official login is, and which help page matches their task.',
      keyPoints: [
        'The official account entry point is https://top-payy.online/.',
        'Toppay, Top pay and TopPay are spelling variants of the same brand here.',
        'The Toppay app is a browser-based web app, not an APK download.',
        'Available features differ by account, so the signed-in dashboard is authoritative.',
      ],
      questions: [
        ['Is Toppay a mobile app or a website?', 'The Toppay experience on this domain is a responsive web app that works in any modern mobile browser. You can add it to your home screen for an app-like icon.'],
        ['What is the official Toppay website?', 'This platform is served from top-payy.online. Always confirm the complete address in your browser before entering account details.'],
        ['Does Toppay guarantee any earnings?', 'No. This site makes no promise of returns or profit. Treat any message promising guaranteed daily income in the Toppay name as a warning sign.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-real-or-fake.html',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Toppay Real or Fake? Toppay Review & Safety Checks (2026)',
    description:
      'Toppay real or fake? Use this verification checklist to confirm the official Toppay domain, spot fake Toppay apps and APK files, and avoid look-alike Toppay login pages.',
    keywords: ['Toppay real or fake', 'Toppay review', 'is Toppay legit', 'Toppay safe', 'Toppay official', 'Toppay scam check', 'Toppay'],
    heroEyebrow: 'TopPay · Safety verification',
    schemaType: 'FAQPage',
    body: `
      <h1>Toppay Real or Fake?</h1>
      <p><strong>Toppay real or fake</strong> is one of the most-searched questions about this brand, and it deserves a straight answer instead of marketing language. The honest answer is this: <em>&ldquo;Toppay&rdquo; is not one single product</em>. Several unrelated companies and apps around the world use the name. So the useful question is not &ldquo;is Toppay real?&rdquo; &mdash; it is <strong>&ldquo;is the specific Toppay site or app in front of me the one I intended to use?&rdquo;</strong></p>
      <p>This page gives you a checklist to answer that yourself, without trusting anyone&rsquo;s word, including ours.</p>

      <h2>Why there is confusion around the Toppay name</h2>
      <p>Search &ldquo;Toppay&rdquo; and you will find several distinct things: multiple Toppay-branded apps on app stores from different developers, a Toppay in Nigeria, a Toppay in Indonesia, a Toppay API service in Asia, and a company called Toppay Services Ltd. None of these are connected to each other.</p>
      <p>That is normal for a generic-sounding payment name, but it means brand-level reviews are close to useless. A review of &ldquo;Toppay&rdquo; on some review site may be reviewing a completely different product. Domain-level verification is the only thing that actually tells you anything.</p>

      <h2>Verification checklist</h2>
      <p>Work through these in order. If any one of them fails, stop.</p>

      <h3>1. Check the exact domain, character by character</h3>
      <p>This platform is served from <strong>top-payy.online</strong>. Look at the full address bar, not the page design. Fake pages copy layouts perfectly; they cannot copy the domain. Watch for extra words, hyphens in different places, alternative endings (.com, .net, .xyz, .app), or lookalike characters.</p>

      <h3>2. Check for HTTPS and a valid certificate</h3>
      <p>The address should begin with <code>https://</code> and your browser should not show any certificate warning. Tap the padlock icon and confirm the certificate is issued to the domain you expect. Any warning at all means leave the page.</p>

      <h3>3. Never install an APK from a link</h3>
      <p>This site does <strong>not</strong> distribute a <strong>Toppay APK</strong>. If you receive an APK through Telegram, WhatsApp, SMS or a download site claiming to be the Toppay app, treat it as hostile. Sideloaded APKs commonly request SMS, accessibility and overlay permissions, which are exactly the permissions needed to read your OTPs and capture what you type. The legitimate mobile experience here is a browser page &mdash; see the <a href="/toppay-app-download.html">Toppay app download guide</a>.</p>

      <h3>4. Test the &ldquo;guaranteed returns&rdquo; signal</h3>
      <p>No legitimate payment platform guarantees a fixed daily or monthly profit. If someone in a Toppay-branded group promises 1% daily, doubled deposits, or a &ldquo;VIP plan&rdquo; with fixed returns, that is a financial-fraud pattern regardless of what brand name is attached to it.</p>

      <h3>5. Test the credential request signal</h3>
      <p>Real support never needs your password, OTP or MPIN. Not to &ldquo;verify&rdquo; you, not to &ldquo;speed up&rdquo; a withdrawal, not for any reason. A request for those is a definitive sign you are talking to an attacker, even if the account name and profile picture look official.</p>

      <h3>6. Test with a small amount first</h3>
      <p>Before any large transfer &mdash; on any platform, not just this one &mdash; do a small test transaction and complete the full round trip, including a withdrawal back out. If a platform accepts deposits smoothly but creates obstacles, fees or delays when you try to withdraw, that is the single most reliable warning sign in this entire category.</p>

      <h3>7. Check the URL again on every visit</h3>
      <p>Bookmark the login page instead of searching for it each time. Search-ad phishing is common: attackers buy ads for brand names and place a look-alike domain above the real result. A saved bookmark bypasses that risk entirely.</p>

      <h2>Common fake-Toppay patterns to recognise</h2>
      <ul>
        <li><strong>Look-alike domains</strong> &mdash; same design, slightly different address, harvesting logins.</li>
        <li><strong>APK bundles</strong> &mdash; a &ldquo;faster app&rdquo; file shared in a group chat that requests SMS permissions.</li>
        <li><strong>Fake support accounts</strong> &mdash; someone messaging you first, claiming to be support, asking for your OTP.</li>
        <li><strong>Investment plans</strong> &mdash; fixed-return schemes attached to a payment brand name.</li>
        <li><strong>Recovery scams</strong> &mdash; after a loss, someone offers to &ldquo;recover&rdquo; funds for an upfront fee.</li>
      </ul>

      <h2>What this site does and does not claim</h2>
      <p>To be clear about our own position: this website publishes the Toppay login and public help guides for the platform served at top-payy.online. We do not promise returns. We do not distribute APK files. We do not ask for credentials on any public page. What we can do is give you the verification tools above so you can judge for yourself.</p>
      <p>Read the <a href="/about-toppay.html">About Toppay</a> page for what the platform is, and the <a href="/toppay-support.html">support guide</a> if something has already gone wrong.</p>

      <h2>If you think you have been targeted</h2>
      <p>Change your password immediately from the <a href="/">official login page</a>, review recent activity in your account, and stop communication with the contact who approached you. Never pay an upfront &ldquo;recovery fee&rdquo;. In India, financial fraud can be reported on the national cybercrime portal at cybercrime.gov.in or by calling the 1930 cyber-fraud helpline.</p>
    `,
    quick: {
      queries: ['Toppay real or fake', 'is Toppay legit', 'Toppay review', 'Toppay safe or not', 'Toppay official'],
      summary:
        'Several unrelated products use the name "Toppay", so brand-level reviews are unreliable. Verify the exact domain (top-payy.online), refuse any APK sent by link, never share OTP or MPIN, and test with a small withdrawal before committing a large amount.',
      audience: 'People deciding whether a Toppay site or app is genuine before signing up, depositing or downloading anything.',
      keyPoints: [
        'Verify the domain character by character; fake pages copy design but not the address.',
        'This site does not distribute a Toppay APK. An APK sent by link is a red flag.',
        'No legitimate payment platform guarantees fixed daily returns.',
        'Real support never asks for your password, OTP or MPIN.',
        'Always test a small withdrawal before a large deposit.',
      ],
      questions: [
        ['Is Toppay real or fake?', 'The name "Toppay" is used by several unrelated apps and companies worldwide, so the brand name alone proves nothing. Verify the exact domain you are on, check HTTPS, refuse APK files sent by link, and test a small withdrawal before committing larger amounts.'],
        ['How can I tell a fake Toppay login page?', 'Check the complete address bar character by character. A fake page can copy the design exactly but cannot use the same domain. Bookmark the real login page so you never reach it through a search advertisement.'],
        ['Is the Toppay APK safe to install?', 'This site does not publish an APK. An APK received through Telegram, WhatsApp or a download site should be treated as hostile, because sideloaded files commonly request SMS and accessibility permissions that can read your OTPs.'],
        ['What should I do if someone asks for my Toppay OTP?', 'Stop the conversation. No legitimate support agent ever needs your password, OTP or MPIN. Change your password from the official login page and review your recent account activity.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-app-download.html',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'Toppay App Download 2026 | Toppay App & Toppay Login Access',
    description:
      'Toppay app download guide: open the official Toppay app in your mobile browser, add it to your home screen on Android or iPhone, and avoid unsafe Toppay APK files.',
    keywords: ['Toppay app download', 'Toppay app', 'Toppay apk', 'Toppay download', 'Top pay app', 'Toppay login', 'Toppay official app'],
    heroEyebrow: 'TopPay · App access',
    schemaType: 'HowTo',
    body: `
      <h1>Toppay App Download</h1>
      <p>If you searched <strong>Toppay app download</strong>, here is the direct answer: the <strong>Toppay app</strong> on this platform is a web application. You do not download an installer, and this site does not publish a <strong>Toppay APK</strong>. You open <strong>top-payy.online</strong> in your phone browser, sign in, and optionally add it to your home screen so it behaves exactly like an installed app.</p>
      <p>That approach is deliberate, and it is meaningfully safer. Read on for the setup steps and the reasoning.</p>

      <h2>Step 1: Open the official Toppay login</h2>
      <p>On your phone, open Chrome (Android) or Safari (iPhone) and go to <strong>top-payy.online</strong>. Type it directly or use a saved bookmark. Avoid tapping links forwarded in chat groups &mdash; that is the most common route to a phishing copy.</p>
      <p>Confirm the address bar shows the complete domain and a padlock before you enter anything. Then use the <a href="/">Toppay login</a> form with your registered phone number and password.</p>

      <h2>Step 2: Add Toppay to your home screen (Android)</h2>
      <p>With the page open in Chrome:</p>
      <ul>
        <li>Tap the three-dot menu at the top right.</li>
        <li>Choose <strong>Add to Home screen</strong> (on some versions it appears as <strong>Install app</strong>).</li>
        <li>Confirm the name and tap <strong>Add</strong>.</li>
      </ul>
      <p>An icon now appears in your app drawer and home screen. Tapping it opens Toppay full-screen without the browser bar &mdash; visually identical to a native app.</p>

      <h2>Step 3: Add Toppay to your home screen (iPhone)</h2>
      <p>With the page open in Safari:</p>
      <ul>
        <li>Tap the <strong>Share</strong> button at the bottom of the screen.</li>
        <li>Scroll and choose <strong>Add to Home Screen</strong>.</li>
        <li>Confirm the name and tap <strong>Add</strong>.</li>
      </ul>
      <p>Note that this must be done in Safari. Chrome on iOS supports it too, but Safari is the most reliable path.</p>

      <h2>Why there is no Toppay APK on this site</h2>
      <p>This is the part worth understanding, because it protects you.</p>
      <p>When you install an APK from outside an official app store, Android asks you to allow installation from unknown sources. That single permission removes the store&rsquo;s malware screening. A malicious APK dressed as a payment app typically requests:</p>
      <ul>
        <li><strong>SMS permission</strong> &mdash; which lets it read every OTP that arrives on your phone, for any service, not only this one.</li>
        <li><strong>Accessibility permission</strong> &mdash; which lets it read the contents of your screen and simulate taps.</li>
        <li><strong>Display over other apps</strong> &mdash; which lets it draw a fake login screen on top of a real banking app.</li>
      </ul>
      <p>Those three permissions together are sufficient to empty an account without the attacker ever knowing your password. A browser page cannot request any of them. That is the entire reason the mobile experience here is a web app.</p>

      <h2>If someone sends you a &ldquo;Toppay APK&rdquo;</h2>
      <p>Do not install it. It does not matter if it arrives from a group with the brand name, an account with an official-looking profile picture, or a website that ranks in search results. This platform does not distribute one, so any file claiming to be it originated somewhere else.</p>
      <p>The <a href="/toppay-real-or-fake.html">Toppay real or fake</a> page has the full verification checklist if you want to confirm what you are looking at.</p>

      <h2>Does the web app work offline?</h2>
      <p>Account data requires a live connection, since balances and transaction status are fetched in real time. The home-screen icon will open the app instantly, but you need a network connection to sign in and see current data.</p>

      <h2>Troubleshooting app access</h2>
      <ul>
        <li><strong>Page will not load</strong> &mdash; check your connection, then try clearing the browser cache for the site.</li>
        <li><strong>Login button does nothing</strong> &mdash; make sure JavaScript is enabled and you are not in a restrictive private-browsing mode.</li>
        <li><strong>Wrong password error</strong> &mdash; use <a href="/toppay-password-help.html">password recovery</a> instead of repeated attempts.</li>
        <li><strong>Layout looks broken</strong> &mdash; update your browser; very old browser versions do not support modern layout features.</li>
      </ul>
      <p>Still stuck? See <a href="/toppay-support.html">Toppay support</a> and <a href="/toppay-customer-care.html">customer care contacts</a>.</p>
    `,
    quick: {
      queries: ['Toppay app download', 'Toppay app', 'Toppay apk', 'Top pay app download', 'Toppay official app'],
      summary:
        'The Toppay app is a web application. Open top-payy.online in Chrome or Safari, sign in, and use "Add to Home screen" for an app-like icon. This site does not publish a Toppay APK, and any APK sent by link should be refused.',
      audience: 'Android and iPhone users searching for a Toppay app download or Toppay APK who want the safe, official way to access the app.',
      keyPoints: [
        'No installer is needed: top-payy.online opens directly in a mobile browser.',
        'Android: Chrome menu, then Add to Home screen. iPhone: Safari Share, then Add to Home Screen.',
        'A sideloaded APK can request SMS and accessibility permissions that read your OTPs.',
        'This site does not publish a Toppay APK, so any such file came from elsewhere.',
      ],
      questions: [
        ['How do I download the Toppay app?', 'Open top-payy.online in your phone browser and use "Add to Home screen" (Android Chrome) or "Add to Home Screen" (iPhone Safari). This gives you an app icon that opens Toppay full-screen with no installation required.'],
        ['Is there an official Toppay APK?', 'This site does not publish an APK file. The official mobile experience is the browser-based web app, which cannot request the SMS or accessibility permissions that malicious APK files rely on.'],
        ['Does the Toppay app work on iPhone?', 'Yes. Open top-payy.online in Safari, tap Share, then Add to Home Screen. The experience is the same as on Android.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-apk.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Toppay APK Guide | Is the Toppay APK Safe? Official Access',
    description:
      'Toppay APK explained: why this site does not host a Toppay APK file, how sideloaded APKs put OTPs at risk, and how to reach the official Toppay app and login safely.',
    keywords: ['Toppay apk', 'Toppay apk download', 'Toppay app', 'Top pay apk', 'Toppay login', 'Toppay official'],
    heroEyebrow: 'TopPay · APK safety',
    schemaType: 'WebPage',
    body: `
      <h1>Toppay APK: What You Need to Know</h1>
      <p><strong>Toppay APK</strong> is a high-volume search, and the answer is short: <strong>this site does not host a Toppay APK file.</strong> The <strong>Toppay app</strong> here is a browser-based web application reached at <strong>top-payy.online</strong>. This page explains what an APK actually is, why sideloading one for a payment service is genuinely dangerous, and what to do instead.</p>

      <h2>What is an APK?</h2>
      <p>An APK (Android Package Kit) is the installer file format for Android apps. When you install an app from the Play Store, Android downloads and installs an APK for you after the store has screened it. When you install an APK manually &mdash; &ldquo;sideloading&rdquo; &mdash; you skip that screening entirely and take full responsibility for whatever is inside the file.</p>
      <p>APK files can be modified. Anyone can take a legitimate app, insert code, repackage it, and distribute the result under the original name and icon. Nothing about the file&rsquo;s appearance, name or size tells you whether that has happened.</p>

      <h2>Why a payment APK is a high-risk target</h2>
      <p>Payment and wallet brands are the most-copied category in Android malware, because the payoff is immediate. A repackaged payment APK typically asks for a specific combination of permissions:</p>
      <ul>
        <li><strong>READ_SMS</strong> &mdash; reads every incoming SMS, which means every OTP for every bank and service on your phone, not just the app you installed.</li>
        <li><strong>Accessibility Service</strong> &mdash; designed for users with disabilities, but it lets an app read on-screen content and perform taps on your behalf.</li>
        <li><strong>SYSTEM_ALERT_WINDOW</strong> &mdash; draws over other apps, enabling a fake login overlay on top of a real banking app.</li>
      </ul>
      <p>An attacker with those three does not need to guess your password. They watch you type it, capture the OTP as it arrives, and complete the transaction themselves.</p>

      <h2>How to use the Toppay app safely instead</h2>
      <p>The browser is the safe path. A web page runs inside the browser&rsquo;s sandbox and simply cannot request SMS access, accessibility control or overlay permission.</p>
      <ul>
        <li>Open <strong>top-payy.online</strong> in Chrome or Safari.</li>
        <li>Verify the complete address and the padlock.</li>
        <li>Sign in through the <a href="/">Toppay login</a> form.</li>
        <li>Use <strong>Add to Home screen</strong> for an app-style icon &mdash; full steps in the <a href="/toppay-app-download.html">Toppay app download guide</a>.</li>
      </ul>

      <h2>&ldquo;But a site in search results offers a Toppay APK download&rdquo;</h2>
      <p>APK aggregator sites republish files uploaded by third parties. They rank well because they publish thousands of pages, not because they verify anything. Some also wrap files in their own installer that bundles additional software.</p>
      <p>Separately, remember that several unrelated products worldwide use the Toppay name. An APK you find may genuinely belong to a different company&rsquo;s Toppay app in another country &mdash; it will simply never log you into this platform. The <a href="/toppay-real-or-fake.html">Toppay real or fake</a> page covers how to tell these apart.</p>

      <h2>Warning signs in any APK offer</h2>
      <ul>
        <li>Delivered by chat message, especially with urgency (&ldquo;new version, old one stops today&rdquo;).</li>
        <li>Hosted on a file-sharing link rather than an official domain.</li>
        <li>Asks you to disable Play Protect or your antivirus before installing.</li>
        <li>Requests SMS, accessibility or overlay permissions on first run.</li>
        <li>Promises features the official platform does not advertise, such as guaranteed returns.</li>
      </ul>

      <h2>If you already installed an unknown APK</h2>
      <p>Act quickly and in this order:</p>
      <ul>
        <li>Turn on airplane mode to cut the app&rsquo;s network access.</li>
        <li>Uninstall the app. If it resists, revoke its Accessibility and Device Admin permissions in Settings first.</li>
        <li>Run a Play Protect scan.</li>
        <li>From a different, trusted device, change your Toppay password and the passwords of any banking or email accounts on that phone.</li>
        <li>Check recent account activity for anything you did not authorise.</li>
      </ul>
      <p>If money moved without your authorisation, report it in India on cybercrime.gov.in or via the 1930 helpline, and contact your bank immediately.</p>
    `,
    quick: {
      queries: ['Toppay apk', 'Toppay apk download', 'Toppay app', 'Top pay apk', 'Toppay login'],
      summary:
        'This site does not host a Toppay APK. Sideloaded payment APKs commonly request SMS, accessibility and overlay permissions, which together are enough to capture your OTPs. Use the browser-based Toppay app at top-payy.online instead.',
      audience: 'Anyone searching for a Toppay APK download who wants to know whether it is safe and what the official alternative is.',
      keyPoints: [
        'No APK is published on this site; the Toppay app is browser-based.',
        'A repackaged APK can look identical to the original and still be modified.',
        'SMS + accessibility + overlay permissions are enough to bypass your password entirely.',
        'A browser page cannot request any of those permissions.',
      ],
      questions: [
        ['Can I download a Toppay APK from this site?', 'No. This page provides safe access guidance only. The official Toppay app on this platform is the mobile-friendly web login at top-payy.online.'],
        ['Why is sideloading a payment APK risky?', 'Sideloading bypasses store malware screening. Repackaged payment apps commonly request SMS, accessibility and overlay permissions, which allow an attacker to read your OTPs and overlay fake login screens.'],
        ['How do I use Toppay on Android without an APK?', 'Open top-payy.online in Chrome, sign in, then use the browser menu to Add to Home screen. The result behaves like an installed app.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'how-to-use-toppay.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'How to Use Toppay | Toppay Login & Dashboard Guide for Beginners',
    description:
      'Step-by-step guide on how to use Toppay: verify the official login URL, sign in to your Toppay account, understand the dashboard and find the right help page.',
    keywords: ['how to use Toppay', 'Toppay login', 'Toppay app', 'Toppay dashboard', 'Top pay', 'Toppay guide'],
    heroEyebrow: 'TopPay · Getting started',
    schemaType: 'HowTo',
    body: `
      <h1>How to Use Toppay</h1>
      <p>This is a beginner orientation to <strong>Toppay</strong>. It covers the four things that matter on day one: reaching the correct <strong>Toppay login</strong>, signing in, understanding what you are looking at, and knowing where to go when something does not work.</p>

      <h2>Step 1: Reach the correct Toppay login</h2>
      <p>Open your browser and go to <strong>top-payy.online</strong>. Type it manually the first time, then bookmark it. From that point on, always use the bookmark.</p>
      <p>Why the bookmark matters more than it sounds: attackers buy search advertisements for payment brand names and place look-alike domains above the genuine result. Someone searching the brand every day is repeatedly exposed to that risk; someone using a bookmark never is.</p>
      <p>Before typing anything, confirm two things: the address bar reads the complete domain, and there is a padlock indicating a valid HTTPS certificate.</p>

      <h2>Step 2: Sign in to your account</h2>
      <p>The <a href="/">Toppay login</a> form asks for your registered mobile number and your password. Enter the number without country code unless the field asks for it, then your password, then tap LOG IN.</p>
      <p>If it fails:</p>
      <ul>
        <li>Check for a leading or trailing space in the password field.</li>
        <li>Check whether autocorrect capitalised the first character.</li>
        <li>Confirm you are using the number the account was registered with.</li>
        <li>After two failed attempts, stop and use <a href="/toppay-password-help.html">password recovery</a> rather than continuing to guess.</li>
      </ul>

      <h2>Step 3: Understand your dashboard</h2>
      <p>After signing in you reach your account dashboard. What appears there depends on your specific account, so this guide describes categories rather than promising particular buttons.</p>
      <ul>
        <li><strong>Balance</strong> &mdash; your current account balance as recorded by the platform.</li>
        <li><strong>Transaction history</strong> &mdash; a record of past activity with status for each entry.</li>
        <li><strong>Deposit / withdrawal options</strong> &mdash; whichever payment methods are enabled for your account.</li>
        <li><strong>Profile and security</strong> &mdash; password change, MPIN setup, and contact details.</li>
      </ul>
      <p>Treat the dashboard as the single source of truth. Rates, fees, limits and available methods can change, and a screenshot someone shared last month may no longer be accurate.</p>

      <h2>Step 4: Set up your security properly</h2>
      <p>Do this once, early, and it saves problems later.</p>
      <ul>
        <li>Set a password used nowhere else. Reused passwords are how one breach becomes many.</li>
        <li>If MPIN is available on your account, set it, and choose something that is not your birth year or a repeated digit.</li>
        <li>Confirm the registered mobile number is current, since recovery depends on it.</li>
        <li>Never save your password in a chat message or a photo in your gallery.</li>
      </ul>

      <h2>Step 5: Make your first transaction carefully</h2>
      <p>Whatever the amount you eventually intend to move, start smaller than that. Complete one deposit and one withdrawal at a low value so you have seen the entire round trip work before committing more.</p>
      <p>For the actual steps, use the guide that matches your method: <a href="/how-to-deposit-toppay.html">general deposits</a>, <a href="/how-to-deposit-usdt-toppay.html">USDT deposits</a>, or <a href="/toppay-withdrawal.html">withdrawals</a>.</p>

      <h2>Everyday habits that keep the account safe</h2>
      <ul>
        <li>Sign in only from your own device, never a shared or public computer.</li>
        <li>Log out when you finish on a device that others can access.</li>
        <li>Never share your password, OTP or MPIN &mdash; support will never ask.</li>
        <li>Ignore unsolicited messages offering &ldquo;help&rdquo;, faster withdrawals, or a special APK.</li>
        <li>Check your transaction history periodically rather than only when something looks wrong.</li>
      </ul>

      <h2>Where to go next</h2>
      <p>New users usually need one of these: <a href="/about-toppay.html">what Toppay is</a>, <a href="/toppay-app-download.html">how to get the app icon on your phone</a>, <a href="/toppay-usdt.html">how USDT works here</a>, or <a href="/toppay-real-or-fake.html">how to verify the site is genuine</a>. The <a href="/toppay-guide.html">complete guide index</a> lists everything.</p>
    `,
    quick: {
      queries: ['How to use Toppay', 'Toppay login', 'Toppay app', 'Toppay dashboard'],
      summary:
        'Open top-payy.online and bookmark it, sign in with your registered number and password, set a unique password and MPIN, then make one small test transaction before committing a larger amount.',
      audience: 'First-time users who need a simple orientation to the Toppay login, dashboard and account safety basics.',
      keyPoints: [
        'Bookmark the login page instead of searching for it each time.',
        'Confirm top-payy.online and the padlock before entering details.',
        'Use a password that is not reused from any other service.',
        'Complete a small deposit and withdrawal before moving larger amounts.',
      ],
      questions: [
        ['What do I need to use Toppay?', 'The mobile number your account is registered with and your account password. Some accounts also use an MPIN to confirm transactions.'],
        ['Why does my dashboard look different from a screenshot I saw?', 'Available tools, labels and limits can vary by account and change over time. Your own signed-in screen is always the current source of truth.'],
        ['What should I do if the login fails?', 'Check for spaces or autocorrect in the password field. After two failures, use password recovery from the login screen rather than continuing to guess.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-usdt.html',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Toppay USDT Guide | USDT Deposit, Withdrawal & Network Checks',
    description:
      'Toppay USDT guide: match the correct USDT network (TRC20, ERC20, BEP20), verify the full wallet address, check confirmations, and convert USDT to INR before you transact.',
    keywords: ['Toppay usdt', 'Toppay USDT deposit', 'Toppay USDT withdrawal', 'USDT to INR', 'Toppay TRC20', 'Toppay crypto', 'Toppay'],
    heroEyebrow: 'TopPay · USDT to INR',
    schemaType: 'HowTo',
    calculator: true,
    body: `
      <h1>Toppay USDT Guide</h1>
      <p><strong>Toppay USDT</strong> transactions are irreversible. There is no support ticket that undoes a transfer sent on the wrong network or to a wrong address &mdash; not on this platform, not on any platform, because the limitation is in the blockchain, not the service. Everything on this page exists to make sure that never happens to you.</p>
      <p>Read this fully before your first USDT transaction. It takes three minutes and it is the highest-value three minutes on this site.</p>

      <h2>The single most important concept: networks</h2>
      <p>USDT (Tether) is not one thing. The same token is issued on several separate blockchains, and each one is a completely independent system:</p>
      <ul>
        <li><strong>TRC20</strong> &mdash; on the Tron network. Addresses start with <code>T</code>. Low fees, fast, the most commonly used for USDT in India.</li>
        <li><strong>ERC20</strong> &mdash; on Ethereum. Addresses start with <code>0x</code>. Higher fees, especially when the network is busy.</li>
        <li><strong>BEP20</strong> &mdash; on BNB Smart Chain. Addresses also start with <code>0x</code>, which is exactly why ERC20 and BEP20 get confused.</li>
      </ul>
      <p><strong>Sending USDT on one network to an address that expects another usually means permanent loss.</strong> The ERC20/BEP20 case is the most dangerous because the addresses look identical in format. The only thing that distinguishes them is the network setting you choose at send time.</p>

      <h2>Before a USDT deposit</h2>
      <ol>
        <li><strong>Open your signed-in account</strong> and find the deposit screen. Read the network shown there. Do not rely on memory or an older screenshot.</li>
        <li><strong>Copy the address using the copy button</strong>, never by typing it manually.</li>
        <li><strong>Set the same network in your sending wallet or exchange.</strong> Match it exactly &mdash; TRC20 to TRC20, not &ldquo;Tron&rdquo; to &ldquo;Ethereum&rdquo;.</li>
        <li><strong>Verify the full address after pasting.</strong> Compare the first six and last six characters against the source, and ideally a section from the middle. Clipboard-hijacking malware swaps addresses on paste, and it produces an address with a similar-looking start and end.</li>
        <li><strong>Send a small test amount first</strong> if this is a new address. Confirm it arrives before sending the remainder.</li>
        <li><strong>Save the transaction hash (TxID)</strong> that your sending wallet gives you. Without it, nothing can be traced.</li>
      </ol>

      <h2>Understanding confirmations</h2>
      <p>After you send, the transaction enters the network and waits for blocks to confirm it. TRC20 usually confirms within about a minute; ERC20 depends heavily on network congestion and gas price.</p>
      <p>A transfer shown as &ldquo;pending&rdquo; can be waiting on either of two separate things: blockchain confirmations, or the platform&rsquo;s own crediting process after confirmations complete. These are different stages. Check the blockchain explorer for the first, and your dashboard for the second.</p>
      <p><strong>Do not send a second transaction while the first is pending.</strong> This is the most common and most expensive mistake made in this entire category. If the first transaction eventually completes, you have now sent twice.</p>

      <h2>USDT to INR</h2>
      <p>The calculator on this page gives you a quick estimate of what a USDT amount is worth in rupees at a rate you enter. Use it for planning &mdash; the actual rate, fees and final credited amount for your transaction are whatever your signed-in dashboard shows at the moment you confirm. A dedicated converter with more explanation is on the <a href="/usdt-to-inr.html">USDT to INR page</a>.</p>

      <h2>Before a USDT withdrawal</h2>
      <ol>
        <li>Confirm the destination address belongs to a wallet <em>you</em> control.</li>
        <li>Confirm the destination wallet supports the network you are withdrawing on.</li>
        <li>Check the minimum withdrawal amount and the network fee shown on the withdrawal screen.</li>
        <li>Paste the address, then verify start, middle and end characters.</li>
        <li>Withdraw a small test amount first when using a new address.</li>
      </ol>
      <p>Full detail is on the <a href="/toppay-withdrawal.html">Toppay withdrawal guide</a>.</p>

      <h2>Troubleshooting a stuck USDT transaction</h2>
      <ul>
        <li><strong>Sent, nothing received</strong> &mdash; look up your TxID on the correct blockchain explorer. If the explorer shows it confirmed to the right address, the issue is crediting, not the transfer, and support can act on the TxID.</li>
        <li><strong>Wrong network used</strong> &mdash; check whether the receiving address exists on the network you sent on. In most cases these funds are not recoverable. Report it with the full TxID anyway.</li>
        <li><strong>Wrong address entirely</strong> &mdash; if the address belongs to another exchange, contact that exchange with the TxID. Otherwise recovery is not possible.</li>
        <li><strong>Amount below minimum</strong> &mdash; deposits under the stated minimum may not credit automatically.</li>
      </ul>

      <h2>Safety rules for USDT</h2>
      <ul>
        <li>Never share your wallet seed phrase or private key with anyone, for any reason.</li>
        <li>Never let anyone screen-share while you access a wallet or the platform.</li>
        <li>Beware &ldquo;address poisoning&rdquo;: a dust transaction from an address resembling one of yours, hoping you copy it from history later. Always copy from the source, never from transaction history.</li>
        <li>Anyone offering to double your USDT is running a fraud. There are no exceptions to this.</li>
      </ul>
    `,
    quick: {
      queries: ['Toppay usdt', 'Toppay USDT deposit', 'Toppay USDT withdrawal', 'USDT to INR', 'Toppay TRC20'],
      summary:
        'USDT exists on separate networks (TRC20, ERC20, BEP20) that are not interchangeable. Match the network exactly, verify the full address including middle characters, send a small test first, save the TxID, and never send a second transfer while the first is pending.',
      audience: 'Users depositing or withdrawing USDT through Toppay who need network, address and confirmation checks before transacting.',
      keyPoints: [
        'Sending and receiving USDT networks must match exactly.',
        'ERC20 and BEP20 addresses both start with 0x, which is the most common confusion.',
        'Compare the full address including middle characters, not just start and end.',
        'Save the transaction hash; without it nothing can be traced.',
        'Never send a second transaction while the first is still pending.',
      ],
      questions: [
        ['Why is my Toppay USDT deposit pending?', 'A transfer can be waiting on blockchain confirmations or on the platform crediting it after confirmations complete. Check your TxID on the blockchain explorer first, then your dashboard status.'],
        ['What happens if I send USDT on the wrong network?', 'In most cases the funds are not recoverable, because the receiving address does not exist on the network you used. This is why the network must be matched exactly before sending.'],
        ['Should I send a second USDT transaction if the first has not arrived?', 'No. Wait and verify the first transaction using its hash. Sending again while the first is pending frequently results in a duplicate transfer.'],
        ['Which USDT network is cheapest?', 'TRC20 on Tron generally has the lowest fees and fastest confirmations, which is why it is the most widely used for USDT transfers in India. Always use whichever network your account deposit screen specifies.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'usdt-to-inr.html',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'USDT to INR Converter | Toppay USDT Rate Calculator',
    description:
      'Convert USDT to INR with a simple calculator. Understand what moves the USDT to INR rate, how fees affect the final amount, and what to verify in your Toppay account.',
    keywords: ['USDT to INR', 'USDT INR converter', 'USDT rate', 'Toppay usdt', 'USDT to rupees', 'Tether to INR', 'Toppay'],
    heroEyebrow: 'TopPay · USDT to INR',
    schemaType: 'WebPage',
    calculator: true,
    body: `
      <h1>USDT to INR Converter</h1>
      <p>Use the calculator above to estimate what an amount of <strong>USDT</strong> is worth in <strong>Indian Rupees</strong>. Enter the USDT amount and the rate you want to test, and the INR value updates instantly. This is a planning tool &mdash; the rate, fees and final credited amount for an actual transaction are whatever your signed-in <a href="/">Toppay account</a> displays at the moment you confirm it.</p>

      <h2>What is USDT?</h2>
      <p>USDT (Tether) is a stablecoin designed to hold a value close to one US dollar. Unlike Bitcoin or Ethereum, its price is not intended to move much &mdash; it exists so people can hold and transfer a dollar-denominated value on a blockchain without exposure to crypto volatility.</p>
      <p>&ldquo;Close to&rdquo; is not &ldquo;exactly&rdquo;. USDT trades slightly above or below $1 depending on market demand, and that small movement is one reason the INR rate you are quoted shifts.</p>

      <h2>What determines the USDT to INR rate?</h2>
      <p>Three factors combine:</p>
      <ul>
        <li><strong>The USD to INR exchange rate</strong> &mdash; the base. When the rupee weakens against the dollar, USDT costs more rupees.</li>
        <li><strong>The USDT premium or discount</strong> &mdash; local supply and demand. In periods of high buying interest, USDT often trades at a premium above the plain USD/INR rate; when selling pressure dominates, it can trade below.</li>
        <li><strong>Platform spread and fees</strong> &mdash; the difference between the buy and sell rate quoted to you, plus any explicit transaction or network fee.</li>
      </ul>
      <p>This is why the rate you see in one place will not exactly match another, and why the rate you saw an hour ago may no longer apply.</p>

      <h2>How to use the calculator</h2>
      <ol>
        <li>Enter your USDT amount in the first box, or drag the slider.</li>
        <li>Enter the rate you want to test in the rate field (for example 109.65 for &#8377;109.65 per USDT).</li>
        <li>Read the estimated INR value.</li>
      </ol>
      <p>To work backwards from a rupee target, divide your target amount by the rate. &#8377;50,000 at &#8377;109.65 per USDT is roughly 456 USDT.</p>

      <h2>Estimate versus actual amount</h2>
      <p>The calculator result is a gross figure. The amount that actually lands in your account is typically lower, because of:</p>
      <ul>
        <li><strong>Network fee</strong> &mdash; charged by the blockchain when sending, deducted from the transfer.</li>
        <li><strong>Platform fee</strong> &mdash; if applicable to your account and transaction type.</li>
        <li><strong>Rate movement</strong> &mdash; the gap between when you check and when the transaction is confirmed.</li>
      </ul>
      <p>Always compare the calculator estimate against the final figure your dashboard shows before you confirm. If the two differ significantly, stop and find out why before proceeding.</p>

      <h2>Network matters as much as rate</h2>
      <p>Before converting or transferring, confirm which USDT network you are using. TRC20, ERC20 and BEP20 are separate blockchains, and sending across a mismatch typically means permanent loss &mdash; a far more expensive mistake than any rate difference. The <a href="/toppay-usdt.html">Toppay USDT guide</a> covers network selection in full, and the <a href="/how-to-deposit-usdt-toppay.html">USDT deposit guide</a> gives the step-by-step checks.</p>

      <h2>Practical tips</h2>
      <ul>
        <li>Compare the quoted rate against the broader market before a large conversion.</li>
        <li>Account for the network fee in your planning, not just the headline rate.</li>
        <li>For a first transaction with a new address, test with a small amount regardless of the rate.</li>
        <li>Record the rate, amount, fee and transaction hash for every conversion &mdash; it makes any later query far easier to resolve.</li>
      </ul>
      <p class="calc-note"><strong>Disclaimer:</strong> यह calculator केवल अनुमान (estimate) के लिए है। यह financial advice नहीं है। Crypto rates लगातार बदलते हैं &mdash; transaction से पहले हमेशा अपने signed-in dashboard में current rate और final amount verify करें।</p>
    `,
    quick: {
      queries: ['USDT to INR', 'USDT INR rate', 'USDT to rupees', 'Toppay usdt', 'Tether to INR'],
      summary:
        'Enter a USDT amount and a rate to estimate the INR value. The real rate depends on USD/INR, the local USDT premium and platform fees, so always confirm the final amount on your signed-in dashboard before confirming a transaction.',
      audience: 'Users who want to estimate USDT value in Indian Rupees before making a Toppay deposit, withdrawal or conversion.',
      keyPoints: [
        'USDT is a stablecoin pegged near one US dollar, but it is not exactly one dollar.',
        'The INR rate is driven by USD/INR, local USDT premium, and platform spread.',
        'Calculator output is gross; network and platform fees reduce the final amount.',
        'Network mismatch costs far more than any rate difference.',
      ],
      questions: [
        ['How much is 1 USDT in INR?', 'It varies with the USD to INR rate and local USDT demand. Enter your own rate in the calculator to estimate, and confirm the live figure in your signed-in account before transacting.'],
        ['Why does the USDT rate differ between platforms?', 'Each platform quotes its own spread on top of the market rate, and local supply and demand create a premium or discount that changes through the day.'],
        ['Is this converter live?', 'No. It is an offline estimator that uses whatever rate you enter, so you can plan and compare. The authoritative rate for your transaction is the one shown in your account at confirmation time.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'how-to-deposit-toppay.html',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'How to Deposit on Toppay | Toppay Deposit Guide & Safety Checks',
    description:
      'How to deposit on Toppay: sign in, use only the deposit option shown in your account, verify payment details before confirming, and check the transaction status safely.',
    keywords: ['how to deposit Toppay', 'Toppay deposit', 'Toppay add money', 'Toppay login', 'Top pay deposit', 'Toppay'],
    heroEyebrow: 'TopPay · Deposit guide',
    schemaType: 'HowTo',
    body: `
      <h1>How to Deposit on Toppay</h1>
      <p>This guide covers the general checklist for a <strong>Toppay deposit</strong>. Available payment methods differ between accounts and change over time, so this page describes the checks that always apply rather than promising a specific button. For crypto specifically, use the <a href="/how-to-deposit-usdt-toppay.html">USDT deposit guide</a> instead &mdash; the risks there are different.</p>

      <h2>Step 1: Sign in first, always</h2>
      <p>Open <a href="/">top-payy.online</a> and sign in. Never begin a deposit from a link, a QR code, or payment details someone sent you in a message &mdash; not even from an account that appears to be official.</p>
      <p>This is the single rule that prevents the most common deposit fraud. Attackers do not need to break the platform; they only need you to pay a different destination while believing you are paying the platform.</p>

      <h2>Step 2: Use the deposit option shown in your account</h2>
      <p>Open the deposit section of your signed-in dashboard. Whatever methods appear there are the ones enabled for your account. If a method you expected is not visible, it is not currently available to you &mdash; do not look for an alternative route outside the platform.</p>

      <h2>Step 3: Read the current instructions on screen</h2>
      <p>Payment details are not permanent. Account numbers, UPI IDs, wallet addresses and reference formats can be rotated. Always read what is on your screen right now.</p>
      <p>Specifically, do not use:</p>
      <ul>
        <li>A screenshot from a previous deposit, yours or someone else&rsquo;s.</li>
        <li>Payment details from a chat group.</li>
        <li>Details from a blog, video or forum post.</li>
      </ul>
      <p>Details that were correct last week can be wrong today, and money sent to an outdated destination is extremely difficult to recover.</p>

      <h2>Step 4: Verify before you confirm</h2>
      <p>Before you authorise the payment, check each of these:</p>
      <ul>
        <li><strong>Amount</strong> &mdash; matches what you intend, including any minimum.</li>
        <li><strong>Recipient</strong> &mdash; matches exactly what your account screen displays.</li>
        <li><strong>Reference / remark</strong> &mdash; if the platform asks for a reference code, include it exactly. Deposits without the correct reference often need manual resolution.</li>
        <li><strong>Method</strong> &mdash; matches the method selected in your account.</li>
      </ul>
      <p>A minute spent on this step is worth more than any support ticket afterwards.</p>

      <h2>Step 5: Save proof of the transaction</h2>
      <p>Immediately after paying, record:</p>
      <ul>
        <li>The transaction reference or UTR from your payment app or bank.</li>
        <li>The exact amount and the time.</li>
        <li>A screenshot of the confirmation screen.</li>
      </ul>
      <p>Keep these until the deposit is reflected in your account. If a query is needed later, this is the evidence that resolves it quickly.</p>

      <h2>Step 6: Check the status before doing anything else</h2>
      <p>Return to your dashboard and check the transaction status. Statuses generally mean:</p>
      <ul>
        <li><strong>Pending</strong> &mdash; received, not yet finalised. Wait.</li>
        <li><strong>Completed / Success</strong> &mdash; credited to your balance.</li>
        <li><strong>Failed / Rejected</strong> &mdash; not credited; check the stated reason before retrying.</li>
      </ul>
      <p><strong>Never repeat a payment while the first is pending.</strong> Duplicate deposits are the most common self-inflicted problem in this process, and reversing one takes far longer than waiting did.</p>

      <h2>If a deposit does not arrive</h2>
      <ol>
        <li>Confirm the money actually left your account &mdash; check your bank or payment app.</li>
        <li>Confirm the destination you paid matches what your dashboard displayed.</li>
        <li>Check whether the amount met any stated minimum.</li>
        <li>Allow the stated processing time before escalating.</li>
        <li>Contact support with the reference, amount and time &mdash; and nothing else. Never send your password, OTP or MPIN.</li>
      </ol>
      <p>See <a href="/toppay-support.html">Toppay support</a> and <a href="/toppay-customer-care.html">customer care</a> for the correct channels.</p>

      <h2>Deposit warning signs</h2>
      <ul>
        <li>Someone messages you offering a &ldquo;bonus&rdquo; for depositing to a different account.</li>
        <li>You are asked to pay an individual&rsquo;s personal account rather than the destination on your screen.</li>
        <li>You are told to pay an additional fee to &ldquo;release&rdquo; a deposit that already went through.</li>
        <li>You are pressured to act quickly before an offer &ldquo;expires&rdquo;.</li>
      </ul>
      <p>All four are established fraud patterns. Read <a href="/toppay-real-or-fake.html">Toppay real or fake</a> for the full verification checklist.</p>
    `,
    quick: {
      queries: ['How to deposit in Toppay', 'Toppay deposit', 'Toppay add money', 'Toppay login'],
      summary:
        'Always start the deposit from inside your signed-in account, use only the details displayed on your own screen, include any required reference, save the transaction proof, and never repeat a payment while the first is pending.',
      audience: 'Users making a Toppay deposit who want a safety checklist before confirming a payment.',
      keyPoints: [
        'Never pay from details sent in a message, screenshot or group.',
        'Payment destinations rotate, so read the current screen every time.',
        'Include the exact reference code if one is requested.',
        'Save the UTR, amount and time until the deposit is credited.',
        'Do not repeat a payment while the first one is pending.',
      ],
      questions: [
        ['Why do Toppay deposit instructions change?', 'Payment destinations and reference formats can be rotated for operational and security reasons. That is why you should read the current instructions inside your signed-in account for every deposit.'],
        ['My deposit is pending. Should I pay again?', 'No. Check your payment app for confirmation, then wait for the stated processing time. Paying again while the first is pending commonly results in a duplicate transaction.'],
        ['What information does support need for a missing deposit?', 'The transaction reference or UTR, the exact amount, and the time. Never send your password, OTP or MPIN to anyone.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'how-to-deposit-usdt-toppay.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'How to Deposit USDT on Toppay | TRC20 Network & Address Checks',
    description:
      'How to deposit USDT on Toppay step by step: match the TRC20 or ERC20 network, verify the complete wallet address, send a test amount and track blockchain confirmations.',
    keywords: ['how to deposit USDT Toppay', 'Toppay USDT deposit', 'Toppay usdt', 'USDT TRC20 deposit', 'Toppay crypto deposit', 'Toppay'],
    heroEyebrow: 'TopPay · USDT deposit',
    schemaType: 'HowTo',
    body: `
      <h1>How to Deposit USDT on Toppay</h1>
      <p>A <strong>Toppay USDT deposit</strong> is irreversible once broadcast. There is no cancel button and no support action that reverses a blockchain transaction. This guide is a checklist &mdash; work through it in order, every time, including when you feel confident.</p>

      <h2>Step 1: Open the deposit screen in your account</h2>
      <p>Sign in at <a href="/">top-payy.online</a> and open the USDT deposit section. Two pieces of information appear there and both matter equally:</p>
      <ul>
        <li>The <strong>network</strong> (for example TRC20).</li>
        <li>The <strong>wallet address</strong> for that network.</li>
      </ul>
      <p>Never use an address from an old screenshot, a chat message or another page. Deposit addresses can be regenerated, and a stale address may no longer be monitored.</p>

      <h2>Step 2: Match the network exactly</h2>
      <p>This is where nearly all USDT losses happen. In your sending wallet or exchange, select the same network your deposit screen specified.</p>
      <ul>
        <li><strong>TRC20</strong> (Tron) &mdash; addresses begin with <code>T</code>. Low fee, fast.</li>
        <li><strong>ERC20</strong> (Ethereum) &mdash; addresses begin with <code>0x</code>. Higher fee.</li>
        <li><strong>BEP20</strong> (BNB Smart Chain) &mdash; addresses also begin with <code>0x</code>.</li>
      </ul>
      <p>Because ERC20 and BEP20 addresses look identical, the address format alone cannot tell you which network is correct. Only the network selector can. Set it deliberately and read it back before continuing.</p>

      <h2>Step 3: Copy the address correctly</h2>
      <p>Use the copy button on the deposit screen. Do not type the address by hand &mdash; a single wrong character sends funds nowhere recoverable, and human transcription of a 34-character string is unreliable.</p>

      <h2>Step 4: Verify the pasted address</h2>
      <p>After pasting into your sending wallet, compare against the original:</p>
      <ul>
        <li>The first six characters.</li>
        <li>A block of characters from the <strong>middle</strong>.</li>
        <li>The last six characters.</li>
      </ul>
      <p>The middle check is not optional. Clipboard-hijacking malware substitutes an address chosen to have a similar-looking beginning and end &mdash; checking only the ends is exactly the behaviour it is designed to defeat.</p>

      <h2>Step 5: Send a test amount</h2>
      <p>For a first deposit, or any time the address has changed, send a small test amount. Wait for it to be credited to your balance, then send the rest. The network fee on a test transfer is trivial compared to the alternative.</p>

      <h2>Step 6: Save the transaction hash</h2>
      <p>Your sending wallet produces a transaction hash (TxID) once broadcast. Save it. Every subsequent step &mdash; checking confirmations, tracing a delay, raising a support query &mdash; depends on it. Without a TxID there is no way to investigate anything.</p>

      <h2>Step 7: Wait for confirmations</h2>
      <p>Look up the TxID on the explorer for the network you used (Tronscan for TRC20, Etherscan for ERC20, BscScan for BEP20). You will see one of:</p>
      <ul>
        <li><strong>Pending / unconfirmed</strong> &mdash; broadcast, not yet in a block. Wait.</li>
        <li><strong>Confirmed</strong> &mdash; included and confirmed on the blockchain.</li>
        <li><strong>Failed</strong> &mdash; not executed, usually due to insufficient gas. Funds normally remain in your wallet minus the fee.</li>
      </ul>
      <p>Once confirmed on-chain, crediting to your account balance is a separate step handled by the platform. Confirmed on the explorer but not yet visible in the dashboard is normal for a short period.</p>

      <h2>Do not send twice</h2>
      <p>Between broadcast and crediting there is a waiting period, and that wait is where people make expensive mistakes. Sending a second transaction because the first &ldquo;seems stuck&rdquo; usually results in both arriving. Verify the first with its TxID before doing anything else.</p>

      <h2>Troubleshooting</h2>
      <ul>
        <li><strong>Explorer shows confirmed, balance not updated</strong> &mdash; allow processing time, then contact support with the TxID, network, amount and time.</li>
        <li><strong>Wrong network used</strong> &mdash; report immediately with the TxID. Recovery is often impossible, but the TxID is the only thing that gives any chance.</li>
        <li><strong>Explorer cannot find the TxID</strong> &mdash; you are likely checking the wrong network&rsquo;s explorer. Try the one matching the network you actually selected.</li>
        <li><strong>Amount below minimum</strong> &mdash; small deposits may not credit automatically and need manual handling.</li>
      </ul>

      <h2>Security reminders</h2>
      <ul>
        <li>Never share your wallet seed phrase or private key. No support process requires it.</li>
        <li>Never let anyone screen-share while you access a wallet.</li>
        <li>Always copy the deposit address from the account screen, never from your transaction history &mdash; address-poisoning attacks plant look-alike addresses there.</li>
      </ul>
      <p>For network background and withdrawal checks, see the <a href="/toppay-usdt.html">Toppay USDT guide</a> and the <a href="/toppay-withdrawal.html">withdrawal guide</a>.</p>
    `,
    quick: {
      queries: ['How to deposit USDT in Toppay', 'Toppay USDT deposit', 'Toppay usdt', 'USDT TRC20 deposit'],
      summary:
        'Open the USDT deposit screen in your account, match the network exactly, copy the address with the copy button, verify start, middle and end characters, send a small test amount, and save the transaction hash before sending the rest.',
      audience: 'Users preparing a USDT deposit into a Toppay account who need the exact network and address verification steps.',
      keyPoints: [
        'Network mismatch is the leading cause of permanent USDT loss.',
        'ERC20 and BEP20 addresses both start with 0x, so only the network selector distinguishes them.',
        'Verify middle characters, not just the start and end of the address.',
        'Save the transaction hash; without it nothing can be investigated.',
        'Never send a second transfer while the first is unconfirmed.',
      ],
      questions: [
        ['Can I reuse an old Toppay USDT deposit address?', 'Use only the address currently displayed in your signed-in account. Deposit addresses can be regenerated, and an old address may no longer be monitored.'],
        ['What should I save after sending USDT?', 'The transaction hash, the network used, the amount and the time. Never share your wallet seed phrase or private key with anyone.'],
        ['How long do USDT confirmations take?', 'TRC20 usually confirms within about a minute. ERC20 depends on Ethereum network congestion. After on-chain confirmation, crediting to your balance is a separate step.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-withdrawal.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Toppay Withdrawal Guide | How to Withdraw Money from Toppay',
    description:
      'Toppay withdrawal guide: check limits and fees, verify the destination account or USDT address, understand pending status, and fix a failed or delayed withdrawal.',
    keywords: ['Toppay withdrawal', 'Toppay withdraw money', 'Toppay paisa kaise nikale', 'Toppay USDT withdrawal', 'Toppay payout', 'Toppay'],
    heroEyebrow: 'TopPay · Withdrawal guide',
    schemaType: 'HowTo',
    body: `
      <h1>Toppay Withdrawal Guide</h1>
      <p>A <strong>Toppay withdrawal</strong> moves funds out of your account balance to a destination you control &mdash; a bank account, a UPI ID, or an external USDT wallet, depending on what is enabled for your account. This guide covers what to verify beforehand, what the status values mean, and what to do when a withdrawal is delayed.</p>

      <h2>Before your first withdrawal</h2>
      <p>Three things are worth completing before you need them urgently:</p>
      <ul>
        <li><strong>Complete any verification your account requires.</strong> Withdrawals are commonly held pending verification, and doing it in advance avoids a delay at the worst moment.</li>
        <li><strong>Add and confirm the destination.</strong> Bank account, UPI ID or wallet address &mdash; add it early so it is ready.</li>
        <li><strong>Do a small test withdrawal.</strong> Confirm the full round trip works before you rely on it for a larger amount. This is the most useful single test of any payment platform.</li>
      </ul>

      <h2>Step 1: Check limits and fees first</h2>
      <p>Open the withdrawal screen in your signed-in account and read:</p>
      <ul>
        <li>Minimum withdrawal amount.</li>
        <li>Maximum per transaction and any daily cap.</li>
        <li>Fee &mdash; flat, percentage, or a network fee for crypto.</li>
        <li>Expected processing time.</li>
      </ul>
      <p>Calculate what will actually arrive after fees before you submit, so the received amount is never a surprise.</p>

      <h2>Step 2: Verify the destination carefully</h2>
      <p><strong>For a bank or UPI withdrawal:</strong> confirm the account number, IFSC and name match your own account exactly. Withdrawals to an account in a different name are frequently rejected, and the funds then take longer to return.</p>
      <p><strong>For a USDT withdrawal:</strong> the same rules as deposits apply in reverse and with equal force:</p>
      <ul>
        <li>Confirm the receiving wallet supports the network you are withdrawing on.</li>
        <li>Paste the address rather than typing it.</li>
        <li>Verify the first, middle and last characters against the source.</li>
        <li>Send a small test amount to any new address before a large withdrawal.</li>
      </ul>
      <p>Details on networks are in the <a href="/toppay-usdt.html">Toppay USDT guide</a>.</p>

      <h2>Step 3: Confirm and record</h2>
      <p>Submit the withdrawal, confirm with your MPIN or OTP if prompted, and immediately record the withdrawal reference, amount, fee, destination and time. Screenshot the confirmation screen.</p>
      <p>One rule: your OTP goes into the platform&rsquo;s own screen and nowhere else. If anyone asks you to read out an OTP or forward it, that is fraud, without exception.</p>

      <h2>Step 4: Understand the status</h2>
      <ul>
        <li><strong>Pending / Processing</strong> &mdash; submitted and queued. Normal.</li>
        <li><strong>Under review</strong> &mdash; held for a routine check. Usually resolves within the stated window.</li>
        <li><strong>Completed</strong> &mdash; sent from the platform. Bank credit can still take additional time on the bank&rsquo;s side.</li>
        <li><strong>Failed / Rejected</strong> &mdash; not sent. The funds should return to your balance; check the stated reason.</li>
      </ul>

      <h2>Common reasons a withdrawal is delayed</h2>
      <ul>
        <li>Account verification is incomplete.</li>
        <li>Destination details do not match your account name.</li>
        <li>The amount is below the minimum or above a limit.</li>
        <li>Bank processing windows &mdash; weekends and holidays add time.</li>
        <li>Blockchain congestion for crypto withdrawals.</li>
        <li>A routine security review after a password change or a new destination was added.</li>
      </ul>

      <h2>If a withdrawal does not arrive</h2>
      <ol>
        <li>Check the status in your dashboard first.</li>
        <li>If marked completed, check the destination account or the blockchain explorer using the reference or TxID.</li>
        <li>Allow the full stated processing window plus bank settlement time.</li>
        <li>Contact support with the reference, amount, destination and time.</li>
        <li>Never share your password, OTP or MPIN during this process.</li>
      </ol>

      <h2>Withdrawal fraud patterns to recognise</h2>
      <p>These target people who are already anxious about a pending withdrawal, which is what makes them effective:</p>
      <ul>
        <li><strong>&ldquo;Pay a fee to release your withdrawal.&rdquo;</strong> A legitimate fee is deducted from the withdrawal, never collected as a separate upfront payment.</li>
        <li><strong>&ldquo;Send your OTP so we can process it faster.&rdquo;</strong> Never legitimate.</li>
        <li><strong>&ldquo;Install this app so we can help.&rdquo;</strong> Remote-access and screen-share tools let an attacker operate your device directly.</li>
        <li><strong>&ldquo;We can recover your stuck funds for an advance payment.&rdquo;</strong> A recovery scam, targeting people who have already lost money.</li>
      </ul>
      <p>See <a href="/toppay-real-or-fake.html">Toppay real or fake</a> for the complete verification checklist and <a href="/toppay-customer-care.html">customer care</a> for official channels.</p>
    `,
    quick: {
      queries: ['Toppay withdrawal', 'Toppay withdraw money', 'Toppay paisa kaise nikale', 'Toppay USDT withdrawal'],
      summary:
        'Check limits and fees on the withdrawal screen, verify the destination matches your own name or wallet, test with a small amount first, record the reference, and never pay an upfront fee to "release" a withdrawal.',
      audience: 'Users withdrawing funds from a Toppay account to a bank, UPI ID or external USDT wallet.',
      keyPoints: [
        'Complete account verification before you need to withdraw urgently.',
        'A legitimate fee is deducted from the withdrawal, never collected upfront.',
        'Destination name mismatches are a common rejection reason.',
        'For USDT, verify the network and the full address as carefully as for a deposit.',
        'Never share an OTP with anyone, for any reason.',
      ],
      questions: [
        ['How long does a Toppay withdrawal take?', 'It depends on the method. Bank transfers follow banking hours and can extend over weekends and holidays; crypto withdrawals depend on blockchain confirmation times. Your dashboard shows the expected processing window.'],
        ['Why is my Toppay withdrawal pending?', 'Common reasons are incomplete account verification, a destination name mismatch, an amount outside the allowed limits, bank processing windows, or a routine security review after a recent password change.'],
        ['Do I need to pay a fee to release a withdrawal?', 'No. Any legitimate fee is deducted from the withdrawal amount itself. A demand for a separate upfront payment to "release" funds is a known fraud pattern.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-password-help.html',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Toppay Password Help | Reset Password & Toppay Login Recovery',
    description:
      'Toppay password help: reset a forgotten password from the official login page, recover account access safely, and protect your password, OTP and MPIN during recovery.',
    keywords: ['Toppay password', 'Toppay password reset', 'Toppay forgot password', 'Toppay login problem', 'Toppay login help', 'Toppay'],
    heroEyebrow: 'TopPay · Password recovery',
    schemaType: 'HowTo',
    body: `
      <h1>Toppay Password Help</h1>
      <p>If you cannot sign in to <strong>Toppay</strong>, work through this page in order. Most login failures are simple and resolve in under a minute &mdash; but repeated blind attempts can trigger a temporary lock, so it is worth checking the easy causes first.</p>

      <h2>First: rule out the simple causes</h2>
      <p>Before assuming the password is wrong:</p>
      <ul>
        <li><strong>Check for a trailing space.</strong> Copying a password often carries an invisible space with it.</li>
        <li><strong>Check autocorrect.</strong> Mobile keyboards capitalise the first character of a field by default.</li>
        <li><strong>Check the phone number.</strong> Are you using the number the account was registered with, without an unexpected country code?</li>
        <li><strong>Check the site.</strong> Confirm the address bar reads <strong>top-payy.online</strong>. Entering a correct password on the wrong site produces exactly this symptom &mdash; and hands your password to someone else.</li>
        <li><strong>Try another browser.</strong> An extension or a corrupted cache occasionally breaks form submission.</li>
      </ul>

      <h2>Step 1: Use Forget Password on the login page</h2>
      <p>Open the <a href="/">official Toppay login page</a> and use the <strong>Forget Password</strong> link shown on the form. Start recovery only from that link &mdash; never from a link in an email, SMS or chat message, which is the standard delivery route for credential phishing.</p>

      <h2>Step 2: Complete the verification</h2>
      <p>Recovery normally sends a verification code to your registered mobile number. Enter that code <strong>into the recovery page only</strong>.</p>
      <p>This deserves emphasis: the OTP goes into the website, and nowhere else. Nobody &mdash; not support, not an administrator, not anyone in any group &mdash; ever has a legitimate reason to ask you to read out, forward, or share that code. A request for it is proof you are talking to an attacker.</p>

      <h2>Step 3: Set a strong new password</h2>
      <p>When choosing the new password:</p>
      <ul>
        <li>Use at least 12 characters where the field allows it.</li>
        <li>Mix upper and lower case, numbers and a symbol.</li>
        <li>Do not reuse a password from any other service. Reuse is how a breach elsewhere becomes a loss here.</li>
        <li>Avoid your name, birth year, or your phone number.</li>
        <li>Store it in a password manager or somewhere physically secure &mdash; never in a chat message or a photo in your gallery.</li>
      </ul>

      <h2>Step 4: Sign in and review the account</h2>
      <p>Return to the login page and sign in with the new password. Then check your recent transaction history for anything you did not authorise, and confirm your registered mobile number and any linked payment destinations are still correct.</p>
      <p>If you suspect the account was accessed by someone else, review destinations carefully &mdash; changing a payout destination is a common follow-up step after a compromise.</p>

      <h2>If recovery does not work</h2>
      <ul>
        <li><strong>Code never arrives</strong> &mdash; check network coverage and your SMS spam filter, wait a minute before requesting again, and confirm the number on the account is the one you still use.</li>
        <li><strong>Number no longer in use</strong> &mdash; SMS recovery cannot work. Contact support through an official channel and expect additional identity verification.</li>
        <li><strong>Account temporarily locked</strong> &mdash; stop attempting. Wait for the lockout window to expire; further attempts usually extend it.</li>
        <li><strong>Code rejected</strong> &mdash; confirm you are entering the most recent code; requesting a new one invalidates the previous one.</li>
      </ul>
      <p>See <a href="/toppay-customer-care.html">Toppay customer care</a> for official contact channels.</p>

      <h2>MPIN versus password</h2>
      <p>Some accounts use both. The password signs you in; the MPIN confirms transactions. They should be different values, and neither should ever be shared. If you have forgotten the MPIN, look for the MPIN reset option in your profile or security settings after signing in.</p>

      <h2>Protect yourself during recovery</h2>
      <p>Recovery is when people are most vulnerable, because they are stressed and want a fast fix. That is precisely when attackers approach.</p>
      <ul>
        <li>Support will never ask for your current password.</li>
        <li>Support will never ask for an OTP or MPIN.</li>
        <li>Support will never ask you to install a remote-access or screen-share app.</li>
        <li>Nobody legitimate will offer to &ldquo;recover&rdquo; your account for a fee.</li>
        <li>Start recovery only from the official login page you reached yourself.</li>
      </ul>
      <p>If you were contacted after a failed login and shared anything, treat the account as compromised: change the password immediately from a device you trust and review recent activity. The <a href="/toppay-real-or-fake.html">verification checklist</a> explains what to check next.</p>
    `,
    quick: {
      queries: ['Toppay password', 'Toppay password reset', 'Toppay forgot password', 'Toppay login problem', 'Toppay login help'],
      summary:
        'Rule out spaces and autocorrect first, then start recovery from the Forget Password link on the official login page. Enter the OTP into the recovery page only, set a unique new password, and review recent account activity afterwards.',
      audience: 'Users who forgot a Toppay password, cannot sign in, or need safe account-recovery guidance.',
      keyPoints: [
        'Start recovery only from the login page you opened yourself.',
        'The OTP goes into the website and nowhere else, ever.',
        'Use a password not reused from any other service.',
        'Stop attempting after a lockout; further attempts extend it.',
        'Review transaction history and payout destinations after regaining access.',
      ],
      questions: [
        ['Can Toppay support ask for my current password?', 'No. Never send your current password, OTP or MPIN to anyone. A request for them is a definitive sign of fraud, regardless of how official the contact appears.'],
        ['What if the recovery code never arrives?', 'Check network coverage and your SMS spam filter, and confirm the registered number is the one you still use. Wait before requesting a new code, since a new request invalidates the previous one.'],
        ['What if I no longer have the registered phone number?', 'SMS recovery cannot complete. Contact support through an official channel and expect to complete additional identity verification.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-support.html',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Toppay Support | Login, App, Deposit & USDT Help Centre',
    description:
      'Toppay support centre: troubleshoot login problems, app access, pending deposits and USDT transactions, and learn what information to gather before contacting help.',
    keywords: ['Toppay support', 'Toppay help', 'Toppay login help', 'Toppay problem', 'Toppay customer support', 'Toppay'],
    heroEyebrow: 'TopPay · Support centre',
    schemaType: 'WebPage',
    body: `
      <h1>Toppay Support</h1>
      <p>This is the public <strong>Toppay support</strong> guide. Find your issue below, work through the checks, and if you still need help, gather the listed information before contacting anyone. Preparing properly usually resolves a query in one message instead of five.</p>

      <h2>Login problems</h2>
      <p><strong>Password not accepted:</strong> check for a trailing space, check autocorrect capitalisation, and confirm the registered phone number. After two failures use recovery rather than continuing to guess &mdash; see <a href="/toppay-password-help.html">password help</a>.</p>
      <p><strong>Page will not load:</strong> confirm you are on top-payy.online, check your connection, clear the site cache, and try a different browser.</p>
      <p><strong>Account locked:</strong> stop attempting and wait for the lockout window. Repeated attempts typically extend it.</p>
      <p><strong>OTP not arriving:</strong> check network coverage and your SMS spam filter. A new request invalidates the previous code, so use the most recent one.</p>

      <h2>App and access problems</h2>
      <p><strong>Looking for the app:</strong> the Toppay app is the browser-based web application. See the <a href="/toppay-app-download.html">app download guide</a> for home-screen setup on Android and iPhone.</p>
      <p><strong>Someone sent an APK:</strong> do not install it. This site does not publish one &mdash; details in the <a href="/toppay-apk.html">APK guide</a>.</p>
      <p><strong>Layout broken:</strong> update your browser, since older versions do not support modern layout features.</p>

      <h2>Deposit problems</h2>
      <p><strong>Deposit not credited:</strong> confirm the money left your account, confirm you paid the destination shown on your own screen, confirm the amount met the minimum, and allow the stated processing time. Then contact support with the reference, amount and time. See the <a href="/how-to-deposit-toppay.html">deposit guide</a>.</p>
      <p><strong>Paid the wrong destination:</strong> report it immediately with proof. Recovery depends on where the funds landed and is not always possible.</p>
      <p><strong>Pending for a long time:</strong> do not pay again. Duplicate payments take longer to unwind than the original delay.</p>

      <h2>USDT problems</h2>
      <p><strong>USDT not received:</strong> look up your transaction hash on the correct blockchain explorer. If it shows confirmed to the right address, the issue is crediting and support can act on the TxID.</p>
      <p><strong>Wrong network used:</strong> report with the full TxID. Recovery is often impossible, but the TxID is the only thing that gives any chance at all.</p>
      <p><strong>Explorer cannot find the hash:</strong> you are probably on the wrong network&rsquo;s explorer. Full detail in the <a href="/toppay-usdt.html">USDT guide</a>.</p>

      <h2>Withdrawal problems</h2>
      <p><strong>Withdrawal pending:</strong> check whether account verification is complete and whether the destination name matches. Allow the stated window plus bank settlement time. See the <a href="/toppay-withdrawal.html">withdrawal guide</a>.</p>
      <p><strong>Withdrawal rejected:</strong> read the stated reason. Name mismatch and limit breaches are the most common causes.</p>
      <p><strong>Asked to pay a fee to release funds:</strong> this is fraud. A legitimate fee is deducted from the withdrawal, never collected separately in advance.</p>

      <h2>What to gather before contacting support</h2>
      <p>Have this ready:</p>
      <ul>
        <li>The exact error message or status shown on your screen.</li>
        <li>Transaction reference, UTR, or blockchain transaction hash.</li>
        <li>Exact amount and the date and time.</li>
        <li>The network used, for any crypto transaction.</li>
        <li>A screenshot &mdash; with any sensitive fields covered.</li>
      </ul>
      <p><strong>Never include</strong> your password, OTP, MPIN, wallet seed phrase or private key. No legitimate support process needs any of them.</p>

      <h2>How to reach support safely</h2>
      <p>Use only the official channels listed on the <a href="/toppay-customer-care.html">Toppay customer care page</a>. Be aware that fake support accounts are common on messaging platforms &mdash; they typically message <em>you</em> first, immediately after you post about a problem publicly.</p>
      <p>Three rules that hold universally: genuine support does not contact you first asking for credentials; genuine support does not ask you to install a remote-access app; genuine support does not request an advance payment to solve your problem.</p>

      <h2>Still not sure the site is genuine?</h2>
      <p>If your underlying question is whether this platform itself is trustworthy, that is a fair question and it has a dedicated page with a full verification checklist: <a href="/toppay-real-or-fake.html">Toppay real or fake</a>.</p>
    `,
    quick: {
      queries: ['Toppay support', 'Toppay login help', 'Toppay problem', 'Toppay help', 'Toppay customer support'],
      summary:
        'Find your issue category, work through the listed checks, then gather the exact error, transaction reference, amount, time and network before contacting support. Never include your password, OTP or MPIN.',
      audience: 'Users with a login, app, deposit, USDT or withdrawal problem who want to resolve it or prepare a support query properly.',
      keyPoints: [
        'Do not repeat a payment or transfer while the first is pending.',
        'Record the reference, amount, time and network before asking for help.',
        'Genuine support never contacts you first asking for credentials.',
        'A demand for an advance fee to release funds is always fraud.',
      ],
      questions: [
        ['What information should I gather before asking for help?', 'The exact error or status, the transaction reference or blockchain hash, the amount, the date and time, and the network used. Keep your password, OTP and MPIN private.'],
        ['Does this support page ask for my password?', 'No. This is a public guide page and it never collects account credentials of any kind.'],
        ['Someone messaged me offering Toppay support. Is that safe?', 'Be very cautious. Fake support accounts commonly message people first, especially just after they post about a problem publicly. Use only the channels listed on the official customer care page.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-customer-care.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Toppay Customer Care | Official Toppay Contact & Support Channels',
    description:
      'Toppay customer care and contact information: official support channels, what details to include in a query, and how to identify fake Toppay support accounts.',
    keywords: ['Toppay customer care', 'Toppay contact', 'Toppay customer care number', 'Toppay support number', 'Toppay helpline', 'Toppay'],
    heroEyebrow: 'TopPay · Contact us',
    schemaType: 'ContactPage',
    body: `
      <h1>Toppay Customer Care</h1>
      <p>This page lists the official ways to reach <strong>Toppay</strong> support for the platform at <strong>top-payy.online</strong>, and &mdash; equally important &mdash; how to recognise the fake support accounts that impersonate it.</p>

      <h2>Official contact channels</h2>
      <p>The channels below are the ones published by this platform. Any other account, number or address claiming to be Toppay support is not verified by us.</p>
      <ul>
        <li><strong>In-account support</strong> &mdash; the most reliable route. Sign in at <a href="/">top-payy.online</a> and use the support or help option in your dashboard. Because you are already authenticated, your account is identified without you sending any credentials.</li>
        <li><strong>Official Telegram channel</strong> &mdash; <a href="https://t.me/toppayofficial00" rel="noopener noreferrer nofollow">t.me/toppayofficial00</a></li>
        <li><strong>Official Telegram support</strong> &mdash; <a href="https://t.me/bolintoppay1" rel="noopener noreferrer nofollow">t.me/bolintoppay1</a></li>
      </ul>
      <p>Support operates in English and Hindi. Response time depends on volume, and queries that include complete transaction details are resolved considerably faster.</p>

      <h2>What to include in your message</h2>
      <p>Include all of this in the first message so nobody has to ask for it:</p>
      <ul>
        <li>Your registered mobile number &mdash; the number only, never the password.</li>
        <li>A clear description of the problem.</li>
        <li>The exact error message or status shown on your screen.</li>
        <li>Transaction reference, UTR, or blockchain transaction hash.</li>
        <li>The exact amount, and the date and time.</li>
        <li>For crypto: the network used (TRC20, ERC20, BEP20).</li>
        <li>A screenshot, with sensitive fields covered.</li>
      </ul>

      <h2>What to never include</h2>
      <p>There is no legitimate support process anywhere that requires any of these:</p>
      <ul>
        <li>Your account password.</li>
        <li>An OTP or verification code.</li>
        <li>Your MPIN.</li>
        <li>A wallet seed phrase or private key.</li>
        <li>Full card details or net-banking credentials.</li>
      </ul>
      <p>If anyone asks for any of them, the conversation is fraudulent. Stop, and change your password from the official login page.</p>

      <h2>How to spot a fake Toppay support account</h2>
      <p>Impersonation accounts are the most common threat around payment brands. Genuine support behaves in specific, predictable ways &mdash; fakes break these patterns:</p>
      <ul>
        <li><strong>They contact you first.</strong> Especially right after you post about a problem in a public group. Real support responds to your query; it does not go looking for you.</li>
        <li><strong>They ask for credentials.</strong> Never legitimate, under any framing.</li>
        <li><strong>They ask you to install something.</strong> Remote-access or screen-share apps hand over control of your device.</li>
        <li><strong>They request an advance payment.</strong> A &ldquo;processing fee&rdquo;, &ldquo;unlock fee&rdquo; or &ldquo;tax&rdquo; to release your own funds is always fraud.</li>
        <li><strong>They create urgency.</strong> &ldquo;Act within 10 minutes or your account will be frozen&rdquo; exists to stop you thinking.</li>
        <li><strong>They use a near-identical username.</strong> Compare character by character against the handles listed above; an extra letter or a digit swapped for a lookalike is the standard trick.</li>
      </ul>

      <h2>Reporting fraud in India</h2>
      <p>If you have lost money to fraud, act immediately &mdash; the first hours matter most for any chance of recovery:</p>
      <ul>
        <li>Call the national cyber-fraud helpline: <strong>1930</strong>.</li>
        <li>File a report at <strong>cybercrime.gov.in</strong>.</li>
        <li>Contact your bank straight away to flag the transaction.</li>
        <li>Preserve every screenshot, message and transaction reference as evidence.</li>
      </ul>
      <p>And never pay anyone who offers to &ldquo;recover&rdquo; lost funds for an upfront fee. That is a second fraud that specifically targets victims of the first.</p>

      <h2>Before you contact us</h2>
      <p>Many issues are answered faster by the relevant guide: <a href="/toppay-password-help.html">password and login recovery</a>, <a href="/toppay-support.html">the troubleshooting centre</a>, <a href="/how-to-deposit-toppay.html">deposits</a>, <a href="/toppay-withdrawal.html">withdrawals</a>, or <a href="/toppay-usdt.html">USDT transactions</a>.</p>
    `,
    quick: {
      queries: ['Toppay customer care', 'Toppay contact', 'Toppay customer care number', 'Toppay helpline', 'Toppay support'],
      summary:
        'Use in-account support or the official Telegram channels listed on this page. Include your registered number, the error, the transaction reference, the amount and the time — and never include your password, OTP, MPIN or seed phrase.',
      audience: 'Users who need to contact Toppay customer care and want to avoid impersonation accounts.',
      keyPoints: [
        'In-account support is the most reliable channel because you are already authenticated.',
        'Genuine support never contacts you first asking for credentials.',
        'Any advance fee to "release" your funds is fraud.',
        'In India, report financial fraud on 1930 or cybercrime.gov.in.',
      ],
      questions: [
        ['What is the official Toppay customer care contact?', 'Use the support option inside your signed-in account at top-payy.online, or the official Telegram channels listed on this page. Verify the handle character by character before messaging.'],
        ['Will Toppay support ever ask for my OTP?', 'No. No legitimate support process requires your password, OTP, MPIN, seed phrase or card details. A request for any of them means the contact is fraudulent.'],
        ['How do I report Toppay-related fraud in India?', 'Call the 1930 cyber-fraud helpline, file a report at cybercrime.gov.in, and contact your bank immediately. Keep all screenshots and transaction references as evidence.'],
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    filename: 'toppay-hindi.html',
    lang: 'hi',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Toppay Kya Hai | Toppay App, Login aur USDT ki Puri Hindi Guide',
    description:
      'Toppay kya hai? Toppay login kaise kare, Toppay app kaise use kare, Toppay APK safe hai ya nahi, aur Toppay USDT deposit-withdrawal ki puri jankari Hindi me.',
    keywords: ['Toppay kya hai', 'Toppay hindi', 'Toppay app hindi', 'Toppay login hindi', 'Toppay usdt hindi', 'Top pay', 'Toppay'],
    heroEyebrow: 'TopPay · हिंदी गाइड',
    schemaType: 'WebPage',
    body: `
      <h1>Toppay Kya Hai — Puri Hindi Guide</h1>
      <p><strong>Toppay</strong> (जिसे लोग <strong>Top pay</strong> भी लिखते हैं) एक mobile-friendly payment account platform है। इस platform का official <strong>Toppay login</strong> <strong>top-payy.online</strong> पर है। इस page पर आपको Toppay से जुड़े सभी सवालों के जवाब हिंदी में मिलेंगे — login, app, APK, USDT और safety।</p>

      <h2>Toppay login kaise kare?</h2>
      <p>अपने browser में <strong>top-payy.online</strong> खोलें। Address bar में पूरा domain और padlock दिखना चाहिए — तभी आगे बढ़ें।</p>
      <ol>
        <li>अपना registered mobile number डालें।</li>
        <li>अपना password डालें।</li>
        <li>LOG IN पर tap करें।</li>
      </ol>
      <p>अगर login नहीं हो रहा तो password field में extra space या autocorrect capital letter check करें। दो बार fail होने के बाद बार-बार try न करें — <a href="/toppay-password-help.html">password recovery</a> use करें, वरना account temporary lock हो सकता है।</p>
      <p><strong>सबसे ज़रूरी बात:</strong> login page को bookmark कर लें। हर बार Google पर search करके मत आएं — fake ads और मिलते-जुलते domain इसी तरह लोगों को फंसाते हैं।</p>

      <h2>Toppay app download kaise kare?</h2>
      <p>यहाँ पर <strong>Toppay app</strong> एक web app है — कोई installer download करने की ज़रूरत नहीं है। बस browser में site खोलें और home screen पर add कर लें:</p>
      <ul>
        <li><strong>Android:</strong> Chrome में site खोलें → ऊपर तीन dots → <em>Add to Home screen</em>।</li>
        <li><strong>iPhone:</strong> Safari में site खोलें → <em>Share</em> button → <em>Add to Home Screen</em>।</li>
      </ul>
      <p>इसके बाद phone में एक icon बन जाएगा जो app की तरह full-screen खुलेगा। पूरी details <a href="/toppay-app-download.html">app download guide</a> में हैं।</p>

      <h2>Kya Toppay APK safe hai?</h2>
      <p><strong>यह website कोई APK file publish नहीं करती।</strong> अगर कोई Telegram, WhatsApp या किसी download site से आपको &ldquo;Toppay APK&rdquo; भेजे — उसे install मत करिए।</p>
      <p>वजह समझिए: बाहर से install की गई payment APK आमतौर पर तीन permission माँगती है —</p>
      <ul>
        <li><strong>SMS permission</strong> — इससे वो आपके सारे OTP पढ़ सकती है, सिर्फ़ इस app के नहीं, आपके bank के भी।</li>
        <li><strong>Accessibility permission</strong> — इससे वो आपकी screen पढ़ सकती है और खुद tap कर सकती है।</li>
        <li><strong>Display over other apps</strong> — इससे वो असली banking app के ऊपर नकली login screen दिखा सकती है।</li>
      </ul>
      <p>ये तीनों मिलकर आपका password जाने बिना ही account खाली कर सकते हैं। Browser page ये permissions माँग ही नहीं सकता — इसीलिए web app safe है। पूरी जानकारी <a href="/toppay-apk.html">APK guide</a> में है।</p>

      <h2>Toppay USDT — deposit aur withdrawal</h2>
      <p>USDT transaction एक बार भेजने के बाद <strong>वापस नहीं आ सकता</strong>। इसलिए ये तीन बातें हर बार check करें:</p>
      <ol>
        <li><strong>Network match करें।</strong> TRC20, ERC20 और BEP20 अलग-अलग blockchain हैं। गलत network पर भेजा गया USDT अक्सर हमेशा के लिए चला जाता है। ERC20 और BEP20 दोनों के address <code>0x</code> से शुरू होते हैं — इसीलिए सबसे ज़्यादा गलती यहीं होती है।</li>
        <li><strong>Address पूरा verify करें।</strong> सिर्फ़ शुरू और आखिर के अक्षर नहीं — बीच के अक्षर भी मिलाएं। Clipboard hijack करने वाला malware ऐसा address डालता है जिसकी शुरुआत और अंत मिलते-जुलते हों।</li>
        <li><strong>पहले छोटी test amount भेजें।</strong> जब वो पहुँच जाए, तब बाकी भेजें।</li>
      </ol>
      <p>और सबसे ज़रूरी — <strong>पहला transaction pending हो तो दूसरा मत भेजिए।</strong> ज़्यादातर मामलों में दोनों पहुँच जाते हैं। Transaction hash (TxID) हमेशा save करें, उसके बिना कुछ भी trace नहीं हो सकता।</p>
      <p>पूरी जानकारी: <a href="/toppay-usdt.html">USDT guide</a>, <a href="/how-to-deposit-usdt-toppay.html">USDT deposit steps</a>, <a href="/toppay-withdrawal.html">withdrawal guide</a> और <a href="/usdt-to-inr.html">USDT to INR calculator</a>।</p>

      <h2>Toppay real hai ya fake?</h2>
      <p>यह सवाल सही है और इसका सीधा जवाब ये है: <strong>&ldquo;Toppay&rdquo; नाम की कई अलग-अलग company और app दुनिया भर में हैं</strong> — app stores पर अलग-अलग developers के Toppay app, Nigeria में अलग Toppay, Indonesia में अलग। ये सब एक-दूसरे से जुड़े नहीं हैं।</p>
      <p>इसलिए brand का नाम देखकर कुछ तय मत कीजिए। ये check कीजिए:</p>
      <ul>
        <li>Address bar में पूरा domain एक-एक अक्षर मिलाकर पढ़ें।</li>
        <li>HTTPS और padlock है या नहीं।</li>
        <li>कोई भी APK link से आए तो install मत करें।</li>
        <li>कोई &ldquo;fixed daily return&rdquo; या &ldquo;paisa double&rdquo; का वादा करे — वो fraud है, हमेशा।</li>
        <li>कोई OTP, password या MPIN माँगे — वो fraud है, कोई अपवाद नहीं।</li>
        <li>बड़ी रकम डालने से पहले छोटी amount withdraw करके देख लें।</li>
      </ul>
      <p>पूरी checklist: <a href="/toppay-real-or-fake.html">Toppay real or fake</a>।</p>

      <h2>Safety ke basic rules</h2>
      <ul>
        <li>Password, OTP, MPIN किसी को मत बताइए — support कभी नहीं माँगता।</li>
        <li>कोई भी remote-access या screen-share app install मत कीजिए।</li>
        <li>Withdrawal &ldquo;release&rdquo; करने के लिए अलग से fee माँगे तो वो fraud है — असली fee withdrawal में से ही कटती है।</li>
        <li>Payment details कभी screenshot या group message से मत लीजिए — हमेशा अपने signed-in account की screen से लीजिए।</li>
        <li>अपना password किसी और service में इस्तेमाल मत कीजिए।</li>
      </ul>

      <h2>Madad kahan milegi?</h2>
      <p>Official contact channels <a href="/toppay-customer-care.html">customer care page</a> पर हैं। Troubleshooting के लिए <a href="/toppay-support.html">support guide</a> देखें। सभी guides की list <a href="/toppay-guide.html">guide hub</a> पर है।</p>
      <p>अगर fraud हो गया है तो तुरंत <strong>1930</strong> पर call करें या <strong>cybercrime.gov.in</strong> पर report करें, और अपने bank को तुरंत बताएं।</p>
    `,
    quick: {
      queries: ['Toppay kya hai', 'Toppay hindi', 'Toppay login hindi', 'Toppay app hindi', 'Toppay usdt hindi'],
      summary:
        'Toppay ek mobile-friendly payment account platform hai jiska official login top-payy.online par hai. App browser me chalta hai — koi APK download nahi karna hai. USDT bhejne se pehle network aur pura address verify karna sabse zaroori hai.',
      audience: 'हिंदी में Toppay login, app, APK aur USDT ki jankari chahne wale users.',
      keyPoints: [
        'Official login top-payy.online par hai — use bookmark kar lijiye.',
        'Toppay app ek web app hai, APK install karne ki zaroorat nahi.',
        'USDT me network mismatch se paisa hamesha ke liye ja sakta hai.',
        'Password, OTP ya MPIN kisi ko mat bataiye — support kabhi nahi maangta.',
      ],
      questions: [
        ['Toppay kya hai?', 'Toppay ek mobile-friendly payment account platform hai. Is platform ka official login top-payy.online par hai, jahan registered mobile number aur password se sign in kiya jata hai.'],
        ['Toppay app download kaise kare?', 'Browser me top-payy.online kholiye, phir Android par Chrome menu se "Add to Home screen" ya iPhone par Safari ke Share menu se "Add to Home Screen" chuniye. Koi APK download karne ki zaroorat nahi hai.'],
        ['Kya Toppay real hai ya fake?', 'Toppay naam ki kai alag companies duniya bhar me hain, isliye sirf naam se kuch tay mat kijiye. Domain ek-ek akshar milaiye, link se aaya APK install mat kijiye, aur badi rakam se pehle chhoti amount withdraw karke test kijiye.'],
      ],
    },
  },
];

/* ------------------------------------------------------------------ *
 *  LEGAL / TRUST PAGES  (YMYL requirement)
 * ------------------------------------------------------------------ */

const legalPages = [
  {
    filename: 'privacy-policy.html',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Privacy Policy | Toppay — top-payy.online',
    description:
      'Toppay privacy policy: what information this website collects, how account data is used and protected, cookie usage, and how to contact us about privacy.',
    keywords: ['Toppay privacy policy', 'Toppay data', 'Toppay'],
    heroEyebrow: 'TopPay · Legal',
    schemaType: 'WebPage',
    noQuick: true,
    body: `
      <h1>Privacy Policy</h1>
      <p>This privacy policy explains how <strong>Toppay</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, this website) handles information on <strong>top-payy.online</strong>. It applies to this website and the account platform served from it.</p>

      <h2>Information we collect</h2>
      <p><strong>Account information.</strong> When you register or sign in, we process the mobile number associated with your account and the credentials you set. Passwords and MPINs are stored in hashed form and are not retrievable in plain text by us or by anyone else.</p>
      <p><strong>Transaction information.</strong> Records of deposits, withdrawals and transfers made through your account, including amounts, timestamps, status and, where applicable, blockchain transaction references and network identifiers.</p>
      <p><strong>Technical information.</strong> Standard server and application logs, which may include IP address, browser type, device type, referring page and timestamps. These are used for security, fraud prevention and diagnosing faults.</p>
      <p><strong>Support correspondence.</strong> Messages you send us and the information you choose to include in them.</p>

      <h2>Information we do not collect</h2>
      <p>The public guide pages on this website do not collect account credentials. We never ask for your password, OTP, MPIN, wallet seed phrase or private key through any channel — by email, by message, or on any page. Any request of that kind did not come from us.</p>

      <h2>How we use information</h2>
      <ul>
        <li>To authenticate you and provide access to your account.</li>
        <li>To process and record transactions you initiate.</li>
        <li>To detect, investigate and prevent fraud and unauthorised access.</li>
        <li>To respond to your support requests.</li>
        <li>To maintain, secure and improve the service.</li>
        <li>To comply with applicable legal and regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Cookies and local storage</h2>
      <p>This site uses cookies and browser storage that are necessary for the service to function — principally to keep you signed in during a session and to remember basic preferences. Blocking these will prevent the login from working. We do not use them to build advertising profiles.</p>

      <h2>Sharing</h2>
      <p>We may share information with service providers who operate infrastructure on our behalf (such as hosting and database providers) under obligations of confidentiality, and with authorities where disclosure is required by applicable law or necessary to investigate fraud.</p>

      <h2>Data security</h2>
      <p>The site is served over HTTPS with HSTS enabled, applies a content security policy, and stores credentials in hashed form. No system can be guaranteed completely secure, so your own precautions matter: use a unique password, never share OTPs or MPINs, and never install applications sent to you by unsolicited message.</p>

      <h2>Data retention</h2>
      <p>Account and transaction records are retained for as long as your account is active and thereafter for the period required to meet legal, accounting, dispute-resolution and fraud-prevention obligations. Technical logs are retained for a shorter operational period.</p>

      <h2>Your rights</h2>
      <p>Subject to applicable law and to our legal retention obligations, you may request access to the personal information we hold about you, request correction of inaccurate information, or request deletion. Identity verification is required before we act on any such request, precisely because acting on an unverified request would itself be a security risk.</p>

      <h2>Children</h2>
      <p>This service is not directed at, and may not be used by, anyone under 18 years of age.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy as the service or applicable law changes. The revised version applies from the date it is published on this page.</p>

      <h2>Contact</h2>
      <p>For privacy questions, use the channels listed on the <a href="/toppay-customer-care.html">Toppay customer care page</a>.</p>
    `,
  },
  {
    filename: 'terms-and-conditions.html',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Terms and Conditions | Toppay — top-payy.online',
    description:
      'Toppay terms and conditions: eligibility, account responsibilities, prohibited use, transaction finality, limitation of liability and governing law for top-payy.online.',
    keywords: ['Toppay terms', 'Toppay terms and conditions', 'Toppay'],
    heroEyebrow: 'TopPay · Legal',
    schemaType: 'WebPage',
    noQuick: true,
    body: `
      <h1>Terms and Conditions</h1>
      <p>These terms govern your use of <strong>top-payy.online</strong> and the <strong>Toppay</strong> account platform served from it. By accessing the site or using an account, you agree to them. If you do not agree, do not use the service.</p>

      <h2>1. Eligibility</h2>
      <p>You must be at least 18 years old and legally capable of entering into a binding agreement. You must use the service only where doing so is lawful for you, and you are responsible for compliance with the laws applicable to you.</p>

      <h2>2. Your account</h2>
      <p>You are responsible for all activity under your account. Specifically, you agree to:</p>
      <ul>
        <li>Provide accurate registration information and keep it current.</li>
        <li>Keep your password, OTP and MPIN confidential and never share them with anyone.</li>
        <li>Use a password not reused from any other service.</li>
        <li>Notify us promptly of any suspected unauthorised access.</li>
        <li>Not create or operate an account on behalf of another person without authority.</li>
      </ul>
      <p>We will never ask you for your password, OTP or MPIN. If you disclose them, transactions authorised with those credentials may not be reversible.</p>

      <h2>3. Transactions and finality</h2>
      <p>You are responsible for the accuracy of every transaction you initiate, including amounts, destination account details, wallet addresses and blockchain network selection.</p>
      <p><strong>Blockchain transactions are irreversible.</strong> Funds sent to an incorrect address, or sent on a network that does not match the destination, are generally unrecoverable. This is a property of the underlying networks and is outside our control. Verify every detail before you confirm.</p>
      <p>Displayed rates, fees and limits may change. The figures shown at the moment you confirm a transaction are the ones that apply to it.</p>

      <h2>4. Prohibited use</h2>
      <p>You must not use the service to:</p>
      <ul>
        <li>Conduct any unlawful activity, including money laundering or terrorist financing.</li>
        <li>Impersonate any person or entity, or misrepresent your affiliation.</li>
        <li>Attempt to gain unauthorised access to the platform, other accounts, or related systems.</li>
        <li>Interfere with, disrupt, or place unreasonable load on the service.</li>
        <li>Scrape, copy, or redistribute the service or its content for commercial purposes without permission.</li>
        <li>Distribute modified applications, APK files, or look-alike sites using our name or branding.</li>
      </ul>

      <h2>5. No guarantee of returns</h2>
      <p>This service is a payment and account platform. Nothing on this site is an offer of investment, and no returns, profits or earnings are promised or implied. Any third party promising fixed returns using this brand name is acting without authorisation, and we are not responsible for such claims.</p>

      <h2>6. Availability</h2>
      <p>We aim to keep the service available but do not warrant uninterrupted operation. Access may be suspended for maintenance, security, or reasons beyond our control. Features may be added, changed or withdrawn.</p>

      <h2>7. Suspension and termination</h2>
      <p>We may suspend or terminate access where we reasonably suspect fraud, unlawful activity, breach of these terms, or where required by law or a competent authority.</p>

      <h2>8. Third-party links</h2>
      <p>This site may link to third-party services. We do not control them and are not responsible for their content, practices or security. Your use of them is governed by their own terms.</p>

      <h2>9. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, we are not liable for indirect, incidental, special or consequential loss, or for loss arising from your failure to secure your credentials, your entry of incorrect transaction details, your use of unofficial applications or look-alike websites, or from blockchain network behaviour outside our control.</p>

      <h2>10. Changes to these terms</h2>
      <p>We may update these terms. The revised version applies from the date it is published on this page, and continued use of the service constitutes acceptance.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts of India shall have jurisdiction over any dispute arising from them.</p>

      <h2>12. Contact</h2>
      <p>Questions about these terms can be raised through the channels on the <a href="/toppay-customer-care.html">Toppay customer care page</a>.</p>
    `,
  },
  {
    filename: 'refund-policy.html',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Refund & Cancellation Policy | Toppay — top-payy.online',
    description:
      'Toppay refund and cancellation policy: which transactions can be reversed, why blockchain transfers are final, how to raise a dispute and what information is required.',
    keywords: ['Toppay refund policy', 'Toppay cancellation', 'Toppay dispute', 'Toppay'],
    heroEyebrow: 'TopPay · Legal',
    schemaType: 'WebPage',
    noQuick: true,
    body: `
      <h1>Refund and Cancellation Policy</h1>
      <p>This policy explains when a transaction on <strong>top-payy.online</strong> can be cancelled or refunded, and the process for raising a dispute.</p>

      <h2>General principle</h2>
      <p>A transaction that has been submitted and confirmed cannot normally be cancelled by request. Whether any reversal is possible depends on the payment method used and the stage the transaction has reached. Please read the relevant section below.</p>

      <h2>Blockchain and USDT transactions</h2>
      <p><strong>Cryptocurrency transactions are final and irreversible.</strong> Once a USDT transfer is broadcast and confirmed on a blockchain, no party — not this platform, not any exchange, not any support team — can reverse it. This is a property of the network itself.</p>
      <p>This means the following are generally unrecoverable:</p>
      <ul>
        <li>Funds sent to an incorrect wallet address.</li>
        <li>Funds sent on a network that does not match the destination (for example ERC20 to a TRC20 address).</li>
        <li>Funds sent to an address controlled by a third party as a result of fraud.</li>
      </ul>
      <p>Because of this, the <a href="/toppay-usdt.html">USDT guide</a> asks you to verify the network, verify the full address including middle characters, and send a small test amount first. Those steps are the only protection that exists.</p>

      <h2>Deposits</h2>
      <p>A deposit that has been credited to your account balance is not refundable as a deposit; the funds remain in your account and can be withdrawn subject to the normal withdrawal process, limits and verification.</p>
      <p>A deposit that fails or is rejected should not be debited; where funds were debited but not credited, raise a dispute using the process below.</p>

      <h2>Withdrawals</h2>
      <p>A withdrawal cannot be cancelled once processing has begun. A withdrawal that fails or is rejected is normally returned to your account balance, and the reason is shown against the transaction.</p>
      <p>Where a withdrawal shows as completed but has not arrived, first check the destination account or the relevant blockchain explorer using the reference, then allow the full processing and settlement window before raising a dispute.</p>

      <h2>Duplicate transactions</h2>
      <p>If you submit the same payment twice — most commonly because the first appeared to be stuck — raise a dispute with both references. Duplicate cases are assessed individually. Resolution takes longer than the original delay would have, which is why every guide on this site asks you not to repeat a pending transaction.</p>

      <h2>Raising a dispute</h2>
      <p>Contact us through a channel on the <a href="/toppay-customer-care.html">customer care page</a> and include:</p>
      <ul>
        <li>Your registered mobile number (never your password).</li>
        <li>The transaction reference, UTR, or blockchain transaction hash.</li>
        <li>The exact amount, date and time.</li>
        <li>The network used, for crypto transactions.</li>
        <li>A screenshot of the transaction status, with sensitive fields covered.</li>
      </ul>
      <p>Raise disputes promptly. Investigation becomes materially harder as time passes, particularly for bank-side queries.</p>

      <h2>What we cannot do</h2>
      <ul>
        <li>Reverse a confirmed blockchain transaction.</li>
        <li>Recover funds sent to an address or account you entered incorrectly.</li>
        <li>Recover funds you transferred to a third party as a result of fraud.</li>
        <li>Act on a request we cannot verify as coming from the account holder.</li>
      </ul>

      <h2>Fraud warning</h2>
      <p>If you have lost funds, be aware that &ldquo;recovery services&rdquo; offering to retrieve them for an advance fee are a second fraud specifically targeting victims of the first. Never pay one. In India, report financial fraud on <strong>1930</strong> or at <strong>cybercrime.gov.in</strong> and contact your bank immediately.</p>
    `,
  },
  {
    filename: 'disclaimer.html',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Disclaimer | Toppay — top-payy.online',
    description:
      'Toppay disclaimer: the guides on this website are general information, not financial advice. Crypto values fluctuate and blockchain transactions cannot be reversed.',
    keywords: ['Toppay disclaimer', 'Toppay risk', 'Toppay'],
    heroEyebrow: 'TopPay · Legal',
    schemaType: 'WebPage',
    noQuick: true,
    body: `
      <h1>Disclaimer</h1>
      <p>This disclaimer applies to all content published on <strong>top-payy.online</strong>.</p>

      <h2>General information only</h2>
      <p>The guides on this website are general information about using the <strong>Toppay</strong> platform safely. They are not financial, investment, tax or legal advice, and they do not take account of your individual circumstances. Consider your own situation, and seek qualified professional advice where appropriate, before making financial decisions.</p>

      <h2>No guarantee of returns</h2>
      <p>Nothing on this website promises profit, income or returns of any kind. If you encounter any message, group, advertisement or person promising guaranteed returns using the Toppay name, it is not authorised by us and should be treated as a fraud indicator.</p>

      <h2>Cryptocurrency risk</h2>
      <p>Cryptocurrency values fluctuate and can fall as well as rise. USDT is designed to track the US dollar but is not guaranteed to hold that value precisely. Blockchain transactions are irreversible: funds sent to a wrong address or on a mismatched network are generally unrecoverable by anyone. Never transact with money you cannot afford to lose.</p>

      <h2>Accuracy and currency of information</h2>
      <p>We work to keep these guides accurate, but rates, fees, limits, payment methods, processing times and platform features change. <strong>The authoritative source for your account is always the information displayed on your own signed-in screen at the time you act</strong> — not this website, not a screenshot, and not a message forwarded to you.</p>

      <h2>Calculator estimates</h2>
      <p>The USDT to INR calculator on this site is an offline estimator using the rate you enter. It does not fetch a live market rate and does not include platform or network fees. It is a planning aid only; the applicable rate and final amount are those shown in your account at confirmation.</p>

      <h2>Third-party content</h2>
      <p>Links to third-party websites and services are provided for convenience. We do not control them and accept no responsibility for their content, accuracy, practices or security.</p>

      <h2>Brand-name ambiguity</h2>
      <p>Several unrelated companies, applications and websites worldwide use the name &ldquo;Toppay&rdquo; or a close variation. This website relates only to the platform served at top-payy.online. Reviews, applications, APK files, phone numbers or domains associated with other Toppay-branded entities have no connection to this platform. See <a href="/toppay-real-or-fake.html">Toppay real or fake</a> for verification guidance.</p>

      <h2>Limitation of liability</h2>
      <p>To the maximum extent permitted by law, we accept no liability for loss arising from reliance on the general information published on this website, from transactions you authorise, or from your use of third-party applications or websites.</p>

      <h2>Contact</h2>
      <p>Questions about this disclaimer can be raised through the <a href="/toppay-customer-care.html">Toppay customer care page</a>.</p>
    `,
  },
];

pages.push(...require('./seo-extra-pages.cjs'));

module.exports = {
  domain,
  brandKeywords,
  websiteNode,
  organizationNode,
  pages,
  legalPages,
};
